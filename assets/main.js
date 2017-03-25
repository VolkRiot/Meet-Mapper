$(document).ready(function () {

  var database = firebase.database();
  var markerIcons = {
    green: 'http://maps.google.com/mapfiles/ms/icons/grn-pushpin.png',
    purple: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
  };
  var markerDataArray = [];
  var placesMarkersArray = [];
  var Map = new GMapInterface('map-container');

  Map.queryUserLocation();
  Map.currentMarker = Map.createMarker(Map.startLoc, {bounce: true});
  Map.currentMarker.setMap(null);
  Map.setMarker(Map.currentMarker);

  Map.map.addListener('click', function(event) {

    if(Map.activeSelection){
      Map.activeSelection.setAnimation(null);
      Map.activeSelection = null;
    }
    Map.currentMarker.setMap(null);
    Map.currentMarker = Map.createMarker(event.latLng, {bounce: true});
    Map.setMarker(Map.currentMarker);

  });

  $('#add-event-button').on('click', function (e) {

    e.preventDefault();

    var newMarkerData = {};
    var formComplete = false;

    newMarkerData.name = $('#event-name').val().trim();
    newMarkerData.date = $('#event-date').val().trim();
    newMarkerData.startTime = $('#event-start').val().trim();
    newMarkerData.endTime = $('#event-end').val().trim();
    //newMarkerData.location = {lat: Map.currentMarker.position.lat(), lng: Map.currentMarker.position.lng()};

    if(newMarkerData.name && newMarkerData.date && newMarkerData.startTime && newMarkerData.endTime){
      formComplete = true;
    }else{
      Materialize.toast('Please complete the form', 3000);
    }

    // Check moment JS for date in future
    var selectedDate = new Date(newMarkerData.date);

    if(moment().diff(selectedDate) > 0){

      Materialize.toast('Are you a time-travelers? Because that date has passed', 3000);

    }else if(formComplete){

      $('.event-data').val('');
      Map.currentMarker.setMap(null);

      if(Map.activeSelection){
        newMarkerData.location = Map.activeSelection.data.location;
        newMarkerData.data = Map.activeSelection.data;
      }else{
        newMarkerData.location = {lat: Map.currentMarker.position.lat(), lng: Map.currentMarker.position.lng()};
      }

      var schedMarker = Map.createMarker(newMarkerData.location, {drop: true}, newMarkerData, markerIcons.green);

      schedMarker.addListener('click', function () {



      });

      Map.setMarker(schedMarker);

      markerDataArray.push(newMarkerData);

      database.ref("events").set(markerDataArray);

    }

  });

  // Search Input Click Event
  $('#search-submit').on('click', function(e){
    e.preventDefault();

    var input = $('#location-search').val().trim();
    
    if(input !== ""){
      var places = new PlacesConstructor(Map); 
      // stores result in a global variable

      places.search(input, outputResults);

      function outputResults(resultArray) {

        if(placesMarkersArray){
          placesMarkersArray.forEach(function (item) {
            item.setMap(null);
          });
          placesMarkersArray = [];
        }

        if(resultArray.length == 1){

          Map.relocateMapMarker(resultArray[0].location);

        }else{

          resultArray.forEach(function(place) {
            var marker = Map.createMarker(place.location, {drop: true}, place, markerIcons.purple);

            marker.addListener('click', function() {

              Map.currentMarker.setMap(null);

              if(Map.activeSelection){
                Map.activeSelection.setAnimation(null);
              }
              marker.setAnimation(google.maps.Animation.BOUNCE);
              Map.activeSelection = marker;

            });

            var content;

            if(marker.data.photo){
              content = '<img border="0" align="Left" src= ' + marker.data.photo + '>&nbsp' +  marker.data.name
            }else{
              content = '<img border="0" align="Left">' +  marker.data.name
            }

            var infowindow = new google.maps.InfoWindow({
              content: content
            });

            marker.addListener('mouseover', function () {
              infowindow.open(Map.map, this);
            });

            marker.addListener('mouseout', function () {
              infowindow.close();
            });

            Map.setMarker(marker);
            placesMarkersArray.push(marker);
          });

        }

      }
      
    }

  });

  database.ref("events").once('value', function (snapshot) {
    if(snapshot.val()){
      markerDataArray = snapshot.val();

      markerDataArray.forEach(function (elem) {
        var marker = Map.createMarker(elem.location, {drop: true}, elem, markerIcons.green);
        Map.setMarker(marker);

        marker.addListener('mouseover', function () {

          var content;

          if(elem.data){
            content = '<img border="0" align="Left" src= ' + elem.data.photo + '><br>&nbsp' +  elem.data.name +
                    '<br><br><p>&nbsp' + elem.name + '</p>' +
                    '<p>&nbspAddress: '+ elem.data.address +'</p>' +
                    '<p>&nbspDate: ' + elem.date + '</p>' +
                    '<p style="display:inline">&nbspStart: ' + elem.startTime + '</p><p style="display:inline">&nbspEndTime: ' + elem.endTime + '</p>'
          }else{
            content = '<p>&nbsp' + elem.name + '</p>' +
                '<p>&nbspDate: ' + elem.date + '</p>' +
                '<p style="display:inline">&nbspStart: ' + elem.startTime + '</p><p style="display:inline">&nbspEndTime: ' + elem.endTime + '</p>'
          }

          var infowindow = new google.maps.InfoWindow({
            content: content
          });

          infowindow.open(Map.map, this);

          marker.addListener('mouseout', function () {
            infowindow.close();
          });

        });

      });
    }
  });

  database.ref("events").on('child_added', function (snapshot) {

    // On child_added Events

  })

});
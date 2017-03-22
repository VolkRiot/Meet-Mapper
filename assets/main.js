$(document).ready(function () {

  var database = firebase.database();
  var markerIcons = {
    green: 'http://maps.google.com/mapfiles/ms/icons/grn-pushpin.png'
  };
  var markerDataArray = [];
  var Map = new GMapInterface('map-container');

  Map.queryUserLocation();
  Map.currentMarker = Map.createMarker(Map.startLoc, {bounce: true});
  Map.currentMarker.setMap(null);
  Map.setMarker(Map.currentMarker);

  Map.map.addListener('click', function(event) {

    Map.currentMarker.setMap(null);
    Map.currentMarker = Map.createMarker(event.latLng, {bounce: true});
    Map.setMarker(Map.currentMarker);

  });

  $('#add-event-button').on('click', function (e) {

    e.preventDefault();

    var newMarkerData = {};

    newMarkerData.name = $('#event-name').val().trim();
    newMarkerData.date = $('#event-date').val().trim();
    newMarkerData.startTime = $('#event-start').val().trim();
    newMarkerData.endTime = $('#event-end').val().trim();
    newMarkerData.location = {lat: Map.currentMarker.position.lat(), lng: Map.currentMarker.position.lng()};


    Map.currentMarker.setMap(null);
    Map.setMarker(Map.createMarker(Map.currentMarker.position, {drop: true}, newMarkerData, markerIcons.green));

    markerDataArray.push(newMarkerData);

    database.ref("events").set(markerDataArray);

  });

  database.ref("events").once('value', function (snapshot) {

    if(snapshot.val()){
      markerDataArray = snapshot.val();

      markerDataArray.forEach(function (elem) {

        Map.setMarker(Map.createMarker(elem.location, {drop: true}, elem, markerIcons.green));

      });

    }

  });


});
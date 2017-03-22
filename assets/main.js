$(document).ready(function () {

  var markerIcons = {
    green: 'http://maps.google.com/mapfiles/ms/icons/grn-pushpin.png'
  };
  var MarkerData = [];


  var Map = new GMapInterface('map-container');

  Map.queryUserLocation();
  Map.currentMarker = Map.createMarker(Map.startLoc, {bounce: true});

  Map.map.addListener('click', function(event) {

    Map.currentMarker.setMap(null);
    Map.currentMarker = Map.createMarker(event.latLng, {bounce: true});

  });

  $('#add-event-button').on('click', function (e) {

    e.preventDefault();

    var newMarkerData;
    var newEvent = {};

    newEvent.name = $('#event-name').val().trim();
    newEvent.date = $('#event-date').val().trim();
    newEvent.startTime = $('#event-start').val().trim();
    newEvent.endTime = $('#event-end').val().trim();


    Map.currentMarker.setMap(null);
    newMarker = Map.createMarker(Map.currentMarker.position, {drop: true}, newEvent, markerIcons.green)

  });

  $('#location-search').on('click', function (e) {

    e.preventDefault();




  })

});
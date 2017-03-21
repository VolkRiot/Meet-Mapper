$(document).ready(function () {

  var Map = new GMapInterface('map-container');

  Map.queryUserLocation();
  Map.createMarker(Map.startLoc, {bounce: true});

  Map.map.addListener('click', function(event) {

    Map.createMarker(event.latLng, {bounce: true});

  });

});
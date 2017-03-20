
$(document).ready(function () {

  var Map = new GMapInterface('map-container');
  Map.createMarker(Map.startLoc);
  Map.queryUserLocation();

});
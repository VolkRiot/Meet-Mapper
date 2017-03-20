//TODO: (DEVELOPER) Remove this debugging global
var GlobalObj;
////////////////////////////////////////////////////////////

$(document).ready(function () {

  var Map = new GMapInterface('map-container');
  Map.createMarker(Map.startLoc);
  Map.queryUserLocation();

  Map.map.addListener('click', function(event) {

    Map.createMarker(event.latLng);

  });

});
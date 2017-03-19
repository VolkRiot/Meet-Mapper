function GMapInterface(container) {
  this.startLoc = {lat: 37.7919221, lng: -122.393739};
  this.mapOptions = {
    zoom: 16,
    center: this.startLoc,
    draggableCursor:'crosshair'
  };
  this.map;
  this.newMarker;
  this.initMap(container);
}

GMapInterface.prototype.initMap = function(contId) {

  this.map = new google.maps.Map(document.getElementById(contId), this.mapOptions);

};

GMapInterface.prototype.createMarker = function(latLong) {

  if(this.newMarker){
    this.newMarker.setMap(null);
  }

  var marker = new google.maps.Marker({
      position: latLong,
      custom: "Something new can go here"
    });

  this.newMarker = marker;

  marker.setMap(this.map);

};


// Start document here....

$(document).ready(function () {

  var Map = new GMapInterface('map-container');
  Map.createMarker(Map.startLoc);

  Map.map.addListener('click', function(event) {

    Map.createMarker(event.latLng);
  });

});
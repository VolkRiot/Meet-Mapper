function GMapInterface(container) {
  this.startLoc = {lat: 37.7919221, lng: -122.393739};
  this.mapOptions = {
    zoom: 16,
    center: this.startLoc,
    draggableCursor:'crosshair',
    clickableIcons: false,
    streetViewControl: false,
    mapTypeControl: false
  };
  this.map;
  this.newMarker;
  this.initMap(container);
}

GMapInterface.prototype.initMap = function(contId) {

  this.map = new google.maps.Map(document.getElementById(contId), this.mapOptions);

  this.map.addListener('click', function(event) {
    this.createMarker(event.latLng);
  });

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

GMapInterface.prototype.queryUserLocation = function () {

  var self = this;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      self.map.setCenter(pos);

    }, function() {
      // Failed to find current position

    });
  } else {
    // Browser doesn't support Geolocation

  }

};

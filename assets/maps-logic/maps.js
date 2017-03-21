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
  this.currentMarker;
  this.initMap(container);
}

GMapInterface.prototype.initMap = function(contId) {

  this.map = new google.maps.Map(document.getElementById(contId), this.mapOptions);

};


GMapInterface.prototype.createMarker = function(latLong) {

  if(this.currentMarker){
    this.currentMarker.setMap(null);
  }

  this.currentMarker = new google.maps.Marker({
      position: latLong,
      custom: "Something new can go here"
    });

  this.currentMarker.setMap(this.map);

  this.currentMarker.addListener('click', function(event) {

    alert("Marker is clicked and it is located at " + event.latLng)

  });

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

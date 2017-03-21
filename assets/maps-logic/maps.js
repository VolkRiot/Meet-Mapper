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


GMapInterface.prototype.createMarker = function(latLong, animate) {

  if(this.currentMarker){
    this.currentMarker.setMap(null);
  }

  this.currentMarker = new google.maps.Marker({
      position: latLong,
      custom: "Something new can go here"
    });

  if(animate.drop){
    this.currentMarker.setAnimation(google.maps.Animation.DROP);
  }

  if(animate.bounce){
    this.currentMarker.setAnimation(google.maps.Animation.BOUNCE);
  }

  this.currentMarker.setMap(this.map);

  this.currentMarker.addListener('click', function(event) {

    // What we want to happen on a marker click can go here.
    alert("Marker is clicked and it is located at " + event.latLng)

  });

};

GMapInterface.prototype.queryUserLocation = function () {

  var self = this;

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(position) {
      self.startLoc = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

    }, function() {

      // Failed to find current position
      self.startLoc = {lat: 37.7919221, lng: -122.393739};

    }, {timeout:7000});
  }

  self.setMapCenter(this.startLoc)

};

GMapInterface.prototype.setMapCenter = function (position) {

  this.map.setCenter(position);

};

function GMapInterface(container) {
  this.startLoc = {lat: 37.7919221, lng: -122.393739};
  this.mapOptions = {
    zoom: 15,
    center: this.startLoc,
    draggableCursor:'crosshair',
    clickableIcons: false,
    streetViewControl: false,
    mapTypeControl: false
  };

  this.initMap(container);
  this.queryUserLocation();
}

GMapInterface.prototype.initMap = function(contId) {

  this.map = new google.maps.Map(document.getElementById(contId), this.mapOptions);
  this.currentMarker = this.createMarker(this.startLoc, {bounce: true});
  this.setMarker(this.currentMarker);
  this.bounds = new google.maps.LatLngBounds();

};

GMapInterface.prototype.createMarker = function(latLong, animate, data, icon) {

  var newMarker = new google.maps.Marker({
      position: latLong,
      animate: animate,
      icon: icon,
      data: data,
      custom: "You are here"
    });

  if(data){
    newMarker.custom = data;
  }

  if(animate.drop){
    newMarker.setAnimation(google.maps.Animation.DROP);
  }

  if(animate.bounce){
    newMarker.setAnimation(google.maps.Animation.BOUNCE);
  }

  return newMarker;

};

GMapInterface.prototype.setMarker = function(marker) {

  marker.setMap(this.map);

};


GMapInterface.prototype.queryUserLocation = function () {

  var self = this;

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(position) {

      self.startLoc = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Successfully found map
      self.relocateMapMarker(self.startLoc);

    }, function(error) {
      var errMessage = '';

      switch(error.code) {
        case error.PERMISSION_DENIED:
          errMessage += 'Geolocation permission denied. ';
          break;
        case error.POSITION_UNAVAILABLE:
          errMessage += 'Position unavailable. ';
          break;
        case error.TIMEOUT:
          errMessage += 'Request to get location timed out. ';
          break;
        default:
          errMessage += 'An unknown error occurred. ';
      }

      Materialize.toast(errMessage + 'Defaulting location to downtown San Francisco', 3000);

    }, {timeout:7000});

  } else {
    Materialize.toast('GeoLocation is not supported by your browser', 3000);
  }

};

GMapInterface.prototype.setMapCenter = function (position) {

  this.map.setCenter(position);
  this.bounds = new google.maps.LatLngBounds();

};

GMapInterface.prototype.relocateMapMarker = function (location) {

  this.setMapCenter(location);
  this.currentMarker.setMap(null);
  this.currentMarker = this.createMarker(location, {bounce: true});
  this.setMarker(this.currentMarker);

};

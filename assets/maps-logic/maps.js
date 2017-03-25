function GMapInterface(container) {
  this.startLoc = {lat: 37.7919221, lng: -122.393739};
  this.mapOptions = {
    zoom: 14,
    center: this.startLoc,
    draggableCursor:'crosshair',
    clickableIcons: false,
    streetViewControl: false,
    mapTypeControl: false
  };
  this.map;
  this.currentMarker;
  this.activeSelection;
  this.initMap(container);
}

GMapInterface.prototype.initMap = function(contId) {

  this.map = new google.maps.Map(document.getElementById(contId), this.mapOptions);

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

    }, function() {

      // TODO: Add a slide out saying location could not be located

    }, {timeout:7000});
  }

};

GMapInterface.prototype.setMapCenter = function (position) {

  this.map.setCenter(position);

};

GMapInterface.prototype.relocateMapMarker = function (location) {

  this.setMapCenter(location);
  this.currentMarker.setMap(null);
  this.currentMarker = this.createMarker(location, {bounce: true});
  this.setMarker(this.currentMarker);

};

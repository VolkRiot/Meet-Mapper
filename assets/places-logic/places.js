//Constructor
function PlacesConstructor(gMap){
  
  var startPoint;
  var placeService;
  this.PlacesInit(gMap.map);
  this.getPosition(gMap);
  
}
///////////////////////////////////




// Get Coordinates
PlacesConstructor.prototype.getPosition = function(myMap){
  var lat = myMap.currentMarker.position.lat();
  var lng = myMap.currentMarker.position.lng();
  
  var currentPosition = {
    lat: lat,
    lng: lng
  };
  this.startPoint = currentPosition;
}
///////////////////////////////////




// Initialize places Service
PlacesConstructor.prototype.PlacesInit = function(myMap){
  this.placeService = new google.maps.places.PlacesService(myMap);
}
///////////////////////////////////




// Search Function
PlacesConstructor.prototype.search = function(searchInput){
  // Search obj
  var request = {
    location:  this.startPoint, //{lat: 37.6694724, lng: -122.47549339999999}, // obj  from line 5 must to be reveived here
    radius: '500',
    query: searchInput
  };

  // Execute search 
  this.placeService.textSearch(request, getResult);
  
  // Array of awnsers 
  var searchResult = [];
  
  // Function that saves the result in a array
  function getResult(results, status){ 
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < 5; i++) {

        //////////Formated Obj///////////
        var myObj ={
          name: results[i].name,
          address: results[i].formatted_address,
          opening: results[i].opening_hours,
          location: {
            lat: results[i].geometry.location.lat(), 
            lng: results[i].geometry.location.lng()
          },
          photo: results[i].photos[0].html_attributions
        };
        /////////////////////////////////
        searchResult.push(myObj);
      }
    }
  }
  //////return from search function////////
  return searchResult;
}
///////////////////////////////////////////



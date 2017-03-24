//Constructor
function PlacesConstructor(gMap){
  var startPoint;
  var placeService;

  this.PlacesInit(gMap.map);
  this.getPosition(gMap);
}
///////////////////////////////////



// Initialize places Service
PlacesConstructor.prototype.PlacesInit = function(myMap){
	this.placeService = new google.maps.places.PlacesService(myMap);
}
///////////////////////////////////



// Get Coordinates
PlacesConstructor.prototype.getPosition = function(myMap){

  var currentPosition = {
    lat: myMap.currentMarker.position.lat(),
    lng: myMap.currentMarker.position.lng()
  };
  this.startPoint = currentPosition;
}
///////////////////////////////////



// Search Function
PlacesConstructor.prototype.search = function(searchInput){
  // Search obj
  var request = {
    location:  this.startPoint,
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



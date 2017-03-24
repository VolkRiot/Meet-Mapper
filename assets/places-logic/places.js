//Constructor
function PlacesConstructor(gMap){
  var startPoint;
  var placeService;

  this.PlacesInit(gMap.map);
  this.getPosition(gMap);
}

// Initialize places Service
PlacesConstructor.prototype.PlacesInit = function(myMap){
	this.placeService = new google.maps.places.PlacesService(myMap);
};

// Get Coordinates
PlacesConstructor.prototype.getPosition = function(myMap){

  var currentPosition = {
    lat: myMap.currentMarker.position.lat(),
    lng: myMap.currentMarker.position.lng()
  };
  this.startPoint = currentPosition;
};

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
  
  // Array of answers
  var searchResult = [];
  
  // Function that saves the result in an array
  function getResult(results, status){
    console.log(status);

    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < 5; i++) {
        var myObj ={
          name: results[i].name,
          address: results[i].formatted_address,
          opening: results[i].opening_hours,
          location: {
            lat: results[i].geometry.location.lat(),
            lng: results[i].geometry.location.lng()
          },
          photo: results[i].photos    // here was the problem o '0' undefind the reason of the problem
        };
        searchResult.push(myObj);
      }
    }else{
      console.log('on if statement : ' + status);
    }
  }

  return searchResult;
};
//Constructor
function PlacesConstructor(gMap){
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
PlacesConstructor.prototype.search = function(searchInput, callback){
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
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {

        if(i == 5 ){
          break;
        }

        var myObj ={
          name: results[i].name,
          address: results[i].formatted_address,
          location: {
            lat: results[i].geometry.location.lat(), 
            lng: results[i].geometry.location.lng()
          }
        };

        if(results[i].photos){

          myObj.photo = results[i].photos[0].getUrl({'maxWidth': 50, 'maxHeight': 50});

        }

        searchResult.push(myObj);
      }
      callback(searchResult);
    }
  }

};
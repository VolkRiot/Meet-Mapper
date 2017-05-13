//Constructor
function PlacesConstructor(gMap){
  this.currentMap = gMap.map;
  this.centerPoint = {lat: this.currentMap.center.lat(), lng: this.currentMap.center.lng()};
  this.PlacesInit();
  this.getPosition();
}

// Initialize places Service
PlacesConstructor.prototype.PlacesInit = function(){
	this.placeService = new google.maps.places.PlacesService(this.currentMap);
};

// Get Coordinates
PlacesConstructor.prototype.getPosition = function(){

  this.centerPoint = {
    lat: this.currentMap.center.lat(),
    lng: this.currentMap.center.lng()
  };

};

// Search Function
PlacesConstructor.prototype.search = function(searchInput, callback){

  // Refresh Coordinates
  this.getPosition();

  // Search obj
  var request = {
    location:  this.centerPoint,
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
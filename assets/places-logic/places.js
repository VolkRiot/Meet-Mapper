//Constructor
function PlacesConstructor(gMap){

  // I need to pass this obj to the request Obj inside search function
  var startPoint = {
    lat: gMap.currentMarker.position.lat(),
    lng: gMap.currentMarker.position.lng()
  }; 
  ///////////////////////////////////////////////////////////////////



  var placeService;
 



  this.PlacesInit(gMap.map);
  console.log(gMap);
  console.log(startPoint);
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
    location: {lat: 37.6694724, lng: -122.47549339999999}, // obj  from line 5 must to be reveived here
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

        var myObj ={
          name: results[i].name,
          location: {
            lat: results[i].geometry.location.lat(), 
            lng: results[i].geometry.location.lng()
          },
          photo: results[i].photos[0].html_attributions
        };
        searchResult.push(myObj);
      }
    }
  }
  //////return from search function////////
  return searchResult;
}
///////////////////////////////////////////


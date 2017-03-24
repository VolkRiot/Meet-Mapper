// Datepicker function JS

$(function() {
  $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 15
  });

// timepicker function
 $('.timepicker').pickatime({
    autoclose: false,
    twelvehour: true,
    default: '12:00:00'
  });

});


$("#add-popout").on("click", function() {

	$("#upcoming-events").hide()
	$("#add-eventform").fadeIn(1000)


});

$("#upcoming-popout").on("click", function() {

	$("#add-eventform").hide()
	$("#upcoming-events").fadeIn(1000)
  

});




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
    default: '14:20:00'
  });

});


$("#add-popout").on("click", function() {
	$("#upcoming-events").hide()
	$("#add-eventform").show()

});

$("#upcoming-popout").on("click", function() {
	$("#add-eventform").hide()
	$("#upcoming-events").show()

});



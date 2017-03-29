// Datepicker function JS

$(function() {
  $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 15
  });

// timepicker function
 $('.timepicker').pickatime({
    autoclose: true,
    twelvehour: true,
    default: '12:00:00'
  });

});


$("#add-popout").on("click", function() {

	$("#upcoming-events").hide();
	$("#add-eventform").fadeIn(1000);
  $("body").animate({ scrollTop: $(document).height() }, "slow");

});

$("#upcoming-popout").on("click", function() {

	$("#add-eventform").hide();
	$("#upcoming-events").fadeIn(1000);
  $("body").animate({ scrollTop: $(document).height() }, "slow");

});




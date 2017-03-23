// Datepicker function JS

$(function() {
  $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 15
  });

 $('.timepicker').pickatime({
    autoclose: false,
    twelvehour: true,
    default: '14:20:00'
  });

});



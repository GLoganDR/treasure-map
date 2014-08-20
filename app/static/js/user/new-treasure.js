/* jshint camelcase:false */
/* global google:true */

(function(){
  'use strict';
  $(document).ready(function(){
    $('form').submit(addTreasure);
  });

  function addTreasure(e){
    var lat = $('#lat').val();

    if(!lat){
      var loc = $('#loc').val();
      geocode(loc);
      e.preventDefault();
    }
  }

  function geocode(address){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address:address}, function(results, status){
      var loc  = results[0].formatted_address,
          lat  = results[0].geometry.location.lat(),
          lng  = results[0].geometry.location.lng();

      $('#loc').val(loc);
      $('#lat').val(lat);
      $('#lng').val(lng);

      $('form').submit();
    });
  }
})();

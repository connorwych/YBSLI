$(function presetFormData() {
  var urlParams
  var match,
  pl     = /\+/g,  // Regex for replacing addition symbol with a space
  search = /([^&=]+)=?([^&]*)/g,
  decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
  query  = window.location.search.substring(1);

  urlParams = {};
  while (match = search.exec(query)) {
    urlParams[decode(match[1])] = decode(match[2]);
  }

  if ( null != urlParams.femaleFilter ) {
    $('#femaleInterpreters').attr("checked","true");

  } else if ( null != urlParams.maleFilter ) {
    $('#maleInterpreters').attr("checked","true")
  } else {
    $('#allGenders').attr("checked", "true")
  }
  if ( null != urlParams.mentalHealthWorkFilter ) {
    $('#mentalHealthWorkFilter').attr("checked","true")
  }
  if ( null != urlParams.legalWorkFilter ){
    $('#legalWorkFilter').attr("checked","true")
  }
});

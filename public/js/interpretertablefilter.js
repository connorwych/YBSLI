var paramList = [];


$(function() {
   $('#mentalHealthWorkFilter').click(function() {
    if($(this).hasClass("active")) {
      // mentalHealthWorkFilter currently on, needs to be turned off
      $(this).removeClass("active");
      $('.mhn').removeClass("mhnHidden");
      if (-1 != paramList.indexOf("mentalHealthWorkFilter") ) {
        var a = paramList.indexOf("mentalHealthWorkFilter");
        paramList.splice(a,1);
      }
    } else {
      // mentalHealthWorkFilter currently off, needs to be turned on
      $(this).addClass("active");
      $('.mhn').addClass("mhnHidden");
      if ( -1 == paramList.indexOf("mentalHealthWorkFilter") ) {
        paramList.push("mentalHealthWorkFilter");
      }
    }
    updateURL();
  });
});

$(function() {
  $('#legalWorkFilter').click(function() {
    if($(this).hasClass("active")) {
      // legalWorkFilter currently on, needs to be turned off
      $(this).removeClass("active");
      $('.ln').removeClass("lnHidden");
      if (-1 != paramList.indexOf("legalWorkFilter") ) {
        var a = paramList.indexOf("legalWorkFilter");
        paramList.splice(a,1);
      }
    } else {
      // legalWorkFilter currently off, needs to be turned on
      $(this).addClass("active");
      $('.ln').addClass("lnHidden");
      if ( -1 == paramList.indexOf("legalWorkFilter") ) {
        paramList.push("legalWorkFilter");
      }
    }
    updateURL();
  });
});

$(function(){
  $('#maleFilter').click(function() {
    if( $('#femaleFilter').hasClass('active')){
      var a = paramList.indexOf("femaleFilter")
      paramList.splice(a,1);
    }
    if (-1 == paramList.indexOf("maleFilter")) {
      paramList.push("maleFilter");
      updateURL();
    }
    $('#maleFilter').addClass("active");
    $('#femaleFilter').removeClass("active");
    $('#showAll').removeClass("active");
    $('.M').removeClass("mHidden");
    $('.F').addClass("fHidden");
  });
});

$(function(){
  $('#femaleFilter').click(function() {
    if( $('#maleFilter').hasClass('active')){
      var a = paramList.indexOf("maleFilter")
      paramList.splice(a,1);
    }
    if (-1 == paramList.indexOf("femaleFilter")) {
      paramList.push("femaleFilter");
      updateURL();
    }
    $('#maleFilter').removeClass("active");
    $('#femaleFilter').addClass("active");
    $('#showAll').removeClass("active");
    $('.M').addClass("mHidden");
    $('.F').removeClass("fHidden");
    updateURL();
  });
});

$(function(){
  $('#showAll').click(function() {
    if( $('#maleFilter').hasClass('active')){
      var a = paramList.indexOf("maleFilter")
      paramList.splice(a,1);
    }
    if( $('#femaleFilter').hasClass('active')){
      var a = paramList.indexOf("femaleFilter")
      paramList.splice(a,1);
    }
    $('#maleFilter').removeClass("active");
    $('#femaleFilter').removeClass("active");
    $('#showAll').addClass("active");
    $('.M').removeClass("mHidden");
    $('.F').removeClass("fHidden");
    updateURL();

  });
});

function updateURL(){
  pageURL = document.location.pathname;
  var queryList = "";
  if ("" != paramList ) {
    queryList = '?' + paramList.join('&');
  }
  history.pushState(null, null, pageURL + queryList );
}

$(function() {
  $('#contactUs').click(function(){
    var pageURL = '/contact/';
    pageURL += '?' + paramList.join('&');
    window.location = pageURL;
  });
});

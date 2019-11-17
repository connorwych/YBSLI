function showCookieBanner() {
  if ( undefined === $.cookie('cookieOptIn') ) {
    $('#cookieBanner').css('display','block');
  } else {
  }
}

$('#cookieAccept').click(function() {
  $.cookie('cookieOptIn', 'true', { expires: 365, path: '/'  });
  $('#cookieBanner').css('display','none');
  callGoogleAnaltics();
  populatePerformanceCookiePreference();
});

$('#findOutMore').click( function() {
  $.cookie('cookieOptIn', 'false', { expires: 365, path: '/'  });
  $('#cookieBanner').css('display','none');
  populatePerformanceCookiePreference();
});



function populatePerformanceCookiePreference() {
  if ('true' === $.cookie('cookieOptIn')) {
    $('#optIn').prop("checked",true);
  }
  if ('false' === $.cookie('cookieOptIn')) {
    $('#optOut').prop("checked",true);
  }
}

function removeGoogleAnalyticsCookies(){
  $.removeCookie('_ga', { path: '/', domain: '.yorkshire-bsl-interpreters.co.uk' });
  $.removeCookie('_gat',{ path: '/', domain: '.yorkshire-bsl-interpreters.co.uk' });
  $.removeCookie('_gid',{ path: '/', domain: '.yorkshire-bsl-interpreters.co.uk' });
}

$('#optIn').click(function (){
  $.cookie('cookieOptIn', 'true', { expires: 365, path: '/'  });
  callGoogleAnaltics();
})
$('#optOut').click(function (){
  $.cookie('cookieOptIn', 'false', { expires: 365, path: '/'  });
  removeGoogleAnalyticsCookies();
})

function callGoogleAnaltics() {
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-66152570-2', 'auto');
ga('send', 'pageview');
}

document.onload = showCookieBanner();
document.onload = populatePerformanceCookiePreference();

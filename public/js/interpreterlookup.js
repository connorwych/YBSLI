var nInterpreters = 0;
function interpreterLookup() {
  "use strict";
  $.ajax ({
    method: "GET",
    dataType: "json",
    url: "/services/getListing",
    success: function( data ) {
      var interpreterTable = document.getElementById("interpreterTable");
      var dataRow = document.createElement("div");
      dataRow.className = "row";
      interpreterTable.appendChild(dataRow);

      // Add in main portrait entries
      for (var i=0; i<data.length; i++) {
        var interpreterEntry = document.createElement("div");
        interpreterEntry.id="entry--"+data[i].ROWID;
        interpreterEntry.className = "col-md-3 col-sm-3 col-xs-4 interpreterEntry";
        interpreterEntry.className += ("Y"===data[i].MENTAL_HEALTH_WORK) ? " mhy" : " mhn";
        interpreterEntry.className += ("Y"===data[i].LEGAL_WORK) ? " ly" : " ln";
        interpreterEntry.className += " " + data[i].GENDER;

        var interpreterImageContainer = document.createElement("div");
        interpreterImageContainer.className="interpreterImageContainer";

        var interpreterLink = document.createElement("a");
        interpreterLink.href = "/interpreter/?interpreterID="+data[i].ROWID;

        var interpreterImage = document.createElement("img");
        interpreterImage.src = data[i].IMG_URL;

        var interpreterNameContainer = document.createElement("div");
        interpreterNameContainer.className = "interpreterNameContainer";

        var interpreterName = document.createElement("p");
        interpreterName.innerHTML = data[i].FIRST_NAME + " " + data[i].SECOND_NAME;

        interpreterNameContainer.appendChild(interpreterName);
        interpreterLink.appendChild(interpreterImage);
        interpreterImageContainer.appendChild(interpreterLink);
        interpreterImageContainer.appendChild(interpreterNameContainer);
        interpreterEntry.appendChild(interpreterImageContainer);

        // Pass back to the main table
        dataRow.appendChild(interpreterEntry);
      }
    },
    error: function(){
      var interpreterTable = document.getElementById("interpreterTable");
      interpreterTable.innerHTML = "<p> An Error Occured, please try again later </p>";
    },
    complete: function() {
      var img =  $( ".interpreterEntry" ).find( "img" );
      var numImages = img.length;
      var numLoaded = 0;
        img.on( "load", function() {
          var self = $( this );
          numLoaded++;
          self.attr( "data-loaded", true );
          if( numImages === numLoaded ) {
            fixInterpreterNameWidth();
          }
      });
    }
  });
}
function fixInterpreterNameWidth() {
  document.querySelectorAll(".interpreterEntry").forEach(function(interpreterEntry) {
    var interpreterImage = interpreterEntry.querySelector("div");
    var interpreterNameContainer = interpreterEntry.querySelector("div").querySelector("div");
    var interpreterImageWidth = interpreterImage.offsetWidth;
    interpreterNameContainer.style.width=interpreterImageWidth + "px";
  });
}
document.onload = interpreterLookup();

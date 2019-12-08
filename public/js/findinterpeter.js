function interpreterLookup() {

	var urlParams
	var match,
	pl		 = /\+/g,	// Regex for replacing addition symbol with a space
	search = /([^&=]+)=?([^&]*)/g,
	decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
	query	= window.location.search.substring(1);

	urlParams = {};
	while (match = search.exec(query)) {
		urlParams[decode(match[1])] = decode(match[2]);
	}

	interpreterLookupID = urlParams.interpreterID;

	"use strict";
	$.ajax ({
		method: "GET",
		dataType: 'json',
		headers: {
			interpreterID: interpreterLookupID
		},
		url: "/services/getInterpreter",
		success: function(data){
			document.title = data[0].FIRST_NAME + " " + data[0].SECOND_NAME + " | Yorkshire BSL Interpreters";

			var interpreterImageContainer = document.createElement('div');
			interpreterImageContainer.className = 'interpreterBioImageContainer';

			var interpreterImage = document.createElement('img');
			interpreterImage.src = data[0].IMG_URL;

			interpreterImageContainer.appendChild(interpreterImage);

			var interpreterEntryLClolumn = document.createElement('div');
			interpreterEntryLClolumn.className = 'col-md-4';

			var interpreterEntry = document.createElement('div');
			interpreterEntry.className = 'row col-md-12';

			interpreterEntryLClolumn.appendChild(interpreterImageContainer);

			var interpreterName = document.createElement('h3');
			interpreterName.innerHTML = data[0].FIRST_NAME + " " + data[0].SECOND_NAME;

			var membershipString = "";
			if ( data[0].RSLI === "Y" ) {
				membershipString += "RSLI"
			}
			if (data[0].MASLI === "Y") {
				if ( membershipString != "" ) {
					membershipString += " / ";
				}
				membershipString += "MASLI";
			}
			if (data[0].MVLP === "Y") {
				if ( membershipString != "" ) {
					membershipString += " / ";
				}
				membershipString += "MVLP";
			}

			var interpreterDetails = document.createElement('div');
			interpreterDetails.insertAdjacentHTML('beforeend',"<p><strong>Membership: </strong>" + membershipString + "</p>");

			if ( data[0].YEAR_QUALIFIED != "") {
				interpreterDetails.insertAdjacentHTML('beforeend', "<p><strong>Year qualified: </strong>"	+ data[0].YEAR_QUALIFIED +"</p>" );
			}
			interpreterDetails.insertAdjacentHTML('beforeend', "<p><strong>Tel No: </strong>"	+ data[0].MOBILE +"</p>" );
			interpreterDetails.insertAdjacentHTML('beforeend', "<p><strong>Legal Work: </strong>"	+ data[0].LEGAL_WORK +"</p>");
			interpreterDetails.insertAdjacentHTML('beforeend', "<p><strong>Mental Health Work: </strong>"	+
			data[0].MENTAL_HEALTH_WORK+"</p>");

			var interpreterEntryRClolumn = document.createElement('div');
			interpreterEntryRClolumn.className = 'col-md-8';
			interpreterEntryRClolumn.appendChild(interpreterName);
			interpreterEntryRClolumn.appendChild(interpreterDetails);

			interpreterEntry.appendChild(interpreterEntryLClolumn);
			interpreterEntry.appendChild(interpreterEntryRClolumn);

			var interpretterEntryContainer = document.getElementById('interpreterEntryContainer')
			interpretterEntryContainer.appendChild(interpreterEntry);

			var interpreterIdInput = document.getElementById('interpreterID');
			interpreterIdInput.value = interpreterLookupID;

			if (data[0].BIO !="") {
				interpreterEntry.insertAdjacentHTML('beforeend',"<p style='white-space: pre-line;'><strong>Bio: </strong>" + data[0].BIO + "</p>");
			}
			if ( data[0].VIDEO_URL != "") {
				interpreterEntry.insertAdjacentHTML('beforeend', "<div class= 'embed-container'><iframe src=\"" + data[0].VIDEO_URL + "?rel=0 \" frameborder='0' allowfullscreen></iframe></div>" );
			}

		},
		error: function(){
			$('#options').hide();
			InterpreterEntryContainer.innerHTML = "<p> An Error Occured, please try again later </p>";
		}
	});
}
document.onload = interpreterLookup();

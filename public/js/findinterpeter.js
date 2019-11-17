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
			var idNumber					= data.columns.indexOf("rowid");
			var firstName					= data.columns.indexOf("FIRST_NAME");
			var secondName				= data.columns.indexOf("SECOND_NAME");

			var RSLIMembership		= data.columns.indexOf("RSLI");
			var MASLIMembership		= data.columns.indexOf("MASLI");
			var MVLPMembership		= data.columns.indexOf("MVLP");

			var interpreterBio		= data.columns.indexOf("BIO");

			var yearQualified			= data.columns.indexOf("YEAR_QUALIFIED");
			var mentalHealthWork	= data.columns.indexOf("MENTAL_HEALTH_WORK");
			var legalWork					= data.columns.indexOf("LEGAL_WORK");
			var telNumber					= data.columns.indexOf("MOBILE");
			var imgURL						= data.columns.indexOf("IMG_URL");
			var videoURL					= data.columns.indexOf("VIDEO_URL");

			document.title = data.rows[0][firstName] + " " + data.rows[0][secondName] + " | Yorkshire BSL Interpreters"; 

			var interpreterImageContainer = document.createElement('div');
			interpreterImageContainer.className = 'interpreterBioImageContainer';

			var interpreterImage = document.createElement('img');
			interpreterImage.src = data.rows[0][imgURL];

			interpreterImageContainer.appendChild(interpreterImage);

			var interpreterEntryLClolumn = document.createElement('div');
			interpreterEntryLClolumn.className = 'col-md-4';

			var interpreterEntry = document.createElement('div');
			interpreterEntry.className = 'row col-md-12';

			interpreterEntryLClolumn.appendChild(interpreterImageContainer);

			var interpreterName = document.createElement('h3');
			interpreterName.innerHTML = data.rows[0][firstName] + " " + data.rows[0][secondName];

			var membershipString = "";
			if ( data.rows[0][RSLIMembership] === "Y" ) {
				membershipString += "RSLI"
			}
			if (data.rows[0][MASLIMembership] === "Y") {
				if ( membershipString != "" ) {
					membershipString += " / ";
				}
				membershipString += "MASLI";
			}
			if (data.rows[0][MVLPMembership] === "Y") {
				if ( membershipString != "" ) {
					membershipString += " / ";
				}
				membershipString += "MVLP";
			}

			var interpreterDetails = document.createElement('div');
			interpreterDetails.insertAdjacentHTML('beforeend',"<p><strong>Membership: </strong>" + membershipString + "</p>");

			if ( data.rows[0][yearQualified] != "") {
				interpreterDetails.insertAdjacentHTML('beforeend', "<p><strong>Year qualified: </strong>"	+ data.rows[0][yearQualified] +"</p>" );
			}
			interpreterDetails.insertAdjacentHTML('beforeend', "<p><strong>Tel No: </strong>"	+ data.rows[0][telNumber] +"</p>" );
			interpreterDetails.insertAdjacentHTML('beforeend', "<p><strong>Legal Work: </strong>"	+ data.rows[0][legalWork] +"</p>");
			interpreterDetails.insertAdjacentHTML('beforeend', "<p><strong>Mental Health Work: </strong>"	+
			data.rows[0][mentalHealthWork]+"</p>");

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

			if (data.rows[0][interpreterBio]!="") {
				interpreterEntry.insertAdjacentHTML('beforeend',"<p style='white-space: pre-line;'><strong>Bio: </strong>" + data.rows[0][interpreterBio] + "</p>");
			}
			if ( data.rows[0][videoURL] != "") {
				interpreterEntry.insertAdjacentHTML('beforeend', "<div class= 'embed-container'><iframe src=\"" + data.rows[0][videoURL] + "?rel=0 \" frameborder='0' allowfullscreen></iframe></div>" );
			}

		},
		error: function(){
			$('#options').hide();
			InterpreterEntryContainer.innerHTML = "<p> An Error Occured, please try again later </p>";
		}
	});
}
document.onload = interpreterLookup();

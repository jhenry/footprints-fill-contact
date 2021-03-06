// ==UserScript==
// @name          Footprints Contact Filler
// @namespace     http://greengaloshes.cc
// @description	  Fills in contact info using email addresses that match uid@domain.tld
// @include       https://footprints.uvm.edu/*
// ==/UserScript==

  

var submitted_email_address = document.getElementById("userfield8").value;
var email_address = GetEmailParts(submitted_email_address);

if (email_address.user.length <= 8 && email_address.domain == "uvm" && email_address.ext == "edu") {

	document.getElementById("userfield4").value = email_address.user
	document.getElementById("userfield8").value = "";
	var extraURL = "";
	absearch(extraURL);


}


function absearch(extraURL)
{

window.open('/MRcgi/MRABregsearch_page.pl?USER=' + gup("USER") + '&PROJECTID=' + gup("PROJECTID") + '&MRP=' + gup("MRP") + '&ABMASTER=1&PID=' + gup("LASTID") + '&THEREGISTERPAGE=1' + extraURL, 'absearch','top=200,left=200,width=670,height=450,toolbar=no,directories=no,menubar=no,scrollbars=yes,resizable=yes');
    
}

// Get URL Parameters
// http://www.netlobo.com/url_query_string_javascript.html
function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

// Function: GetEmailParts
// Purpose: 
// Author: Ben Nadel / Kinky Solutions
// Link: http://www.bennadel.com/index.cfm?dax=blog:207.view
function GetEmailParts( strEmail ){
	// Set up a default structure with null values 
	// incase our email matching fails.
	var objParts = {
		user: null,
		domain: null,
		ext: null
		};
	 
	// Get the parts of the email address by leveraging
	// the String::replace method. Notice that we are 
	// matching on the whole string using ^...$ notation.
	strEmail.replace( 
		new RegExp( "^(.+)@(.+)\\.(\\w+)$" , "i" ), 
		 
		// Send the match to the sub-function.
		function( $0, $1, $2, $3 ){
			objParts.user = $1;
			objParts.domain = $2;
			objParts.ext = $3;
		}
		);
	 
	// Return the "potentially" updated parts structure.
	return( objParts );
}
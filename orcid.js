/**
 * Based on orcid.js by michaelcrabb 05/03/2017.
 * Modified by clintbellanger on 05/22/2019 for Auburn University Libraries
 */

// display the ORCID link and create list of works
function showORCIDProfile(orcidID, linkElementID, worksElementID) {
  
  if (orcidID == "XXXX-XXXX-XXXX-XXXX") {
    console.log("Notice: replace XXXX-XXXX-XXXX-XXXX with your ORCID ID in the embed code");
    return;    
  }
  
  createORCIDLink(orcidID, linkElementID);
  
  document.addEventListener("DOMContentLoaded", function(){
    createORCIDWorks(orcidID, worksElementID);
  });
    
}


// formatting for ORCID main profile link
function createORCIDLink(orcidID, linkElementID) {

  var output = "";
  output += '<div itemscope itemtype="https://schema.org/Person">';
  output += '<a itemprop="sameAs" content="https://orcid.org/' + orcidID + '" href="https://orcid.org/' + orcidID + '" target="orcid.widget" rel="noopener noreferrer" style="vertical-align:top;">';
  output += '<img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" style="width:1em;margin-right:.5em;" alt="ORCID iD icon">orcid.org/' + orcidID + '</a>';
  output += '</div>';
  
  document.getElementById(linkElementID).innerHTML = output;
        
}

// TEMP transitional
function createORCIDProfile(orcidID, elementID) {
    createORCIDWorks(orcidID, elementID);
}


// populate list of works by this ORCID person
function createORCIDWorks(orcidID, elementID) {

  var ORCIDLink = "https://pub.orcid.org/v2.0/" + orcidID + "/works";
  
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      var xmldata = xhr.responseXML;
     
      //DEBUG!
      //console.log(xmldata);

      var output = "";
      
      var groups = xmldata.getElementsByTagName("activities:group");
      
      // first create the blank Work elements on the page
      for (var i=0; i < groups.length; i++) {        
        var putcode = groups[i].getElementsByTagName("work:work-summary")[0].getAttribute("put-code");
        output += "<div id=\"work_" + putcode + "\" class=\"work\" ></div>\n";
      }
      document.getElementById(elementID).innerHTML = output;
      
      // next get the Work details asynchronously
      for (var i=0; i < groups.length; i++) {        
        var putcode = groups[i].getElementsByTagName("work:work-summary")[0].getAttribute("put-code");
        getWorkInformation(orcidID, putcode, "work_" + putcode);
      }
     
    }
  };
  xhr.open("GET", ORCIDLink, true);
  xhr.send();

}

function getWorkInformation(orcidID, putcode, elementID) {
  var ORCIDLink = "https://pub.orcid.org/v2.0/" + orcidID + "/work/" + putcode;
  
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      var xmldata = xhr.responseXML;
     
      //DEBUG!
      //console.log(xmldata);

      var output = "";
            
      // citations can be preformatted or in structured bibtex    
      var citation_raw = xmldata.getElementsByTagName("work:citation-value")[0].textContent;
      var citation;
      
      var bibtex_opener = "@article";
      
      if (citation_raw.substr(0, bibtex_opener.length) === bibtex_opener) { // bibtex style
        citation = formatBibTeXCitation(citation_raw);
      }
      else { // preformatted style
        citation = citation_raw;  
      }
      
      // here we use the base <work:url>, but
      // note there are external IDs that can form alternate URLs
      var element_url = xmldata.getElementsByTagName("work:url");
      var work_url = "";
      if (element_url && element_url[0] && element_url[0].textContent) {
        work_url = element_url[0].textContent;  
      }

      output = citation;
      output += "<br />\n";
      
      if (work_url) {
        output += "<a href=\"" + work_url + "\" target=\"_blank\">" + work_url; + "</a>";
      }
      
      document.getElementById(elementID).innerHTML = output;
     
    }
  };
  xhr.open("GET", ORCIDLink, true);
  xhr.send();  
}

function formatBibTeXCitation(bibtex_string) {
    
  // using https://github.com/ORCID/bibtexParseJs
  var bibtex = bibtexParse.toJSON(bibtex_string)[0].entryTags;
  
  //DEBUG!
  //console.log(bibtex);
  
  // using APA-like formatting 
  var output = "";
  output += bibtex.author + " ";
  output += "(" + bibtex.year + ") ";
  output += bibtex.title + ". ";
  output += "<i>" + bibtex.journal + "</i>, ";  
  if (bibtex.volume) {
    output += bibtex.volume + " ";
  }  
  if (bibtex.number) {
    output += "(" + bibtex.number + "), ";
  }
  if (bibtex.pages) {
    output += bibtex.pages + ".";  
  }
  
  return output;
}

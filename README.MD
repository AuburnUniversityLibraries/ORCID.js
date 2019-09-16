ORCID.js
========

##Client Side ORCID Generator

This library creates a simple way to include ORCID Works information on pages that allow Javascripts to be added.

Based on the ORCID.js library by Mike Crabb. https://github.com/mikecrabb/ORCID.js -- Our version is reimplemented using XMLHttpRequest instead of fetch, primarly to allow (current) compatibility with IE.

For citations using BibTex format, requires bibtexParseJs by ORCID: https://github.com/ORCID/bibtexParseJs -- MIT License

##Details

This library looks up a list of Works associated with an ORCID ID. For each work it displays the citation information (supporting plaintext or BibTex) and the URL. Optionally it also displays a formatted link to that ORCID profile.

##Hello World Example

Example of using this script in a simple HTML page:

https://github.com/AuburnUniversityLibraries/ORCID.js/blob/master/index.html

##See Also

ORCID has an official ORCID-js library that is more feature complete and comes with more dependencies: https://github.com/ORCID/orcid-js

##Licence
* This is made available and licensed under the MIT License:
* https://opensource.org/licenses/mit-license.html

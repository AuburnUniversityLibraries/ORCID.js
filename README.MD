ORCID.js
========

##Client Side ORCID Generator

This library creates a simple way to include ORCID Works information on pages that allow Javascripts to be added.

Based on the ORCID.js library by Mike Crabb. https://github.com/mikecrabb/ORCID.js -- Our version is reimplemented using XMLHttpRequest instead of fetch, primarly to allow (current) compatibility with IE.

Requires bibtexParseJs by ORCID: https://github.com/ORCID/bibtexParseJs -- MIT License

##Details

This library looks up a list of Works associated with an ORCID ID. For each work it displays the citation information (supporting plaintext or BibTex) and the URL. Optionally it also displays a formatted link to that ORCID profile.

##Hello World Example

```
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>ORCID XMLHttpRequest DEMO</title>
  
  <script src="bibtexParse.js"></script>  
  <script src="orcid.js"></script>

</head>

<body>

  <h1>My Profile</h1>
  <div id="myORCIDLink"></div>

  <h1>My Works</h1>
  <div id="myORCIDWorks"></div>  
  
  <script>
    showORCIDProfile("XXXX-XXXX-XXXX-XXXX", "myORCIDLink", "myORCIDWorks");
  </script>  

</body>
</html>

```

##See Also

ORCID has an official ORCID-js library that is more feature complete and comes with more dependencies: https://github.com/ORCID/orcid-js

##Licence
* This is made available and licensed under the MIT License:
* https://opensource.org/licenses/mit-license.html

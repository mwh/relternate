# relternate
Relternate is a WebExtension that adds a single button to the URL bar on
pages containing &lt;link rel=...&gt; entries in their header, which
displays a table of the relations and hrefs, with their types, media,
and hreflang attributes.

It prioritises alternate-type and -media representations, but lists all
entries in the page except stylesheets, icons, and preload/fetch items,
with clickable links to the relevant hrefs.

Relternate is available to install:

* [For Firefox] from addons.mozilla.org
* By [loading a temporary add-on] from the files in this repository
* For Chrome and Edge by editing the files to conform to the Chrome API


[For Firefox]: https://addons.mozilla.org/en-US/firefox/addon/relternate/
[loading a temporary add-on]: https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/

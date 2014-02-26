/site/meta/
===========

Generally, don't mess with this folder.  You do, however, need to configure your DNS settings to point meta.www.YourSiteNameHere.org to this folder.

You //might// want to reskin error.html, however config.html is mostly just an interface to the PouchDB database.  If you want a new 404, tell your server to point to one in your /site/www/ folder.

We stuff things into /meta/ because www is taken up by YOUR site.  We don't want to overwrite whatever you have created there.  We can't put things in /site because DNS redirects all *.site.tld to one file.  Since server configuration is generally based based on directory locations we had to put it in a directory.

Eventually, we would like to move error and config into a lazy-load Javascript function, stuff speech.js into the HTML file, and get rid of this folder entirely.
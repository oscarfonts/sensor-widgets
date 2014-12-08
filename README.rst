Sensor Widgets
==============

**Configurable graphical components for your SOS sensor data.**

*100% Javascript. Extensible. MIT licensed.*

* Demo & samples: http://sensors.fonts.cat/
* #SIGLibre8 slides (spanish): http://sensors.fonts.cat/doc/slides/
* Configure your own widgets:

   1. Go to http://sensors.fonts.cat/src/
   2. Choose a widget from the left menu.
   3. Configure it instantly with the "Widget Builder" wizard form.
   4. Embed the result in any web page, using an "object" (or an "iframe") tag.


Building
========

* Install node and npm. See instructions:
  * Mac & Windows: http://nodejs.org/download/
  * Debian & Ubuntu: https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager#debian-and-ubuntu-based-linux-distributions
* Install grunt-cli. For example: `sudo npm install -g grunt-cli`.
* Get the project's npm deps (such as grunt) running `npm install`.
* Build the project running `grunt build`.
* Run a server with livereload using `grunt` (default task).


Updating gh-pages (demo) branch
===============================

There's a demo kindly broght by gh-pages in: http://fonts.cat/sensor-widgets

Bring the master changes to the gh-pages branch::

	git checkout gh-pages
	git merge master

Update the js dependencies::

    grunt bower

Commit changes:

	git add -A
	git commit -m "Updated gh-pages & libs"
	git push

Check the demo page after 5 minutes.



Available widgets
=================

=========== ====================== ====================== =====================
Name        Library & dependencies Represented concept    Candidate properties
=========== ====================== ====================== =====================
Bearing     (SVG + JS)             Instant angle          Wind direction
Gauge       (SVG + JS)             Percentage             Relative humidity
jqGrid      jqGrid                 Any measurement        Any value
Map         Leaflet                Geographic Features    Features of Interest
Panel       (HTML + bootstrap-CSS) Instant quantities     Any collection
Progressbar (HTML + CSS)           Instant quantity       Pressure, wind speed,
                                                          solar radiation, etc.
Table       (HTML + bootstrap-CSS) Any measurement        Any value
Thermometer (SVG + JS)             Temperature            Temperature
Timechart   Flot Charts            Time series            Any numeric quantity
Windrose    Highcharts (not free!) Accumulated angular    Wind direction stats
=========== ====================== ====================== =====================

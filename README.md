# Sensor Widgets

**Configurable graphical components for your SOS sensor data.**

*100% Javascript. Extensible. MIT licensed.*

* Demo & samples: http://sensors.fonts.cat/
* #SIGLibre8 slides (spanish): http://sensors.fonts.cat/doc/slides/
* Configure your own widgets:

   1. Go to http://sensors.fonts.cat/src/
   2. Choose a widget from the left menu.
   3. Configure it instantly with the "Widget Builder" wizard form.
   4. Embed the result in any web page, using an "object" (or an "iframe") tag.


# Available widgets

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

# Building source code

* Install node, npm and grunt-cli.
* Download grunt with "npm install".
* Build the library using "grunt build".

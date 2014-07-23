==============
Sensor Widgets
==============

**Configurable graphical components for your SOS sensor data.**

*100% Javascript. Extensible. MIT licensed.*

* Demo & samples: http://sensors.fonts.cat/
* #SIGLibre8 slides (spanish): http://sensors.fonts.cat/slides/
* Configure your own widgets:

   1. Go to http://sensors.fonts.cat/widget/
   2. Choose a widget from the left menu.
   3. Configure it instantly with the "Widget Builder" wizard form.
   4. Embed the result in any web page, using an "object" (or an "iframe") tag.

Available widgets:

=========== ====================== ====================== =====================
Name        Library & dependencies Represented concept    Candidate properties
=========== ====================== ====================== =====================
Table       jqGrid                 Any measurement        Any value
Timechart   Flot Charts            Time series            Any numeric quantity
Map         Leaflet                Geographic Features    Features of Interest
Progressbar (HTML + CSS)           Instant quantity       Pressure, wind speed,
                                                          solar radiation, etc.
Gauge       (SVG + JS)             Percentage             Relative humidity
Thermometer (SVG + JS)             Temperature            Temperature
Bearing     (SVG + JS)             Instant angle          Wind direction
=========== ====================== ====================== =====================

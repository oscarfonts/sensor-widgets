===============================
Sensor Widgets for SOS services
===============================

A set of lightweight graphical components to display your standard sensor data:

#. Choose a widget from the menu.
#. Configure it instantly with the "Widget Builder" wizard.
#. Embed the result in any web page.

100% Javascript, MIT licensed.

TODO: Demo page(s) and tutorials.

Planned widgets:

=========== ====================== ==================== =====================
Widget name Drawing or library     Represented concept  Candidate properties
=========== ====================== ==================== =====================
Bearing     bearing.svg            Instant angle        Wind direction
Table       (TBD)                  Any                  Any
Timechart   (TBD)                  Time series          Any quantity
Map         Core in GeoJSON.       Geographic Entities  Features of Interest
            Possible plugins: OL2,
            Leaflet, OL3, GMaps
Progressbar (TBD)                  Instant quantity     Pressure, wind speed,
                                                        solar radiation
Gauge       gauge.svg              Percentage           Relative humidity
Thermometer thermometer.svg        Temperature          Temperature
Flask       erlenmeyer.svg         Accumulated quantity Precipitation
            tube.svg
=========== ====================== ==================== =====================

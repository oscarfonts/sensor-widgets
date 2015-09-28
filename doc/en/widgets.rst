=================
Available Widgets
=================

Compass
=======

The Compass widget belongs to the "single instant measure" category. It displays the latest value for a particular
Property expressing a direction or angle. The widget will periodically interrogate the server to get the latest value.

Mandatory inputs are:

* Service, Offering, Feature and Property: selects a particular property to be shown. Property should take values between 0 and 360 (unit of measure is supposed to be degrees).
* Refresh_interval (in seconds): is the time between updates (launches successive getObservations every Nth second).

Other optional inputs:

* Title: If not specified, defaults to the name of the Feature.
* Footnote: Optional small text caption at the bottom.
* Custom_css_url: css stylesheet to be applied to the widget.


Gauge
=====

Another "single instant measure", but for percentage values ranging 0 to 100.

Mandatory inputs are:

* Service, Offering, Feature and Property: selects a particular property to be shown. Property should take values between 0 and 100 (unit of measure is supposed to be %).
* Refresh_interval (in seconds): is the time between updates (launches successive getObservations every Nth second).

Other optional inputs:

* Footnote: Optional small text caption at the bottom.
* Custom_css_url: css stylesheet to be applied to the widget.


Jqgrid
======

It displays a `jqGrid table <http://www.trirand.com/blog/>`_, with a collection of observations for a given period of
time, each row being an observation. Results are paginated and can be sorted by any column value (Result time, Feature
name, Property Name, Value and Unit of Measure).

Mandatory inputs:

* Service, Offering, a collection of Features and a collection of Properties: selects a collection of feature-property combinations to be shown.
* Time_start and time_end: The result time range of the observations to be displayed.
* Title: the widget title.

Other optional inputs:

* Footnote: Optional small text caption at the bottom.
* Custom_css_url: css stylesheet to be applied to the widget. Please note that jqGrid look & feel is taken from the underlying jQuery-ui theme.

.. note:: this plugin depends on jQuery, jQuery UI and the jgGrid plugin itself. It's a rather heavy and not much
   customizable (it was made as an integration exercise with a legacy application). We recommend the use of other
   widgets such as the "table" one, which is more in the spirit of Sensor Widgets: lightweight, compact and easily
   customizable.


Map
===

This widget is special in many senses. First off, it represents a GetFeatureOfInterest response, instead of the most
usual GetObservation response.

Sencondly, it is a highly customizable widget, with a lot of configuration options. Fortunately most of the inputs are
optional, so its basic usage is in fact very simple.

The only strictly mandatory parameters are:

* Service and Offering: Determines the offering whose Features of Interest are to be displayed on a map.

This will display a map with the Features on it. Placing the mouse pointer over the map features will display a little
tooltip with the feature name.

.. figure:: ../img/map-no-features-no-properties.png
   :align: center

   Simple map with no features and no properties indicated.

There are another couple of mandatory (but not so mandatory) inputs:

* Features: One can select which features to display. If none is selected, *all* of the possible features are displayed (no filtering aplied). But you *have* to explicitly indicate an empty array of features as input.
* Properties: If one or more properties are selected, each feature's tooltip will be an embedded panel widget, displaying the list of properties. Again, you can indicate an empty array of properties. In this case, no property values are shown.

.. figure:: ../img/map-some-features-some-properties.png
   :align: center

   Simple map with four features and one property selected.

The "permanent_tooltips" optional parameter, if set to "true", will force the tooltips to be always shown, not only on
mouse hover.

.. figure:: ../img/map-permanent-tooltips.png
   :align: center

   Map with permanent tooltips.

Besides the tooltip, we can also attach a sub-widget to each feature, which will be displayed when clicking the feature.
The "popup_widget" input is a JSON structure which contains a Widget definition. The "service", "offering" and
"feature(s)" inputs for the widget are taken from the *parent* map widget, so are not needed. The "name" property
indicates which widget to be instantiated.

For instance, if we want to open a popup containing a "timechart" on each feature click, we have to indicate:

   * "name": "timechart",
   * ...all the timechart widget inputs, except for "service" and "offering".

For instance::

   {
       "name": "timechart",
       "title": "Temperatures",
       "properties": [
           "http://sensors.portdebarcelona.cat/def/weather/properties#32M",
           "http://sensors.portdebarcelona.cat/def/weather/properties#32",
           "http://sensors.portdebarcelona.cat/def/weather/properties#32N"
       ],
       "time_start": "2015-09-03T05:05:40Z",
       "time_end": "2015-09-03T08:05:40Z"
   }

.. figure:: ../img/map-with-custom-popup.png
   :align: center

   Map with a "compass" popup.

Apart from customizing both tooltips and popups with details about each feature, we can indicate a custom base layer
for the map, via the "base_layer" input. Two layer types can be specified:

* A Tile layer: Specify an "url", and a collection of "options". For example::

   {
      "url": "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      "options": {
	     "maxZoom": 19,
	     "attribution": "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap contributors</a>"
	  }
   }

The "url" and "options" parameters correspond to `Leaflet's TileLayer <http://leafletjs.com/reference.html#tilelayer>`_
"urlTemplate" and "TileLayer_options" respectively.

There's a good collection of free tile layers here: http://leaflet-extras.github.io/leaflet-providers/preview/

* A WMS layer: Specify "type": "wms", an "url" and a collection of "options". For example::

   {
      "type": "wms",
      "url": "http://geoserveis.icc.cat/icc_mapesbase/wms/service",
      "options": {
         "layers": "orto5m",
         "format": "image/jpeg",
         "attribution": "Ortofoto 1:5.000: CC-by <a href='http://www.icc.cat' target='_blank'>Institut Cartogràfic de Catalunya</a>"
      }
   }

.. figure:: ../img/map-custom-base-layer.png
   :align: center

   Map with a custom base WMS layer.

Another optional input is "max_initial_zoom": It indicates the maximum zoom level to use when the map is
first rendered. This avoids to zoom in too much, so we loose context, especially when a single point feature is drawn.

Finally, the common "footnote" and  "custom_css_url" inputs are also available.


See a complete live example here: http://bl.ocks.org/oscarfonts/265d734349396cf4372c


Panel
=====

Progressbar
===========

Status
======

Table
=====

Thermometer
===========

Timechart
=========

Windrose
========


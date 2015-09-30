=================
SOS in a nutshell
=================

Sensor Widgets are a visualization tool for `Sensor Observation Service (SOS)
<http://www.opengeospatial.org/standards/sos>`_ OGC standard services.

The widgets use a SOS client implementation prepared for version 2.0 of the standard, and, at this stage, they require a
JSON encoding endpoint, which is not a standard requirement, but an optional encoding provided by `52 north's SOS server
implementation v. 4.0.0 or above <http://52north.org/communities/sensorweb/sos/download.html>`_.

.. note:: The embedded SOS client can be extended to implement the mandatory KVP/XML encoding, which would make the
    Widgets fully compliant with the standard and compatible with any other SOS 2.0 server implementation.

A Sensor Observation Service offers data coming from a collection of sensors. This is how a SOS Service is
organized:


Concepts
========

.. warning:: The following is a simplified view of the main SOS concepts, just as a quick reference for newcomers,
    which will probably be more interested in actually viewing some data than in understanding the full SWE, SOS and
    O&M models. If you are deploying a SOS service, please don't take this quick note as reference, and take a look
    at the OGC standard specification documents (see reference at the end of this chapter).

Offering
--------

The data delivered by a SOS service is grouped in different offerings. For example, a "meteo" SOS service could have
the following offerings: Satellite, Radar, Station Observations, Prediction Maps, etc. Each offering exposes data from
a sensor or sensor network, described in its procedure.

Consider an Offering as a "sections" or "drawer" in a SOS Service, which classifies data based on their different nature
or origin.


Procedure
---------

A procedure describes a sensor, a collection of sensors, or a process that outputs some observations. It provides
metadata about sensor inputs, outputs, calibration, data processing algorithms, contact information, data availability
(space and time extents), etc.

It is generally encoded in `SensorML <http://www.opengeospatial.org/standards/sensorml>`_ format.

Consider a Procedure as metadata about the sensor(s) or process(es) that generates the data you will see.

One Offering is related to a single Procedure, whereas a Procedure can be used in many Offerings. For instance, a
Procedure can be a "Weather Station Network", and this same Procedure can be used in many Offerings (with differing
time spans or periodicities), such as "Weather Station Network Measurements during 2015".


Feature of Interest
-------------------

Each measurement in a SOS service is bound to a Feature Of Interest (FoI), which usually describes where the
observed phenomenon occurred. For example, for a satellite image, the Feature Of Interest could be the image's
footprint (polygon), and for a temperature measurement, it could be the thermometer location (point).

Consider them as a collection of places where data is referred to.


Observed Property
-----------------

The thing that is measured, such as: Temperature, Wind Direction, Cloudiness, Number of Vehicles... it can be numerical
(a quantity with a unit of measure), logical (true / false), categorical (sunny, cloudy, rainy), or descriptive (a text).


Observation
-----------

Finally, an observation is the value of an observed property at a particular time and place (Feature Of Interest).
For example: The temperature at location X on 22/09/2015 at 11:52 AM is 23 degrees celsius".

Usual data representations are a particular observation for a particular time and place, or a series of observations in
a given time span.


Operations
==========

Any SOS request operation has to indicate the following parameters:

* Service: ``SOS``.
* Version: ``2.0.0`` (the version supported by Sensor Widgets).
* Request: the Operation name, such as ``GetCapabilities``.

These are the SOS 2.0 Request operations used in Sensor Widgets:


GetCapabilities
---------------

The GetCapabilites response is quite verbose. The GetCapabilities request optionally accepts a ``sections`` parameter to
retrieve only specific parts of the document.

Specifically, the ``contents`` section describes the service as a collection of Offerings. Each offering containing:

* The Offering name (for instance "10-minute measurements"),
* The Offering identifier,
* The related Procedure identifier,
* The collection of Observable Properties (their identifiers),
* The geographical extent of the measurements (the bbox containing all the Features of Interest),
* The time span of the measurements (the time range containing all the Observations),

Full GetCapabilities JSON request example::

    POST http://sensors.fonts.cat/sos/json
    Content-Type: application/json
    Payload:
        {
            "service":"SOS",
            "version":"2.0.0",
            "request":"GetCapabilities",
            "sections":["Contents"]
        }

This Capabilities-contents document is used as an entry point to discover the SOS service structure and available data.
It provides a lot of identifiers, but little details, which have to be retrieved with subsequent requests to
DescribeSensor or GetFeatureOfInterest operations.


DescribeSensor
--------------

The DescribeSensor request accepts a ``procedure`` identifier parameter, and returns a SensorML document, containing
metadata about the sensor(s) or process(es) producing the offering's measurements.

The relevant contents are:

* The Procedure Identifier, Short Name and Long Name,
* A collection of keywords (useful for metadata catalog text search engines),
* Some contact information,
* The valid Time Period (redundant with Capabilities response),
* The observed BBOX (redundant with Capabilities response),
* The collection of Feature of Interest identifiers (new information not found in GetCapabilities contents),
* The collection of Offering Identifiers using this procedure (a back reference),
* An Output list: A collection of ObservableProperties with their corresponding IDs, names, types and Units of Measure.

This request is normally used to get the details that GetCapabilities doesn't provide, especially the description of
Observable Properties (names and units of measure).

Full DescribeSensor JSON request example::

    POST http://sensors.fonts.cat/sos/json
    Content-Type: application/json
    Payload:
        {
            "service":"SOS",
            "version":"2.0.0",
            "request":"DescribeSensor",
            "procedure":"http://sensors.portdebarcelona.cat/def/weather/procedure",
            "procedureDescriptionFormat":"http://www.opengis.net/sensorML/1.0.1"
        }


GetFeatureOfInterest
--------------------

The GetFeatureOfInterest accepts a ``procedure`` as parameter, and returns all the Features of Interest related to that
procedure. In fact, Features of Interest are bound to each Observation, but this operation provides a sort of "list"
of all possible Feature values.

It is useful to get the location details, such as their names and geometries. So, it's usually used to draw a map or a
place chooser.

Full GetFeatureOfInterest JSON request example::

    POST http://sensors.fonts.cat/sos/json
    Content-Type: application/json
    Payload:
        {
            "service":"SOS",
            "version":"2.0.0",
            "request":"GetFeatureOfInterest",
            "procedure":"http://sensors.portdebarcelona.cat/def/weather/procedure"
        }


GetDataAvailability
-------------------

The getDataAvailability request accepts a ``procedure``, and optionally a collection of ``FeatureOfInterest`` and/or
``ObservedProperty`` as parameters.

It returns the time span of the available observations for each combination of Procedure-Feature-Property. So we can
query the available data time span for any particular location and sensor.

Full GetDataAvailability JSON request example::

    POST http://sensors.fonts.cat/sos/json
    Content-Type: application/json
    Payload:
        {
            "service":"SOS",
            "version":"2.0.0",
            "request":"GetDataAvailability",
            "procedure":"http://sensors.portdebarcelona.cat/def/weather/procedure",
            "featureOfInterest":["http://sensors.portdebarcelona.cat/def/weather/features#02"],
            "observedProperty":["http://sensors.portdebarcelona.cat/def/weather/properties#31"]
        }


GetObservation
--------------

Finally, the data about measurements.

A GetObservation request accepts as parameters:

* An ``offering``,
* A collection of ``FeatureOfInterest``,
* A collection of ``ObservedProperties``,
* Temporal or Spatial Filters.

Specially interesting is the filtering, so one can constrain the query to a particular time period or geographical area.
Sensor Widgets only use the temporal filtering to get either the "lastest" available observation, or a collection of
observation in a given time period.

Full GetObservation JSON request example::

    POST http://sensors.fonts.cat/sos/json
    Content-Type: application/json
    Payload:
        {
            "service":"SOS",
            "version":"2.0.0",
            "request":"GetObservation",
            "offering":"http://sensors.portdebarcelona.cat/def/weather/offerings#10m",
            "featureOfInterest":["http://sensors.portdebarcelona.cat/def/weather/features#P3"],
            "observedProperty":["http://sensors.portdebarcelona.cat/def/weather/properties#31"],
            "temporalFilter":[{
                "equals":{
                    "ref":"om:resultTime",
                    "value":"latest"
                }
            }]
        }


The response is a collection of observations, each one containing:

* Its related Offering Identifier,
* Its related Procedure Identifier,
* Its related Feature of Interest (with its corresponding Name, Identifier and full Geometry),
* Its related Observable Property Identifier,
* Phenomenon time (when something happened) and result time (when the resulting measurement was obtained),
* Finally, the result, which is composed of a **value** and a unit of measure.

The whole response is tediously verbose and redundant, with some element descriptions being repeated again and again
hundreds or thousands of times in the same response. Imagine a series of 5000 observations from the same sensor.
All the fields except times and values are repeated 5000 times without need. This seriously impacts on SOS service
response speed and lightness.

Some service implementors (namely 52n SOS 4.0.0+) provide some strategies that extend the core standard to alleviate
the situation, such as the aforementioned JSON format service encoding, and an extension called
``MergeObservationsIntoDataArray``, that "collapse" all the observations sharing the same procedure, feature of interest
and observed property into a single ``SweArrayObservation``.

.. note:: The Sensor Widgets don't take advantage of the ``MergeObservationsIntoDataArray`` extension. This is a
    potential future improvement.


Reference
=========

Standards documents from the Open Geospatial Consortium:

* OGC® Sensor Web Enablement: Overview And High Level Architecture v. 3 (White Paper). Ref. OGC 07-165.
* OpenGIS® SWE Service Model Implementation Standard v. 2.0. Ref. OGC 09-001.
* OGC® SWE Common Data Model Encoding Standard v. 2.0.0. Ref. OGC 08-094r1.
* Sensor Observation Service v. 1.0. Ref. OGC 06-009r6.
* OGC® Sensor Observation Service Interface Standard v. 2.0. Ref. OGC 12-006.
* OpenGIS® Sensor Model Language (SensorML) Implementation Specification v. 1.0.0. Ref. OGC 07-000.
* OGC Abstract Specification - Geographic information — Observations and measurements v.2.0. Ref. OGC 10-004r3.
* Observations and Measurements - XML Implementation v.2.0. Ref. OGC 10-025r1.

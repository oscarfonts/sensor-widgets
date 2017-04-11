========================
Using the Sensor Widgets
========================

Each widget has a collection of mandatory inputs, and some optional inputs. Setting up a widget is essentially choosing
the correct input values to get the desired result.


The Wizard
==========

The easiest way to configure a Widget is using the Wizard, which will help us choose the input values based in a range
of valid values. For instance, most of the widgets take an "offering", one or more "features" and one or
more "properties" as mandatory inputs. The wizard will inspect a SOS service for you and let you pick from a list of
existing offerings, features and properties.

Other typical mandatory inputs are the refresh interval, for widgets showing live data that has to be updated
periodically, or the time range, for widgets that show different values during a period of time. In the later case, the
time picker will limit its possible values to the available data time range, and will format the initial and final dates
for us.

Typical optional parameters are the "footnote", a free text to be displayed along with the widget, and a Custom CSS URL,
a mechanism to override the default widget style.

For details on each widget inputs and their format, please refer to the next chapter.

So, once we fill the widget configuration form, we can click on "Create Widget", and will get a widget preview, and
three ways to "take away" the resulting widget: As a standalone web page, as an embeddable HTML component, or as a
piece of code to be integrated in a larger javascript application.


Take away: Link and Embed
=========================

If we click on the generated "link" from the Wizard, we will get a rather long URL. This URL opens a web page with
the configured widget. We can just use the widget as is and stop bothering about the link's internal structure.

But for those that want to understand how the links work (for instance, to generate or manipulate widgets manually,
without having to go through the wizard), let's see how they are built, decomposing an example into its parameters::

    http://sensors.fonts.cat/widget/
        name=compass
        service=http://demo.geomati.co/sos/json
        offering=http://sensors.portdebarcelona.cat/def/weather/offerings#10m
        feature=http://sensors.portdebarcelona.cat/def/weather/features#P3
        property=http://sensors.portdebarcelona.cat/def/weather/properties#31
        refresh_interval=5
        lang=en

.. note:: To have a valid URL, the parameter values have to be encoded using javascript's standard
   ``encodeURIComponent`` function (or equivalent in your language of choice). For clarity, we have presented them
   decoded in this example.

This is mostly the widget form input values. The wizard form let us choose an offering, feature and property names, but
the widget configuration works with identifiers instead. The wizard inspected the SOS service for us to grab all the
available name-identifier pairs. You can get the valid identifiers manually via a ``GetCapabilities`` operation.

There are a couple of extra parameters which are not widget inputs:

* The first one "name": It is the widget name, to know which widget has to be created.
* The last one, "lang": It is used to translate the possible text labels. It is optional and defaults to English ("en"). Other supported languages are Spanish ("es") and Catalan ("ca").

The "embed" option just wraps the link in an iframe tag, so it can be embedded in any other web site::

   <iframe src="..." width="570" height="380" frameBorder="0"></iframe>

Width and height are taken from the widget form (recommended dimensions) but can be customized by just resizing
the widget view (mind the handle in the bottom left corner).


Usage in Javascript
===================

Finally, the most flexible way of using the widgets is programmatically. You just need to load the Sensor Widgets
javascript library, which is available at http://sensors.fonts.cat/js/SensorWidgets.js , and instantiate the widget
using the SensorWidget factory, which takes three parameters::

    SensorWidget(widget_name, widget_configuration, dom_element);

The widget name is a string, the widget configuration is an object whose properties are the input name&values, and the
DOM element indicates where in the HTML page to render the widget.

The most practical way to generate a widget is to use the wizard and copy&paste the code snippet. Then you can add
dynamism by changing some of its configuration values.

See a live example here: http://bl.ocks.org/oscarfonts/5ad801cf830d421e55eb


.. note:: The ``SensorWidget`` function has no return value, but some of the parameters accept a callback function.
   Widgets are created asynchronously. In case of error, an error message will be displayed to the user in place of the widget.


Making low level SOS calls with Javascript
------------------------------------------

.. warning:: Direct access to low-level SOS operations is experimental.
   The API described here can change at any time.

The SOS client instance is obtained asynchronously::

    getSOS(function(SOS) {
        // You must indicate a 52n SOS 4.x UrL with JSON encoding
        SOS.setUrl("http://sensorweb.demo.52north.org/sensorwebtestbed/service");
        // Then call any other SOS method
    });

This is the API::

    SOS.getCapabilities(callback, error); // Get the GetCapabilties "contents" section.
    SOS.describeSensor(procedure, callback, error); // Get the SensorML document converted to a JSON structure.
    SOS.getFeatureOfInterest(procedure, callback, error); // Get all the FeatureOfInterest for the given procedure.
    SOS.getDataAvailability(procedure, offering, features, properties, callback, error); // Get the time range of availability for each combination of procedure + feature + property.
    SOS.getObservation(offering, features, properties, time, callback, error); // Get the observations for the given combination of parameters.

Where the parameters are:

 * `callback` (function) gathers the response as a Javascript object (parsed JSON).
 * `error` (function) callback invoked in case the SOS service returns an error.
 * `procedure` (string) procedure identifier.
 * `offering` (string) offering identifier.
 * `features` (array de strings) list of Features Of Interest for which we want to get a response.
 * `properties` (array de strings) list of Observable Properties for which we want to get a response.
 * `time` the instant (if it's a string) or time range (if it's an array of 2 strings) for which we eant to get a response.
   Times are indicated in UTC, format "yyyy-mm-ddThh:mm:ssZ". The special "latest" value is used to get the most recent available observation.

And their optionality:

* The `callback` function is always mandatory, and the `error` function is always optional.
* It is mandatory to indicate the `procedure` for `describeSensor` and `getFeatureOfInterest` methods.
* For `getDataAvailability` and `getObservation`, the filters (procedure, offering, features, properties, time) are optiona. Set them to `undefined` in case you don't want to filter by a particular concept.


Custom styling
==============

All the widgets accept a ``custom_css_url`` input parameter. You can point to a css stylesheet published elsewhere that
overrides the default widget styles.

All widgets are contained in a div element with two classes: the ``widget`` class, and the widget's name class. For
instance, the following rule will apply to all widgets::

    .widget {
        border: 2px solid black;
    }

And the following one will apply only to the ``compass`` widget::

    .widget.compass {
        background-color: grey;
    }

Another common element is the ``footnote`` class::

    .widget .footnote {
        font-color: red;
    }

One could even hide some components if not needed. For example, the title::

    .widget.thermometer h1 {
        display: none;
    }

For more specific styling, the best practice is to inspect the widget DOM, and apply css rules to the observed elements.

==============================
Contributing to Sensor Widgets
==============================

Getting the code
================

Requires git::

    git clone git@github.com:oscarfonts/sensor-widgets.git

If you want to contribute some changes, first fork it on github, work on your own fork, and submit a pull request to the
upstream repo.


Code organization
=================

This is 100% JavaScript. The following tools are used:

* Bower: manages javascript dependencies (libraries).
* Grunt: automates development tasks.
* RequireJS: keeps the code modular and dynamically loads only the needed modules.

From the bottom up, modules are:

main.js
-------

The application entry point. Contains the requirejs configuration, where third party libraries are declared, as long as
their transitional dependencies (shims).


XML.js
------

Utility module to convert from XML to JSON and vice-versa. Based on `a script from Stefan Goessner
<http://www.xml.com/pub/a/2006/05/31/converting-between-xml-and-json.html>`_.

It has two methods:

* read(xml): Parses an xml input (as a string, DOM document or DOM element) and returns a JSON object.
* write(object): Parses JSON object and returns an XML string.

The "read" method has a second parameter ("clean") which, if set to true, will generate a much browsable JSON object,
ignoring XML namespaces and not prepending attributes with an "@". It is easier to use, but some information is lost
in conversion, so the JSON cannot be converted back to an equivalent XML document.

The Sensor Widget library uses this module to convert to a JavaScript Object the SensorML document embedded in a
DescribeSensor response (as of 52n SOS server 4.0.0, the SensorML is returned in XML format, even when using the JSON
encoding endpoint).


SOS.js
------

The SOS client. It implements the most usual SOS 2.0 queries, and, at this point, only "talks" 52n's JSON encoding (not
the KVP/XML encoding required by the standard). So, it isn't meant as a full standard interface implementation, but as
the minimal code needed to retrieve information from a 52n SOS 4.0.0 server.

Thanks to the aforementioned XML.js module, it would be relatively easy to support the KVP/XML encoding as well.

It has a setter method for the sevice's base URL:

* setUrl(url): Sets the SOS service base URL.

And a collection of methods named after the SOS 2.0 operations they implement:

* getCapabilities(callback, errorHandler).
* describeSensor(procedure, callback, errorHandler).
* getFeatureOfInterest(procedure, callback, errorHandler).
* getDataAvailability(procedure, offering, features, properties, callback, errorHandler).
* getObservation(offering, features, properties, time, callback, errorHandler).

Methods accept the parameters required to build the SOS query:

* procedure: the procedure ID.
* offering: an offering ID.
* features: an array of Feature IDs (if single feature, just wrap into a single element array).
* properties: an array of Property IDs (if single property, just wrap into a single element array).
* time: can be the "latest" literal to get the last observation, a single timestamp to apply an "equals" filter, or an array of two timestamp values for a "during" filter. Timestamp values are strings formatted as an UTC ISO 8601 date and time. That is, "YYYY-MM-DD[T]HH:mm:ss[Z]" as `momentjs format definition <http://momentjs.com/docs/#/displaying/format/>`.

Query is sent via AJAX, and one of the two callback functions is called:

* callback(response): All went OK, response contains a JSON object data structure.
* errorHandler(status, url, request, response): Something went wrong.

Simple usage example::

    SOS.setUrl("http://demo.geomati.co/sos/json");
    SOS.getCapabilities(function(contents) {
        console.log("Service has " + contents.length + " offerings.");
    });


sos-data-access.js
------------------

Widgets can use the SOS module directly (for instance, the map widget does), but most widgets have to perform some
common tasks before and after calling the SOS getObservation request: validating and formatting the input parameters,
getting and caching metadata such as property names, and rearranging the response so it can be consumed easily.

This module returns a "constructor" function that takes as parameters the widget config, a draw callback function,
and an error callback function. The constructor returns an object with a single "read" method. Let's see its usage::

    var widget_inputs = {
        offering: "offeringID",
        features: [...]
        properties: [...],
        ...
    }

    var data = sos_data_access(widget_inputs, onDraw, onError);

    function onDraw(observations) {
        // render the observation values
    }

    function onError() {
        // display an error message
    }

    data.read(); // get the data from the SOS service and call the onDraw function on success


The "read" method will in turn request a SOS.getObservation with the parameters specified in the config object,
and call the onDraw function when the response is received. This draw function receives an array of observations, where
each observation has the following properties::

    {
        "time": /* A Date object */,
        "value": 67.17,
        "feature": "Sirena",
        "property": "Wind direction",
        "uom": "deg"
    }

This is a pruned and flattened version of a full getObservation response, adapted for drawing purposes. That's why it
contains feature and property names instead of internal identifiers, for example.

So most widgets won't "see" the SOS protocol directly, not even deal with SWE concepts, but use this "read data" =>
"draw callback" approach, which is much simpler.

It would be feasible to provide other non-SOS-data-access modules implementing this same interface, so widgets can be
used to display data coming from legacy (non-SOS) protocols.


widget-common.js
----------------

And again, there are some common features shared by most of the widgets, that have nothing to do with data access.
This module provides:

* The common "mandatory" and "optional" input lists, which are::

    inputs: ["service", "offering"]
    optional_inputs: ["footnote", "custom_css_url"]

* An initialization method that renders the footnote and loads the custom CSS stylesheet, when provided. So any widget that wants to implement these functions will call ``common.init`` method within its own init method.


i18n.js and translations.json
-----------------------------

The way to translate the application is through the i18n module, which has the following methods::

    i18n.langs(); // returns a list of supported languages
    i18n.setLang('es'); // sets the active lang
    i18n.getLang(); // returns the active lang
    i18n.t("Original String Text"); // returns a translation of the original string text in the active lang
    i18n.addTranslations(object); // adds some extra translation strings to the base bundle; useful dynamically extend the ``translations.json`` contents
    i18n.translateDocTree(dom_element); // translates all the texts contained in this dom element; useful to translate static HTML contents

The i18n module will load the ``translations.json`` file, which contains all the translations, like this::

    "No widget name specified": {
        "es": "No se ha especificado ningún nombre de widget",
        "ca": "Cal especificar un nom de widget"
    }

The key is the text to be translated in the original language (English), and it contains an object with as many
properties as translations provided.


SensorWidget.js
---------------

This is *the* entry point to the Sensor Widgets library, and its returned function constitutes all the public interface.
This function is a Widget Factory: Given a widget name and some input parameters, it renders the widget into the
specified HTML DOM Element::

    var el = document.getElementById('map-container');

    var inputs = {
        service: "http://sensors.portdebarcelona.cat/sos/json",
        offering: "http://sensors.portdebarcelona.cat/def/weather/offerings#10M",
        features: [],
        properties: []
    };

    var widget = SensorWidget("map", inputs, el);

It also provides a default error handling function which will display the error message inside the same DOM Element.

When used as a "global" function it returns nothing, but when used as a require module, it returns an object with some
useful stuff::

    widget.name; // a string with the widget name ("map") in the example
    widget.config; // an object with the provided inputs
    widget.renderTo; // the provided DOM element where widget is going to be rendered

    widget.url(); // returns a link to a web page with a live instance of this widget
    widget.iframe(width, height); // returns an <iframe> tag containing the former URL.
    widget.javascript(); // returns a javacript snippet to build this widget instance.

    widget.inspect(inspect_callback); // provides a method to inspect the widget's interface: mandatory and optional inputs, and preferred sizes.

    function inspect_callback(mandatory_inputs, optional_inputs, preferred_sizes) {
        // use these values to display information about the widget interface.
        // Used in Wizard to build the Configuration Form by "introspection", and also in the project's home page.
    }

The callback is needed because the SensorWidget factory will load the widget code dynamically on demand, so its interface
is only accessible asynchronously. This dynamic (lazy) loading mechanism avoids having to load widget code and the respective
library dependencies unless needed. For instance, don't load the Leaflet library until a Map widget has to be created.

widget/<widget_name>.js
-----------------------

As all the common functionality (data access, shared inputs, instantiation) is placed in other modules, the actual widget
code is really concise. The "gauge" widget is only 50 lines of code, and the most complex ones ("map", "windrose")
take only 150 lines of code.

A widget has to implement the following interface, needed by the ``SensorWidget`` factory described above::

    return {
        inputs: ["service", "offering"], // array of mandatory input names
        optional_inputs: ["footnote", "custom_css_url"], // array of optional input names
        preferredSizes: [{w: 300, h: 300}], // array of recommended widget dimensions in pixels, provide at least one

        init: function(config, element, errorHandler) { // the constructor function
            // Read config, fetch data, draw widget on element
            return {
                destroy: function() {
                    // Clear timers and event handlers to prevent leaks
                }
            };
        }


Automated tasks
===============

`Grunt <http://gruntjs.com/>`_ is used to automate common javascript development tasks.

Grunt itself is run on nodejs and its dependencies managed with ``npm`` and the ``package.json`` file. Make sure to
have node and npm installed on your system:

* Mac & Windows: http://nodejs.org/download/
* Debian & Ubuntu: https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager#debian-and-ubuntu-based-linux-distributions

Then:

* Install grunt-cli. For example: `sudo npm install -g grunt-cli`.
* Get the project's npm dependenciess (such as grunt itself and its extensions) running `npm install`.

Now we are prepared to run the different `grunt` tasks:

Bower
-----

Gets the javascript dependencies, such as RequireJS, jQuery, jQuery UI, jqGrid, Flot Charts, Leaflet, Highcharts, etc.

It also picks the needed library files from the ``bower_components`` directory and places them on the cleaner ``js/lib/`` directory.
This is where requirejs expects to find the external dependencies.


Default
-------

The default task (run as `grunt` without arguments) is to start a local http server that exposes the whole project so
it can be tested on the browser. It also uses a  `watch` subtask that will reload the page every time a javascript file
is changed on disk.


Build
-----

For development purposes, we work on the `src/` directory. But the distribution files are a concatenated and minified
version of the source ones. The build task will perform the following subtasks:

* Clean: cleans the `lib` contents (dependencies) and the `dist` contents.
* Bower: fetches the libraries and places the needed files into `lib` again.
* JSHint: warns about coding errors in javascript. The build process will break at this stage until no hint warnings are detected.
* RequireJS: This task concatenates and minifies the source code (using the r.js optimizer and uglify) into various modules:
  * SensorWidgets.js: The base module, containing requirejs, the main config, and 'XML', 'SOS', 'sos-data-access', 'widget-common', 'i18n', and 'SensorWidget' modules, among others.
  * widget/<widget_name>.js: Contains the minified version of the widget, and its dependencies inlined (such as svg content). Each widget is kept in a separate module so optimized code can be loaded dinamically as well.
* ProcessHTML: Manipulates the sample page HTML headers so they load the optimized SensorWidget version.

It is recommended to run the 'build' task and test the 'dist' version before pushing changes to the main branch.

Publish
-------

This is not to push source code to git, but to update the  http://sensors.fonts.cat contents with an optimized version
of your local code status. It runs the build task and uploads the resulting 'dist' directory.


How to document
===============

This documentation is written in `Sphinx <http://sphinx-doc.org/>`_ and hosted in
`ReadTheDocs <http://sensor-widgets.readthedocs.org/en/latest/>`_. Documentation is automatically rebuilt on ReadTheDocs
when a change is pushed to GitHub.

Please contribute to this documentation via pull request.

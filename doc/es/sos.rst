========================
Resumen del estándar SOS
========================

Los Sensor Widgets son una herramienta de visualización de datos para servicios que cumplan con el estándar `Sensor Observation Service (SOS)
<http://www.opengeospatial.org/standards/sos>`_ de la OGC.

Los widgets implementan un cliente SOS que soporta la versión 2.0 de estándard, y, en estos momentos, necesitan un endpoint
en formato JSON, que resulta no ser un requisito del estándar, sino una funcionalidad opcional que proporciona la implementación de `servidor SOS de 52 north
en su versión 4.0.0 o superior <http://52north.org/communities/sensorweb/sos/download.html>`_.

.. note:: De hecho, el cliente SOS podría ser extendido para soportar la codificación obligatoria KVP/XML,
   con lo que los Sensor Widgets serían compatibles con otras implementaciones de servidores SOS 2.0.

Un *Sensor Observation Service* ofrece datos procedentes de una colección de sensores. Así es como está organizado un
servicio SOS:


Conceptos
=========

.. warning:: La siguiente es una visión simplificada de los principales conceptos de SOS, así como una referencia rápida para los recién llegados,
   que probablemente estén más interesados en visualizar algunos datos que en la plena comprensión de los conceptos tras los estándares SWE, SOS y O&M de OGC.
   Si se va a implementar un servicio SOS, se recomienda no tomar este resumen como referencia, y acudir a las
   especificaciones estándar de OGC (ver referencias al final de este capítulo).


Offering
--------

Los datos servidos por un servicio SOS se agrupan en diferentes *offerings*. Por ejemplo, un servicio SOS "meteo" podría tener
los siguientes offerings: imágenes de satélite, datos de radar, medidas de estaciones meteorológicas, mapas de predicción, etc. Cada offering expone datos de
un sensor o una red de sensores, descritos como un *procedure*.

Se pueden considerarlos distintos Offerings como secciones co cajones que clasifican los diferentes datos según su origen o naturaleza.


Procedure
---------

Una procedure describe un sensor, una colección de sensores, or un proceso que produce un conjunto de observaciones. Proporciona metadatos sobre
las entradas y salidas del sensor, datos de calibración y procesado, información de contacto, y la disponibilidad de datos (extensiones espacial y temporal), etc.

Normalmente viene descrito en el formato `SensorML <http://www.opengeospatial.org/standards/sensorml>`_.

Se puede considerar una Procedure como una ficha de metadatos acerca del (los) sensor(es) o proceso(s) a cargo de generar los datos que ofrece el servicio.

Un Offering está relacionado con una sola Procedure, mientras que una Procedure puede ser usada en diferentes Offerings.
Por ejemplo, una Procedure podría ser una "Red de Estaciones Meteorológicas", y ésta misma red de estaciones ser usada en
diferentes Offerings, por ejemplo para diferentes períodos de tiempo. El Offerinf sería "Medidas de la Red de Estaciones
Meteorológicas para el año 2015".


Feature of Interest
-------------------

Cada observacion en un servicio SOS está ligada a una *Feature Of Interest* (FoI), que habitualmente determina el lugar
donde el fenómeno observado tuvo lugar. Por ejemplo, para imágenes satélite, la FoI podría ser su *footprint* (polígono que
determina el área fotografiada sobre la superficie de la tierra), o para una medición de temperatura, la FoI podría ser la
ubicación del termómetro (punto).

Las FoI pueden considerarse como el conjunto de lugares a los que están referidos los datos.


Observed Property
-----------------

La propiedad que se mide, tal que: Temperatura, Dirección del viento, Nubosidad, Número de vehículos... puede ser un valor
numérico (una cantidad y una unidad de medida), lógico (toma los valores verdadero o falso), categórico (un valor de
entre una lista: soleado, nublado, lluvioso), o descriptivo (un texto).


Observation
-----------

Finalmente, una *Observation* es el valor que toma una *Observed Property* en un momento (Phenomenon Time) y un lugar (Feature Of Interest) dados.
Por ejemplo: "La temperatura en Barcelona el 22/09/2015 a las 11:52 es de 23 grados centígrados".


Peticiones
==========

Todas las peticiones SOS han de indicar los siguientes parámetros:

* Service: ``SOS``.
* Version: ``2.0.0`` (es la versión soportada por los Sensor Widgets).
* Request: el nombre de la petición, por ejemplo ``GetCapabilities``.

A continuación presentamos las peticiones SOS 2.0 que usadas en los Sensor Widgets:


GetCapabilities
---------------

Puesto que la respuesta de un GetCapabilites es bastante prolija, la petición GetCapabilities permite especificar un parámetro ``sections`` para
recuperar sólo parte del documento.

En concreto, la sección ``contents`` describe el servicio como una colección de Offerings. Cada Offering contiene los siguientes detalles:

* El nombre del Offering (por ejemplo "observaciones diezminutales"),
* El identificador del Offering,
* El identificador del Procedure ligado a éste offering,
* La colección de Observable Properties (sus identificadores),
* La extensión espacial de las observaciones que contiene (el rectángulo contenedor -bbox- de todas las Features of Interest),
* La extensión temporal de las observaciones que contiene (período de tiempo que acota todas las Observations).

Ejemplo de petición GetCapabilities en formato JSON::

    POST http://sensors.fonts.cat/sos/json
    Content-Type: application/json
    Contenido:
        {
            "service":"SOS",
            "version":"2.0.0",
            "request":"GetCapabilities",
            "sections":["Contents"]
        }

Éste documento de Capabilities (sección contents) es el punto de entada para descubrir cómo está estructurado determinado servicio SOS, así como los datos que contiene.
El documento contiene muchos identificadores de los distintos elementos (procedures, properties) pero no sus detalles, que deberán obtenerse mediante otras peticiones
como DescribeSensor o GetFeatureOfInterest.


DescribeSensor
--------------

La petición DescribeSensor accepta como parámetro un identificador de ``procedure``, y devuelve un documento SensorML que contiene
metadatos acerta de el (los) sensor(es) o proceso(s) que genera(n) las observaciones.

Los contenidos más relevantes de este documento son:

* El identificador de la Procedure, un nombre corto y un nombre más largo,
* Una colección de palabras clave (útiles para servicios de búsqueda en catálogos de metadatos),
* Información de contacto,
* El período de tiempo de validez (redundante con la respuesta de Capabilities),
* El BBOX observado (redundante con la respuesta de Capabilities),
* La colección de Features of Interest (sus identificadores - nueva información que no se encuentra en el GetCapabilities),
* La colección de Offerings (sus identificadores) que se basan en esta procedure,
* Una lista de salidas (Optputs): Una colección de ObservableProperties y su descripción: IDs, nombres, tipos y unidades de medida.

Esta petición se usa para ampliar detalles que no se ofrecen a través del GetCapabilities, en especial la descripción de las
Observable Properties (sus nombres y unidades de medida).

Ejemplo de petición DescribeSensor en formato JSON::

    POST http://sensors.fonts.cat/sos/json
    Content-Type: application/json
    Contenido:
        {
            "service":"SOS",
            "version":"2.0.0",
            "request":"DescribeSensor",
            "procedure":"http://sensors.portdebarcelona.cat/def/weather/procedure",
            "procedureDescriptionFormat":"http://www.opengis.net/sensorML/1.0.1"
        }


GetFeatureOfInterest
--------------------

La operación GetFeatureOfInterest acepta una ``procedure`` como parámetro, y devuelve todas las Features of Interest relacionadas con dicho
procedure. De hecho, las Features of Interest están vinculadas a cada una de las Observation, pero esta operación nos devuelve una suerte de inventario
de todos sus posibles valores.

Es útil para obtener los detalles de las diversas localizaciones, como sus nombres y geometrías. Así que generalmente se utiliza ésta operación para poder dibujar un mapa
o un selector de Features por nombre.

Ejemplo de petición GetFeatureOfInterest en formato JSON::

    POST http://sensors.fonts.cat/sos/json
    Content-Type: application/json
    Contenido:
        {
            "service":"SOS",
            "version":"2.0.0",
            "request":"GetFeatureOfInterest",
            "procedure":"http://sensors.portdebarcelona.cat/def/weather/procedure"
        }


GetDataAvailability
-------------------

La petición GetDataAvailability también acepta una ``procedure``, y opcionalmente una colección de ``FeatureOfInterest`` y/o
``ObservedProperty`` como parámetros.

Devuelve el rango temporal dentro del cual existen datos para cada combinación Procedure-Feature-Property. Así,
dado un sensor determinado, sabemos para qué fechas vamos a disponer de datos.

Ejemplo de petición GetDataAvailability en formato JSON::

    POST http://sensors.fonts.cat/sos/json
    Content-Type: application/json
    Contenido:
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

Y, finalmente, los datos de medida.

Una petición GetObservation acepta los siguientes parámetros:

* Un ``offering``,
* Una colección de ``FeatureOfInterest``,
* Una colección de ``ObservedProperties``,
* Filtros espaciales y/o temporales.

El filtrado es especialmente interesante, puesto que pueden restringirse las búsquedas de datos a un período de tiempo o
un área geográfica concreta. Los Sensor Widgets existentes hasta la fecha sólo usan el filtrado temporal para obtener, o
bien el último dato disponible ("latest"), o bien una serie temporal de datos en un período dado (por ejemplo, últimas 3 horas).


Ejemplo de petición GetObservation en formato JSON::

    POST http://sensors.fonts.cat/sos/json
    Content-Type: application/json
    Contenido:
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


La respuesta es una colección de observaciones, donde cada observacion consta de:

* El identificador del Offering del que procede,
* El identificador del Procedure que la generó,
* La Feature of Interest a la que se refieren (descripción completa, con su ID, nombre y geometría),
* El identificador de la Property que se ha observado (pero no su nombre),
* Phenomenon time (cuándo ha sucedido lo que se ha medido) y result time (cuándo se ha obtenido el dato),
* Y, por fin, el resultado, que consta de un **valor** y una unidad de medida.

Así, la respuesta completa es tediosamente prolija y redundante, conteniendo centenares o miles de repeticiones sucesivas
de algunos de los elementos decriptivos en el mismo documento de respuesta. Imaginemos una serie temporal de 5000 observaciones
del mismo sensor. Lo único que cambia es el tiempo y el valor. El resto de contenidos (IDs, Features, etc) se repiten 5000 veces
sin necesidad alguna. Esto impacta severamente la agilidad del servicio SOS.

Algunas implementaciones de SOS (en concreto, 52n SOS v.4.0.0+) ofrecen algunas estrategias que extienden el estándar
para subsanar esta situación, como la ya mencionada codificación de los mensajes en JSON, y una extensión llamada
``MergeObservationsIntoDataArray`` que "compactan" todas las observaciones que proceden del mismo procedure, feature of interest
y observed property en un ``SweArrayObservation`` (serie temporal de datos del mismo sensor).

.. note:: Los Sensor Widgets no aprovechan aún la extensión ``MergeObservationsIntoDataArray``. Es una posible mejora futura.


Referencias
===========

Especificaciones oficiales del Open Geospatial Consortium:

* OGC® Sensor Web Enablement: Overview And High Level Architecture v. 3 (White Paper). Ref. OGC 07-165.
* OpenGIS® SWE Service Model Implementation Standard v. 2.0. Ref. OGC 09-001.
* OGC® SWE Common Data Model Encoding Standard v. 2.0.0. Ref. OGC 08-094r1.
* Sensor Observation Service v. 1.0. Ref. OGC 06-009r6.
* OGC® Sensor Observation Service Interface Standard v. 2.0. Ref. OGC 12-006.
* OpenGIS® Sensor Model Language (SensorML) Implementation Specification v. 1.0.0. Ref. OGC 07-000.
* OGC Abstract Specification - Geographic information — Observations and measurements v.2.0. Ref. OGC 10-004r3.
* Observations and Measurements - XML Implementation v.2.0. Ref. OGC 10-025r1.

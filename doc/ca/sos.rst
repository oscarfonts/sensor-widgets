========================
Resum de l'estàndard SOS
========================

Els Sensor Widgets són una eina de visualització de dades per a serveis que compleixin amb l'estàndard
`Sensor Observation Service (SOS) <http://www.opengeospatial.org/standards/sos>`_ de l'OGC.

Els widgets inclouen un client SOS que suporta la versió 2.0 de estàndard, i, en aquests moments, necessiten un endpoint
en format JSON, que no és part de l'estàndard, sinó un format opcional que proporciona la implementació de
`52 north en la seva versió 4.0.0 o superior <http://52north.org/communities/sensorweb/sos/download.html>`_.

.. note:: De fet, el client SOS podria extendre's per suportar la codificació
   obligatòria KVP/XML, de manera que els Sensor widgets serien compatibles amb
   altres implementacions de servidors SOS 2.0.

Un *Sensor Observation Service* ofereix dades procedents d'una col·lecció de sensors. Així és com està organitzat un
servei SOS:


Conceptes
=========

.. warning:: La següent és una visió simplificada dels principals conceptes de SOS, una referència ràpida per als nouvinguts,
   que probablement estiguin més interessats en visualitzar algunes dades que en la plena comprensió dels conceptes que s'amaguen als estàndards SWE, SOS i O&M de l'OGC.
   Si es pretén implementar un servei SOS, es recomana no prendre aquesta guia com a referència, i referir-se a les especificacions OGC oficials
   (veure referències al final d'aquest capítol).


Offering
--------

Les dades servides per un servei SOS s'agrupen en diferents *Offerings*. Per exemple, un servei SOS "meteo" podria tenir
els següents Offerings: imatges de satèl·lit, dades de radar, mesures d'estacions meteorològiques, mapes de predicció, etc.
Cada offering exposa dades d'un sensor o una xarxa de sensors, descrits com un *procedure*.

Es poden interpretar els Offerings com a seccions o calaixos que classifiquen les diferents dades segons el seu origen o naturalesa.


Procedure
---------

Una procedure descriu un sensor, un conjunt de sensors, or un procés, que en genera un conjunt d'observacions. Proporciona metadades sobre
les entrades i sortides del sensor, dades de calibració i processat, informació de contacte, i la disponibilitat de dades (extensions espacial i temporal), etc.

Normalment ve descrit en el format `SensorML <http://www.opengeospatial.org/standards/sensorml>`_.

Es pot considerar una Procedure com un document de metadades sobre el(s) sensor(s) o procés(sos) a càrrec de generar les dades que ofereix el servei.

Un Offering està relacionat amb una sola Procedure, mentre que una Procedure pot ser usada per diferents Offerings.
Per exemple, una Procedure podria ser una "Xarxa d'Estacions Meteorològiques", i aquesta mateixa xarxa d'estacions ser usada en
diferents Offerings, per exemple per a diferents períodes de temps. L'Offerig corresponent podria ser: "Mesures de la Xarxa d'Estacions
Meteorològiques per a l'any 2015".


Feature of Interest
-------------------

Cada observació d'un servei SOS està referida a una *Feature Of Interest* (FOI), que habitualment determina el lloc
on el fenomen observat ha tingut lloc. Per exemple, per a imatges satèl·lit, la FoI podria ser el seu *footprint* (polígon que
determina l'àrea fotografiada sobre la superfície de la terra), o per a una mesura de temperatura, la FoI podria ser la
ubicació del termòmetre (puntual).

Les FoI poden veure's com el conjunt de llocs als quals estan referides les dades.


Observed Property
-----------------

La propietat que es mesura, tal que: Temperatura, Direcció del vent, Nuvolositat, Nombre de vehicles... pot ser un valor
numèric (una quantitat i una unitat de mesura), lògic (pren els valors verdader o fals), categòric (un valor d'entre
una llista: assolellat, ennuvolat, plujós), o descriptiu (un text).


Observation
-----------

Finalment, una *Observation* és el valor que pren una *Observed Property* en un moment (Phenomenon Time) i un lloc (Feature Of Interest) determinats.
Per exemple: "La temperatura a Barcelona el 22/09/2015 a les 11:52 és de 23 graus centígrads".


Peticions
=========

Totes les peticions SOS han de contenir els següents paràmetres mínims:

* Service: ``SOS``.
* Version: ``2.0.0`` (és la versió suportada pels Sensor Widgets).
* Request: el nom de la petició, per exemple ``GetCapabilities``.

A continuació presentem les peticions SOS 2.0 que es fan servir als Sensor Widgets:


GetCapabilities
---------------

Com que la resposta d'un GetCapabilites pot ser bastant llarga, la petició GetCapabilities permet especificar un paràmetre ``sections`` per
recuperar només les parts del document que ens interessen.

En concret, la secció ``contents`` descriu el servei com una col·lecció d'Offerings. Cada Offering conté els següents detalls:

* El nom de l'Offering (per exemple "observacions deuminutals"),
* L'identificador de l'Offering,
* L'identificador del Procedure lligat a aquest offering,
* La col·lecció d'Observable Properties (els seus identificadors),
* L'extensió espacial de les observacions que conté (el rectangle contenidor -bbox- de totes les Features of Interest),
* L'extensió temporal de les observacions que conté (període de temps que delimita totes les Observations).

Exemple de petició GetCapabilities en format JSON::

    POST http://sensors.fonts.cat/sos/json
    Content-Type: application/json
    Contingut:
        {
            "service": "SOS",
            "version": "2.0.0",
            "request": "GetCapabilities",
            "sections": ["Contents"]
        }

Aquest document de Capabilities (secció contents) és el punt de partida per descobrir com està estructurat determinat servei SOS, així com les dades que conté.
El document conté molts identificadors dels diferents elements (procedures, properties) però no el seu detall, que s'hauran d'obtenir mitjançant altres peticions
com DescribeSensor i GetFeatureOfInterest.


DescribeSensor
--------------

La petició DescribeSensor accepta com a paràmetre un identificador de ``procedure``, i retorna un document SensorML que conté
metadades sobre el() sensor(s) o procés(sos) encarregats de produïr les observacions.

Els continguts més rellevants d'aquest document són:

* L'identificador de la Procedure, un nom curt, i un nom més llarg,
* Una col·lecció de paraules clau (útils per als serveis de cerca dels catàlegs de metadades),
* Informació de contacte,
* El període de temps de validesa (redundant amb la resposta de Capabilities),
* El BBOX observat (redundant amb la resposta de Capabilities),
* La col·lecció de Features of Interest (els seus identificadors - nova informació que no es troba en el GetCapabilities),
* La col·lecció de Offerings (els seus identificadors) que es basen en aquesta procedure,
* Una llista de sortides (Optputs): Una col·lecció de ObservableProperties i la seva descripció: IDs, noms, tipus i unitats de mesura.

Aquesta petició es fa servir per ampliar detalls que no s'ofereixen a través del GetCapabilities, especialment la descripció de les
Observable Properties (els seus noms i unitats de mesura).

Exemple de petició DescribeSensor en format JSON::

    POST http://sensors.fonts.cat/sos/json
    Content-Type: application/json
    Contingut:
        {
            "service": "SOS",
            "version": "2.0.0",
            "request": "DescribeSensor",
            "procedure": "http://sensors.portdebarcelona.cat/def/weather/procedure",
            "procedureDescriptionFormat": "http://www.opengis.net/sensorML/1.0.1"
        }


GetFeatureOfInterest
--------------------

L'operació GetFeatureOfInterest accepta una ``procedure`` com a paràmetre, i retorna totes les Features of Interest relacionades amb aquest
procedure. De fet, les Features of Interest estan vinculades a cadascuna de les Observation, però aquesta operació ens retorna una mena d'inventari
de tots els seus possibles valors.

És útil per obtenir els detalls de les diverses localitzacions, com els seus noms i geometries. Així que generalment s'utilitza aquesta operació per poder dibuixar un mapa
o un selector de Features per nom.

Exemple de petició GetFeatureOfInterest en format JSON::

    POST http://sensors.fonts.cat/sos/json
    Content-Type: application/json
    Contingut:
        {
            "service": "SOS",
            "version": "2.0.0",
            "request": "GetFeatureOfInterest",
            "procedure": "http://sensors.portdebarcelona.cat/def/weather/procedure"
        }


GetDataAvailability
-------------------

La petició GetDataAvailability també accepta una ``procedure``, i, opcionalment, una col·lecció de ``FeatureOfInterest`` i/o
``ObservedProperty`` com a paràmetres.

Retorna el rang temporal dins del qual hi ha dades per a cada combinació Procedure-Feature-Property. Així,
donat un sensor determinat, sabem per a quines dates disposarem de dades.

Exemple de petició GetDataAvailability en format JSON::

    POST http://sensors.fonts.cat/sos/json
    Content-Type: application/json
    Contingut:
        {
            "service": "SOS",
            "version": "2.0.0",
            "request": "GetDataAvailability",
            "procedure": "http://sensors.portdebarcelona.cat/def/weather/procedure",
            "featureOfInterest": ["http://sensors.portdebarcelona.cat/def/weather/features#02"],
            "observedProperty": ["http://sensors.portdebarcelona.cat/def/weather/properties#31"]
        }


GetObservation
--------------

I, finalment, les dades mesurades.

Una petició GetObservation accepta els següents paràmetres:

* Un ``offering``,
* Una col·lecció de ``FeatureOfInterest``,
* Una col·lecció de ``ObservedProperties``,
* Filtres espacials i/o temporals.

El filtrat és especialment interessant, ja que permet restringir les cerques de dades a un període de temps o
una àrea geogràfica concreta. Els Sensor Widgets existents fins a la data només usen el filtrat temporal per a obtenir, o
bé l'última dada disponible ("latest"), o bé una sèrie temporal de dades d'un període concret (per exemple, les darreres 3 hores).


Exemple de petició GetObservation en format JSON::

    POST http://sensors.fonts.cat/sos/json
    Content-Type: application/json
    Contingut:
        {
            "service": "SOS",
            "version": "2.0.0",
            "request": "GetObservation",
            "offering": "http://sensors.portdebarcelona.cat/def/weather/offerings#10M",
            "featureOfInterest": ["http://sensors.portdebarcelona.cat/def/weather/features#P3"],
            "observedProperty": ["http://sensors.portdebarcelona.cat/def/weather/properties#31"],
            "temporalFilter": [{
                "equals": {
                    "ref": "om: resultTime",
                    "value": "latest"
                }
            }]
        }


La resposta és una col·lecció d'observacions, on cada observació consta de:

* L'identificador de l'Offering del qual procedeix,
* L'identificador del Procedure que la va generar,
* La Feature of Interest a què va referida la observació (descripció completa, amb el seu ID, nom i geometria),
* L'identificador de la Property que s'ha observat (però no el seu nom),
* Phenomenon time (quan ha ocorregut el que s'ha mesurat) i result time (quan s'ha generat la dada),
* I, per fi, el resultat en si, que consta d'un **valor** i d'una unitat de mesura.

Així, la resposta completa és tediosament redundant, i pot contenir centenars o milers de repeticions successives
d'alguns dels elements decriptius en el mateix document de resposta. Imaginem una sèrie temporal de 5000 observacions
del mateix sensor. L'única cosa que canvia és el temps i el valor. La resta de continguts (IDs, Features, unitats de mesura, etc) es repetiran 5000 vegades
sense cap necessitat. Això impacta severament en l'agilitat del servei SOS.

Algunes implementacions de SOS (en concret, 52n SOS v.4.0.0+) ofereixen algunes estratègies que extenen l'estàndard
per tractar de paliar aquesta situació, com la ja esmentada codificació dels missatges en JSON, i una extensió anomenada
``MergeObservationsIntoDataArray`` que "compacta" totes les observacions que procedeixen del mateix procedure, feature of interest
i observed property en un ``SweArrayObservation`` (sèrie temporal de dades del mateix sensor sevida com un array de valors).

.. note:: Els Sensor Widgets no aprofiten encara l'extensió ``MergeObservationsIntoDataArray``. És una possible millora futura.


Referències
===========

Especificacions oficials de l'Open Geospatial Consortium:

* OGC® Sensor Web Enablement: Overview And High Level Architecture v. 3 (White Paper). Ref. OGC 07-165.
* OpenGIS® SWE Service Model Implementation Standard v. 2.0. Ref. OGC 09-001.
* OGC® SWE Common Data Model Encoding Standard v. 2.0.0. Ref. OGC 08-094r1.
* Sensor Observation Service v. 1.0. Ref. OGC 06-009r6.
* OGC® Sensor Observation Service Interface Standard v. 2.0. Ref. OGC 12-006.
* OpenGIS® Sensor Model Language (SensorML) Implementation Specification v. 1.0.0. Ref. OGC 07-000.
* OGC Abstract Specification - Geographic information - Observations and measurements v.2.0. Ref. OGC 10-004r3.
* Observations and Measurements - XML Implementation v.2.0. Ref. OGC 10-025r1.


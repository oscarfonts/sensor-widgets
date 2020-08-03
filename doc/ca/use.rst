================================
Com utilitzar els Sensor Widgets
================================

Cada widget té una col·lecció de paràmetres obligatoris i d'altres opcionals. Configurar un widget és bàsicament
escollir els valors adequats d'aquests paràmetres per tal d'obtenir el resultat desitjat.


El Wizard
=========

La manera més fàcil de configurar un widget és usant el Wizard, que ens assistirà en la selecció dels paràmetres
basant-se en una llista de possibles valors. Per exemple, la majoria de widgets tenen com a paràmetres obligatoris un
"offering", un o més "features" i una o més "properties". El wizard inspeccionarà el servei SOS i ens
permetrà triar d'entre una llista d'Offerings, features i properties existents.

Altres paràmetres habituals són el temps de refresc (refresh_interval), per als widgets que mostren dades en viu i que
cal actualitzar periòdicament, o el rang de temps (time_start, time_end), per als widgets que mostren una col·lecció
de mesures al llarg del temps. En aquest últim cas, el wizard ens assistirà amb un selector de rang de temps
restringit al període temporal en què hi ha dades disponibles.

Paràmetres opcionals típics són la nota a peu ("footnote"), que és un text que es mostrarà al costat del widget, i l'adreça
URL a un full d'estils CSS propi ("custom_css_url"), un mecanisme que permet personalitzar l'aspecte gràfic dels widgets.

Els detalls sobre els paràmetres que accepta de cada widget i el seu ús estan descrits en el proper capítol.

Un cop ajustats els valors en el formulari del wizard, al clicar al botó "Crea Widget", es visualitzarà
el resultat en el requadre "Vista del Widget", i s'oferiran tres maneres de utilitzar-lo en el requadre "Emporteu-vos-el":
Com una pàgina HTML ("Enllaça"), com un component a incloure en una altra pàgina ("Incrusta") i com un bloc de
codi per utilitzar el widget dins d'un aplicació Javascript més gran ("Codi").


Emporteu-vos-el: Enllaça i incrusta
===================================

Si fem clic al contingut d'"Enllaça", obtindrem un URL bastant llarga. Aquesta URL obre una pàgina amb el
widget que hem configurat. Si l'únic que ens interessa és fer servir el widget tal qual, ja hem acabat.

Però per a qui estigui interessat en comprendre com està construït aquest enllaç (per exemple, perquè vulgui modificar-lo manualment,
sense haver de passar pel wizard), vegem com està format, descomposant un exemple en els seus paràmetres::

    http://sensors.fonts.cat/widget/
        name=compass
        service=http://demo.geomati.co/sos/json
        offering=http://sensors.portdebarcelona.cat/def/weather/offerings#10M
        feature=http://sensors.portdebarcelona.cat/def/weather/features#P3
        property=http://sensors.portdebarcelona.cat/def/weather/properties#31
        refresh_interval=5
        lang=en

.. note:: Una URL vàlida ha de codificar cada paràmetre utilitzant la funció estàndard de javascript
   ``encodeURIComponent`` (o el seu equivalent en un altre llenguatge). Per claredat, en l'exemple es mostren els paràmetres
   ja descodificats.

Com es pot veure, els paràmetres de la URL són bàsicament els paràmetres d'entrada del widget. El formulari del wizard
ens presenta els noms de tots els Offerings, features i properties, però els paràmetres del widget usen els seus corresponents
identificadors. El wizard interroga el servei SOS per nosaltres i recupera tots els possibles parells de nom-identificador.
En cas de voler accedir als identificadors manualment, es pot fer a través de l'operació ``GetCapabilities``.

La URL també conté un parell de paràmetres extra que no són estrictament paràmetres de configuració del widget:

* El primer, "name": És el nom del widget a crear.
* El darrer, "lang": S'utilitza per indicar l'idioma en què volem veure els textos del widget. És un paràmetre opcional, i el seu valor per defecte és l'anglès ("en"). Altres llengües suportades són l'Espanyol ("és") i el Català ("ca").

L'opció "incrusta" simplement embolcalla l'enllaç anteriord dins un element HTML <iframe>, de manera que pugui ser usat com a component en altres pàgines::

   <iframe src = "..." width = "570" height = "380" frameBorder = "0"> </iframe>

L'amplada i alçada de l'<iframe> vénen determinades en primera instància per les mides inicials indicades al formulari del wizard,
però poden canviar-se des del mateix wizard simplement redimensionant el requadre de "Vista del Wizard" (vegeu el control per redimensionar a la cantonada inferior esquerra de la vista).


Ús des de Javascript
====================

La forma més flexible d'usar els widgets és per programació. Simplement s'ha de incloure la llibreria
de Sensor widgets a la pàgina, que està disponible a http://sensors.fonts.cat/js/SensorWidgets.js, i instanciar
el widget usant la factoria ``SensorWidget``, que pren 3 paràmetres::

    SensorWidget (nom, configuració, element);

El nom del widget és una cadena de text, la configuració és un objecte on llurs propietats són els paràmetres de
configuració, i l'element és el DOM Element on es dibuixarà el widget.

La forma més pràctica de crear un widget programàticament és usant el wizard i copiant i enganxant el tros de codi
javascript que ens ofereix. A partir d'aquesta base, s'hi pot afegir dinamisme canviant algun dels paràmetres
de configuració.

Vegeu un exemple pràctic d'integració a: http://bl.ocks.org/oscarfonts/5ad801cf830d421e55eb


.. note:: La funció ``SensorWidget`` no retorna cap valor, però en alguns casos accepta funcions de callback
   com a paràmetre. Els widgets es creen de forma assíncrona. En cas d'error, es mostrarà un missatge a
   l'usuari en l'element on havia dibuixar-se el widget.


Fent crides SOS de baix nivell amb Javascript
---------------------------------------------

.. warning:: L'accés directe a les operacions SOS de baix nivell és experimental.
   La API aquí descrita pot canviar en qualsevol moment.

La instància del client SOS s'obté de forma asíncrona::

    getSOS(function(SOS) {
        // Cal indicar una URL d'un servei 52n SOS 4.x amb encoding JSON
        SOS.setUrl("http://sensorweb.demo.52north.org/sensorwebtestbed/service");
        // A partir d'aquí, es poden invocar els altres mètodes de SOS
    });

Aquesta és la API::

    SOS.getCapabilities(callback, error); // Obté la secció "contents" del GetCapabilties.
    SOS.describeSensor(procedure, callback, error); // Obté el document SensorML convertit a una estructura JSON.
    SOS.getFeatureOfInterest(procedure, callback, error); // Obté totes les FeatureOfInterest del procedure indicat.
    SOS.getDataAvailability(procedure, offering, features, properties, callback, error); // Obté rang de dates vàlid per a cada combinació de procedure, feature i property.
    SOS.getObservation(offering, features, properties, time, callback, error); // Obté les observacions per a la combinació de paràmetres donada.

On els paràmetres són:

 * `callback` (funció) recollirà la resposta com un objecte Javascript (JSON parsejat).
 * `error` (funció) de callback que es cridarà en cas que el servei SOS retorni un error.
 * `procedure` (string) identificador de la procedure.
 * `offering` (string) identificador d'offering.
 * `features` (array de strings) llista de les Features Of Interest de les que es vol obtenir resposta.
 * `properties` (array de strings) llista de les Observable Properties de les que es vol obtenir resposta.
 * `time` l'instant (si és string) o rang de temps (si és array de 2 strings) per al que es vol obtenir resposta.
   Les dates s'indiquen en hora UTC, format "yyyy-mm-ddThh:mm:ssZ". També pot prendre el valor especial "latest" per obtenir la observació més recent disponible.

I la seva obligatorietat és:

* La funció de `callback` és sempre obligatòria, i la funció d'`error` és sempre opcional.
* Per a `describeSensor` i `getFeatureOfInterest`, és obligatori indicar la `procedure`.
* Per a `getDataAvailability` i `getObservation` els filtres (procedure, offering, features, properties, time) són opcionals. Indiqueu `undefined` en cas de no voler filtrar per un d'aquests conceptes.


Personalització de l'aspecte gràfic
===================================

Tots els widgets admeten un paràmetre opcional ``custom_css_url``, que permet indicar la localització d'un full d'estils CSS
amb regles que sobreescriguin l'estil per defecte dels widgets.

Tots els widgets estan continguts dins un element <div> amb dues classes: la classe ``widget``, i una classe amb el nom del widget.
Per exemple, la següent regla CSS aplicarà a tots els widgets::

    .widget {
        border: 2px solid black;
    }

Mentre que la següent s'aplicarà només per a widgets del tipus ``compass``::

    .widget.compass {
        background-color: grey;
    }

Un altre element comú és la nota al peu, que es troba sota un element de la classe ``footnote``. Pot canviar l'aspecte de la nota a peu::

    .widget .footnote {
        font-color: red;
    }

Fins i tot es poden ocultar certs elements del widget mitjançant CSS. Per exemple, el títol principal en un termòmetre::

    .widget.thermometer h1 {
        display: none;
    }

Per a regles de simbolització més específiques, es recomana inspeccionar el DOM del widget, i aplicar les regles CSS segons els elements observats.

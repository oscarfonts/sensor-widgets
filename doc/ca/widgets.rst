===================
Els Widgets un a un
===================

Rumb (compass)
==============

El widget "compass" pertany a la categoria dels widgets de "valor instantani únic". Mostra l'últim valor disponible per
a una Property específica, que en aquest cas expressa un azimut o angle respecte al nord. El widget interrogarà le servidor
de forma periòdica per actualitzar el valor mostrat.

Els seus paràmetres obligatoris són:

* "Service", "offering", "feature" i "property": determinen la propietat que es vol mostrar. La propietat ha de prendre valors entre 0 i 360 (a la que se suposa una unitat de mesura de graus centessimals).
* "Refresh_interval" (en segons): és el temps entre dues interrogacions al servidor (el widget llança GetObservations periòdiques cada X segons).

Altres paràmetres opcionals:

* "Title": Si no s'especifica, per defecte es fa servir com a títol el nom de la Feature.
* "Footnote": Text opcional que apareixerà com una petita nota al peu.
* "Custom_css_url": full d'estils css que s'aplicarà al widget.


Manòmetre (gauge)
=================

Un altre widget de "valor instantani únic", en aquesta ocasió per presentar valors de percentatge entre 0 i 100.

Paràmetres obligatoris:

* "Service", "offering", "feature" i "property": determinen la propietat que es vol mostrar. La propietat ha de prendre valors entre 0 i 100 (a la que se suposa una unitat de mesura de tant per cent).
* "Refresh_interval" (en segons): és el temps entre dues interrogacions al servidor (el widget llança GetObservations periòdiques cada X segons).

Paràmetres opcionals:

* "Footnote": Text opcional que apareixerà com una petita nota al peu.
* "Custom_css_url": full d'estils css que s'aplicarà al widget.


Taula jQuery (jqgrid)
=====================

Mostra una `taula jqGrid <http://www.trirand.com/blog/>`_ amb un conjunt d'observacions per a un període de temps determinat,
on cada registre és una observació. La llista de resultats es mostra paginada i pot ser ordenada pels valors de qualsevol
de les columnes (Hora, Feature, Propietat, Valor i Unitat de mesura).

Paràmetres obligatoris:

* "Service", "offering", un conjunt de "features" i un conjunt de "properties": selecciona el conjunt de combinacions feature-property a mostrar.
* "Time_start" i "time_end": Selecciona les observacions que cauen dins d'aquest rang de temps.
* "Title": el títol del widget.

Paràmetres opcionals:

* "Footnote": Text opcional que apareixerà com una petita nota al peu.
* "Custom_css_url": full d'estils css que s'aplicarà al widget. Tingueu en compte que l'aspecte de jqGrid ve determinat pel tema jQuery-ui subjacent.

.. note:: aquest widget depèn de jQuery, jQuery UI i el plugin jgGrid. És un widget bastant pesat i no gaire
   personalitzable (es va desenvolupar com un exercici d'integració amb una aplicació antiga existent). Es recomana l'ús d'altres
   widgets com el "table", que van més en la línia del que pretenen ser els Sensor widgets: ser lleugers, compactes i flexibles.


Mapa (map)
==========

Aquest widget és especial en diversos sentits. En primer lloc, mostra la resposta a una petició GetFeatureOfInterest, en lloc del cas més
habitual en què un widget representa la resposta d'un GetObservation.

En segon lloc, és un widget molt configurable, a través d'alguns paràmetres complexos. Afortunadament la majoria
de paràmetres són opcionals, de manera que el seu ús més elemental és de fet molt senzill.

Està basat en la llibreria de mapes `Leaflet <http://leafletjs.com/>`_.

Els únics paràmetres estrictament obligatoris són:

* "Service" i "offering": Determinen l'offering dels quals mostrarem Features of Interest al mapa.

Això mostrarà un mapa amb les Features. Passant el ratolí per sobre d'una Feature, es mostrarà una petita
etiqueta amb el nom de la feature.

.. figure:: ../img/map-no-features-no-properties.png
   :align: center

   Mapa simple on no s'han indicat ni features ni properties.

Hi ha un altre parell de parámentros formalment obligatoris (encara que poden deixar-se buits):

* "Features": Podem seleccionar només algunes features per mostrar al mapa. Si no se n'indica cap, de fet es mostraran *totes* (no s'aplica cap filtrat). Però aquest paràmetre s'ha d'indicar igual, encara que sigui com a una llista buida.
* "Properties": Si s'indiquen una o més properties, l'etiqueta de cada feature es convertirà de fet en un petit widget de tipus "panel", mostrant els últims valors de cada property per a cadascuna de les features. Novament, pot indicar-se una llista buida de properties, i en aquest cas, NO es mostrarà cap valor.

.. figure:: ../img/map-some-features-some-properties.png
   :align: center

   Mapa on s'han seleccionat quatre features i una property, el valor de la qual es mostra a l'etiqueta.

El paràmetre opcional "permanent_tooltips", si pren el valor "true", farà que es mostrin totes les etiquetes permanentment, no només quan
es passi el ratolí per sobre.

.. figure:: ../img/map-permanent-tooltips.png
   :align: center

   Mapa amb etiquetes permanents.

Si els elements sobre el mapa apareixen a l'altra punta del món, és probable que s'hagi de canviar l'ordre dels eixos de coordenades.
Afegint-hi el paràmetre opcional "swap_axis"=true, s'intercanviaran latitud i longitud, y es corregirà aquest efecte.

A més de les etiquetes, també podem vincular un sub-widget a cada feature, que es mostrarà en un globus en fer clic sobre ella.
El paràmetre "popup_widget" pren com a valor un JSON amb la configuració del sub-widget. En aquesta configuració, els paràmetres "service", "offering" i
"feature(s)" s'obtenen del widget *pare* (el mapa), així que no s'han d'indicar. La propietat "name" indica quina classe de widget volem incrustar.

Per exemple, si volem que s'obri un globus contenint una gràfica temporal, hem d'indicar:

   * "Name": "timechart",
   * ... Tots els paràmetres del widget timechart, excepte "service" i "offering".

És a dir::

   {
       "name": "timechart",
       "title": "temperatures",
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

   Mapa amb un "popup_widget" de tipus "compass".

A més de personalitzar les etiquetes i els globus amb detalls sobre cada feature, podem canviar la cartografia
de base del mapa amb el paràmetre "base_layer". Es poden especificar dos tipus de capa base:

* Una capa de tessel·les: Cal indicar una "url" i un conjunt de "options". Per exemple::

   {
      "url": "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      "options": {
         "maxZoom": 19,
         "attribution": "&copy; <a href='http://www.openstreetmap.org/copyright'> OpenStreetMap contributors </a>"
      }
   }

Els paràmetres "url" i "options" es corresponen respectivament amb els paràmetres del `constructor TileLayer de Leaflet <http://leafletjs.com/reference.html#tilelayer>`_
"urlTemplate" i "TileLayer_options".

Es pot escollir entre una bona col·lecció de capes de tessel·les aquí: http://leaflet-extras.github.io/leaflet-providers/preview/

* Una capa WMS: Cal especificar "type"="wms", una "url" i un conjunt d'"options". Per exemple::

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

   Mapa amb cartografia WMS.

Els paràmetres "url" i "options" es corresponen amb els paràmetres del `constructor TileLayer.WMS de Leaflet <http://leafletjs.com/reference.html#tilelayer-wms>`_
"baseUrl" i "TileLayer.WMS_options" respectivament.

Un altre paràmetre opcional és "max_initial_zoom": Indica el nivell de zoom màxim a utilitzar en la vista inicial del mapa.
Això evita acostar-se massa i perdre context cartogràfic, especialment útil quan es mostra una única feature puntual.

Finalment, els paràmetres opcionals habituals "footnote" i "custom_css_url" també estan disponibles.

Vegeu un **exemple funcional complet** aquí: http://bl.ocks.org/oscarfonts/265d734349396cf4372c


Panell (panel)
==============

El widget "panel" s'usa per mostrar els útims valors d'un conjunt de propietats d'una Feature donada. Està construït
com una Llista de Definicions (<dl>) d'HTML, compatible amb les classes CSS de Bootstrap. El contingut del widget s'actualitzarà automàticament de forma periòdica.

Els seus paràmetres obligatoris són:

* Els habituals "service", "offering" i "feature".
* Una llista de "properties" a mostrar.
* El "refresh_interval", en segons.
* Un "title" per al panell.

I els paràmetres opcionals habituals: "footnote" i "custom_css_url".

El panell també mostrarà la data de les observacions com a subtítol. En el cas que algun dels valors sigui d'una data anterior a la data comú,
es mostrarà el valor en color vermell i es mostrarà la data per a aquesta observació en particular.

.. figure:: ../img/panel.png
   :align: center

   Tres widgets de tipus Panell, alguns d'ells mostrant valors amb un temps distint.


Barra (progressbar)
===================

Un altre widget que mostra un valor instantani, aquest cop mostrat com una barra proporcional entre dos valors. És útil per mostrar
gràficament on cau un valor respecte els seus valors límit. Es pot usar per a mostrar un percentatge si s'ajusten els valors
mínim i màxim a 0 i 100 respectivament, en aquest cas seria molt similar a un widget de tipus "gauge" però mostrant el valor
linealment. "ProgressBar" també pot prendre altres valors límit diferents, amb el que és més flexible que "gauge". A més
el contingut és HTML, l'aspecte és més fàcil de personalitzar mitjançant CSS.

Paràmetres obligatoris:

* Els habituals "service", "offering", "feature" i "property".
* "min_value" i "max_value", que determinen els valors extrems.
* "refresh_interval" en segons.

I els paràmetres opcionals habituals: "footnote" i "custom_css_url".


Status (status)
===============

El widget "status" mostra l'estat global de tot un offering d'un cop d'ull. Donat un offering, construeix una taula on cada
cel·la representa una de les possibles combinacions de feature-property. Per a cada combinació, es mostra el darrer valor observat
i la seva antiguitat. És una bona manera d'inspeccionar l'estat de salut d'un offering: Es veu ràpid si estan arribant noves observacions,
i per a quins sensors.

Aquest widget està pensat com una eina de gestió (una espècie d'hiper-taula), i és més pràctica si es mostra a pantalla completa.

Els seus únics paràmetres obligatoris són "service" i "offering".

I els paràmetres opcionals habituals: "footnote" i "custom_css_url".


Taula (table)
=============

Donats un feature i un període de temps, un widget "table" mostra les observacions d'un conjunt de propietats al
llarg del temps. És similar a "jqgrid" però proporciona una vista més compacta. El widget és una simple taula HTML amb
classes CSS compatibles amb Bootstrap.

Paràmetres:

* Els habituals "service", "offering" i "feature".
* Una llista de "properties" a mostrar.
* "time_start" i "time_end": Període de temps del que volem obtenir observacions.
* I el "title".

A més dels paràmetres opcionals comuns: "footnote" i "custom_css_url".


Termòmetre (thermometer)
========================

Un altre widget de tipus "valor instantani únic", tal com Compass i Gauge, però per mostrar una temperatura ambiental en graus Celsius.

Mostra el dibuix d'un termòmetre que pot prendre valors dels -24ºC als 56ºC. També es mostra el valor numèric. Com altres widgets
de la seva categoria, incorpora un mecanisme d'actualització periòdica.

Paràmetres obligatoris:

* "service", "offering", "feature" i "property": Determinen la propietat de la qual volen mostrar-se mesures. Se li suposa graus centígrads com a unitat de mesura.
* "Refresh_interval" (en segons): el temps entre actualitzacions del valor.

Altres paràmetres opcionals:

* "Footnote": Text opcional que apareixerà com una petita nota al peu.
* "Custom_css_url": full d'estils css que s'aplicarà al widget.


Sèrie temps (timechart)
=======================

Donats una feature i un rang de temps, mostra els valors que van prenent certes propietats al llarg del temps.
La seva interfície és la mateixa que el widget "table", però els resultats es mostren sobre una gràfica.

Les gràfiques estan basades en la `llibreria Flot Charts <http://www.flotcharts.org/>`_, que al seu torn depèn de jQuery.

Paràmetres:

* Els habituals "service", "offering" i "feature".
* La llisa de "properties" a mostrar.
* "time_start" i "time_end": Període de temps del qual volem obtenir observacions.
* I el "title".

A més dels paràmetres opcionals comuns: "footnote" i "custom_css_url".


Rosa vents (windrose)
=====================

Aquest és un widget per a un cas d'ús molt específic: mostra estadístiques del règim de vents, on es pot
apreciar d'una ullada la direcció i velocitat predominants del vent, així com la seva variabilitat al llarg d'un període
de temps.

.. note:: La gràfica polar restultant  està basada en la llibreria `Highcharts <http://www.highcharts.com/>`_. Aquesta llibreria és gratuïta
   per a usos no comercials, però **se n'ha d'adquirir una llicència per al seu ús comercial**.

Paràmetres obligatoris:

* "service", "offering", "feature": determinen una localització, de la qual ha d'haver dades de direcció i velocitat del vent.
* "properties": admet un array de dos (i només dos) properties. Una serà la velocitat del vent en ``m/ s``, i l'altra la seva direcció en ``deg``. Les observacions per a ambdues properties s'han de produir a intervals regulars i de forma síncrona.
* "time_start" i "time_end": el període de temps sobre el qual es descarregaran dades i s'extrauran les estadístiques.
* "refresh_interval" (en segons): temps entre actualitzacions del widget. Es recomanen valors de diversos minuts per no saturar el servidor, ja que la quantitat de dades a descarregar és gran, i les estadístiques sobre un període de temps més o menys llarg tampoc no canviaran bruscament.
* "title" el títol del widget.

Paràmetres opcionals:

* "Subtitle".
* "Footnote" i "custom_css_url".

Així és com s'agrupen les dades per construïr la gràfica de la rosa dels vents:

a) Els valors de direcció del vent es classifiquen en 16 sectors: N, NNE, NE, ENE, E, ESE, SE, SSE, S, SSW, SW, WSW, W, WNW, NW, NNW and N.
b) Per a cada sector, les velocitats del vent corresponents es classifiquen en rangs: 0-2 m/s, 2-4 m/s, 4-6 m/s, 6-8 m/s, 8-10 m/s i > 10 m/s.

Es dibuixa llavors una gràfica polar amb 16 columnes, en cadascuna de les quals s'hi apilen els diferents segments acolorits segons la seva velocitat, d'alçada proporcionas al recompte d'observacions d'aquest rang.

.. note:: A diferència d'altres widgets, més lleugers i flexibles, aquest requereix que el servei SOS de què s'alimenta exposi les
   dades d'una manera molt concreta. A més, depèn d'una llibreria de gràfics no estrictament lliure. Però els resultats per al cas d'ús
   que cobreix són excel·lents. Així doncs, preneu aquest widget no com un cas de widget genèric i reusable, sinó com un exemple de
   l'*especialització* a la qual es pot arribar programant widgets propis. Per a desenvolupar els vostres propis widgets que us ajudin a expressar millor
   les vostres pròpies dades, consulteu el capítol sobre com contribuir al projecte (en anglès).

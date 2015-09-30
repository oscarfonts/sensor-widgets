============================
Cómo usar los Sensor Widgets
============================

Cada widget tiene una colección de parámetros obligatorios y otros opcionales. Configurar un widget es básicamente
definir los valores adecuados de estos parámetros para obtener el resultado deseado.


El Wizard
=========

La manera más fácil de configurar un widget es usando el Wizard, que nos asistirá en la selección de los parámetros
basándose en una lista de posibles valores. Por ejemplo, la mayoría de widgets tienen como parámetros obligatorios un
"offering", uno o más "features" y una o más "properties". El wizard inspeccionará los recursos del servicio SOS y nos
permitirá elegir de entre una lista de offerings, features y properties existentes.

Otros parámetros habituales son el tiempo de refresco (refresh_interval), para widgets que muestran datos en vivo que
deben actualizarse periódicamente, o el rango de tiempo (time_start, time_end), para widgets que muestran una colección
de mediciones a lo largo del tiempo. En este último caso, el wizard nos asistirá con un selector de rango de tiempo
restringido al período temporal en el que existen datos disponibles.

Parámetros opcionales típicos son la nota a pie ("footnote"), que es un texto que se mostrará junto al widget, y la
dirección a una hoja de estilos propia ("custom_css_url"), un mecanismo para adaptar el aspecto de los widgets.

Los detalles acerca de los parámetros que acepta de cada widget y su uso están descritos en el próximo capítulo.

Una vez ajustados los valores en el formulario del wizard, al clicar en el botón "Crear Widget", se visualizará
el resultado en el recuadro "Vista del Widget", así como tres maneras de utilizarlo en el recuadro "Para llevar":
Como una página HTML ("Enlazar"), como un componente utilizable en otra página ("Incrustar") y como un bloque de
código para integrar el widget dentro de un aplicación Javascript de mayor alcance ("Código").


Para llevar: Enlace e incrustación
==================================

Si hacemos clic en el enlace bajo "Enlazar", obtendremos una URL bastante larga. Esta URL abre una página con el
widget que hemos configurado. Si lo único que nos interesa es el widget tal cual, no hace falta saber más.

Pero para quien esté interesado en comprender cómo funcionan estos enlaces (por ejemplo, para modificarlos manualmente,
sin tener que pasar por el wizard), veamos cómo están formados, descomponiendo los parámetros de uno de los ejemplos::

    http://sensors.fonts.cat/widget/
        name=compass
        service=http://demo.geomati.co/sos/json
        offering=http://sensors.portdebarcelona.cat/def/weather/offerings#10m
        feature=http://sensors.portdebarcelona.cat/def/weather/features#P3
        property=http://sensors.portdebarcelona.cat/def/weather/properties#31
        refresh_interval=5
        lang=en

.. note:: Una URL válida debe codificar cada parámetro utilizando la función estándar de javascript
   ``encodeURIComponent`` (o su equivalente en otros lenguages). Por claridad, en el ejemplo se muestran los parámetros
   decodificados.

Como se puede ver, los parámetros de la URL son mayormente los parámetros de entrada del widget. El formulario del wizard
nos presenta los nombres de todos los offerings, features y properties, pero los parámetros del widget usan sus correspondientes
identificadores. El wizard interrogó el servicio SOS para recuperar todos los posibles pares de nombre e identificador.
En caso de querer acceder a los identificadores manualmente, puede hacerse a través de la operación ``GetCapabilities``.

La URL también contiene un par de parámetros extra que no son estrictamente parámetros de configuración del widget:

* El primero, "name": Es el nombre del widget a crear.
* The último, "lang": Se utiliza para determinar el idioma de los posibles textos del widget. Es un parámetro opcional, y su valor por defecto es el inglés ("en"). Otras lenguas soportadas son el Español ("es") y el Catalán ("ca").

La opción "incrustar" simplemente incluye el enlace anterior en un elemento HTML <iframe>, de modo que pueda ser usado como componente en otras páginas::

   <iframe src="..." width="570" height="380" frameBorder="0"></iframe>

El ancho y alto del <iframe> vienen determinados en primera instancia por el tamaño inicial indicado en el formulario del wizard,
pero pueden cambiarse mediante el wizard simplemente redimensionando el recuadro de "Vista del Wizard" (nótese el control en su esquina inferior izquierda).


Uso en Javascript
=================

Pro último, la forma más flexible de usar los widgets es por programación. Simplemente ha de incluírse la librería
de Sensor Widgets en la página, que está disponible en http://sensors.fonts.cat/js/SensorWidgets.js , e instanciar
el widget usando la factoría ``SensorWidget``, que toma 3 parámetros:

    SensorWidget(nombre, configuracion, elemento);

El nombre del widget es una cadena de texto, la configuracion es un objeto cuyas propiedades son sus parámetros de
configuración, y el elemento es el elemento DOM donde dibujar el widget.

La forma más práctica de crear un widget programáticamente es usando el wizard y copiando y pegando el trozo de código
javascript que genera. A partir de este código, se puede añadir dinamismo al código cambiando alguno de sus parámetros
de configuración antes de instanciarlo.

Véase un ejemplo de integración práctico en: http://bl.ocks.org/oscarfonts/5ad801cf830d421e55eb


.. note:: La función ``SensorWidget`` no devuelve ningún resultado o función de callback. Los widgets se crean de forma asíncrona.
   En caso de error, se mostrará un mensaje al usuario en el elemento donde debía dibujarse el widget, pero no hay manera de
   interactuar programáticamente con el widget. Este es un aspecto candidato a las mejoras futuras.


Personalización del aspecto gráfico
===================================

Todos los widgets admiten un parámetro opcional ``custom_css_url``. En él se puede apuntar a una hoja de estilos CSS
cuyas reglas sobreescriban el estilo por defecto de los widgets.

Todos los widgets están contenidos en un elemento <div> con dos clases: la clase ``widget``, y una clase con el nombre del widget.
Por ejemplo, la siguiente regla CSS se aplicará a todos los widgets::

    .widget {
        border: 2px solid black;
    }

Y la siguiente se aplicará sólo para widgets del tipo ``compass``::

    .widget.compass {
        background-color: grey;
    }

Otro elemento común es la nota al pie, que se encuentra bajo un elemento de la clase ``footnote``. Puede cambiarse el aspecto de la nota a pie así::

    .widget .footnote {
        font-color: red;
    }

Incluso pueden ocultarse ciertos elementos del widget. Por ejemplo, el título principal en un termómetro::

    .widget.thermometer h1 {
        display: none;
    }

Para simbolización más específica, una buena práctica es inspeccionar el DOM del widget, y aplicar las reglas CSS según los elementos observados.

/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['text!translations.json'], function(bundle) {
    "use strict";

    var translations = JSON.parse(bundle);

    var params = {};
    location.search.substr(1).split("&").forEach(function(item) {
        var kv = item.split("=");
        params[kv[0]] = kv[1];
    });

    var activeLang;
    setLang(params.hasOwnProperty('lang') ? params.lang : 'en');

    function setLang(lang) {
        activeLang = lang;
        console.debug('Language set to ' + activeLang);
    }

    function template(string, values){
        for (var key in values)
            string = string.replace(new RegExp('{'+key+'}','g'), values[key]);
        return string;
    }

    function t(string, values) {
        if (translations.hasOwnProperty(string) && translations[string].hasOwnProperty(activeLang)) {
            string = translations[string][activeLang];
        }
        return template(string, values);
    }

    return {
        langs: function() {
            return translations.langs;
        },
        getLang: function() {
            return activeLang;
        },
        setLang: setLang,
        t: t,
        addTranslations: function(bundle) {
            Object.keys(bundle).forEach(function(key) {
                if (!translations.hasOwnProperty(key)) {
                    translations[key] = bundle[key];
                } else {
                    console.warn("Skipping duplicate entry '" + key + "' in translation bundle.");
                }
            });
        },
        translateDocTree: function(el) {
            if (!el) el = document;
            var treeWalker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
            while (treeWalker.nextNode()) {
                var node = treeWalker.currentNode;
                if(/\S/.test(node.nodeValue)) { // Not a whitespace-only text node
                    node.nodeValue = t(node.nodeValue);
                }
            }
        }
    };
});

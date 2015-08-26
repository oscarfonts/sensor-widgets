/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['text!translations.json'], function(bundle) {
    "use strict";

    var params = {};
    location.search.substr(1).split("&").forEach(function(item) {
        var kv = item.split("=");
        params[kv[0]] = kv[1];
    });
    var activeLang = params.hasOwnProperty('lang') ? params['lang'] : 'en';
    console.debug('Language set to ' + activeLang);

    var translations = JSON.parse(bundle);

    function template(string, values){
        for (var key in values)
            string = string.replace(new RegExp('{'+key+'}','g'), values[key]);
        return string;
    }

    return {
        getLang: function() {
            return activeLang;
        },
        setLang: function(lang) {
            activeLang = lang;
            console.debug('Language set to ' + activeLang);
        },
        t: function(string, values) {
            if (translations.hasOwnProperty(string) && translations[string].hasOwnProperty(activeLang)) {
                string = translations[string][activeLang];
            }
            return template(string, values);
        }
    }
});

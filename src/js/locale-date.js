/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
import i18n from './i18n';
var date = {
    utc: false,
    locale: navigator.language || navigator.browserLanguage
};

export default {
    display: function(d) {
        if (!d) {
            return i18n.t("(no date)");
        }
        if (date.utc) {
            return d.toLocaleString(date.locale, {
                timeZone: "UTC"
            }) + " UTC";
        } else {
            return d.toLocaleString(date.locale);
        }
    },
    locale: function(l) {
        if (l) {
            date.locale = l;
        }
        return date.locale;
    },
    utc: function(u) {
        if (typeof u !== 'undefined') {
            date.utc = u;
        }
        return date.utc;
    }
};

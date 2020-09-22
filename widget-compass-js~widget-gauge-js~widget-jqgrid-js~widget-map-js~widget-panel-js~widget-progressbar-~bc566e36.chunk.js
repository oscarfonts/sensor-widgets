(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["widget-compass-js~widget-gauge-js~widget-jqgrid-js~widget-map-js~widget-panel-js~widget-progressbar-~bc566e36"],{

/***/ "./src/js/SOS.js":
/*!***********************!*\
  !*** ./src/js/SOS.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _XML__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./XML */ "./src/js/XML.js");
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */



/* harmony default export */ __webpack_exports__["default"] = ({
  _url: null,

  setUrl(url) {
    this._url = url;
  },

  getCapabilities(callback, errorHandler) {
    const request = {
      request: 'GetCapabilities',
      sections: ['Contents'],
    };

    this._send(request, (response) => {
      callback(response.contents);
    }, errorHandler);
  },

  describeSensor(procedure, callback, errorHandler) {
    const request = {
      request: 'DescribeSensor',
      procedure,
      procedureDescriptionFormat: 'http://www.opengis.net/sensorML/1.0.1',
    };

    this._send(request, (response) => {
      // Convert the SensorML description to a JSON object
      const { procedureDescription } = response;
      const { description } = procedureDescription;
      const { SensorML } = _XML__WEBPACK_IMPORTED_MODULE_0__["default"].read(description || procedureDescription, true);
      callback(SensorML.member);
    }, errorHandler);
  },

  getFeatureOfInterest(procedure, callback, errorHandler) {
    const request = {
      request: 'GetFeatureOfInterest',
      procedure,
    };

    this._send(request, (response) => {
      callback(response.featureOfInterest);
    }, errorHandler);
  },

  getDataAvailability(procedure, offering, features, properties, callback, errorHandler) {
    const request = {
      request: 'GetDataAvailability',
    };
    if (procedure) {
      request.procedure = procedure;
    }
    if (offering) {
      request.offering = offering;
    }
    if (features && features.length) {
      request.featureOfInterest = features;
    }
    if (properties && properties.length) {
      request.observedProperty = properties;
    }

    this._send(request, ({ dataAvailability }) => {
      callback(dataAvailability);
    }, errorHandler);
  },

  getObservation(offering, features, properties, time, callback, errorHandler) {
    const request = {
      request: 'GetObservation',
    };

    if (offering) {
      request.offering = offering;
    }

    if (features && features.length) {
      request.featureOfInterest = features;
    }

    if (properties && properties.length) {
      request.observedProperty = properties;
    }

    if (time) {
      let operation;
      if (time.length && time.length === 2) {
        // Time Range
        operation = 'during';
      } else {
        // Time Instant
        operation = 'equals';
      }
      const filter = {};
      filter[operation] = {
        ref: 'om:resultTime',
        value: time,
      };
      request.temporalFilter = [filter];
    }

    this._send(request, ({ observations }) => {
      callback(observations);
    }, errorHandler);
  },

  _send(request, onSuccess, onError) {
    request.service = 'SOS';
    request.version = '2.0.0';

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let response = xhr.responseText;
        try {
          response = JSON.parse(response);
        } catch (e) {
          // OK, not JSON
        }
        if (xhr.status === 200) {
          onSuccess.call(this, response);
        } else {
          const e = {
            status: xhr.statusText,
            url: this._url,
            request,
            response,
          };
          if (onError) {
            onError.call(this, e.status, e.url, e.request, e.response);
          }
        }
      }
    };

    xhr.open('POST', this._url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(JSON.stringify(request));
  },
});


/***/ }),

/***/ "./src/js/XML.js":
/*!***********************!*\
  !*** ./src/js/XML.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* This work is licensed under Creative Commons GNU LGPL License.

 License: http://creativecommons.org/licenses/LGPL/2.1/
 Version: 0.9
 Author:  Stefan Goessner/2006
 See:     http://goessner.net/download/prj/jsonxml/
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  read(xml, clean) {
    const X = {
      at: (clean ? '' : '@'),

      toObj(elem) {
        let o = {};
        if (elem.nodeType === 1) { // element node
          if (elem.attributes.length) { // element with attributes
            for (let i = 0; i < elem.attributes.length; i += 1) {
              const { name } = elem.attributes[i];
              const { value } = elem.attributes[i];
              const isNs = name.lastIndexOf('xmlns:', 0) === 0;
              if (!(clean && isNs)) { // Hide xmlns attributes
                o[X.at + name] = (value || '').toString();
              }
            }
          }
          if (elem.firstChild) { // element has child nodes
            let textChild = 0;
            let cdataChild = 0;
            let hasElementChild = false;
            for (let n = elem.firstChild; n; n = n.nextSibling) {
              if (n.nodeType === 1) {
                hasElementChild = true;
              } else if (n.nodeType === 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
                textChild += 1;
                // non-whitespace text
              } else if (n.nodeType === 4) {
                cdataChild += 1;
                // cdata section node
              }
            }
            if (hasElementChild) {
              if (textChild < 2 && cdataChild < 2) {
                // structured element with evtl.
                // a single text or/and cdata node
                X.removeWhite(elem);
                for (let n = elem.firstChild; n; n = n.nextSibling) {
                  if (n.nodeType === 3) { // text node
                    o['#text'] = X.escape(n.nodeValue);
                  } else if (n.nodeType === 4) { // cdata node
                    o['#cdata'] = X.escape(n.nodeValue);
                  } else if (o[n.nodeName]) {
                    // multiple occurence of element
                    if (o[n.nodeName] instanceof Array) {
                      o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                    } else {
                      o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                    }
                  } else { // first occurence of element
                    o[n.nodeName] = X.toObj(n);
                  }
                }
              } else if (!elem.attributes.length) {
                o = X.escape(X.innerXml(elem));
              } else {
                o['#text'] = X.escape(X.innerXml(elem));
              }
            } else if (textChild) { // pure text
              if (!elem.attributes.length) {
                o = X.escape(X.innerXml(elem));
              } else {
                o['#text'] = X.escape(X.innerXml(elem));
              }
            } else if (cdataChild) { // cdata
              if (cdataChild > 1) {
                o = X.escape(X.innerXml(elem));
              } else {
                for (let n = elem.firstChild; n; n = n.nextSibling) {
                  o['#cdata'] = X.escape(n.nodeValue);
                }
              }
            }
          }
          if (!elem.attributes.length && !elem.firstChild) {
            o = null;
          }
        } else if (elem.nodeType === 9) { // document.node
          o = X.toObj(elem.documentElement);
        } else if (elem.nodeType === 8) {
          return elem.data;
          // A comment
        } else {
          // console.error(`unhandled node type: ${elem.nodeType}`);
        }

        return o;
      },

      innerXml(node) {
        let str = '';
        if ('innerHTML' in node) {
          str = node.innerHTML;
        } else {
          const asXml = (n) => {
            let s = '';
            if (n.nodeType === 1) {
              s += `<${n.nodeName}`;
              for (let i = 0; i < n.attributes.length; i += 1) {
                const { name } = n.attributes[i];
                const value = n.attributes[i].value || '';
                s += ` ${name}="${value.toString()}"`;
              }
              if (n.firstChild) {
                s += '>';
                for (let c = n.firstChild; c; c = c.nextSibling) {
                  s += asXml(c);
                }
                s += `</${n.nodeName}>`;
              } else {
                s += '/>';
              }
            } else if (n.nodeType === 3) {
              s += n.nodeValue;
            } else if (n.nodeType === 4) {
              s += `<![CDATA[${n.nodeValue}]]>`;
            }
            return s;
          };

          for (let c = node.firstChild; c; c = c.nextSibling) {
            str += asXml(c);
          }
        }
        return str;
      },

      escape(txt) {
        return txt.replace(/[\\]/g, '\\\\').replace(/["]/g, '\\"').replace(/[\n]/g, '\\n').replace(/[\r]/g, '\\r');
      },

      removeWhite(e) {
        e.normalize();
        for (let n = e.firstChild; n;) {
          if (n.nodeType === 3) { // text node
            if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
              // pure whitespace text node
              const nxt = n.nextSibling;
              e.removeChild(n);
              n = nxt;
            } else {
              n = n.nextSibling;
            }
          } else if (n.nodeType === 1) { // element node
            X.removeWhite(n);
            n = n.nextSibling;
          } else { // any other node
            n = n.nextSibling;
          }
        }
        return e;
      },
    };

    // Strip namespaces from XML tags
    const cleanXml = clean ? xml.replace(/<(\/?)([^:>\s]*:)?([^>]+)>/g, '<$1$3>') : xml;

    // Convert to an XML DOM Document
    const domRoot = (new DOMParser()).parseFromString(cleanXml, 'text/xml');

    // Start from document's root element
    const domElem = (domRoot.nodeType === 9) ? domRoot.documentElement : domRoot;

    const ret = {};
    ret[domElem.nodeName] = X.toObj(X.removeWhite(domElem));
    return ret;
  },

  write(object) {
    const toXml = (v, name, ind) => {
      let xml = '';
      if (v instanceof Array) {
        for (let i = 0, n = v.length; i < n; i += 1) {
          xml += `${ind + toXml(v[i], name, `${ind}\t`)}\n`;
        }
      } else if (typeof (v) === 'object') {
        let hasChild = false;
        xml += `${ind}<${name}`;
        Object.keys(v).forEach((m) => {
          if (m.charAt(0) === '@') {
            xml += ` ${m.substr(1)}="${v[m].toString()}"`;
          } else {
            hasChild = true;
          }
        });
        xml += hasChild ? '>' : '/>';
        if (hasChild) {
          Object.keys(v).forEach((m) => {
            if (m === '#text') {
              xml += v[m];
            } else if (m === '#cdata') {
              xml += `<![CDATA[${v[m]}]]>`;
            } else if (m.charAt(0) !== '@') {
              xml += toXml(v[m], m, `${ind}\t`);
            }
          });
          xml += `${xml.charAt(xml.length - 1) === '\n' ? ind : ''}</${name}>`;
        }
      } else {
        xml += `${ind}<${name}>${v.toString()}</${name}>`;
      }
      return xml;
    };

    let xml = '';
    Object.keys(object).forEach((i) => {
      xml += toXml(object[i], i, '');
    });
    return xml;
  },
});


/***/ }),

/***/ "./src/js/locale-date.js":
/*!*******************************!*\
  !*** ./src/js/locale-date.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./i18n */ "./src/js/i18n.js");


const date = {
  utc: false,
  locale: navigator.language || navigator.browserLanguage,
};

/* harmony default export */ __webpack_exports__["default"] = ({
  display(d) {
    if (!d) {
      return _i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t('(no date)');
    }
    if (date.utc) {
      return `${d.toLocaleString(date.locale, {
        timeZone: 'UTC',
      })} UTC`;
    }
    return d.toLocaleString(date.locale);
  },
  locale(l) {
    if (l) {
      date.locale = l;
    }
    return date.locale;
  },
  utc(u) {
    if (typeof u !== 'undefined') {
      date.utc = u;
    }
    return date.utc;
  },
});


/***/ }),

/***/ "./src/js/widget-common.js":
/*!*********************************!*\
  !*** ./src/js/widget-common.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _locale_date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./locale-date */ "./src/js/locale-date.js");


function loadCSS(url) {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute('href', url);
  if (typeof link !== 'undefined') {
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

/* harmony default export */ __webpack_exports__["default"] = ({
  inputs: ['service', 'offering'],
  optional_inputs: ['footnote', 'custom_css_url', 'display_utc_times'],

  init(config, el) {
    if (config.custom_css_url !== undefined) {
      loadCSS(config.custom_css_url);
    }
    if (config.footnote !== undefined && el.querySelector('.footnote')) {
      // eslint-disable-next-line no-param-reassign
      el.querySelector('.footnote').innerHTML = config.footnote;
    }
    if (config.display_utc_times) {
      _locale_date__WEBPACK_IMPORTED_MODULE_0__["default"].utc(true);
    }
  },
});


/***/ })

}]);
//# sourceMappingURL=widget-compass-js~widget-gauge-js~widget-jqgrid-js~widget-map-js~widget-panel-js~widget-progressbar-~bc566e36.chunk.js.map
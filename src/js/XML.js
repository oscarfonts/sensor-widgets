/* This work is licensed under Creative Commons GNU LGPL License.

 License: http://creativecommons.org/licenses/LGPL/2.1/
 Version: 0.9
 Author:  Stefan Goessner/2006
 See:     http://goessner.net/download/prj/jsonxml/
 */
export default {
  read(xml, clean) {
    var X = {
      at: (clean ? '' : '@'),

      toObj(xml) {
        let o = {};
        if (xml.nodeType == 1) { // element node
          if (xml.attributes.length) { // element with attributes
            for (let i = 0; i < xml.attributes.length; i++) {
              const { name } = xml.attributes[i];
              const { value } = xml.attributes[i];
              const is_ns = name.lastIndexOf('xmlns:', 0) === 0;
              if (!(clean && is_ns)) { // Hide xmlns attributes
                o[X.at + name] = (value || '').toString();
              }
            }
          }
          if (xml.firstChild) { // element has child nodes
            let textChild = 0;
            let cdataChild = 0;
            let hasElementChild = false;
            for (var n = xml.firstChild; n; n = n.nextSibling) {
              if (n.nodeType == 1) {
                hasElementChild = true;
              } else if (n.nodeType == 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
                textChild++;
                // non-whitespace text
              } else if (n.nodeType == 4) {
                cdataChild++;
                // cdata section node
              }
            }
            if (hasElementChild) {
              if (textChild < 2 && cdataChild < 2) {
                // structured element with evtl.
                // a single text or/and cdata node
                X.removeWhite(xml);
                for (n = xml.firstChild; n; n = n.nextSibling) {
                  if (n.nodeType == 3) { // text node
                    o['#text'] = X.escape(n.nodeValue);
                  } else if (n.nodeType == 4) { // cdata node
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
              } else { // mixed content
                if (!xml.attributes.length) {
                  o = X.escape(X.innerXml(xml));
                } else {
                  o['#text'] = X.escape(X.innerXml(xml));
                }
              }
            } else if (textChild) { // pure text
              if (!xml.attributes.length) {
                o = X.escape(X.innerXml(xml));
              } else {
                o['#text'] = X.escape(X.innerXml(xml));
              }
            } else if (cdataChild) { // cdata
              if (cdataChild > 1) {
                o = X.escape(X.innerXml(xml));
              } else {
                for (n = xml.firstChild; n; n = n.nextSibling) {
                  o['#cdata'] = X.escape(n.nodeValue);
                }
              }
            }
          }
          if (!xml.attributes.length && !xml.firstChild) {
            o = null;
          }
        } else if (xml.nodeType == 9) { // document.node
          o = X.toObj(xml.documentElement);
        } else if (xml.nodeType == 8) {
          return xml.data;
          // A comment
        } else {
          console.error(`unhandled node type: ${xml.nodeType}`);
        }

        return o;
      },

      innerXml(node) {
        let s = '';
        if ('innerHTML' in node) {
          s = node.innerHTML;
        } else {
          var asXml = function (n) {
            let s = '';
            if (n.nodeType == 1) {
              s += `<${n.nodeName}`;
              for (let i = 0; i < n.attributes.length; i++) {
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
            } else if (n.nodeType == 3) {
              s += n.nodeValue;
            } else if (n.nodeType == 4) {
              s += `<![CDATA[${n.nodeValue}]]>`;
            }
            return s;
          };

          for (let c = node.firstChild; c; c = c.nextSibling) {
            s += asXml(c);
          }
        }
        return s;
      },

      escape(txt) {
        return txt.replace(/[\\]/g, '\\\\').replace(/[\"]/g, '\\"').replace(/[\n]/g, '\\n').replace(/[\r]/g, '\\r');
      },

      removeWhite(e) {
        e.normalize();
        for (let n = e.firstChild; n;) {
          if (n.nodeType == 3) { // text node
            if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
              // pure whitespace text node
              const nxt = n.nextSibling;
              e.removeChild(n);
              n = nxt;
            } else {
              n = n.nextSibling;
            }
          } else if (n.nodeType == 1) { // element node
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
    if (clean) {
      xml = xml.replace(/<(\/?)([^:>\s]*:)?([^>]+)>/g, '<$1$3>');
    }

    // Convert to an XML DOM Document
    xml = (new DOMParser()).parseFromString(xml, 'text/xml');

    // Start from document's root element
    if (xml.nodeType == 9) {
      xml = xml.documentElement;
    }

    const ret = {};
    ret[xml.nodeName] = X.toObj(X.removeWhite(xml));
    return ret;
  },

  write(object) {
    var toXml = function (v, name, ind) {
      let xml = '';
      if (v instanceof Array) {
        for (let i = 0, n = v.length; i < n; i++) {
          xml += `${ind + toXml(v[i], name, `${ind}\t`)}\n`;
        }
      } else if (typeof (v) === 'object') {
        let hasChild = false;
        xml += `${ind}<${name}`;
        for (var m in v) {
          if (m.charAt(0) == '@') {
            xml += ` ${m.substr(1)}="${v[m].toString()}"`;
          } else {
            hasChild = true;
          }
        }
        xml += hasChild ? '>' : '/>';
        if (hasChild) {
          for (m in v) {
            if (m == '#text') {
              xml += v[m];
            } else if (m == '#cdata') {
              xml += `<![CDATA[${v[m]}]]>`;
            } else if (m.charAt(0) != '@') {
              xml += toXml(v[m], m, `${ind}\t`);
            }
          }
          xml += `${xml.charAt(xml.length - 1) == '\n' ? ind : ''}</${name}>`;
        }
      } else {
        xml += `${ind}<${name}>${v.toString()}</${name}>`;
      }
      return xml;
    };

    let xml = '';
    for (const i in object) {
      xml += toXml(object[i], i, '');
    }
    return xml;
  },
};

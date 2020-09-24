/* This work is licensed under Creative Commons GNU LGPL License.

 License: http://creativecommons.org/licenses/LGPL/2.1/
 Version: 0.9
 Author:  Stefan Goessner/2006
 See:     http://goessner.net/download/prj/jsonxml/
 */
export default {
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
          xml += `${ind + toXml(v[i], name, `${ind}`)}\n`;
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
              xml += toXml(v[m], m, `${ind}`);
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
};

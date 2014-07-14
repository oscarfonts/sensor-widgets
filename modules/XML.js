/* This work is licensed under Creative Commons GNU LGPL License.

 License: http://creativecommons.org/licenses/LGPL/2.1/
 Version: 0.9
 Author:  Stefan Goessner/2006
 See:     http://goessner.net/download/prj/jsonxml/
 */
define(function() {

	return {
		read: function(xml, clean) {
			var X = {
				at: ( clean ? "" : "@"),

				toObj: function(xml) {
					var o = {};
					if (xml.nodeType == 1) {// element node
						if (xml.attributes.length) {// element with attributes
							for (var i = 0; i < xml.attributes.length; i++) {
								var name = xml.attributes[i].nodeName;
								var value = xml.attributes[i].nodeValue;
								var is_ns = name.lastIndexOf("xmlns:", 0) === 0;
								if (!(clean && is_ns)) {// Hide xmlns attributes
									o[X.at + name] = (value || "").toString();
								}
							}
						}
						if (xml.firstChild) {// element has child nodes
							var textChild = 0, cdataChild = 0, hasElementChild = false;
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
									for (var n = xml.firstChild; n; n = n.nextSibling) {
										if (n.nodeType == 3) {// text node
											o["#text"] = X.escape(n.nodeValue);
										} else if (n.nodeType == 4) {// cdata node
											o["#cdata"] = X.escape(n.nodeValue);
										} else if (o[n.nodeName]) {
											// multiple occurence of element
											if (o[n.nodeName] instanceof Array) {
												o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
											} else {
												o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
											}
										} else {// first occurence of element
											o[n.nodeName] = X.toObj(n);
										}
									}
								} else {// mixed content
									if (!xml.attributes.length) {
										o = X.escape(X.innerXml(xml));
									} else {
										o["#text"] = X.escape(X.innerXml(xml));
									}
								}
							} else if (textChild) {// pure text
								if (!xml.attributes.length) {
									o = X.escape(X.innerXml(xml));
								} else {
									o["#text"] = X.escape(X.innerXml(xml));
								}
							} else if (cdataChild) {// cdata
								if (cdataChild > 1) {
									o = X.escape(X.innerXml(xml));
								} else {
									for (var n = xml.firstChild; n; n = n.nextSibling) {
										o["#cdata"] = X.escape(n.nodeValue);
									}
								}
							}
						}
						if (!xml.attributes.length && !xml.firstChild) {
							o = null;
						}
					} else if (xml.nodeType == 9) {// document.node
						o = X.toObj(xml.documentElement);
					} else if (xml.nodeType == 8) {
						return xml.data;
						// A comment
					} else {
						// TODO better error handling
						alert("unhandled node type: " + xml.nodeType);
					}

					return o;
				},

				innerXml: function(node) {
					var s = "";
					if ("innerHTML" in node) {
						s = node.innerHTML;
					} else {
						var asXml = function(n) {
							var s = "";
							if (n.nodeType == 1) {
								s += "<" + n.nodeName;
								for (var i = 0; i < n.attributes.length; i++) {
									var name = n.attributes[i].nodeName;
									var value = n.attributes[i].nodeValue || "";
									s += " " + name + "=\"" + value.toString() + "\"";
								}
								if (n.firstChild) {
									s += ">";
									for (var c = n.firstChild; c; c = c.nextSibling) {
										s += asXml(c);
									}
									s += "</" + n.nodeName + ">";
								} else {
									s += "/>";
								}
							} else if (n.nodeType == 3) {
								s += n.nodeValue;
							} else if (n.nodeType == 4) {
								s += "<![CDATA[" + n.nodeValue + "]]>";
							}
							return s;
						};

						for (var c = node.firstChild; c; c = c.nextSibling) {
							s += asXml(c);
						}
					}
					return s;
				},

				escape: function(txt) {
					return txt.replace(/[\\]/g, "\\\\").replace(/[\"]/g, '\\"').replace(/[\n]/g, '\\n').replace(/[\r]/g, '\\r');
				},

				removeWhite: function(e) {
					e.normalize();
					for (var n = e.firstChild; n; ) {
						if (n.nodeType == 3) {// text node
							if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
								// pure whitespace text node
								var nxt = n.nextSibling;
								e.removeChild(n);
								n = nxt;
							} else {
								n = n.nextSibling;
							}
						} else if (n.nodeType == 1) {// element node
							X.removeWhite(n);
							n = n.nextSibling;
						} else {// any other node
							n = n.nextSibling;
						}
					}
					return e;
				}
			};

			// Strip namespaces from XML tags
			if (clean) {
				xml = xml.replace(/<(\/?)([^:>\s]*:)?([^>]+)>/g, "<$1$3>");
			}

			// Convert to an XML DOM Document
			xml = (new DOMParser()).parseFromString(xml, "text/xml");

			// Start from document's root element
			if (xml.nodeType == 9) {
				xml = xml.documentElement;
			}

			var ret = {};
			ret[xml.nodeName] = X.toObj(X.removeWhite(xml));
			return ret;
		},

		write: function(object) {
			var toXml = function(v, name, ind) {
				var xml = "";
				if ( v instanceof Array) {
					for (var i = 0, n = v.length; i < n; i++) {
						xml += ind + toXml(v[i], name, ind + "\t") + "\n";
					}
				} else if ( typeof (v) == "object") {
					var hasChild = false;
					xml += ind + "<" + name;
					for (var m in v) {
						if (m.charAt(0) == "@") {
							xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
						} else {
							hasChild = true;
						}
					}
					xml += hasChild ? ">" : "/>";
					if (hasChild) {
						for (var m in v) {
							if (m == "#text") {
								xml += v[m];
							} else if (m == "#cdata") {
								xml += "<![CDATA[" + v[m] + "]]>";
							} else if (m.charAt(0) != "@") {
								xml += toXml(v[m], m, ind + "\t");
							}
						}
						xml += (xml.charAt(xml.length - 1) == "\n" ? ind : "") + "</" + name + ">";
					}
				} else {
					xml += ind + "<" + name + ">" + v.toString() + "</" + name + ">";
				}
				return xml;
			};

			var xml = "";
			for (var i in object) {
				xml += toXml(object[i], i, "");
			}
			return xml;
		}
	};
});
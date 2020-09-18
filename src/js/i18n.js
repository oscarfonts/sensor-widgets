/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
import translations from './translations.json';

const params = {};
location.search.substr(1).split('&').forEach((item) => {
  const kv = item.split('=');
  params[kv[0]] = kv[1];
});

let activeLang;
setLang(params.hasOwnProperty('lang') ? params.lang : 'en');

function setLang(lang) {
  activeLang = lang;
  console.debug(`Language set to ${activeLang}`);
}

function template(string, values) {
  for (const key in values) string = string.replace(new RegExp(`{${key}}`, 'g'), values[key]);
  return string;
}

function t(string, values) {
  if (translations.hasOwnProperty(string) && translations[string].hasOwnProperty(activeLang)) {
    string = translations[string][activeLang];
  }
  return template(string, values);
}

export default {
  langs() {
    return translations.langs;
  },
  getLang() {
    return activeLang;
  },
  setLang,
  t,
  addTranslations(bundle) {
    Object.keys(bundle).forEach((key) => {
      if (!translations.hasOwnProperty(key)) {
        translations[key] = bundle[key];
      } else {
        console.warn(`Skipping duplicate entry '${key}' in translation bundle.`);
      }
    });
  },
  translateDocTree(el) {
    if (!el) el = document;
    const treeWalker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    while (treeWalker.nextNode()) {
      const node = treeWalker.currentNode;
      if (/\S/.test(node.nodeValue)) { // Not a whitespace-only text node
        node.nodeValue = t(node.nodeValue);
      }
    }
  },
};

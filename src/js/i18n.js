import translations from './translations.json';

const params = {};
window.location.search.substr(1).split('&').forEach((item) => {
  const [key, value] = item.split('=');
  params[key] = value;
});

let activeLang;

function setLang(lang) {
  activeLang = lang;
  console.debug(`Language set to ${activeLang}`);
}

setLang(Object.prototype.hasOwnProperty.call(params, 'lang') ? params.lang : 'en');

function template(templ, dict) {
  let result = templ;
  if (dict) {
    Object.entries(dict).forEach(([key, value]) => {
      result = result.replace(new RegExp(`{${key}}`, 'g'), value);
    });
  }
  return result;
}

function t(string, values) {
  let translated = string;
  if (Object.prototype.hasOwnProperty.call(translations, string)
    && Object.prototype.hasOwnProperty.call(translations[string], activeLang)) {
    translated = translations[string][activeLang];
  }
  return template(translated, values);
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
      if (!Object.prototype.hasOwnProperty.call(translations, key)) {
        translations[key] = bundle[key];
      } else {
        console.warn(`Skipping duplicate entry '${key}' in translation bundle.`);
      }
    });
  },
  translateDocTree(el) {
    const element = el || document;
    const treeWalker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    while (treeWalker.nextNode()) {
      const node = treeWalker.currentNode;
      if (/\S/.test(node.nodeValue)) { // Not a whitespace-only text node
        node.nodeValue = t(node.nodeValue);
      }
    }
  },
};

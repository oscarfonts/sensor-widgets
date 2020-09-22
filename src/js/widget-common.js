import ld from './locale-date';

function loadCSS(url) {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute('href', url);
  if (typeof link !== 'undefined') {
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

export default {
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
      ld.utc(true);
    }
  },
};

/* eslint-disable no-param-reassign */
import i18n from '../i18n';
import dataAccess from '../sos-data-access';
import drawing from './thermometer.svg';
import ld from '../locale-date';
import common from '../widget-common';

const template = [
  '<div class="thermometer widget">',
  '<h1 class="feature"></h1>',
  drawing,
  '<div class="data">',
  '<h2><span class="property"></span>: <span class="value"></span> ', i18n.t('Cel'), '</h2>',
  '<h3>', i18n.t('Request time'), ': <span class="request_time"></span></h3>',
  '<h3>', i18n.t('Result time'), ': <span class="result_time"></span></h3>',
  '</div>',
  '<div><span class="footnote"></span></div>',
  '</div>',
].join('');

const dy = 3.342574;
const yMax = 206.34359 + 267.40595;
const tMin = -24;

export default {
  inputs: common.inputs.concat(['feature', 'property', 'refresh_interval']),
  optional_inputs: common.optional_inputs,
  preferredSizes: [{ w: 300, h: 540 }],

  init(config, el, errorHandler) {
    // Render template
    el.innerHTML = template;
    const elem = el.querySelector('.svg-temp');
    const clip = (elem.firstElementChild || elem.firstChild);

    // load widget common features
    common.init(config, el);

    // Update view
    function redraw(data) {
      const measure = data[0];
      if (measure) {
        el.querySelector('.feature').innerHTML = measure.feature;
        el.querySelector('.property').innerHTML = measure.property;
        el.querySelector('.value').innerHTML = measure.value;
        el.querySelector('.request_time').innerHTML = ld.display(new Date());
        el.querySelector('.result_time').innerHTML = ld.display(measure.time);

        const h = dy * (measure.value - tMin);
        const yMin = yMax - h;
        clip.setAttribute('height', h.toString());
        clip.setAttribute('y', yMin.toString());
      } else {
        el.querySelector('.value').innerHTML = i18n.t('(no data)');
      }
    }

    // Setup SOS data access
    const data = dataAccess(config, redraw, errorHandler);
    const refreshIntervalId = setInterval(data.read, config.refresh_interval * 1000);
    data.read();

    return {
      destroy() {
        clearInterval(refreshIntervalId);
      },
    };
  },
};

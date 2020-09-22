/* eslint-disable no-param-reassign */
import i18n from '../i18n';
import dataAccess from '../sos-data-access';
import drawing from './compass.svg';
import ld from '../locale-date';
import common from '../widget-common';

const template = [
  '<div class="compass widget">',
  '<h1 class="title"></h1>',
  drawing,
  '<div class="data">',
  '<div class="error" style="display:none;text-align:center;">', i18n.t('Loading...'), '</div>',
  '<h2><span class="property"></span>:<br/><span class="value"></span> ', i18n.t('deg'), '</h2>',
  '<h3>', i18n.t('Request time'), ':<br/><span class="request_time"></span></h3>',
  '<h3>', i18n.t('Result time'), ':<br/><span class="result_time"></span></h3>',
  '</div>',
  '<div><span class="footnote"></span></div>',
  '</div>'].join('');

export default {
  inputs: common.inputs.concat(['feature', 'property', 'refresh_interval']),
  optional_inputs: ['title'].concat(common.optional_inputs),
  preferredSizes: [{ w: 570, h: 380 }, { w: 280, h: 540 }],

  init(config, el, errorHandler) {
    // Render template
    el.innerHTML = template;
    const arrow = el.querySelector('.arrow');
    const shadow = el.querySelector('.shadow');
    arrow.style.visibility = 'hidden';
    shadow.style.visibility = 'hidden';

    // load widget common features
    common.init(config, el);

    if (config.title) {
      el.querySelector('.title').innerHTML = config.title;
    }

    // Update view
    function redraw(data) {
      const measure = data[0];
      if (measure) {
        el.querySelector('.error').style.display = 'none';
        el.querySelector('.request_time').innerHTML = ld.display(new Date());
        el.querySelector('.result_time').innerHTML = ld.display(measure.time);
        el.querySelector('.value').innerHTML = measure.value;
        if (!config.title) {
          el.querySelector('.title').innerHTML = measure.feature;
        }
        el.querySelector('.property').innerHTML = measure.property;
        arrow.setAttribute('transform', `rotate(${measure.value}, 256, 256)`);
        shadow.setAttribute('transform', `translate(5, 5) rotate(${measure.value}, 256, 256)`);
        arrow.style.visibility = 'visible';
        shadow.style.visibility = 'visible';
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

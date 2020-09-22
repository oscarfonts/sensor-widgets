/* eslint-disable no-param-reassign */
import './progressbar.css';

import dataAccess from '../sos-data-access';
import ld from '../locale-date';
import common from '../widget-common';

const template = [
  '<div class="progressbar widget">',
  '<h1 class="feature"></h1>',
  '<h3 class="property"></h3>',
  '<div class="progress">',
  '<div class="min">0</div>',
  '<div class="max">100</div>',
  '<div class="background-bar">',
  '<span class="green bar">',
  '<div class="value"></div>',
  '</span>',
  '</div>',
  '</div>',
  '<h3 class="date"></h3>',
  '<div><span class="footnote"></span></div>',
  '</div>',
].join('');

export default {
  inputs: common.inputs.concat(['feature', 'property', 'refresh_interval', 'min_value', 'max_value']),
  optional_inputs: common.optional_inputs,
  preferredSizes: [{ w: 500, h: 220 }],

  init(config, el, errorHandler) {
    // Render template
    el.innerHTML = template;
    el.querySelector('.min').innerHTML = config.min_value;
    el.querySelector('.max').innerHTML = config.max_value;

    // load widget common features
    common.init(config, el);

    // Update view
    function redraw(data) {
      const measure = data[0];
      el.querySelector('.date').innerHTML = ld.display(measure.time);
      el.querySelector('.value').innerHTML = `${measure.value} ${measure.uom}`;
      el.querySelector('.feature').innerHTML = measure.feature;
      el.querySelector('.property').innerHTML = measure.property;

      const fullspan = el.querySelector('.background-bar').offsetWidth;
      const proportion = (measure.value - config.min_value) / (config.max_value - config.min_value);
      const width = fullspan * proportion;

      el.querySelector('.bar').style.width = `${width}px`;
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

/* eslint-disable no-param-reassign */
import dataAccess from '../sos-data-access';
import drawing from './gauge.svg';
import common from '../widget-common';

const template = [
  '<div class="gauge widget">',
  drawing,
  '<div><span class="footnote"></span></div>',
  '</div>'].join('');

export default {
  inputs: common.inputs.concat(['feature', 'property', 'refresh_interval']),
  optional_inputs: common.optional_inputs,
  preferredSizes: [{ w: 300, h: 300 }],

  init(config, el, errorHandler) {
    // Render template
    el.innerHTML = template;
    const arrow = el.querySelector('.arrow');
    const title = el.querySelector('.title');
    const value = el.querySelector('.value');

    // load widget common features
    common.init(config, el);

    // Update view
    function redraw(data) {
      const measure = data[0];
      title.innerHTML = measure.property;
      value.innerHTML = `${measure.value} %`;
      arrow.setAttribute('transform', `rotate(${2.7 * measure.value}, 365.396, 495)`);
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

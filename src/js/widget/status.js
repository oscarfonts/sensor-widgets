/* eslint-disable no-param-reassign */
import moment from 'moment';
import i18n from '../i18n';
import dataAccess from '../sos-data-access';
import common from '../widget-common';

// TODO moment locale?

moment.locale(i18n.getLang());

const template = [
  '<div class="status widget">',
  `<div class="table-responsive">${i18n.t('Loading...')}</div>`,
  '</div>',
  '<div><span class="footnote"></span></div>'].join('');

export default {
  inputs: common.inputs,
  optional_inputs: common.optional_inputs,
  preferredSizes: [{ w: 800, h: 600 }, { w: 1024, h: 768 }, { w: 1280, h: 1024 }],

  init(config, el, errorHandler) {
    // Render template
    el.innerHTML = template;

    // load widget common features
    common.init(config, el);

    config.features = undefined;
    config.properties = undefined;

    // Update view
    function redraw(data) {
      const table = {};
      const features = [];
      Object.keys(data).forEach((i) => {
        const measure = data[i];
        if (!table[measure.property]) {
          table[measure.property] = [];
        }
        table[measure.property][measure.feature] = measure;
        if (features.indexOf(measure.feature) === -1) {
          features.push(measure.feature);
        }
      });

      let html = '<table class="table table-striped table-condensed table-hover table-bordered">';
      html += '<thead>';
      html += '<tr><th></th>';
      Object.keys(features).forEach((c) => {
        html += `<th>${features[c]}</th>`;
      });
      html += '</tr></thead>';
      Object.keys(table).forEach((p) => {
        html += `<tr><th>${p}</th>`;
        Object.keys(features).forEach((f) => {
          f = features[f];
          if (table[p][f]) {
            html += '<td>';
            const m = table[p][f];
            const cell = `<div><span class="value">${m.value}</span> <span class="uom">${m.uom}</span></div>`
                                   + `<div><span class="result_time">${moment(m.time).fromNow()}</span></div>`;
            html += cell;
          } else {
            html += '<td class="nodata">';
            html += '(N/A)';
          }
          html += '</td>';
        });
        html += '</tr>';
      });
      el.querySelector('.table-responsive').innerHTML = html;
    }

    // Setup SOS data access
    const data = dataAccess(config, redraw, errorHandler);
    data.read();
  },
};

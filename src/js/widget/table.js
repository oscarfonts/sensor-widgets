/* eslint-disable no-param-reassign */
import dataAccess from '../sos-data-access';
import ld from '../locale-date';
import common from '../widget-common';

const template = [
  '<div class="table widget">',
  '<h3></h3>',
  '<div class="table-responsive"></div>',
  '<div><span class="footnote"></span></div>',
  '</div>',
].join('');

export default {
  inputs: common.inputs.concat(['feature', 'properties', 'time_start', 'time_end', 'title']),
  optional_inputs: common.optional_inputs,
  preferredSizes: [{ w: 400, h: 400 }],

  init(config, el, errorHandler) {
    // Render template
    el.innerHTML = template;
    el.querySelector('h3').innerHTML = config.title;
    const table = el.querySelector('.table-responsive');

    // load widget common features
    common.init(config, el);

    // Update view
    function createTable(measures, properties) {
      let html = '<table class="table table-striped table-condensed table-hover table-bordered">';
      html += '<thead>';
      html += '<tr>';
      html += '<th>Result Time</th>';

      const sortedNames = Object.keys(properties).sort();
      Object.keys(sortedNames).forEach((i) => {
        const name = sortedNames[i];
        const { uom } = properties[name];
        html += `<th>${name} (${uom})</th>`;
      });
      html += '</tr>';
      html += '</thead>';

      const times = Object.keys(measures);
      times.sort().reverse();
      Object.keys(times).forEach((i) => {
        const time = times[i];
        const values = measures[time];
        html += '<tr>';
        html += `<th class="time">${ld.display(new Date(parseInt(time, 10)))}</th>`;
        Object.keys(sortedNames).forEach((j) => {
          html += `<td>${values[sortedNames[j]]}</td>`;
        });
        html += '</tr>';
      });
      html += '</table>';
      table.innerHTML = html;
    }

    function redraw(data) {
      // Get tabular data from observations
      const measures = {};
      const properties = {};
      Object.keys(data).forEach((i) => {
        const measure = data[i];

        // Add value in a time-indexed "measures" object
        const time = measure.time.getTime();
        if (!measures[time]) {
          measures[time] = {};
        }
        measures[time][measure.property] = measure.value;

        // Add property to a "properties" object, including uom
        if (!properties[measure.property]) {
          properties[measure.property] = {
            name: measure.property,
            uom: measure.uom,
          };
        }
      });

      createTable(measures, properties);
    }

    // Setup SOS data access
    const data = dataAccess(config, redraw, errorHandler);
    data.read();
  },
};

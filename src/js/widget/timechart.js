/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
import data_access from '../sos-data-access';
import ld from '../locale-date';
import common from '../widget-common';

import '../jQuery-globals';

import 'flot/lib/jquery.mousewheel';
import 'flot/source/jquery.canvaswrapper';
import 'flot/source/jquery.colorhelpers';
import 'flot/source/jquery.flot';
import 'flot/source/jquery.flot.uiConstants';

import 'flot-plugins/dist/source/misc/jquery.flot.tooltip';

const flotReq = require.context('../../../node_modules/flot/source/', true, /flot.*\.js$/);
flotReq.keys().forEach(flotReq);

// TODO readd legend
// TODO readd pan and zoom

const template = [
  '<div class="timechart widget">',
  '<h3 style="width:100%"></h3>',
  '<div class="graph" style="height:75%; width: 100%; max-height: 380px;"></div>',
  '<div class="legend" style="display: inline-block; float: right; margin-right: 15px; margin-left: 50px; margin-top: 10px"></div>',
  '<div><span class="footnote"></span></div>',
  '</div>',
].join('');

const timechart = {
  inputs: common.inputs.concat(['features', 'properties', 'time_start', 'time_end', 'title']),
  optional_inputs: common.optional_inputs,
  preferredSizes: [{ w: 650, h: 530 }],

  init(config, el, errorHandler) {
    // Render template
    el.innerHTML = template;
    el.querySelector('h3').innerHTML = config.title;
    const graph = el.querySelector('.graph');

    // load widget common features
    common.init(config, el);

    // Setup SOS data access
    const data = data_access(config, redraw, errorHandler);
    data.read();

    function redraw(data) {
      const series = {};
      for (const i in data) {
        const measure = data[i];
        const label = `${measure.property} (${measure.feature})`;
        if (!series[label]) {
          series[label] = {
            data: [],
            label,
          };
        }
        series[label].data.push([measure.time.getTime() / 1000, measure.value]);
      }

      const sortFunction = function (a, b) {
        return b[0] - a[0];
      };

      // Sort data by time, convert to array
      const arr = [];
      for (const k in series) {
        series[k].data.sort(sortFunction);
        arr.push(series[k]);
      }

      const options = {
        xaxis: {
          mode: 'time',
          timezone: ld.utc() ? 'UTC' : 'browser',
        },
        yaxis: {
          zoomRange: false,
          panRange: false,
        },
        grid: {
          hoverable: true,
        },
        legend: {
          container: el.querySelector('.legend'),
        },
        series: {
          lines: {
            show: true,
          },
          points: {
            show: true,
          },
        },
        tooltip: true,
        tooltipOpts: {
          content: data.length ? `[%x] %s: %y.2 ${data[0].uom}` : '',
        },
        zoom: {
          interactive: true,
        },
        pan: {
          interactive: true,
        },
      };

      if (config.colors) {
        options.colors = config.colors;
      }

      const plot = $.plot(graph, arr, options);

      if (config.callback) {
        config.callback(plot, graph);
      }
    }
  },
};

export default timechart;

/* eslint-disable no-param-reassign */
import Highcharts from 'highcharts';
import addMore from 'highcharts/highcharts-more';
import dataAccess from '../sos-data-access';
import common from '../widget-common';

addMore(Highcharts);

const labels = ['&gt; 10 m/s', '8-10 m/s', '6-8 m/s', '4-6 m/s', '2-4 m/s', '0-2 m/s'];

export default {
  inputs: common.inputs.concat(['feature', 'properties', 'time_start', 'time_end', 'refresh_interval', 'title']),
  optional_inputs: ['subtitle'].concat(common.optional_inputs),
  preferredSizes: [{ w: 620, h: 450 }],

  init(config, el, errorHandler) {
    // Main div
    const mainDiv = document.createElement('div');
    mainDiv.className = 'windrose widget';

    // Chart div
    const chart = document.createElement('div');
    mainDiv.appendChild(chart);

    // Add footnote element
    const footnoteDiv = document.createElement('div');
    const footnoteSpan = document.createElement('span');
    footnoteSpan.className = 'footnote';
    footnoteDiv.appendChild(footnoteSpan);
    mainDiv.appendChild(footnoteDiv);

    el.appendChild(mainDiv);

    // load widget common features
    common.init(config, el, errorHandler);

    function redraw(data) {
      const arr = [];
      Object.keys(data).forEach((i) => {
        const measure = data[i];

        // Build a sparse array where index is timestamp, and member is a 2-element array
        // First element is wind speed, second element is wind direction
        const timestamp = measure.time.getTime();
        const magnitude = measure.uom === 'º' ? 1 : 0;

        if (!arr[timestamp]) {
          arr[timestamp] = [];
        }
        arr[timestamp][magnitude] = measure.value;
      });

      // Build a matrix where first index is speed range, and second is direction
      const slots = [];
      while (slots.length < 6) {
        const dirs = [];
        while (dirs.push(null) < 16) {
          // do nothing
        }
        slots.push(dirs);
      }

      // Sum the number of observations for each speed+direction slot
      let n = 0;
      Object.keys(arr).forEach((i) => {
        const values = arr[i];
        if (values.length === 2) {
          const speed = 5 - Math.min(Math.floor(values[0] / 2), 5); // Speed slot - from 0 to 5
          const direction = Math.round(values[1] / 22.5) % 16; // Direction slot - from 0 to 15
          if (!slots[speed][direction]) {
            slots[speed][direction] = 1;
          } else {
            slots[speed][direction] += 1;
          }
          n += 1;
        }
      });

      // Convert from sample count to percentage
      // Generate legend
      const series = [];
      Object.keys(slots).forEach((i) => {
        let total = 0;
        Object.keys(slots[i]).forEach((j) => {
          slots[i][j] = (slots[i][j] * 100) / n;
          total += slots[i][j];
        });
        series.push({
          name: `${labels[i]} (${Math.round(total)}%)`,
          data: slots[i],
        });
      });

      // Finally, generate the chart
      // eslint-disable-next-line no-new
      new Highcharts.Chart({
        chart: {
          type: 'column',
          polar: true,
          renderTo: chart,
        },
        title: {
          text: config.title,
        },
        subtitle: {
          text: config.subtitle,
        },
        pane: {
          size: '85%',
        },
        legend: {
          align: 'right',
          verticalAlign: 'top',
          y: 100,
          layout: 'vertical',
        },
        xAxis: {
          tickmarkPlacement: 'on',
          categories: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'],
        },
        yAxis: {
          min: 0,
          endOnTick: false,
          showLastLabel: true,
          labels: {
            formatter() {
              return `${this.value} %`;
            },
          },
        },
        tooltip: {
          formatter() {
            return `<span style="color:${this.series.color}">\u25CF</span> ${this.series.name}: <b>${Highcharts.numberFormat(this.y, 1)} %</b><br/>`;
          },
        },
        plotOptions: {
          series: {
            stacking: 'normal',
            shadow: false,
            groupPadding: 0,
            pointPlacement: 'on',
          },
        },
        colors: ['#BD0BC9', '#C9170B', '#C9760B', '#BDC90B', '#0BC917', '#0BBDC9'],
        series,
      });
    }

    // Setup SOS data access
    const data = dataAccess(config, redraw);
    const refreshIntervalId = setInterval(data.read, config.refresh_interval * 1000);
    data.read();

    return {
      destroy() {
        clearInterval(refreshIntervalId);
      },
    };
  },
};

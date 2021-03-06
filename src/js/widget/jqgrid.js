/* eslint-disable no-param-reassign */
import $ from 'jquery';
import grid from 'jqgrid/js/jquery.jqGrid.src';
import gridLocaleEn from 'jqgrid/js/i18n/grid.locale-en';
import i18n from '../i18n';
import dataAccess from '../sos-data-access';
import ld from '../locale-date';
import common from '../widget-common';

import 'jquery-ui';
import '../../assets/css/jquery-ui.css';

import 'jqgrid/css/ui.jqgrid.css';
import './jqgrid.css';

grid($);
gridLocaleEn($);

let count = 0;

export default {
  inputs: common.inputs.concat(['features', 'properties', 'time_start', 'time_end', 'title']),
  optional_inputs: common.optional_inputs,
  preferredSizes: [{ w: 530, h: 440 }],

  init(config, el, errorHandler) {
    // Render template
    el.innerHTML = [
      '<div class="jqgrid widget">',
      '<h1 class="title"></h1>',
      // eslint-disable-next-line no-plusplus
      '<table id="grid', ++count, '"></table>',
      '<div id="pager', count, '"></div>',
      '<div><span class="footnote"></span></div>',
      '</div>',
    ].join('');
    el.querySelector('.title').innerHTML = config.title;

    // load widget common features
    common.init(config, el);

    function setFullWidth() {
      $('.grid').setGridWidth($(window).width() - 2);
    }

    function redraw(data) {
      // jqGrid table
      $(`#grid${count}`).first().jqGrid({
        datatype: 'local',
        height: 'auto',
        width: '100%',
        caption: i18n.t('Results'),
        data,
        pager: `#pager${count}`,
        rowNum: 12,
        sortname: 'time',
        autowidth: true,
        colNames: [
          i18n.t('Time'),
          i18n.t('Feature'),
          i18n.t('Property'),
          i18n.t('Value'),
          i18n.t('Unit'),
        ],
        colModel: [{
          name: 'time',
          index: 'time',
          width: '160',
          formatter(cellvalue) {
            return ld.display(cellvalue);
          },
        }, {
          name: 'feature',
          index: 'feature',
          width: '150',
        }, {
          name: 'property',
          index: 'property',
          width: '150',
        }, {
          name: 'value',
          index: 'value',
          width: '80',
          align: 'right',
        }, {
          name: 'uom',
          index: 'uom',
          width: '60',
        }],
      });

      $(window).bind('resize', setFullWidth);
      setFullWidth();
    }

    // Setup SOS data access
    const data = dataAccess(config, redraw, errorHandler);
    data.read();
  },
};

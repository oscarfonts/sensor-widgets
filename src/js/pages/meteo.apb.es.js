import './meteo.css';
import $ from '../jQuery-globals';
import i18n from '../i18n';
import SensorWidget from '../SensorWidget';
import ld from '../locale-date';
import 'bootstrap';

ld.utc(false);
ld.locale('es');
i18n.setLang('ca');

const defs = {
  service() {
    return window.sosUrl ? window.sosUrl : '/52n-sos/service';
  },
  offering(p) {
    return `http://sensors.portdebarcelona.cat/def/weather/offerings#${p}`;
  },
  feature(p) {
    return `http://sensors.portdebarcelona.cat/def/weather/features#${p}`;
  },
  property(p) {
    return `http://sensors.portdebarcelona.cat/def/weather/properties#${p}`;
  },
};

const now = new Date();
const twoHoursAgo = new Date(now.getTime() - 1000 * 60 * 60 * 2);
const threeHoursAgo = new Date(now.getTime() - 1000 * 60 * 60 * 3);
const back33Samples = new Date(now.getTime() - 1000 * 60 * 60 * 17);
const aDayAgo = new Date(now.getTime() - 1000 * 60 * 60 * 24);

const section = $('.active a').text();

switch (section) {
  case 'Sirena':

    SensorWidget('compass', {
      service: defs.service(),
      offering: defs.offering('1M'),
      feature: defs.feature('02'),
      property: defs.property('31'),
      refresh_interval: 15,
    }, document.querySelector('.sirena .compass'));

    SensorWidget('thermometer', {
      service: defs.service(),
      offering: defs.offering('1M'),
      feature: defs.feature('02'),
      property: defs.property('32'),
      refresh_interval: 15,
    }, document.querySelector('.sirena .meteo-thermometer'));

    SensorWidget('timechart', {
      title: 'Velocitat Vent',
      service: defs.service(),
      offering: defs.offering('10M'),
      features: [defs.feature('02')],
      properties: [defs.property('30M'), defs.property('30')],
      time_start: `${aDayAgo.toISOString().substring(0, 19)}Z`,
      time_end: `${now.toISOString().substring(0, 19)}Z`,
    }, document.querySelector('.sirena .timechart'));

    SensorWidget('windrose', {
      title: 'Rosa vents últimes 3h',
      subtitle: 'Sirena, mostres minutals',
      service: defs.service(),
      offering: defs.offering('1M'),
      feature: defs.feature('02'),
      properties: [defs.property('30'), defs.property('31')],
      time_start: `${threeHoursAgo.toISOString().substring(0, 19)}Z`,
      time_end: `${now.toISOString().substring(0, 19)}Z`,
      refresh_interval: 120,
    }, document.querySelector('.sirena .windrose'));

    SensorWidget('table', {
      title: 'Taula de dades',
      service: defs.service(),
      offering: defs.offering('30M'),
      feature: defs.feature('02'),
      properties: [defs.property('30'), defs.property('30M'), defs.property('31'), defs.property('32'), defs.property('33'), defs.property('35'), defs.property('36'), defs.property('34')],
      time_start: `${back33Samples.toISOString().substring(0, 19)}Z`,
      time_end: `${now.toISOString().substring(0, 19)}Z`,
    }, document.querySelector('.sirena .tablex'));

    break;

  case 'XMVQA':
    {
      SensorWidget('compass', {
        title: 'Sirena',
        service: defs.service(),
        offering: defs.offering('1M'),
        feature: defs.feature('02'),
        property: defs.property('31'),
        refresh_interval: 15,
      }, document.querySelector('.xmvqa .left .compass'));

      SensorWidget('panel', {
        title: 'Dades minutals',
        service: defs.service(),
        offering: defs.offering('1M'),
        feature: defs.feature('02'),
        properties: [defs.property('30'), defs.property('31'), defs.property('32'), defs.property('33'), defs.property('34'), defs.property('35'), defs.property('36')],
        refresh_interval: 15,
      }, document.querySelector('.xmvqa .left .panel-10M'));

      SensorWidget('timechart', {
        title: 'Velocitat Vent',
        service: defs.service(),
        offering: defs.offering('10M'),
        features: [defs.feature('02')],
        properties: [defs.property('30')],
        time_start: `${twoHoursAgo.toISOString().substring(0, 19)}Z`,
        time_end: `${now.toISOString().substring(0, 19)}Z`,
      }, document.querySelector('.xmvqa .left .timechart'));

      SensorWidget('panel', {
        title: 'Darrers valors 30-minutals',
        service: defs.service(),
        offering: defs.offering('30M'),
        feature: defs.feature('02'),
        properties: [defs.property('30'), defs.property('31'), defs.property('32'), defs.property('33'), defs.property('34'), defs.property('35'), defs.property('36')],
        refresh_interval: 120,
      }, document.querySelector('.xmvqa .left .panel-30M'));

      const stations = {
        '01': 'Dispensari',
        P4: 'Dic Sud',
        '03': 'Adossat',
        P6: 'Contradic',
        P3: 'Unitat Mobil',
        P5: 'Dàrsena Sud B',
        10: 'ZAL2',
      };

      Object.keys(stations).forEach((station) => {
        SensorWidget('compass', {
          title: stations[station],
          service: defs.service(),
          offering: defs.offering('1M'),
          feature: defs.feature(station),
          property: defs.property('31'),
          refresh_interval: 15,
        }, document.querySelector(`.xmvqa .x${station} .compass`));

        SensorWidget('panel', {
          title: 'Dades minutals',
          service: defs.service(),
          offering: defs.offering('1M'),
          feature: defs.feature(station),
          properties: [defs.property('30'), defs.property('31'), defs.property('32'), defs.property('33'), defs.property('34'), defs.property('35'), defs.property('36')],
          refresh_interval: 15,
        }, document.querySelector(`.xmvqa .x${station} .panel`));
      });
    }
    break;

  case 'Torre Control':

    SensorWidget('map', {
      service: defs.service(),
      offering: defs.offering('30M'),
      features: [defs.feature('P4')],
      properties: [],
      permanent_tooltips: true,
      swap_axis: true,
      max_initial_zoom: 12,
    }, document.querySelector('.torrecontrol .p4 .map'));

    SensorWidget('compass', {
      service: defs.service(),
      offering: defs.offering('1M'),
      feature: defs.feature('P4'),
      property: defs.property('31'),
      refresh_interval: 15,
    }, document.querySelector('.torrecontrol .p4 .compass'));

    SensorWidget('panel', {
      title: 'Dades minutals',
      service: defs.service(),
      offering: defs.offering('1M'),
      feature: defs.feature('P4'),
      properties: [defs.property('31'), defs.property('30')],
      refresh_interval: 15,
    }, document.querySelector('.torrecontrol .p4 .panel-10M'));

    SensorWidget('panel', {
      title: 'Dades 30-minutals',
      service: defs.service(),
      offering: defs.offering('30M'),
      feature: defs.feature('P4'),
      properties: [defs.property('31'), defs.property('30')],
      refresh_interval: 120,
    }, document.querySelector('.torrecontrol .p4 .panel-30M'));

    SensorWidget('map', {
      service: defs.service(),
      offering: defs.offering('30M'),
      features: [defs.feature('02')],
      properties: [],
      permanent_tooltips: true,
      swap_axis: true,
      max_initial_zoom: 12,
    }, document.querySelector('.torrecontrol .x02 .map'));

    SensorWidget('compass', {
      service: defs.service(),
      offering: defs.offering('1M'),
      feature: defs.feature('02'),
      property: defs.property('31'),
      refresh_interval: 120,
    }, document.querySelector('.torrecontrol .x02 .compass'));

    SensorWidget('panel', {
      title: 'Dades minutals',
      service: defs.service(),
      offering: defs.offering('1M'),
      feature: defs.feature('02'),
      properties: [defs.property('31'), defs.property('30')],
      refresh_interval: 15,
    }, document.querySelector('.torrecontrol .x02 .panel-10M'));

    SensorWidget('panel', {
      title: 'Dades 30-minutals',
      service: defs.service(),
      offering: defs.offering('30M'),
      feature: defs.feature('02'),
      properties: [defs.property('31'), defs.property('30')],
      refresh_interval: 120,
    }, document.querySelector('.torrecontrol .x02 .panel-30M'));

    SensorWidget('map', {
      service: defs.service(),
      offering: defs.offering('30M'),
      features: [defs.feature('03')],
      properties: [],
      permanent_tooltips: true,
      swap_axis: true,
      max_initial_zoom: 12,
    }, document.querySelector('.torrecontrol .x03 .map'));

    SensorWidget('compass', {
      service: defs.service(),
      offering: defs.offering('1M'),
      feature: defs.feature('03'),
      property: defs.property('31'),
      refresh_interval: 15,
    }, document.querySelector('.torrecontrol .x03 .compass'));

    SensorWidget('panel', {
      title: 'Dades minutals',
      service: defs.service(),
      offering: defs.offering('1M'),
      feature: defs.feature('03'),
      properties: [defs.property('31'), defs.property('30')],
      refresh_interval: 15,
    }, document.querySelector('.torrecontrol .x03 .panel-10M'));

    SensorWidget('panel', {
      title: 'Dades 30-minutals',
      service: defs.service(),
      offering: defs.offering('30M'),
      feature: defs.feature('03'),
      properties: [defs.property('31'), defs.property('30')],
      refresh_interval: 120,
    }, document.querySelector('.torrecontrol .x03 .panel-30M'));

    break;

  case 'Data Browser':
    {
      const features = ['01', '02', '03', '10', '11', '12', 'P5'];
      const featureNames = ['01 - Dispensari', '02 - Sirena', '03 - Adossat', '10 - ZAL Prat', '11 - Bocana Sud', '12 - BEST', 'P5 - Dàrsena Sud'];
      const offerings = ['1M', '10M', '30M'];
      const offeringNames = ['Minutals', '10 minutals', '30 minutals'];

      const tpl = $('#item-template').html();
      let html = '';
      Object.keys(features).forEach((f) => {
        let res = tpl.replace(/\{\{id}}/g, features[f]);
        res = res.replace(/\{\{title}}/g, featureNames[f]);
        html += res;
      });
      $('.databrowser').html(html);

      $('.panel-collapse').on('show.bs.collapse', function onPanelShow() {
        $(this).parent().removeClass('panel-default').addClass('panel-primary');
        Object.keys(offerings).forEach((o) => {
          const feature = this.id;
          const offering = offerings[o];
          const title = offeringNames[o];
          const element = $(this).find(`.x${offering}`)[0];
          if (!element.children.length) {
            SensorWidget('panel', {
              title,
              service: defs.service(),
              offering: defs.offering(offering),
              feature: defs.feature(feature),
              properties: [],
              refresh_interval: 60,
            }, element);
          }
        });
      });

      $('.panel-collapse').on('hide.bs.collapse', function onPanelHide() {
        $(this).parent().removeClass('panel-primary').addClass('panel-default');
      });

      $('.panel').hover(
        function setPanelPrimary() {
          $(this).removeClass('panel-default').addClass('panel-primary');
        }, function setPanelDefault() {
          if (!$(this).find('.in').length && !$(this).find('.collapsing').length) {
            $(this).removeClass('panel-primary').addClass('panel-default');
          }
        },
      );
    }
    break;

  default:
    break;
}

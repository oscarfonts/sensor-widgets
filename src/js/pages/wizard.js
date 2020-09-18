/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
import '../jQuery-globals';

import moment from 'moment';
import i18n from '../i18n';
import SensorWidget from '../SensorWidget';
import SOS from '../SOS';
import 'daterangepicker';
import 'bootstrap';
import hljs from 'highlightjs';
import 'highlightjs/styles/color-brewer.css';

import '../../assets/css/jquery-ui.css';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/resizable';

const bundle = {
  'Sensor Widget Wizard': {
    es: 'Wizard Sensor Widgets',
    ca: 'Wizard Sensor Widgets',
  },
  'Widget Configuration Form': {
    es: 'Formulario de configuración',
    ca: 'Formulari de configuració',
  },
  'Widget View': {
    es: 'Vista del Widget',
    ca: 'Vista del Widget',
  },
  'Take Away': {
    es: 'Para llevar',
    ca: 'Emporteu-vos-el',
  },
};
i18n.addTranslations(bundle);
i18n.translateDocTree();

let langMenu = `<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">${i18n.langs()[i18n.getLang()]} <span class="caret"></span></a>`;
langMenu += '<ul class="dropdown-menu">';
for (const key in i18n.langs()) {
  if (key != i18n.getLang()) {
    langMenu += `<li><a href="?lang=${key}">${i18n.langs()[key]}</a></li>`;
  }
}
langMenu += '</ul>';
document.getElementById('lang-selector').innerHTML = langMenu;

menu();

$('.panel').draggable({
  handle: '.panel-heading',
});

$('.width-resizable-panel').resizable({
  handles: 'e, w',
});
$('#widget-container').resizable();

const renderTo = document.getElementById('widget-view');

function menu() {
  const widgets = ['compass', 'gauge', 'jqgrid', 'map', 'panel', 'progressbar', 'status', 'table', 'thermometer', 'timechart', 'windrose'];
  const styles = ['default', 'primary', 'success', 'info', 'warning', 'danger'];
  let html = '';
  for (const i in widgets) {
    const widget = widgets[i];
    const style = styles[i % styles.length];
    html += `<a role="button" class="menu-btn btn btn-${style} btn-lg" id="${widget}"><div class="flaticon-${widget}"></div>${capitalize(widget)}&nbsp;&nbsp;»</a>`;
  }
  document.getElementById('main-menu').innerHTML = html;
  $('.menu-btn').click(function () {
    form(this.id);
  });
}

function htmlDecode(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function form(name) {
  $('#widget-form-title').html(i18n.t('{name} Widget Configuration', { name: capitalize(name) }));
  new SensorWidget(name).inspect((inputs, optionalInputs, preferredSizes) => {
    let contents = `<fieldset><legend>${i18n.t('Mandatory inputs')}</legend>`;
    let input; let select; let label; let
      options;

    for (var i in inputs) {
      input = inputs[i];
      select = '';
      label = capitalize(input);
      options = '';

      switch (input) {
        case 'service':
        case 'offering':
        case 'feature':
        case 'property':
          select = `<select class="form-control" id="${input}"></select>`;
          break;
        case 'features':
        case 'properties':
          select = `<select class="form-control" multiple id="${input}"></select>`;
          label += ` ${i18n.t('(multiselect)')}`;
          break;
        case 'refresh_interval':
          var intervals = [5, 10, 30, 60, 120];
          for (const j in intervals) {
            const value = intervals[j];
            options += `<option id="${value}">${value}</option>`;
          }
          select = `<select class="form-control" id="${input}">${options}</select>`;
          break;
        case 'time_start':
          if ($.inArray('time_end', inputs)) {
            label = `${i18n.t('Time Range')} (UTC)`;
            select = '<input class="form-control" type="text" id="time_range" disabled />';
          }
          break;
        case 'time_end':
          break;
        default:
          select = `<input class="form-control" type="text" value="" id="${input}"/>`;
      }

      if (select) {
        contents += `${'<div class="form-group">' + '<label class="col-lg-4 control-label" for="'}${input}">${label}</label><div class="col-lg-8">${select}</div></div>`;
      }
    }

    contents += '</fieldset>';

    contents += `<fieldset><legend>${i18n.t('Optional inputs')}</legend>`;
    for (i in optionalInputs) {
      input = optionalInputs[i];
      select = '';
      label = capitalize(input);
      options = '';
      switch (input) {
        default:
          select = `<textarea class="form-control" value="" id="${input}"></textarea>`;
      }
      contents += `${'<div class="form-group">' + '<label class="col-lg-4 control-label" for="'}${input}">${label}</label><div class="col-lg-8">${select}</div></div>`;
    }
    contents += '</fieldset>';

    contents += `<fieldset><legend>${i18n.t('Widget dimensions')}</legend>`;
    input = 'sizes';
    label = i18n.t('Initial Size');

    for (i in preferredSizes) {
      const size = preferredSizes[i];
      options += `<option id="size" value="${i}">${size.w} x ${size.h} px</option>`;
    }
    const control = `<select class="form-control" id="sizes">${options}</select>`;
    contents += `${'<div class="form-group">' + '<label class="col-lg-4 control-label" for="'}${input}">${label}</label><div class="col-lg-8">${control}</div></div>`;
    contents += '</fieldset>';

    contents += `<input type="button" name="build" class="btn btn-primary pull-right" value="${i18n.t('Create Widget')}&nbsp;&nbsp;»"/>`;

    $('#widget-form').html(contents);

    $('[name="build"]').data({
      name,
      inputs,
      optionalInputs,
      preferredSizes,
    }).click(loadWidget);

    // Setup the SOS parameters: service, offering, feature(s) and property(ies)
    setService([
      'https://demo.geomatico.es/52n-sos/service',
      'http://sensorweb.demo.52north.org/sensorwebtestbed/service',
      'http://sensors.portdebarcelona.cat/sos/json',
      'http://wsncentral.iecolab.es/sos/service',
      'http://84.88.72.222/52n-sos/service',
      'http://localhost:8080/52n-sos/service',
    ]);

    $('#service').change(() => {
      // errorHandler();
      const service = $('#service').find('option:selected').attr('id');
      setOfferings(service);
    });

    $('#offering').change(() => {
      const procedure = $('#offering').find('option:selected').data('procedure');
      setFeatures(procedure);
      setProperties(procedure);
    });

    $('#feature').change(() => {
      setDateRange();
    });

    $('#features').change(() => {
      setDateRange();
    });

    $('#property').change(() => {
      setDateRange();
    });

    $('#properties').change(() => {
      setDateRange();
    });
  });
}

function setService(urls) {
  const service = $('#service');
  if (urls && service) {
    service.append($('<option>').append(i18n.t('Select a Service...')));
    for (const i in urls) {
      const url = urls[i];
      service.append($('<option>').attr('id', url).append(url));
    }
  }
}

function setOfferings(url) {
  clearOptions('#offering', '#property', '#properties', '#feature', '#features');

  if (url) {
    $('#offering').append($('<option>').append(i18n.t('Select an Offering...')));
  } else {
    return;
  }

  SOS.setUrl(url);
  SOS.getCapabilities((offerings) => {
    for (const i in offerings) {
      const offering = offerings[i];

      $('#offering').append($('<option>').attr('id', offering.identifier).data('procedure', offering.procedure[0]).append(offering.name || offering.identifier));
    }
  }, errorHandler);
}

function setProperties(procedure) {
  clearOptions('#property', '#properties');

  if (!procedure) {
    return;
  }

  SOS.describeSensor(procedure, (description) => {
    let properties = description.hasOwnProperty('ProcessModel') ? description.ProcessModel.outputs.OutputList.output : description.System.outputs.OutputList.output;

    properties = properties instanceof Array ? properties : [properties];

    for (const i in properties) {
      const property = properties[i];
      const types = ['Quantity', 'Count', 'Boolean', 'Category', 'Text', 'ObservableProperty'];

      for (const j in types) {
        const type = types[j];
        if (property.hasOwnProperty(type)) {
          property.type = type;
          property.id = property[type].definition;
          property.description = `${property.name} (${type}`;
          if (type == 'Quantity' && property[type].hasOwnProperty('uom')) {
            property.description += ` [${property[type].uom.code}]`;
          }
          property.description += ')';
        }
      }
      $('#property, #properties').append($('<option>').attr('id', property.id).append(property.description));
    }
  }, errorHandler);
}

function setFeatures(procedure) {
  clearOptions('#feature', '#features');

  if (!procedure) {
    return;
  }

  SOS.getFeatureOfInterest(procedure, (features) => {
    for (const i in features) {
      const feature = features[i];
      const id = feature.identifier ? feature.identifier.value : feature;
      const name = feature.name ? feature.name.value : id;

      $('#feature, #features').append($('<option>').attr('id', id).append(name));
    }
  }, errorHandler);
}

function setDateRange() {
  const control = $('#time_range');
  if (control.length) {
    const procedure = $('#offering').find('option:selected').data('procedure');
    const offering = $('#offering').find('option:selected').attr('id');
    const feature = $('#feature').find('option:selected').attr('id');
    const property = $('#property').find('option:selected').attr('id');
    const features = feature || $('#features').find('option:selected').map(function () {
      return this.id;
    }).get();
    const properties = property || $('#properties').find('option:selected').map(function () {
      return this.id;
    }).get();

    SOS.getDataAvailability(procedure, offering, features, properties, (availabilities) => {
      let abs_from = availabilities[0].phenomenonTime[0];
      let abs_to = availabilities[0].phenomenonTime[1];
      let from; let
        to;
      for (let i = 1; i < availabilities.length; i++) {
        from = availabilities[i].phenomenonTime[0];
        to = availabilities[i].phenomenonTime[1];
        if (from < abs_from) {
          abs_from = from;
        }
        if (to > abs_to) {
          abs_to = to;
        }
      }

      moment.locale(i18n.getLang());

      const ranges = [];
      ranges[i18n.t('Today')] = [moment().startOf('day'), moment()];
      ranges[i18n.t('Last hour')] = [moment().subtract(1, 'hour'), moment()];
      for (const n in [3, 6, 12, 24]) {
        ranges[i18n.t('Last {n} hours', { n })] = [moment().subtract(n, 'hours'), moment()];
      }

      const options = {
        timePicker: true,
        format: i18n.t('MMM D, YYYY H:mm'),
        timePickerIncrement: 5,
        timePicker12Hour: false,
        timePickerSeconds: false,
        timeZone: '+00:00',
        minDate: moment.utc(abs_from),
        maxDate: moment.utc(abs_to),
        dateLimit: {
          days: 7,
        },
        ranges,
        locale: {
          applyLabel: i18n.t('Apply'),
          cancelLabel: i18n.t('Cancel'),
          fromLabel: i18n.t('From'),
          toLabel: i18n.t('To'),
          weekLabel: i18n.t('W'),
          customRangeLabel: i18n.t('Custom Range'),
        },
      };
      let picker;
      if (control.prop('disabled')) {
        control.daterangepicker(options);
        picker = control.data('daterangepicker');
        control.prop('disabled', false);
        picker.setStartDate(moment.max(moment.utc(abs_from), moment.utc(abs_to).subtract(1, 'day')));
        picker.setEndDate(moment.utc(abs_to));
      } else {
        picker = control.data('daterangepicker');
        picker.setOptions(options);
        const timeZoneOffset = new Date().getTimezoneOffset();
        from = picker.startDate.subtract(timeZoneOffset, 'minutes');
        to = picker.endDate.subtract(timeZoneOffset, 'minutes');
        picker.setStartDate(moment.max(moment.utc(abs_from), from));
        picker.setEndDate(moment.min(moment.utc(abs_to), to));
      }
    }, errorHandler);
  }
}

function clearOptions() {
  for (let i = 0; i < arguments.length; i++) {
    if ($(arguments[i])) {
      $(arguments[i]).find('option').remove();
    }
  }
  $('#time_start').val('');
  $('#time_end').val('');
}

function loadWidget() {
  const params = $('[name="build"]').data();
  const config = {};

  const getId = function () {
    return this.id;
  };

  let name; let el; let
    value;

  for (var i in params.inputs) {
    name = params.inputs[i];
    el = $(`#${name}`);
    switch (name) {
      case 'service':
      case 'offering':
      case 'feature':
      case 'property':
        value = el.find('option:selected').attr('id');
        break;
      case 'features':
      case 'properties':
        value = el.find('option:selected').map(getId).get();
        break;
      case 'time_start':
        value = $('#time_range').data('daterangepicker').startDate.subtract(1, 'second').utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]');
        break;
      case 'time_end':
        value = $('#time_range').data('daterangepicker').endDate.add(1, 'second').utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]');
        break;
      default:
        value = el.val();
    }
    if (value) {
      config[name] = value;
    }
  }

  for (i in params.optionalInputs) {
    name = params.optionalInputs[i];
    el = $(`#${name}`);
    value = el.val();
    if (value) {
      config[name] = value;
    }
  }

  const preferredSize = params.preferredSizes[$('#sizes').val()];

  // set preferred size to the dialog to start with
  const widgetContainer = $('#widget-container');
  widgetContainer.draggable();

  widgetContainer.resizable('destroy');
  $('#widget-container').width(preferredSize.w).height(preferredSize.h + 39);

  const instance = new SensorWidget(params.name, config, renderTo);

  widgetContainer.resizable({
    helper: 'ui-resizable-helper',
    resize(event, ui) {
      // refresh embed code snippet (we use the iframe tag with dialog's current width and height)
      document.getElementById('embed').innerHTML = htmlDecode(instance.iframe(ui.size.width, ui.size.height - 39));
    },
  });

  // refresh code snippets for the first time
  document.getElementById('code').innerHTML = instance.javascript();
  hljs.highlightBlock(document.getElementById('code'));
  document.getElementById('embed').innerHTML = htmlDecode(instance.iframe(preferredSize.w, preferredSize.h));
  hljs.highlightBlock(document.getElementById('embed'));
  document.getElementById('link').innerHTML = `<a href="${instance.url()}" target="_blank">${instance.url()}</a>`;
}

function errorHandler(message, url, request) {
  let text = '';
  if (url) {
    text = `[${url}] `;
  }
  if (request && request.request) {
    text += `${request.request}: `;
  }
  if (message) {
    text += message;
  }
  renderTo.innerHTML = `<div class="text-danger">${text}</div>`;
}

function capitalize(string) {
  return i18n.t(string.toLowerCase().replace(/_/g, ' ').replace(/(?:^|\s)\S/g, (a) => a.toUpperCase()));
}

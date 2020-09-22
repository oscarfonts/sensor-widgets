/* eslint-disable no-param-reassign */
import i18n from './i18n';
import './SensorWidgets.css';

// eslint-disable-next-line camelcase,no-undef
__webpack_public_path__ = document.currentScript.src.replace(/[^/]*$/, '');

const instances = {};
// eslint-disable-next-line no-plusplus
const uid = ((i) => () => `SensorWidgetTarget-${++i}`)(0);

export default function SensorWidget(name, config, renderTo) {
  const target = renderTo || document.body;

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
    target.innerHTML = `<div class="text-danger">${text}</div>`;
  }

  function checkConfig(widgetName, widgetInputs, widgetConfig) {
    const missing = [];

    Object.values(widgetInputs).forEach((input) => {
      if (!Object.prototype.hasOwnProperty.call(widgetConfig, input)) {
        missing.push(input);
      }
    });
    if (missing.length) {
      errorHandler(i18n.t("The '{name}' widget is missing some mandatory parameters: ", { name: widgetName }) + missing.join(', '));
    }
    return !missing.length;
  }

  if (name && config) {
    if (!target.id) target.id = uid();

    if (!config.service) {
      config.service = '/52n-sos/sos/json';
    }

    import(/* webpackChunkName: "widget-[request]" */ `./widget/${name}.js`)
      .then(({ default: widget }) => {
        target.innerHTML = '';
        if (Object.prototype.hasOwnProperty.call(instances, target.id) && instances[target.id] && Object.prototype.hasOwnProperty.call(instances[target.id], 'destroy')) {
          console.debug(`Destroying previous widget on ElementId=${target.id}`);
          instances[target.id].destroy();
          delete instances[target.id];
        }
        if (checkConfig(name, widget.inputs, config)) {
          console.debug(`Creating new ${name} widget on ElementId=${target.id}`);
          instances[target.id] = widget.init(config, target, errorHandler);
        }
      }).catch((cause) => {
        console.error(cause);
        errorHandler(i18n.t("Widget '{name}' cannot be found, or there was an error instantiating it", { name }));
      });
  } else if (!name) {
    errorHandler(i18n.t('No widget name specified'));
  }
  return {
    name,
    config,
    renderTo: target,
    inspect(cb) {
      import(/* webpackChunkName: "widget-[request]" */ `./widget/${name}.js`)
        .then(({ default: widget }) => {
          cb.call(this, widget.inputs, widget.optional_inputs, widget.preferredSizes);
        });
    },
    url() {
      function relPathToAbs(pathname) {
        const output = [];
        pathname.replace(/^(\.\.?(\/|$))+/, '')
          .replace(/\/(\.(\/|$))+/g, '/')
          .replace(/\/\.\.$/, '/../')
          .replace(/\/?[^/]*/g, (p) => {
            if (p === '/..') {
              output.pop();
            } else {
              output.push(p);
            }
          });
        return output.join('').replace(/^\//, pathname.charAt(0) === '/' ? '/' : '');
      }
      let url = `${relPathToAbs('../widget/')}?`;
      url += `name=${encodeURIComponent(name)}&`;
      url += Object.keys(config).map((key) => {
        let val = config[key];
        if (typeof config[key] === 'object') {
          val = JSON.stringify(config[key]);
        }
        return `${key}=${encodeURIComponent(val)}`;
      }).join('&');
      url += `&lang=${i18n.getLang()}`;
      return url;
    },
    iframe(w, h) {
      w = w || '100%';
      h = h || '100%';
      return `<iframe src="${this.url()}" width="${w}" height="${h}" frameBorder="0"></iframe>`;
    },
    javascript() {
      return `SensorWidget('${name}', ${JSON.stringify(config, null, 3)}, document.getElementById('${name}-container'));`;
    },
  };
}

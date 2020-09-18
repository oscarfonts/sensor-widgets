/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
import XML from './XML';

export default {
  _url: null,

  setUrl(url) {
    this._url = url;
  },

  getCapabilities(callback, errorHandler) {
    const request = {
      request: 'GetCapabilities',
      sections: ['Contents'],
    };

    this._send(request, (response) => {
      callback(response.contents);
    }, errorHandler);
  },

  describeSensor(procedure, callback, errorHandler) {
    const request = {
      request: 'DescribeSensor',
      procedure,
      procedureDescriptionFormat: 'http://www.opengis.net/sensorML/1.0.1',
    };

    this._send(request, (response) => {
      // Convert the SensorML description to a JSON object
      const description = response.procedureDescription.hasOwnProperty('description')
        ? response.procedureDescription.description : response.procedureDescription;
      const json = XML.read(description, true);
      callback(json.SensorML.member);
    }, errorHandler);
  },

  getFeatureOfInterest(procedure, callback, errorHandler) {
    const request = {
      request: 'GetFeatureOfInterest',
      procedure,
    };

    this._send(request, (response) => {
      callback(response.featureOfInterest);
    }, errorHandler);
  },

  getDataAvailability(procedure, offering, features, properties, callback, errorHandler) {
    const request = {
      request: 'GetDataAvailability',
    };
    if (procedure) {
      request.procedure = procedure;
    }
    if (offering) {
      request.offering = offering;
    }
    if (features && features.length) {
      request.featureOfInterest = features;
    }
    if (properties && properties.length) {
      request.observedProperty = properties;
    }

    this._send(request, (response) => {
      callback(response.dataAvailability);
    }, errorHandler);
  },

  getObservation(offering, features, properties, time, callback, errorHandler) {
    const request = {
      request: 'GetObservation',
    };

    if (offering) {
      request.offering = offering;
    }

    if (features && features.length) {
      request.featureOfInterest = features;
    }

    if (properties && properties.length) {
      request.observedProperty = properties;
    }

    if (time) {
      let operation;
      if (time.length && time.length == 2) {
        // Time Range
        operation = 'during';
      } else {
        // Time Instant
        operation = 'equals';
      }
      const filter = {};
      filter[operation] = {
        ref: 'om:resultTime',
        value: time,
      };
      request.temporalFilter = [filter];
    }

    this._send(request, (response) => {
      callback(response.observations);
    }, errorHandler);
  },

  _send(request, onSuccess, onError) {
    request.service = 'SOS';
    request.version = '2.0.0';

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        let response = xhr.responseText;
        try {
          response = JSON.parse(response);
        } catch (e) {
          // OK, not JSON
        }
        if (xhr.status == 200) {
          onSuccess.call(this, response);
        } else {
          const e = {
            status: xhr.statusText,
            url: this._url,
            request,
            response,
          };
          console.log(e);
          if (onError) {
            onError.call(this, e.status, e.url, e.request, e.response);
          }
        }
      }
    }.bind(this);

    xhr.open('POST', this._url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(JSON.stringify(request));
  },
};

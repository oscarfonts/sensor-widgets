import SensorWidget from './SensorWidget';
import sos from './SOS';

// 'Leak' SensorWidget to global scope.
window.SensorWidget = function (...args) {
  window.onload = function () {
    SensorWidget.apply(this, args);
  };
};

// Expose SOS as well.
window.getSOS = function (callback) {
  callback(sos);
};

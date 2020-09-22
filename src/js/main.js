import SensorWidget from './SensorWidget';
import sos from './SOS';

// 'Leak' SensorWidget to global scope.
window.SensorWidget = (...args) => {
  window.onload = () => SensorWidget.apply(this, args);
};

// Expose SOS as well.
window.getSOS = (callback) => {
  callback(sos);
};

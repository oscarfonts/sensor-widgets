import SensorWidget from './SensorWidget.js';
import sos from './SOS.js';

// 'Leak' SensorWidget to global scope.
window.SensorWidget = function() {
    var args = arguments;
    window.onload = function() {
        SensorWidget.apply(this, args);
    }
};

// Expose SOS as well.
window.getSOS = function(callback) {
    callback(sos);
};

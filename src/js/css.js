// Modified from: https://github.com/tyt2y3/requirejs-css-plugin/blob/master/css.js
// Doesn't inline CSSs on optimization; just ignores optimizer pass.
define({
	load: function (name, require, load) {
		function inject(filename)
		{
			var head = document.getElementsByTagName('head')[0];
			var link = document.createElement('link');
			link.href = filename;
			link.rel = 'stylesheet';
			link.type = 'text/css';
            link.onload = function () {
                load();
            };
			head.appendChild(link);
		}
        if (typeof document === 'undefined') { // Optimizer run
		    load();
        } else { // Web run
            inject(require.toUrl(name));
        }
	}
});

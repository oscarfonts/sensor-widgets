define("widget/progressbar",["sos-data-access","css!widget/progressbar.css","locale-date","widget-common"],function(e,r,a,s){"use strict";var i=['<div class="progressbar widget">','<h1 class="feature"></h1>','<h3 class="property"></h3>','<div class="progress">','<div class="min">0</div>','<div class="max">100</div>','<div class="background-bar">','<span class="green bar">','<div class="value"></div>',"</span>","</div>","</div>",'<h3 class="date"></h3>','<div><span class="footnote"></span></div>',"</div>"].join("");return{inputs:s.inputs.concat(["feature","property","refresh_interval","min_value","max_value"]),optional_inputs:s.optional_inputs,preferredSizes:[{w:500,h:220}],init:function(r,n){function t(e){var s=e[0];n.querySelector(".date").innerHTML=a.display(s.time),n.querySelector(".value").innerHTML=s.value+" "+s.uom,n.querySelector(".feature").innerHTML=s.feature,n.querySelector(".property").innerHTML=s.property;var i=n.querySelector(".background-bar").offsetWidth,t=(s.value-r.min_value)/(r.max_value-r.min_value),l=i*t;n.querySelector(".bar").style.width=l+"px"}n.innerHTML=i,n.querySelector(".min").innerHTML=r.min_value,n.querySelector(".max").innerHTML=r.max_value,s.init(r,n);var l=e(r,t),o=setInterval(l.read,1e3*r.refresh_interval);return l.read(),{destroy:function(){clearInterval(o)}}}}});
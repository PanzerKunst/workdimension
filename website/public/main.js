var P = (function(prototype, ownProperty, undefined) {
  return function P(_superclass /* = Object */, definition) {
    // handle the case where no superclass is given
    if (definition === undefined) {
      definition = _superclass;
      _superclass = Object;
    }

    // C is the class to be returned.
    //
    // When called, creates and initializes an instance of C, unless
    // `this` is already an instance of C, then just initializes `this`;
    // either way, returns the instance of C that was initialized.
    //
    //  TODO: the Chrome inspector shows all created objects as `C`
    //        rather than `Object`.  Setting the .name property seems to
    //        have no effect.  Is there a way to override this behavior?
    function C() {
      var self = this instanceof C ? this : new Bare;
      self.init.apply(self, arguments);
      return self;
    }

    // C.Bare is a class with a noop constructor.  Its prototype will be
    // the same as C, so that instances of C.Bare are instances of C.
    // `new MyClass.Bare` then creates new instances of C without
    // calling .init().
    function Bare() {}
    C.Bare = Bare;

    // Extend the prototype chain: first use Bare to create an
    // uninitialized instance of the superclass, then set up Bare
    // to create instances of this class.
    var _super = Bare[prototype] = _superclass[prototype];
    var proto = Bare[prototype] = C[prototype] = C.p = new Bare;

    // pre-declaring the iteration variable for the loop below to save
    // a `var` keyword after minification
    var key;

    // set the constructor property on the prototype, for convenience
    proto.constructor = C;

    C.extend = function(def) { return P(C, def); }

    return (C.open = function(def) {
      if (typeof def === 'function') {
        // call the defining function with all the arguments you need
        // extensions captures the return value.
        def = def.call(C, proto, _super, C, _superclass);
      }

      // ...and extend it
      if (typeof def === 'object') {
        for (key in def) {
          if (ownProperty.call(def, key)) {
            proto[key] = def[key];
          }
        }
      }

      // if no init, assume we're inheriting from a non-Pjs class, so
      // default to using the superclass constructor.
      if (!('init' in proto)) proto.init = _superclass;

      return C;
    })(definition);
  }

  // as a minifier optimization, we've closured in a few helper functions
  // and the string 'prototype' (C[p] is much shorter than C.prototype)
})('prototype', ({}).hasOwnProperty);
;/****
 * Grapnel.js
 * https://github.com/EngineeringMode/Grapnel.js
 *
 * @author Greg Sabia Tucker
 * @link http://artificer.io
 * @version 0.5.1
 *
 * Released under MIT License. See LICENSE.txt or http://opensource.org/licenses/MIT
*/

!function(a){function b(b){"use strict";var c=this;return this.events={},this.params=[],this.state=null,this.options=b||{},this.options.usePushState=!!(c.options.pushState&&a.history&&a.history.pushState),this.version="0.5.1",this.fragment=this.anchor=this.hash={get:function(){var b;return b=c.options.usePushState?a.location.pathname.replace(c.options.root,""):a.location.hash?a.location.hash.split("#")[1]:""},set:function(b){return c.options.usePushState?(b=c.options.root?c.options.root+b:b,a.history.pushState({},null,b)):a.location.hash=b,c},clear:function(){return c.options.usePushState?a.history.pushState({},null,c.options.root||"/"):a.location.hash="",c}},this._forEach=function(a,b){return"function"==typeof Array.prototype.forEach?Array.prototype.forEach.call(a,b):function(a,b){for(var c=0,d=this.length;d>c;++c)a.call(b,this[c],c,this)}.call(a,b)},this.trigger=function(a){var b=Array.prototype.slice.call(arguments,1);return this.events[a]&&this._forEach(this.events[a],function(a){a.apply(c,b)}),this},"function"==typeof a.onhashchange&&this.on("hashchange",a.onhashchange),"function"==typeof a.onpopstate&&this.on("navigate",a.onpopstate),a.onhashchange=function(){c.trigger("hashchange")},a.onpopstate=function(){c.trigger("navigate")},this}b.regexRoute=function(a,b,c,d){return a instanceof RegExp?a:(a instanceof Array&&(a="("+a.join("|")+")"),a=a.concat(d?"":"/?").replace(/\/\(/g,"(?:/").replace(/\+/g,"__plus__").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g,function(a,c,d,e,f,g){return b.push({name:e,optional:!!g}),c=c||"",""+(g?"":c)+"(?:"+(g?c:"")+(d||"")+(f||d&&"([^/.]+?)"||"([^/]+?)")+")"+(g||"")}).replace(/([\/.])/g,"\\$1").replace(/__plus__/g,"(.+)").replace(/\*/g,"(.*)"),new RegExp("^"+a+"$",c?"":"i"))},b.prototype.get=b.prototype.add=function(a,c){var d=this,e=[],f=b.regexRoute(a,e),g=function(){var b=d.fragment.get().match(f);if(b){var g={params:{},keys:e,matches:b.slice(1)};d._forEach(g.matches,function(a,b){var c=e[b]&&e[b].name?e[b].name:b;g.params[c]=a?decodeURIComponent(a):void 0});var h={route:a,value:d.fragment.get(),params:g.params,regex:b,propagateEvent:!0,previousState:d.state,preventDefault:function(){this.propagateEvent=!1},callback:function(){c.call(d,g,h)}};if(d.trigger("match",h),!h.propagateEvent)return d;d.state=h,h.callback()}return d};return g().on(d.options.usePushState?"navigate":"hashchange",g)},b.prototype.on=b.prototype.bind=function(a,b){var c=this,d=a.split(" ");return this._forEach(d,function(a){c.events[a]?c.events[a].push(b):c.events[a]=[b]}),this},b.Router=b.prototype.router=b,b.prototype.context=function(a){var b=this;return function(c,d){var e="/"!==a.slice(-1)?a+"/":a,f=e+c;return b.get.call(b,f,d)}},b.prototype.navigate=function(a){return this.fragment.set(a),this.trigger("navigate")},b.listen=function(){var a,c;return arguments[0]&&arguments[1]?(a=arguments[0],c=arguments[1]):c=arguments[0],function(){for(var a in c)this.get.call(this,a,c[a]);return this}.call(new b(a||{}))},"function"==typeof a.define?a.define(function(){return b}):"object"==typeof exports?exports.Grapnel=b:a.Grapnel=b}.call({},window);;/*global window:true */

window.Breakpoints = (function (window, document) {
	'use strict';

	var B = {},
	resizingTimeout = 200,
	breakpoints = [],
	hasFullComputedStyleSupport = null,

	TEST_FULL_GETCOMPUTEDSTYLE_SUPPORT = 'js-breakpoints-getComputedStyleTest',
	TEST_FALLBACK_PROPERTY = 'position',
	TEST_FALLBACK_VALUE = 'absolute',

	// thanks John Resig
	addEvent = function (obj, type, fn) {
	  if (obj.attachEvent) {
	    obj['e'+type+fn] = fn;
	    obj[type+fn] = function () {obj['e'+type+fn]( window.event );};
	    obj.attachEvent('on'+type, obj[type+fn]);
	  } else {
	    obj.addEventListener(type, fn, false);
	  }
	},

	debounce = function (func, wait, immediate) {
		var timeout, result;
		return function() {

			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) result = func.apply(context, args);
			};

			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) result = func.apply(context, args);
			return result;
		};
	},

	injectElementWithClassName = function (parent, className, callback) {
		var div = document.createElement('div');
		div.className = 'js-breakpoints-' + className;
		parent.appendChild(div);
		callback(div);
		div.parentNode.removeChild(div);
	},

	check = function (breakpoint) {
		var match = B.isMatched(breakpoint);

		if (match && !breakpoint.isMatched) {
			breakpoint.matched.call(breakpoint.context);
			breakpoint.isMatched = true;
		} else if (!match && breakpoint.isMatched) {
			breakpoint.exit.call(breakpoint.context);
			breakpoint.isMatched = false;
		}
		return breakpoint;
	},

	onWindowResize = function () {
		for( var i = 0; i < breakpoints.length; i++ ) {
			check(breakpoints[i]);
		}
	},

	getStyle = function (el, pseudo, property) {
		if (window.getComputedStyle) {
			return window.getComputedStyle(el, pseudo).getPropertyValue(property);
		}
		else if (el.currentStyle && pseudo.length === 0) {
			return el.currentStyle[property];
		}
		return '';
	},

	/*
	 * If not already checked:
	 * 1. check if we have getComputedStyle and check if we can read pseudo elements
	 */
	checkComputedStyleSupport = function () {
		if (hasFullComputedStyleSupport !== null) {
			return;
		}

		hasFullComputedStyleSupport = false;
		
		if (window.getComputedStyle) {
			var content = window.getComputedStyle(document.documentElement, ':after').getPropertyValue('content');
			hasFullComputedStyleSupport = content.replace(/\"/g, "") === TEST_FULL_GETCOMPUTEDSTYLE_SUPPORT;
		}
	},

	init = function () {
		var debounceResize = debounce( onWindowResize, resizingTimeout);
		addEvent(window, 'resize', debounceResize);
		addEvent(window, 'orientationchange', debounceResize);
		return B;
	};

	B.isMatched = function(breakpoint) {
		var el = breakpoint.el || document.body,
		    matched = false,
		    value;

		if (hasFullComputedStyleSupport) {
			value = getStyle(el, ':after', 'content');
			matched = value.replace(/\"/g, "") === breakpoint.name;
		}
		else {
			injectElementWithClassName(el, breakpoint.name, function (el) {
				value = getStyle(el, '', TEST_FALLBACK_PROPERTY);
				matched = value === TEST_FALLBACK_VALUE;
			});
		}

		return matched;
	};

	B.on = function(breakpoint) {
		checkComputedStyleSupport();
		breakpoints.push(breakpoint);
		breakpoint.isMatched = false;
		breakpoint.matched = breakpoint.matched || function() {};
		breakpoint.exit = breakpoint.exit || function() {};
		breakpoint.context = breakpoint.context || breakpoint;
		return check(breakpoint);
	};

	B.off = function (breakpoint) {
		var i = breakpoints.indexOf(breakpoint);
		if (i > -1) {
			breakpoints.splice(i, 1);
		}
	};

	return init();

})(window, document);
;/*! =======================================================
                      VERSION  4.4.2              
========================================================= */
/*! =========================================================
 * bootstrap-slider.js
 *
 * Maintainers:
 *		Kyle Kemp
 *			- Twitter: @seiyria
 *			- Github:  seiyria
 *		Rohit Kalkur
 *			- Twitter: @Rovolutionary
 *			- Github:  rovolution
 *
 * =========================================================
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
!function(a,b){if("function"==typeof define&&define.amd)define(["jquery"],b);else if("object"==typeof module&&module.exports){var c;try{c=require("jquery")}catch(d){c=null}module.exports=b(c)}else a.Slider=b(a.jQuery)}(this,function(a){var b;return function(a){"use strict";function b(){}function c(a){function c(b){b.prototype.option||(b.prototype.option=function(b){a.isPlainObject(b)&&(this.options=a.extend(!0,this.options,b))})}function e(b,c){a.fn[b]=function(e){if("string"==typeof e){for(var g=d.call(arguments,1),h=0,i=this.length;i>h;h++){var j=this[h],k=a.data(j,b);if(k)if(a.isFunction(k[e])&&"_"!==e.charAt(0)){var l=k[e].apply(k,g);if(void 0!==l&&l!==k)return l}else f("no such method '"+e+"' for "+b+" instance");else f("cannot call methods on "+b+" prior to initialization; attempted to call '"+e+"'")}return this}var m=this.map(function(){var d=a.data(this,b);return d?(d.option(e),d._init()):(d=new c(this,e),a.data(this,b,d)),a(this)});return!m||m.length>1?m:m[0]}}if(a){var f="undefined"==typeof console?b:function(a){console.error(a)};return a.bridget=function(a,b){c(b),e(a,b)},a.bridget}}var d=Array.prototype.slice;c(a)}(a),function(a){function c(b,c){function d(a,b){var c="data-slider-"+b,d=a.getAttribute(c);try{return JSON.parse(d)}catch(e){return d}}"string"==typeof b?this.element=document.querySelector(b):b instanceof HTMLElement&&(this.element=b),c=c?c:{};for(var e=Object.keys(this.defaultOptions),f=0;f<e.length;f++){var g=e[f],h=c[g];h="undefined"!=typeof h?h:d(this.element,g),h=null!==h?h:this.defaultOptions[g],this.options||(this.options={}),this.options[g]=h}var i,j,k,l,m,n=this.element.style.width,o=!1,p=this.element.parentNode;if(this.sliderElem)o=!0;else{this.sliderElem=document.createElement("div"),this.sliderElem.className="slider";var q=document.createElement("div");if(q.className="slider-track",j=document.createElement("div"),j.className="slider-track-left",i=document.createElement("div"),i.className="slider-selection",k=document.createElement("div"),k.className="slider-track-right",l=document.createElement("div"),l.className="slider-handle min-slider-handle",m=document.createElement("div"),m.className="slider-handle max-slider-handle",q.appendChild(j),q.appendChild(i),q.appendChild(k),this.ticks=[],this.options.ticks instanceof Array&&this.options.ticks.length>0)for(f=0;f<this.options.ticks.length;f++){var r=document.createElement("div");r.className="slider-tick",this.ticks.push(r),q.appendChild(r)}if(q.appendChild(l),q.appendChild(m),this.tickLabels=[],this.options.ticks_labels instanceof Array&&this.options.ticks_labels.length>0)for(this.tickLabelContainer=document.createElement("div"),this.tickLabelContainer.className="slider-tick-label-container",f=0;f<this.options.ticks_labels.length;f++){var s=document.createElement("div");s.className="slider-tick-label",s.innerHTML=this.options.ticks_labels[f],this.tickLabels.push(s),this.tickLabelContainer.appendChild(s)}var t=function(a){var b=document.createElement("div");b.className="tooltip-arrow";var c=document.createElement("div");c.className="tooltip-inner",a.appendChild(b),a.appendChild(c)},u=document.createElement("div");u.className="tooltip tooltip-main",t(u);var v=document.createElement("div");v.className="tooltip tooltip-min",t(v);var w=document.createElement("div");w.className="tooltip tooltip-max",t(w),this.sliderElem.appendChild(q),this.sliderElem.appendChild(u),this.sliderElem.appendChild(v),this.sliderElem.appendChild(w),this.tickLabelContainer&&this.sliderElem.appendChild(this.tickLabelContainer),p.insertBefore(this.sliderElem,this.element),this.element.style.display="none"}if(a&&(this.$element=a(this.element),this.$sliderElem=a(this.sliderElem)),this.eventToCallbackMap={},this.sliderElem.id=this.options.id,this.touchCapable="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,this.tooltip=this.sliderElem.querySelector(".tooltip-main"),this.tooltipInner=this.tooltip.querySelector(".tooltip-inner"),this.tooltip_min=this.sliderElem.querySelector(".tooltip-min"),this.tooltipInner_min=this.tooltip_min.querySelector(".tooltip-inner"),this.tooltip_max=this.sliderElem.querySelector(".tooltip-max"),this.tooltipInner_max=this.tooltip_max.querySelector(".tooltip-inner"),o===!0&&(this._removeClass(this.sliderElem,"slider-horizontal"),this._removeClass(this.sliderElem,"slider-vertical"),this._removeClass(this.tooltip,"hide"),this._removeClass(this.tooltip_min,"hide"),this._removeClass(this.tooltip_max,"hide"),["left","top","width","height"].forEach(function(a){this._removeProperty(this.trackLeft,a),this._removeProperty(this.trackSelection,a),this._removeProperty(this.trackRight,a)},this),[this.handle1,this.handle2].forEach(function(a){this._removeProperty(a,"left"),this._removeProperty(a,"top")},this),[this.tooltip,this.tooltip_min,this.tooltip_max].forEach(function(a){this._removeProperty(a,"left"),this._removeProperty(a,"top"),this._removeProperty(a,"margin-left"),this._removeProperty(a,"margin-top"),this._removeClass(a,"right"),this._removeClass(a,"top")},this)),"vertical"===this.options.orientation?(this._addClass(this.sliderElem,"slider-vertical"),this.stylePos="top",this.mousePos="pageY",this.sizePos="offsetHeight",this._addClass(this.tooltip,"right"),this.tooltip.style.left="100%",this._addClass(this.tooltip_min,"right"),this.tooltip_min.style.left="100%",this._addClass(this.tooltip_max,"right"),this.tooltip_max.style.left="100%"):(this._addClass(this.sliderElem,"slider-horizontal"),this.sliderElem.style.width=n,this.options.orientation="horizontal",this.stylePos="left",this.mousePos="pageX",this.sizePos="offsetWidth",this._addClass(this.tooltip,"top"),this.tooltip.style.top=-this.tooltip.outerHeight-14+"px",this._addClass(this.tooltip_min,"top"),this.tooltip_min.style.top=-this.tooltip_min.outerHeight-14+"px",this._addClass(this.tooltip_max,"top"),this.tooltip_max.style.top=-this.tooltip_max.outerHeight-14+"px"),this.options.ticks instanceof Array&&this.options.ticks.length>0&&(this.options.max=Math.max.apply(Math,this.options.ticks),this.options.min=Math.min.apply(Math,this.options.ticks)),this.options.value instanceof Array?this.options.range=!0:this.options.range&&(this.options.value=[this.options.value,this.options.max]),this.trackLeft=j||this.trackLeft,this.trackSelection=i||this.trackSelection,this.trackRight=k||this.trackRight,"none"===this.options.selection&&(this._addClass(this.trackLeft,"hide"),this._addClass(this.trackSelection,"hide"),this._addClass(this.trackRight,"hide")),this.handle1=l||this.handle1,this.handle2=m||this.handle2,o===!0)for(this._removeClass(this.handle1,"round triangle"),this._removeClass(this.handle2,"round triangle hide"),f=0;f<this.ticks.length;f++)this._removeClass(this.ticks[f],"round triangle hide");var x=["round","triangle","custom"],y=-1!==x.indexOf(this.options.handle);if(y)for(this._addClass(this.handle1,this.options.handle),this._addClass(this.handle2,this.options.handle),f=0;f<this.ticks.length;f++)this._addClass(this.ticks[f],this.options.handle);this.offset=this._offset(this.sliderElem),this.size=this.sliderElem[this.sizePos],this.setValue(this.options.value),this.handle1Keydown=this._keydown.bind(this,0),this.handle1.addEventListener("keydown",this.handle1Keydown,!1),this.handle2Keydown=this._keydown.bind(this,1),this.handle2.addEventListener("keydown",this.handle2Keydown,!1),this.touchCapable?(this.mousedown=this._mousedown.bind(this),this.sliderElem.addEventListener("touchstart",this.mousedown,!1)):(this.mousedown=this._mousedown.bind(this),this.sliderElem.addEventListener("mousedown",this.mousedown,!1)),"hide"===this.options.tooltip?(this._addClass(this.tooltip,"hide"),this._addClass(this.tooltip_min,"hide"),this._addClass(this.tooltip_max,"hide")):"always"===this.options.tooltip?(this._showTooltip(),this._alwaysShowTooltip=!0):(this.showTooltip=this._showTooltip.bind(this),this.hideTooltip=this._hideTooltip.bind(this),this.sliderElem.addEventListener("mouseenter",this.showTooltip,!1),this.sliderElem.addEventListener("mouseleave",this.hideTooltip,!1),this.handle1.addEventListener("focus",this.showTooltip,!1),this.handle1.addEventListener("blur",this.hideTooltip,!1),this.handle2.addEventListener("focus",this.showTooltip,!1),this.handle2.addEventListener("blur",this.hideTooltip,!1)),this.options.enabled?this.enable():this.disable()}var d={formatInvalidInputErrorMsg:function(a){return"Invalid input value '"+a+"' passed in"},callingContextNotSliderInstance:"Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method"};if(b=function(a,b){return c.call(this,a,b),this},b.prototype={_init:function(){},constructor:b,defaultOptions:{id:"",min:0,max:10,step:1,precision:0,orientation:"horizontal",value:5,range:!1,selection:"before",tooltip:"show",tooltip_split:!1,handle:"round",reversed:!1,enabled:!0,formatter:function(a){return a instanceof Array?a[0]+" : "+a[1]:a},natural_arrow_keys:!1,ticks:[],ticks_labels:[],ticks_snap_bounds:0},over:!1,inDrag:!1,getValue:function(){return this.options.range?this.options.value:this.options.value[0]},setValue:function(a,b){a||(a=0);var c=this.getValue();this.options.value=this._validateInputValue(a);var d=this._applyPrecision.bind(this);this.options.range?(this.options.value[0]=d(this.options.value[0]),this.options.value[1]=d(this.options.value[1]),this.options.value[0]=Math.max(this.options.min,Math.min(this.options.max,this.options.value[0])),this.options.value[1]=Math.max(this.options.min,Math.min(this.options.max,this.options.value[1]))):(this.options.value=d(this.options.value),this.options.value=[Math.max(this.options.min,Math.min(this.options.max,this.options.value))],this._addClass(this.handle2,"hide"),this.options.value[1]="after"===this.options.selection?this.options.max:this.options.min),this.diff=this.options.max-this.options.min,this.percentage=this.diff>0?[100*(this.options.value[0]-this.options.min)/this.diff,100*(this.options.value[1]-this.options.min)/this.diff,100*this.options.step/this.diff]:[0,0,100],this._layout();var e=this.options.range?this.options.value:this.options.value[0];return b===!0&&this._trigger("slide",e),c!==e&&this._trigger("change",{oldValue:c,newValue:e}),this._setDataVal(e),this},destroy:function(){this._removeSliderEventHandlers(),this.sliderElem.parentNode.removeChild(this.sliderElem),this.element.style.display="",this._cleanUpEventCallbacksMap(),this.element.removeAttribute("data"),a&&(this._unbindJQueryEventHandlers(),this.$element.removeData("slider"))},disable:function(){return this.options.enabled=!1,this.handle1.removeAttribute("tabindex"),this.handle2.removeAttribute("tabindex"),this._addClass(this.sliderElem,"slider-disabled"),this._trigger("slideDisabled"),this},enable:function(){return this.options.enabled=!0,this.handle1.setAttribute("tabindex",0),this.handle2.setAttribute("tabindex",0),this._removeClass(this.sliderElem,"slider-disabled"),this._trigger("slideEnabled"),this},toggle:function(){return this.options.enabled?this.disable():this.enable(),this},isEnabled:function(){return this.options.enabled},on:function(b,c){return a?(this.$element.on(b,c),this.$sliderElem.on(b,c)):this._bindNonQueryEventHandler(b,c),this},getAttribute:function(a){return a?this.options[a]:this.options},setAttribute:function(a,b){return this.options[a]=b,this},refresh:function(){return this._removeSliderEventHandlers(),c.call(this,this.element,this.options),a&&a.data(this.element,"slider",this),this},relayout:function(){return this._layout(),this},_removeSliderEventHandlers:function(){this.handle1.removeEventListener("keydown",this.handle1Keydown,!1),this.handle1.removeEventListener("focus",this.showTooltip,!1),this.handle1.removeEventListener("blur",this.hideTooltip,!1),this.handle2.removeEventListener("keydown",this.handle2Keydown,!1),this.handle2.removeEventListener("focus",this.handle2Keydown,!1),this.handle2.removeEventListener("blur",this.handle2Keydown,!1),this.sliderElem.removeEventListener("mouseenter",this.showTooltip,!1),this.sliderElem.removeEventListener("mouseleave",this.hideTooltip,!1),this.sliderElem.removeEventListener("touchstart",this.mousedown,!1),this.sliderElem.removeEventListener("mousedown",this.mousedown,!1)},_bindNonQueryEventHandler:function(a,b){void 0===this.eventToCallbackMap[a]&&(this.eventToCallbackMap[a]=[]),this.eventToCallbackMap[a].push(b)},_cleanUpEventCallbacksMap:function(){for(var a=Object.keys(this.eventToCallbackMap),b=0;b<a.length;b++){var c=a[b];this.eventToCallbackMap[c]=null}},_showTooltip:function(){this.options.tooltip_split===!1?this._addClass(this.tooltip,"in"):(this._addClass(this.tooltip_min,"in"),this._addClass(this.tooltip_max,"in")),this.over=!0},_hideTooltip:function(){this.inDrag===!1&&this.alwaysShowTooltip!==!0&&(this._removeClass(this.tooltip,"in"),this._removeClass(this.tooltip_min,"in"),this._removeClass(this.tooltip_max,"in")),this.over=!1},_layout:function(){var a;if(a=this.options.reversed?[100-this.percentage[0],this.percentage[1]]:[this.percentage[0],this.percentage[1]],this.handle1.style[this.stylePos]=a[0]+"%",this.handle2.style[this.stylePos]=a[1]+"%",this.options.ticks instanceof Array&&this.options.ticks.length>0){var b=Math.max.apply(Math,this.options.ticks),c=Math.min.apply(Math,this.options.ticks),d="vertical"===this.options.orientation?"height":"width",e="vertical"===this.options.orientation?"margin-top":"margin-left",f=this.size/(this.options.ticks.length-1);if(this.tickLabelContainer&&(this.tickLabelContainer.style[e]=-f/2+"px","horizontal"===this.options.orientation)){var g=this.tickLabelContainer.offsetHeight-this.sliderElem.offsetHeight;this.sliderElem.style.marginBottom=g+"px"}for(var h=0;h<this.options.ticks.length;h++){var i=100*(this.options.ticks[h]-c)/(b-c);this.ticks[h].style[this.stylePos]=i+"%",this._removeClass(this.ticks[h],"in-selection"),i<=a[0]&&!this.options.range?this._addClass(this.ticks[h],"in-selection"):i>=a[0]&&i<=a[1]&&this._addClass(this.ticks[h],"in-selection"),this.tickLabels[h]&&(this.tickLabels[h].style[d]=f+"px")}}if("vertical"===this.options.orientation)this.trackLeft.style.top="0",this.trackLeft.style.height=Math.min(a[0],a[1])+"%",this.trackSelection.style.top=Math.min(a[0],a[1])+"%",this.trackSelection.style.height=Math.abs(a[0]-a[1])+"%",this.trackRight.style.bottom="0",this.trackRight.style.height=100-Math.min(a[0],a[1])-Math.abs(a[0]-a[1])+"%";else{this.trackLeft.style.left="0",this.trackLeft.style.width=Math.min(a[0],a[1])+"%",this.trackSelection.style.left=Math.min(a[0],a[1])+"%",this.trackSelection.style.width=Math.abs(a[0]-a[1])+"%",this.trackRight.style.right="0",this.trackRight.style.width=100-Math.min(a[0],a[1])-Math.abs(a[0]-a[1])+"%";var j=this.tooltip_min.getBoundingClientRect(),k=this.tooltip_max.getBoundingClientRect();j.right>k.left?(this._removeClass(this.tooltip_max,"top"),this._addClass(this.tooltip_max,"bottom"),this.tooltip_max.style.top="18px"):(this._removeClass(this.tooltip_max,"bottom"),this._addClass(this.tooltip_max,"top"),this.tooltip_max.style.top=this.tooltip_min.style.top)}var l;if(this.options.range){l=this.options.formatter(this.options.value),this._setText(this.tooltipInner,l),this.tooltip.style[this.stylePos]=(a[1]+a[0])/2+"%","vertical"===this.options.orientation?this._css(this.tooltip,"margin-top",-this.tooltip.offsetHeight/2+"px"):this._css(this.tooltip,"margin-left",-this.tooltip.offsetWidth/2+"px"),"vertical"===this.options.orientation?this._css(this.tooltip,"margin-top",-this.tooltip.offsetHeight/2+"px"):this._css(this.tooltip,"margin-left",-this.tooltip.offsetWidth/2+"px");var m=this.options.formatter(this.options.value[0]);this._setText(this.tooltipInner_min,m);var n=this.options.formatter(this.options.value[1]);this._setText(this.tooltipInner_max,n),this.tooltip_min.style[this.stylePos]=a[0]+"%","vertical"===this.options.orientation?this._css(this.tooltip_min,"margin-top",-this.tooltip_min.offsetHeight/2+"px"):this._css(this.tooltip_min,"margin-left",-this.tooltip_min.offsetWidth/2+"px"),this.tooltip_max.style[this.stylePos]=a[1]+"%","vertical"===this.options.orientation?this._css(this.tooltip_max,"margin-top",-this.tooltip_max.offsetHeight/2+"px"):this._css(this.tooltip_max,"margin-left",-this.tooltip_max.offsetWidth/2+"px")}else l=this.options.formatter(this.options.value[0]),this._setText(this.tooltipInner,l),this.tooltip.style[this.stylePos]=a[0]+"%","vertical"===this.options.orientation?this._css(this.tooltip,"margin-top",-this.tooltip.offsetHeight/2+"px"):this._css(this.tooltip,"margin-left",-this.tooltip.offsetWidth/2+"px")},_removeProperty:function(a,b){a.style.removeProperty?a.style.removeProperty(b):a.style.removeAttribute(b)},_mousedown:function(a){if(!this.options.enabled)return!1;this._triggerFocusOnHandle(),this.offset=this._offset(this.sliderElem),this.size=this.sliderElem[this.sizePos];var b=this._getPercentage(a);if(this.options.range){var c=Math.abs(this.percentage[0]-b),d=Math.abs(this.percentage[1]-b);this.dragged=d>c?0:1}else this.dragged=0;this.percentage[this.dragged]=this.options.reversed?100-b:b,this._layout(),this.touchCapable&&(document.removeEventListener("touchmove",this.mousemove,!1),document.removeEventListener("touchend",this.mouseup,!1)),this.mousemove&&document.removeEventListener("mousemove",this.mousemove,!1),this.mouseup&&document.removeEventListener("mouseup",this.mouseup,!1),this.mousemove=this._mousemove.bind(this),this.mouseup=this._mouseup.bind(this),this.touchCapable&&(document.addEventListener("touchmove",this.mousemove,!1),document.addEventListener("touchend",this.mouseup,!1)),document.addEventListener("mousemove",this.mousemove,!1),document.addEventListener("mouseup",this.mouseup,!1),this.inDrag=!0;var e=this._calculateValue();return this._trigger("slideStart",e),this._setDataVal(e),this.setValue(e),this._pauseEvent(a),!0},_triggerFocusOnHandle:function(a){0===a&&this.handle1.focus(),1===a&&this.handle2.focus()},_keydown:function(a,b){if(!this.options.enabled)return!1;var c;switch(b.keyCode){case 37:case 40:c=-1;break;case 39:case 38:c=1}if(c){if(this.options.natural_arrow_keys){var d="vertical"===this.options.orientation&&!this.options.reversed,e="horizontal"===this.options.orientation&&this.options.reversed;(d||e)&&(c=-1*c)}var f=c*this.percentage[2],g=this.percentage[a]+f;g>100?g=100:0>g&&(g=0),this.dragged=a,this._adjustPercentageForRangeSliders(g),this.percentage[this.dragged]=g,this._layout();var h=this._calculateValue(!1);return this._trigger("slideStart",h),this._setDataVal(h),this.setValue(h,!0),this._trigger("slideStop",h),this._setDataVal(h),this._pauseEvent(b),!1}},_pauseEvent:function(a){a.stopPropagation&&a.stopPropagation(),a.preventDefault&&a.preventDefault(),a.cancelBubble=!0,a.returnValue=!1},_mousemove:function(a){if(!this.options.enabled)return!1;var b=this._getPercentage(a);this._adjustPercentageForRangeSliders(b),this.percentage[this.dragged]=this.options.reversed?100-b:b,this._layout();var c=this._calculateValue(!0);return this.setValue(c,!0),!1},_adjustPercentageForRangeSliders:function(a){this.options.range&&(0===this.dragged&&this.percentage[1]<a?(this.percentage[0]=this.percentage[1],this.dragged=1):1===this.dragged&&this.percentage[0]>a&&(this.percentage[1]=this.percentage[0],this.dragged=0))},_mouseup:function(){if(!this.options.enabled)return!1;this.touchCapable&&(document.removeEventListener("touchmove",this.mousemove,!1),document.removeEventListener("touchend",this.mouseup,!1)),document.removeEventListener("mousemove",this.mousemove,!1),document.removeEventListener("mouseup",this.mouseup,!1),this.inDrag=!1,this.over===!1&&this._hideTooltip();var a=this._calculateValue(!0);return this._layout(),this._trigger("slideStop",a),this._setDataVal(a),!1},_calculateValue:function(a){var b;if(this.options.range?(b=[this.options.min,this.options.max],0!==this.percentage[0]&&(b[0]=Math.max(this.options.min,this.options.min+Math.round(this.diff*this.percentage[0]/100/this.options.step)*this.options.step),b[0]=this._applyPrecision(b[0])),100!==this.percentage[1]&&(b[1]=Math.min(this.options.max,this.options.min+Math.round(this.diff*this.percentage[1]/100/this.options.step)*this.options.step),b[1]=this._applyPrecision(b[1]))):(b=this.options.min+Math.round(this.diff*this.percentage[0]/100/this.options.step)*this.options.step,b<this.options.min?b=this.options.min:b>this.options.max&&(b=this.options.max),b=parseFloat(b),b=this._applyPrecision(b)),a){for(var c=[b,1/0],d=0;d<this.options.ticks.length;d++){var e=Math.abs(this.options.ticks[d]-b);e<=c[1]&&(c=[this.options.ticks[d],e])}if(c[1]<=this.options.ticks_snap_bounds)return c[0]}return b},_applyPrecision:function(a){var b=this.options.precision||this._getNumDigitsAfterDecimalPlace(this.options.step);return this._applyToFixedAndParseFloat(a,b)},_getNumDigitsAfterDecimalPlace:function(a){var b=(""+a).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);return b?Math.max(0,(b[1]?b[1].length:0)-(b[2]?+b[2]:0)):0},_applyToFixedAndParseFloat:function(a,b){var c=a.toFixed(b);return parseFloat(c)},_getPercentage:function(a){!this.touchCapable||"touchstart"!==a.type&&"touchmove"!==a.type||(a=a.touches[0]);var b=100*(a[this.mousePos]-this.offset[this.stylePos])/this.size;return b=Math.round(b/this.percentage[2])*this.percentage[2],Math.max(0,Math.min(100,b))},_validateInputValue:function(a){if("number"==typeof a)return a;if(a instanceof Array)return this._validateArray(a),a;throw new Error(d.formatInvalidInputErrorMsg(a))},_validateArray:function(a){for(var b=0;b<a.length;b++){var c=a[b];if("number"!=typeof c)throw new Error(d.formatInvalidInputErrorMsg(c))}},_setDataVal:function(a){var b="value: '"+a+"'";this.element.setAttribute("data",b),this.element.setAttribute("value",a)},_trigger:function(b,c){c=c||0===c?c:void 0;var d=this.eventToCallbackMap[b];if(d&&d.length)for(var e=0;e<d.length;e++){var f=d[e];f(c)}a&&this._triggerJQueryEvent(b,c)},_triggerJQueryEvent:function(a,b){var c={type:a,value:b};this.$element.trigger(c),this.$sliderElem.trigger(c)},_unbindJQueryEventHandlers:function(){this.$element.off(),this.$sliderElem.off()},_setText:function(a,b){"undefined"!=typeof a.innerText?a.innerText=b:"undefined"!=typeof a.textContent&&(a.textContent=b)},_removeClass:function(a,b){for(var c=b.split(" "),d=a.className,e=0;e<c.length;e++){var f=c[e],g=new RegExp("(?:\\s|^)"+f+"(?:\\s|$)");d=d.replace(g," ")}a.className=d.trim()},_addClass:function(a,b){for(var c=b.split(" "),d=a.className,e=0;e<c.length;e++){var f=c[e],g=new RegExp("(?:\\s|^)"+f+"(?:\\s|$)"),h=g.test(d);h||(d+=" "+f)}a.className=d.trim()},_offset:function(a){var b=0,c=0;if(a.offsetParent)do b+=a.offsetLeft,c+=a.offsetTop;while(a=a.offsetParent);return{left:b,top:c}},_css:function(b,c,d){if(a)a.style(b,c,d);else{var e=c.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,function(a,b){return b.toUpperCase()});b.style[e]=d}}},a){var e=a.fn.slider?"bootstrapSlider":"slider";a.bridget(e,b)}}(a),b});;// create the base namespace
var CS = {};

// create additional namespace
CS.Models = {};
CS.Controllers = {};
CS.Services = {};
CS.C1s = {};

// Global objects
CS.account = {
    id: null,
    email: null,
    data: null
};
CS.router = new Grapnel();
CS.defaultAnimationDuration = 0.5;
CS.activitiesModel = null;
CS.indexController = null;
;CS.Services.Browser = {
    addUserAgentAttributeToHtmlTag: function() {
        document.documentElement.setAttribute("data-useragent", navigator.userAgent);
    },

    isMediumScreen: function () {
        var content = window.getComputedStyle(
            document.querySelector("html"), ":after"
        ).getPropertyValue("content");

        // In some browsers like Firefox, "content" is wrapped by double-quotes, that's why doing "return content === "GLOBAL_MEDIUM_SCREEN_BREAKPOINT" would be false.
        return _.contains(content, "GLOBAL_MEDIUM_SCREEN_BREAKPOINT");
    },

    isLargeScreen: function () {
        var content = window.getComputedStyle(
            document.querySelector("html"), ":after"
        ).getPropertyValue("content");

        return _.contains(content, "GLOBAL_LARGE_SCREEN_BREAKPOINT");
    },

    isSmallScreen: function () {
        return !this.isMediumScreen() && !this.isLargeScreen();
    }
};
;CS.Services.Validator = P(function (c) {
    c.checkEmpty = "empty";
    c.checkEmail = "email";
    c.checkUsername = "username";
    c.checkDateInFuture = "in-future";
    c.checkMinLength = "min-length";
    c.checkMaxLength = "max-length";
    c.checkInteger = "integer";
    c.checkDecimal = "decimal";
    c.checkUrl = "url";

    c.errorMessageHeight = "21px";
    c.errorMessageHeightMediumScreen = "28px";
    c.errorMessageHeightLargeScreen = "33px";

    c.errorMessageAnimationDuration = 0.5;

    c.init = function (fieldIds) {
        this.fieldIds = fieldIds;

        for (var i = 0; i < this.fieldIds.length; i++) {
            var $field = $("#" + this.fieldIds[i]);

            if ($field.hasClass("pills")) {
                this._addClickEvents($field);
            } else {
                this._addBlurEvent($field);
                this._addValueChangedEvent($field);
            }
        }
    };

    c.isValid = function () {
        var result = true;
        var isFocusOnFirstInvalidFieldDone = false;
        var $field;

        for (var i = 0; i < this.fieldIds.length; i++) {
            $field = $("#" + this.fieldIds[i]);

            if (!this._validateField($field, false)) {
                result = false;

                // We focus on the first invalid field
                if (!isFocusOnFirstInvalidFieldDone) {
                    $field.focus();
                    isFocusOnFirstInvalidFieldDone = true;
                }
            }
        }

        return result;
    };

    c.flagValid = function ($field) {
        var $wrapper = $field.parent();
        $wrapper.removeClass("has-error");
    };

    c.flagInvalid = function ($field) {
        var $wrapper = $field.parent();
        $wrapper.addClass("has-error");
    };

    c.isFlaggedInvalid = function ($field) {
        return $field.parent().hasClass("has-error");
    };

    c.showErrorMessage = function ($errorMsg) {
        if ($errorMsg.html()) {
            var height = this.errorMessageHeight;
            if (CS.Services.Browser.isMediumScreen()) {
                height = this.errorMessageHeightMediumScreen;
            } else if (CS.Services.Browser.isLargeScreen()) {
                height = this.errorMessageHeightLargeScreen;
            }

            TweenLite.to($errorMsg, this.errorMessageAnimationDuration, {height: height, marginBottom: height});
        }
    };

    c.hideErrorMessage = function ($errorMsg) {
        if ($errorMsg.html()) {
            TweenLite.to($errorMsg, this.errorMessageAnimationDuration, {height: 0, marginBottom: 0});
        }
    };

    c._get$empty = function ($field) {
        return this._get$error($field, this.checkEmpty);
    };

    c._get$email = function ($field) {
        return this._get$error($field, this.checkEmail);
    };

    c._get$username = function ($field) {
        return this._get$error($field, this.checkUsername);
    };

    c._get$inFuture = function ($field) {
        return this._get$error($field, this.checkDateInFuture);
    };

    c._get$minLength = function ($field) {
        return this._get$error($field, this.checkMinLength);
    };

    c._get$maxLength = function ($field) {
        return this._get$error($field, this.checkMaxLength);
    };

    c._get$integer = function ($field) {
        return this._get$error($field, this.checkInteger);
    };

    c._get$decimal = function ($field) {
        return this._get$error($field, this.checkDecimal);
    };

    c._get$url = function ($field) {
        return this._get$error($field, this.checkUrl);
    };

    c._get$error = function ($field, checkType) {
        return $field.parents(".form-group").children("p[data-check=" + checkType + "]");
    };

    c._isToCheckIfEmpty = function ($field) {
        return this._get$empty($field).length === 1;
    };

    c._isToCheckIfEmail = function ($field) {
        return this._get$email($field).length === 1;
    };

    c._isToCheckIfUsername = function ($field) {
        return this._get$username($field).length === 1;
    };

    c._isToCheckIfInFuture = function ($field) {
        return this._get$inFuture($field).length === 1;
    };

    c._isToCheckIfMinLength = function ($field) {
        return this._get$minLength($field).length === 1;
    };

    c._isToCheckIfMaxLength = function ($field) {
        return this._get$maxLength($field).length === 1;
    };

    c._isToCheckIfInteger = function ($field) {
        return this._get$integer($field).length === 1;
    };

    c._isToCheckIfDecimal = function ($field) {
        return this._get$decimal($field).length === 1;
    };

    c._isToCheckIfUrl = function ($field) {
        return this._get$url($field).length === 1;
    };

    c._isEmail = function (email) {
        if (email === "") {
            return true;
        }

        var reg = /^([a-z0-9_\-\.])+\@([a-z0-9_\-\.])+\.([a-z]{2,4})$/i;
        return reg.test(email);
    };

    c._isUsername = function (username) {
        var reg = /^([a-z0-9_\-])+$/i;
        return reg.test(username);
    };

    c._isInFuture = function (dateStr) {
        var yearMonthDay = dateStr.split("-");
        var year = parseInt(yearMonthDay[0], 10);
        var month = parseInt(yearMonthDay[1], 10);
        var day = parseInt(yearMonthDay[2], 10);

        var date = new Date(year, month - 1, day);
        var now = new Date();

        var oneDayInMillis = 1000 * 60 * 60 * 24;
        var nbDaysDifference = Math.ceil((date - now) / oneDayInMillis);

        return nbDaysDifference > 0;
    };

    c._isMinLength = function (value, minLength) {
        if (value === null || value === undefined || value === "") {
            return true;
        }

        return value.length >= minLength;
    };

    c._isMaxLength = function (value, maxLength) {
        if (value === null || value === undefined || value === "") {
            return true;
        }

        return value.length <= maxLength;
    };

    c._isInteger = function (value) {
        var reg = /^\d*$/;
        return reg.test(value);
    };

    c._isDecimal = function (value) {
        var reg = /^\d*\.?\d*$/;
        return reg.test(value);
    };

    c._isUrl = function (url) {
        var reg = /^((https?|ftp|irc):\/\/)?(www\d?|[a-z0-9]+)?\.[a-z0-9-]+(\:|\.)([a-z0-9.]+|(\d+)?)([/?:].*)?$/i;
        return reg.test(url);
    };

    c._validateField = function ($field, isOnBlur) {

        // Empty?
        if (this._isToCheckIfEmpty($field)) {
            if ($field.hasClass("nav-pills") &&
                $field.children(".active").length === 0) {

                this.flagInvalid($field);
                this.showErrorMessage(this._get$empty($field));
                return false;
            }
            if (!$field.hasClass("nav-pills") && !$field.val().trim()) {

                if (!isOnBlur) {
                    this.flagInvalid($field);
                    this.showErrorMessage(this._get$empty($field));
                }
                return false;
            }

            this.hideErrorMessage(this._get$empty($field));
        }

        // Email?
        if (this._isToCheckIfEmail($field)) {
            if (!this._isEmail($field.val().trim())) {
                this.flagInvalid($field);
                this.showErrorMessage(this._get$email($field));
                return false;
            }

            this.hideErrorMessage(this._get$email($field));
        }

        // Username?
        if (this._isToCheckIfUsername($field)) {
            if (!this._isUsername($field.val().trim())) {
                this.flagInvalid($field);
                this.showErrorMessage(this._get$username($field));
                return false;
            }
            this.hideErrorMessage(this._get$username($field));
        }

        // In the future?
        if (this._isToCheckIfInFuture($field)) {
            if (!this._isInFuture($field.val().trim())) {
                this.flagInvalid($field);
                this.showErrorMessage(this._get$inFuture($field));
                return false;
            }
            this.hideErrorMessage(this._get$inFuture($field));
        }

        // Min length?
        if (this._isToCheckIfMinLength($field)) {
            if (!this._isMinLength($field.val().trim(), $field.data("min-length"))) {
                this.flagInvalid($field);
                this.showErrorMessage(this._get$minLength($field));
                return false;
            }
            this.hideErrorMessage(this._get$minLength($field));
        }

        // Max length?
        if (this._isToCheckIfMaxLength($field)) {
            if (!this._isMaxLength($field.val().trim(), $field.attr("maxlength"))) {
                this.flagInvalid($field);
                this.showErrorMessage(this._get$maxLength($field));
                return false;
            }
            this.hideErrorMessage(this._get$maxLength($field));
        }

        // Integer number?
        if (this._isToCheckIfInteger($field)) {
            if (!this._isInteger($field.val().trim())) {
                this.flagInvalid($field);
                this.showErrorMessage(this._get$integer($field));
                return false;
            }
            this.hideErrorMessage(this._get$integer($field));
        }

        // Decimal number?
        if (this._isToCheckIfDecimal($field)) {
            if (!this._isDecimal($field.val().trim())) {
                this.flagInvalid($field);
                this.showErrorMessage(this._get$decimal($field));
                return false;
            }
            this.hideErrorMessage(this._get$decimal($field));
        }

        // URL?
        if (this._isToCheckIfUrl($field)) {
            if (!this._isUrl($field.val().trim())) {
                this.flagInvalid($field);
                this.showErrorMessage(this._get$url($field));
                return false;
            }
            this.hideErrorMessage(this._get$url($field));
        }

        this.flagValid($field);

        return true;
    };

    c._addBlurEvent = function ($field) {
        $field.blur(function () {
            this._validateField($field, true);
        }.bind(this));
    };

    c._addValueChangedEvent = function ($field) {
        $field.change(function () {
            this._validateField($field);
        }.bind(this));
    };

    c._addClickEvents = function ($field) {
        $field.find("a").bind("active-toggled", function () {
            this._validateField($field);
        }.bind(this));
    };
});
;CS.Services.Animator = {
    fadeIn: function ($el) {
        if (!$el.is(":visible")) {
            TweenLite.set($el, {display: "block", alpha: 0});
            TweenLite.to($el, CS.defaultAnimationDuration, {alpha: 1});
        }
    },
    fadeOut: function ($el, onComplete) {
        if ($el.is(":visible")) {
            TweenLite.to($el, CS.defaultAnimationDuration, {
                alpha: 0,
                onComplete: function () {
                    if (onComplete) {
                        onComplete();
                    } else {
                        $el.hide();
                    }
                }
            });
        }
    }
};
;CS.Services.String = {
    textToHtml: function (text) {
        if (text) {
            return text.replace(/\n/g, "<br/>");
        }
    },

    template: function (string, key, value) {
        if (string) {
            var regExp = new RegExp("\\{" + key + "\\}", "g");
            return string.replace(regExp, value);
        }
    }
};
;CS.Models.Activity = {
    state: {
        done: "DONE"
    }
};
;CS.Models.Activities = P(function (c) {
    c.init = function () {
        var activityItems = [
            {
                className: "IdentifyStrengths",
                title: "Analysera jobbannonsen",
                description: "Här får du hjälp att ta fram de viktigaste egenskaperna som efterfrågas och matcha kraven med dina styrkor.",
                buttonText: "Kom igång"
            },
            {
                className: "SpecifyTop1Strength",
                title: "Styrkans innebörd{colonAndStrengthName}",
                description: "Vad innebär <strong>{strengthName}</strong> för dig och vilken nytta skapas för företaget? Vi hjälper dig att ta reda på det!",
                buttonText: "Definiera och värdera"
            },
            {
                className: "SpecifyTop2Strength",
                title: "Styrkans innebörd{colonAndStrengthName}",
                description: "Vad innebär <strong>{strengthName}</strong> för dig och vilken nytta skapas för företaget? Vi hjälper dig att ta reda på det!",
                buttonText: "Definiera och värdera"
            },
            {
                className: "SpecifyTop3Strength",
                title: "Styrkans innebörd{colonAndStrengthName}",
                description: "Vad innebär <strong>{strengthName}</strong> för dig och vilken nytta skapas för företaget? Vi hjälper dig att ta reda på det!",
                buttonText: "Definiera och värdera"
            }
        ];

        this.activityInstances = activityItems.map(function (item) {
            return CS.Activities[item.className](item.className, item.title, item.description);
        });
    };

    c.updateActivityStatus = function (onComplete) {
        this.activities = {
            done: [],
            doable: [],
            notDoable: []
        };

        this._fetchActivityData(onComplete);
    };

    c.getDone = function () {
        return this.activities.done;
    };

    c.getDoable = function () {
        return this.activities.doable;
    };

    c.getNotDoable = function () {
        return this.activities.notDoable;
    };

    c.getNextActivity = function () {
        if (_.isEmpty(this.activities.doable)) {
            return null;
        }
        return this.activities.doable[0];
    };

    c._fetchActivityData = function (onComplete) {
        var type = "GET";
        var url = "/api/activities";

        $.ajax({
            url: url,
            type: type,
            dataType: "json",
            success: function (data) {
                this._updateActivityStatus(data, onComplete);
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    };

    c._updateActivityStatus = function (activityData, onComplete) {
        activityData.forEach(function (activity) {
            var instance = _.find(this.activityInstances, function (instans) {
                return instans.getClassName() === activity.className;
            });

            if (activity.state === CS.Models.Activity.state.done) {
                this.activities.done.push(instance);
            } else if (instance.isDoable()) {
                this.activities.doable.push(instance);
            } else {
                this.activities.notDoable.push(instance);
            }
        }.bind(this));

        // We handle instances which didn't have any activity data
        this.activityInstances.forEach(function (instance) {
            var isTodo = _.isEmpty(_.find(this.activities.done, function (activity) {
                return activity.getClassName() === instance.getClassName();
            }));

            if (isTodo) {
                var isAlreadyInTheList;
                if (instance.isDoable()) {
                    // Is it already is among CS.activities.doable?
                    isAlreadyInTheList = _.find(this.activities.doable, function (activity) {
                        return activity.getClassName() === instance.getClassName();
                    });

                    if (!isAlreadyInTheList) {
                        this.activities.doable.push(instance);
                    }
                } else {
                    // Is it already is among CS.activities.notDoable?
                    isAlreadyInTheList = _.find(this.activities.notDoable, function (activity) {
                        return activity.getClassName() === instance.getClassName();
                    });

                    if (!isAlreadyInTheList) {
                        this.activities.notDoable.push(instance);
                    }
                }
            }
        }.bind(this));

        if (onComplete) {
            onComplete();
        }
    };
});
;CS.Models.Strength = {
    sort: function (unsortedStrength) {
        return _.sortBy(unsortedStrength, function (strength) {
            return -strength.howWellItApplies - strength.howImportantForEmployer;
        });
    }
};
;CS.Controllers.Base = P(function(c) {
    c.httpStatusCode = {
        noContent: 204,
        emailAlreadyRegistered: 230
    };

    c.isTemporaryAccount = function () {
        return CS.account.id < 0;
    };

    c.saveInLocalStorage = function (key, value) {
        if (Modernizr.localstorage) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    };

    c.getFromLocalStorage = function (key) {
        if (Modernizr.localstorage) {
            return JSON.parse(localStorage.getItem(key));
        }
    };

    c.removeFromLocalStorage = function (key) {
        if (Modernizr.localstorage) {
            localStorage.removeItem(key);
        }
    };
});
;CS.Controllers.OnePageWebapp = P(CS.Controllers.Base, function (c) {
    c.navigateTo = function (route) {
        location.hash = route;
    };

    c.navigateBack = function () {
        history.back();
    };
});
;CS.Controllers.Index = P(function (c) {
    c.init = function (accountId, accountEmail, accountData) {
        CS.account.id = accountId;
        CS.account.email = accountEmail;
        CS.account.data = accountData;

        CS.Controllers.Header();
        CS.Controllers.HeaderModal.Register();
        CS.Controllers.HeaderModal.SignIn();
        CS.Controllers.Standouts();

        CS.activitiesModel = CS.Models.Activities();
        CS.activitiesModel.updateActivityStatus();
    };
});
;CS.Controllers.Header = P(CS.Controllers.Base, function (c) {
    c.init = function () {
        this._initElements();
        this.initHeaderLinks();
        this._initEvents();
    };

    c._initElements = function () {
        this.$navSection = $("nav");
        this.$headerLinks = this.$navSection.children("a");
        this.$signOutLink = this.$headerLinks.filter("#sign-out-link");
    };

    c._initEvents = function () {
        this.$signOutLink.click($.proxy(this._signOut, this));
    };

    c.initHeaderLinks = function () {
        if (this.isTemporaryAccount()) {
            this.$headerLinks.css("display", "inline-block");
            this.$signOutLink.hide();
        } else {
            this.$headerLinks.hide();
            this.$signOutLink.css("display", "inline-block");
        }
    };

    c._signOut = function () {
        var type = "DELETE";
        var url = "/api/auth";

        $.ajax({
            url: url,
            type: type,
            success: function () {
                location.href = "/";
            },
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    };
});
;CS.Controllers.HeaderModal = P(CS.Controllers.OnePageWebapp, function (c) {
    c.init = function () {
        this.initElements();
        this.initValidation();
        this.initEvents();
    };

    c.initElements = function () {
        this.$headerSection = $("#header-links");
        this.$headerLinks = this.$headerSection.children("a");
        this.$registerLink = this.$headerLinks.filter("#register-link");
        this.$signInLink = this.$headerLinks.filter("#sign-in-link");
        this.$signOutLink = this.$headerLinks.filter("#sign-out-link");

        this.$modal = $("#register-or-sign-in-modal");
        this.$modalTitles = this.$modal.find(".modal-title");
        this.$modalForms = this.$modal.find("form");
        this.$modalSubmitButtons = this.$modal.find(".modal-footer").find("button");

        this.$registerReminderAlert = $("#register-reminder");
    };

    c.initEvents = function () {
        this.$modal.on("hidden.bs.modal", $.proxy(this._launchOtherModalIfNeeded, this));
        this.$launchLink.click($.proxy(this._launchModal, this));
        this.$switchModalLink.click($.proxy(this.setSwitchFormIdAndCloseModal, this));
        this.$form.submit($.proxy(this._clickOnSubmitBtn, this));
        this.$submitBtn.click($.proxy(this.handleSubmit, this));
    };

    c.onFormSubmitSuccess = function(data) {
        CS.account.id = data.accountId;
        CS.account.email = data.accountEmail;
        CS.account.data = data.accountData;

        CS.indexController.initWelcomePanel();
        CS.indexController.initHeaderLinks();
        CS.indexController.initActivityTabText();
        CS.activityFeedController.initIntroToActivitiesAlert();

        this.$registerReminderAlert.hide();

        this.navigateTo("activities");

        this.$modal.modal("hide");

        this._resetForm();
    };

    c._resetForm = function () {
        this.$form[0].reset();
        this.$submitBtn.button("reset");
    };

    c._launchModal = function () {
        this.$modalTitles.hide();
        this.$modalForms.hide();
        this.$modalSubmitButtons.hide();

        this.$modalTitle.show();
        this.$form.show();
        this.$submitBtn.show();

        this.$modal.modal();
    };

    c._launchOtherModalIfNeeded = function () {
        if (this.switchFormId) {
            if (this.switchFormId === "register-form") {
                this.$registerLink.click();
            } else if (this.switchFormId === "sign-in-form") {
                this.$signInLink.click();
            }

            this.switchFormId = null;
        }
    };

    c._clickOnSubmitBtn = function(e) {
        e.preventDefault();

        this.$submitBtn.click();
    };
});
;CS.Controllers.HeaderModal.Register = P(CS.Controllers.HeaderModal, function (c, base) {
    c.initElements = function() {
        base.initElements.call(this);

        this.$launchLink = this.$headerLinks.filter("#register-link");

        this.$modalTitle = this.$modalTitles.filter("#register-modal-title");
        this.$form = this.$modalForms.filter("#register-form");

        this.$form = $("#register-form");
        this.$emailField = this.$form.find("#email-register");
        this.$passwordField = this.$form.find("#password-register");
        this.$passwordConfirmationField = this.$form.find("#password-confirmation");

        this.$otherFormErrors = this.$form.find(".other-form-error");
        this.$passwordsNotMatchingError = this.$otherFormErrors.filter("#password-do-not-match");
        this.$emailAlreadyRegisteredError = this.$otherFormErrors.filter("#email-already-registered");

        this.$switchModalLink = this.$form.find(".switch-modal-link");

        this.$submitBtn = this.$modalSubmitButtons.filter("#register-modal-submit-btn");
    };

    c.initValidation = function() {
        this.validator = CS.Services.Validator([
            "email-register",
            "password-register",
            "password-confirmation"
        ]);
    };

    c.handleSubmit = function (e) {
        e.preventDefault();

        this.validator.hideErrorMessage(this.$otherFormErrors);

        if (this.validator.isValid() && this._arePasswordsMatching()) {
            this.$submitBtn.button("loading");

            var data = {
                emailAddress: this.$emailField.val().trim(),
                password: this.$passwordField.val().trim()
            };

            var type = "POST";
            var url = "/api/accounts";

            $.ajax({
                url: url,
                type: type,
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (d4ta, textStatus, jqXHR) {
                    if (jqXHR.status === this.httpStatusCode.emailAlreadyRegistered) {
                        this.$submitBtn.button("reset");
                        this.validator.showErrorMessage(this.$emailAlreadyRegisteredError);
                    } else {
                        this.onFormSubmitSuccess(d4ta);
                    }
                }.bind(this),
                error: function () {
                    this.$submitBtn.button("reset");
                    alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
                }.bind(this)
            });
        }
    };

    c.setSwitchFormIdAndCloseModal = function() {
        this.switchFormId = "sign-in-form";
        this.$modal.modal("hide");
    };

    c._arePasswordsMatching = function () {
        var isValid = this.$passwordField.val().trim() === this.$passwordConfirmationField.val().trim();

        if (!isValid) {
            this.validator.showErrorMessage(this.$passwordsNotMatchingError);
        }

        return isValid;
    };
});
;CS.Controllers.HeaderModal.SignIn = P(CS.Controllers.HeaderModal, function (c, base) {
    c.initElements = function () {
        base.initElements.call(this);

        this.$launchLink = this.$headerLinks.filter("#sign-in-link");

        this.$modalTitle = this.$modalTitles.filter("#sign-in-modal-title");
        this.$form = this.$modalForms.filter("#sign-in-form");

        this.$emailField = this.$form.find("#email-sign-in");
        this.$passwordField = this.$form.find("#password-sign-in");

        this.$wrongCredentialsError = this.$form.find(".other-form-error");

        this.$switchModalLink = this.$form.find(".switch-modal-link");

        this.$submitBtn = this.$modalSubmitButtons.filter("#sign-in-modal-submit-btn");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "email-sign-in",
            "password-sign-in"
        ]);
    };

    c.handleSubmit = function (e) {
        e.preventDefault();

        this.validator.hideErrorMessage(this.$wrongCredentialsError);

        if (this.validator.isValid()) {
            this.$submitBtn.button("loading");

            var data = {
                emailAddress: this.$emailField.val().trim(),
                password: this.$passwordField.val().trim()
            };

            var type = "POST";
            var url = "/api/auth";

            $.ajax({
                url: url,
                type: type,
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (d4ta, textStatus, jqXHR) {
                    if (jqXHR.status === this.httpStatusCode.noContent) {
                        this.$submitBtn.button("reset");
                        this.validator.showErrorMessage(this.$wrongCredentialsError);
                    } else {
                        this.onFormSubmitSuccess(d4ta);
                    }
                }.bind(this),
                error: function () {
                    this.$submitBtn.button("reset");
                    alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
                }.bind(this)
            });
        }
    };

    c.setSwitchFormIdAndCloseModal = function() {
        this.switchFormId = "register-form";
        this.$modal.modal("hide");
    };
});
;CS.Controllers.SignInWithLinkedIn = P(function (c) {
    c.init = function () {
        this._initElements();
        this._initEvents();
    };

    c._initElements = function () {
        this.$signInWithLinkedInLink = $(".sign-in-with-linked-in");
    };

    c._initEvents = function () {
        this.$signInWithLinkedInLink.click($.proxy(this._signIn, this));
    };


    c._signIn = function () {
        IN.User.authorize(this._getProfileData, this);
    };

    c._getProfileData = function () {
        IN.API.Raw("/people/~:(id,first-name,last-name,maiden-name,formatted-name,phonetic-first-name,phonetic-last-name,formatted-phonetic-name,headline,location,industry,current-share,num-connections,num-connections-capped,summary,specialties,positions,picture-url,picture-urls::(original),site-standard-profile-request,api-standard-profile-request,public-profile-url,email-address,skills)")
            .result(function (data) {
                console.log("LinkedIn user data:", data);
                alert("LinkedIn sign-in successful. Email address: " + data.emailAddress);
            })
            .error(function (error) {
                alert("Error while signing-in with LinkedIn: " + error);
            });
    };
});
;CS.Controllers.Standouts = P(function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                position: null,
                employer: null,
                standoutClassNames: []
            };
        },

        render: function () {
            var positionAndEmployer;
            if (this.state.position && this.state.employer) {
                positionAndEmployer = (
                    React.createElement("h1", null, this.state.position, " på ", this.state.employer)
                    );
            }

            return (
                React.createElement("div", null, 
                    positionAndEmployer, 

                    React.createElement("p", {id: "empty-standouts-message"}, "Gör en aktivitet för att få insikter!"), 

                    React.createElement("ul", {className: "styleless"}, 
                        this.state.standoutClassNames.map(function (standoutClassName) {
                            var id = standoutClassName + "-standout-wrapper";

                            return React.createElement("li", {id: id, key: id});
                        })
                    )
                )
                );
        }
    });

    c.init = function () {
        this.standoutClassNames = ["Strengths"];

        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            document.getElementById("standouts")
        );

        this._initEvents();

        this._replaceReactState();
    };

    c._initEvents = function() {
        this.reactInstance.componentDidUpdate = function () {
            this._initStandouts();
        }.bind(this);
    };

    c.reRender = function () {
        this._replaceReactState();

        this.standoutInstances.forEach(function(standout) {
            standout.reRender();
        });
    };

    c._replaceReactState = function() {
        this.reactInstance.replaceState({
            position: CS.account.data ? CS.account.data.position : null,
            employer: CS.account.data ? CS.account.data.employer : null,
            standoutClassNames: this.standoutClassNames
        });
    };

    c._initStandouts = function() {
        this.standoutInstances = this.standoutClassNames.map(function (className) {
            return CS.Standouts[className](className);
        });
    };
});
;CS.C1s.Base = P(function (c) {
    c.init = function (className, title) {
        this.className = className;
        this.title = title;
    };

    c.getClassName = function() {
        return this.className;
    };

    c.getTitle = function() {
        return this.title;
    };
});
;CS.C1s.PositionAndEmployer = P(CS.C1s.Base, function (c, base) {
    c.init = function (className, title) {
        base.init.call(this, className, title);
    };
});
;CS.Activities = {};

CS.Activities.Base = P(function (c) {
    c.$el = $("#current-activity");

    c.init = function (className, title, description) {
        this.className = className;
        this.title = title;
        this.description = description;

        this.controllers = {};

        this.initModel();

        this._initElements();

        this.initControllers();
    };

    c._initElements = function () {
        this.$activitiesTab = $("#activities-tab");

        this.$tabPanels = $("[role='tabpanel']");
        this.$activitiesPanel = this.$tabPanels.filter("#activit1es");

        this.$feedSection = this.$activitiesPanel.children("#c1-and-activity-feed");
        this.$currentActivitySection = this.$activitiesPanel.children("#current-activity");
    };

    c.getClassName = function () {
        return this.className;
    };

    c.getTitle = function () {
        return this.title;
    };

    c.getDescription = function () {
        return this.description;
    };

    c.get$el = function() {
        return this.$el;
    };

    c.initModel = function() {
        this.model = {
            account: {
                data: _.clone(CS.account.data, true) || {}
            }
        };
    };

    c.registerController = function (controllerClass, route) {
        this.controllers[route] = controllerClass;
    };

    c.initRouting = function (controllers) {
        controllers.forEach(function (controller) {
            CS.router.get(controller.getRoute(), function () {
                this.renderController(controller.route);
            }.bind(this));
        }.bind(this));
    };

    c.renderController = function (route, data) {
        if (!this.$activitiesPanel.hasClass("active")) {
            this.$tabPanels.removeClass("active");
            this.$activitiesTab.tab("show");
            this.$activitiesPanel.addClass("active");
        }

        this.$feedSection.hide();
        this.$currentActivitySection.show();

        this._hidePagesAndDisplayNext(route, data);
    };

    c._hidePagesAndDisplayNext = function (route, data) {
        var $pages = this.$el.children();

        TweenLite.to($pages, CS.Activities.Base.pageAnimationDuration, {
            alpha: 0,
            onComplete: function () {
                $pages.hide();
                this.controllers[route].render(data);
            }.bind(this)
        });
    };
});

CS.Activities.Base.pageAnimationDuration = 0.15;
;CS.Activities.Controller = P(CS.Controllers.OnePageWebapp, function (c, base) {
    c.init = function (activity, route) {
        this.activity = activity;
        this.route = route;
        this.activity.registerController(this, this.route);

        this.$window = $(window);
        this.$content = $("#content");
    };

    c.getRoute = function(route) {
        return "activities/" + this.activity.getClassName() + (route ? route : this.route);
    };

    c.render = function () {
        if (this._isIntro()) {
            this.activity.get$el().empty();
        }

        if (!this.isRendered) {
            var uniqueId = _.uniqueId();

            this.activity.get$el().append("<div class=\"activity-page " + this.activity.getClassName() + "\" id=\"" + uniqueId + "\"></div>");
            this.$el = $("#" + uniqueId);

            this.reactInstance = React.render(
                React.createElement(this.reactClass),
                this.$el[0]
            );

            this.initElements();
            this.initValidation();
            this.initEvents();

            this.isRendered = true;
        }

        this.onReRender();

        TweenLite.set(this.$el, {display: "block", alpha: 0});
        TweenLite.to(this.$el, CS.Activities.Base.pageAnimationDuration, {alpha: 1});

        this.$window.scrollTop(this.$content.offset().top);
    };

    c.postData = function (callback) {
        var type = "POST";
        var url = "/api/activities";

        $.ajax({
            url: url,
            type: type,
            contentType: "application/json",
            data: JSON.stringify({
                className: this.activity.getClassName(),
                accountData: this.activity.model.account.data
            }),
            success: function () {
                CS.account.data = this.activity.model.account.data;

                CS.activitiesModel.updateActivityStatus(function() {
                    CS.activityFeedController.reRender();

                    if (callback) {
                        callback();
                    } else {
                        this.navigateTo(this.activity.outroController.getRoute());
                    }
                }.bind(this));
            }.bind(this),
            error: function () {
                if (this.$submitBtn) {
                    this.$submitBtn.button("reset");
                }

                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }.bind(this)
        });
    };

    c.nagivateTo = function(route) {
        base.navigateTo.call(this, this.getRoute(route));
    };

    c.nagivateToActivityFeed = function() {
        base.navigateTo.call(this, "activities");
    };

    // Child functions are call instead if exist
    c.initElements = function () {
    };
    c.initValidation = function () {
    };
    c.initEvents = function () {
    };
    c.onReRender = function () {
    };

    c._isIntro = function() {
        return this.route === "";
    };
});
;CS.Activities.IdentifyStrengths = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title, description) {
        base.init.call(this, className, title, description);
    };

    c.isDoable = function() {
        this.initModel();

        return this.model.account.data.Employer && this.model.account.data.Position;
    };

    c.initControllers = function() {
        // Initialising all activity controllers
        this.introController = CS.Activities.IdentifyStrengths.Controllers.Intro(this, "");
        this.step1Controller = CS.Activities.IdentifyStrengths.Controllers.Step1(this, "/1");
        this.step2Controller = CS.Activities.IdentifyStrengths.Controllers.Step2(this, "/2");
        this.step3Controller = CS.Activities.IdentifyStrengths.Controllers.Step3(this, "/3");
        this.step4Controller = CS.Activities.IdentifyStrengths.Controllers.Step4(this, "/4");
        this.step5Controller = CS.Activities.IdentifyStrengths.Controllers.Step5(this, "/5");
        this.outroController = CS.Activities.IdentifyStrengths.Controllers.Outro(this, "/outro");

        var controllers = [
            this.introController,
            this.step1Controller,
            this.step2Controller,
            this.step3Controller,
            this.step4Controller,
            this.step5Controller,
            this.outroController
        ];

        this.initRouting(controllers);
    };
});

CS.Activities.IdentifyStrengths.Controllers = {};
;CS.Activities.SpecifyTop1Strength = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title, description) {
        base.init.call(this, className, title, description);
    };

    c.isDoable = function() {
        this.initModel();

        return this.model.account.data.Employer &&
            this.model.account.data.Position &&
            !_.isEmpty(this.model.account.data.strengths);
    };

    c.initControllers = function() {
        // Initialising all activity controllers
        this.introController = CS.Activities.SpecifyTop1Strength.Controllers.Intro(this, "");
        this.step1Controller = CS.Activities.SpecifyTop1Strength.Controllers.Step1(this, "/1");
        this.step2Controller = CS.Activities.SpecifyTop1Strength.Controllers.Step2(this, "/2");
        this.step3Controller = CS.Activities.SpecifyTop1Strength.Controllers.Step3(this, "/3");
        this.outroController = CS.Activities.SpecifyTop1Strength.Controllers.Outro(this, "/outro");

        var controllers = [
            this.introController,
            this.step1Controller,
            this.step2Controller,
            this.step3Controller,
            this.outroController
        ];

        this.initRouting(controllers);
    };

    c.getTitle = function() {
        return CS.Services.String.template(base.getTitle.call(this), "colonAndStrengthName", ": <strong>" + this.model.account.data.strengths[0].name + "</strong>");
    };

    c.getDescription = function() {
        return CS.Services.String.template(base.getDescription.call(this), "strengthName", this.model.account.data.strengths[0].name);
    };
});

CS.Activities.SpecifyTop1Strength.Controllers = {};
;CS.Activities.SpecifyTop2Strength = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title, description) {
        base.init.call(this, className, title, description);
    };

    c.isDoable = function() {
        this.initModel();

        return this.model.account.data.Employer &&
            this.model.account.data.Position &&
            this.model.account.data.strengths &&
            this.model.account.data.strengths.length > 1;
    };

    c.initControllers = function() {
        // Initialising all activity controllers
        this.introController = CS.Activities.SpecifyTop2Strength.Controllers.Intro(this, "");
        this.step1Controller = CS.Activities.SpecifyTop2Strength.Controllers.Step1(this, "/1");
        this.step2Controller = CS.Activities.SpecifyTop2Strength.Controllers.Step2(this, "/2");
        this.step3Controller = CS.Activities.SpecifyTop2Strength.Controllers.Step3(this, "/3");
        this.outroController = CS.Activities.SpecifyTop2Strength.Controllers.Outro(this, "/outro");

        var controllers = [
            this.introController,
            this.step1Controller,
            this.step2Controller,
            this.step3Controller,
            this.outroController
        ];

        this.initRouting(controllers);
    };

    c.getTitle = function() {
        return CS.Services.String.template(base.getTitle.call(this), "colonAndStrengthName", ": <strong>" + this.model.account.data.strengths[1].name + "</strong>");
    };

    c.getDescription = function() {
        return CS.Services.String.template(base.getDescription.call(this), "strengthName", this.model.account.data.strengths[1].name);
    };
});

CS.Activities.SpecifyTop2Strength.Controllers = {};
;CS.Activities.SpecifyTop3Strength = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title, description) {
        base.init.call(this, className, title, description);
    };

    c.isDoable = function() {
        this.initModel();

        return this.model.account.data.Employer &&
            this.model.account.data.Position &&
            this.model.account.data.strengths &&
            this.model.account.data.strengths.length > 2;
    };

    c.initControllers = function() {
        // Initialising all activity controllers
        this.introController = CS.Activities.SpecifyTop3Strength.Controllers.Intro(this, "");
        this.step1Controller = CS.Activities.SpecifyTop3Strength.Controllers.Step1(this, "/1");
        this.step2Controller = CS.Activities.SpecifyTop3Strength.Controllers.Step2(this, "/2");
        this.step3Controller = CS.Activities.SpecifyTop3Strength.Controllers.Step3(this, "/3");
        this.outroController = CS.Activities.SpecifyTop3Strength.Controllers.Outro(this, "/outro");

        var controllers = [
            this.introController,
            this.step1Controller,
            this.step2Controller,
            this.step3Controller,
            this.outroController
        ];

        this.initRouting(controllers);
    };

    c.getTitle = function() {
        return CS.Services.String.template(base.getTitle.call(this), "colonAndStrengthName", ": <strong>" + this.model.account.data.strengths[2].name + "</strong>");
    };

    c.getDescription = function() {
        return CS.Services.String.template(base.getDescription.call(this), "strengthName", this.model.account.data.strengths[2].name);
    };
});

CS.Activities.SpecifyTop3Strength.Controllers = {};
;CS.Activities.IdentifyStrengths.Controllers.Intro = P(CS.Activities.Controller, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            return (
                React.createElement("div", null, 
                    React.createElement("h1", null, "Analysera jobbannonsen"), 

                    React.createElement("p", null, "Spännande att du har funnit en annons som du vill svara på! Här hjälper vi dig att ta fram de viktigaste egenskaperna som efterfrågas i annonsen samt matcha de kraven med dina egenskaper."), 

                    React.createElement("p", null, "Genom ett antal frågeställningar och övningar kommer du att identifiera och förklara de viktigaste egenskaper att lyfta fram i din jobbansökan."), 

                    React.createElement("div", {className: "centered-contents"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "button", className: "btn btn-primary"}, "Sätt igång")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$goBackBtn = this.$el.find(".btn-default");
        this.$goNextStepBtn = this.$el.find(".btn-primary");
    };

    c.initEvents = function () {
        this.$goBackBtn.click($.proxy(this.nagivateToActivityFeed, this));
        this.$goNextStepBtn.click($.proxy(this._navigateNext, this));
    };

    c._navigateNext = function () {
        this.activity.model.account.data.strengths = this.activity.model.account.data.strengths || [];

        this.navigateTo(this.activity.step1Controller.getRoute());
    };
});

CS.Activities.IdentifyStrengths.Controllers.Outro = P(CS.Activities.Controller, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                nextActivity: null,
                firstThreeStrengths: [],
                otherStrengths: []
            };
        },

        render: function () {
            var reactKey = this.state.nextActivity ? this.state.nextActivity.getClassName() : _.uniqueId();

            return (
                React.createElement("div", null, 
                    React.createElement("h3", null, "De här egenskaperna sparas ner till dina samlade insikter så du kan börja definiera dem närmre."), 

                    React.createElement("ol", null, 
                        this.state.firstThreeStrengths.map(function (strength) {
                            return (
                                React.createElement("li", null, strength.name)
                                );
                        })
                    ), 

                    React.createElement("div", {className: "strength-taglist-container"}, 
                        React.createElement("ul", {className: "styleless"}, 
                            this.state.otherStrengths.map(function (strength) {
                                return (
                                    React.createElement("li", null, 
                                        React.createElement("span", {className: "tag"}, 
                                            React.createElement("span", null, strength.name)
                                        )
                                    )
                                    );
                            })
                        )
                    ), 

                    React.createElement(CS.Activities.Controller.NextStep, {key: reactKey, activity: this.state.nextActivity})
                )
                );
        }
    });

    c.initEvents = function () {
        this.onReRender();
    };

    c.onReRender = function () {
        this.reactInstance.replaceState({
            nextActivity: CS.activitiesModel.getNextActivity(),
            firstThreeStrengths: _.take(this.activity.model.account.data.strengths, 3),
            otherStrengths: _.drop(this.activity.model.account.data.strengths, 3)
        });
    };
});

CS.Activities.IdentifyStrengths.Controllers.Step1 = P(CS.Activities.Controller, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {strengths: []};
        },

        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("h3", null, "Börja med att identifiera efterfrågade egenskaper i jobbannonsen."), 

                    React.createElement("p", {className: "help-text"}, "Försök hitta de egenskaper du uppfattar som allra viktigast för tjänsten." + ' ' +
                    "Med egenskaper menas att sätta att vara, ett karaktärsdrag."), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("div", {className: "input-group"}, 
                            React.createElement("input", {type: "text", id: "strength-in-job-add", className: "form-control", placeholder: "t.ex. kreativ eller resultatorienterad"}), 
                            React.createElement("span", {className: "input-group-btn"}, 
                                React.createElement("button", {type: "submit", className: "btn btn-default"}, "+ Lägg till")
                            )
                        ), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("p", {className: "field-error other-form-error", id: "one-strength-min"}, "Ange minst en egenskap"), 
                    React.createElement("p", {className: "field-error other-form-error strength-already-added"}, "Den här egenskapen har redan lagts till"), 

                    React.createElement("div", {className: "strength-taglist-container"}, 
                        React.createElement("ul", {className: "styleless"}, 
                            this.state.strengths.map(function (strength) {
                                return (
                                    React.createElement("li", null, 
                                        React.createElement("span", {className: "tag with-close-btn"}, 
                                            React.createElement("span", null, strength), 
                                            React.createElement("button", {type: "button", className: "close", "aria-label": "Close", onClick: this._handleRemoveStrengthClick}, 
                                                React.createElement("span", {"aria-hidden": "true"}, "×")
                                            )
                                        )
                                    )
                                    );
                            }.bind(this))
                        )
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default js-go-back"}, "Tillbaka"), 
                        React.createElement("button", {type: "button", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        },

        _handleRemoveStrengthClick: function (e) {
            var $li = $(e.currentTarget).parent().parent();

            CS.Services.Animator.fadeOut($li, function () {
                $li.remove();
            });
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$strengthField = this.$form.find("#strength-in-job-add");

        this.$oneStrengthMinError = this.$form.find("#one-strength-min");
        this.$strengthAlreadyAddedError = this.$form.find(".strength-already-added");

        this.$strengthTagList = this.$form.find(".strength-taglist-container").children();
        this.$goBackBtn = this.$form.find(".js-go-back");
        this.$goNextStepBtn = this.$form.find(".btn-primary");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength-in-job-add"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._addStrengthToList, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));
        this.$goNextStepBtn.click($.proxy(this._saveAndNavigateNext, this));
    };

    c._addStrengthToList = function (e) {
        e.preventDefault();

        this.validator.hideErrorMessage(this.$strengthAlreadyAddedError);

        if (this.validator.isValid()) {
            this.validator.hideErrorMessage(this.$oneStrengthMinError);

            var strength = this.$strengthField.val().trim();

            if (this._isStrengthAlreadyInList(strength)) {
                this.validator.showErrorMessage(this.$strengthAlreadyAddedError);
            } else {
                var strengths = this.reactInstance.state.strengths;
                strengths.push(strength);

                this.reactInstance.replaceState({ strengths: strengths });

                this.$strengthField.val("");
            }
        }
    };

    c._isThereAtLeastOneStrengthInList = function ($l1stItems) {
        var $listItems = $l1stItems || this.$strengthTagList.children();

        return $listItems && $listItems.length > 0;
    };

    c._isStrengthAlreadyInList = function (strength) {
        var $listItems = this.$strengthTagList.children();

        if (!this._isThereAtLeastOneStrengthInList($listItems)) {
            return false;
        }

        for (var i = 0; i < $listItems.length; i++) {
            var span = $($listItems[i]).children().children("span")[0];
            if (span.innerHTML.toLowerCase() === strength.toLowerCase()) {
                return true;
            }
        }

        return false;
    };

    c._saveAndNavigateNext = function () {
        if (!this._isThereAtLeastOneStrengthInList()) {
            this.validator.showErrorMessage(this.$oneStrengthMinError);
        } else {
            // Because jQuery's "map()" function returns an object, see http://xahlee.info/js/js_convert_array-like.html
            this.activity.model.account.data.strengths = Array.prototype.slice.call(
                this.$strengthTagList.children().children().children("span").map(function (index, span) {
                    return {"name": span.innerHTML};
                })
            );

            this.navigateTo(this.activity.step2Controller.getRoute());
        }
    };
});

CS.Activities.IdentifyStrengths.Controllers.Step2 = P(CS.Activities.Controller, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {strengths: []};
        },

        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("h3", null, "Har du några egenskaper som du tycker är viktiga för rollen men som inte nämns i annonsen?"), 

                    React.createElement("p", {className: "help-text"}, "Kanske har du vitsord från tidigare anställningar eller rekommendationer skrivna av andra?" + ' ' +
                    "Försök lyfta egenskaper du tror skulle bidra till jobbet."), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("div", {className: "input-group"}, 
                            React.createElement("input", {type: "text", id: "other-strength", className: "form-control", placeholder: "t.ex. strategisk eller socialt smidig"}), 
                            React.createElement("span", {className: "input-group-btn"}, 
                                React.createElement("button", {type: "submit", className: "btn btn-default"}, "+ Lägg till")
                            )
                        ), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("p", {className: "field-error other-form-error strength-already-added"}, "Den här egenskapen har redan lagts till"), 

                    React.createElement("div", {className: "strength-taglist-container"}, 
                        React.createElement("ul", {className: "styleless"}, 
                            this.state.strengths.map(function (strength) {
                                return (
                                    React.createElement("li", null, 
                                        React.createElement("span", {className: "tag with-close-btn"}, 
                                            React.createElement("span", null, strength), 
                                            React.createElement("button", {type: "button", className: "close", "aria-label": "Close", onClick: this._handleRemoveStrengthClick}, 
                                                React.createElement("span", {"aria-hidden": "true"}, "×")
                                            )
                                        )
                                    )
                                    );
                            }.bind(this))
                        )
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default js-go-back"}, "Tillbaka"), 
                        React.createElement("button", {type: "button", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        },

        _handleRemoveStrengthClick: function (e) {
            var $li = $(e.currentTarget).parent().parent();

            CS.Services.Animator.fadeOut($li, function () {
                $li.remove();
            });
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$strengthField = this.$form.find("#other-strength");

        this.$strengthAlreadyAddedError = this.$form.find(".strength-already-added");

        this.$strengthTagList = this.$form.find(".strength-taglist-container").children();
        this.$goBackBtn = this.$form.find(".js-go-back");
        this.$goNextStepBtn = this.$form.find(".btn-primary");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "other-strength"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._addStrengthToList, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));
        this.$goNextStepBtn.click($.proxy(this._saveAndNavigateNext, this));
    };

    c._addStrengthToList = function (e) {
        e.preventDefault();

        this.validator.hideErrorMessage(this.$strengthAlreadyAddedError);

        if (this.validator.isValid()) {
            var strength = this.$strengthField.val().trim();

            if (this._isStrengthAlreadyInList(strength)) {
                this.validator.showErrorMessage(this.$strengthAlreadyAddedError);
            } else {
                var strengths = this.reactInstance.state.strengths;
                strengths.push(strength);

                this.reactInstance.replaceState({ strengths: strengths });

                this.$strengthField.val("");
            }
        }
    };

    c._isStrengthAlreadyInList = function (strength) {
        var strengthsAlreadyInput = this.activity.model.account.data.strengths;
        for (var i = 0; i < strengthsAlreadyInput.length; i++) {
            if (strengthsAlreadyInput[i].name.toLowerCase() === strength.toLowerCase()) {
                return true;
            }
        }

        var $listItems = this.$strengthTagList.children();

        for (i = 0; i < $listItems.length; i++) {
            var span = $($listItems[i]).children().children("span")[0];
            if (span.innerHTML.toLowerCase() === strength.toLowerCase()) {
                return true;
            }
        }

        return false;
    };

    c._saveAndNavigateNext = function () {
        // Because jQuery's "map()" function returns an object, see http://xahlee.info/js/js_convert_array-like.html
        var strengthsToAdd = Array.prototype.slice.call(
            this.$strengthTagList.children().children().children("span").map(function (index, span) {
                return {"name": span.innerHTML};
            })
        );

        this.activity.model.account.data.strengths = _.union(this.activity.model.account.data.strengths, strengthsToAdd);

        this.navigateTo(this.activity.step3Controller.getRoute());
    };
});

CS.Activities.IdentifyStrengths.Controllers.Step3 = P(CS.Activities.Controller, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {strengths: []};
        },

        render: function () {
            return (
                React.createElement("form", {role: "form", className: "how-well"}, 
                    React.createElement("h3", null, "Hur väl stämmer det här in på dig?"), 

                    this.state.strengths.map(function (strength) {
                        return (
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", null, strength.name), 
                                React.createElement("input", {type: "range", min: "1", max: "4"})
                            )
                            );
                    }), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$rangeInputs = this.$form.find("[type='range']");
        this.$goBackBtn = this.$form.find(".btn-default");
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.reactInstance.componentDidUpdate = function () {
            this.initElements();
            this._initSliders();
        }.bind(this);

        this.onReRender();

        /* TODO
         this.$sliders.each(function(index, element) {
         $(element).on("change", $.proxy(this._displayCurrentSliderText, this));
         }.bind(this); */
    };

    c.onReRender = function () {
        this.reactInstance.replaceState({strengths: this.activity.model.account.data.strengths});
    };

    c._initSliders = function () {
        this.$sliders = this.$rangeInputs.slider({
            min: 1,
            max: 4,
            value: 3,
            tooltip: "always",
            formatter: function (num) {
                switch (num) {
                    case 1:
                        return "Sådär";
                    case 2:
                        return "Hyfsat";
                    case 3:
                        return "Ganska väl";
                    case 4:
                        return "Fullständigt";
                }
            }
        });
    };

    /* TODO
     c._displayCurrentSliderText = function(e) {

     }; */

    c._saveAndNavigateNext = function (e) {
        e.preventDefault();

        this.activity.model.account.data.strengths = this.activity.model.account.data.strengths.map(function (strength, index) {
            var howWellItApplies = parseInt($(this.$sliders[index]).val(), 10);

            return {
                "name": strength.name,
                "howWellItApplies": howWellItApplies
            };
        }.bind(this));

        this.navigateTo(this.activity.step4Controller.getRoute());
    };
});

CS.Activities.IdentifyStrengths.Controllers.Step4 = P(CS.Activities.Controller, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                employer: null,
                position: null,
                strengths: []
            };
        },

        render: function () {
            return (
                React.createElement("form", {role: "form", className: "how-well"}, 
                    React.createElement("h3", null, "Hur viktiga tror du att ", React.createElement("strong", null, this.state.employer), " tycker att de här egenskaperna är för rollen som ", React.createElement("strong", null, this.state.position), "?"), 

                    this.state.strengths.map(function (strength) {
                        return (
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", null, strength.name), 
                                React.createElement("input", {type: "range", min: "1", max: "4"})
                            )
                            );
                    }), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$rangeInputs = this.$form.find("[type='range']");
        this.$goBackBtn = this.$form.find(".btn-default");
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.reactInstance.componentDidUpdate = function () {
            this.initElements();
            this._initSliders();
        }.bind(this);

        this.onReRender();
    };

    c.onReRender = function () {
        this.reactInstance.replaceState({
            position: this.activity.model.account.data.Position,
            employer: this.activity.model.account.data.Employer,
            strengths: this.activity.model.account.data.strengths
        });
    };

    c._initSliders = function () {
        this.$sliders = this.$rangeInputs.slider({
            min: 1,
            max: 4,
            value: 3,
            tooltip: "always",
            formatter: function (num) {
                switch (num) {
                    case 1:
                        return "Sådär";
                    case 2:
                        return "Viktigt";
                    case 3:
                        return "En stark fördel";
                    case 4:
                        return "Avgörande";
                }
            }
        });
    };

    c._saveAndNavigateNext = function (e) {
        e.preventDefault();

        this.activity.model.account.data.strengths = this.activity.model.account.data.strengths.map(function (strength, index) {
            var howImportantForEmployer = parseInt($(this.$sliders[index]).val(), 10);

            return {
                "name": strength.name,
                "howWellItApplies": strength.howWellItApplies,
                "howImportantForEmployer": howImportantForEmployer
            };
        }.bind(this));

        this.navigateTo(this.activity.step5Controller.getRoute());
    };
});

CS.Activities.IdentifyStrengths.Controllers.Step5 = P(CS.Activities.Controller, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {strengths: []};
        },

        render: function () {
            return (
                React.createElement("div", null, 
                    React.createElement("h3", null, "Toppen! Du har nu gjort en prioritering av dina starkaste egenskaper för din ansökan."), 

                    React.createElement("p", {className: "help-text"}, "När du börjar skriva din ansökan är det här sannolikt dina starkaste kort att lyfta fram och vi kommer därför att prioritera dem tre i kommande aktiviteter. De övriga sparas tillsvidare."), 

                    this.state.strengths.map(function (strength, index) {
                        return (
                            React.createElement("article", null, 
                                React.createElement("h2", null, index + 1, ". ", strength.name), 
                                React.createElement("p", null, "Stämmer ", React.createElement("strong", null, this._howWellDoesItApplyFormatter(strength.howWellItApplies)), " in på dig och är ", React.createElement("strong", null, this._howImportantForEmployerformatter(strength.howImportantForEmployer)), " för jobbet.")
                            )
                            );
                    }.bind(this)), 

                    React.createElement("div", {className: "centered-contents"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "button", className: "btn btn-primary", "data-loading-text": "Sparar..."}, "Gå vidare")
                    )
                )
                );
        },

        _howWellDoesItApplyFormatter: function (num) {
            switch (num) {
                case 1:
                    return "sådär";
                case 2:
                    return "hyfsat";
                case 3:
                    return "ganska väl";
                case 4:
                    return "fullständigt";
            }
        },

        _howImportantForEmployerformatter: function (num) {
            switch (num) {
                case 1:
                    return "sådär";
                case 2:
                    return "viktigt";
                case 3:
                    return "en stark fördel";
                case 4:
                    return "avgörande";
            }
        }
    });

    c.initElements = function () {
        this.$goBackBtn = this.$el.find(".btn-default");
        this.$submitBtn = this.$el.find(".btn-primary");
    };

    c.initEvents = function () {
        this.$goBackBtn.click($.proxy(this.navigateBack, this));
        this.$submitBtn.click($.proxy(this._handleSubmit, this));

        this.onReRender();
    };

    c.onReRender = function () {
        this.activity.model.account.data.strengths = CS.Models.Strength.sort(this.activity.model.account.data.strengths);
        this.reactInstance.replaceState({strengths: _.take(this.activity.model.account.data.strengths, 3)});

        // The submit button may still be in loading state when navigating back. We make sure it doesn't happen
        this.$submitBtn.button("reset");
    };

    c._handleSubmit = function () {
        this.$submitBtn.button("loading");

        this.postData();
    };
});

CS.Activities.SpecifyTop1Strength.Controllers.Intro = P(CS.Activities.Controller, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {title: null};
        },

        render: function () {
            return (
                React.createElement("div", null, 
                    React.createElement("h1", {dangerouslySetInnerHTML: {__html: this.state.title}}), 

                    React.createElement("p", null, "Visste du att de tre vanligast angivna egenskaperna i jobbansökningar är kreativ, analytisk och passionerad?"), 

                    React.createElement("p", null, "Vi använder ofta vaga termer när vi beskriver oss själva. Dessutom är egenskaperna som efterfrågas i jobbannonser" + ' ' +
                    "ofta ganska generiska eller tvetydigt formulerade."), 

                    React.createElement("p", null, "I den här övningen hjälper vi dig att definiera vad en specifik egenskap innebär för just dig och på vilket sätt det är en fördel för arbetsgivaren."), 

                    React.createElement("div", {className: "centered-contents"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "button", className: "btn btn-primary"}, "Sätt igång")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$goBackBtn = this.$el.find(".btn-default");
        this.$goNextStepBtn = this.$el.find(".btn-primary");
    };

    c.initEvents = function () {
        this.$goBackBtn.click($.proxy(this.nagivateToActivityFeed, this));
        this.$goNextStepBtn.click($.proxy(this._navigateNext, this));

        this.onReRender();
    };

    c.onReRender = function () {
        this.reactInstance.replaceState({title: this.activity.getTitle()});
    };

    c._navigateNext = function () {
        this.activity.model.account.data.strengths[0].specify = this.activity.model.account.data.strengths[0].specify || {};

        this.navigateTo(this.activity.step1Controller.getRoute());
    };
});

CS.Activities.SpecifyTop1Strength.Controllers.Outro = P(CS.Activities.Controller, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                nextActivity: null,
                strengthName: null,
                howWellItApplies: null,
                strengthForPosition: null
            };
        },

        render: function () {
            var reactKey = this.state.nextActivity ? this.state.nextActivity.getClassName() : _.uniqueId();

            return (
                React.createElement("div", null, 
                    React.createElement("p", {className: "well"}, "Jättebra! Du har nu definierat hur just du är ", React.createElement("strong", null, this.state.strengthName), " och vilket värde det har för jobbet du söker."), 

                    React.createElement("h2", null, "Definition"), 

                    React.createElement("p", {className: "well", dangerouslySetInnerHTML: {__html: this.state.howWellItApplies}}), 

                    React.createElement("h2", null, "Värde"), 

                    React.createElement("p", {className: "well", dangerouslySetInnerHTML: {__html: this.state.strengthForPosition}}), 

                    React.createElement(CS.Activities.Controller.NextStep, {key: reactKey, activity: this.state.nextActivity})
                )
                );
        }
    });

    c.initEvents = function () {
        this.onReRender();
    };

    c.onReRender = function () {
        var strength = this.activity.model.account.data.strengths[0];

        var howWellItAppliesAsHtml = CS.Services.String.textToHtml(strength.specify.howWellItApplies);
        var strengthForPositionAsHtml = CS.Services.String.textToHtml(strength.specify.strengthForPosition);

        this.reactInstance.replaceState({
            nextActivity: CS.activitiesModel.getNextActivity(),
            strengthName: strength.name,
            howWellItApplies: howWellItAppliesAsHtml,
            strengthForPosition: strengthForPositionAsHtml
        });
    };
});

CS.Activities.SpecifyTop1Strength.Controllers.Step1 = P(CS.Activities.Controller, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {strengthName: null};
        },

        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("p", null, "Vi börjar med att specificera egenskapen lite mer. Vad betyder ", React.createElement("strong", null, this.state.strengthName), " för dig?"), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("textarea", {id: "what-this-strength-means", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$whatItMeansField = this.$form.find("#what-this-strength-means");
        this.$goBackBtn = this.$form.find(".btn-default");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "what-this-strength-means"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.onReRender();
    };

    c.onReRender = function () {
        this.reactInstance.replaceState({strengthName: this.activity.model.account.data.strengths[0].name});
    };

    c._saveAndNavigateNext = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.activity.model.account.data.strengths[0].specify.whatItMeans = this.$whatItMeansField.val().trim();

            this.navigateTo(this.activity.step2Controller.getRoute());
        }
    };
});

CS.Activities.SpecifyTop1Strength.Controllers.Step2 = P(CS.Activities.Controller, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {whatItMeans: null};
        },

        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("p", null, "Gör nu definitionen till din egen. På vilket sätt stämmer det här in på dig?"), 

                    React.createElement("p", {className: "well", dangerouslySetInnerHTML: {__html: this.state.whatItMeans}}), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("textarea", {id: "how-well-it-applies", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$howWellItAppliesField = this.$form.find("#how-well-it-applies");
        this.$goBackBtn = this.$form.find(".btn-default");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "how-well-it-applies"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.onReRender();
    };

    c.onReRender = function () {
        var whatItMeansAsHtml = CS.Services.String.textToHtml(this.activity.model.account.data.strengths[0].specify.whatItMeans);

        this.reactInstance.replaceState({whatItMeans: whatItMeansAsHtml});
    };

    c._saveAndNavigateNext = function(e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.activity.model.account.data.strengths[0].specify.howWellItApplies = this.$howWellItAppliesField.val().trim();

            this.navigateTo(this.activity.step3Controller.getRoute());
        }
    };
});

CS.Activities.SpecifyTop1Strength.Controllers.Step3 = P(CS.Activities.Controller, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                position: null,
                employer: null
            };
        },

        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("p", {className: "well"}, "På vilket sätt kommer det att vara en styrka i rollen som ", React.createElement("strong", null, this.state.position), " på ", React.createElement("strong", null, this.state.employer), "?"), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("textarea", {id: "strength-for-position", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "submit", className: "btn btn-primary", "data-loading-text": "Sparar..."}, "Gå vidare")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$strengthForPositionField = this.$form.find("#strength-for-position");
        this.$goBackBtn = this.$form.find(".btn-default");
        this.$submitBtn = this.$form.find(".btn-primary");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength-for-position"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.onReRender();
    };

    c.onReRender = function () {
        this.reactInstance.replaceState({
            position: this.activity.model.account.data.Position,
            employer: this.activity.model.account.data.Employer
        });

        // The submit button may still be in loading state when navigating back. We make sure it doesn't happen
        this.$submitBtn.button("reset");
    };

    c._saveAndNavigateNext = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.$submitBtn.button("loading");

            this.activity.model.account.data.strengths[0].specify.strengthForPosition = this.$strengthForPositionField.val().trim();

            this.postData();
        }
    };
});

CS.Activities.SpecifyTop2Strength.Controllers.Intro = P(CS.Activities.Controller, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {title: null};
        },

        render: function () {
            return (
                React.createElement("div", null, 
                    React.createElement("h1", {dangerouslySetInnerHTML: {__html: this.state.title}}), 

                    React.createElement("p", null, "Visste du att de tre vanligast angivna egenskaperna i jobbansökningar är kreativ, analytisk och passionerad?"), 

                    React.createElement("p", null, "Vi använder ofta vaga termer när vi beskriver oss själva. Dessutom är egenskaperna som efterfrågas i jobbannonser" + ' ' +
                    "ofta ganska generiska eller tvetydigt formulerade."), 

                    React.createElement("p", null, "I den här övningen hjälper vi dig att definiera vad en specifik egenskap innebär för just dig och på vilket sätt det är en fördel för arbetsgivaren."), 

                    React.createElement("div", {className: "centered-contents"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "button", className: "btn btn-primary"}, "Sätt igång")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$goBackBtn = this.$el.find(".btn-default");
        this.$goNextStepBtn = this.$el.find(".btn-primary");
    };

    c.initEvents = function () {
        this.$goBackBtn.click($.proxy(this.nagivateToActivityFeed, this));
        this.$goNextStepBtn.click($.proxy(this._navigateNext, this));

        this.onReRender();
    };

    c.onReRender = function () {
        this.reactInstance.replaceState({title: this.activity.getTitle()});
    };

    c._navigateNext = function () {
        this.activity.model.account.data.strengths[1].specify = this.activity.model.account.data.strengths[1].specify || {};

        this.navigateTo(this.activity.step1Controller.getRoute());
    };
});

CS.Activities.SpecifyTop2Strength.Controllers.Outro = P(CS.Activities.Controller, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                nextActivity: null,
                strengthName: null,
                howWellItApplies: null,
                strengthForPosition: null
            };
        },

        render: function () {
            var reactKey = this.state.nextActivity ? this.state.nextActivity.getClassName() : _.uniqueId();

            return (
                React.createElement("div", null, 
                    React.createElement("p", {className: "well"}, "Jättebra! Du har nu definierat hur just du är ", React.createElement("strong", null, this.state.strengthName), " och vilket värde det har för jobbet du söker."), 

                    React.createElement("h2", null, "Definition"), 

                    React.createElement("p", {className: "well", dangerouslySetInnerHTML: {__html: this.state.howWellItApplies}}), 

                    React.createElement("h2", null, "Värde"), 

                    React.createElement("p", {className: "well", dangerouslySetInnerHTML: {__html: this.state.strengthForPosition}}), 

                    React.createElement(CS.Activities.Controller.NextStep, {key: reactKey, activity: this.state.nextActivity})
                )
                );
        }
    });

    c.initEvents = function () {
        this.onReRender();
    };

    c.onReRender = function () {
        var strength = this.activity.model.account.data.strengths[1];

        var howWellItAppliesAsHtml = CS.Services.String.textToHtml(strength.specify.howWellItApplies);
        var strengthForPositionAsHtml = CS.Services.String.textToHtml(strength.specify.strengthForPosition);

        this.reactInstance.replaceState({
            nextActivity: CS.activitiesModel.getNextActivity(),
            strengthName: strength.name,
            howWellItApplies: howWellItAppliesAsHtml,
            strengthForPosition: strengthForPositionAsHtml
        });
    };
});

CS.Activities.SpecifyTop2Strength.Controllers.Step1 = P(CS.Activities.Controller, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {strengthName: null};
        },

        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("p", null, "Vi börjar med att specificera egenskapen lite mer. Vad betyder ", React.createElement("strong", null, this.state.strengthName), " för dig?"), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("textarea", {id: "what-this-strength-means", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$whatItMeansField = this.$form.find("#what-this-strength-means");
        this.$goBackBtn = this.$form.find(".btn-default");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "what-this-strength-means"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.onReRender();
    };

    c.onReRender = function () {
        this.reactInstance.replaceState({strengthName: this.activity.model.account.data.strengths[1].name});
    };

    c._saveAndNavigateNext = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.activity.model.account.data.strengths[1].specify.whatItMeans = this.$whatItMeansField.val().trim();

            this.navigateTo(this.activity.step2Controller.getRoute());
        }
    };
});

CS.Activities.SpecifyTop2Strength.Controllers.Step2 = P(CS.Activities.Controller, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {whatItMeans: null};
        },

        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("p", null, "Gör nu definitionen till din egen. På vilket sätt stämmer det här in på dig?"), 

                    React.createElement("p", {className: "well", dangerouslySetInnerHTML: {__html: this.state.whatItMeans}}), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("textarea", {id: "how-well-it-applies", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$howWellItAppliesField = this.$form.find("#how-well-it-applies");
        this.$goBackBtn = this.$form.find(".btn-default");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "how-well-it-applies"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.onReRender();
    };

    c.onReRender = function () {
        var whatItMeansAsHtml = CS.Services.String.textToHtml(this.activity.model.account.data.strengths[1].specify.whatItMeans);

        this.reactInstance.replaceState({whatItMeans: whatItMeansAsHtml});
    };

    c._saveAndNavigateNext = function(e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.activity.model.account.data.strengths[1].specify.howWellItApplies = this.$howWellItAppliesField.val().trim();

            this.navigateTo(this.activity.step3Controller.getRoute());
        }
    };
});

CS.Activities.SpecifyTop2Strength.Controllers.Step3 = P(CS.Activities.Controller, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                position: null,
                employer: null
            };
        },

        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("p", {className: "well"}, "På vilket sätt kommer det att vara en styrka i rollen som ", React.createElement("strong", null, this.state.position), " på ", React.createElement("strong", null, this.state.employer), "?"), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("textarea", {id: "strength-for-position", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "submit", className: "btn btn-primary", "data-loading-text": "Sparar..."}, "Gå vidare")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$strengthForPositionField = this.$form.find("#strength-for-position");
        this.$goBackBtn = this.$form.find(".btn-default");
        this.$submitBtn = this.$form.find(".btn-primary");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength-for-position"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.onReRender();
    };

    c.onReRender = function () {
        this.reactInstance.replaceState({
            position: this.activity.model.account.data.Position,
            employer: this.activity.model.account.data.Employer
        });

        // The submit button may still be in loading state when navigating back. We make sure it doesn't happen
        this.$submitBtn.button("reset");
    };

    c._saveAndNavigateNext = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.$submitBtn.button("loading");

            this.activity.model.account.data.strengths[1].specify.strengthForPosition = this.$strengthForPositionField.val().trim();

            this.postData();
        }
    };
});

CS.Activities.SpecifyTop3Strength.Controllers.Intro = P(CS.Activities.Controller, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {title: null};
        },

        render: function () {
            return (
                React.createElement("div", null, 
                    React.createElement("h1", {dangerouslySetInnerHTML: {__html: this.state.title}}), 

                    React.createElement("p", null, "Visste du att de tre vanligast angivna egenskaperna i jobbansökningar är kreativ, analytisk och passionerad?"), 

                    React.createElement("p", null, "Vi använder ofta vaga termer när vi beskriver oss själva. Dessutom är egenskaperna som efterfrågas i jobbannonser" + ' ' +
                    "ofta ganska generiska eller tvetydigt formulerade."), 

                    React.createElement("p", null, "I den här övningen hjälper vi dig att definiera vad en specifik egenskap innebär för just dig och på vilket sätt det är en fördel för arbetsgivaren."), 

                    React.createElement("div", {className: "centered-contents"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "button", className: "btn btn-primary"}, "Sätt igång")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$goBackBtn = this.$el.find(".btn-default");
        this.$goNextStepBtn = this.$el.find(".btn-primary");
    };

    c.initEvents = function () {
        this.$goBackBtn.click($.proxy(this.nagivateToActivityFeed, this));
        this.$goNextStepBtn.click($.proxy(this._navigateNext, this));

        this.onReRender();
    };

    c.onReRender = function () {
        this.reactInstance.replaceState({title: this.activity.getTitle()});
    };

    c._navigateNext = function () {
        this.activity.model.account.data.strengths[2].specify = this.activity.model.account.data.strengths[2].specify || {};

        this.navigateTo(this.activity.step1Controller.getRoute());
    };
});

CS.Activities.SpecifyTop3Strength.Controllers.Outro = P(CS.Activities.Controller, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                nextActivity: null,
                strengthName: null,
                howWellItApplies: null,
                strengthForPosition: null
            };
        },

        render: function () {
            var reactKey = this.state.nextActivity ? this.state.nextActivity.getClassName() : _.uniqueId();

            return (
                React.createElement("div", null, 
                    React.createElement("p", {className: "well"}, "Jättebra! Du har nu definierat hur just du är ", React.createElement("strong", null, this.state.strengthName), " och vilket värde det har för jobbet du söker."), 

                    React.createElement("h2", null, "Definition"), 

                    React.createElement("p", {className: "well", dangerouslySetInnerHTML: {__html: this.state.howWellItApplies}}), 

                    React.createElement("h2", null, "Värde"), 

                    React.createElement("p", {className: "well", dangerouslySetInnerHTML: {__html: this.state.strengthForPosition}}), 

                    React.createElement(CS.Activities.Controller.NextStep, {key: reactKey, activity: this.state.nextActivity})
                )
                );
        }
    });

    c.initEvents = function () {
        this.onReRender();
    };

    c.onReRender = function () {
        var strength = this.activity.model.account.data.strengths[2];

        var howWellItAppliesAsHtml = CS.Services.String.textToHtml(strength.specify.howWellItApplies);
        var strengthForPositionAsHtml = CS.Services.String.textToHtml(strength.specify.strengthForPosition);

        this.reactInstance.replaceState({
            nextActivity: CS.activitiesModel.getNextActivity(),
            strengthName: strength.name,
            howWellItApplies: howWellItAppliesAsHtml,
            strengthForPosition: strengthForPositionAsHtml
        });
    };
});

CS.Activities.SpecifyTop3Strength.Controllers.Step1 = P(CS.Activities.Controller, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {strengthName: null};
        },

        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("p", null, "Vi börjar med att specificera egenskapen lite mer. Vad betyder ", React.createElement("strong", null, this.state.strengthName), " för dig?"), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("textarea", {id: "what-this-strength-means", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$whatItMeansField = this.$form.find("#what-this-strength-means");
        this.$goBackBtn = this.$form.find(".btn-default");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "what-this-strength-means"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.onReRender();
    };

    c.onReRender = function () {
        this.reactInstance.replaceState({strengthName: this.activity.model.account.data.strengths[2].name});
    };

    c._saveAndNavigateNext = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.activity.model.account.data.strengths[2].specify.whatItMeans = this.$whatItMeansField.val().trim();

            this.navigateTo(this.activity.step2Controller.getRoute());
        }
    };
});

CS.Activities.SpecifyTop3Strength.Controllers.Step2 = P(CS.Activities.Controller, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {whatItMeans: null};
        },

        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("p", null, "Gör nu definitionen till din egen. På vilket sätt stämmer det här in på dig?"), 

                    React.createElement("p", {className: "well", dangerouslySetInnerHTML: {__html: this.state.whatItMeans}}), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("textarea", {id: "how-well-it-applies", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$howWellItAppliesField = this.$form.find("#how-well-it-applies");
        this.$goBackBtn = this.$form.find(".btn-default");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "how-well-it-applies"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.onReRender();
    };

    c.onReRender = function () {
        var whatItMeansAsHtml = CS.Services.String.textToHtml(this.activity.model.account.data.strengths[2].specify.whatItMeans);

        this.reactInstance.replaceState({whatItMeans: whatItMeansAsHtml});
    };

    c._saveAndNavigateNext = function(e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.activity.model.account.data.strengths[2].specify.howWellItApplies = this.$howWellItAppliesField.val().trim();

            this.navigateTo(this.activity.step3Controller.getRoute());
        }
    };
});

CS.Activities.SpecifyTop3Strength.Controllers.Step3 = P(CS.Activities.Controller, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                position: null,
                employer: null
            };
        },

        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("p", {className: "well"}, "På vilket sätt kommer det att vara en styrka i rollen som ", React.createElement("strong", null, this.state.position), " på ", React.createElement("strong", null, this.state.employer), "?"), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("textarea", {id: "strength-for-position", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "submit", className: "btn btn-primary", "data-loading-text": "Sparar..."}, "Gå vidare")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$strengthForPositionField = this.$form.find("#strength-for-position");
        this.$goBackBtn = this.$form.find(".btn-default");
        this.$submitBtn = this.$form.find(".btn-primary");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength-for-position"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.onReRender();
    };

    c.onReRender = function () {
        this.reactInstance.replaceState({
            position: this.activity.model.account.data.Position,
            employer: this.activity.model.account.data.Employer
        });

        // The submit button may still be in loading state when navigating back. We make sure it doesn't happen
        this.$submitBtn.button("reset");
    };

    c._saveAndNavigateNext = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.$submitBtn.button("loading");

            this.activity.model.account.data.strengths[2].specify.strengthForPosition = this.$strengthForPositionField.val().trim();

            this.postData();
        }
    };
});

CS.Activities.Controller.NextStep = React.createClass({displayName: "NextStep",
    render: function () {
        var markup = null;

        if (this.props.activity) {
            markup = (
                React.createElement("div", null, 
                    React.createElement("section", {className: "alert alert-info"}, 
                        React.createElement("div", {className: "centered-contents"}, 
                            React.createElement("p", null, "Nästa steg"), 

                            React.createElement("h3", {dangerouslySetInnerHTML: {__html: this.props.activity.getTitle()}}), 

                            React.createElement("div", {className: "centered-contents"}, 
                                React.createElement("button", {type: "button", className: "btn btn-default", onClick: this._navigateBack}, "Tillbaka"), 
                                React.createElement("button", {type: "button", className: "btn btn-primary", onClick: this._launchNextActivity}, "Sätt igång")
                            )
                        )
                    ), 

                    React.createElement("div", {className: "centered-contents"}, 
                        React.createElement("span", null, "eller"), " ", React.createElement("a", {onClick: this._navigateToInsights}, "gå till dina insikter")
                    )
                )
                );
        } else {
            markup = (
                React.createElement("div", {className: "centered-contents"}, 
                    React.createElement("button", {type: "button", className: "btn btn-default", onClick: this._navigateBack}, "Tillbaka"), 
                    React.createElement("button", {type: "button", className: "btn btn-primary", onClick: this._navigateToInsights}, "Gå till dina insikter")
                )
                );
        }

        return (
            React.createElement("div", null, 
                markup
            )
            );
    },

    _navigateBack: function () {
        history.back();
    },

    _launchNextActivity: function () {
        location.hash = "activities/" + this.props.activity.getClassName();
    },

    _navigateToInsights: function () {
        location.hash = "insights";
    }
});
;CS.Standouts = {};

CS.Standouts.Base = P(function (c) {
    c.$emptyStandoutsMessage = $("#empty-standouts-message");

    c.init = function (className) {
        this.className = className;

        this.$el = $("#standouts").find("#" + this.className + "-standout-wrapper");

        this._render();
    };

    c.getClassName = function () {
        return this.className;
    };

    c.getReactInstance = function() {
        return this.reactInstance;
    };

    c.initModel = function() {
        this.model = {
            account: {
                data: _.clone(CS.account.data, true) || {}
            }
        };
    };

    c._render = function() {
        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$el[0]
        );
    };
});
;CS.Standouts.Strengths = P(CS.Standouts.Base, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                strengths: []
            };
        },

        render: function () {
            return (
                React.createElement("ul", {className: "styleless"}, 
                    this.state.strengths.map(function (strength) {
                        return React.createElement("li", null, strength.name);
                    })
                )
                );
        }
    });

    c.init = function (className) {
        base.init.call(this, className);
    };

    c.reRender = function() {
        this.initModel();

        var strengths = this.model.account.data.strengths;

        if (!_.isEmpty(strengths)) {
            this.$emptyStandoutsMessage.hide();
        }

        this.reactInstance.replaceState({
            strengths: strengths
        });
    };
});

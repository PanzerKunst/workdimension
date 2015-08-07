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
;function classNames() {
	var classes = '';
	var arg;

	for (var i = 0; i < arguments.length; i++) {
		arg = arguments[i];
		if (!arg) {
			continue;
		}

		if ('string' === typeof arg || 'number' === typeof arg) {
			classes += ' ' + arg;
		} else if (Object.prototype.toString.call(arg) === '[object Array]') {
			classes += ' ' + classNames.apply(null, arg);
		} else if ('object' === typeof arg) {
			for (var key in arg) {
				if (!arg.hasOwnProperty(key) || !arg[key]) {
					continue;
				}
				classes += ' ' + key;
			}
		}
	}
	return classes.substr(1);
}

// safely export classNames in case the script is included directly on a page
if (typeof module !== 'undefined' && module.exports) {
	module.exports = classNames;
}
;// Base namespace
var CS = {};

// Additional namespaces
CS.Models = {};
CS.Controllers = {};
CS.Services = {};

// Global objects
CS.account = {
    id: null,
    email: null,
    data: null
};
CS.router = new Grapnel();

CS.animationDuration = {
    default: 0.5,
    short: 0.2
};

CS.workbookAreas = [];

CS.blueprintAreasModel = null;
CS.mainMenuController = null;
CS.taskNotificationsController = null;
CS.overviewController = null;
CS.workbookAreaController = null;
CS.blueprintAreasSelector = null;

CS.Controllers.ThreeStandoutPanel = {};

// Global functions
CS.saveAccountData = function (callback) {
    var type = "POST";
    var url = "/api/account-data";

    $.ajax({
        url: url,
        type: type,
        contentType: "application/json",
        data: JSON.stringify(CS.account.data),
        success: function () {
            if (callback) {
                callback();
            }
        },
        error: function () {
            alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
        }
    });

    if (CS.taskNotificationsController) {
        CS.taskNotificationsController.reRender();
    }
};
;CS.Services.Browser = {
    cssRules: function () {
        if (CS.Services.Browser.allCssRules) {
            return CS.Services.Browser.allCssRules;
        }

        CS.Services.Browser.allCssRules = {};

        var styleSheets = document.styleSheets;

        for (var i = 0; i < styleSheets.length; i++) {
            var styleSheet = styleSheets[i];
            var styleSheetRules = styleSheet.cssRules || styleSheet.rules;  // .rules for IE, .cssRules for other browsers

            if (styleSheetRules) {
                for (var j = 0; j < styleSheetRules.length; j++) {
                    var rule = styleSheetRules[j];
                    CS.Services.Browser.allCssRules[rule.selectorText] = rule.style;
                }
            }
        }

        return CS.Services.Browser.allCssRules;
    },

    getCssRule: function (selector, property) {
        return CS.Services.Browser.cssRules()[selector].getPropertyValue(property);
    },

    addUserAgentAttributeToHtmlTag: function () {
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
    },

    saveInLocalStorage: function (key, value) {
        if (Modernizr.localstorage) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    },

    getFromLocalStorage: function (key) {
        if (Modernizr.localstorage) {
            return JSON.parse(localStorage.getItem(key));
        }
    },

    removeFromLocalStorage: function (key) {
        if (Modernizr.localstorage) {
            localStorage.removeItem(key);
        }
    },

    isIOS: function() {
        return /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
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
            if (!this._isMaxLength($field.val().trim(), $field.attr("maxLength"))) {
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
    fadeIn: function ($el, params) {
        if (!$el.is(":visible")) {
            var animationDuration = params && _.isNumber(params.animationDuration) ? params.animationDuration : CS.animationDuration.default;
            var alpha = params && _.isNumber(params.opacity) ? params.opacity : 1;

            TweenLite.set($el, {display: "block", alpha: 0});
            TweenLite.to($el, animationDuration, {
                alpha: alpha,
                onComplete: function () {
                    if (params && _.isFunction(params.onComplete)) {
                        params.onComplete();
                    }
                }
            });
        }
    },
    fadeOut: function ($el, params) {
        if ($el.is(":visible")) {
            var animationDuration = params && _.isNumber(params.animationDuration) ? params.animationDuration : CS.animationDuration.default;

            TweenLite.to($el, animationDuration, {
                alpha: 0,
                onComplete: function () {
                    $el.hide().css("opacity", 1);
                    if (params && _.isFunction(params.onComplete)) {
                        params.onComplete();
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
;CS.Services.Keyboard = {
    keyCode: {
        backspace: 8,
        tab: 9,
        enter: 13,
        shift: 16,
        ctrl: 17,
        alt: 18,
        escape: 27,
        space: 32
    },

    isPressedKeyText: function (e) {
        var keyCode = e.keyCode;

        return keyCode !== this.keyCode.tab &&
            keyCode !== this.keyCode.enter &&
            keyCode !== this.keyCode.shift &&
            keyCode !== this.keyCode.ctrl &&
            keyCode !== this.keyCode.alt &&
            keyCode !== this.keyCode.escape &&
            keyCode !== this.keyCode.space;
    }
};
;CS.Models.BlueprintArea = P(function (c) {
    c.init = function (id, className, humanReadableClassName, blueprintCategoryId, title) {
        this.id = id;
        this.className = className;
        this.humanReadableClassName = humanReadableClassName;
        this.blueprintCategoryId = blueprintCategoryId;
        this.title = title;
    };

    c.isActive = function () {
        if (!CS.account.data || !CS.account.data.activeBlueprintAreas) {
            return false;
        }

        return CS.account.data.activeBlueprintAreas.indexOf(this.className) > -1;
    };

    c.activate = function () {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};
                CS.account.data.activeBlueprintAreas = CS.account.data.activeBlueprintAreas || [];
                CS.account.data.activeBlueprintAreas.push(this.className);

                CS.saveAccountData();
                CS.blueprintAreasModel.updateStatus();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    };

    c.deactivate = function () {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};
                CS.account.data.activeBlueprintAreas = CS.account.data.activeBlueprintAreas || [];
                _.remove(CS.account.data.activeBlueprintAreas, function(className) {
                    return className === this.className;
                }.bind(this));

                CS.saveAccountData();
                CS.blueprintAreasModel.updateStatus();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    };
});
;CS.Models.BlueprintAreas = P(function (c) {
    c.nbDefaultActiveBlueprintAreas = 3;

    c.init = function () {
        this.blueprintAreaInstances = CS.workbookAreas.map(function (item) {
            return CS.Models.BlueprintArea(
                item.id,
                item.className,
                item.humanReadableClassName,
                item.workbookCategoryId,
                item.title
            );
        });

        this.isInitial = true;
    };

    c.updateStatus = function () {
        this.blueprintAreas = {
            active: [],
            inactive: []
        };

        this._updateStatus();
    };

    c.getActive = function () {
        return this.blueprintAreas.active;
    };

    c.getInactive = function () {
        return this.blueprintAreas.inactive;
    };

    c.getOfId = function(id) {
        return _.find(this.blueprintAreaInstances, "id", id);
    };

    c._updateStatus = function () {
        this.blueprintAreaInstances.forEach(function (instance) {
            if (instance.isActive()) {
                this.blueprintAreas.active.push(instance);
            } else {
                this.blueprintAreas.inactive.push(instance);
            }
        }.bind(this));

        // If none is active, we set the top-N priority as active
        if (this.isInitial && _.isEmpty(this.blueprintAreas.active)) {
            this._activateSeveral(_.take(this.blueprintAreaInstances, this.nbDefaultActiveBlueprintAreas));
        }

        if (CS.overviewController) {
            CS.overviewController.reRender();
        }
        if (CS.mainMenuController) {
            CS.mainMenuController.reRender();
        }

        this.isInitial = false;
    };

    c._activateSeveral = function(instancesToActivate) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};
                CS.account.data.activeBlueprintAreas = CS.account.data.activeBlueprintAreas || [];
                instancesToActivate.forEach(function(instanceToActivate) {
                    CS.account.data.activeBlueprintAreas.push(instanceToActivate.className);
                    this.blueprintAreas.active.push(instanceToActivate);
                    this.blueprintAreas.inactive = _.without(this.blueprintAreas.inactive, instanceToActivate);
                }.bind(this));

                CS.saveAccountData();
                CS.blueprintAreasModel.updateStatus();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    };
});
;CS.Models.WorkbookAreaTask = P(function (c) {
    c.init = function (id, level, workbookAreaId, previousTaskId, isActiveFunction, wordings, stepCount, templateClassName, comingUpNextText) {
        this.id = id;
        this.level = level;
        this.workbookAreaId = workbookAreaId;
        this.previousTaskId = previousTaskId;
        this.isActiveFunction = isActiveFunction;
        this.wordings = wordings;
        this.stepCount = stepCount;
        this.templateClassName = templateClassName;
        this.comingUpNextText = comingUpNextText;
    };
});
;CS.Models.WorkbookAreaTaskCommon = {
    minItemCountForAddItemsLvl1TaskComplete: 3,
    minItemCountForAddItemsLvl2TaskComplete: 5,

    getNextWording: function (areaTask) {
        var firstNotSkipped = _.find(areaTask.wordings, function (wording) {
            return !_.includes(CS.Services.Browser.getFromLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts(areaTask.getWorkbookArea().id)), wording.prompt);
        }.bind(this));

        if (firstNotSkipped) {
            return firstNotSkipped;
        }

        // All have been skipped, we need to unskip them all
        this._unskipAll(areaTask.getWorkbookArea().id);

        return _.find(areaTask.wordings, function (wording) {
            return !_.includes(CS.Services.Browser.getFromLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts(areaTask.getWorkbookArea().id)), wording.prompt);
        }.bind(this));
    },

    getLocalStorageKeyForSkippedTaskPrompts: function (workbookAreaId) {
        return "skippedTaskPrompts-" + workbookAreaId;
    },

    _unskipAll: function (workbookAreaId) {
        CS.Services.Browser.removeFromLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts(workbookAreaId));
    }
};
;CS.Models.WorkbookItemTaskCommon = {
    minItemCountForAddItemsTaskComplete: 1,

    getNextWording: function (itemTask, itemIndex) {
        var firstNotSkipped = _.find(itemTask.wordings, function (wording) {
            return !_.includes(CS.Services.Browser.getFromLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts(itemTask.getWorkbookArea().id, itemIndex)), wording.prompt);
        }.bind(this));

        if (firstNotSkipped) {
            return firstNotSkipped;
        }

        // All have been skipped, we need to unskip them all
        this._unskipAll(itemTask.getWorkbookArea().id, itemIndex);

        return _.find(itemTask.wordings, function (wording) {
            return !_.includes(CS.Services.Browser.getFromLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts(itemTask.getWorkbookArea().id, itemIndex)), wording.prompt);
        }.bind(this));
    },

    getLocalStorageKeyForSkippedTaskPrompts: function (workbookAreaId, workbookItemIndex) {
        return "skippedTaskPrompts-" + workbookAreaId + "-" + workbookItemIndex;
    },

    _unskipAll: function (workbookAreaId, workbookItemIndex) {
        CS.Services.Browser.removeFromLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts(workbookAreaId, workbookItemIndex));
    }
};
;CS.Controllers.Base = P(function(c) {
    c.httpStatusCode = {
        ok: 200,
        noContent: 204,
        emailAlreadyRegistered: 230,
        linkedInAccountIdAlreadyRegistered: 231
    };

    c.isTemporaryAccount = function () {
        return CS.account.id < 0;
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
;CS.Controllers.Texts = [
    {
        type: "workbook-area-description",
        workbookAreaClassName: "Strengths",
        htmlText: "<p>Vad utmärker dig som person? Vilka styrkor använder du för att få jobbet gjort? Från vilket perspektiv ser du på tillvaron? </p><p>I det här avsnittet av Tracks kommer du att besvara frågor om vad som är utmärkande för hur du gör ditt jobb. </p>"
    },
    {
        type: "workbook-area-description",
        workbookAreaClassName: "Drivers",
        htmlText: "<p>När du presenterar dig är det bra att berätta något om vad som driver dig att göra det du gör och vilka dina motivationskrafter är. Det gör bilden av dig mer levande och det blir lättare att lägga dig på minnet. Dessutom visar det att du har självinsikt och vet vad du söker och vad du vill ha.</p><p>I det här avsnittet av Tracks kommer du att besvara frågor om dina motivationskrafter.</p>"
    },
    {
        type: "workbook-area-description",
        workbookAreaClassName: "Contexts",
        htmlText: "<p>TODO</p>"
    },
    {
        type: "workbook-area-description",
        workbookAreaClassName: "Workplace",
        htmlText: "<p>TODO</p>"
    },
    {
        type: "workbook-area-description",
        workbookAreaClassName: "Achievements",
        htmlText: "<p>Först lär man sig gå och sen lär man sig springa. Vad du har åstadkommit är en plattform för vad du kan åstadkomma i framtiden.</p><p>I det här avsnittet fokuserar vi på vad du åstadkommit, vilken skillnad du gjort och vad som blivit bättre medan du haft ditt senaste jobb.</p>"
    },
    {
        type: "workbook-area-description",
        workbookAreaClassName: "Coworkers",
        htmlText: "<p>TODO</p>"
    },
    {
        type: "workbook-area-description",
        workbookAreaClassName: "Culture",
        htmlText: "<p>TODO</p>"
    },
    {
        type: "workbook-area-description",
        workbookAreaClassName: "Expertise",
        htmlText: "<p>TODO</p>"
    },
    {
        type: "workbook-area-description",
        workbookAreaClassName: "Leadership",
        htmlText: "<p>TODO</p>"
    },
    {
        type: "workbook-area-description",
        workbookAreaClassName: "Lesses",
        htmlText: "<p>TODO</p>"
    },
    {
        type: "workbook-area-description",
        workbookAreaClassName: "ManagementStyle",
        htmlText: "<p>TODO</p>"
    },
    {
        type: "workbook-area-description",
        workbookAreaClassName: "Mores",
        htmlText: "<p>Ett av de enklaste och mest effektiva sätten att utvecklas mot ett mer meningsfullt yrkesliv är att aktivt göra mer av det man gillar och mindre av det man inte gillar. Ett första steg i den riktningen är att identifiera vad det är man gärna vill göra mer av.</p><p>I det här avsnittet av Tracks kommer du att identifiera vad du vill göra mer av i ditt nuvarande jobb och när du tar dig an nästa utmaning.</p>"
    },
    {
        type: "workbook-area-description",
        workbookAreaClassName: "Employers",
        htmlText: "<p>TODO</p>"
    },
    {
        type: "workbook-area-description",
        workbookAreaClassName: "PhaseAndSize",
        htmlText: "<p>TODO</p>"
    },
    {
        type: "workbook-area-description",
        workbookAreaClassName: "Projects",
        htmlText: "<p>TODO</p>"
    },
    {
        type: "workbook-area-description",
        workbookAreaClassName: "Roles",
        htmlText: "<p>TODO</p>"
    },
    {
        type: "workbook-area-description",
        workbookAreaClassName: "ToolsAndMethods",
        htmlText: "<p>De verktyg och metoder vi använder i jobbet blir ofta en del av vår yrkesidentitet. Man kan ha starka åsikter om vilka verktyg som fungerar bäst och vilka som fungerar mindre bra. Eller om vilka metoder man helst använder och vilka man försöker undvika.</p><p>I det här avsnittet av Tracks kommer du att lista verktyg och metoder som är viktiga i ditt jobb.</p>"
    },
    {
        type: "workbook-area-description",
        workbookAreaClassName: "Tracks",
        htmlText: "<p>Det här området av Tracks handlar om vilka olika vägar du skulle kunna ta; vilka spår du skulle kunna följa.</p><p>Fundera på olika spår du skulle kunna tänka dig att prova någon gång i livet. Ett spår att följa kan vara alltifrån en roll du gärna skulle vilja ha, till en bransch du tycker verkar spännande eller en hobby du vill plocka upp och göra något mer av.</p>"
    },
    {
        type: "workbook-area-description",
        workbookAreaClassName: "Values",
        htmlText: "<p>TODO</p>"
    }
];
;CS.Controllers.WorkbookCommon = {
    fontSizeLargeScreen: 22,
    fontSizeMediumScreen: 18,
    listItemEditModeClass: "editing",
    entityTypes: {
        workbookArea: "workbookArea",
        workbookItem: "workbookItem"
    },

    resetAndHideForm: function ($textarea, callback, textareaDefaultHeightPx) {
        $textarea.val(null);
        $textarea.css("height", textareaDefaultHeightPx);

        if (callback) {
            callback();
        }
    },

    getTextareaDefaultHeight: function ($textarea, textareaDefaultHeightPx, mediumScreenTextareaDefaultHeightPx, largeScreenTextareaDefaultHeightPx) {
        var fontSizeStr = $textarea.css("font-size");
        var fontSizePx = parseFloat(fontSizeStr.substring(0, fontSizeStr.indexOf("px")));

        if (fontSizePx > this.fontSizeLargeScreen) {
            return largeScreenTextareaDefaultHeightPx;
        }
        if (fontSizePx > this.fontSizeMediumScreen) {
            return mediumScreenTextareaDefaultHeightPx;
        }
        return textareaDefaultHeightPx;
    },

    setProgressBarWidth: function ($progressBar, itemCount, stepCount) {
        var itemPercent = itemCount / stepCount * 100;

        if (itemPercent > 100) {
            itemPercent = 100;
        }

        $progressBar.attr("aria-valuenow", itemPercent);
        $progressBar.css("width", itemPercent + "%");
        $progressBar.html(parseInt(itemPercent, 10) + "%");
    },

    saveAreaDescriptionAsClosed: function(workbookAreaId) {
        var idOfClosedAreaDescriptionPanels = CS.account.data.idOfClosedAreaDescriptionPanels || [];

        if (!_.includes(idOfClosedAreaDescriptionPanels, workbookAreaId)) {
            idOfClosedAreaDescriptionPanels.push(workbookAreaId);
            CS.account.data.idOfClosedAreaDescriptionPanels = idOfClosedAreaDescriptionPanels;
            CS.saveAccountData();
        }
    }
};
;CS.Controllers.WorkbookAreaCommon = {
    textareaDefaultHeightPx: 41,
    mediumScreenTextareaDefaultHeightPx: 53,
    largeScreenTextareaDefaultHeightPx: 65,
    noteIndicatorUnitLengthEm: 2.5,
    customAreaTaskTemplateClassName: "WorkbookAreaCustomTask",
    customItemTaskTemplateClassName: "WorkbookItemCustomTask",

    handleTextareaKeyUp: function (e, formSubmitFunction, formCancelFunction) {
        if (e.keyCode === CS.Services.Keyboard.keyCode.enter && formSubmitFunction) {
            formSubmitFunction();
        } else if (e.keyCode === CS.Services.Keyboard.keyCode.escape && formCancelFunction) {
            formCancelFunction();
        } else {
            var $textarea = $(e.currentTarget);
            CS.Controllers.WorkbookAreaCommon.adaptTextareaHeight($textarea);
        }
    },

    adaptTextareaHeight: function ($textarea) {
        var lineHeight = parseInt($textarea.css("lineHeight"), 10);
        var padding = parseInt($textarea.css("paddingTop"), 10) + parseInt($textarea.css("paddingBottom"), 10);
        var lineCount = Math.floor(($textarea.prop("scrollHeight") - padding) / lineHeight);

        var currentTextAreaHeightPx = parseFloat($textarea.css("height"));
        var newTextAreaHeightPx = this._getTextareaDefaultHeight($textarea) - lineHeight + lineCount * lineHeight;

        if (newTextAreaHeightPx !== currentTextAreaHeightPx) {
            $textarea.css("height", newTextAreaHeightPx);

            if (CS.overviewController) {
                CS.overviewController.rePackerise();
            }
        }
    },

    resetAndHideForm: function ($textarea, callback) {
        CS.Controllers.WorkbookCommon.resetAndHideForm($textarea, callback, this.textareaDefaultHeightPx);
    },

    doesItemAlreadyExist: function(itemName, workbookAreaClassName) {
        if (!CS.account.data || _.isEmpty(CS.account.data[workbookAreaClassName])) {
            return false;
        }

        var areaItems = CS.account.data[workbookAreaClassName];
        return !_.isEmpty(_.find(areaItems, "name", itemName));
    },

    handleWorkbookItemsReordered: function($listItems, workbookAreaClassName, callback) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var newlyOrderedItems = [];

                $listItems.each(function () {
                    var itemName = $(this).children("p").text();
                    newlyOrderedItems.push(_.find(CS.account.data[workbookAreaClassName], "name", itemName));
                });

                CS.account.data[workbookAreaClassName] = newlyOrderedItems;
                CS.saveAccountData();

                if (callback) {
                    callback();
                }
            },
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    },

    disableSortable: function(controller) {
        controller.sortable.option("disabled", true);
    },

    enableSortable: function(controller) {
        controller.sortable.option("disabled", false);
    },

    initNotesIndicator: function($notesIndicator, noteCount) {
        $notesIndicator.css("width", (noteCount * CS.Controllers.WorkbookAreaCommon.noteIndicatorUnitLengthEm) + "em");
    },

    showAreaDescription: function () {
        $(".add-item-link").hide();

        CS.Services.Animator.fadeOut($(".workbook-task"), {
            animationDuration: CS.animationDuration.short,
            onComplete: function () {
                CS.Services.Animator.fadeIn($("#area-description"));
            }
        });

        ga("send", "event", "button", "click", "Workbook Area > Shown area description");
    },

    _getTextareaDefaultHeight: function($textarea) {
        return CS.Controllers.WorkbookCommon.getTextareaDefaultHeight($textarea, this.textareaDefaultHeightPx, this.mediumScreenTextareaDefaultHeightPx, this.largeScreenTextareaDefaultHeightPx);
    }
};
;CS.Controllers.WorkbookItemCommon = {
    textareaDefaultHeightPx: 70,
    mediumScreenTextareaDefaultHeightPx: 91,
    largeScreenTextareaDefaultHeightPx: 112,

    handleTextareaKeyUp: function (e, formCancelFunction) {
        if (e.keyCode === CS.Services.Keyboard.keyCode.escape && formCancelFunction) {
            formCancelFunction();
        } else {
            var $textarea = $(e.currentTarget);
            CS.Controllers.WorkbookItemCommon.adaptTextareaHeight($textarea);
        }
    },

    adaptTextareaHeight: function ($textarea) {
        var lineHeight = parseInt($textarea.css("lineHeight"), 10);
        var padding = parseInt($textarea.css("paddingTop"), 10) + parseInt($textarea.css("paddingBottom"), 10);
        var scrollHeight = Math.floor(($textarea.prop("scrollHeight") - padding));
        var currentTextAreaHeightPx = parseFloat($textarea.css("height"));

        var difference = scrollHeight - currentTextAreaHeightPx;

        if (difference > 0) {
            var linesCount = Math.ceil(difference / lineHeight);
            $textarea.css("height", currentTextAreaHeightPx + lineHeight * linesCount);
        }
    },

    resetAndHideForm: function ($textarea, callback) {
        CS.Controllers.WorkbookCommon.resetAndHideForm($textarea, callback, this.textareaDefaultHeightPx);
    },

    doesItemAlreadyExist: function(note, workbookAreaClassName, workbookItemIndex) {
        if (_.isEmpty(CS.account.data[workbookAreaClassName][workbookItemIndex].notes)) {
            return false;
        }

        var itemNotes = CS.account.data[workbookAreaClassName][workbookItemIndex].notes;
        return _.includes(itemNotes, note);
    },

    _getTextareaDefaultHeight: function($textarea) {
        return CS.Controllers.WorkbookCommon.getTextareaDefaultHeight($textarea, this.textareaDefaultHeightPx, this.mediumScreenTextareaDefaultHeightPx, this.largeScreenTextareaDefaultHeightPx);
    }
};
;CS.Controllers.GetStartedPanel = P(function (c) {
    c.init = function () {
        this._initElements();
        this._initEvents();
        this._showPanelIfNeverClosed();
    };

    c._initElements = function () {
        this.$mainContainer = $("#container");
        this.$contentOverlayWhenMenuOpen = this.$mainContainer.find("#content-overlay-when-menu-open");
        this.$toggleBtn = this.$mainContainer.find("#top-bar").children(".fa-question-circle");
        this.$getStartedPanel = this.$mainContainer.find("#get-started");
    };

    c._initEvents = function () {
        this.$toggleBtn.click(this._togglePanel.bind(this));
        this.$contentOverlayWhenMenuOpen.click(this._hidePanel.bind(this));
    };

    c._showPanelIfNeverClosed = function() {
        if (!CS.account.data || !CS.account.data.hasClosedGetStartedPanel) {
            this._showPanel();
        }
    };

    c._togglePanel = function() {
        if (this.$getStartedPanel.is(":visible")) {
            this._hidePanel();
        } else {
            this._showPanel();
        }

        ga("send", "event", "button", "click", "Toggle Get Started panel");
    };

    c._showPanel = function() {
        CS.Services.Animator.fadeIn(this.$getStartedPanel, {
            animationDuration: CS.animationDuration.short,
            opacity: 0.95,
            onComplete: function() {
                this.$mainContainer.addClass("get-started-section-open");
            }.bind(this)
        });
    };

    c._hidePanel = function() {
        if (!CS.account.data || !CS.account.data.hasClosedGetStartedPanel) {
            this._fetchLatestAccountDataAndUpdateIt();
        }

        CS.Services.Animator.fadeOut(this.$getStartedPanel, {
            animationDuration: CS.animationDuration.short,
            onComplete: function() {
                this.$mainContainer.removeClass("get-started-section-open");
            }.bind(this)
        });
    };

    c._fetchLatestAccountDataAndUpdateIt = function () {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                if (!CS.account.data.hasClosedGetStartedPanel) {
                    CS.account.data.hasClosedGetStartedPanel = true;
                    CS.saveAccountData();
                }
            },
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    };
});
;// This controller is seperate from the main menu because initialized by LinkedIn platform
CS.Controllers.MainMenuLinkedInAuthenticator = P(CS.Controllers.Base, function (c) {
    c.init = function () {
        this._initElements();
        this._initEvents();
    };

    c._initElements = function () {
        this.$signInWithLinkedInBtn = $(".sign-in-with-linkedin");
        this.$signInBtnSpan = this.$signInWithLinkedInBtn.children("span");
        this.$signInBtnSpinner = this.$signInWithLinkedInBtn.children(".fa-spinner");

        this.$signOutLink = $("#sign-out");
        this.$signInModal = $("#sign-in-modal");
    };

    c._initEvents = function () {
        this.$signInWithLinkedInBtn.click(this._signInWithLinkedIn.bind(this));
        this.$signOutLink.click(this._signOut.bind(this));
        IN.Event.on(IN, "auth", this._signIn.bind(this));
    };

    c._signInWithLinkedIn = function () {
        IN.User.authorize(this._saveProfileData, this);

        ga("send", "event", "button", "click", "Sign in with linkedIn");
    };

    c._saveProfileData = function () {
        IN.API.Raw("/people/~:(id,first-name,last-name,maiden-name,formatted-name,phonetic-first-name,phonetic-last-name,formatted-phonetic-name,headline,location,industry,current-share,num-connections,num-connections-capped,summary,specialties,positions,picture-url,picture-urls::(original),site-standard-profile-request,api-standard-profile-request,public-profile-url,email-address)")
            .result(function (data) {
                this._checkIfAccountExists(data);
            }.bind(this))
            .error(function (error) {
                alert("Error while signing-in with LinkedIn: " + error);
            });
    };

    c._checkIfAccountExists = function (linkedInAccountData) {
        var type = "GET";
        var url = "/api/accounts/" + linkedInAccountData.id;

        $.ajax({
            url: url,
            type: type,
            success: function (data, textStatus, jqXHR) {
                if (jqXHR.status === this.httpStatusCode.noContent) {
                    this._createAccount(linkedInAccountData);
                }
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    };

    c._signIn = function () {
        if (this.isTemporaryAccount()) {
            this._spin();

            IN.API.Profile("me").result(function (profiles) {
                var type = "POST";
                var url = "/api/auth?linkedinAccountId=" + profiles.values[0].id;

                $.ajax({
                    url: url,
                    type: type,
                    success: function (data, textStatus, jqXHR) {
                        if (jqXHR.status === this.httpStatusCode.ok) {
                            this._loadAccountData(data);
                        }
                    }.bind(this),
                    error: function () {
                        alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
                    }
                });
            }.bind(this));
        }
    };

    c._createAccount = function (linkedInAccountData) {
        var data = {
            emailAddress: linkedInAccountData.emailAddress.trim(),
            linkedInAccountId: linkedInAccountData.id.trim()
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
                    alert("Trying to create an account for an already registered email address. This is a bug!");
                } else if (jqXHR.status === this.httpStatusCode.linkedInAccountIdAlreadyRegistered) {
                    alert("Trying to create an account for an already registered LinkedIn account ID. This is a bug!");
                } else {
                    this._loadAccountData(d4ta);
                }
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    };

    c._loadAccountData = function (data) {
        CS.account.id = data.accountId;
        CS.account.data = data.accountData;

        this.$signInWithLinkedInBtn.hide();
        this.$signOutLink.show();
        this.$signInModal.modal("hide");

        CS.mainMenuController.hideMenu();

        CS.blueprintAreasModel = CS.Models.BlueprintAreas();
        CS.blueprintAreasModel.updateStatus();

        CS.taskNotificationsController.reRender();
    };

    c._signOut = function () {
        IN.User.logout(CS.mainMenuController.signOut, this);

        ga("send", "event", "link", "click", "Sign out");
    };

    c._spin = function () {
        this.$signInBtnSpan.hide();
        this.$signInBtnSpinner.show();
    };
});
;CS.Controllers.SignInModal = P(CS.Controllers.Base, function (c) {
    c.init = function () {
        this._initElements();
        this._displayModalIfNotLoggedIn();
    };

    c._initElements = function () {
        this.$signInModal = $("#sign-in-modal");
    };

    c._displayModalIfNotLoggedIn = function () {
        if (this.isTemporaryAccount()) {
            this.$signInModal.modal({
                backdrop: "static",
                keyboard: false
            });
        }
    };
});
;CS.Controllers.AddItemTaskCommon = {
    getNextTask: function (areaTasks, workbookAreaClassName) {
        var firstNotSkipped = _.find(areaTasks, function (task) {
            return !_.includes(CS.Services.Browser.getFromLocalStorage(this.getLocalStorageKeyForSkippedTaskIds(workbookAreaClassName)), task.id);
        }.bind(this));

        if (firstNotSkipped) {
            return firstNotSkipped;
        }

        // All have been skipped, we need to unskip them all
        this._unskipAll(workbookAreaClassName);

        return _.find(areaTasks, function (task) {
            return !_.includes(CS.Services.Browser.getFromLocalStorage(this.getLocalStorageKeyForSkippedTaskIds(workbookAreaClassName)), task.id);
        }.bind(this));
    },

    getLocalStorageKeyForSkippedTaskIds: function (workbookAreaClassName) {
        return "skippedTaskIds-" + workbookAreaClassName;
    },

    _unskipAll: function (workbookAreaClassName) {
        CS.Services.Browser.removeFromLocalStorage(this.getLocalStorageKeyForSkippedTaskIds(workbookAreaClassName));
    }
};
;CS.Controllers.AddCustomTask = React.createClass({displayName: "AddCustomTask",
    render: function () {
        return (
            React.createElement("div", {ref: "wrapper"}, 
                React.createElement("a", {id: "add-custom-task-link", onClick: this._handleAddCustomTaskClick}, "Add custom task"), 

                React.createElement("form", {onSubmit: this._handleFormSubmit}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {htmlFor: "tip"}, "Tip"), 
                        React.createElement("textarea", {className: "form-control", id: "tip", maxLength: "512", onKeyUp: this._handleTextareaKeyUp}), 

                        React.createElement("p", {className: "field-error", "data-check": "max-length"}, "512 characters maximum")
                    ), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {htmlFor: "question"}, "Question"), 
                        React.createElement("textarea", {className: "form-control", id: "question", maxLength: "512", onKeyUp: this._handleTextareaKeyUp}), 

                        React.createElement("p", {className: "field-error", "data-check": "max-length"}, "512 characters maximum")
                    ), 

                    React.createElement("div", {className: "centered-contents"}, 
                        React.createElement("button", {className: "btn btn-warning"}, "Add task")
                    )
                )
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
        this._initValidation();
    },

    _initElements: function () {
        this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
        this.$form = this.$wrapper.children("form");
        this.$tipField = this.$form.find("#tip");
        this.$questionField = this.$form.find("#question");

        this.$setThreeStandoutsLink = $("#set-three-standouts-link");
    },

    _initValidation: function() {
        this.validator = CS.Services.Validator([
            "tip",
            "question"
        ]);
    },

    _handleAddCustomTaskClick: function () {
        this.$form.toggle();
        this.$setThreeStandoutsLink.toggle();
    },

    _handleTextareaKeyUp: function (e) {
        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleFormSubmit);
    },

    _handleFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        if (this.validator.isValid()) {
            var tip = this.$tipField.val().trim();
            var question = this.$questionField.val().trim();

            var task = {
                accountId: CS.account.id,
                tip: tip || null,
                question: question || null,
                workbookAreaId: this.props.workbookAreaId,
                workbookItemIndex: this.props.workbookItemIndex
            };

            if (task.tip || task.question) {
                this._addCustomTask(task);
            }
        }
    },

    _addCustomTask: function (task) {
        var type = "POST";
        var url = "/api/custom-tasks";

        $.ajax({
            url: url,
            type: type,
            contentType: "application/json",
            data: JSON.stringify(task),
            success: function (id) {
                this.$form[0].reset();

                task.id = id;
                task.templateClassName = _.isNumber(this.props.workbookItemIndex) ? CS.Controllers.WorkbookAreaCommon.customItemTaskTemplateClassName : CS.Controllers.WorkbookAreaCommon.customAreaTaskTemplateClassName;

                this.props.controller.customTasks.push(task);
                this.props.controller.isCustomTaskComplete = false;
                this.props.controller.reRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

CS.Controllers.BlueprintAreasSelector = P(function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                inactiveBlueprintAreas: []
            };
        },

        render: function () {
            return (
                React.createElement("div", {ref: "wrapper"}, 
                    React.createElement("ul", {className: "styleless"}, 
                        this.state.inactiveBlueprintAreas.map(function (blueprintArea) {
                            var id = blueprintArea.className + "-blueprint-area-selector-item";

                            return React.createElement(CS.Controllers.BlueprintAreaSelectorItem, {key: id, blueprintArea: blueprintArea});
                        })
                    )
                )
                );
        },

        componentDidMount: function() {
            this._initElements();
        },

        _initElements: function() {
            this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
        }
    });

    c.init = function () {
        this._initElements();
        this._initEvents();

        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$modal.find(".modal-body")[0]
        );

        this.reRender();
        this._initModalWidth();
    };

    c._initElements = function() {
        this.$window = $(window);
        this.$modal = $("#select-areas-modal");
        this.$modalDialog = this.$modal.children(".modal-dialog");
    };

    c._initEvents = function() {
        this.$window.resize(_.debounce(function () {
            this._initModalWidth();
        }.bind(this), 15));
    };

    c.reRender = function() {
        this.reactInstance.replaceState({
            inactiveBlueprintAreas: _.sortByAll(CS.blueprintAreasModel.getInactive(), "title")
        });
    };

    c._initModalWidth = function() {
        this.$modalDialog.toggleClass("modal-lg", CS.Services.Browser.isLargeScreen());
    };
});

CS.Controllers.BlueprintAreaSelectorItem = React.createClass({displayName: "BlueprintAreaSelectorItem",
    render: function () {
        return React.createElement("a", {onClick: this._activateBlueprintArea}, this.props.blueprintArea.title);
    },

    _activateBlueprintArea: function() {
        CS.mainMenuController.hideModal();

        this.props.blueprintArea.activate();

        ga("send", "event", "link", "click", "Activate workbook Area");

        if (window.location.pathname !== "/") {
            location.href = "/workbook-areas/" + this.props.blueprintArea.className;
        }
    }
});

CS.Controllers.MainMenu = P(CS.Controllers.Base, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                activeWorkbookAreas: []
            };
        },

        render: function () {
            return (
                React.createElement("ul", {className: "styleless"}, 
                    this.state.activeWorkbookAreas.map(function (workbookArea) {
                        var id = workbookArea.className + "-workbook-area-menu-item";

                        var href = "/workbook-areas/" + workbookArea.className;

                        return (
                            React.createElement("li", {key: id}, 
                                React.createElement("a", {href: href}, workbookArea.title)
                            )
                            );
                    })
                )
                );
        }
    });

    c.init = function () {
        CS.blueprintAreasModel = CS.Models.BlueprintAreas();
        CS.blueprintAreasModel.updateStatus();

        this._initElements();
        this._render();
        this._initEvents();
    };

    c._initElements = function () {
        this.$mainContainer = $("#container");

        this.$menuBtn = this.$mainContainer.find("#menu-btn");
        this.$menu = this.$mainContainer.find("#main-menu");
        this.$contentOverlayWhenMenuOpen = this.$mainContainer.find("#content-overlay-when-menu-open");
        this.$selectAreasModal = this.$mainContainer.find("#select-areas-modal");

        this.$activeAreasSection = this.$menu.children("section");
        this.$selectAreasLink = this.$menu.children("#select-areas");
    };

    c._initEvents = function () {
        this.$menuBtn.click(this._toggleMenu.bind(this));
        this.$contentOverlayWhenMenuOpen.click(this.hideMenu.bind(this));

        this.$selectAreasLink.click(this._showModal.bind(this));
    };

    c.reRender = function() {
        this.reactInstance.replaceState({
            activeWorkbookAreas: _.sortByAll(CS.blueprintAreasModel.getActive(), "title")
        });
    };

    c.hideMenu = function () {
        this.$mainContainer.removeClass("menu-open");
    };

    c.hideModal = function() {
        this.$selectAreasModal.modal("hide");
    };

    c.signOut = function() {
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

    c._render = function() {
        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$activeAreasSection[0]
        );

        this.reRender();
    };

    c._toggleMenu = function () {
        CS.taskNotificationsController.hide();
        this.$mainContainer.toggleClass("menu-open");

        ga("send", "event", "button", "click", "Menu > Toggle menu");
    };

    c._showModal = function() {
        CS.blueprintAreasSelector.reRender();
        this.$selectAreasModal.modal();
        this.hideMenu();

        ga("send", "event", "link", "click", "Menu > Show area selection modal");
    };
});

CS.Controllers.TaskNotifications = P(function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                activeTasks: [],
                doneTasks: []
            };
        },

        render: function () {
            return (
                React.createElement("ul", {className: "styleless"}, 
                    this.state.activeTasks.map(function (task) {
                        var id = "notification-for-task-" + task.entityType + "-" + task.id;

                        var workbookArea = CS.blueprintAreasModel.getOfId(task.getWorkbookArea().id);

                        var href = task.entityType === CS.Controllers.WorkbookCommon.entityTypes.workbookArea ?
                            "/workbook-areas/" + workbookArea.className + "?taskIdToMarkAsViewed=" + task.entityType + "-" + task.id :
                            "/workbook-items/" + workbookArea.className + "/" + task.itemIndex + "?taskIdToMarkAsViewed=" + task.entityType + "-" + task.id;

                        var liClasses = classNames({
                            "clicked": _.includes(CS.account.data.clickedTaskIds, task.entityType + "-" + task.id)
                        });

                        return (
                            React.createElement("li", {key: id, className: liClasses}, 
                                React.createElement("a", {href: href}, task.notificationText)
                            )
                            );
                    }), 

                    this.state.doneTasks.map(function (task) {
                        var id = "notification-for-task-" + task.entityType + "-" + task.id;

                        return (
                            React.createElement("li", {key: id, className: "done"}, task.notificationText)
                            );
                    })
                )
                );
        }
    });

    c.init = function () {
        this._initElements();
        this._render();
        this._initEvents();
    };

    c._initElements = function () {
        this.$mainContainer = $("#container");

        this.$taskNotificationsBtn = this.$mainContainer.find("#task-notifications-btn");
        this.$newTaskCountSpan = this.$taskNotificationsBtn.children("span");

        this.$contentOverlayWhenMenuOpen = this.$mainContainer.find("#content-overlay-when-menu-open");
    };

    c._initEvents = function () {
        this.$taskNotificationsBtn.click(this._toggleNotifications.bind(this));
        this.$contentOverlayWhenMenuOpen.click(this.hide.bind(this));
    };

    c.reRender = function () {
        this.activeAreaTasks = this._getActiveAreaTasks();
        this.activeItemTasks = this._getActiveItemTasks();

        var newAreaTasks = this._getNewTasks(this.activeAreaTasks, CS.Controllers.WorkbookCommon.entityTypes.workbookArea);
        var newItemTasks = this._getNewTasks(this.activeItemTasks, CS.Controllers.WorkbookCommon.entityTypes.workbookItem);

        this.reactInstance.replaceState({
            activeTasks: this._getPrioritizedActiveTasks(newAreaTasks, newItemTasks),
            doneTasks: this._getDoneTasks()
        });

        if (newAreaTasks.length + newItemTasks.length > 0) {
            this.$taskNotificationsBtn.addClass("with-new-items");
            this.$newTaskCountSpan.html(newAreaTasks.length + newItemTasks.length);
        }
    };

    c.hide = function () {
        this.$mainContainer.removeClass("task-notifications-open");
    };

    c._render = function () {
        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            document.getElementById("task-notifications")
        );

        this.reRender();
    };

    c._getActiveAreaTasks = function () {
        var result = [];

        CS.WorkbookAreaTasks.forEach(function (task) {
            if (task.notificationText && task.isActive()) {
                task.entityType = CS.Controllers.WorkbookCommon.entityTypes.workbookArea;
                result.push(task);
            }
        });

        return result;
    };

    c._getActiveItemTasks = function () {
        var result = [];

        // For each active area, get the list of items
        CS.blueprintAreasModel.getActive().forEach(function (workbookArea) {
            var workbookItemTasksForThisArea = _.filter(CS.WorkbookItemTasks, "workbookAreaId", workbookArea.id);
            var workbookItems = CS.account.data[workbookArea.className];

            workbookItemTasksForThisArea.forEach(function (task) {
                if (task.notificationText) {
                    // Call isActive() for each item. Stop on the first found.
                    for (var i = 0; i < _.size(workbookItems); i++) {
                        if (task.isActive(i) && !task.isDone(i)) {
                            // Add that task to the list of active ones
                            task.entityType = CS.Controllers.WorkbookCommon.entityTypes.workbookItem;
                            task.itemIndex = i;
                            result.push(task);

                            break;
                        }
                    }
                }
            });
        });

        return result;
    };

    c._getNewTasks = function (tasks, prefix) {
        return _.reject(tasks, function (task) {
            return _.include(CS.account.data.viewedTaskIds, prefix + "-" + task.id);
        });
    };

    c._getPrioritizedActiveTasks = function (newAreaTasks, newItemTasks) {
        var oldAreaTasks = _.reject(this.activeAreaTasks, function (task) {
            return _.find(newAreaTasks, "id", task.id);
        });

        var activeOldLvl1Tasks = _.filter(oldAreaTasks, function (task) {
            return task.level === 1;
        });

        var prioritizedOldLvl1Tasks = _.sortBy(activeOldLvl1Tasks, function (task) {
            var workbookArea = CS.blueprintAreasModel.getOfId(task.getWorkbookArea().id);
            return CS.account.data[workbookArea.className] ? -CS.account.data[workbookArea.className].length : 0;
        });

        var activeOldLvl2Tasks = _.filter(oldAreaTasks, function (task) {
            return task.level === 2;
        });

        var prioritizedOldLvl2Tasks = _.sortBy(activeOldLvl2Tasks, function (task) {
            var workbookArea = CS.blueprintAreasModel.getOfId(task.getWorkbookArea().id);
            return CS.account.data[workbookArea.className] ? -CS.account.data[workbookArea.className].length : 0;
        });

        var activeOldLvl3Tasks = _.filter(oldAreaTasks, function (task) {
            return task.level === 3;
        });

        var activeOldItemTasks = _.reject(this.activeItemTasks, function (task) {
            return _.find(newItemTasks, "id", task.id);
        });

        return _.union(newAreaTasks, newItemTasks, prioritizedOldLvl1Tasks, prioritizedOldLvl2Tasks, activeOldLvl3Tasks, activeOldItemTasks);
    };

    c._getDoneTasks = function () {
        var doneAreaTasks = [];

        CS.WorkbookAreaTasks.forEach(function (task) {
            if (task.notificationText && task.isDone()) {
                task.entityType = CS.Controllers.WorkbookCommon.entityTypes.workbookArea;
                doneAreaTasks.push(task);
            }
        });

        var doneItemTasks = [];

        CS.blueprintAreasModel.getActive().forEach(function (workbookArea) {
            var workbookItemTasksForThisArea = _.filter(CS.WorkbookItemTasks, "workbookAreaId", workbookArea.id);
            var workbookItems = CS.account.data[workbookArea.className];

            workbookItemTasksForThisArea.forEach(function (task) {
                for (var i = 0; i < _.size(workbookItems); i++) {
                    if (task.isDone(i)) {
                        task.entityType = CS.Controllers.WorkbookCommon.entityTypes.workbookItem;
                        doneItemTasks.push(task);

                        break;
                    }
                }
            });
        });

        return _.union(doneAreaTasks, doneItemTasks);
    };

    c._toggleNotifications = function () {
        CS.mainMenuController.hideMenu();
        this.$mainContainer.toggleClass("task-notifications-open");
        this.$taskNotificationsBtn.removeClass("with-new-items");

        this._fetchLatestAccountDataAndUpdateIt();

        ga("send", "event", "button", "click", "Toggle notifications");
    };

    c._fetchLatestAccountDataAndUpdateIt = function () {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var activeTasks = _.union(this.activeAreaTasks, this.activeItemTasks);

                // The reason why we store the taskIds and not the tasks themselves is because the isActive() function isn't serialized
                var viewedTaskIds = _.union(activeTasks.map(function (task) {
                        return task.entityType + "-" + task.id;
                    }),
                    CS.account.data.viewedTaskIds
                );

                if (!_.isEmpty(_.difference(viewedTaskIds, CS.account.data.viewedTaskIds))) {
                    CS.account.data.viewedTaskIds = viewedTaskIds;
                    CS.saveAccountData();
                }
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    };
});

CS.Controllers.OverviewBlueprintAreaComposer = React.createClass({displayName: "OverviewBlueprintAreaComposer",
    addItemComposerOpenCssClass: "add-item-composer-open",

    render: function () {
        return (
            React.createElement("section", {ref: "wrapper", className: "add-item-section"}, 
                React.createElement("form", {role: "form", className: "item-composer", ref: "form", onSubmit: this._handleComposerFormSubmit}, 
                    React.createElement("textarea", {className: "form-control", onKeyUp: this._handleTextareaKeyUp}), 
                    React.createElement("button", {className: "btn btn-primary"}, "Lägg till"), 
                    React.createElement("button", {type: "button", className: "styleless fa fa-times", onClick: this._hideForm})
                ), 

                React.createElement("a", {className: "add-item-link", onClick: this._showComposer}, "+ Lägg till")
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
    },

    _initElements: function () {
        this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
        this.$well = this.$wrapper.parent();
        this.$form = this.$wrapper.children(".item-composer");
        this.$addItemLink = this.$wrapper.children(".add-item-link");
        this.$textarea = this.$form.children("textarea");
    },

    _showComposer: function () {
        this._hideOtherOpenComposers();

        this.$well.addClass(this.addItemComposerOpenCssClass);
        this.$textarea.focus();

        CS.overviewController.rePackerise();

        ga("send", "event", "link", "click", "Overview > Show composer");
    },

    _hideOtherOpenComposers: function () {
        CS.overviewController.$el.find(".well").removeClass(this.addItemComposerOpenCssClass);
    },

    _handleComposerFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var itemNameToAdd = this.$textarea.val().trim();

        if (itemNameToAdd && !CS.Controllers.WorkbookAreaCommon.doesItemAlreadyExist(itemNameToAdd, this.props.blueprintAreaClassName)) {
            this._fetchLatestAccountDataAndUpdateIt(itemNameToAdd);
        }

        CS.Controllers.WorkbookAreaCommon.resetAndHideForm(this.$textarea, this._hideForm);

        ga("send", "event", "form", "submit", "[" + CS.account.email + "] Overview > Add item: " + itemNameToAdd);
    },

    _handleTextareaKeyUp: function (e) {
        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleComposerFormSubmit, this._hideForm);
    },

    _hideForm: function () {
        this.$well.removeClass(this.addItemComposerOpenCssClass);

        CS.overviewController.rePackerise();

        ga("send", "event", "link", "click", "Overview > Hide composer");
    },

    _fetchLatestAccountDataAndUpdateIt: function(itemNameToAdd) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var updatedBlueprintAreaData = !_.isEmpty(CS.account.data[this.props.blueprintAreaClassName]) ? _.clone(CS.account.data[this.props.blueprintAreaClassName], true) : [];
                updatedBlueprintAreaData.push({
                    name: itemNameToAdd,
                    notes: []
                });

                CS.account.data[this.props.blueprintAreaClassName] = updatedBlueprintAreaData;
                CS.overviewController.saveAccountData();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

CS.Controllers.OverviewBlueprintAreaPanel = React.createClass({displayName: "OverviewBlueprintAreaPanel",
    render: function () {
        var workbookAreaTitleHref = "/workbook-areas/" + this._getBlueprintArea().className;

        var threeStandoutsPanelReact = null;

        if (CS.account.data && CS.account.data.standouts && CS.account.data.standouts[this._getBlueprintArea().className]) {
            threeStandoutsPanelReact = React.createElement(CS.Controllers.OverviewThreeStandoutsPanel, {workbookArea: this._getBlueprintArea(), threeStandouts: CS.account.data.standouts[this._getBlueprintArea().className]});
        }

        var wellClasses = classNames("well", {
            "collapsed-list": this.props.blueprintAreaWithData.items.length > CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
            "hidd3n": threeStandoutsPanelReact !== null && !_.includes(CS.account.data.hiddenThreeStandoutsPanelsIds, this._getBlueprintArea().id)
        });

        var workbookAreaDescription = _.find(CS.Controllers.Texts, function(text) {
            return text.type === "workbook-area-description" &&
                text.workbookAreaClassName === this._getBlueprintArea().className;
        }.bind(this)).htmlText;

        return (
            React.createElement("li", {className: "blueprint-area-panel", ref: "li"}, 
                React.createElement("div", {className: wellClasses}, 
                    React.createElement("h2", null, React.createElement("a", {href: workbookAreaTitleHref}, this._getBlueprintArea().title)), 
                    React.createElement("button", {className: "styleless fa fa-chevron-down menu", onClick: this._showActionsMenu}), 

                    React.createElement(CS.Controllers.OverviewWorkbookAreaActions, {workbookArea: this._getBlueprintArea(), controller: this}), 

                    React.createElement("ul", {className: "styleless item-names-list"}, 
                        this.props.blueprintAreaWithData.items.map(function (item, index) {
                            var reactItemId = this._getBlueprintArea().className + "-blueprint-item-" + index + "-" + item.name;

                            return React.createElement(CS.Controllers.OverviewBlueprintItem, {key: reactItemId, blueprintAreaWithData: this.props.blueprintAreaWithData, blueprintItemIndex: index, controller: this});
                        }.bind(this))
                    ), 

                    React.createElement("button", {className: "styleless fa fa-chevron-down expand", onClick: this._toggleCollapsedList}), 
                    React.createElement("button", {className: "styleless fa fa-chevron-up", onClick: this._toggleCollapsedList}), 

                    React.createElement(CS.Controllers.OverviewBlueprintAreaComposer, {blueprintAreaClassName: this._getBlueprintArea().className})
                ), 

                threeStandoutsPanelReact, 

                React.createElement("div", {className: "modal fade workbook-area-description-modal"}, 
                    React.createElement("div", {className: "modal-dialog"}, 
                        React.createElement("div", {className: "modal-content"}, 
                            React.createElement("div", {className: "modal-header"}, 
                                React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close"}, 
                                    React.createElement("span", {"aria-hidden": "true"}, "×")
                                ), 
                                React.createElement("h2", {className: "modal-title"}, this._getBlueprintArea().title)
                            ), 
                            React.createElement("div", {className: "modal-body workbook-area-description-text-wrapper", dangerouslySetInnerHTML: {__html: workbookAreaDescription}})
                        )
                    )
                )
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
        this._initSortable();
        this._initNonReactableEvents();
    },

    _getBlueprintArea: function () {
        return this.props.blueprintAreaWithData.blueprintArea;
    },

    _initElements: function () {
        this.$listItem = $(React.findDOMNode(this.refs.li));
        this.$well = this.$listItem.children(".well");
        this.$areaDescriptionModal = this.$listItem.children(".workbook-area-description-modal");
        this.$actionsMenu = this.$well.children(".workbook-area-actions");
        this.$itemNamesList = this.$well.children(".item-names-list");

        this.$mainContainer = $("#container");
        this.$contentOverlayWhenMenuOpen = this.$mainContainer.find("#content-overlay-when-menu-open");
    },

    _initSortable: function () {
        this.sortable = new Sortable(this.$itemNamesList[0],
            {
                animation: 150,
                onUpdate: function () {
                    CS.Controllers.WorkbookAreaCommon.handleWorkbookItemsReordered(this.$itemNamesList.children(), this._getBlueprintArea().className, CS.overviewController.reRender.bind(CS.overviewController));
                }.bind(this),
                handle: ".fa-bars"
            }
        );
    },

    _initNonReactableEvents: function() {
        this.$contentOverlayWhenMenuOpen.click(this.hideActionsMenu);
        this.$areaDescriptionModal.on("hidden.bs.modal", this._saveAreaDescriptionAsClosed);
    },

    _toggleCollapsedList: function () {
        this.$well.toggleClass("collapsed-list");
        this.$well.toggleClass("expanded-list");

        CS.overviewController.rePackerise();

        ga("send", "event", "link", "click", "Overview > Toggle collapsed list");
    },

    _showActionsMenu: function() {
        this.$mainContainer.addClass("workbook-area-actions-menu-open");
        this.$actionsMenu.show();

        ga("send", "event", "button", "click", "Overview > Show actions menu");
    },

    hideActionsMenu: function() {
        this.$mainContainer.removeClass("workbook-area-actions-menu-open");
        this.$actionsMenu.hide();
    },

    _saveAreaDescriptionAsClosed: function() {
        CS.Controllers.WorkbookCommon.saveAreaDescriptionAsClosed(this._getBlueprintArea().id);
    }
});

CS.Controllers.OverviewBlueprintItem = React.createClass({displayName: "OverviewBlueprintItem",
    render: function () {
        var href = "/workbook-items/" + this._getBlueprintAreaClassName() + "/" + this.props.blueprintItemIndex;

        // TODO: replace .fa-bars element from <span> back to <button> after bug https://github.com/RubaXa/Sortable/issues/370 is fixed

        return (
            React.createElement("li", {ref: "li"}, 
                React.createElement("div", {className: "notes-indicator"}), 
                React.createElement("span", {className: "fa fa-bars"}), 
                React.createElement("p", null, React.createElement("a", {href: href}, this._getBlueprintItemName())), 
                React.createElement("button", {className: "styleless fa fa-pencil", onClick: this._showEditor}), 
                React.createElement("form", {role: "form", className: "item-composer", onSubmit: this._handleComposerFormSubmit}, 
                    React.createElement("textarea", {className: "form-control", onKeyUp: this._handleTextareaKeyUp}), 
                    React.createElement("button", {className: "btn btn-primary"}, "Spara ändringar"), 
                    React.createElement("button", {type: "button", className: "styleless fa fa-times", onClick: this._hideForm})
                )
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
        CS.Controllers.WorkbookAreaCommon.initNotesIndicator(this.$notesIndicator, CS.account.data[this._getBlueprintAreaClassName()][this.props.blueprintItemIndex].notes.length);
    },

    _getBlueprintAreaClassName: function() {
        return this.props.blueprintAreaWithData.blueprintArea.className;
    },

    _getBlueprintItemName: function () {
        return this.props.blueprintAreaWithData.items[this.props.blueprintItemIndex].name;
    },

    _initElements: function() {
        this.$listItem = $(React.findDOMNode(this.refs.li));
        this.$notesIndicator = this.$listItem.children(".notes-indicator");
        this.$itemNameParagraph = this.$listItem.children("p");
        this.$editBtn = this.$listItem.children(".fa-pencil");
        this.$form = this.$listItem.children(".item-composer");
        this.$textarea = this.$form.children("textarea");

        this.$blueprintAreaWell = this.$listItem.parents(".blueprint-area-panel").children();
    },

    _showEditor: function () {
        this._hideOtherOpenComposers();

        this.$textarea.val(this._getBlueprintItemName());

        this.$listItem.addClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);

        CS.Controllers.WorkbookAreaCommon.disableSortable(this.props.controller);

        this.$itemNameParagraph.hide();
        this.$editBtn.hide();
        this.$blueprintAreaWell.addClass("editing");
        this.$form.show();
        CS.Controllers.WorkbookAreaCommon.adaptTextareaHeight(this.$textarea);
        this.$textarea.focus();

        CS.overviewController.rePackerise();
    },

    _hideOtherOpenComposers: function() {
        var $listItems = CS.overviewController.$el.find(".item-names-list").children();
        var $composerForms = $listItems.children(".item-composer");
        var $itemNameParagraphs = $listItems.children("p");
        var $editBtns = $listItems.children(".fa-pencil");
        var $addItemLinks = CS.overviewController.$el.find(".add-item-link");

        $listItems.removeClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);
        $composerForms.hide();
        $itemNameParagraphs.show();
        $editBtns.show();
        $addItemLinks.show();
    },

    _handleComposerFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var newItemName = this.$textarea.val().trim();
        this._fetchLatestAccountDataAndUpdateIt(newItemName);

        ga("send", "event", "form", "submit", "[" + CS.account.email + "] Overview > Save changes to workbook item: " + newItemName);
    },

    _handleTextareaKeyUp: function(e) {
        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleComposerFormSubmit, this._hideForm);
    },

    _hideForm: function() {
        this.$listItem.removeClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);
        this.$form.hide();
        this.$itemNameParagraph.show();
        this.$editBtn.show();
        this.$blueprintAreaWell.removeClass("editing");

        CS.overviewController.rePackerise();
        CS.Controllers.WorkbookAreaCommon.enableSortable(this.props.controller);
    },

    _fetchLatestAccountDataAndUpdateIt: function(newItemName) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var updatedBlueprintAreaData = !_.isEmpty(CS.account.data[this._getBlueprintAreaClassName()]) ? _.clone(CS.account.data[this._getBlueprintAreaClassName()], true) : [];

                if (newItemName) {
                    updatedBlueprintAreaData[this.props.blueprintItemIndex].name = newItemName;
                } else {
                    updatedBlueprintAreaData.splice(this.props.blueprintItemIndex, 1);

                    // We hide it from the UI to give faster feedback
                    this.$listItem.hide();
                }

                CS.Controllers.WorkbookAreaCommon.resetAndHideForm(this.$textarea, this._hideForm);

                CS.account.data[this._getBlueprintAreaClassName()] = updatedBlueprintAreaData;
                CS.overviewController.saveAccountData();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

CS.Controllers.Overview = P(function (c) {
    c.$el = $(document.getElementById("content"));

    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                blueprintAreasWithData: []
            };
        },

        render: function () {
            return (
                React.createElement("ul", {className: "styleless", ref: "list"}, 
                    this.state.blueprintAreasWithData.map(function (blueprintAreaWithData) {
                        var id = blueprintAreaWithData.blueprintArea.className + "-blueprint-area-panel";

                        return React.createElement(CS.Controllers.OverviewBlueprintAreaPanel, {key: id, blueprintAreaWithData: blueprintAreaWithData});
                    })
                )
                );
        },

        componentDidMount: function() {
            this._initElements();
        },

        componentDidUpdate: function() {
            this.rePackerise();
        },

        rePackerise: function() {
            this.unusedVariable = new Packery(this.list, {
                itemSelector: ".blueprint-area-panel"
            });
        },

        _initElements: function() {
            this.list = React.findDOMNode(this.refs.list);
        }
    });

    c.init = function () {
        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$el[0]
        );

        this.reRender();
    };

    c.reRender = function () {
        var blueprintAreasWithData = CS.blueprintAreasModel.getActive().map(function (blueprintArea) {
            return {
                blueprintArea: blueprintArea,
                items: CS.account.data && !_.isEmpty(CS.account.data[blueprintArea.className]) ? CS.account.data[blueprintArea.className] : []
            };
        });

        this.reactInstance.replaceState({
            blueprintAreasWithData: _.sortBy(blueprintAreasWithData, function(blueprintAreaWithData) {
                return blueprintAreaWithData.blueprintArea.title;
            })
        });
    };

    c.rePackerise = function() {
        this.reactInstance.rePackerise();
    };

    c.saveAccountData = function () {
        this.reRender();
        CS.saveAccountData();
    };
});

CS.Controllers.OverviewThreeStandoutsPanel = React.createClass({displayName: "OverviewThreeStandoutsPanel",
    render: function () {
        var workbookAreaTitleHref = "/workbook-areas/" + this.props.workbookArea.className;
        var humanReadableClassName = this.props.workbookArea.humanReadableClassName.toLowerCase();

        return (
            React.createElement("div", {className: "three-standouts well", ref: "wrapper"}, 
                React.createElement("h2", null, React.createElement("i", {className: "fa fa-star"}), "Top-3 ", React.createElement("a", {href: workbookAreaTitleHref}, humanReadableClassName), React.createElement("i", {className: "fa fa-star"})), 
                React.createElement("button", {className: "styleless fa fa-times", onClick: this._hide}), 

                React.createElement("ul", null, 
                    React.createElement("li", null, this.props.threeStandouts[0]), 
                    React.createElement("li", null, this.props.threeStandouts[1]), 
                    React.createElement("li", null, this.props.threeStandouts[2])
                )
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
    },

    _initElements: function () {
        this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
        this.$workbookAreaPanel = this.$wrapper.siblings(".well");

        this._hideIfRequired();
    },

    _hide: function () {
        CS.Services.Animator.fadeOut(this.$wrapper, {
            animationDuration: CS.animationDuration.short,
            onComplete: function () {
                CS.Services.Animator.fadeIn(this.$workbookAreaPanel);
                CS.overviewController.rePackerise();
            }.bind(this)
        });

        if (!_.includes(CS.account.data.hiddenThreeStandoutsPanelsIds, this.props.workbookArea.id)) {
            var hiddenThreeStandoutsPanelsIds = CS.account.data.hiddenThreeStandoutsPanelsIds || [];
            hiddenThreeStandoutsPanelsIds.push(this.props.workbookArea.id);

            CS.account.data.hiddenThreeStandoutsPanelsIds = hiddenThreeStandoutsPanelsIds;
            CS.saveAccountData();
        }

        ga("send", "event", "button", "click", "Overview > Hide three standouts panel");
    },

    _hideIfRequired: function() {
        if (_.includes(CS.account.data.hiddenThreeStandoutsPanelsIds, this.props.workbookArea.id)) {
            this.$wrapper.hide();
        }
    }
});

CS.Controllers.OverviewWorkbookAreaActions = React.createClass({displayName: "OverviewWorkbookAreaActions",
    render: function () {
        var threeStandoutsItemReact = null;

        if (CS.account.data && CS.account.data.standouts && CS.account.data.standouts[this.props.workbookArea.className]) {
            threeStandoutsItemReact = (
                React.createElement("li", null, React.createElement("i", {className: "fa fa-star"}), React.createElement("a", {onClick: this._showThreeStandouts}, "Standouts"))
                );
        }

        return (
            React.createElement("section", {className: "workbook-area-actions", ref: "wrapper"}, 
                React.createElement("ul", {className: "styleless"}, 
                    React.createElement("li", null, React.createElement("i", {className: "fa fa-question-circle"}), React.createElement("a", {onClick: this._showWorkbookAreaDescriptionModal}, "Mer info om ämnet")), 
                    React.createElement("li", null, React.createElement("i", {className: "fa fa-eye-slash"}), React.createElement("a", {onClick: this._hideBlueprintAreaPanel}, "Göm det här ämnet")), 
                    threeStandoutsItemReact
                )
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
    },

    _initElements: function () {
        this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
        this.$workbookAreaPanel = this.$wrapper.parent();
        this.$threeStandoutsPanel = this.$workbookAreaPanel.siblings(".three-standouts");
        this.$areaDescriptionModal = this.$workbookAreaPanel.siblings(".workbook-area-description-modal");
    },

    _showWorkbookAreaDescriptionModal: function() {
        this.props.controller.hideActionsMenu();

        this.$areaDescriptionModal.modal();

        ga("send", "event", "link", "click", "Overview > Show workbook area description");
    },

    _hideBlueprintAreaPanel: function () {
        this.props.controller.hideActionsMenu();

        this.props.workbookArea.deactivate();
        CS.overviewController.reRender();

        ga("send", "event", "link", "click", "Overview > Hide workbook area");
    },

    _showThreeStandouts: function() {
        this.props.controller.hideActionsMenu();

        CS.Services.Animator.fadeOut(this.$workbookAreaPanel, {
            animationDuration: CS.animationDuration.short,
            onComplete: function () {
                CS.Services.Animator.fadeIn(this.$threeStandoutsPanel);
                CS.overviewController.rePackerise();
            }.bind(this)
        });

        var hiddenThreeStandoutsPanelsIds = CS.account.data.hiddenThreeStandoutsPanelsIds || [];
        var indexOfStandoutToUnhide = hiddenThreeStandoutsPanelsIds.indexOf(this.props.workbookArea.id);
        hiddenThreeStandoutsPanelsIds.splice(indexOfStandoutToUnhide, 1);

        CS.account.data.hiddenThreeStandoutsPanelsIds = hiddenThreeStandoutsPanelsIds;
        CS.saveAccountData();

        ga("send", "event", "link", "click", "Overview > Show 3 standouts");
    }
});

CS.Controllers.AdminPanel = React.createClass({displayName: "AdminPanel",
    render: function () {
        return (
            React.createElement("section", {className: "admin-panel"}, 
                React.createElement(CS.Controllers.AddCustomTask, {workbookAreaId: this.props.workbookArea.id, controller: this.props.controller}), 
                React.createElement(CS.Controllers.SetThreeStandouts, {workbookArea: this.props.workbookArea, controller: this.props.controller})
            )
            );
    }
});

CS.Controllers.SetThreeStandouts = React.createClass({displayName: "SetThreeStandouts",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("a", {id: "set-three-standouts-link", onClick: this._handleSetThreeStandoutsClick}, "Three standouts"), 

                React.createElement("form", {onSubmit: this._handleFormSubmit, ref: "form"}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("input", {type: "text", className: "form-control", id: "first-standout", maxLength: "256"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("input", {type: "text", className: "form-control", id: "second-standout", maxLength: "256"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("input", {type: "text", className: "form-control", id: "third-standout", maxLength: "256"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "centered-contents"}, 
                        React.createElement("button", {className: "btn btn-warning"}, "Communicate as the three standouts")
                    )
                )
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
        this._initValidation();
    },

    _initElements: function () {
        this.$form = $(React.findDOMNode(this.refs.form));
        this.$firstStandoutField = this.$form.find("#first-standout");
        this.$secondStandoutField = this.$form.find("#second-standout");
        this.$thirdStandoutField = this.$form.find("#third-standout");

        this.$addCustomTaskLink = $("#add-custom-task-link");
    },

    _initValidation: function() {
        this.validator = CS.Services.Validator([
            "first-standout",
            "second-standout",
            "third-standout"
        ]);
    },

    _handleSetThreeStandoutsClick: function () {
        this.$form.toggle();
        this.$addCustomTaskLink.toggle();
    },

    _handleFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        if (this.validator.isValid()) {
            var firstStandout = this.$firstStandoutField.val().trim();
            var secondStandout = this.$secondStandoutField.val().trim();
            var thirdStandout = this.$thirdStandoutField.val().trim();

            this._fetchLatestAccountDataAndUpdateIt(firstStandout, secondStandout, thirdStandout);
        }
    },

    _fetchLatestAccountDataAndUpdateIt: function(firstStandout, secondStandout, thirdStandout) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                CS.account.data.standouts = CS.account.data.standouts || {};

                CS.account.data.standouts[this.props.workbookArea.className] = [
                    firstStandout,
                    secondStandout,
                    thirdStandout
                ];

                CS.saveAccountData(function() {
                    this.$form[0].reset();

                    this.$form.hide();
                    this.$addCustomTaskLink.show();
                }.bind(this));

                this.props.controller.reRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

CS.Controllers.WorkbookAreaAddItemLvl1Complete = React.createClass({displayName: "WorkbookAreaAddItemLvl1Complete",
    render: function () {
        return (
            React.createElement("div", {id: "task-complete-pep-talk"}, 
                React.createElement("h2", null, React.createElement("i", {className: "fa fa-star"}), "Härligt!", React.createElement("i", {className: "fa fa-star"})), 
                React.createElement("p", null, "Vi gör två stycken till. "), 
                React.createElement("p", null, "När du har totalt fem kommer en av våra karriärrådgivare att ta en titt för att kunna guida dig vidare med tips och frågor. "), 
                React.createElement("div", {className: "centered-contents"}, 
                    React.createElement("button", {className: "btn btn-primary", onClick: this._handleTaskCompletePepTalkClosed}, "Ok!")
                )
            )
            );
    },

    _handleTaskCompletePepTalkClosed: function () {
        this.props.controller.handleTaskCompletePepTalkClosed();

        ga("send", "event", "button", "click", "Workbook Area > Pep talk > Closed add item lvl 1");
    }
});

CS.Controllers.WorkbookAreaAddItemLvl2Complete = React.createClass({displayName: "WorkbookAreaAddItemLvl2Complete",
    render: function () {
        return (
            React.createElement("div", {id: "task-complete-pep-talk"}, 
                React.createElement("h2", null, React.createElement("i", {className: "fa fa-star"}), "Bra jobbat!", React.createElement("i", {className: "fa fa-star"})), 
                React.createElement("p", null, "En karriäragent har meddelats om dina svar och du kommer att få ett mejl med ytterligare frågor och tips. "), 
                React.createElement("p", null, "Fortsätt gärna så länge. Följ instruktionerna eller gå till andra områden i appen. "), 
                React.createElement("div", {className: "centered-contents"}, 
                    React.createElement("button", {className: "btn btn-primary", onClick: this._handleTaskCompletePepTalkClosed}, "Ok!")
                )
            )
            );
    },

    _handleTaskCompletePepTalkClosed: function () {
        this.props.controller.handleTaskCompletePepTalkClosed();

        ga("send", "event", "button", "click", "Workbook Area > Pep talk > Closed add item lvl 2");
    }
});

CS.Controllers.WorkbookAreaCustomTaskComplete = React.createClass({displayName: "WorkbookAreaCustomTaskComplete",
    render: function () {
        return (
            React.createElement("div", {id: "task-complete-pep-talk"}, 
                React.createElement("h2", null, React.createElement("i", {className: "fa fa-star"}), "Tack!", React.createElement("i", {className: "fa fa-star"})), 
                React.createElement("p", null, "En karriäragent kommer att ta en titt för att hjälpa dig vidare ytterligare."), 
                React.createElement("p", null, "Jobba gärna vidare under tiden! Med det här ämnet eller med ett annat."), 
                React.createElement("div", {className: "centered-contents"}, 
                    React.createElement("button", {className: "btn btn-primary", onClick: this._handleTaskCompletePepTalkClosed}, "Gå vidare")
                )
            )
            );
    },

    _handleTaskCompletePepTalkClosed: function () {
        this.props.controller.handleTaskCompletePepTalkClosed();

        ga("send", "event", "button", "click", "Workbook Area > Pep talk > Closed custom task");
    }
});

CS.Controllers.WorkbookAreaPrioritizeItemsComplete = React.createClass({displayName: "WorkbookAreaPrioritizeItemsComplete",
    render: function () {
        return (
            React.createElement("div", {id: "task-complete-pep-talk"}, 
                React.createElement("h2", null, React.createElement("i", {className: "fa fa-star"}), "Super!", React.createElement("i", {className: "fa fa-star"})), 
                React.createElement("p", null, "Nu ska vi gå in lite djupare på de saker du identifierat. Ge exempel, förklara och bekräfta att de här styrkorna verkligen är viktiga. "), 
                React.createElement("p", null, "Klicka på en av punkterna nedan för att komma vidare: ")
            )
            );
    }
});

CS.Controllers.WorkbookAreaAddItemLvl2Task = React.createClass({displayName: "WorkbookAreaAddItemLvl2Task",
    render: function () {
        var comingUpNextParagraph = null;
        if (this.props.comingUpNextText) {
            comingUpNextParagraph = (
                React.createElement("p", {className: "coming-up-next"}, "Nästa steg: ", this.props.comingUpNextText)
                );
        }

        var wrapperClasses = classNames({
            "workbook-task": true,
            "hidd3n": this.props.hidden
        });

        return (
            React.createElement("div", {className: wrapperClasses}, 
                React.createElement("button", {className: "styleless fa fa-question-circle", onClick: CS.Controllers.WorkbookAreaCommon.showAreaDescription}), 
                React.createElement("p", {className: "working-on"}, "Du jobbar med: ", this.props.task.workingOnText), 
                React.createElement("div", {className: "progress"}, 
                    React.createElement("div", {ref: "progressBar", className: "progress-bar progress-bar-success", role: "progressbar", "aria-valuenow": "", "aria-valuemin": "0", "aria-valuemax": "100"})
                ), 
                comingUpNextParagraph, 
                React.createElement(CS.Controllers.WorkbookAreaAddItemTaskForm, {task: this.props.task, workbookArea: this.props.workbookArea, controller: this.props.controller})
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
        this._initProgressBar();
    },

    componentDidUpdate: function () {
        this._initProgressBar();
    },

    _initElements: function () {
        this.$progressBar = $(React.findDOMNode(this.refs.progressBar));
    },

    _initProgressBar: function () {
        var itemCount = 0;

        if (CS.account.data && !_.isEmpty(CS.account.data[this.props.workbookArea.className])) {
            itemCount = CS.account.data[this.props.workbookArea.className].length - CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        }

        CS.Controllers.WorkbookCommon.setProgressBarWidth(this.$progressBar, itemCount, this.props.task.stepCount);
    }
});

CS.Controllers.WorkbookAreaAddItemTask = React.createClass({displayName: "WorkbookAreaAddItemTask",
    render: function () {
        var comingUpNextParagraph = null;
        if (this.props.comingUpNextText) {
            comingUpNextParagraph = (
                React.createElement("p", {className: "coming-up-next"}, "Nästa steg: ", this.props.comingUpNextText)
                );
        }

        var wrapperClasses = classNames({
            "workbook-task": true,
            "hidd3n": this.props.hidden
        });

        return (
            React.createElement("div", {className: wrapperClasses}, 
                React.createElement("button", {className: "styleless fa fa-question-circle", onClick: CS.Controllers.WorkbookAreaCommon.showAreaDescription}), 
                React.createElement("p", {className: "working-on"}, "Du jobbar med: ", this.props.task.workingOnText), 
                React.createElement("div", {className: "progress"}, 
                    React.createElement("div", {ref: "progressBar", className: "progress-bar progress-bar-success", role: "progressbar", "aria-valuenow": "", "aria-valuemin": "0", "aria-valuemax": "100"})
                ), 
                comingUpNextParagraph, 
                React.createElement(CS.Controllers.WorkbookAreaAddItemTaskForm, {task: this.props.task, workbookArea: this.props.workbookArea, controller: this.props.controller})
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
        this._initProgressBar();
    },

    componentDidUpdate: function () {
        this._initProgressBar();
    },

    _initElements: function () {
        this.$progressBar = $(React.findDOMNode(this.refs.progressBar));
    },

    _initProgressBar: function () {
        var itemCount = 0;

        if (CS.account.data && !_.isEmpty(CS.account.data[this.props.workbookArea.className])) {
            itemCount = CS.account.data[this.props.workbookArea.className].length;
        }

        CS.Controllers.WorkbookCommon.setProgressBarWidth(this.$progressBar, itemCount, this.props.task.stepCount);
    }
});

CS.Controllers.WorkbookAreaAddItemTaskForm = React.createClass({displayName: "WorkbookAreaAddItemTaskForm",
    render: function () {
        var textareaId = "task-" + this.props.task.id;
        this.currentWording = CS.Models.WorkbookAreaTaskCommon.getNextWording(this.props.task);

        return (
            React.createElement("form", {role: "form", ref: "form", className: "item-composer task", onSubmit: this._handleFormSubmit}, 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("label", {htmlFor: textareaId}, this.currentWording.prompt), 
                    React.createElement("textarea", {className: "form-control", id: textareaId, onKeyUp: this._handleTextareaKeyUp})
                ), 
                React.createElement("button", {className: "btn btn-primary"}, "Lägg till"), 
                React.createElement("a", {onClick: this._setCurrentTaskAsSkippedAndReRender}, "Prova en annan fråga")
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
        this._initTextareaValue();
    },

    componentDidUpdate: function() {
        this._initTextareaValue();
    },

    _initElements: function () {
        this.$form = $(React.findDOMNode(this.refs.form));
        this.$textarea = this.$form.find("textarea");
    },

    _initTextareaValue: function () {
        if (this.currentWording.sentenceStart) {
            this.$textarea.val(this.currentWording.sentenceStart);
        }
    },

    getLocalStorageKeyForSkippedTaskPrompts: function () {
        return CS.Models.WorkbookAreaTaskCommon.getLocalStorageKeyForSkippedTaskPrompts(this.props.workbookArea.id);
    },

    _handleFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var itemNameToAdd = this.$textarea.val().trim();

        if (this._isValid(itemNameToAdd) && !CS.Controllers.WorkbookAreaCommon.doesItemAlreadyExist(itemNameToAdd, this.props.workbookArea.className)) {
            this._fetchLatestAccountDataAndUpdateIt(itemNameToAdd);
        }

        ga("send", "event", "form", "submit", "[" + CS.account.email + "] Workbook Area (" + this.props.workbookArea.className + ") > Add item task (" + this.currentWording.prompt + ") > Add item: " + itemNameToAdd);
    },

    _isValid: function(trimmedItemName) {
        if (!trimmedItemName) {
            return false;
        }

        if (!this.currentWording.sentenceStart) {
            return true;
        }

        return this.currentWording.sentenceStart.trim() !== trimmedItemName;
    },

    _setCurrentTaskAsSkippedAndReRender: function () {
        var skippedTaskPrompts = CS.Services.Browser.getFromLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts()) || [];
        skippedTaskPrompts.push(this.currentWording.prompt);

        CS.Services.Browser.saveInLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts(), skippedTaskPrompts);

        this.$form[0].reset();
        this.props.controller.reRender();

        ga("send", "event", "link", "click", "Workbook Area > Add item task > Try another");
    },

    _handleTextareaKeyUp: function (e) {
        if (this.currentWording.sentenceStart && !_.startsWith(this.$textarea.val(), this.currentWording.sentenceStart)) {
            this.$textarea.val(this.currentWording.sentenceStart);
        }

        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleFormSubmit);
    },

    _fetchLatestAccountDataAndUpdateIt: function(itemNameToAdd) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var updatedBlueprintAreaData = !_.isEmpty(CS.account.data[this.props.workbookArea.className]) ? _.clone(CS.account.data[this.props.workbookArea.className], true) : [];
                updatedBlueprintAreaData.push({
                    name: itemNameToAdd,
                    notes: []
                });

                CS.account.data[this.props.workbookArea.className] = updatedBlueprintAreaData;
                CS.saveAccountData();

                this.props.controller.isPepTalkClosed = false;

                this._setCurrentTaskAsSkippedAndReRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

CS.Controllers.WorkbookAreaCustomTask = React.createClass({displayName: "WorkbookAreaCustomTask",
    render: function () {
        var tipReact = null;
        if (this.props.task.tip) {
            var tipReadBtnReact = null;

            if (!this.props.task.question) {
                tipReadBtnReact = (
                    React.createElement("div", {className: "centered-contents"}, 
                        React.createElement("button", {className: "btn btn-primary", onClick: this._setCustomTaskAsCompletedAndReRender}, "Ok!")
                    )
                    );
            }

            tipReact = (
                React.createElement("div", {id: "custom-task-tip"}, 
                    React.createElement("i", {className: "fa fa-lightbulb-o"}), React.createElement("p", null, this.props.task.tip), 
                    tipReadBtnReact
                )
                );
        }

        var questionReact = null;
        if (this.props.task.question) {
            questionReact = (
                React.createElement("form", {role: "form", ref: "form", className: "item-composer task custom", onSubmit: this._handleFormSubmit}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {htmlFor: "custom-task-field"}, this.props.task.question), 
                        React.createElement("textarea", {className: "form-control", id: "custom-task-field", onKeyUp: this._handleTextareaKeyUp})
                    ), 
                    React.createElement("button", {className: "btn btn-primary"}, "Lägg till")
                )
                );
        }

        return (
            React.createElement("div", {className: "workbook-task"}, 
                React.createElement("button", {className: "styleless fa fa-question-circle", onClick: CS.Controllers.WorkbookAreaCommon.showAreaDescription}), 
                tipReact, 
                questionReact
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
    },

    _initElements: function () {
        this.$form = $(React.findDOMNode(this.refs.form));
        this.$textarea = this.$form.find("#custom-task-field");
    },

    _handleFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var itemNameToAdd = this.$textarea.val().trim();

        if (this._isValid(itemNameToAdd) && !CS.Controllers.WorkbookAreaCommon.doesItemAlreadyExist(itemNameToAdd, this.props.workbookArea.className)) {
            this._fetchLatestAccountDataAndUpdateIt(itemNameToAdd);
        }

        ga("send", "event", "form", "submit", "[" + CS.account.email + "] Workbook Area (" + this.props.workbookArea.className + ") > Custom task > Add item: " + itemNameToAdd + ". Question was: " + this.props.task.question);
    },

    _handleTextareaKeyUp: function (e) {
        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleFormSubmit);
    },

    _fetchLatestAccountDataAndUpdateIt: function (itemNameToAdd) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var updatedBlueprintAreaData = !_.isEmpty(CS.account.data[this.props.workbookArea.className]) ? _.clone(CS.account.data[this.props.workbookArea.className], true) : [];
                updatedBlueprintAreaData.push({
                    name: itemNameToAdd,
                    notes: []
                });

                CS.account.data[this.props.workbookArea.className] = updatedBlueprintAreaData;
                CS.saveAccountData();

                this._setCustomTaskAsCompletedAndReRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    },

    _isValid: function(trimmedItemName) {
        return trimmedItemName;
    },

    _setCustomTaskAsCompletedAndReRender: function () {
        var type = "PUT";
        var url = "/api/custom-tasks";

        $.ajax({
            url: url,
            type: type,
            contentType: "application/json",
            data: JSON.stringify(this.props.task),
            success: function (data) {
                this._resetForm();

                var lastIndex = this.props.controller.customTasks.length - 1;
                this.props.controller.customTasks[lastIndex] = data;
                this.props.controller.isCustomTaskComplete = true;

                this.props.controller.reRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    },

    _resetForm: function() {
        if (this.$form.length > 0) {
            this.$form[0].reset();
        }
    }
});

CS.Controllers.WorkbookAreaPrioritizeItemsTask = React.createClass({displayName: "WorkbookAreaPrioritizeItemsTask",
    render: function () {
        var comingUpNextParagraph = null;
        if (this.props.comingUpNextText) {
            comingUpNextParagraph = (
                React.createElement("p", {className: "coming-up-next"}, "Nästa steg: ", this.props.comingUpNextText)
                );
        }

        var wrapperClasses = classNames({
            "workbook-task": true,
            "hidd3n": this.props.hidden
        });

        var currentWording = CS.Models.WorkbookAreaTaskCommon.getNextWording(this.props.task);

        return (
            React.createElement("div", {className: wrapperClasses}, 
                React.createElement("button", {className: "styleless fa fa-question-circle", onClick: CS.Controllers.WorkbookAreaCommon.showAreaDescription}), 
                React.createElement("p", {className: "working-on"}, "Du jobbar med: ", this.props.task.workingOnText), 
                React.createElement("div", {className: "progress"}, 
                    React.createElement("div", {ref: "progressBar", className: "progress-bar progress-bar-success", role: "progressbar", "aria-valuenow": "0", "aria-valuemin": "0", "aria-valuemax": "100"}, "0%")
                ), 
                comingUpNextParagraph, 
                React.createElement("label", null, currentWording.prompt), 
                React.createElement("div", {className: "centered-contents"}, 
                    React.createElement("button", {className: "btn btn-primary", onClick: this._setCurrentWorkbookAreaAsPrioritizedAndReRender}, "Jag har prioriterat klart!")
                )
            )
            );
    },

    _setCurrentWorkbookAreaAsPrioritizedAndReRender: function () {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var prioritizedWorkbookAreaIds = CS.account.data.prioritizedWorkbookAreaIds || [];
                prioritizedWorkbookAreaIds.push(this.props.workbookArea.id);

                CS.account.data.prioritizedWorkbookAreaIds = prioritizedWorkbookAreaIds;
                CS.saveAccountData();

                this.props.controller.isPepTalkClosed = false;

                this.props.controller.reRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });

        ga("send", "event", "button", "click", "Workbook Area > Prioritize items task > Done");
    }
});

CS.Controllers.ThreeStandoutPanel.Drivers = React.createClass({displayName: "Drivers",
    render: function () {
        return (
            React.createElement("div", {className: "three-standouts"}, 
                React.createElement("h2", null, React.createElement("i", {className: "fa fa-star"}), "Dina viktigaste drivkrafter", React.createElement("i", {className: "fa fa-star"})), 

                React.createElement("p", null, "Här är de tre viktigaste drivkrafter du identifierat hittills:"), 

                React.createElement("ul", null, 
                    React.createElement("li", null, this.props.threeStandouts[0]), 
                    React.createElement("li", null, this.props.threeStandouts[1]), 
                    React.createElement("li", null, this.props.threeStandouts[2])
                ), 

                React.createElement("p", null, "Använd dem när du beskriver dig själv. Ta med dem i ditt personliga brev och i fältet Sammanfattning i din LinkedIn-profil. "), 

                React.createElement("p", null, "Den här övningen är nu slut. Du kommer att hitta dina drivkrafter i appen när du vill. Fortsätt gärna använda tjänsten! "), 

                React.createElement("p", null, "Hjälp oss genom att svara på ", React.createElement("a", {href: "https://docs.google.com/forms/d/13iqOYQDe6YHEhDdc-XIoQQe4DD6HXLUVYf1W4GcUu0o/viewform?usp=send_form", target: "_blank"}, "två korta frågor"))
            )
            );
    }
});

CS.Controllers.ThreeStandoutPanel.Strengths = React.createClass({displayName: "Strengths",
    render: function () {
        return (
            React.createElement("div", {className: "three-standouts"}, 
                React.createElement("h2", null, React.createElement("i", {className: "fa fa-star"}), "Dina topp 3 styrkor", React.createElement("i", {className: "fa fa-star"})), 

                React.createElement("p", null, "Utifrån dina svar så här långt, är det här de styrkor du bör fokusera på när du beskriver dig själv::"), 

                React.createElement("ul", null, 
                    React.createElement("li", null, this.props.threeStandouts[0]), 
                    React.createElement("li", null, this.props.threeStandouts[1]), 
                    React.createElement("li", null, this.props.threeStandouts[2])
                ), 

                React.createElement("p", null, "Du har gett bra exempel på dem alla! Använd exemplen när du skriver din jobbansökan och var också beredd att använda dem under en intervju. "), 

                React.createElement("p", null, "Den här övningen är nu slut. Du kommer att hitta dina topp-3-styrkor i appen när du vill. Fortsätt gärna använda tjänsten! "), 

                React.createElement("p", null, "Hjälp oss genom att svara på ", React.createElement("a", {href: "https://docs.google.com/forms/d/13iqOYQDe6YHEhDdc-XIoQQe4DD6HXLUVYf1W4GcUu0o/viewform?usp=send_form", target: "_blank"}, "två korta frågor."))
            )
            );
    }
});

CS.Controllers.WorkbookArea = P(function (c) {
    c.$el = $(document.getElementById("content"));

    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                controller: null,
                workbookArea: null,
                workbookItems: [],
                customTask: null,
                isAdmin: false,
                isCustomTaskComplete: false,
                isPepTalkClosed: false
            };
        },

        render: function () {
            var workbookAreaDescriptionReact = null;
            var threeStandoutsReact = null;
            var pepTalkReact = null;
            var taskReact = null;
            var adminPanelReact = null;

            if (this.state.workbookArea) {
                workbookAreaDescriptionReact = React.createElement(CS.Controllers.WorkbookAreaDescription, {workbookAreaClassName: this.state.workbookArea.className, controller: this.state.controller});

                if (CS.account.data && CS.account.data.standouts && CS.account.data.standouts[this.state.workbookArea.className]) {
                    threeStandoutsReact = React.createElement(CS.Controllers.ThreeStandoutPanel[this.state.workbookArea.className], {threeStandouts: CS.account.data.standouts[this.state.workbookArea.className]});
                } else {
                    if (!this.state.isPepTalkClosed && !this.state.customTask) {
                        var taskCompletePepTalk = null;

                        if (this.state.isCustomTaskComplete) {
                            taskCompletePepTalk = { templateClassName: "WorkbookAreaCustomTaskComplete" };
                        } else {
                            taskCompletePepTalk = _.find(CS.WorkbookAreaTaskCompletePepTalks, function (pepTalk) {
                                return pepTalk.getWorkbookArea().id === this.state.workbookArea.id && pepTalk.isActive();
                            }.bind(this));
                        }

                        if (taskCompletePepTalk) {
                            pepTalkReact = React.createElement(CS.Controllers[taskCompletePepTalk.templateClassName], {workbookArea: this.state.workbookArea, controller: this.state.controller});
                        }
                    }

                    if (!this.state.isCustomTaskComplete) {
                        var activeTask = this.state.customTask ||
                            _.find(CS.WorkbookAreaTasks, function (task) {  // Level 3
                                return task.getWorkbookArea().id === this.state.workbookArea.id && task.level === 3 && task.isActive();
                            }.bind(this)) ||
                            _.find(CS.WorkbookAreaTasks, function (task) {  // Level 2
                                return task.getWorkbookArea().id === this.state.workbookArea.id && task.level === 2 && task.isActive();
                            }.bind(this)) ||
                            _.find(CS.WorkbookAreaTasks, function (task) {  // Level 1
                                return task.getWorkbookArea().id === this.state.workbookArea.id && task.level === 1 && task.isActive();
                            }.bind(this));

                        if (activeTask) {
                            var nextTask = _.find(CS.WorkbookAreaTasks, function (task) {
                                return task.previousTaskId === activeTask.id;
                            });

                            var comingUpNextText = nextTask ? nextTask.comingUpText : null;

                            taskReact = React.createElement(CS.Controllers[activeTask.templateClassName], {task: activeTask, workbookArea: this.state.workbookArea, comingUpNextText: comingUpNextText, hidden: taskCompletePepTalk && !this.state.isPepTalkClosed, controller: this.state.controller});
                        }
                    }
                }

                if (this.state.isAdmin && !this.state.customTask) {
                    adminPanelReact = React.createElement(CS.Controllers.AdminPanel, {workbookArea: this.state.workbookArea, controller: this.state.controller});
                }
            }

            return (
                React.createElement("div", {ref: "wrapper", id: "content-wrapper"}, 
                    workbookAreaDescriptionReact, 
                    threeStandoutsReact, 
                    pepTalkReact, 
                    taskReact, 
                    adminPanelReact, 

                    React.createElement("ul", {className: "styleless item-names-list"}, 
                        this.state.workbookItems.map(function (item, index) {
                            var reactItemId = "blueprint-item-" + index + "-" + item.name;

                            return React.createElement(CS.Controllers.WorkbookAreaWorkbookItem, {key: reactItemId, workbookAreaClassName: this.state.workbookArea.className, workbookItem: item, workbookItemIndex: index, controller: this});
                        }.bind(this))
                    ), 

                    React.createElement("form", {role: "form", className: "item-composer", onSubmit: this._handleComposerFormSubmit}, 
                        React.createElement("textarea", {className: "form-control", onKeyUp: this._handleTextareaKeyUp}), 
                        React.createElement("button", {className: "btn btn-primary"}, "Lägg till"), 
                        React.createElement("button", {type: "button", className: "styleless fa fa-times", onClick: this._hideForm})
                    ), 

                    React.createElement("a", {className: "add-item-link", onClick: this._showComposer}, "+ Lägg till")
                )
                );
        },

        componentDidMount: function () {
            this._initElements();
        },

        componentDidUpdate: function () {
            this._initSortable();
            this._initDescriptionAndTaskPanels();
        },

        _initElements: function () {
            this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
            this.$list = this.$wrapper.children("ul");
            this.$form = this.$wrapper.children("form");
            this.$addItemLink = this.$form.siblings(".add-item-link");
            this.$textarea = this.$form.children("textarea");
        },

        _initDescriptionAndTaskPanels: function () {
            this.$areaDescriptionWrapper = this.$wrapper.children("#area-description");
            this.$taskWrapper = this.$wrapper.children(".workbook-task");

            if (_.isEmpty(this.state.workbookItems) && !_.includes(CS.account.data.idOfClosedAreaDescriptionPanels, this.state.workbookArea.id)) {
                this.$addItemLink.hide();
                this.$taskWrapper.hide();
                this.$areaDescriptionWrapper.show();
            } else {
                this.$areaDescriptionWrapper.hide();

                if (!this.$taskWrapper.hasClass("hidd3n")) {
                    this.$taskWrapper.show();
                    this.$addItemLink.show();
                }
            }
        },

        _initSortable: function () {
            if (!this.sortable) {
                this.sortable = new Sortable(this.$list[0],
                    {
                        animation: 150,
                        onUpdate: function () {
                            CS.Controllers.WorkbookAreaCommon.handleWorkbookItemsReordered(this.$list.children(), this.state.workbookArea.className, this.state.controller.reRender.bind(this.state.controller));
                        }.bind(this),
                        handle: ".fa-bars"
                    }
                );
            }
        },

        _showComposer: function () {
            this.$form.show();
            this.$textarea.focus();

            CS.Controllers.WorkbookAreaCommon.adaptTextareaHeight(this.$textarea);

            this.$addItemLink.hide();

            ga("send", "event", "link", "click", "Workbook Area > Show composer at the bottom");
        },

        _handleComposerFormSubmit: function (e) {
            if (e) {
                e.preventDefault();
            }

            var itemNameToAdd = this.$textarea.val().trim();
            if (itemNameToAdd && !CS.Controllers.WorkbookAreaCommon.doesItemAlreadyExist(itemNameToAdd, this.state.workbookArea.className)) {
                this._fetchLatestAccountDataAndUpdateIt(itemNameToAdd);
            }

            CS.Controllers.WorkbookAreaCommon.resetAndHideForm(this.$textarea, this._hideForm);

            ga("send", "event", "form", "submit", "[" + CS.account.email + "] Workbook Area (" + this.state.workbookArea.className + ") > Add item outside task: " + itemNameToAdd);
        },

        _handleTextareaKeyUp: function (e) {
            CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleComposerFormSubmit, this._hideForm);
        },

        _hideForm: function () {
            this.$form.hide();
            this.$addItemLink.show();
        },

        _fetchLatestAccountDataAndUpdateIt: function (itemNameToAdd) {
            var type = "GET";
            var url = "/api/account-data";

            $.ajax({
                url: url,
                type: type,
                success: function (data) {
                    CS.account.data = data || {};

                    var updatedBlueprintAreaData = !_.isEmpty(CS.account.data[this.state.workbookArea.className]) ? _.clone(CS.account.data[this.state.workbookArea.className], true) : [];
                    updatedBlueprintAreaData.push({
                        name: itemNameToAdd,
                        notes: []
                    });

                    CS.account.data[this.state.workbookArea.className] = updatedBlueprintAreaData;
                    this.state.controller.saveAccountData();
                }.bind(this),
                error: function () {
                    alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
                }
            });
        },

        showTask: function () {
            CS.Controllers.WorkbookCommon.saveAreaDescriptionAsClosed(this.state.workbookArea.id);

            CS.Services.Animator.fadeOut(this.$areaDescriptionWrapper, {
                animationDuration: CS.animationDuration.short,
                onComplete: function () {
                    CS.Services.Animator.fadeIn(this.$taskWrapper);
                    CS.Services.Animator.fadeIn(this.$addItemLink);
                }.bind(this)
            });
        }
    });

    c.init = function (workbookArea, customTasks, isAdmin) {
        this.workbookArea = workbookArea;

        this.customTasks = _.isEmpty(customTasks) ? [] :
            _.map(customTasks, function (task) {
                task.templateClassName = CS.Controllers.WorkbookAreaCommon.customAreaTaskTemplateClassName;
                return task;
            });

        this.isAdmin = isAdmin;

        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$el[0]
        );

        this.reRender();
    };

    c.reRender = function () {
        var firstCustomTaskNotCompleted = _.find(this.customTasks, function (task) {
            return task.completionTimestamp === undefined;
        });

        this.reactInstance.replaceState({
            controller: this,
            workbookArea: this.workbookArea,
            workbookItems: CS.account.data[this.workbookArea.className] ? CS.account.data[this.workbookArea.className] : [],
            customTask: firstCustomTaskNotCompleted,
            isAdmin: this.isAdmin,
            isCustomTaskComplete: this.isCustomTaskComplete || false,
            isPepTalkClosed: this.isPepTalkClosed || false
        });
    };

    c.saveAccountData = function () {
        this.reRender();
        CS.saveAccountData();
    };

    c.showTask = function () {
        this.reactInstance.showTask();
    };

    c.handleCustomTaskCompleteConfirmed = function () {
        this.isCustomTaskComplete = false;
        this.reRender();
    };

    c.handleTaskCompletePepTalkClosed = function () {
        this.isPepTalkClosed = true;
        this.reRender();
    };
});

CS.Controllers.WorkbookAreaDescription = React.createClass({displayName: "WorkbookAreaDescription",
    render: function () {
        var workbookAreaDescription = _.find(CS.Controllers.Texts, function(text) {
            return text.type === "workbook-area-description" &&
                text.workbookAreaClassName === this.props.workbookAreaClassName;
        }.bind(this)).htmlText;

        return (
            React.createElement("div", {id: "area-description"}, 
                React.createElement("article", {className: "workbook-area-description-text-wrapper", dangerouslySetInnerHTML: {__html: workbookAreaDescription}}), 
                React.createElement("div", {className: "centered-contents"}, 
                    React.createElement("button", {className: "btn btn-primary", onClick: this._showTask}, "Ok!")
                )
            )
            );
    },

    _showTask: function() {
        this.props.controller.showTask();

        ga("send", "event", "button", "click", "Workbook Area > Close area description");
    }
});

CS.Controllers.WorkbookAreaWorkbookItem = React.createClass({displayName: "WorkbookAreaWorkbookItem",
    render: function () {
        var href = "/workbook-items/" + this.props.workbookAreaClassName + "/" + this.props.workbookItemIndex;

        // TODO: replace .fa-bars element from <span> back to <button> after bug https://github.com/RubaXa/Sortable/issues/370 is fixed

        return (
            React.createElement("li", {ref: "li"}, 
                React.createElement("div", {className: "notes-indicator"}), 
                React.createElement("span", {className: "fa fa-bars"}), 
                React.createElement("p", null, React.createElement("a", {href: href}, this.props.workbookItem.name)), 
                React.createElement("button", {className: "styleless fa fa-pencil", onClick: this._showEditor}), 
                React.createElement("form", {role: "form", className: "item-composer", onSubmit: this._handleComposerFormSubmit}, 
                    React.createElement("textarea", {className: "form-control", onKeyUp: this._handleTextareaKeyUp}), 
                    React.createElement("button", {className: "btn btn-primary"}, "Spara ändringar"), 
                    React.createElement("button", {type: "button", className: "styleless fa fa-times", onClick: this._hideForm})
                )
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
        CS.Controllers.WorkbookAreaCommon.initNotesIndicator(this.$notesIndicator, CS.account.data[this.props.workbookAreaClassName][this.props.workbookItemIndex].notes.length);
    },

    _initElements: function() {
        this.$listItem = $(React.findDOMNode(this.refs.li));
        this.$list = this.$listItem.parent();

        this.$notesIndicator = this.$listItem.children(".notes-indicator");
        this.$itemNameParagraph = this.$listItem.children("p");
        this.$editBtn = this.$listItem.children("button");
        this.$form = this.$listItem.children(".item-composer");
        this.$textarea = this.$form.children("textarea");

        this.$contentWrapper = this.$listItem.parents("#content-wrapper");
    },

    _showEditor: function () {
        this._hideOtherOpenComposers();

        this.$textarea.val(this.props.workbookItem.name);

        this.$listItem.addClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);

        CS.Controllers.WorkbookAreaCommon.disableSortable(this.props.controller);

        this.$itemNameParagraph.hide();
        this.$editBtn.hide();
        this.$contentWrapper.addClass("editing");
        this.$form.show();
        CS.Controllers.WorkbookAreaCommon.adaptTextareaHeight(this.$textarea);
        this.$textarea.focus();

        ga("send", "event", "button", "click", "Workbook Area > Open item editor");
    },

    _hideOtherOpenComposers: function() {
        var $listItems = this.$list.children();
        var $composerForms = $listItems.children(".item-composer");
        var $itemNameParagraphs = $listItems.children("p");
        var $editBtns = $listItems.children(".fa-pencil");

        $listItems.removeClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);
        $composerForms.hide();
        $itemNameParagraphs.show();
        $editBtns.show();
    },

    _handleComposerFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var newItemName = this.$textarea.val().trim();
        this._fetchLatestAccountDataAndUpdateIt(newItemName);

        ga("send", "event", "form", "submit", "[" + CS.account.email + "] Workbook Area > Submit item change: " + newItemName);
    },

    _handleTextareaKeyUp: function(e) {
        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleComposerFormSubmit, this._hideForm);
    },

    _hideForm: function() {
        this.$listItem.removeClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);
        this.$form.hide();
        this.$itemNameParagraph.show();
        this.$editBtn.show();
        this.$contentWrapper.removeClass("editing");

        CS.Controllers.WorkbookAreaCommon.enableSortable(this.props.controller);
    },

    _fetchLatestAccountDataAndUpdateIt: function(newItemName) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var updatedBlueprintAreaData = !_.isEmpty(CS.account.data[this.props.workbookAreaClassName]) ? _.clone(CS.account.data[this.props.workbookAreaClassName], true) : [];

                if (newItemName) {
                    updatedBlueprintAreaData[this.props.workbookItemIndex].name = newItemName;
                } else {
                    updatedBlueprintAreaData.splice(this.props.workbookItemIndex, 1);

                    // We hide it from the UI to give faster feedback
                    this.$listItem.hide();
                }

                CS.Controllers.WorkbookAreaCommon.resetAndHideForm(this.$textarea, this._hideForm);

                CS.account.data[this.props.workbookAreaClassName] = updatedBlueprintAreaData;
                CS.workbookAreaController.saveAccountData();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

CS.Controllers.WorkbookItemAddItemComplete = React.createClass({displayName: "WorkbookItemAddItemComplete",
    render: function () {
        return (
            React.createElement("div", {id: "task-complete-pep-talk"}, 
                React.createElement("h2", null, React.createElement("i", {className: "fa fa-star"}), "Bra jobbat! ", React.createElement("i", {className: "fa fa-star"})), 
                React.createElement("p", null, "Lägg till fler exempel och förklara djupare. Ju längre du går, desto bättre. "), 
                React.createElement("p", null, "Du kan också gå tillbaka för att jobba med ", React.createElement("a", {onClick: this._navigateBack}, "ett annat ämne.")), 
                React.createElement("div", {className: "centered-contents"}, 
                    React.createElement("button", {className: "btn btn-primary", onClick: this._handleTaskCompletePepTalkClosed}, "Ok!")
                )
            )
            );
    },

    _handleTaskCompletePepTalkClosed: function () {
        this.props.controller.handleTaskCompletePepTalkClosed();

        ga("send", "event", "button", "click", "Workbook Item > Pep talk > Closed add note");
    },

    _navigateBack: function() {
        history.back();
    }
});

CS.Controllers.WorkbookItemCustomTaskComplete = React.createClass({displayName: "WorkbookItemCustomTaskComplete",
    render: function () {
        return (
            React.createElement("div", {id: "task-complete-pep-talk"}, 
                React.createElement("h2", null, React.createElement("i", {className: "fa fa-star"}), "Tack!", React.createElement("i", {className: "fa fa-star"})), 
                React.createElement("p", null, "En karriäragent kommer att ta en titt för att hjälpa dig vidare ytterligare."), 
                React.createElement("p", null, "Jobba gärna vidare under tiden! Med det här ämnet eller med ett annat."), 
                React.createElement("div", {className: "centered-contents"}, 
                    React.createElement("button", {className: "btn btn-primary", onClick: this._handleTaskCompletePepTalkClosed}, "Gå vidare")
                )
            )
            );
    },

    _handleTaskCompletePepTalkClosed: function () {
        this.props.controller.handleTaskCompletePepTalkClosed();

        ga("send", "event", "button", "click", "Workbook Item > Pep talk > Closed custom task");
    }
});

CS.Controllers.WorkbookItemAddItemTask = React.createClass({displayName: "WorkbookItemAddItemTask",
    render: function () {
        var textareaId = "add-note-task";
        this.currentWording = CS.Models.WorkbookItemTaskCommon.getNextWording(this.props.task, this.props.workbookItemIndex);
        this.currentWordingPrompt = CS.Services.String.template(this.currentWording.prompt, "itemName", this.props.workbookItemName);

        var wrapperClasses = classNames({
            "workbook-task": true,
            "hidd3n": this.props.hidden
        });

        return (
            React.createElement("div", {className: wrapperClasses, ref: "wrapper"}, 
                React.createElement("p", null, "Du jobbar med: ", this.props.task.workingOnText), 
                React.createElement("div", {className: "progress"}, 
                    React.createElement("div", {className: "progress-bar progress-bar-success", role: "progressbar", "aria-valuenow": "", "aria-valuemin": "0", "aria-valuemax": "100"})
                ), 
                React.createElement("form", {role: "form", className: "item-composer task", onSubmit: this._handleFormSubmit}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {htmlFor: textareaId, dangerouslySetInnerHTML: {__html: this.currentWordingPrompt}}), 
                        React.createElement("textarea", {className: "form-control", id: textareaId, onKeyUp: this._handleTextareaKeyUp})
                    ), 
                    React.createElement("button", {className: "btn btn-primary"}, "Lägg till"), 
                    React.createElement("a", {onClick: this._setCurrentTaskAsSkippedAndReRender}, "Prova en annan fråga")
                )
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
        this._initProgressBar();
        this._initTextareaValue();
    },

    componentDidUpdate: function() {
        this._initProgressBar();
        this._initTextareaValue();
    },

    _initElements: function () {
        this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
        this.$progressBar = this.$wrapper.find(".progress-bar");
        this.$form = this.$wrapper.children("form");
        this.$textarea = this.$form.find("textarea");
    },

    _initProgressBar: function() {
        var itemCount = CS.account.data[this.props.workbookArea.className][this.props.workbookItemIndex].notes.length;
        CS.Controllers.WorkbookCommon.setProgressBarWidth(this.$progressBar, itemCount, this.props.task.stepCount);
    },

    _initTextareaValue: function () {
        if (this.currentWording.sentenceStart) {
            this.$textarea.val(this.currentWording.sentenceStart);
        }
    },

    getLocalStorageKeyForSkippedTaskPrompts: function () {
        return CS.Models.WorkbookItemTaskCommon.getLocalStorageKeyForSkippedTaskPrompts(this.props.workbookArea.id, this.props.workbookItemIndex);
    },

    _handleFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var itemNoteToAdd = this.$textarea.val().trim();

        if (this._isValid(itemNoteToAdd) && !CS.Controllers.WorkbookItemCommon.doesItemAlreadyExist(itemNoteToAdd, this.props.workbookArea.className, this.props.workbookItemIndex)) {
            this._fetchLatestAccountDataAndUpdateIt(itemNoteToAdd);
        }

        ga("send", "event", "form", "submit", "[" + CS.account.email + "] Workbook Item (" + this.props.workbookItemName + ") > Add note task (" + this.currentWordingPrompt + ") > Add note: " + itemNoteToAdd);
    },

    _isValid: function(trimmedItemNote) {
        if (!trimmedItemNote) {
            return false;
        }

        if (!this.currentWording.sentenceStart) {
            return true;
        }

        return this.currentWording.sentenceStart.trim() !== trimmedItemNote;
    },

    _setCurrentTaskAsSkippedAndReRender: function () {
        var skippedTaskPrompts = CS.Services.Browser.getFromLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts()) || [];
        skippedTaskPrompts.push(this.currentWording.prompt);

        CS.Services.Browser.saveInLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts(), skippedTaskPrompts);

        this.$form[0].reset();
        this.props.controller.reRender();

        ga("send", "event", "link", "click", "Workbook Item > Add item task > Try another");
    },

    _handleTextareaKeyUp: function (e) {
        if (this.currentWording.sentenceStart && !_.startsWith(this.$textarea.val(), this.currentWording.sentenceStart)) {
            this.$textarea.val(this.currentWording.sentenceStart);
        }

        CS.Controllers.WorkbookItemCommon.handleTextareaKeyUp(e);
    },

    _fetchLatestAccountDataAndUpdateIt: function(itemNoteToAdd) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var updatedWorkbookItemNotesData = CS.account.data[this.props.workbookArea.className][this.props.workbookItemIndex].notes || [];
                updatedWorkbookItemNotesData.push(itemNoteToAdd);

                CS.account.data[this.props.workbookArea.className][this.props.workbookItemIndex].notes = updatedWorkbookItemNotesData;

                var describedWorkbookItemIds = CS.account.data.describedWorkbookItemIds || {};
                var describedWorkbookItemIdsForThisArea = describedWorkbookItemIds[this.props.workbookArea.className] || [];
                if (!_.contains(describedWorkbookItemIdsForThisArea, this.props.workbookItemIndex)) {
                    describedWorkbookItemIdsForThisArea.push(this.props.workbookItemIndex);
                }
                describedWorkbookItemIds[this.props.workbookArea.className] = describedWorkbookItemIdsForThisArea;
                CS.account.data.describedWorkbookItemIds = describedWorkbookItemIds;

                CS.saveAccountData();

                this._setCurrentTaskAsSkippedAndReRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

CS.Controllers.WorkbookItemCustomTask = React.createClass({displayName: "WorkbookItemCustomTask",
    render: function () {
        var tipReact = null;
        if (this.props.task.tip) {
            var tipReadBtnReact = null;

            if (!this.props.task.question) {
                tipReadBtnReact = (
                    React.createElement("div", {className: "centered-contents"}, 
                        React.createElement("button", {className: "btn btn-primary", onClick: this._setCustomTaskAsCompletedAndReRender}, "Got it")
                    )
                    );
            }

            tipReact = (
                React.createElement("div", {id: "custom-task-tip"}, 
                    React.createElement("i", {className: "fa fa-lightbulb-o"}), React.createElement("p", null, this.props.task.tip), 
                    tipReadBtnReact
                )
                );
        }

        var questionReact = null;
        if (this.props.task.question) {
            questionReact = (
                React.createElement("form", {role: "form", ref: "form", className: "item-composer task custom", onSubmit: this._handleFormSubmit}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {htmlFor: "custom-task-field"}, this.props.task.question), 
                        React.createElement("textarea", {className: "form-control", id: "custom-task-field", onKeyUp: CS.Controllers.WorkbookItemCommon.handleTextareaKeyUp})
                    ), 
                    React.createElement("button", {className: "btn btn-primary"}, "Lägg till")
                )
                );
        }

        return (
            React.createElement("div", {className: "workbook-task"}, 
                tipReact, 
                questionReact
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
    },

    _initElements: function () {
        this.$form = $(React.findDOMNode(this.refs.form));
        this.$textarea = this.$form.find("#custom-task-field");
    },

    _handleFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var itemNoteToAdd = this.$textarea.val().trim();

        if (this._isValid(itemNoteToAdd) && !CS.Controllers.WorkbookItemCommon.doesItemAlreadyExist(itemNoteToAdd, this.props.workbookArea.className, this.props.workbookItemIndex)) {
            this._fetchLatestAccountDataAndUpdateIt(itemNoteToAdd);
        }

        ga("send", "event", "form", "submit", "[" + CS.account.email + "] Workbook Item > Custom task > Add note: " + itemNoteToAdd + ". Question was: " + this.props.task.question);
    },

    _fetchLatestAccountDataAndUpdateIt: function (itemNoteToAdd) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var updatedWorkbookItemNotesData = CS.account.data[this.props.workbookArea.className][this.props.workbookItemIndex].notes || [];
                updatedWorkbookItemNotesData.push(itemNoteToAdd);

                CS.account.data[this.props.workbookArea.className][this.props.workbookItemIndex].notes = updatedWorkbookItemNotesData;

                var describedWorkbookItemIds = CS.account.data.describedWorkbookItemIds || {};
                var describedWorkbookItemIdsForThisArea = describedWorkbookItemIds[this.props.workbookArea.className] || [];
                if (!_.contains(describedWorkbookItemIdsForThisArea, this.props.workbookItemIndex)) {
                    describedWorkbookItemIdsForThisArea.push(this.props.workbookItemIndex);
                }
                describedWorkbookItemIds[this.props.workbookArea.className] = describedWorkbookItemIdsForThisArea;
                CS.account.data.describedWorkbookItemIds = describedWorkbookItemIds;

                CS.saveAccountData();

                this._setCustomTaskAsCompletedAndReRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    },

    _isValid: function(trimmedItemName) {
        return trimmedItemName;
    },

    _setCustomTaskAsCompletedAndReRender: function () {
        var type = "PUT";
        var url = "/api/custom-tasks";

        $.ajax({
            url: url,
            type: type,
            contentType: "application/json",
            data: JSON.stringify(this.props.task),
            success: function (data) {
                this._resetForm();

                var lastIndex = this.props.controller.customTasks.length - 1;
                this.props.controller.customTasks[lastIndex] = data;
                this.props.controller.isCustomTaskComplete = true;

                this.props.controller.reRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    },

    _resetForm: function() {
        if (this.$form.length > 0) {
            this.$form[0].reset();
        }
    }
});

CS.Controllers.WorkbookItem = P(function (c) {
    c.$el = $(document.getElementById("content"));

    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                controller: null,
                workbookArea: null,
                workbookItem: null,
                workbookItemIndex: null,
                customTask: null,
                isAdmin: false,
                isCustomTaskComplete: false,
                isPepTalkClosed: false
            };
        },

        render: function () {
            var pepTalkReact = null;
            var taskReact = null;
            var adminPanelReact = null;
            var listItemsReact = null;

            if (this.state.workbookArea) {
                if (!this.state.isPepTalkClosed && !this.state.customTask) {
                    var taskCompletePepTalk = null;

                    if (this.state.isCustomTaskComplete) {
                        taskCompletePepTalk = { templateClassName: "WorkbookItemCustomTaskComplete" };
                    } else {
                        taskCompletePepTalk = _.find(CS.WorkbookItemTaskCompletePepTalks, function(pepTalk) {
                            return pepTalk.getWorkbookArea().id === this.state.workbookArea.id && pepTalk.isActive(this.state.workbookItemIndex);
                        }.bind(this));
                    }

                    if (taskCompletePepTalk) {
                        pepTalkReact = React.createElement(CS.Controllers[taskCompletePepTalk.templateClassName], {workbookArea: this.state.workbookArea, controller: this.state.controller});
                    }
                }

                if (!this.state.isCustomTaskComplete) {
                    var activeTask = this.state.customTask ||
                        _.find(CS.WorkbookItemTasks, function (task) {
                            return task.getWorkbookArea().id === this.state.workbookArea.id && task.isActive(this.state.workbookItemIndex);
                        }.bind(this));

                    if (activeTask) {
                        taskReact = React.createElement(CS.Controllers[activeTask.templateClassName], {task: activeTask, workbookArea: this.state.workbookArea, workbookItemName: this.state.workbookItem.name, workbookItemIndex: this.state.workbookItemIndex, hidden: taskCompletePepTalk && !this.state.isPepTalkClosed, controller: this.state.controller});
                    }
                }

                if (this.state.isAdmin && !this.state.customTask) {
                    adminPanelReact = (
                        React.createElement("section", {className: "admin-panel"}, 
                            React.createElement(CS.Controllers.AddCustomTask, {workbookAreaId: this.state.workbookArea.id, workbookItemIndex: this.state.workbookItemIndex, controller: this.state.controller})
                        )
                        );
                }

                if (this.state.workbookItem && !_.isEmpty(this.state.workbookItem.notes)) {
                    listItemsReact = this.state.workbookItem.notes.map(function (note, index) {
                        var reactItemId = "workbook-item-note" + note;

                        return React.createElement(CS.Controllers.WorkbookItemNote, {key: reactItemId, workbookAreaClassName: this.state.workbookArea.className, workbookItem: this.state.workbookItem, workbookItemIndex: this.state.workbookItemIndex, workbookItemNote: note, workbookItemNoteIndex: index});
                    }.bind(this));
                }
            }

            return (
                React.createElement("div", {ref: "wrapper"}, 
                    pepTalkReact, 
                    taskReact, 
                    adminPanelReact, 

                    React.createElement("ul", {className: "styleless item-notes-list"}, 
                        listItemsReact
                    ), 

                    React.createElement("form", {role: "form", className: "item-composer note", onSubmit: this._handleComposerFormSubmit}, 
                        React.createElement("textarea", {className: "form-control", onKeyUp: this._handleTextareaKeyUp}), 
                        React.createElement("button", {className: "btn btn-primary"}, "Lägg till"), 
                        React.createElement("button", {type: "button", className: "styleless fa fa-times", onClick: this._hideForm})
                    ), 

                    React.createElement("a", {className: "add-item-link", onClick: this._showComposer}, "+ Lägg till")
                )
                );
        },

        componentDidMount: function () {
            this._initElements();
        },

        _initElements: function () {
            this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
            this.$list = this.$wrapper.children("ul");
            this.$form = this.$wrapper.children("form");
            this.$addNoteLink = this.$form.siblings(".add-item-link");
            this.$textarea = this.$form.children("textarea");
        },

        _showComposer: function () {
            this.$form.show();
            this.$textarea.focus();

            CS.Controllers.WorkbookItemCommon.adaptTextareaHeight(this.$textarea);

            this.$addNoteLink.hide();

            ga("send", "event", "link", "click", "Workbook Item > Show composer at the bottom");
        },

        _handleComposerFormSubmit: function (e) {
            if (e) {
                e.preventDefault();
            }

            var itemNoteToAdd = this.$textarea.val().trim();
            if (itemNoteToAdd && !CS.Controllers.WorkbookItemCommon.doesItemAlreadyExist(itemNoteToAdd, this.state.workbookArea.className, this.state.workbookItemIndex)) {
                this._fetchLatestAccountDataAndUpdateIt(itemNoteToAdd);
            }

            CS.Controllers.WorkbookItemCommon.resetAndHideForm(this.$textarea, this._hideForm);

            ga("send", "event", "form", "submit", "[" + CS.account.email + "] Workbook Item > Add note outside task: " + itemNoteToAdd);
        },

        _handleTextareaKeyUp: function (e) {
            CS.Controllers.WorkbookItemCommon.handleTextareaKeyUp(e, this._hideForm);
        },

        _handleCustomTaskCompleteConfirmed: function() {
            this.controller.isCustomTaskComplete = false;
            this.controller.reRender();
        },

        _hideForm: function () {
            this.$form.hide();
            this.$addNoteLink.show();
        },

        _fetchLatestAccountDataAndUpdateIt: function (itemNoteToAdd) {
            var type = "GET";
            var url = "/api/account-data";

            $.ajax({
                url: url,
                type: type,
                success: function (data) {
                    CS.account.data = data || {};

                    var updatedWorkbookItemNotesData = CS.account.data[this.state.workbookArea.className][this.state.workbookItemIndex].notes || [];
                    updatedWorkbookItemNotesData.push(itemNoteToAdd);

                    CS.account.data[this.state.workbookArea.className][this.state.workbookItemIndex].notes = updatedWorkbookItemNotesData;

                    var describedWorkbookItemIds = CS.account.data.describedWorkbookItemIds || {};
                    var describedWorkbookItemIdsForThisArea = describedWorkbookItemIds[this.state.workbookArea.className] || [];
                    if (!_.contains(describedWorkbookItemIdsForThisArea, this.state.workbookItemIndex)) {
                        describedWorkbookItemIdsForThisArea.push(this.state.workbookItemIndex);
                    }
                    describedWorkbookItemIds[this.state.workbookArea.className] = describedWorkbookItemIdsForThisArea;
                    CS.account.data.describedWorkbookItemIds = describedWorkbookItemIds;

                    this.state.controller.saveAccountData();
                }.bind(this),
                error: function () {
                    alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
                }
            });
        }
    });

    c.init = function (workbookArea, workbookItem, customTasks, isAdmin) {
        this.workbookArea = workbookArea;
        this.workbookItem = workbookItem;

        this.customTasks = customTasks;
        if (!_.isEmpty(this.customTasks)) {
            this.customTasks = _.map(this.customTasks, function (task) {
                task.templateClassName = CS.Controllers.WorkbookAreaCommon.customItemTaskTemplateClassName;
                return task;
            });
        }

        this.isAdmin = isAdmin;

        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$el[0]
        );

        this.reRender();
    };

    c.reRender = function () {
        var firstCustomTaskNotCompleted = _.find(this.customTasks, function (task) {
            return task.completionTimestamp === undefined;
        });

        this.reactInstance.replaceState({
            controller: this,
            workbookArea: this.workbookArea,
            workbookItem: _.find(CS.account.data[this.workbookArea.className], "name", this.workbookItem.name),
            workbookItemIndex: _.findIndex(CS.account.data[this.workbookArea.className], "name", this.workbookItem.name),
            customTask: firstCustomTaskNotCompleted,
            isAdmin: this.isAdmin,
            isCustomTaskComplete: this.isCustomTaskComplete || false,
            isPepTalkClosed: this.isPepTalkClosed || false
        });
    };

    c.saveAccountData = function () {
        this.reRender();
        CS.saveAccountData();
    };

    c.handleCustomTaskCompleteConfirmed = function() {
        this.isCustomTaskComplete = false;
        this.reRender();
    };

    c.handleTaskCompletePepTalkClosed = function() {
        this.isPepTalkClosed = true;
        this.reRender();
    };
});

CS.Controllers.WorkbookItemNote = React.createClass({displayName: "WorkbookItemNote",
    render: function () {
        var noteText = CS.Services.String.textToHtml(this.props.workbookItemNote);

        return (
            React.createElement("li", {ref: "li"}, 
                React.createElement("p", {dangerouslySetInnerHTML: {__html: noteText}}), 
                React.createElement("button", {className: "styleless fa fa-pencil", onClick: this._showEditor}), 
                React.createElement("form", {role: "form", className: "item-composer note", onSubmit: this._handleComposerFormSubmit}, 
                    React.createElement("textarea", {className: "form-control", onKeyUp: this._handleTextareaKeyUp}), 
                    React.createElement("button", {className: "btn btn-primary"}, "Spara ändringar"), 
                    React.createElement("button", {type: "button", className: "styleless fa fa-times", onClick: this._hideForm})
                )
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
    },

    _initElements: function() {
        this.$listItem = $(React.findDOMNode(this.refs.li));
        this.$list = this.$listItem.parent();

        this.$itemNoteParagraph = this.$listItem.children("p");
        this.$editBtn = this.$listItem.children("button");
        this.$form = this.$listItem.children(".item-composer");
        this.$textarea = this.$form.children("textarea");

        this.$addNoteLink = this.$list.siblings(".add-item-link");
    },

    _showEditor: function () {
        this._hideOtherOpenComposers();

        this.$textarea.val(this.props.workbookItemNote);

        this.$listItem.addClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);

        this.$itemNoteParagraph.hide();
        this.$editBtn.hide();
        this.$addNoteLink.hide();
        this.$form.show();
        CS.Controllers.WorkbookItemCommon.adaptTextareaHeight(this.$textarea);
        this.$textarea.focus();

        ga("send", "event", "button", "click", "Workbook Item > Show edit item editor");
    },

    _hideOtherOpenComposers: function() {
        var $listItems = this.$list.children();
        var $composerForms = $listItems.children(".item-composer");
        var $itemNoteParagraphs = $listItems.children("p");
        var $editBtns = $listItems.children("button");

        $listItems.removeClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);
        $composerForms.hide();
        $itemNoteParagraphs.show();
        $editBtns.show();
        this.$addNoteLink.show();
    },

    _handleComposerFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var newItemNote = this.$textarea.val().trim();
        this._hideForm();
        this._fetchLatestAccountDataAndUpdateIt(newItemNote);

        ga("send", "event", "form", "submit", "[" + CS.account.email + "] Workbook Item > Save item change: " + newItemNote);
    },

    _handleTextareaKeyUp: function(e) {
        CS.Controllers.WorkbookItemCommon.handleTextareaKeyUp(e, this._handleComposerFormSubmit, this._hideForm);
    },

    _hideForm: function() {
        this.$listItem.removeClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);
        this.$form.hide();
        this.$itemNoteParagraph.show();
        this.$editBtn.show();
        this.$addNoteLink.show();
    },

    _fetchLatestAccountDataAndUpdateIt: function(newItemNote) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var updatedWorkbookItemNotesData = CS.account.data[this.props.workbookAreaClassName][this.props.workbookItemIndex].notes || [];

                if (newItemNote) {
                    updatedWorkbookItemNotesData[this.props.workbookItemNoteIndex] = newItemNote;
                } else {
                    updatedWorkbookItemNotesData.splice(this.props.workbookItemNoteIndex, 1);

                    // We hide it from the UI to give faster feedback
                    this.$listItem.hide();
                }

                CS.account.data[this.props.workbookAreaClassName][this.props.workbookItemIndex].notes = updatedWorkbookItemNotesData;
                CS.workbookItemController.saveAccountData();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

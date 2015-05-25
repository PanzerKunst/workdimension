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

CS.blueprintAreasModel = null;
CS.mainMenuController = null;
CS.taskNotificationsController = null;
CS.overviewController = null;
CS.workbookAreaController = null;
CS.blueprintAreasSelector = null;

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
    c.init = function (id, className, blueprintCategoryId, title) {
        this.id = id;
        this.className = className;
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

    c.init = function (blueprintAreas) {
        this.blueprintAreaInstances = blueprintAreas.map(function (item) {
            return CS.Models.BlueprintArea(item.id, item.className, item.workbookCategoryId, item.title);
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
    minItemCountForAddItemsLvl2TaskComplete: 6,

    getNextWording: function (areaTask) {
        var firstNotSkipped = _.find(areaTask.wordings, function (wording) {
            return !_.includes(CS.Services.Browser.getFromLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts(areaTask.workbookAreaId)), wording.prompt);
        }.bind(this));

        if (firstNotSkipped) {
            return firstNotSkipped;
        }

        // All have been skipped, we need to unskip them all
        this._unskipAll(areaTask.workbookAreaId);

        return _.find(areaTask.wordings, function (wording) {
            return !_.includes(CS.Services.Browser.getFromLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts(areaTask.workbookAreaId)), wording.prompt);
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
    minItemCountForAddItemsTaskComplete: 3,

    getNextWording: function (itemTask, itemIndex) {
        var firstNotSkipped = _.find(itemTask.wordings, function (wording) {
            return !_.includes(CS.Services.Browser.getFromLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts(itemTask.workbookAreaId, itemIndex)), wording.prompt);
        }.bind(this));

        if (firstNotSkipped) {
            return firstNotSkipped;
        }

        // All have been skipped, we need to unskip them all
        this._unskipAll(itemTask.workbookAreaId, itemIndex);

        return _.find(itemTask.wordings, function (wording) {
            return !_.includes(CS.Services.Browser.getFromLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts(itemTask.workbookAreaId, itemIndex)), wording.prompt);
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
        htmlText: "<p>What makes you, you? What parts of your character help you get the job done, and what aspects of your personality make you see things in a unique way? What are your skills?</p><p>In this section you'll answer questions about what makes you do a job like no one else can. </p>"
    },
    {
        type: "workbook-area-description",
        workbookAreaClassName: "Drivers",
        htmlText: "<p>TODO</p>"
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
        htmlText: "<p>TODO</p>"
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
        htmlText: "<p>TODO</p>"
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
        htmlText: "<p>TODO</p>"
    },
    {
        type: "workbook-area-description",
        workbookAreaClassName: "Tracks",
        htmlText: "<p>Putting words on what we want to do helps us make better decisions and makes it easier to reach what we aim for. Setting a goal can however feel daunting and not reaching it makes you feel bad about yourself.</p><p>We have a different approach. Think of different tracks you would like to or could see yourself try out some time. A track to pursue can be anything from a position you'd like to try, an industry that would be interesting to work in or an area you would like to learn more of.</p>"
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
        }
        CS.account.data.idOfClosedAreaDescriptionPanels = idOfClosedAreaDescriptionPanels;
        CS.saveAccountData();
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
        CS.Services.Animator.fadeOut($(".workbook-task"), {
            animationDuration: CS.animationDuration.short,
            onComplete: function () {
                CS.Services.Animator.fadeIn($("#area-description"));
            }
        });
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
        if (!CS.account.data.hasClosedGetStartedPanel) {
            this._showPanel();
        }
    };

    c._togglePanel = function() {
        if (this.$getStartedPanel.is(":visible")) {
            this._hidePanel();
        } else {
            this._showPanel();
        }
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
        if (!CS.account.data.hasClosedGetStartedPanel) {
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

                CS.account.data.hasClosedGetStartedPanel = true;
                CS.saveAccountData();
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
        CS.blueprintAreasModel.updateStatus();
        CS.taskNotificationsController.reRender();
    };

    c._signOut = function () {
        IN.User.logout(CS.mainMenuController.signOut, this);
    };

    c._spin = function() {
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
            React.createElement("section", {className: "add-custom-task-panel", ref: "wrapper"}, 
                React.createElement("a", {onClick: this._handleAddCustomTaskClick}, "Add custom task"), 

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
    },

    _initValidation: function() {
        this.validator = CS.Services.Validator([
            "tip",
            "question"
        ]);
    },

    _handleAddCustomTaskClick: function () {
        this.$form.toggle();
    },

    _handleTextareaKeyUp: function (e) {
        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleFormSubmit);
    },

    _handleFormSubmit: function (e) {
        e.preventDefault();

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

    c.init = function (blueprintAreas) {
        CS.blueprintAreasModel = CS.Models.BlueprintAreas(blueprintAreas);
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
    };

    c._showModal = function() {
        CS.blueprintAreasSelector.reRender();
        this.$selectAreasModal.modal();
        this.hideMenu();
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

                        var workbookArea = CS.blueprintAreasModel.getOfId(task.workbookAreaId);

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
            var workbookArea = CS.blueprintAreasModel.getOfId(task.workbookAreaId);
            return CS.account.data[workbookArea.className] ? -CS.account.data[workbookArea.className].length : 0;
        });

        var activeOldLvl2Tasks = _.filter(oldAreaTasks, function (task) {
            return task.level === 2;
        });

        var prioritizedOldLvl2Tasks = _.sortBy(activeOldLvl2Tasks, function (task) {
            var workbookArea = CS.blueprintAreasModel.getOfId(task.workbookAreaId);
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
                    React.createElement("button", {className: "btn btn-primary"}, "Add"), 
                    React.createElement("button", {type: "button", className: "styleless fa fa-times", onClick: this._hideForm})
                ), 

                React.createElement("a", {className: "add-item-link", onClick: this._showComposer}, "+ Add item")
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
    },

    _handleTextareaKeyUp: function (e) {
        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleComposerFormSubmit, this._hideForm);
    },

    _hideForm: function () {
        this.$well.removeClass(this.addItemComposerOpenCssClass);

        CS.overviewController.rePackerise();
    },

    _fetchLatestAccountDataAndUpdateIt: function(itemNameToAdd) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var updatedBlueprintAreaData = CS.account.data && !_.isEmpty(CS.account.data[this.props.blueprintAreaClassName]) ? _.clone(CS.account.data[this.props.blueprintAreaClassName], true) : [];
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

        var wellClasses = classNames("well",
            {
                "collapsed-list": this.props.blueprintAreaWithData.items.length > CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete
            });

        var workbookAreaDescription = _.find(CS.Controllers.Texts, function(text) {
            return text.type === "workbook-area-description" &&
                text.workbookAreaClassName === this._getBlueprintArea().className;
        }.bind(this)).htmlText;

        return (
            React.createElement("li", {className: "blueprint-area-panel", ref: "li"}, 
                React.createElement("div", {className: wellClasses}, 
                    React.createElement("h2", null, 
                        React.createElement("a", {href: workbookAreaTitleHref}, this._getBlueprintArea().title)
                    ), 
                    React.createElement("button", {className: "styleless fa fa-chevron-down menu", onClick: this._showActionsMenu}), 
                    React.createElement("section", {className: "workbook-area-actions"}, 
                        React.createElement("ul", {className: "styleless"}, 
                            React.createElement("li", null, React.createElement("i", {className: "fa fa-question-circle"}), React.createElement("a", {onClick: this._showWorkbookAreaDescriptionModal}, "Area info")), 
                            React.createElement("li", null, React.createElement("i", {className: "fa fa-eye-slash"}), React.createElement("a", {onClick: this._hideBlueprintAreaPanel}, "Hide this area"))
                        )
                    ), 

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

                React.createElement("div", {className: "modal fade workbook-area-description-modal"}, 
                    React.createElement("div", {className: "modal-dialog"}, 
                        React.createElement("div", {className: "modal-content"}, 
                            React.createElement("div", {className: "modal-header"}, 
                                React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close"}, 
                                    React.createElement("span", {"aria-hidden": "true"}, "×")
                                ), 
                                React.createElement("h2", {className: "modal-title"}, this._getBlueprintArea().title)
                            ), 
                            React.createElement("div", {className: "modal-body workbook-area-description-text-wrapper", dangerouslySetInnerHTML: {__html: workbookAreaDescription}}), 
                            React.createElement("div", {className: "modal-footer"}, 
                                React.createElement("button", {type: "button", className: "btn btn-default", "data-dismiss": "modal"}, "Close")
                            )
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
        this.$contentOverlayWhenMenuOpen.click(this._hideActionsMenu);
        this.$areaDescriptionModal.on("hidden.bs.modal", this._saveAreaDescriptionAsClosed);
    },

    _hideBlueprintAreaPanel: function () {
        this._getBlueprintArea().deactivate();
        CS.overviewController.reRender();
    },

    _toggleCollapsedList: function () {
        this.$well.toggleClass("collapsed-list");
        this.$well.toggleClass("expanded-list");

        CS.overviewController.rePackerise();
    },

    _showActionsMenu: function() {
        this.$mainContainer.addClass("workbook-area-actions-menu-open");
        this.$actionsMenu.show();
    },

    _hideActionsMenu: function() {
        this.$mainContainer.removeClass("workbook-area-actions-menu-open");
        this.$actionsMenu.hide();
    },

    _showWorkbookAreaDescriptionModal: function() {
        this.$areaDescriptionModal.modal();
        this._hideActionsMenu();
    },

    _saveAreaDescriptionAsClosed: function() {
        CS.Controllers.WorkbookCommon.saveAreaDescriptionAsClosed(this._getBlueprintArea().id);
    }
});

CS.Controllers.OverviewBlueprintItem = React.createClass({displayName: "OverviewBlueprintItem",
    render: function () {
        var href = "/workbook-items/" + this._getBlueprintAreaClassName() + "/" + this.props.blueprintItemIndex;

        return (
            React.createElement("li", {ref: "li"}, 
                React.createElement("div", {className: "notes-indicator"}), 
                React.createElement("button", {className: "styleless fa fa-bars"}), 
                React.createElement("p", null, React.createElement("a", {href: href}, this._getBlueprintItemName())), 
                React.createElement("button", {className: "styleless fa fa-pencil", onClick: this._showEditor}), 
                React.createElement("form", {role: "form", className: "item-composer", onSubmit: this._handleComposerFormSubmit}, 
                    React.createElement("textarea", {className: "form-control", onKeyUp: this._handleTextareaKeyUp}), 
                    React.createElement("button", {className: "btn btn-primary"}, "Save changes"), 
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

                var updatedBlueprintAreaData = CS.account.data && !_.isEmpty(CS.account.data[this._getBlueprintAreaClassName()]) ? _.clone(CS.account.data[this._getBlueprintAreaClassName()], true) : [];

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

CS.Controllers.WorkbookAreaAddItemLvl1Complete = React.createClass({displayName: "WorkbookAreaAddItemLvl1Complete",
    render: function () {
        return (
            React.createElement("div", {className: "workbook-task complete"}, 
                React.createElement("h2", null, React.createElement("i", {className: "fa fa-star"}), "Great work!", React.createElement("i", {className: "fa fa-star"})), 
                React.createElement("p", null, "A career advisor will get back to you with personal advice."), 
                React.createElement("p", null, "In the meantime, you can continue filling in your workbook; by adding more items to this topic, describing them, or navigating to other topics.")
            )
            );
    }
});

CS.Controllers.WorkbookAreaAddItemLvl2Task = React.createClass({displayName: "WorkbookAreaAddItemLvl2Task",
    render: function () {
        var comingUpNextParagraph = null;
        if (this.props.comingUpNextText) {
            comingUpNextParagraph = (
                React.createElement("p", {className: "coming-up-next"}, "Coming up next: ", this.props.comingUpNextText)
                );
        }

        return (
            React.createElement("div", {className: "workbook-task"}, 
                React.createElement("button", {className: "styleless fa fa-question-circle", onClick: CS.Controllers.WorkbookAreaCommon.showAreaDescription}), 
                React.createElement("p", {className: "working-on"}, "Working on: ", this.props.task.workingOnText), 
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
                React.createElement("p", {className: "coming-up-next"}, "Coming up next: ", this.props.comingUpNextText)
                );
        }

        return (
            React.createElement("div", {className: "workbook-task"}, 
                React.createElement("button", {className: "styleless fa fa-question-circle", onClick: CS.Controllers.WorkbookAreaCommon.showAreaDescription}), 
                React.createElement("p", {className: "working-on"}, "Working on: ", this.props.task.workingOnText), 
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
                React.createElement("button", {className: "btn btn-primary"}, "Add item"), 
                React.createElement("a", {onClick: this._setCurrentTaskAsSkippedAndReRender}, "Try another")
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

                var updatedBlueprintAreaData = CS.account.data && !_.isEmpty(CS.account.data[this.props.workbookArea.className]) ? _.clone(CS.account.data[this.props.workbookArea.className], true) : [];
                updatedBlueprintAreaData.push({
                    name: itemNameToAdd,
                    notes: []
                });

                CS.account.data[this.props.workbookArea.className] = updatedBlueprintAreaData;
                CS.saveAccountData();

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
                        React.createElement("textarea", {className: "form-control", id: "custom-task-field", onKeyUp: this._handleTextareaKeyUp})
                    ), 
                    React.createElement("button", {className: "btn btn-primary"}, "Add item")
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

                var updatedBlueprintAreaData = CS.account.data && !_.isEmpty(CS.account.data[this.props.workbookArea.className]) ? _.clone(CS.account.data[this.props.workbookArea.className], true) : [];
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
                React.createElement("p", {className: "coming-up-next"}, "Coming up next: ", this.props.comingUpNextText)
                );
        }

        var currentWording = CS.Models.WorkbookAreaTaskCommon.getNextWording(this.props.task);

        return (
            React.createElement("div", {className: "workbook-task"}, 
                React.createElement("button", {className: "styleless fa fa-question-circle", onClick: CS.Controllers.WorkbookAreaCommon.showAreaDescription}), 
                React.createElement("p", {className: "working-on"}, "Working on: ", this.props.task.workingOnText), 
                React.createElement("div", {className: "progress"}, 
                    React.createElement("div", {ref: "progressBar", className: "progress-bar progress-bar-success", role: "progressbar", "aria-valuenow": "0", "aria-valuemin": "0", "aria-valuemax": "100"}, "0%")
                ), 
                comingUpNextParagraph, 
                React.createElement("label", null, currentWording.prompt), 
                React.createElement("div", {className: "centered-contents"}, 
                    React.createElement("button", {className: "btn btn-primary", onClick: this._setCurrentWorkbookAreaAsPrioritizedAndReRender}, "I'm done prioritizing")
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
                this.props.controller.reRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
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
                isCustomTaskComplete: false
            };
        },

        render: function () {
            var workbookAreaDescriptionReact = null;
            var taskReact = null;
            var addCustomTaskPanelReact = null;

            if (this.state.workbookArea) {
                var workbookAreaDescription = _.find(CS.Controllers.Texts, function(text) {
                    return text.type === "workbook-area-description" &&
                        text.workbookAreaClassName === this.state.workbookArea.className;
                }.bind(this)).htmlText;

                workbookAreaDescriptionReact = (
                    React.createElement("div", {id: "area-description"}, 
                        React.createElement("article", {className: "workbook-area-description-text-wrapper", dangerouslySetInnerHTML: {__html: workbookAreaDescription}}), 
                        React.createElement("div", {className: "centered-contents"}, 
                            React.createElement("button", {className: "btn btn-primary", onClick: this._showTask}, "Got it")
                        )
                    )
                    );

                var activeTask = null;

                if (this.state.isCustomTaskComplete) {
                    taskReact = (
                        React.createElement("div", {className: "workbook-task complete"}, 
                            React.createElement("h2", null, React.createElement("i", {className: "fa fa-star"}), "Great work!", React.createElement("i", {className: "fa fa-star"})), 
                            React.createElement("p", null, "A career advisor will get back to you shortly."), 
                            React.createElement("p", null, "In the meantime, we invite you to continue working on this topic, or maybe switch to another one?"), 
                            React.createElement("div", {className: "centered-contents"}, 
                                React.createElement("button", {className: "btn btn-primary", onClick: this._handleCustomTaskCompleteConfirmed}, "Continue")
                            )
                        )
                        );
                } else {
                    activeTask = this.state.customTask ||
                        _.find(CS.WorkbookAreaTasks, function (task) {  // Level 3
                            return task.workbookAreaId === this.state.workbookArea.id && task.level === 3 && task.isActive();
                        }.bind(this)) ||
                        _.find(CS.WorkbookAreaTasks, function (task) {   // Level 2
                            return task.workbookAreaId === this.state.workbookArea.id && task.level === 2 && task.isActive();
                        }.bind(this)) ||
                        _.find(CS.WorkbookAreaTasks, function (task) {   // Level 1
                            return task.workbookAreaId === this.state.workbookArea.id && task.level === 1 && task.isActive();
                        }.bind(this));
                }

                if (activeTask) {
                    var nextTask = _.find(CS.WorkbookAreaTasks, function (task) {
                        return task.previousTaskId === activeTask.id;
                    });

                    var comingUpNextText = nextTask ? nextTask.comingUpText : null;

                    taskReact = React.createElement(CS.Controllers[activeTask.templateClassName], {task: activeTask, workbookArea: this.state.workbookArea, comingUpNextText: comingUpNextText, controller: this.state.controller});
                } else if (!this.state.isCustomTaskComplete) {
                    var doneTask = _.find(CS.WorkbookAreaTasks, function (task) {  // Level 3
                        return task.workbookAreaId === this.state.workbookArea.id && task.level === 3 && task.isDone();
                    }.bind(this));

                    if (doneTask) {
                        taskReact = (
                            React.createElement("div", {className: "workbook-task complete"}, 
                                React.createElement("h2", null, React.createElement("i", {className: "fa fa-star"}), "Great work!", React.createElement("i", {className: "fa fa-star"})), 
                                React.createElement("p", null, "You have completed all tasks for ", this.state.workbookArea.className, "."), 
                                React.createElement("p", null, "We invite you to work on other topics.")
                            )
                            );
                    }
                }

                if (this.state.isAdmin && !this.state.customTask) {
                    addCustomTaskPanelReact = React.createElement(CS.Controllers.AddCustomTask, {workbookAreaId: this.state.workbookArea.id, controller: this.state.controller});
                }
            }

            return (
                React.createElement("div", {ref: "wrapper", id: "content-wrapper"}, 
                    workbookAreaDescriptionReact, 
                    taskReact, 
                    addCustomTaskPanelReact, 

                    React.createElement("ul", {className: "styleless item-names-list"}, 
                        this.state.workbookItems.map(function (item, index) {
                            var reactItemId = "blueprint-item-" + index + "-" + item.name;

                            return React.createElement(CS.Controllers.WorkbookAreaWorkbookItem, {key: reactItemId, workbookAreaClassName: this.state.workbookArea.className, workbookItem: item, workbookItemIndex: index, controller: this});
                        }.bind(this))
                    ), 

                    React.createElement("form", {role: "form", className: "item-composer", onSubmit: this._handleComposerFormSubmit}, 
                        React.createElement("textarea", {className: "form-control", onKeyUp: this._handleTextareaKeyUp}), 
                        React.createElement("button", {className: "btn btn-primary"}, "Add"), 
                        React.createElement("button", {type: "button", className: "styleless fa fa-times", onClick: this._hideForm})
                    ), 

                    React.createElement("a", {className: "add-item-link", onClick: this._showComposer}, "+ Add item")
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
                this.$taskWrapper.hide();
                this.$areaDescriptionWrapper.show();
            } else {
                this.$areaDescriptionWrapper.hide();
                this.$taskWrapper.show();
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

            this.$addItemLink.hide();
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
        },

        _handleTextareaKeyUp: function (e) {
            CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleComposerFormSubmit, this._hideForm);
        },

        _handleCustomTaskCompleteConfirmed: function() {
            this.controller.isCustomTaskComplete = false;
            this.controller.reRender();
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

                    var updatedBlueprintAreaData = CS.account.data && !_.isEmpty(CS.account.data[this.state.workbookArea.className]) ? _.clone(CS.account.data[this.state.workbookArea.className], true) : [];
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

        _showTask: function () {
            CS.Controllers.WorkbookCommon.saveAreaDescriptionAsClosed(this.state.workbookArea.id);

            CS.Services.Animator.fadeOut(this.$areaDescriptionWrapper, {
                animationDuration: CS.animationDuration.short,
                onComplete: function () {
                    CS.Services.Animator.fadeIn(this.$taskWrapper);
                }.bind(this)
            });
        }
    });

    c.init = function (workbookArea, customTasks, isAdmin) {
        this.workbookArea = workbookArea;

        this.customTasks = customTasks;
        if (!_.isEmpty(this.customTasks)) {
            this.customTasks = _.map(this.customTasks, function(task) {
                task.templateClassName = CS.Controllers.WorkbookAreaCommon.customAreaTaskTemplateClassName;
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
        var firstCustomTaskNotCompleted = _.find(this.customTasks, function(task) {
            return task.completionTimestamp === undefined;
        });

        this.reactInstance.replaceState({
            controller: this,
            workbookArea: this.workbookArea,
            workbookItems: CS.account.data[this.workbookArea.className] ? CS.account.data[this.workbookArea.className] : [],
            customTask: firstCustomTaskNotCompleted,
            isAdmin: this.isAdmin,
            isCustomTaskComplete: this.isCustomTaskComplete || false
        });
    };

    c.saveAccountData = function () {
        this.reRender();
        CS.saveAccountData();
    };
});

CS.Controllers.WorkbookAreaWorkbookItem = React.createClass({displayName: "WorkbookAreaWorkbookItem",
    render: function () {
        var href = "/workbook-items/" + this.props.workbookAreaClassName + "/" + this.props.workbookItemIndex;

        return (
            React.createElement("li", {ref: "li"}, 
                React.createElement("div", {className: "notes-indicator"}), 
                React.createElement("button", {className: "styleless fa fa-bars"}), 
                React.createElement("p", null, React.createElement("a", {href: href}, this.props.workbookItem.name)), 
                React.createElement("button", {className: "styleless fa fa-pencil", onClick: this._showEditor}), 
                React.createElement("form", {role: "form", className: "item-composer", onSubmit: this._handleComposerFormSubmit}, 
                    React.createElement("textarea", {className: "form-control", onKeyUp: this._handleTextareaKeyUp}), 
                    React.createElement("button", {className: "btn btn-primary"}, "Save changes"), 
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

                var updatedBlueprintAreaData = CS.account.data && !_.isEmpty(CS.account.data[this.props.workbookAreaClassName]) ? _.clone(CS.account.data[this.props.workbookAreaClassName], true) : [];

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

CS.Controllers.WorkbookItemAddItemTask = React.createClass({displayName: "WorkbookItemAddItemTask",
    render: function () {
        var textareaId = "add-note-task";
        this.currentWording = CS.Models.WorkbookItemTaskCommon.getNextWording(this.props.task, this.props.workbookItemIndex);
        var currentWordingPrompt = CS.Services.String.template(this.currentWording.prompt, "itemName", this.props.workbookItemName);

        return (
            React.createElement("div", {className: "workbook-task", ref: "wrapper"}, 
                React.createElement("p", null, "Working on: ", this.props.task.workingOnText), 
                React.createElement("div", {className: "progress"}, 
                    React.createElement("div", {className: "progress-bar progress-bar-success", role: "progressbar", "aria-valuenow": "", "aria-valuemin": "0", "aria-valuemax": "100"})
                ), 
                React.createElement("form", {role: "form", className: "item-composer task", onSubmit: this._handleFormSubmit}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {htmlFor: textareaId, dangerouslySetInnerHTML: {__html: currentWordingPrompt}}), 
                        React.createElement("textarea", {className: "form-control", id: textareaId, onKeyUp: this._handleTextareaKeyUp})
                    ), 
                    React.createElement("button", {className: "btn btn-primary"}, "Add note"), 
                    React.createElement("a", {onClick: this._setCurrentTaskAsSkippedAndReRender}, "Try another")
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
                    React.createElement("button", {className: "btn btn-primary"}, "Add note")
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
                isCustomTaskComplete: false
            };
        },

        render: function () {
            var taskReact = null;
            var addCustomTaskPanelReact = null;

            if (this.state.workbookArea) {
                var activeTask = null;

                if (this.state.isCustomTaskComplete) {
                    taskReact = (
                        React.createElement("div", {className: "workbook-task complete"}, 
                            React.createElement("h2", null, React.createElement("i", {className: "fa fa-star"}), "Great work!", React.createElement("i", {className: "fa fa-star"})), 
                            React.createElement("p", null, "A career advisor will get back to you shortly."), 
                            React.createElement("p", null, "In the meantime, we invite you to continue working on this topic, or maybe switch to another one?"), 
                            React.createElement("div", {className: "centered-contents"}, 
                                React.createElement("button", {className: "btn btn-primary", onClick: this._handleCustomTaskCompleteConfirmed}, "Continue")
                            )
                        )
                        );
                } else {
                    activeTask = this.state.customTask ||
                        _.find(CS.WorkbookItemTasks, function (task) {
                            return task.workbookAreaId === this.state.workbookArea.id && task.isActive(this.state.workbookItemIndex);
                        }.bind(this));
                }

                if (activeTask) {
                    taskReact = React.createElement(CS.Controllers[activeTask.templateClassName], {task: activeTask, workbookArea: this.state.workbookArea, workbookItemName: this.state.workbookItem.name, workbookItemIndex: this.state.workbookItemIndex, controller: this.state.controller});
                }
            }

            if (this.state.isAdmin && !this.state.customTask) {
                addCustomTaskPanelReact = React.createElement(CS.Controllers.AddCustomTask, {workbookAreaId: this.state.workbookArea.id, workbookItemIndex: this.state.workbookItemIndex, controller: this.state.controller});
            }

            var listItems = null;
            if (this.state.workbookItem && !_.isEmpty(this.state.workbookItem.notes)) {
                listItems = this.state.workbookItem.notes.map(function (note, index) {
                    var reactItemId = "workbook-item-note" + note;

                    return React.createElement(CS.Controllers.WorkbookItemNote, {key: reactItemId, workbookAreaClassName: this.state.workbookArea.className, workbookItem: this.state.workbookItem, workbookItemIndex: this.state.workbookItemIndex, workbookItemNote: note, workbookItemNoteIndex: index});
                }.bind(this));
            }

            return (
                React.createElement("div", {ref: "wrapper"}, 
                    taskReact, 
                    addCustomTaskPanelReact, 

                    React.createElement("ul", {className: "styleless item-notes-list"}, 
                        listItems
                    ), 

                    React.createElement("form", {role: "form", className: "item-composer note", onSubmit: this._handleComposerFormSubmit}, 
                        React.createElement("textarea", {className: "form-control", onKeyUp: this._handleTextareaKeyUp}), 
                        React.createElement("button", {className: "btn btn-primary"}, "Add"), 
                        React.createElement("button", {type: "button", className: "styleless fa fa-times", onClick: this._hideForm})
                    ), 

                    React.createElement("a", {className: "add-item-link", onClick: this._showComposer}, "+ Add note")
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

            this.$addNoteLink.hide();
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
            isCustomTaskComplete: this.isCustomTaskComplete || false
        });
    };

    c.saveAccountData = function () {
        this.reRender();
        CS.saveAccountData();
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
                    React.createElement("button", {className: "btn btn-primary"}, "Save changes"), 
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
;CS.WorkbookAreaTasks = [
    {   // Level 1
        id: 1,
        level: 1,
        workbookAreaId: 5,  // Achievements
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(5);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(5);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        wordings: [
            {
                prompt: "Describe a situation where you've solved a problem in a very good or unexpected way"
            },
            {
                prompt: "Something you feel really proud of"
            },
            {
                prompt: "Have you won any awards or prices for you work or educational achievements?",
                sentenceStart: "I was "
            },
            {
                prompt: "Think about the last job you had. One thing you achieved when you worked there was..."
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemTask",
        workingOnText: "making inventory of Achievements",
        notificationText: "Make inventory of Achievements"
    },
    {
        id: 2,
        level: 1,
        workbookAreaId: 18,  // Tracks
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(18);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(18);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        wordings: [
            {
                prompt: "What tracks would you like to pursue at some point?"
            },
            {
                prompt: "Anything you dreamed of when you were younger but haven't done and still would find exciting to try out?"
            },
            {
                prompt: "If you get a salary for working on anything you want, what would you work with?"
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemTask",
        workingOnText: "making inventory of Tracks",
        notificationText: "Make inventory of Tracks"
    },
    {
        id: 3,
        level: 1,
        workbookAreaId: 1,  // Strengths
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(1);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(1);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        wordings: [
            {
                prompt: "When are you the happiest with your work?",
                sentenceStart: "When I "
            },
            {
                prompt: "What are you the most confident at in your work?"
            },
            {
                prompt: "What qualities were important in the last role you had?"
            },
            {
                prompt: "What things are you good at?"
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemTask",
        workingOnText: "making inventory of Strengths",
        notificationText: "Make inventory of Strengths"
    },
    {
        id: 4,
        level: 1,
        workbookAreaId: 2,  // Drivers
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(2);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(2);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        wordings: [
            {
                prompt: "Why do you go to work, except from the salary?"
            },
            {
                prompt: "When do you feel the most energy at work?",
                sentenceStart: "When I "
            },
            {
                prompt: "What are you passions?",
                sentenceStart: "I'm passionate about "
            },
            {
                prompt: "What impact do you want to have on the world?"
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemTask",
        workingOnText: "making inventory of Drivers",
        notificationText: "Make inventory of Drivers"
    },
    {
        id: 5,
        level: 1,
        workbookAreaId: 4,  // Workplace
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(4);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(4);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        wordings: [
            {
                prompt: "What kind of environment are you the most creative in?"
            },
            {
                prompt: "What kind of environment are you the most productive in?"
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemTask",
        workingOnText: "making inventory of Workplace preferences",
        notificationText: "Make inventory of Workplace preferences"
    },
    {
        id: 6,
        level: 1,
        workbookAreaId: 12,  // Mores
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(12);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(12);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        wordings: [
            {
                prompt: "What would you like to spend more time on in your work?"
            },
            {
                prompt: "In what area do you want to improve yourself in your work?"
            },
            {
                prompt: "What are the tasks you look the most forward to?"
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemTask",
        workingOnText: "making inventory of Mores",
        notificationText: "Make inventory of Mores"
    },
    {
        id: 7,
        level: 1,
        workbookAreaId: 17,  // ToolsAndMethods
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(17);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(17);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        wordings: [
            {
                prompt: "What methods do you use to do your work?"
            },
            {
                prompt: "What are the tools you consider essential to do your work?"
            },
            {
                prompt: "If you could freely select the tools and methodologies to do your work, what would you chose?"
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemTask",
        workingOnText: "making inventory of Tools and Methods",
        notificationText: "Make inventory of Tools and Methods"
    },
    {
        id: 8,
        level: 1,
        workbookAreaId: 9,  // Leadership
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(9);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(9);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        wordings: [
            {
                prompt: "This is something my boss should keep in mind to make me stay..."
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemTask",
        workingOnText: "making inventory of Leadership preferences",
        notificationText: "Make inventory of Leadership preferences"
    },
    {
        id: 9,
        level: 1,
        workbookAreaId: 3,  // Contexts
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(3);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(3);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        wordings: [
            {
                prompt: "Name a position or role you'd like to have!",
                sentenceStart: "I would like to work as "
            },
            {
                prompt: "Name an industry you're interested in working in!"
            },
            {
                prompt: "What position would you chose, if given the possibility to decide all by yourself?"
            },
            {
                prompt: "Please name an organization that you would find interesting to work with"
            },
            {
                prompt: "What industries would you not work in?",
                sentenceStart: "I would never work in "
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemTask",
        workingOnText: "making inventory of Contexts",
        notificationText: "Make inventory of Contexts"
    },
    {   // Level 2
        id: 10,
        level: 2,
        workbookAreaId: 5,  // Achievements
        previousTaskId: 1,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(5);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(5);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        templateClassName: "WorkbookAreaAddItemLvl1Complete"
    },
    {
        id: 11,
        level: 2,
        workbookAreaId: 18,  // Tracks
        previousTaskId: 2,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(18);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(18);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        templateClassName: "WorkbookAreaAddItemLvl1Complete"
    },
    {
        id: 12,
        level: 2,
        workbookAreaId: 1,  // Strengths
        previousTaskId: 3,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(1);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(1);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        templateClassName: "WorkbookAreaAddItemLvl1Complete"
    },
    {
        id: 13,
        level: 2,
        workbookAreaId: 2,  // Drivers
        previousTaskId: 4,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(2);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(2);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        templateClassName: "WorkbookAreaAddItemLvl1Complete"
    },
    {
        id: 14,
        level: 2,
        workbookAreaId: 4,  // Workplace
        previousTaskId: 5,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(4);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(4);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        templateClassName: "WorkbookAreaAddItemLvl1Complete"
    },
    {
        id: 15,
        level: 2,
        workbookAreaId: 12,  // Mores
        previousTaskId: 6,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(12);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(12);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        templateClassName: "WorkbookAreaAddItemLvl1Complete"
    },
    {
        id: 16,
        level: 2,
        workbookAreaId: 17,  // ToolsAndMethods
        previousTaskId: 7,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(17);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(17);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        templateClassName: "WorkbookAreaAddItemLvl1Complete"
    },
    {
        id: 17,
        level: 2,
        workbookAreaId: 9,  // Leadership
        previousTaskId: 8,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(9);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(9);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        templateClassName: "WorkbookAreaAddItemLvl1Complete"
    },
    {
        id: 18,
        level: 2,
        workbookAreaId: 3,  // Contexts
        previousTaskId: 9,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(3);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(3);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        templateClassName: "WorkbookAreaAddItemLvl1Complete"
    },
    {   // Level 3
        id: 19,
        level: 3,
        workbookAreaId: 1,  // Strengths
        previousTaskId: 12,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(1);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !this.isDone() &&
                !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(1);
            return _.includes(CS.account.data.prioritizedWorkbookAreaIds, workbookArea.id);
        },
        wordings: [
            {
                prompt: "Which ones of these do you feel best describe your strengths? Prioritize by drag-and-dropping the items in this area"
            }
        ],
        stepCount: 1,
        templateClassName: "WorkbookAreaPrioritizeItemsTask",
        workingOnText: "prioritizing my Strengths",
        notificationText: "Prioritize my Strengths",
        comingUpText: "prioritizing"
    },
    {
        id: 20,
        level: 3,
        workbookAreaId: 2,  // Drivers
        previousTaskId: 13,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(2);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !this.isDone() &&
                !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(2);
            return _.includes(CS.account.data.prioritizedWorkbookAreaIds, workbookArea.id);
        },
        wordings: [
            {
                prompt: "What's most important to you? Prioritize your drivers by drag-and-dropping the items"
            }
        ],
        stepCount: 1,
        templateClassName: "WorkbookAreaPrioritizeItemsTask",
        workingOnText: "prioritizing my Drivers",
        notificationText: "Prioritize my Drivers",
        comingUpText: "prioritizing"
    },
    {
        id: 21,
        level: 3,
        workbookAreaId: 4,  // Workplace
        previousTaskId: 14,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(4);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !this.isDone() &&
                !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(4);
            return _.includes(CS.account.data.prioritizedWorkbookAreaIds, workbookArea.id);
        },
        wordings: [
            {
                prompt: "What's most important to you in a work environment? Please order these items in order of importance by drag-and-dropping"
            }
        ],
        stepCount: 1,
        templateClassName: "WorkbookAreaPrioritizeItemsTask",
        workingOnText: "prioritizing Workplace preferences",
        notificationText: "Prioritize Workplace preferences",
        comingUpText: "prioritizing"
    },
    {
        id: 22,
        level: 3,
        workbookAreaId: 5,  // Achievements
        previousTaskId: 10,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(5);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !this.isDone() &&
                !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(5);
            return _.includes(CS.account.data.prioritizedWorkbookAreaIds, workbookArea.id);
        },
        wordings: [
            {
                prompt: "Which ones of these do you feel are your most important achievements? Prioritize by drag-and-dropping the items in this area"
            }
        ],
        stepCount: 1,
        templateClassName: "WorkbookAreaPrioritizeItemsTask",
        workingOnText: "prioritizing my Achievements",
        notificationText: "Prioritize my Achievements",
        comingUpText: "prioritizing"
    },
    {
        id: 23,
        level: 3,
        workbookAreaId: 9,  // Leadership
        previousTaskId: 17,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(9);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !this.isDone() &&
                !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(9);
            return _.includes(CS.account.data.prioritizedWorkbookAreaIds, workbookArea.id);
        },
        wordings: [
            {
                prompt: "Prioritize the list by drag-and-dropping. What's the top things you need in the leadership to do a great job?"
            }
        ],
        stepCount: 1,
        templateClassName: "WorkbookAreaPrioritizeItemsTask",
        workingOnText: "prioritizing Leadership preferences",
        notificationText: "Prioritize Leadership preferences",
        comingUpText: "prioritizing"
    },
    {
        id: 24,
        level: 3,
        workbookAreaId: 12,  // Mores
        previousTaskId: 15,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(12);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !this.isDone() &&
                !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(12);
            return _.includes(CS.account.data.prioritizedWorkbookAreaIds, workbookArea.id);
        },
        wordings: [
            {
                prompt: "If you were given the opportunity to do more of only three things in this list, which ones would it be? Place them at the top by drag-and-dropping"
            }
        ],
        stepCount: 1,
        templateClassName: "WorkbookAreaPrioritizeItemsTask",
        workingOnText: "prioritizing what I want More",
        notificationText: "Prioritize what I want More",
        comingUpText: "prioritizing"
    },
    {
        id: 25,
        level: 3,
        workbookAreaId: 18,  // Tracks
        previousTaskId: 11,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(18);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !this.isDone() &&
                !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(18);
            return _.includes(CS.account.data.prioritizedWorkbookAreaIds, workbookArea.id);
        },
        wordings: [
            {
                prompt: "Which ones of these tracks do you find the most interesting to pursue right now? Prioritize by drag-and-dropping the items in this area"
            }
        ],
        stepCount: 1,
        templateClassName: "WorkbookAreaPrioritizeItemsTask",
        workingOnText: "prioritizing my Tracks",
        notificationText: "Prioritize my Tracks",
        comingUpText: "prioritizing"
    }
];
;CS.WorkbookItemTasks = [
    {
        id: 1,
        workbookAreaId: 5,  // Achievements
        isActive: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(5);

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]);
        },
        isDone: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(5);
            return CS.account.data.describedWorkbookItemIds && _.includes(CS.account.data.describedWorkbookItemIds[workbookArea.className], itemIndex);
        },
        wordings: [
            {
                prompt: "You mentioned that you <em>{itemName}</em>. How did you achieve this?"
            },
            {
                prompt: "What made you succeed with <em>{itemName}</em>?"
            },
            {
                prompt: "What circumstances were important for you to achieve this: <em>{itemName}</em>?"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "describing Achievements",
        notificationText: "Describe Achievements"
    },
    {
        id: 2,
        workbookAreaId: 18,  // Tracks
        isActive: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(18);

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]);
        },
        isDone: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(18);
            return CS.account.data.describedWorkbookItemIds && _.includes(CS.account.data.describedWorkbookItemIds[workbookArea.className], itemIndex);
        },
        wordings: [
            {
                prompt: "What makes you interested in <em>{itemName}</em>?"
            },
            {
                prompt: "Is there anything keeping you from <em>{itemName}</em>?"
            },
            {
                prompt: "If you were not paid, would you still be interested in <em>{itemName}</em>? Why/why not?"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "describing Tracks",
        notificationText: "Describe Tracks"
    },
    {
        id: 3,
        workbookAreaId: 1,  // Strengths
        isActive: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(1);

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]);
        },
        isDone: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(1);
            return CS.account.data.describedWorkbookItemIds && _.includes(CS.account.data.describedWorkbookItemIds[workbookArea.className], itemIndex);
        },
        wordings: [
            {
                prompt: "You mentioned you are <em>{itemName}</em>. How can people observe this in your work?"
            },
            {
                prompt: "Please describe a situation where this was really important in achieving results at work: <em>{itemName}</em>"
            },
            {
                prompt: "What happens if you don't get to do this in your work: <em>{itemName}</em>"
            },
            {
                prompt: "What are the drawbacks of <em>{itemName}</em>?"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "describing Strengths",
        notificationText: "Describe Strengths"
    },
    {
        id: 4,
        workbookAreaId: 2,  // Drivers
        isActive: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(2);

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]);
        },
        isDone: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(2);
            return CS.account.data.describedWorkbookItemIds && _.includes(CS.account.data.describedWorkbookItemIds[workbookArea.className], itemIndex);
        },
        wordings: [
            {
                prompt: "Why is <em>{itemName}</em> a driver for you?"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "describing Drivers",
        notificationText: "Describe Drivers"
    },
    {
        id: 5,
        workbookAreaId: 4,  // Workplace
        isActive: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(4);

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]);
        },
        isDone: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(4);
            return CS.account.data.describedWorkbookItemIds && _.includes(CS.account.data.describedWorkbookItemIds[workbookArea.className], itemIndex);
        },
        wordings: [
            {
                prompt: "Why is <em>{itemName}</em> important for you at the workplace?"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "describing Workplace preferences",
        notificationText: "Describe Workplace preferences"
    },
    {
        id: 6,
        workbookAreaId: 12,  // Mores
        isActive: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(12);

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]);
        },
        isDone: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(12);
            return CS.account.data.describedWorkbookItemIds && _.includes(CS.account.data.describedWorkbookItemIds[workbookArea.className], itemIndex);
        },
        wordings: [
            {
                prompt: "Can you describe why you want to do more of <em>{itemName}</em>?"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "describing Mores",
        notificationText: "Describe Mores"
    },
    {
        id: 7,
        workbookAreaId: 17,  // ToolsAndMethods
        isActive: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(17);

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]);
        },
        isDone: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(17);
            return CS.account.data.describedWorkbookItemIds && _.includes(CS.account.data.describedWorkbookItemIds[workbookArea.className], itemIndex);
        },
        wordings: [
            {
                prompt: "How come you like to use <em>{itemName}</em>?"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "describing Tools and Methods",
        notificationText: "Describe Tools and Methods"
    },
    {
        id: 8,
        workbookAreaId: 9,  // Leadership
        isActive: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(9);

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]);
        },
        isDone: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(9);
            return CS.account.data.describedWorkbookItemIds && _.includes(CS.account.data.describedWorkbookItemIds[workbookArea.className], itemIndex);
        },
        wordings: [
            {
                prompt: "In what way a leadership characterized by <em>{itemName}</em> helps you in your work?"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "describing Leadership preferences",
        notificationText: "Describe Leadership preferences"
    },
    {
        id: 9,
        workbookAreaId: 3,  // Contexts
        isActive: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(3);

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]);
        },
        isDone: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(3);
            return CS.account.data.describedWorkbookItemIds && _.includes(CS.account.data.describedWorkbookItemIds[workbookArea.className], itemIndex);
        },
        wordings: [
            {
                prompt: "Can you describe <em>{itemName}</em>?"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "describing Contexts",
        notificationText: "Describe Contexts"
    }
];

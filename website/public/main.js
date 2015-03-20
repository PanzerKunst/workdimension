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
CS.defaultAnimationDuration = 0.5;
CS.blueprintAreasModel = null;
CS.indexController = null;
CS.mainMenuController = null;
CS.overviewController = null;
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
;CS.Services.Keyboard = {
    keyCode: {
        backspace: 8,
        tab: 9,
        enter: 13,
        shift: 16,
        ctrl: 17,
        alt: 18,
        space: 32
    },

    isPressedKeyText: function (e) {
        var keyCode = e.keyCode;

        return keyCode !== this.keyCode.tab &&
            keyCode !== this.keyCode.enter &&
            keyCode !== this.keyCode.shift &&
            keyCode !== this.keyCode.ctrl &&
            keyCode !== this.keyCode.alt &&
            keyCode !== this.keyCode.space;
    }
};
;CS.Models.BlueprintArea = P(function (c) {
    c.init = function (className, blueprintCategoryId, title, priority) {
        this.className = className;
        this.blueprintCategoryId = blueprintCategoryId;
        this.title = title;
        this.priority = priority;
    };

    c.getClassName = function() {
        return this.className;
    };

    c.getTitle = function() {
        return this.title;
    };

    // TODO: use DB instead of local storage
    c.isActive = function() {
        return CS.Services.Browser.getFromLocalStorage("isBlueprintArea" + this.className + "Active");
    };

    c.activate = function() {
        return CS.Services.Browser.saveInLocalStorage("isBlueprintArea" + this.className + "Active", true);
    };

    c.deactivate = function() {
        return CS.Services.Browser.removeFromLocalStorage("isBlueprintArea" + this.className + "Active");
    };
});
;CS.Models.BlueprintAreas = P(function (c) {
    c.nbDefaultActiveBlueprintAreas = 3;

    c.init = function () {
        var sortedBlueprintAreas = _.sortByAll(CS.BlueprintAreas, "priority");

        this.blueprintAreaInstances = sortedBlueprintAreas.map(function (item) {
            return CS.Models.BlueprintArea(item.className, item.blueprintCategoryId, item.title, item.priority);
        });
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

    c._updateStatus = function () {
        this.blueprintAreaInstances.forEach(function (instance) {
            if (instance.isActive()) {
                this.blueprintAreas.active.push(instance);
            } else {
                this.blueprintAreas.inactive.push(instance);
            }
        }.bind(this));

        // If none is active, we set the top-N priority as active
        if (_.isEmpty(this.blueprintAreas.active)) {
            for (var i = 0; i < this.nbDefaultActiveBlueprintAreas; i++) {
                var instanceToActivate = this.blueprintAreaInstances[i];
                instanceToActivate.activate();
                this.blueprintAreas.active.push(instanceToActivate);
                this.blueprintAreas.inactive = _.without(this.blueprintAreas.inactive, instanceToActivate);
            }
        }

        CS.mainMenuController.reRender();
        CS.overviewController.reRender();
    };
});
;CS.Controllers.Base = P(function(c) {
    c.httpStatusCode = {
        noContent: 204,
        emailAlreadyRegistered: 230
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
;CS.Controllers.Index = P(function (c) {
    c.init = function (accountId, accountEmail, accountData) {
        CS.account.id = accountId;
        CS.account.email = accountEmail;
        CS.account.data = accountData || CS.Services.Browser.getFromLocalStorage("accountData") || {};

        CS.mainMenuController = CS.Controllers.MainMenu();
        CS.overviewController = CS.Controllers.Overview();

        CS.blueprintAreasModel = CS.Models.BlueprintAreas();
        CS.blueprintAreasModel.updateStatus();

        CS.Controllers.Header();
    };
});
;CS.Controllers.Header = P(function (c) {
    c.init = function () {
        this._initElements();
        this._initEvents();
    };

    c._initElements = function () {
    };

    c._initEvents = function () {
    };
});
;CS.Controllers.MainMenuInactiveItem = React.createClass({displayName: "MainMenuInactiveItem",
    render: function () {
        return (
            React.createElement("li", null, 
                React.createElement("a", {onClick: this._activateBlueprintArea}, this.props.blueprintArea.getTitle())
            )
            );
    },

    _getBlueprintArea: function() {
        return this.props.blueprintArea;
    },

    _activateBlueprintArea: function() {
        this._getBlueprintArea().activate();
        CS.blueprintAreasModel.updateStatus();
    }
});

CS.Controllers.MainMenu = P(function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                activeBlueprintAreas: [],
                inactiveBlueprintAreas: []
            };
        },

        render: function () {
            return (
                React.createElement("div", null, 
                    React.createElement("ul", {className: "styleless"}, 
                        this.state.activeBlueprintAreas.map(function (blueprintArea) {
                            var id = "main-menu-" + blueprintArea.getClassName() + "-blueprint-area-item";

                            return React.createElement("li", {id: id, key: id}, blueprintArea.getTitle());
                        })
                    ), 
                    React.createElement("ul", {className: "styleless"}, 
                        this.state.inactiveBlueprintAreas.map(function (blueprintArea) {
                            var id = "main-menu-" + blueprintArea.getClassName() + "-blueprint-area-item";

                            return React.createElement(CS.Controllers.MainMenuInactiveItem, {key: id, blueprintArea: blueprintArea});
                        })
                    )
                )
                );
        }
    });

    c.init = function () {
        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            document.getElementById("main-menu")
        );

        this._initElements();
        this._initEvents();
    };

    c._initElements = function () {
        this.$menuBtn = $("#menu-btn");
        this.$menu = $("#main-menu");
        this.$contentOverlayWhenMenuOpen = $("#content-overlay-when-menu-open");
    };

    c._initEvents = function () {
        this.$menuBtn.click($.proxy(this._toggleMenu, this));
        this.$contentOverlayWhenMenuOpen.click($.proxy(this._toggleMenu, this));
    };

    c.reRender = function () {
        var shownInactiveBlueprintAreas = _.take(CS.blueprintAreasModel.getInactive(), 3);

        this.reactInstance.replaceState({
            activeBlueprintAreas: _.sortByAll(CS.blueprintAreasModel.getActive(), "title"),
            inactiveBlueprintAreas: _.sortByAll(shownInactiveBlueprintAreas, "title")
        });
    };

    c._toggleMenu = function () {
        var isToShowMenu = this.$menu.css("visibility") === "hidden";

        var contentOverlayZIndex = -1;
        var menuVisibility = "hidden";

        if (isToShowMenu) {
            contentOverlayZIndex = parseInt(this.$menu.css("z-index"), 10) - 1;
            menuVisibility = "visible";
        }

        this.$contentOverlayWhenMenuOpen.css("z-index", contentOverlayZIndex);
        this.$menu.css("visibility", menuVisibility);
    };
});

CS.Controllers.OverviewBlueprintAreaComposer = React.createClass({displayName: "OverviewBlueprintAreaComposer",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("form", {role: "form", className: "item-composer", ref: "form", onSubmit: this._handleComposerFormSubmit}, 
                    React.createElement("textarea", {className: "form-control", onKeyUp: this._handleTextareaKeyUp, onBlur: this._hideForm}), 
                    React.createElement("button", {className: "btn btn-primary"}, "Add"), 
                    React.createElement("button", {type: "button", className: "styleless fa fa-times"})
                ), 

                React.createElement("a", {onClick: this._showComposer}, "+ Add item")
            )
            );
    },

    componentDidMount: function () {
        this._initElements();

        this.textareaDefaultHeightPx = 41;
    },

    _getController: function () {
        return this.props.controller;
    },

    _getBlueprintAreaClassName: function () {
        return this.props.blueprintArea.className;
    },

    _initElements: function() {
        this.$form = $(React.findDOMNode(this.refs.form));
        this.$textarea = this.$form.children("textarea");
    },

    _showComposer: function (e) {
        // TODO: remove
        console.log("_showComposer");

        var $composerForms = this._getController().$el.find(".item-composer");
        var $addItemLinks = $composerForms.siblings("a");

        $addItemLinks.show();
        $composerForms.hide();
        this.$form.show();
        this.$textarea.focus();

        var $link = $(e.currentTarget);
        $link.hide();
    },

    _handleComposerFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        // TODO: remove
        console.log("_handleComposerFormSubmit");

        var itemNameToAdd = this.$textarea.val().trim();

        if (itemNameToAdd) {
            var updatedBlueprintAreaData = _.clone(CS.account.data[this._getBlueprintAreaClassName()], true) || [];
            updatedBlueprintAreaData.push({name: itemNameToAdd});

            CS.account.data[this._getBlueprintAreaClassName()] = updatedBlueprintAreaData;

            CS.Services.Browser.saveInLocalStorage("accountData", CS.account.data);

            this._getController().reRender();
        }

        this._resetAndHideForm();
    },

    _handleTextareaKeyUp: function (e) {
        if (e.keyCode === CS.Services.Keyboard.keyCode.enter) {
            this._handleComposerFormSubmit();
        } else {
            this._countTextareaLines();
        }
    },

    _countTextareaLines: function () {
        var lineHeight = parseInt(this.$textarea.css("lineHeight"), 10);
        var padding = parseInt(this.$textarea.css("paddingTop"), 10) + parseInt(this.$textarea.css("paddingBottom"), 10);
        var lineCount = Math.round((this.$textarea.prop("scrollHeight") - padding) / lineHeight);

        // TODO: remove
        console.log("lineCount: " + lineCount);

        var currentTextAreaHeightPx = parseFloat(this.$textarea.css("height"));
        var newTextAreaHeightPx = this.textareaDefaultHeightPx - lineHeight + lineCount * lineHeight;

        if (newTextAreaHeightPx !== currentTextAreaHeightPx) {

            // TODO: remove
            console.log("newTextAreaHeightPx: " + newTextAreaHeightPx);

            this.$textarea.css("height", newTextAreaHeightPx);
        }
    },

    _resetAndHideForm: function() {
        this.$textarea.val(null);
        this.$textarea.css("height", this.textareaDefaultHeightPx);

        this._hideForm();
    },

    _hideForm: function() {
        this.$form.hide();
        this.$form.siblings("a").show();
    }
});

CS.Controllers.OverviewBlueprintItem = React.createClass({displayName: "OverviewBlueprintItem",
    render: function () {
        return (
            React.createElement("li", {className: "item-name", ref: "li"}, 
                React.createElement("p", null, this._getBlueprintItemName()), 
                React.createElement("button", {className: "styleless fa fa-pencil", onClick: this._showEditor}), 
                React.createElement("form", {role: "form", className: "item-composer", ref: "form", onSubmit: this._handleComposerFormSubmit}, 
                    React.createElement("textarea", {className: "form-control", ref: "textarea", onKeyUp: this._handleTextareaKeyUp, onBlur: this._hideForm}), 
                    React.createElement("button", {className: "btn btn-primary"}, "Save changes"), 
                    React.createElement("button", {type: "button", className: "styleless fa fa-times"})
                )
            )
            );
    },

    // TODO: a lot of code is duplicated from blueprintAreaComposer
    componentDidMount: function () {
        this._initElements();

        this.textareaDefaultHeightPx = 41;
        this.listItemEditModeClass = "editing";
    },

    _getController: function () {
        return this.props.controller;
    },

    _getBlueprintAreaClassName: function() {
        return this.props.blueprintAreaWithData.className;
    },

    _getBlueprintItemIndex: function () {
        return this.props.blueprintItemIndex;
    },

    _getBlueprintItemName: function () {
        return this.props.blueprintAreaWithData.items[this._getBlueprintItemIndex()].name;
    },

    _initElements: function() {
        this.$listItem = $(React.findDOMNode(this.refs.li));
        this.$itemNameParagraph = this.$listItem.children("p");
        this.$editBtn = this.$listItem.children("button");
        this.$form = this.$listItem.children("form");
        this.$textarea = this.$form.children("textarea");
    },

    _showEditor: function () {
        // TODO: remove
        console.log("_showEditor. Blueprint item name:", this._getBlueprintItemName());

        this.$textarea.val(this._getBlueprintItemName());

        this.$listItem.addClass(this.listItemEditModeClass);

        this.$itemNameParagraph.hide();
        this.$editBtn.hide();
        this.$form.show();
        this.$textarea.focus();
    },

    _handleComposerFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        // TODO: remove
        console.log("_handleComposerFormSubmit");

        var newItemName = this.$textarea.val().trim();
        var updatedBlueprintAreaData = _.clone(CS.account.data[this._getBlueprintAreaClassName()], true) || [];

        if (newItemName) {
            updatedBlueprintAreaData[this._getBlueprintItemIndex()] = {name: newItemName};
        } else {
            updatedBlueprintAreaData.splice(this._getBlueprintItemIndex(), 1);
        }

        CS.account.data[this._getBlueprintAreaClassName()] = updatedBlueprintAreaData;

        CS.Services.Browser.saveInLocalStorage("accountData", CS.account.data);

        this._getController().reRender();

        this._resetAndHideForm();
    },

    _handleTextareaKeyUp: function (e) {
        if (e.keyCode === CS.Services.Keyboard.keyCode.enter) {
            this._handleComposerFormSubmit();
        } else {
            this._countTextareaLines();
        }
    },

    _countTextareaLines: function () {
        var lineHeight = parseInt(this.$textarea.css("lineHeight"), 10);
        var padding = parseInt(this.$textarea.css("paddingTop"), 10) + parseInt(this.$textarea.css("paddingBottom"), 10);
        var lineCount = Math.round((this.$textarea.prop("scrollHeight") - padding) / lineHeight);

        // TODO: remove
        console.log("lineCount: " + lineCount);

        var currentTextAreaHeightPx = parseFloat(this.$textarea.css("height"));
        var newTextAreaHeightPx = this.textareaDefaultHeightPx - lineHeight + lineCount * lineHeight;

        if (newTextAreaHeightPx !== currentTextAreaHeightPx) {

            // TODO: remove
            console.log("newTextAreaHeightPx: " + newTextAreaHeightPx);

            this.$textarea.css("height", newTextAreaHeightPx);
        }
    },

    _resetAndHideForm: function() {
        this.$textarea.val(null);
        this.$textarea.css("height", this.textareaDefaultHeightPx);

        this._hideForm();
    },

    _hideForm: function() {
        this.$listItem.removeClass(this.listItemEditModeClass);
        this.$form.hide();
        this.$itemNameParagraph.show();
        this.$editBtn.show();
    }
});

CS.Controllers.Overview = P(function (c) {
    c.$el = $(document.getElementById("overview"));

    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                controller: null,
                blueprintAreasWithData: []
            };
        },

        render: function () {
            return (
                React.createElement("ul", {className: "styleless"}, 
                    this.state.blueprintAreasWithData.map(function (blueprintAreaWithData) {
                        var id = blueprintAreaWithData.className + "-blueprint-area-panel";

                        return (
                            React.createElement("li", {id: id, key: id}, 
                                React.createElement("div", {className: "well"}, 
                                    React.createElement("h2", null, blueprintAreaWithData.title), 

                                    React.createElement("ul", {className: "styleless"}, 
                                        blueprintAreaWithData.items.map(function (item, index) {
                                            var reactItemId = blueprintAreaWithData.className + "-blueprint-item-" + item.name;

                                            return React.createElement(CS.Controllers.OverviewBlueprintItem, {key: reactItemId, controller: this.state.controller, blueprintAreaWithData: blueprintAreaWithData, blueprintItemIndex: index});
                                        }.bind(this))
                                    ), 

                                    React.createElement(CS.Controllers.OverviewBlueprintAreaComposer, {controller: this.state.controller, blueprintArea: blueprintAreaWithData})
                                )
                            )
                            );
                    }.bind(this))
                )
                );
        }
    });

    c.init = function () {
        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$el[0]
        );
    };

    c.reRender = function () {
        var blueprintAreasWithData = CS.blueprintAreasModel.getActive().map(function (blueprintArea) {
            return {
                className: blueprintArea.getClassName(),
                title: blueprintArea.getTitle(),
                items: CS.account.data[blueprintArea.getClassName()] || []
            };
        });

        this.reactInstance.replaceState({
            controller: this,
            blueprintAreasWithData: _.sortByAll(blueprintAreasWithData, "title")
        });
    };
});
;CS.BlueprintCategories = [
    {
        id: 1,
        name: "Direction"
    },
    {
        id: 2,
        name: "Environment"
    },
    {
        id: 3,
        name: "Capabilities"
    }
];
;CS.BlueprintAreas = [
    {
        id: 1,
        blueprintCategoryId: 1,
        className: "Drivers",
        title: "Drivers",
        priority: 2
    },
    {
        id: 2,
        blueprintCategoryId: 1,
        className: "LessMores",
        title: "LessMores",
        priority: 1
    },
    {
        id: 3,
        blueprintCategoryId: 1,
        className: "Tracks",
        title: "Tracks",
        priority: 3
    },
    {
        id: 4,
        blueprintCategoryId: 1,
        className: "Values",
        title: "Values",
        priority: 4
    },
    {
        id: 5,
        blueprintCategoryId: 2,
        className: "Leadership",
        title: "Leadership",
        priority: 5
    },
    {
        id: 6,
        blueprintCategoryId: 2,
        className: "Coworkers",
        title: "Coworkers",
        priority: 6
    },
    {
        id: 7,
        blueprintCategoryId: 2,
        className: "Industries",
        title: "Industries",
        priority: 7
    },
    {
        id: 8,
        blueprintCategoryId: 2,
        className: "Roles",
        title: "Roles",
        priority: 8
    },
    {
        id: 9,
        blueprintCategoryId: 2,
        className: "Organizations",
        title: "Organizations",
        priority: 9
    },
    {
        id: 10,
        blueprintCategoryId: 2,
        className: "Projects",
        title: "Projects",
        priority: 10
    },
    {
        id: 11,
        blueprintCategoryId: 2,
        className: "Culture",
        title: "Culture",
        priority: 11
    },
    {
        id: 12,
        blueprintCategoryId: 2,
        className: "Workplace",
        title: "Workplace",
        priority: 12
    },
    {
        id: 13,
        blueprintCategoryId: 2,
        className: "PhaseAndSize",
        title: "Phase & Size",
        priority: 13
    },
    {
        id: 14,
        blueprintCategoryId: 3,
        className: "Achievements",
        title: "Achievements",
        priority: 14
    },
    {
        id: 15,
        blueprintCategoryId: 3,
        className: "Benefits",
        title: "Benefits",
        priority: 15
    },
    {
        id: 16,
        blueprintCategoryId: 3,
        className: "Expertise",
        title: "Expertise",
        priority: 16
    },
    {
        id: 17,
        blueprintCategoryId: 3,
        className: "ManagementStyle",
        title: "Management Style",
        priority: 17
    },
    {
        id: 18,
        blueprintCategoryId: 3,
        className: "Strengths",
        title: "Strengths",
        priority: 18
    },
    {
        id: 19,
        blueprintCategoryId: 3,
        className: "ToolsAndMethods",
        title: "Tools & Methods",
        priority: 19
    }
];

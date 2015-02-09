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
;if (typeof String.prototype.startsWith !== 'function') {
    String.prototype.startsWith = function (str) {
        return this.slice(0, str.length) === str;
    };
}

if (typeof Array.prototype.clone !== 'function') {
    Array.prototype.clone = function () {
        return this.slice(0);
    };
}

// create the base namespace
var CS = {};

// create additional namespace
CS.Models = {};
CS.Controllers = {};
CS.Services = {};
CS.C1s = {};

// Global objects
CS.accountId = null;
CS.accountData = null;
CS.router = new Grapnel();
CS.defaultAnimationDuration = 0.5;
;CS.Browser = {
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
    c.errorMessageHeight = "21px";
    c.errorMessageHeightMediumScreen = "28px";
    c.errorMessageHeightLargeScreen = "33px";

    c.checkEmpty = "empty";
    c.checkEmail = "email";
    c.checkUsername = "username";
    c.checkDateInFuture = "in-future";
    c.checkMinLength = "min-length";
    c.checkMaxLength = "max-length";
    c.checkInteger = "integer";
    c.checkDecimal = "decimal";
    c.checkUrl = "url";

    c.init = function (fieldIds) {
        this.fieldIds = fieldIds;

        for (var i = 0; i < this.fieldIds.length; i++) {
            var $field = $("#" + this.fieldIds[i]);

            if ($field.hasClass("pills"))
                this._addClickEvents($field);
            else {
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
        //$wrapper.addClass("has-success");
    };

    c.flagInvalid = function ($field) {
        var $wrapper = $field.parent();
        //$wrapper.removeClass("has-success");
        $wrapper.addClass("has-error");
    };

    c.isFlaggedInvalid = function ($field) {
        return $field.parent().hasClass("has-error");
    };

    c.showErrorMessage = function($errorMsg) {
        if ($errorMsg.html()) {
            var height = this.errorMessageHeight;
            if (CS.Browser.isMediumScreen()) {
                height = this.errorMessageHeightMediumScreen;
            } else if (CS.Browser.isLargeScreen()) {
                height = this.errorMessageHeightLargeScreen;
            }

            TweenLite.to($errorMsg, 0.5, {height: height});
        }
    };
    
    c.hideErrorMessage = function($errorMsg) {
        if ($errorMsg.html()) {
            TweenLite.to($errorMsg, 0.5, {height: 0});
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
        if (email === "")
            return true;

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
        if (value === null || value === undefined || value === "")
            return true;
        return value.length >= minLength;
    };

    c._isMaxLength = function (value, maxLength) {
        if (value === null || value === undefined || value === "")
            return true;
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

    c._isUrl = function(url) {
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
        TweenLite.to($el, CS.defaultAnimationDuration, {
            alpha: 0,
            onComplete: function () {
                if (onComplete) {
                    onComplete();
                } else {
                    $el.hide();
                }
            }.bind(this)
        });
    }
};
;CS.Models.Activity = {
    state: {
        todo: "TODO",
        done: "DONE"
    }
};
;CS.Controllers = {
    httpStatusCode: {
        noContent: 204,
        emailAlreadyRegistered: 230
    },
    isTemporaryAccount: function () {
        return CS.accountId < 0;
    }
};
;CS.Controllers.Index = P(function (c) {
    c.init = function (accountId, accountData) {
        CS.accountId = accountId;
        CS.accountData = accountData;

        this.activityFeedController = CS.Controllers.ActivityFeed();
        this.standoutsController = CS.Controllers.Standouts();

        CS.Controllers.HeaderModal.Register();
        CS.Controllers.HeaderModal.SignIn();
        CS.Controllers.RegisterReminder();

        this._initElements();
        this._initHeaderLinks();
        this._initEvents();

        this._initRouter();
    };

    c._initElements = function () {
        this.$headerSection = $("#header-links");
        this.$headerLinks = this.$headerSection.children("a");
        this.$signOutLink = this.$headerLinks.filter("#sign-out-link");

        this.$headerNav = $('[role="navigation"]');
        this.$activitiesTab = this.$headerNav.find("#activities-tab");
        this.$standoutsTab = this.$headerNav.find("#standouts-tab");

        this.$tabPanels = $('[role="tabpanel"]');
        this.$activitiesPanel = this.$tabPanels.filter("#activities");
        this.$standoutsPanel = this.$tabPanels.filter("#standouts");

        this.$feedSection = this.$activitiesPanel.children("#c1-and-activity-feed");
        this.$currentC1OrActivitySection = this.$activitiesPanel.children("#current-c1-or-activity");
    };

    c._initHeaderLinks = function () {
        if (CS.Controllers.isTemporaryAccount()) {
            this.$headerLinks.show();
            this.$signOutLink.hide();
        } else {
            this.$signOutLink.show();
        }
    };

    c._initEvents = function () {
        this.$activitiesTab.click(function (e) {
            location.hash = "activities";
        });

        this.$standoutsTab.click(function (e) {
            location.hash = "standouts";
        });

        this.$signOutLink.click($.proxy(this._signOut, this));
    };

    c._initRouter = function () {
        CS.router.get("", function (req) {
            this._activateActivitiesPanel();
        }.bind(this));

        CS.router.get("activities", function (req) {
            this._activateActivitiesPanel();
        }.bind(this));

        CS.router.get("standouts", function (req) {
            this._activateStandoutsPanel();
        }.bind(this));
    };

    c._activateActivitiesPanel = function () {
        if (!this.$activitiesPanel.hasClass("active")) {
            this.$tabPanels.removeClass("active");
            this.$activitiesTab.tab('show');
            this.$activitiesPanel.addClass("active");
        }

        this._handlePanelActivated();
    };

    c._activateStandoutsPanel = function () {
        if (!this.$standoutsPanel.hasClass("active")) {
            this.$tabPanels.removeClass("active");
            this.$standoutsTab.tab('show');
            this.$standoutsPanel.addClass("active");
        }

        this._handlePanelActivated();
    };

    c._handlePanelActivated = function() {
        this.activityFeedController.refreshData();
        this.standoutsController.refreshData();

        this.$currentC1OrActivitySection.hide();
        this.$feedSection.show();
    };

    c._signOut = function (e) {
        var type = "DELETE";
        var url = "/api/auth";

        $.ajax({
            url: url,
            type: type,
            success: function (data, textStatus, jqXHR) {
                location.href = "/";
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
            }.bind(this)
        });
    };
});

;CS.Controllers.HeaderModal = P(function (c) {
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

        this.$modal = $("#modal");
        this.$modalTitles = this.$modal.find(".modal-title");
        this.$modalForms = this.$modal.find("form");
        this.$modalSubmitButtons = this.$modal.find(".modal-footer").find("button");

        this.$registerReminderAlert = $("#register-reminder").children();
    };

    c.initEvents = function () {
        this.$modal.on('hidden.bs.modal', $.proxy(this._launchOtherModalIfNeeded, this));
        this.$launchLink.click($.proxy(this._launchModal, this));
        this.$switchModalLink.click($.proxy(this.setSwitchFormIdAndCloseModal, this));
        this.$form.submit($.proxy(this._clickOnSubmitBtn, this));
        this.$submitBtn.click($.proxy(this.handleSubmit, this));
    };

    c.onFormSubmitSuccess = function(data) {
        this.$headerLinks.hide();
        this.$signOutLink.show();

        CS.accountId = data.accountId;
        CS.accountData = data.accountData;

        this.$registerReminderAlert.hide();

        location.hash = "activities";

        this.$modal.modal('hide');

        this._resetForm();
    };

    c._resetForm = function () {
        this.$form[0].reset();
        this.$submitBtn.button('reset');
    };

    c._launchModal = function (e) {
        this.$modalTitles.hide();
        this.$modalForms.hide();
        this.$modalSubmitButtons.hide();

        this.$modalTitle.show();
        this.$form.show();
        this.$submitBtn.show();

        this.$modal.modal();
    };

    c._launchOtherModalIfNeeded = function (e) {
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
            this.$submitBtn.button('loading');

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
                success: function (data, textStatus, jqXHR) {
                    if (jqXHR.status === CS.Controllers.httpStatusCode.emailAlreadyRegistered) {
                        this.$submitBtn.button('reset');
                        this.validator.showErrorMessage(this.$emailAlreadyRegisteredError);
                    } else {
                        this.onFormSubmitSuccess(data);
                    }
                }.bind(this),
                error: function (jqXHR, textStatus, errorThrown) {
                    this.$submitBtn.button('reset');
                    alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
                }.bind(this)
            });
        }
    };

    c.setSwitchFormIdAndCloseModal = function() {
        this.switchFormId = "sign-in-form";
        this.$modal.modal('hide');
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
            this.$submitBtn.button('loading');

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
                success: function (data, textStatus, jqXHR) {
                    if (jqXHR.status === CS.Controllers.httpStatusCode.noContent) {
                        this.$submitBtn.button('reset');
                        this.validator.showErrorMessage(this.$wrongCredentialsError);
                    } else {
                        this.onFormSubmitSuccess(data);
                    }
                }.bind(this),
                error: function (jqXHR, textStatus, errorThrown) {
                    this.$submitBtn.button('reset');
                    alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
                }.bind(this)
            });
        }
    };

    c.setSwitchFormIdAndCloseModal = function() {
        this.switchFormId = "register-form";
        this.$modal.modal('hide');
    };
});
;CS.Controllers.RegisterReminder = P(function (c) {
    c.init = function () {
        this.initElements();
        this.initEvents();
    };

    c.initElements = function () {
        this.$mainRegisterLink = $("#register-link");

        this.$registerLink = $("#register-reminder").find("a");
    };

    c.initEvents = function () {
        this.$registerLink.click($.proxy(this._clickOnMainLink, this));
    };

    c._clickOnMainLink = function (e) {
        this.$mainRegisterLink.click();
    };
});
;CS.Controllers.CustomActivity = P(function (c) {
    c.init = function () {
        this._initElements();
        this._initValidation();
        this._initEvents();
    };

    c._initElements = function () {
        this.$successAlert = $("#custom-activity-saved");

        this.$form = $("form");

        this.$emailField = this.$form.find("#email");
        this.$formGroupEmail = this.$emailField.parent();
        this.$classNameField = this.$form.find("#class-name");
        this.$titleField = this.$form.find("#title");
        this.$textField = this.$form.find("#text");

        this.$noAccountFoundForThisEmailError = this.$form.find("#no-account-found-for-this-email");

        this.$submitBtn = this.$form.find("[type=submit]");
    };

    c._initValidation = function () {
        this.validator = CS.Services.Validator([
            "email",
            "class-name",
            "title",
            "text"
        ]);
    };

    c._initEvents = function () {
        this.$form.submit($.proxy(this._handleSubmit, this));
        this.$emailField.blur($.proxy(this._checkIfAccountExists, this));
    };

    c._handleSubmit = function (e) {
        e.preventDefault();

        CS.Services.Animator.fadeOut(this.$successAlert);

        if (this.validator.isValid()) {
            this._checkIfAccountExists(null, function () {
                var data = {
                    accountEmailAddress: this.$emailField.val().trim(),
                    className: this.$classNameField.val().trim(),
                    title: this.$titleField.val().trim(),
                    mainText: this.$textField.val().trim()
                };

                var type = "POST";
                var url = "/api/custom-activities";

                $.ajax({
                    url: url,
                    type: type,
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    success: function (data, textStatus, jqXHR) {
                        this.$submitBtn.button('reset');
                        this.$form[0].reset();

                        CS.Services.Animator.fadeIn(this.$successAlert);
                    }.bind(this),
                    error: function (jqXHR, textStatus, errorThrown) {
                        this.$submitBtn.button('reset');
                        alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
                    }.bind(this)
                });
            }.bind(this));
        }
    };

    c._checkIfAccountExists = function (e, callback) {
        var emailAddress = this.$emailField.val().trim();

        if (emailAddress) {
            this.$formGroupEmail.removeClass("has-error");
            this.validator.hideErrorMessage(this.$noAccountFoundForThisEmailError);

            var type = "GET";
            var url = "/api/accounts";

            $.ajax({
                url: url + "?emailAddress=" + emailAddress,
                type: type,
                success: function (data, textStatus, jqXHR) {
                    if (jqXHR.status === CS.Controllers.httpStatusCode.noContent) {
                        this.$formGroupEmail.addClass("has-error");
                        this.validator.showErrorMessage(this.$noAccountFoundForThisEmailError);
                    } else {
                        this.$formGroupEmail.addClass("has-success");

                        if (callback) {
                            callback();
                        }
                    }
                }.bind(this),
                error: function (jqXHR, textStatus, errorThrown) {
                    alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
                }.bind(this)
            });
        }
    };
});
;CS.Controllers.ActivityFeed = P(function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {data: []};
        },

        render: function () {
            var listItems = this.state.data.map(function (c1OrActivity) {
                return (
                    React.createElement(CS.Controllers.ActivityFeedItem, {c1OrActivity: c1OrActivity})
                    );
            }.bind(this));

            return (
                React.createElement("ul", {className: "styleless"}, 
                    listItems
                )
                );
        }
    });

    c.init = function () {
        this.feedItems = [
            /* TODO {
             packageName: CS.Controllers.ActivityFeed.packageName.c1,
             className: "JobApplicationEmployer"
             },{
             packageName: CS.Controllers.ActivityFeed.packageName.c1,
             className: "JobApplicationPosition"
             },*/{
                packageName: CS.Controllers.ActivityFeed.packageName.activity,
                className: "GlobalFindYourStrengths2",
                title: "Find my über strengths"
            },
            {
                packageName: CS.Controllers.ActivityFeed.packageName.activity,
                className: "GlobalFindYourStrengths",
                title: "Find my strengths"
            },
            {
                packageName: CS.Controllers.ActivityFeed.packageName.activity,
                className: "IdentifyStrengths",
                title: "Identifiera mina egenskaper"
            }
        ];

        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            document.getElementById("c1-and-activity-feed")
        );

        this._initElements();
    };

    c._initElements = function () {
        this.$registerReminderAlert = $("#register-reminder").children();
    };

    c.refreshData = function () {
        this._fetchCustomActivities();
    };

    c._fetchCustomActivities = function () {
        var type = "GET";
        var url = "/api/custom-activities";

        $.ajax({
            url: url,
            type: type,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                var feedItemInstancesCustomActivities = data.map(function (customActivity, index) {
                    return CS.Activities.Custom(customActivity.className, customActivity.title, customActivity.mainText);
                }, this);

                var feedItemInstancesClassicActivities = this.feedItems.map(function (item, index) {
                    return CS[item.packageName][item.className](item.className, item.title);
                }, this);

                this.feedItemInstances = _.union(feedItemInstancesCustomActivities, feedItemInstancesClassicActivities);

                this._fetchActivities();
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
            }.bind(this)
        });
    };

    c._fetchActivities = function () {
        var type = "GET";
        var url = "/api/activities";

        $.ajax({
            url: url,
            type: type,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                this._orderFeedItems(data);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
            }.bind(this)
        });
    };

    c._orderFeedItems = function (activityData) {
        var undoneActivities = [];
        var doneActivities = [];

        activityData.forEach(function (activity) {
            var instance = _.find(this.feedItemInstances, function (instans) {
                return instans.getClassName() === activity.className;
            });

            if (activity.state === CS.Models.Activity.state.done) {
                doneActivities.push({
                    title: instance.getTitle(),
                    isDone: true,
                    instance: instance
                });
            } else if (instance.isDoable()) {
                undoneActivities.push({
                    title: instance.getTitle(),
                    isDone: false,
                    instance: instance
                });
            }
        }, this);

        // We handle instances which didn't have any activity data
        this.feedItemInstances.forEach(function (instance, index) {
            var isTodo = _.isEmpty(_.find(doneActivities, function (activity) {
                return activity.instance.getClassName() === instance.getClassName();
            }));

            if (isTodo && instance.isDoable()) {
                // Is it already is among the undoneActivities?
                var isAlreadyInTheList = _.find(undoneActivities, function (activity) {
                    return activity.instance.getClassName() === instance.getClassName();
                });

                if (!isAlreadyInTheList) {
                    undoneActivities.push({
                        title: instance.getTitle(),
                        isDone: false,
                        instance: instance
                    });
                }
            }
        }, this);

        this._showOrHideRegisterReminder(doneActivities.length);

        this.reactInstance.replaceState({ data: _.union(undoneActivities, doneActivities) });
    };

    c._showOrHideRegisterReminder = function (doneActivitiesCount) {
        if (CS.Controllers.isTemporaryAccount() && doneActivitiesCount > 0) {
            CS.Services.Animator.fadeIn(this.$registerReminderAlert);
        } else {
            CS.Services.Animator.fadeOut(this.$registerReminderAlert);
        }
    };
});

CS.Controllers.ActivityFeed.packageName = {
    c1: "C1s",
    activity: "Activities"
};

CS.Controllers.ActivityFeedItem = React.createClass({displayName: "ActivityFeedItem",
    render: function () {
        var liClasses = React.addons.classSet({
            "well": true,
            "done": this.props.c1OrActivity.isDone
        });

        var buttonText = this.props.c1OrActivity.isDone ? "Restart" : "Start";

        return (
            React.createElement("li", {className: liClasses}, 
                React.createElement("h2", null, this.props.c1OrActivity.title), 
                React.createElement("button", {className: "btn btn-default", onClick: this._handleClick}, buttonText)
            )
            );
    },
    
    _handleClick: function (e) {
        var instance = this.props.c1OrActivity.instance;

        instance.preLaunch();

        location.hash = "activities/" + instance.getClassName();

        $("#c1-and-activity-feed").hide();
        $("#current-c1-or-activity").show();
    }
});

CS.Controllers.Standouts = P(function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {data: []};
        },

        render: function () {
            var listItems = this.state.data.map(function (standout) {
                return (
                    React.createElement("li", {id: standout.className, className: "well"})
                    );
            }.bind(this));

            return (
                React.createElement("ul", {className: "styleless"}, 
                    listItems
                )
                );
        }
    });

    c.init = function () {
        this.itemClassNames = ["Strengths"];

        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            document.getElementById("standouts")
        );
    };

    c.refreshData = function () {
        this._fetchCustomActivities();
    };

    c._fetchCustomActivities = function () {
        var type = "GET";
        var url = "/api/custom-activities";

        $.ajax({
            url: url,
            type: type,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                var itemInstancesCustomStandouts = data.map(function (customActivity, index) {
                    return CS.Standouts.Custom(customActivity.className, customActivity.title);
                }, this);

                var itemInstancesClassicStandouts = this.itemClassNames.map(function (className, index) {
                    return CS.Standouts[className](className);
                }, this);

                var allItemInstances = _.union(itemInstancesCustomStandouts, itemInstancesClassicStandouts);

                this.reactInstance.replaceState({ data: allItemInstances });

                allItemInstances.forEach(function(instance, index) {
                    instance.render();
                }, this);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
            }.bind(this)
        });
    };
});
;CS.Activities = {};

CS.Activities.Base = P(function (c) {
    c.$el = $("#current-c1-or-activity");
    c.controllers = {};

    c.init = function(className, title) {
        this.title = title;

        this.model = {
            className: className,
            accountData: CS.accountData || {}
        };

        this.$el.empty();

        this._initElements();
    };

    c._initElements = function() {
        this.$activitiesTab = $("#activities-tab");

        this.$tabPanels = $('[role="tabpanel"]');
        this.$activitiesPanel = this.$tabPanels.filter("#activities");

        this.$feedSection = this.$activitiesPanel.children("#c1-and-activity-feed");
        this.$currentC1OrActivitySection = this.$activitiesPanel.children("#current-c1-or-activity");
    };

    c.getClassName = function() {
        return this.model.className;
    };

    c.getTitle = function() {
        return this.title;
    };

    c.registerController = function(controllerClass, route) {
        this.controllers[route] = controllerClass;
    };

    c.renderController = function (route, data) {
        if (!this.$activitiesPanel.hasClass("active")) {
            this.$tabPanels.removeClass("active");
            this.$activitiesTab.tab('show');
            this.$activitiesPanel.addClass("active");
        }

        this.$feedSection.hide();
        this.$currentC1OrActivitySection.show();

        this._hidePagesAndDisplayNext(route, data);
    };

    c._hidePagesAndDisplayNext = function(route, data) {
        var $pages = this.$el.children();

        TweenLite.to($pages, CS.Activities.Base.pageAnimationDuration, {
            alpha: 0,
            onComplete: function() {
                $pages.hide();
                this.controllers[route].render(data);
            }.bind(this)
        });
    };
});

CS.Activities.Base.pageAnimationDuration = 0.15;;CS.Activities.Controller = P(function (c) {
    c.init = function (route, activity) {
        this.route = route;
        this.activity = activity;
        this.activity.registerController(this, this.route);
    };

    c.render = function (data) {
        if (!this.isRendered) {
            var uniqueId = _.uniqueId();

            this.activity.$el.append('<div class="activity-page ' + this.activity.model.className + '" id="' + uniqueId + '"></div>');
            this.$el = $("#" + uniqueId);

            this.reactInstance = React.render(
                React.createElement(this.reactClass, data),
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
    };

    c.navigateTo = function(route) {
        location.hash = route;
    };

    c.postData = function() {
        var type = "POST";
        var url = "/api/activities";

        $.ajax({
            url: url,
            type: type,
            contentType: "application/json",
            data: JSON.stringify(this.activity.model),
            success: function (data, textStatus, jqXHR) {
                CS.accountData = this.activity.model.accountData;
                location.href = "/#standouts";
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                this.$submitBtn.button('reset');
                alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
            }.bind(this)
        });
    };

    // Child functions are call instead if exist
    c.initElements = function() {};
    c.initValidation = function() {};
    c.initEvents = function() {};
    c.onReRender = function() {};
});
;CS.Activities.Custom = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title, text) {
        base.init.call(this, className, title);

        this.text = text;

        this.model.accountData.custom = this.model.accountData.custom || {};
    };

    c.isDoable = function () {
        return true;    // Always doable
    };

    c.preLaunch = function () {
        // Initialising all app controllers
        this.controller = CS.Activities.Custom.Controllers.Page1("activities/" + this.model.className, this);

        CS.router.get(this.controller.route, function (req) {
            this.renderController(this.controller.route, { text: this.text});
        }.bind(this));
    };
});

CS.Activities.Custom.Controllers = {};
;CS.Activities.IdentifyStrengths = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title) {
        base.init.call(this, className, title);

        this.model.accountData.strengths = this.model.accountData.strengths || {};
    };

    c.isDoable = function() {
        return true;    // No conditions
    };

    c.preLaunch = function() {
        // Initialising all app controllers
        this.page1Controller = CS.Activities.IdentifyStrengths.Controllers.Page1("activities/" + this.model.className, this);

        CS.router.get(this.page1Controller.route, function (req) {
            this.renderController(this.page1Controller.route);
        }.bind(this));
    };
});

CS.Activities.IdentifyStrengths.Controllers = {};
;CS.Activities.GlobalFindYourStrengths = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title) {
        base.init.call(this, className, title);

        this.model.accountData.strengths = this.model.accountData.strengths || {};
    };

    c.isDoable = function() {
        return true;    // No conditions
    };

    c.preLaunch = function() {
        // Initialising all app controllers
        this.page1Controller = CS.Activities.GlobalFindYourStrengths.Controllers.Page1("activities/" + this.model.className, this);
        this.page2Controller = CS.Activities.GlobalFindYourStrengths.Controllers.Page2("activities/" + this.model.className + "/2", this);
        this.page3Controller = CS.Activities.GlobalFindYourStrengths.Controllers.Page3("activities/" + this.model.className + "/3", this);

        CS.router.get(this.page1Controller.route, function (req) {
            this.renderController(this.page1Controller.route);
        }.bind(this));

        CS.router.get(this.page2Controller.route, function (req) {
            this.renderController(this.page2Controller.route);
        }.bind(this));

        CS.router.get(this.page3Controller.route, function (req) {
            this.renderController(this.page3Controller.route);
        }.bind(this));
    };
});

CS.Activities.GlobalFindYourStrengths.Controllers = {};
;CS.Activities.GlobalFindYourStrengths2 = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title) {
        base.init.call(this, className, title);
    };

    c.isDoable = function () {
        return this.model.accountData.strengths &&
            this.model.accountData.strengths.strength1 &&
            this.model.accountData.strengths.strength2 &&
            this.model.accountData.strengths.strength3;
    };

    c.preLaunch = function () {
        // Initialising all app controllers
        this.controller = CS.Activities.GlobalFindYourStrengths2.Controllers.Page1("activities/" + this.model.className, this);

        CS.router.get(this.controller.route, function (req) {
            this.renderController(this.controller.route);
        }.bind(this));
    };
});

CS.Activities.GlobalFindYourStrengths2.Controllers = {};
;CS.Activities.Custom.Controllers.Page1 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("p", null, this.props.text), 
                        React.createElement("textarea", {id: "custom-activity-answer", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 
                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "submit", className: "btn btn-primary", "data-loading-text": "Saving..."}, "Done")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");

        this.$textarea = this.$form.find("#custom-activity-answer");

        this.$submitBtn = this.$form.find("[type=submit]");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "custom-activity-answer"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._handleSubmit, this));
    };

    c.onReRender = function() {
        // The submit button may still be in loading state when navigating back. We make sure it doesn't happen
        this.$submitBtn.button('reset');
    };

    c._handleSubmit = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.$submitBtn.button('loading');

            this.activity.model.accountData.custom[this.activity.model.className] = this.$textarea.val().trim();

            this.postData();
        }
    };
});

CS.Activities.GlobalFindYourStrengths.Controllers.Page1 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {for: "strength-1"}, "My first strength is"), 
                        React.createElement("input", {type: "text", id: "strength-1", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 
                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Next")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$strengthField = this.$form.find("#strength-1");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength-1"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._doSubmit, this));
    };

    c._doSubmit = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.activity.model.accountData.strengths.strength1 = this.$strengthField.val().trim();

            this.navigateTo(this.activity.page2Controller.route);
        }
    };
});

CS.Activities.GlobalFindYourStrengths.Controllers.Page2 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {for: "strength-2"}, "My second strength is"), 
                        React.createElement("input", {type: "text", id: "strength-2", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 
                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Next")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$strengthField = this.$form.find("#strength-2");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength-2"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._doSubmit, this));
    };

    c._doSubmit = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.activity.model.accountData.strengths.strength2 = this.$strengthField.val().trim();

            this.navigateTo(this.activity.page3Controller.route);
        }
    };
});

CS.Activities.GlobalFindYourStrengths.Controllers.Page3 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {for: "strength-3"}, "My third strength is"), 
                        React.createElement("input", {type: "text", id: "strength-3", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 
                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "submit", className: "btn btn-primary", "data-loading-text": "Saving..."}, "Done")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$strengthField = this.$form.find("#strength-3");
        this.$submitBtn = this.$form.find("[type=submit]");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength-3"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._handleSubmit, this));
    };

    c.onReRender = function() {
        // The submit button may still be in loading state when navigating back. We make sure it doesn't happen
        this.$submitBtn.button('reset');
    };

    c._handleSubmit = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.$submitBtn.button('loading');

            this.activity.model.accountData.strengths.strength3 = this.$strengthField.val().trim();

            this.postData();
        }
    };
});

CS.Activities.GlobalFindYourStrengths2.Controllers.Page1 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {for: "strength-4"}, "My first über-strength is"), 
                        React.createElement("input", {type: "text", id: "strength-4", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {for: "strength-5"}, "My second über-strength is"), 
                        React.createElement("input", {type: "text", id: "strength-5", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {for: "strength-6"}, "My third über-strength is"), 
                        React.createElement("input", {type: "text", id: "strength-6", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 
                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "submit", className: "btn btn-primary", "data-loading-text": "Saving..."}, "Done")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");

        this.$strength4Field = this.$form.find("#strength-4");
        this.$strength5Field = this.$form.find("#strength-5");
        this.$strength6Field = this.$form.find("#strength-6");

        this.$submitBtn = this.$form.find("[type=submit]");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength-4",
            "strength-5",
            "strength-6"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._doSubmit, this));
    };

    c.onReRender = function() {
        // The submit button may still be in loading state when navigating back. We make sure it doesn't happen
        this.$submitBtn.button('reset');
    };

    c._doSubmit = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.$submitBtn.button('loading');

            this.activity.model.accountData.strengths.strength4 = this.$strength4Field.val().trim();
            this.activity.model.accountData.strengths.strength5 = this.$strength5Field.val().trim();
            this.activity.model.accountData.strengths.strength6 = this.$strength6Field.val().trim();

            this.postData();
        }
    };
});

CS.Activities.IdentifyStrengths.Controllers.Page1 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {data: []};
        },

        render: function () {
            var listItems = this.state.data.map(function (strength) {
                return (
                    React.createElement("li", null, 
                        React.createElement("span", {className: "tag"}, 
                            React.createElement("span", null, strength), 
                            React.createElement("button", {type: "button", className: "close", "aria-label": "Close", onClick: this._handleRemoveStrengthClick}, React.createElement("span", {"aria-hidden": "true"}, "×"))
                        )
                    )
                    );
            }.bind(this));

            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("h1", null, "Finns det några egenskaper du vill framhäva som inte direkt efterfrågas?"), 

                    React.createElement("p", null, "Det kan t.ex. vara hur dina vänner skille beskriva dig eller styrkor du fått fram i ett Strengths" + ' ' +
                        "Finder-test."), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("div", {className: "input-group"}, 
                            React.createElement("input", {type: "text", id: "strength", className: "form-control", placeholder: "t.ex. strategisk, eller 'ett öga för god design'."}), 
                            React.createElement("span", {className: "input-group-btn"}, 
                                React.createElement("button", {type: "submit", className: "btn btn-default"}, "+ Lägg till")
                            )
                        ), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("ul", {className: "styleless", id: "strength-tags"}, 
                        listItems
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "button", id: "go-next-step", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        },

        _handleRemoveStrengthClick: function(e) {
            var $li = $(e.currentTarget).parent().parent();

            CS.Services.Animator.fadeOut($li, function() {
                $li.remove();
            });
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$strengthField = this.$form.find("#strength");
        this.$goNextStepBtn = this.$form.find("#go-next-step");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._addStrengthToList, this));
        this.$goNextStepBtn.click($.proxy(this._saveAndNavigateNext, this));
    };

    c._addStrengthToList = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            var strength = this.$strengthField.val().trim();
            var data = this.reactInstance.state.data;
            data.push(strength);

            this.reactInstance.replaceState({ data: data });

            this.$strengthField.val("");
        }
    };

    c._saveAndNavigateNext = function (e) {
        this.activity.model.accountData.strengths.strength1 = this.$strengthField.val().trim();

        this.navigateTo(this.activity.page2Controller.route);
    };
});
;CS.Standouts = {};

CS.Standouts.Base = P(function (c) {
    c.init = function (className) {
        this.className = className;
    };

    c.render = function (data) {
        this.reactInstance = React.render(
            React.createElement(this.reactClass, data),
            document.getElementById(this.className)
        );
    };
});
;CS.Standouts.Custom = P(CS.Standouts.Base, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            return (
                React.createElement("div", null, 
                    React.createElement("h2", null, this.props.title), 
                    React.createElement("p", null, this.props.data)
                )
                );
        }
    });

    c.init = function (className, title) {
        base.init.call(this, className);

        this.title = title;
    };

    c.render = function () {
        var data = null;

        if (CS.accountData && CS.accountData.custom) {
            data = CS.accountData.custom[this.className];
        }

        base.render.call(this, {
            title: this.title,
            data: data
        });
    };
});

CS.Standouts.Strengths = P(CS.Standouts.Base, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            var listItemStrength1, listItemStrength2, listItemStrength3, listItemStrength4, listItemStrength5, listItemStrength6;

            if (this.props.strength1) {
                listItemStrength1 = (
                    React.createElement("li", null, this.props.strength1)
                    );
            }
            if (this.props.strength2) {
                listItemStrength2 = (
                    React.createElement("li", null, this.props.strength2)
                    );
            }
            if (this.props.strength3) {
                listItemStrength3 = (
                    React.createElement("li", null, this.props.strength3)
                    );
            }
            if (this.props.strength4) {
                listItemStrength4 = (
                    React.createElement("li", null, this.props.strength4)
                    );
            }
            if (this.props.strength5) {
                listItemStrength5 = (
                    React.createElement("li", null, this.props.strength5)
                    );
            }
            if (this.props.strength6) {
                listItemStrength6 = (
                    React.createElement("li", null, this.props.strength6)
                    );
            }

            return (
                React.createElement("div", null, 
                    React.createElement("h2", null, "My strengths"), 
                    React.createElement("ul", null, 
                        listItemStrength1, 
                        listItemStrength2, 
                        listItemStrength3, 
                        listItemStrength4, 
                        listItemStrength5, 
                        listItemStrength6
                    )
                )
                );
        }
    });

    c.init = function (className) {
        base.init.call(this, className);
    };

    c.render = function () {
        var data = CS.accountData ? CS.accountData.strengths : null;

        base.render.call(this, data);
    };
});

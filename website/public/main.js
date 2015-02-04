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

!function(a){function b(b){"use strict";var c=this;return this.events={},this.params=[],this.state=null,this.options=b||{},this.options.usePushState=!!(c.options.pushState&&a.history&&a.history.pushState),this.version="0.5.1",this.fragment=this.anchor=this.hash={get:function(){var b;return b=c.options.usePushState?a.location.pathname.replace(c.options.root,""):a.location.hash?a.location.hash.split("#")[1]:""},set:function(b){return c.options.usePushState?(b=c.options.root?c.options.root+b:b,a.history.pushState({},null,b)):a.location.hash=b,c},clear:function(){return c.options.usePushState?a.history.pushState({},null,c.options.root||"/"):a.location.hash="",c}},this._forEach=function(a,b){return"function"==typeof Array.prototype.forEach?Array.prototype.forEach.call(a,b):function(a,b){for(var c=0,d=this.length;d>c;++c)a.call(b,this[c],c,this)}.call(a,b)},this.trigger=function(a){var b=Array.prototype.slice.call(arguments,1);return this.events[a]&&this._forEach(this.events[a],function(a){a.apply(c,b)}),this},"function"==typeof a.onhashchange&&this.on("hashchange",a.onhashchange),"function"==typeof a.onpopstate&&this.on("navigate",a.onpopstate),a.onhashchange=function(){c.trigger("hashchange")},a.onpopstate=function(){c.trigger("navigate")},this}b.regexRoute=function(a,b,c,d){return a instanceof RegExp?a:(a instanceof Array&&(a="("+a.join("|")+")"),a=a.concat(d?"":"/?").replace(/\/\(/g,"(?:/").replace(/\+/g,"__plus__").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g,function(a,c,d,e,f,g){return b.push({name:e,optional:!!g}),c=c||"",""+(g?"":c)+"(?:"+(g?c:"")+(d||"")+(f||d&&"([^/.]+?)"||"([^/]+?)")+")"+(g||"")}).replace(/([\/.])/g,"\\$1").replace(/__plus__/g,"(.+)").replace(/\*/g,"(.*)"),new RegExp("^"+a+"$",c?"":"i"))},b.prototype.get=b.prototype.add=function(a,c){var d=this,e=[],f=b.regexRoute(a,e),g=function(){var b=d.fragment.get().match(f);if(b){var g={params:{},keys:e,matches:b.slice(1)};d._forEach(g.matches,function(a,b){var c=e[b]&&e[b].name?e[b].name:b;g.params[c]=a?decodeURIComponent(a):void 0});var h={route:a,value:d.fragment.get(),params:g.params,regex:b,propagateEvent:!0,previousState:d.state,preventDefault:function(){this.propagateEvent=!1},callback:function(){c.call(d,g,h)}};if(d.trigger("match",h),!h.propagateEvent)return d;d.state=h,h.callback()}return d};return g().on(d.options.usePushState?"navigate":"hashchange",g)},b.prototype.on=b.prototype.bind=function(a,b){var c=this,d=a.split(" ");return this._forEach(d,function(a){c.events[a]?c.events[a].push(b):c.events[a]=[b]}),this},b.Router=b.prototype.router=b,b.prototype.context=function(a){var b=this;return function(c,d){var e="/"!==a.slice(-1)?a+"/":a,f=e+c;return b.get.call(b,f,d)}},b.prototype.navigate=function(a){return this.fragment.set(a),this.trigger("navigate")},b.listen=function(){var a,c;return arguments[0]&&arguments[1]?(a=arguments[0],c=arguments[1]):c=arguments[0],function(){for(var a in c)this.get.call(this,a,c[a]);return this}.call(new b(a||{}))},"function"==typeof a.define?a.define(function(){return b}):"object"==typeof exports?exports.Grapnel=b:a.Grapnel=b}.call({},window);;if (typeof String.prototype.startsWith !== 'function') {
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
;CS.Services = {
    guid: (function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return function () {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };
    })()
};
;CS.Services.Validator = P(function (s) {
    s.checkEmpty = "empty";
    s.checkEmail = "email";
    s.checkUsername = "username";
    s.checkDateInFuture = "in-future";
    s.checkMinLength = "min-length";
    s.checkMaxLength = "max-length";
    s.checkInteger = "integer";
    s.checkDecimal = "decimal";
    s.checkUrl = "url";

    s.init = function (fieldIds) {
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

    s.isValid = function () {
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

    s.flagValid = function ($field) {
        var $wrapper = $field.parent();
        $wrapper.removeClass("has-error");
        //$wrapper.addClass("has-success");
    };

    s.flagInvalid = function ($field) {
        var $wrapper = $field.parent();
        //$wrapper.removeClass("has-success");
        $wrapper.addClass("has-error");
    };

    s.isFlaggedInvalid = function ($field) {
        return $field.parent().hasClass("has-error");
    };

    s._get$empty = function ($field) {
        return this._get$error($field, this.checkEmpty);
    };

    s._get$email = function ($field) {
        return this._get$error($field, this.checkEmail);
    };

    s._get$username = function ($field) {
        return this._get$error($field, this.checkUsername);
    };

    s._get$inFuture = function ($field) {
        return this._get$error($field, this.checkDateInFuture);
    };

    s._get$minLength = function ($field) {
        return this._get$error($field, this.checkMinLength);
    };

    s._get$maxLength = function ($field) {
        return this._get$error($field, this.checkMaxLength);
    };

    s._get$integer = function ($field) {
        return this._get$error($field, this.checkInteger);
    };

    s._get$decimal = function ($field) {
        return this._get$error($field, this.checkDecimal);
    };

    s._get$url = function ($field) {
        return this._get$error($field, this.checkUrl);
    };

    s._get$error = function ($field, checkType) {
        return $field.parent().find("p[data-check=" + checkType + "]");
    };

    s._isToCheckIfEmpty = function ($field) {
        return this._get$empty($field).length === 1;
    };

    s._isToCheckIfEmail = function ($field) {
        return this._get$email($field).length === 1;
    };

    s._isToCheckIfUsername = function ($field) {
        return this._get$username($field).length === 1;
    };

    s._isToCheckIfInFuture = function ($field) {
        return this._get$inFuture($field).length === 1;
    };

    s._isToCheckIfMinLength = function ($field) {
        return this._get$minLength($field).length === 1;
    };

    s._isToCheckIfMaxLength = function ($field) {
        return this._get$maxLength($field).length === 1;
    };

    s._isToCheckIfInteger = function ($field) {
        return this._get$integer($field).length === 1;
    };

    s._isToCheckIfDecimal = function ($field) {
        return this._get$decimal($field).length === 1;
    };

    s._isToCheckIfUrl = function ($field) {
        return this._get$url($field).length === 1;
    };

    s._isEmail = function (email) {
        if (email === "")
            return true;

        var reg = /^([a-z0-9_\-\.])+\@([a-z0-9_\-\.])+\.([a-z]{2,4})$/i;
        return reg.test(email);
    };

    s._isUsername = function (username) {
        var reg = /^([a-z0-9_\-])+$/i;
        return reg.test(username);
    };

    s._isInFuture = function (dateStr) {
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

    s._isMinLength = function (value, minLength) {
        if (value === null || value === undefined || value === "")
            return true;
        return value.length >= minLength;
    };

    s._isMaxLength = function (value, maxLength) {
        if (value === null || value === undefined || value === "")
            return true;
        return value.length <= maxLength;
    };

    s._isInteger = function (value) {
        var reg = /^\d*$/;
        return reg.test(value);
    };

    s._isDecimal = function (value) {
        var reg = /^\d*\.?\d*$/;
        return reg.test(value);
    };

    s._isUrl = function(url) {
        var reg = /^((https?|ftp|irc):\/\/)?(www\d?|[a-z0-9]+)?\.[a-z0-9-]+(\:|\.)([a-z0-9.]+|(\d+)?)([/?:].*)?$/i;
        return reg.test(url);
    };

    s._validateField = function ($field, isOnBlur) {

        // Empty?
        if (this._isToCheckIfEmpty($field)) {
            if ($field.hasClass("nav-pills") &&
                $field.children(".active").length === 0) {

                this.flagInvalid($field);
                this._slideDownErrorMessage(this._get$empty($field));
                return false;
            }
            if (!$field.hasClass("nav-pills") && !$field.val().trim()) {

                if (!isOnBlur) {
                    this.flagInvalid($field);
                    this._slideDownErrorMessage(this._get$empty($field));
                }
                return false;
            }

            this._slideUpErrorMessage(this._get$empty($field));
        }

        // Email?
        if (this._isToCheckIfEmail($field)) {
            if (!this._isEmail($field.val())) {
                this.flagInvalid($field);
                this._slideDownErrorMessage(this._get$email($field));
                return false;
            }

            this._slideUpErrorMessage(this._get$email($field));
        }

        // Username?
        if (this._isToCheckIfUsername($field)) {
            if (!this._isUsername($field.val())) {
                this.flagInvalid($field);
                this._slideDownErrorMessage(this._get$username($field));
                return false;
            }
            this._slideUpErrorMessage(this._get$username($field));
        }

        // In the future?
        if (this._isToCheckIfInFuture($field)) {
            if (!this._isInFuture($field.val())) {
                this.flagInvalid($field);
                this._slideDownErrorMessage(this._get$inFuture($field));
                return false;
            }
            this._slideUpErrorMessage(this._get$inFuture($field));
        }

        // Min length?
        if (this._isToCheckIfMinLength($field)) {
            if (!this._isMinLength($field.val(), $field.data("min-length"))) {
                this.flagInvalid($field);
                this._slideDownErrorMessage(this._get$minLength($field));
                return false;
            }
            this._slideUpErrorMessage(this._get$minLength($field));
        }

        // Max length?
        if (this._isToCheckIfMaxLength($field)) {
            if (!this._isMaxLength($field.val(), $field.attr("maxlength"))) {
                this.flagInvalid($field);
                this._slideDownErrorMessage(this._get$maxLength($field));
                return false;
            }
            this._slideUpErrorMessage(this._get$maxLength($field));
        }

        // Integer number?
        if (this._isToCheckIfInteger($field)) {
            if (!this._isInteger($field.val())) {
                this.flagInvalid($field);
                this._slideDownErrorMessage(this._get$integer($field));
                return false;
            }
            this._slideUpErrorMessage(this._get$integer($field));
        }

        // Decimal number?
        if (this._isToCheckIfDecimal($field)) {
            if (!this._isDecimal($field.val())) {
                this.flagInvalid($field);
                this._slideDownErrorMessage(this._get$decimal($field));
                return false;
            }
            this._slideUpErrorMessage(this._get$decimal($field));
        }

        // URL?
        if (this._isToCheckIfUrl($field)) {
            if (!this._isUrl($field.val())) {
                this.flagInvalid($field);
                this._slideDownErrorMessage(this._get$url($field));
                return false;
            }
            this._slideUpErrorMessage(this._get$url($field));
        }

        this.flagValid($field);

        return true;
    };

    s._addBlurEvent = function ($field) {
        $field.blur(function () {
            this._validateField($field, true);
        }.bind(this));
    };

    s._addValueChangedEvent = function ($field) {
        $field.change(function () {
            this._validateField($field);
        }.bind(this));
    };

    s._addClickEvents = function ($field) {
        $field.find("a").bind("active-toggled", function () {
            this._validateField($field);
        }.bind(this));
    };

    s._slideDownErrorMessage = function ($errorMsgEl) {
        if ($errorMsgEl.html()) {
            $errorMsgEl.show(); // TODO: animate
        }
    };

    s._slideUpErrorMessage = function ($errorMsgEl) {
        if ($errorMsgEl.html()) {
            $errorMsgEl.hide(); // TODO: animate
        }
    };
});
;CS.Models.Activity = {
    state: {
        todo: "TODO",
        done: "DONE"
    }
};
;CS.Controllers.httpStatusCode = {
    noContent: 204,
    emailAlreadyRegistered: 230
};
;CS.Controllers.Index = P(function (c) {
    c.init = function (accountId) {
        this.accountId = accountId;

        this.c1AndActivityFeedController = CS.Controllers.C1AndActivityFeed();

        CS.Controllers.HeaderModal.Register(this);
        CS.Controllers.HeaderModal.SignIn(this);

        this._initElements();
        this._initHeaderLinks();
        this._initEvents();

        this._initRouter();
    };

    c._initElements = function () {
        this.$headerNav = $('[role="navigation"]');
        this.$activitiesTab = this.$headerNav.find("#activities-tab");
        this.$insightsTab = this.$headerNav.find("#insights-tab");

        this.$headerLinks = this.$headerNav.children("a");
        this.$signOutLink = this.$headerLinks.filter("#sign-out-link");

        this.$tabPanels = $('[role="tabpanel"]');
        this.$activitiesPanel = this.$tabPanels.filter("#activities");
        this.$insightsPanel = this.$tabPanels.filter("#insights");

        this.$feedSection = this.$activitiesPanel.children("#c1-and-activity-feed");
        this.$currentC1OrActivitySection = this.$activitiesPanel.children("#current-c1-or-activity");
    };

    c._initHeaderLinks = function () {
        if (this._isTemporaryAccount()) {
            this.$headerLinks.show();
            this.$signOutLink.hide();
        } else {
            this.$signOutLink.show();
        }
    };

    c._initEvents = function () {
        this.$activitiesTab.click(function (e) {
            // TODO: remove if (!location.hash.startsWith("#activities")) {
            location.hash = "activities";
            //}
        });

        this.$insightsTab.click(function (e) {
            location.hash = "insights";
        });

        this.$signOutLink.click($.proxy(this._signOut, this));

        window.onbeforeunload = $.proxy(this._confirmExit, this);
    };

    c._initRouter = function () {
        var router = new Grapnel();

        router.get("", function (req) {
            this._activateActivitiesPanel();
        }.bind(this));

        router.get("activities", function (req) {
            this._activateActivitiesPanel();
        }.bind(this));

        router.get("insights", function (req) {
            this._activateInsightsPanel();
        }.bind(this));
    };

    c._activateActivitiesPanel = function () {
        if (!this.$activitiesPanel.hasClass("active")) {
            this.$tabPanels.removeClass("active");
            this.$activitiesTab.tab('show');
            this.$activitiesPanel.addClass("active");
        }

        this.c1AndActivityFeedController.refreshData();

        this.$currentC1OrActivitySection.hide();
        this.$feedSection.show();
    };

    c._activateInsightsPanel = function () {
        if (!this.$insightsPanel.hasClass("active")) {
            this.$tabPanels.removeClass("active");
            this.$insightsTab.tab('show');
            this.$insightsPanel.addClass("active");
        }

        this.c1AndActivityFeedController.refreshData();

        this.$currentC1OrActivitySection.hide();
        this.$feedSection.show();
    };

    c._isTemporaryAccount = function () {
        return this.accountId < 0;
    };

    c._signOut = function(e) {
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

    c._confirmExit = function(e) {
        if (this._isTemporaryAccount() && CS.Controllers.Index.isUnsavedProgress) {
            return "You are about to lose your progress. You can save it by registering via the link at the top of the page.";
        }
    };

    c._isTemporaryAccount = function () {
        return this.accountId < 0;
    };
});

CS.Controllers.Index.isUnsavedProgress = false;
;CS.Controllers.HeaderModal = P(function (c) {
    c.init = function (indexController) {
        this.indexController = indexController;

        this.initElements();
        this.initValidation();
        this.initEvents();
    };

    c.initElements = function () {
        this.$headerNav = $('[role="navigation"]');
        this.$headerLinks = this.$headerNav.children("a");
        this.$registerLink = this.$headerLinks.filter("#register-link");
        this.$signInLink = this.$headerLinks.filter("#sign-in-link");
        this.$signOutLink = this.$headerLinks.filter("#sign-out-link");

        this.$modal = $("#modal");
        this.$modalTitles = this.$modal.find(".modal-title");
        this.$modalForms = this.$modal.find("form");
        this.$modalSubmitButtons = this.$modal.find(".modal-footer").find("button");
    };

    c.initEvents = function () {
        this.$modal.on('hidden.bs.modal', $.proxy(this._launchOtherModalIfNeeded, this));
        this.$launchLink.click($.proxy(this._launchModal, this));
        this.$switchModalLink.click($.proxy(this.setSwitchFormIdAndCloseModal, this));
        this.$form.submit($.proxy(this._clickOnSubmitBtn, this));
        this.$submitBtn.click($.proxy(this.handleSubmit, this));
    };

    c.resetForm = function () {
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
        base.initElements();

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

        this.$otherFormErrors.hide();

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
                        this.$emailAlreadyRegisteredError.show();
                    } else {
                        this.$headerLinks.hide();
                        this.$signOutLink.show();

                        this.indexController.accountId = data;
                        location.hash = "activities";

                        this.$modal.modal('hide');

                        this.resetForm();
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
        var isValid = this.$passwordField.val() === this.$passwordConfirmationField.val();

        if (!isValid) {
            this.$passwordsNotMatchingError.show();
        }

        return isValid;
    };
});
;CS.Controllers.HeaderModal.SignIn = P(CS.Controllers.HeaderModal, function (c, base) {
    c.initElements = function () {
        base.initElements();

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

        this.$wrongCredentialsError.hide();

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
                        this.$wrongCredentialsError.show();
                    } else {
                        this.$headerLinks.hide();
                        this.$signOutLink.show();

                        this.indexController.accountId = data;
                        location.hash = "activities";

                        this.$modal.modal('hide');

                        this.resetForm();
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
;CS.Controllers.C1AndActivityFeed = P(function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {data: []};
        },
        
        render: function () {
            var listItems = this.state.data.map(function (c1OrActivity) {
                return (
                    React.createElement(CS.Controllers.C1OrActivityFeedItem, {c1OrActivity: c1OrActivity})
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
        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            document.getElementById("c1-and-activity-feed")
        );
    };

    c.refreshData = function () {
        this._fetchActivities();
    };

    c._fetchActivities = function () {
        var type = "GET";
        var url = "/api/activities";

        $.ajax({
            url: url,
            type: type,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                this._replaceReactState(data);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
            }
        });
    };

    c._replaceReactState = function(activityData) {
        var undoneActivities = [];
        var doneActivities = [];

        activityData.forEach(function (activity) {
            var itemData = {
                isDone: activity.state === CS.Models.Activity.state.done,
                name: activity.name,
                model: activity
            };

            if (itemData.isDone) {
                doneActivities.push(itemData);
            } else {
                undoneActivities.push(itemData);
            }
        }, this);

        this.reactInstance.replaceState({ data: _.union(undoneActivities, doneActivities) });
    };
});

CS.Controllers.C1OrActivityFeedItem = React.createClass({displayName: "C1OrActivityFeedItem",
    render: function () {
        var liClasses = React.addons.classSet({
            "well": true,
            "done": this.props.c1OrActivity.isDone
        });

        var buttonText = this.props.c1OrActivity.isDone ? "Restart" : "Start";

        return (
            React.createElement("li", {className: liClasses}, 
                React.createElement("h2", null, this.props.c1OrActivity.name), 
                React.createElement("button", {onClick: this._handleClick}, buttonText)
            )
            );
    },
    
    _handleClick: function (e) {
        if (this._isC1(this.props.c1OrActivity)) {
            var c1 = this.props.c1OrActivity.model;
            var c1ClassName = c1.c1.className;

            if (_.isFunction(CS.C1s[c1ClassName])) {
                CS.C1s[c1ClassName]().initC1(c1);
            } else {
                CS.C1s[c1ClassName].initC1(c1);
            }

            location.hash = "c1s/" + c1ClassName;
        } else {
            var activity = this.props.c1OrActivity.model;

            if (_.isFunction(CS.Activities[activity.className])) {
                CS.Activities[activity.className]().initActivity(activity);
            } else {
                CS.Activities[activity.className].initActivity(activity);
            }

            location.hash = "activities/" + activity.className;
        }
        $("#c1-and-activity-feed").hide();
        $("#current-c1-or-activity").show();

        CS.Controllers.Index.isUnsavedProgress = true;
    },
    
    _isC1: function (c1OrActivity) {
        return c1OrActivity.model.c1 !== undefined;
    }
});
;CS.Activities = {};

CS.Activities.Base = P(function (c) {
    c.router = new Grapnel();
    c.$el = $("#current-c1-or-activity");
    c.controllers = {};

    c.init = function(className, accountData) {
        this.model = {
            activityClassName: className,
            accountData: accountData || {}
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

    c.registerController = function(controllerClass, route) {
        this.controllers[route] = controllerClass;
    };

    c.renderController = function (route) {
        if (!this.$activitiesPanel.hasClass("active")) {
            this.$tabPanels.removeClass("active");
            this.$activitiesTab.tab('show');
            this.$activitiesPanel.addClass("active");
        }

        this.$feedSection.hide();
        this.$currentC1OrActivitySection.show();

        this.$el.children().hide();
        this.controllers[route].render();
    };
});
;CS.Activities.Controller = P(function (c) {
    c.init = function (route, activity) {
        this.route = route;
        this.activity = activity;
        this.activity.registerController(this, this.route);
    };

    c.render = function () {
        if (!this.isRendered) {
            var uuid = CS.Services.guid();

            this.activity.$el.append('<div class="activity-page" id="' + uuid + '"></div>');
            this.$el = $("#" + uuid);

            React.render(
                React.createElement(this.reactClass, {data: this.activity.model.insightModule.data}),
                this.$el[0]
            );

            this.initElements();
            this.initValidation();
            this.initEvents();

            this.isRendered = true;
        }

        this.onReRender();

        this.$el.show();
    };

    c.navigateTo = function(route) {
        location.hash = route;
    };

    // Child functions are call instead if exist
    c.initElements = function() {};
    c.initValidation = function() {};
    c.initEvents = function() {};
    c.onReRender = function() {};
});
;CS.Activities.GlobalFindYourStrengths = P(CS.Activities.Base, function (c, base) {
    c.init = function (accoundData) {
        base.init("GlobalFindYourStrengths", accoundData);

        // Initialising all app controllers
        this.page1Controller = CS.Activities.GlobalFindYourStrengths.Controllers.Page1("activities/" + this.model.className, this);
        this.page2Controller = CS.Activities.GlobalFindYourStrengths.Controllers.Page2("activities/" + this.model.className + "/2", this);
        this.page3Controller = CS.Activities.GlobalFindYourStrengths.Controllers.Page3("activities/" + this.model.className + "/3", this);

        this.router.get(this.page1Controller.route, function (req) {
            this.renderController(this.page1Controller.route);
        }.bind(this));

        this.router.get(this.page2Controller.route, function (req) {
            this.renderController(this.page2Controller.route);
        }.bind(this));

        this.router.get(this.page3Controller.route, function (req) {
            this.renderController(this.page3Controller.route);
        }.bind(this));
    };
});

CS.Activities.GlobalFindYourStrengths.Controllers = {};
;CS.Activities.GlobalFindYourStrengths2 = P(CS.Activities.Base, function (c, base) {
    c.initActivity = function (activity) {
        base.initActivity(activity);

        // Initialising all app controllers
        this.controller = CS.Activities.GlobalFindYourStrengths2.Controllers.Page1("activities/" + this.model.className, this);

        this.router.get(this.controller.route, function (req) {
            this.renderController(this.controller.route);
        }.bind(this));
    };
});

CS.Activities.GlobalFindYourStrengths2.Controllers = {};
;CS.Activities.GlobalFindYourStrengths.Controllers.Page1 = P(CS.Activities.Controller, function (c, base) {
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
            this.model.accountData.strength1 = this.$strengthField.val();

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
            this.model.accountData.strength2 = this.$strengthField.val();

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

            this.model.accountData.strength3 = this.$strengthField.val();

            var type = "POST";
            var url = "/api/account-activity";

            $.ajax({
                url: url,
                type: type,
                contentType: "application/json",
                data: JSON.stringify(this.model),
                success: function (data, textStatus, jqXHR) {
                    location.href = "/#insights";
                }.bind(this),
                error: function (jqXHR, textStatus, errorThrown) {
                    this.$submitBtn.button('reset');
                    alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
                }.bind(this)
            });
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

        this.$strength4Field = $("#strength-4");
        this.$strength5Field = $("#strength-5");
        this.$strength6Field = $("#strength-6");

        this.$submitBtn = $("[type=submit]");
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

            this.activity.model.insightModule.data.strength4 = this.$strength4Field.val();
            this.activity.model.insightModule.data.strength5 = this.$strength5Field.val();
            this.activity.model.insightModule.data.strength6 = this.$strength6Field.val();

            this._updateInsightModuleData();
        }
    };

    c._updateInsightModuleData = function () {
        var type = "PUT";
        var url = "/api/insight-modules";

        $.ajax({
            url: url,
            type: type,
            contentType: "application/json",
            data: JSON.stringify(this.activity.model.insightModule),
            success: function (data, textStatus, jqXHR) {
                this._updateActivityState();
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                this.$submitBtn.button('reset');
                alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
            }.bind(this)
        });
    };

    c._updateActivityState = function () {
        this.activity.model.state = CS.Models.Activity.state.done;

        var type = "PUT";
        var url = "/api/activities/state";

        $.ajax({
            url: url,
            type: type,
            contentType: "application/json",
            data: JSON.stringify(this.activity.model),
            success: function (data, textStatus, jqXHR) {
                location.href = "/#insights";
            },
            error: function (jqXHR, textStatus, errorThrown) {
                this.$submitBtn.button('reset');
                alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
            }.bind(this)
        });
    };
});

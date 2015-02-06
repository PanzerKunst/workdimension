CS.Services.Validator = P(function (s) {
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
            if (!this._isEmail($field.val().trim())) {
                this.flagInvalid($field);
                this._slideDownErrorMessage(this._get$email($field));
                return false;
            }

            this._slideUpErrorMessage(this._get$email($field));
        }

        // Username?
        if (this._isToCheckIfUsername($field)) {
            if (!this._isUsername($field.val().trim())) {
                this.flagInvalid($field);
                this._slideDownErrorMessage(this._get$username($field));
                return false;
            }
            this._slideUpErrorMessage(this._get$username($field));
        }

        // In the future?
        if (this._isToCheckIfInFuture($field)) {
            if (!this._isInFuture($field.val().trim())) {
                this.flagInvalid($field);
                this._slideDownErrorMessage(this._get$inFuture($field));
                return false;
            }
            this._slideUpErrorMessage(this._get$inFuture($field));
        }

        // Min length?
        if (this._isToCheckIfMinLength($field)) {
            if (!this._isMinLength($field.val().trim(), $field.data("min-length"))) {
                this.flagInvalid($field);
                this._slideDownErrorMessage(this._get$minLength($field));
                return false;
            }
            this._slideUpErrorMessage(this._get$minLength($field));
        }

        // Max length?
        if (this._isToCheckIfMaxLength($field)) {
            if (!this._isMaxLength($field.val().trim(), $field.attr("maxlength"))) {
                this.flagInvalid($field);
                this._slideDownErrorMessage(this._get$maxLength($field));
                return false;
            }
            this._slideUpErrorMessage(this._get$maxLength($field));
        }

        // Integer number?
        if (this._isToCheckIfInteger($field)) {
            if (!this._isInteger($field.val().trim())) {
                this.flagInvalid($field);
                this._slideDownErrorMessage(this._get$integer($field));
                return false;
            }
            this._slideUpErrorMessage(this._get$integer($field));
        }

        // Decimal number?
        if (this._isToCheckIfDecimal($field)) {
            if (!this._isDecimal($field.val().trim())) {
                this.flagInvalid($field);
                this._slideDownErrorMessage(this._get$decimal($field));
                return false;
            }
            this._slideUpErrorMessage(this._get$decimal($field));
        }

        // URL?
        if (this._isToCheckIfUrl($field)) {
            if (!this._isUrl($field.val().trim())) {
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

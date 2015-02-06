CS.Controllers.CustomActivity = P(function (c) {
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
        this.$accountDataKeyField = this.$form.find("#account-data-key");

        this.$noAccountFoundForThisEmailError = this.$form.find("#no-account-found-for-this-email");

        this.$submitBtn = this.$form.find("[type=submit]");
    };

    c._initValidation = function () {
        this.validator = CS.Services.Validator([
            "email",
            "class-name",
            "title",
            "text",
            "account-data-key"
        ]);
    };

    c._initEvents = function () {
        this.$form.submit($.proxy(this._handleSubmit, this));
        this.$emailField.blur($.proxy(this._checkIfAccountExists, this));
    };

    c._handleSubmit = function (e) {
        e.preventDefault();

        this.$successAlert.hide();

        if (this.validator.isValid()) {
            this._checkIfAccountExists(null, function () {
                var data = {
                    accountEmailAddress: this.$emailField.val().trim(),
                    className: this.$classNameField.val().trim(),
                    title: this.$titleField.val().trim(),
                    mainText: this.$textField.val().trim(),
                    accountDataKey: this.$accountDataKeyField.val().trim()
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
                        this.$successAlert.show();
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
            this.$noAccountFoundForThisEmailError.hide();

            var type = "GET";
            var url = "/api/accounts";

            $.ajax({
                url: url + "?emailAddress=" + emailAddress,
                type: type,
                success: function (data, textStatus, jqXHR) {
                    if (jqXHR.status === CS.Controllers.httpStatusCode.noContent) {
                        this.$formGroupEmail.addClass("has-error");
                        this.$noAccountFoundForThisEmailError.show();
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

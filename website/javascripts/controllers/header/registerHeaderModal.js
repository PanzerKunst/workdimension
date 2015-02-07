CS.Controllers.HeaderModal.Register = P(CS.Controllers.HeaderModal, function (c, base) {
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
            this.$passwordsNotMatchingError.show();
        }

        return isValid;
    };
});

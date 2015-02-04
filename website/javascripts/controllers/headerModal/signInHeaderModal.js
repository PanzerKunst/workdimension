CS.Controllers.HeaderModal.SignIn = P(CS.Controllers.HeaderModal, function (c, base) {
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

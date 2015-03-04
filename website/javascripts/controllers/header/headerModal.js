CS.Controllers.HeaderModal = P(CS.Controllers.OnePageWebapp, function (c) {
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

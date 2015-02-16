CS.Controllers.RegisterReminder = P(function (c) {
    c.init = function () {
        this.initElements();
        this.initEvents();
    };

    c.initElements = function () {
        this.$mainRegisterLink = $("#register-link");

        this.$registerLink = $("#register-reminder-alert").find("a");
    };

    c.initEvents = function () {
        this.$registerLink.click($.proxy(this._clickOnMainLink, this));
    };

    c._clickOnMainLink = function (e) {
        this.$mainRegisterLink.click();
    };
});

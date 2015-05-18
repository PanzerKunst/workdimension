CS.Controllers.SignInModal = P(CS.Controllers.Base, function (c) {
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

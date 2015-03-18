CS.Controllers.Header = P(function (c) {
    c.init = function () {
        this._initElements();
        this._initEvents();
    };

    c._initElements = function () {
        this.$menuBtn = $("#menu-btn");
    };

    c._initEvents = function () {
        this.$menuBtn.click();
    };

    c._toggleMenu = function() {
        // TODO if (this.$menu)
    };
});

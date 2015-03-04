CS.Controllers.Header = P(CS.Controllers.Base, function (c) {
    c.init = function () {
        this._initElements();
        this.initHeaderLinks();
        this._initEvents();
    };

    c._initElements = function () {
        this.$navSection = $("nav");
        this.$headerLinks = this.$navSection.children("a");
        this.$signOutLink = this.$headerLinks.filter("#sign-out-link");
    };

    c._initEvents = function () {
        this.$signOutLink.click($.proxy(this._signOut, this));
    };

    c.initHeaderLinks = function () {
        if (this.isTemporaryAccount()) {
            this.$headerLinks.css("display", "inline-block");
            this.$signOutLink.hide();
        } else {
            this.$headerLinks.hide();
            this.$signOutLink.css("display", "inline-block");
        }
    };

    c._signOut = function () {
        var type = "DELETE";
        var url = "/api/auth";

        $.ajax({
            url: url,
            type: type,
            success: function () {
                location.href = "/";
            },
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    };
});

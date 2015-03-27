CS.Controllers.MainMenu = P(CS.Controllers.Base, function (c) {
    c.init = function () {
        this._initElements();
        this._initEvents();
    };

    c._initElements = function () {
        this.$menuBtn = $("#menu-btn");
        this.$menu = $("#main-menu");
        this.$contentOverlayWhenMenuOpen = $("#content-overlay-when-menu-open");
        this.$selectAreasModal = $("#select-areas-modal");

        this.$selectAreasLink = this.$menu.children("#select-areas");
        this.$signInWithLinkedInLink = $("#sign-in-with-linkedin");
        this.$signOutLink = this.$menu.children("#sign-out");
    };

    c._initEvents = function () {
        this.$menuBtn.click($.proxy(this.toggleMenu, this));
        this.$contentOverlayWhenMenuOpen.click($.proxy(this.toggleMenu, this));

        this.$selectAreasLink.click($.proxy(this._showModal, this));
        this.$signOutLink.click($.proxy(this._signOut, this));
    };

    c._initSignInLinks = function() {
        if (this.isTemporaryAccount()) {
            this.$signOutLink.hide();
            this.$signInWithLinkedInLink.show();
        } else {
            this.$signInWithLinkedInLink.hide();
            this.$signOutLink.show();
        }
    };

    c.toggleMenu = function () {
        this._initSignInLinks();

        var isToShowMenu = this.$menu.css("visibility") === "hidden";

        var contentOverlayZIndex = -1;
        var menuVisibility = "hidden";

        if (isToShowMenu) {
            contentOverlayZIndex = parseInt(this.$menu.css("z-index"), 10) - 1;
            menuVisibility = "visible";
        }

        this.$contentOverlayWhenMenuOpen.css("z-index", contentOverlayZIndex);
        this.$menu.css("visibility", menuVisibility);
    };

    c.hideModal = function() {
        this.$selectAreasModal.modal("hide");
    };

    c._showModal = function() {
        CS.blueprintAreasSelector.reRender();
        this.$selectAreasModal.modal();
        this.toggleMenu();
    };

    c._signOut = function() {
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

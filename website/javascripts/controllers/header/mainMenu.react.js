CS.Controllers.MainMenu = P(CS.Controllers.Base, function (c) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {
                activeWorkbookAreas: []
            };
        },

        render: function () {
            return (
                <ul className="styleless">
                    {this.state.activeWorkbookAreas.map(function (workbookArea) {
                        var id = workbookArea.className + "-workbook-area-menu-item";

                        var href = "/workbook-areas/" + workbookArea.className;

                        return (
                            <li key={id}>
                                <a href={href}>{workbookArea.title}</a>
                            </li>
                            );
                    })}
                </ul>
                );
        }
    });

    c.init = function (blueprintAreas) {
        CS.blueprintAreasModel = CS.Models.BlueprintAreas(blueprintAreas);
        CS.blueprintAreasModel.updateStatus();

        this._initElements();
        this._addLinksToActiveWorkbookAreas();
        this._initEvents();
    };

    c._initElements = function () {
        this.$mainContainer = $("#container");

        this.$menuBtn = $("#menu-btn");
        this.$menu = $("#main-menu");
        this.$contentOverlayWhenMenuOpen = $("#content-overlay-when-menu-open");
        this.$selectAreasModal = $("#select-areas-modal");

        this.$activeAreasSection = this.$menu.children("section");
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

    c._addLinksToActiveWorkbookAreas = function() {
        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$activeAreasSection[0]
        );

        this.reRender();
    };

    c.reRender = function() {
        this.reactInstance.replaceState({
            activeWorkbookAreas: _.sortByAll(CS.blueprintAreasModel.getActive(), "title")
        });
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

        this.$mainContainer.toggleClass("menu-open");
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

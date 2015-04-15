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
        this._render();
        this._initEvents();
    };

    c._initElements = function () {
        this.$mainContainer = $("#container");

        this.$menuBtn = this.$mainContainer.find("#menu-btn");
        this.$menu = this.$mainContainer.find("#main-menu");
        this.$contentOverlayWhenMenuOpen = this.$mainContainer.find("#content-overlay-when-menu-open");
        this.$selectAreasModal = this.$mainContainer.find("#select-areas-modal");

        this.$activeAreasSection = this.$menu.children("section");
        this.$selectAreasLink = this.$menu.children("#select-areas");
        this.$signInWithLinkedInLink = this.$mainContainer.find("#sign-in-with-linkedin");
        this.$signOutLink = this.$menu.children("#sign-out");
    };

    c._initEvents = function () {
        this.$menuBtn.click($.proxy(this._toggleMenu, this));
        this.$contentOverlayWhenMenuOpen.click($.proxy(this.hideMenu, this));

        this.$selectAreasLink.click($.proxy(this._showModal, this));
    };

    c.reRender = function() {
        this.reactInstance.replaceState({
            activeWorkbookAreas: _.sortByAll(CS.blueprintAreasModel.getActive(), "title")
        });
    };

    c.hideMenu = function () {
        this.$mainContainer.removeClass("menu-open");
    };

    c.hideModal = function() {
        this.$selectAreasModal.modal("hide");
    };

    c.signOut = function() {
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

    c._render = function() {
        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$activeAreasSection[0]
        );

        this.reRender();
    };

    c._toggleMenu = function () {
        this._initSignInLinks();

        CS.taskNotificationsController.hide();
        this.$mainContainer.toggleClass("menu-open");
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

    c._showModal = function() {
        CS.blueprintAreasSelector.reRender();
        this.$selectAreasModal.modal();
        this.hideMenu();
    };
});

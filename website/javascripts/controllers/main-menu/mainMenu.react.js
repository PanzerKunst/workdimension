CS.Controllers.MainMenu = P(CS.Controllers.Base, function (c) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {
                activeBlueprintAreas: [],
                inactiveBlueprintAreas: [],
                isSignedIn: false
            };
        },

        render: function () {
            var wrapperClasses = classNames({"signed-in": this.state.isSignedIn});

            return (
                <div className={wrapperClasses}>
                    {/* TODO <div id="header-placeholder">
                        <button className="styleless fa fa-times"></button>
                    </div>*/}

                    <ul className="styleless">
                        {this.state.activeBlueprintAreas.map(function (blueprintArea) {
                            var id = "main-menu-" + blueprintArea.getClassName() + "-blueprint-area-item";

                            return <li id={id} key={id}>{blueprintArea.getTitle()}</li>;
                        })}
                    </ul>
                    <ul className="styleless">
                        {this.state.inactiveBlueprintAreas.map(function (blueprintArea) {
                            var id = "main-menu-" + blueprintArea.getClassName() + "-blueprint-area-item";

                            return <CS.Controllers.MainMenuInactiveItem key={id} blueprintArea={blueprintArea} />;
                        })}
                    </ul>

                    <a id="sign-in-with-linked-in">Sign in with LinkedIn</a>
                    <a id="sign-out">Sign out</a>
                </div>
                );
        }
    });

    c.init = function () {
        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            document.getElementById("main-menu")
        );

        this._initElements();
        this._initEvents();
    };

    c._initElements = function () {
        this.$menuBtn = $("#menu-btn");
        this.$menu = $("#main-menu");
        this.$contentOverlayWhenMenuOpen = $("#content-overlay-when-menu-open");
    };

    c._initEvents = function () {
        this.$menuBtn.click($.proxy(this.toggleMenu, this));
        this.$contentOverlayWhenMenuOpen.click($.proxy(this.toggleMenu, this));
    };

    c.reRender = function () {
        var shownInactiveBlueprintAreas = _.take(CS.blueprintAreasModel.getInactive(), 3);

        this.reactInstance.replaceState({
            activeBlueprintAreas: _.sortByAll(CS.blueprintAreasModel.getActive(), "title"),
            inactiveBlueprintAreas: _.sortByAll(shownInactiveBlueprintAreas, "title"),
            isSignedIn: !this.isTemporaryAccount()
        });
    };

    c.toggleMenu = function () {
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
});

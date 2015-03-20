CS.Controllers.MainMenu = P(function (c) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {
                activeBlueprintAreas: [],
                inactiveBlueprintAreas: []
            };
        },

        render: function () {
            return (
                <div>
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
                    <a>More</a>
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
        this.$menuBtn.click($.proxy(this._toggleMenu, this));
        this.$contentOverlayWhenMenuOpen.click($.proxy(this._toggleMenu, this));
    };

    c.reRender = function () {
        var shownInactiveBlueprintAreas = _.take(CS.blueprintAreasModel.getInactive(), 3);

        this.reactInstance.replaceState({
            activeBlueprintAreas: _.sortByAll(CS.blueprintAreasModel.getActive(), "title"),
            inactiveBlueprintAreas: _.sortByAll(shownInactiveBlueprintAreas, "title")
        });
    };

    c._toggleMenu = function () {
        var isToShowMenu = this.$menu.css("visibility") === "hidden";

        var contentOverlayZIndex = -1;
        var futureVisibility = "hidden";

        if (isToShowMenu) {
            contentOverlayZIndex = parseInt(this.$menu.css("z-index"), 10) - 1;
            futureVisibility = "visible";
        }

        this.$contentOverlayWhenMenuOpen.css("z-index", contentOverlayZIndex);
        this.$menu.css("visibility", futureVisibility);
    };
});

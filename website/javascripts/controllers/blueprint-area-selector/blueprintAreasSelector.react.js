CS.Controllers.BlueprintAreasSelector = P(function (c) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {
                inactiveBlueprintAreas: []
            };
        },

        render: function () {
            return (
                <div ref="wrapper">
                    <ul className="styleless">
                        {this.state.inactiveBlueprintAreas.map(function (blueprintArea) {
                            var id = blueprintArea.className + "-blueprint-area-selector-item";

                            return <CS.Controllers.BlueprintAreaSelectorItem key={id} blueprintArea={blueprintArea} />;
                        })}
                    </ul>
                </div>
                );
        },

        componentDidMount: function() {
            this._initElements();
        },

        _initElements: function() {
            this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
        }
    });

    c.init = function (blueprintAreas) {
        this._initElements();
        this._initEvents();

        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$modal.find(".modal-body")[0]
        );

        CS.blueprintAreasModel = CS.Models.BlueprintAreas(blueprintAreas);
        CS.blueprintAreasModel.updateStatus();

        this.reRender();
        this._initModalWidth();
    };

    c._initElements = function() {
        this.$window = $(window);
        this.$modal = $("#select-areas-modal");
        this.$modalDialog = this.$modal.children(".modal-dialog");
    };

    c._initEvents = function() {
        this.$window.resize(_.debounce(function () {
            this._initModalWidth();
        }.bind(this), 15));
    };

    c.reRender = function() {
        this.reactInstance.replaceState({
            inactiveBlueprintAreas: _.sortByAll(CS.blueprintAreasModel.getInactive(), "title")
        });
    };

    c._initModalWidth = function() {
        this.$modalDialog.toggleClass("modal-lg", CS.Services.Browser.isLargeScreen());
    };
});

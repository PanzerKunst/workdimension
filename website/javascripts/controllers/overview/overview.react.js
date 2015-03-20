CS.Controllers.Overview = P(function (c) {
    c.$el = $(document.getElementById("overview"));

    c.reactClass = React.createClass({
        getInitialState: function () {
            return {
                controller: null,
                blueprintAreasWithData: []
            };
        },

        render: function () {
            return (
                <ul className="styleless">
                    {this.state.blueprintAreasWithData.map(function (blueprintAreaWithData) {
                        var id = blueprintAreaWithData.className + "-blueprint-area-panel";

                        return (
                            <li id={id} key={id}>
                                <div className="well">
                                    <h2>{blueprintAreaWithData.title}</h2>

                                    <ul className="styleless">
                                        {blueprintAreaWithData.items.map(function (item, index) {
                                            var reactItemId = blueprintAreaWithData.className + "-blueprint-item-" + item.name;

                                            return <CS.Controllers.OverviewBlueprintItem key={reactItemId} controller={this.state.controller} blueprintAreaWithData={blueprintAreaWithData} blueprintItemIndex={index} />;
                                        }.bind(this))}
                                    </ul>

                                    <CS.Controllers.OverviewBlueprintAreaComposer controller={this.state.controller} blueprintArea={blueprintAreaWithData} />
                                </div>
                            </li>
                            );
                    }.bind(this))}
                </ul>
                );
        }
    });

    c.init = function () {
        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$el[0]
        );
    };

    c.reRender = function () {
        var blueprintAreasWithData = CS.blueprintAreasModel.getActive().map(function (blueprintArea) {
            return {
                className: blueprintArea.getClassName(),
                title: blueprintArea.getTitle(),
                items: CS.account.data[blueprintArea.getClassName()] || []
            };
        });

        this.reactInstance.replaceState({
            controller: this,
            blueprintAreasWithData: _.sortByAll(blueprintAreasWithData, "title")
        });
    };
});

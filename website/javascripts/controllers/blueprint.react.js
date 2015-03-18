CS.Controllers.Blueprint = P(function (c) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {
                blueprintAreas: []
            };
        },

        render: function () {
            return (
                <ul className="styleless">
                    {this.state.blueprintAreas.map(function (blueprintArea) {
                        var id = blueprintArea.getClassName() + "-blueprint-area-wrapper";

                        return <li id={id} key={id}></li>;
                    })}
                </ul>
                );
        },

        componentDidUpdate: function() {
            var blueprintAreasToRerender = _.union(CS.blueprintAreasModel.getActive());

            blueprintAreasToRerender.forEach(function(blueprintArea) {
                blueprintArea.reRender();
            });
        }
    });

    c.init = function () {
        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            document.getElementById("blueprint")
        );

        CS.blueprintAreasModel = CS.Models.BlueprintAreas();
        CS.blueprintAreasModel.updateStatus();

        this.reRender();
    };

    c.reRender = function () {
        this.reactInstance.replaceState({
            blueprintAreas: CS.blueprintAreasModel.getActive()
        });
    };
});

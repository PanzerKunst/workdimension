CS.Controllers.Standouts = P(function (c) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {
                employer: null,
                position: null,
                standoutInstances: []
            };
        },

        render: function () {
            var employerAndPosition;
            if (this.state.employer && this.state.position) {
                employerAndPosition = (
                    <h1>{this.state.position} på {this.state.employer}</h1>
                    );
            }

            return (
                <div>
                    {employerAndPosition}

                    <ul className="styleless">
                        {this.state.standoutInstances.map(function (standout) {
                            return <li id={standout.className}></li>;
                        })}
                    </ul>
                </div>
                );
        }
    });

    c.init = function () {
        this.itemClassNames = ["Strengths"];

        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            document.getElementById("standout-list")
        );
    };

    c.refreshData = function () {
        this._fetchCustomActivities();
    };

    c._fetchCustomActivities = function () {
        var type = "GET";
        var url = "/api/custom-activities";

        $.ajax({
            url: url,
            type: type,
            dataType: "json",
            success: function (data) {
                var itemInstancesCustomStandouts = data.map(function (customActivity) {
                    return CS.Standouts.Custom(customActivity.className, customActivity.title);
                });

                var itemInstancesClassicStandouts = this.itemClassNames.map(function (className) {
                    return CS.Standouts[className](className);
                });

                var allItemInstances = _.union(itemInstancesCustomStandouts, itemInstancesClassicStandouts);

                this.reactInstance.replaceState({
                    employer: CS.account.data ? CS.account.data.Employer : null,
                    position: CS.account.data ? CS.account.data.Position : null,
                    standoutInstances: allItemInstances
                });

                allItemInstances.forEach(function(instance) {
                    instance.run();
                });
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    };
});

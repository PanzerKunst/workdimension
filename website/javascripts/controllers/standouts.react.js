CS.Controllers.Standouts = P(function (c) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {data: []};
        },

        render: function () {
            var listItems = this.state.data.map(function (standout) {
                return (
                    <li id={standout.className} className="well"></li>
                    );
            }.bind(this));

            return (
                <ul className="styleless">
                    {listItems}
                </ul>
                );
        }
    });

    c.init = function () {
        this.itemClassNames = ["Strengths"];

        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            document.getElementById("standouts")
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
            success: function (data, textStatus, jqXHR) {
                var itemInstancesCustomStandouts = data.map(function (customActivity, index) {
                    return CS.Standouts.Custom(customActivity.className, customActivity.title, customActivity.accountDataKey);
                }, this);

                var itemInstancesClassicStandouts = this.itemClassNames.map(function (className, index) {
                    return CS.Standouts[className](className);
                }, this);

                var allItemInstances = _.union(itemInstancesCustomStandouts, itemInstancesClassicStandouts);

                this.reactInstance.replaceState({ data: allItemInstances });

                allItemInstances.forEach(function(instance, index) {
                    instance.render();
                }, this);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
            }.bind(this)
        });
    };
});

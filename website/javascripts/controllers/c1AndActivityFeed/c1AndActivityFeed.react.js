CS.Controllers.C1AndActivityFeed = P(function (c) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {data: []};
        },
        
        render: function () {
            var listItems = this.state.data.map(function (c1OrActivity) {
                return (
                    <CS.Controllers.C1OrActivityFeedItem c1OrActivity={c1OrActivity}/>
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
        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            document.getElementById("c1-and-activity-feed")
        );
    };

    c.refreshData = function () {
        this._fetchActivities();
    };

    c._fetchActivities = function () {
        var type = "GET";
        var url = "/api/activities";

        $.ajax({
            url: url,
            type: type,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                this._replaceReactState(data);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
            }
        });
    };

    c._replaceReactState = function(activityData) {
        var undoneActivities = [];
        var doneActivities = [];

        activityData.forEach(function (activity) {
            var itemData = {
                isDone: activity.state === CS.Models.Activity.state.done,
                name: activity.name,
                model: activity
            };

            if (itemData.isDone) {
                doneActivities.push(itemData);
            } else {
                undoneActivities.push(itemData);
            }
        }, this);

        this.reactInstance.replaceState({ data: _.union(undoneActivities, doneActivities) });
    };
});

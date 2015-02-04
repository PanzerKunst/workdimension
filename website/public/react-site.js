CS.Controllers.C1AndActivityFeed = P(function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {data: []};
        },
        
        render: function () {
            var listItems = this.state.data.map(function (c1OrActivity) {
                return (
                    React.createElement(CS.Controllers.C1OrActivityFeedItem, {c1OrActivity: c1OrActivity})
                    );
            }.bind(this));

            return (
                React.createElement("ul", {className: "styleless"}, 
                    listItems
                )
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

CS.Controllers.C1OrActivityFeedItem = React.createClass({displayName: "C1OrActivityFeedItem",
    render: function () {
        var liClasses = React.addons.classSet({
            "well": true,
            "done": this.props.c1OrActivity.isDone
        });

        var buttonText = this.props.c1OrActivity.isDone ? "Restart" : "Start";

        return (
            React.createElement("li", {className: liClasses}, 
                React.createElement("h2", null, this.props.c1OrActivity.name), 
                React.createElement("button", {onClick: this._handleClick}, buttonText)
            )
            );
    },
    
    _handleClick: function (e) {
        if (this._isC1(this.props.c1OrActivity)) {
            var c1 = this.props.c1OrActivity.model;
            var c1ClassName = c1.c1.className;

            if (_.isFunction(CS.C1s[c1ClassName])) {
                CS.C1s[c1ClassName]().initC1(c1);
            } else {
                CS.C1s[c1ClassName].initC1(c1);
            }

            location.hash = "c1s/" + c1ClassName;
        } else {
            var activity = this.props.c1OrActivity.model;

            if (_.isFunction(CS.Activities[activity.className])) {
                CS.Activities[activity.className]().initActivity(activity);
            } else {
                CS.Activities[activity.className].initActivity(activity);
            }

            location.hash = "activities/" + activity.className;
        }
        $("#c1-and-activity-feed").hide();
        $("#current-c1-or-activity").show();

        CS.Controllers.Index.isUnsavedProgress = true;
    },
    
    _isC1: function (c1OrActivity) {
        return c1OrActivity.model.c1 !== undefined;
    }
});

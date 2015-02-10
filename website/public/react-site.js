CS.Controllers.ActivityFeed = P(function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {data: []};
        },

        render: function () {
            var listItems = this.state.data.map(function (c1OrActivity) {
                return (
                    React.createElement(CS.Controllers.ActivityFeedItem, {c1OrActivity: c1OrActivity})
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
        this.feedItems = [
            /* TODO {
             packageName: CS.Controllers.ActivityFeed.packageName.c1,
             className: "JobApplicationEmployer"
             },{
             packageName: CS.Controllers.ActivityFeed.packageName.c1,
             className: "JobApplicationPosition"
             },*/{
                packageName: CS.Controllers.ActivityFeed.packageName.activity,
                className: "IdentifyStrengths",
                title: "Identifiera mina egenskaper"
            }
        ];

        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            document.getElementById("c1-and-activity-feed")
        );

        this._initElements();
    };

    c._initElements = function () {
        this.$registerReminderAlert = $("#register-reminder").children();
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
                var feedItemInstancesCustomActivities = data.map(function (customActivity, index) {
                    return CS.Activities.Custom(customActivity.className, customActivity.title, customActivity.mainText);
                }, this);

                var feedItemInstancesClassicActivities = this.feedItems.map(function (item, index) {
                    return CS[item.packageName][item.className](item.className, item.title);
                }, this);

                this.feedItemInstances = _.union(feedItemInstancesCustomActivities, feedItemInstancesClassicActivities);

                this._fetchActivities();
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
            }.bind(this)
        });
    };

    c._fetchActivities = function () {
        var type = "GET";
        var url = "/api/activities";

        $.ajax({
            url: url,
            type: type,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                this._orderFeedItems(data);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
            }.bind(this)
        });
    };

    c._orderFeedItems = function (activityData) {
        var undoneActivities = [];
        var doneActivities = [];

        activityData.forEach(function (activity) {
            var instance = _.find(this.feedItemInstances, function (instans) {
                return instans.getClassName() === activity.className;
            });

            if (activity.state === CS.Models.Activity.state.done) {
                doneActivities.push({
                    title: instance.getTitle(),
                    isDone: true,
                    instance: instance
                });
            } else if (instance.isDoable()) {
                undoneActivities.push({
                    title: instance.getTitle(),
                    isDone: false,
                    instance: instance
                });
            }
        }, this);

        // We handle instances which didn't have any activity data
        this.feedItemInstances.forEach(function (instance, index) {
            var isTodo = _.isEmpty(_.find(doneActivities, function (activity) {
                return activity.instance.getClassName() === instance.getClassName();
            }));

            if (isTodo && instance.isDoable()) {
                // Is it already is among the undoneActivities?
                var isAlreadyInTheList = _.find(undoneActivities, function (activity) {
                    return activity.instance.getClassName() === instance.getClassName();
                });

                if (!isAlreadyInTheList) {
                    undoneActivities.push({
                        title: instance.getTitle(),
                        isDone: false,
                        instance: instance
                    });
                }
            }
        }, this);

        this._showOrHideRegisterReminder(doneActivities.length);

        this.reactInstance.replaceState({ data: _.union(undoneActivities, doneActivities) });
    };

    c._showOrHideRegisterReminder = function (doneActivitiesCount) {
        if (CS.Controllers.isTemporaryAccount() && doneActivitiesCount > 0) {
            CS.Services.Animator.fadeIn(this.$registerReminderAlert);
        } else {
            CS.Services.Animator.fadeOut(this.$registerReminderAlert);
        }
    };
});

CS.Controllers.ActivityFeed.packageName = {
    c1: "C1s",
    activity: "Activities"
};

CS.Controllers.ActivityFeedItem = React.createClass({displayName: "ActivityFeedItem",
    render: function () {
        var liClasses = React.addons.classSet({
            "well": true,
            "done": this.props.c1OrActivity.isDone
        });

        var buttonText = this.props.c1OrActivity.isDone ? "Restart" : "Start";

        return (
            React.createElement("li", {className: liClasses}, 
                React.createElement("h2", null, this.props.c1OrActivity.title), 
                React.createElement("button", {className: "btn btn-default", onClick: this._handleClick}, buttonText)
            )
            );
    },
    
    _handleClick: function (e) {
        var instance = this.props.c1OrActivity.instance;

        instance.preLaunch();

        location.hash = "activities/" + instance.getClassName();

        $("#c1-and-activity-feed").hide();
        $("#current-c1-or-activity").show();
    }
});

CS.Controllers.Standouts = P(function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {data: []};
        },

        render: function () {
            var listItems = this.state.data.map(function (standout) {
                return (
                    React.createElement("li", {id: standout.className, className: "well"})
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
                    return CS.Standouts.Custom(customActivity.className, customActivity.title);
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

CS.Controllers.ActivityFeed = P(function (c) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {data: []};
        },

        render: function () {
            var listItems = this.state.data.map(function (c1OrActivity) {
                return (
                    <CS.Controllers.ActivityFeedItem c1OrActivity={c1OrActivity}/>
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
        this.feedItems = [
            /* TODO {
             packageName: CS.Controllers.ActivityFeed.packageName.c1,
             className: "JobApplicationEmployer"
             },{
             packageName: CS.Controllers.ActivityFeed.packageName.c1,
             className: "JobApplicationPosition"
             },*/{
                packageName: CS.Controllers.ActivityFeed.packageName.activity,
                className: "GlobalFindYourStrengths2",
                title: "Find my über strengths"
            },
            {
                packageName: CS.Controllers.ActivityFeed.packageName.activity,
                className: "GlobalFindYourStrengths",
                title: "Find my strengths"
            }
        ];

        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            document.getElementById("c1-and-activity-feed")
        );

        this._initElements();
    };

    c._initElements = function() {
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
            var instance = _.find(this.feedItemInstances, function(instans) {
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
        this.feedItemInstances.forEach(function(instance, index) {
            var isTodo = _.isEmpty(_.find(doneActivities, function(activity) {
                return activity.instance.getClassName() === instance.getClassName();
            }));

            if (isTodo && instance.isDoable()) {
                // Is it already is among the undoneActivities?
                var isAlreadyInTheList = _.find(undoneActivities, function(activity) {
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

    c._showOrHideRegisterReminder = function(doneActivitiesCount) {
        if (CS.Controllers.isTemporaryAccount() && doneActivitiesCount > 0) {
            this.$registerReminderAlert.show();
        } else {
            this.$registerReminderAlert.hide();
        }
    };
});

CS.Controllers.ActivityFeed.packageName = {
    c1: "C1s",
    activity: "Activities"
};

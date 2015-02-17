CS.Controllers.ActivityFeed = P(CS.Controllers.Base, function (c, base) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {
                undoneC1sAndActivities: [],
                doneC1sAndActivities: []
            };
        },

        render: function () {
            var finishedActivitiesTitle;
            if (!_.isEmpty(this.state.doneC1sAndActivities)) {
                finishedActivitiesTitle = (
                    <h3>Utförda&nbsp;&nbsp;&nbsp;aktiviteter</h3>
                    );
            }

            return (
                <div>
                    <ul className="styleless">
                    {this.state.undoneC1sAndActivities.map(function (c1OrActivity) {
                        if (c1OrActivity.type === CS.Controllers.ActivityFeed.itemType.c1) {
                            return <CS.Controllers.C1FeedItem key={c1OrActivity.instance.className} c1={c1OrActivity}/>;
                        }
                        return <CS.Controllers.ActivityFeedItem key={c1OrActivity.instance.className} activity={c1OrActivity}/>;
                    })}
                    </ul>

                    {finishedActivitiesTitle}

                    <ul className="styleless">
                    {this.state.doneC1sAndActivities.map(function (c1OrActivity) {
                        if (c1OrActivity.type === CS.Controllers.ActivityFeed.itemType.c1) {
                            return <CS.Controllers.C1FeedItem key={c1OrActivity.instance.className} c1={c1OrActivity}/>;
                        }
                        return <CS.Controllers.ActivityFeedItem key={c1OrActivity.instance.className} activity={c1OrActivity}/>;
                    })}
                    </ul>
                </div>
                );
        }
    });

    c.init = function () {
        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            document.getElementById("c1-and-activity-feed")
        );

        this._initElements();

        this.c1FeedItems = [
            {
                className: "Employer",
                title: "Arbetsgivare"
            },
            {
                className: "Position",
                title: "Tjänst"
            }
        ];

        this.activityFeedItems = [
            {
                className: "IdentifyStrengths",
                title: "Analysera jobbannonsen",
                description: "Här får du hjälp att ta fram de viktigaste egenskaperna som efterfrågas och matcha kraven med dina styrkor.",
                buttonText: "Kom igång"
            },
            {
                className: "SpecifyTop1Strength",
                title: "Styrkans innebörd"
            },
            {
                className: "SpecifyTop2Strength",
                title: "Styrkans innebörd"
            },
            {
                className: "SpecifyTop3Strength",
                title: "Styrkans innebörd"
            }
        ];

        this.c1Instances = this.c1FeedItems.map(function (item, index) {
            return CS.C1s[item.className](item.className, item.title);
        }.bind(this));
    };

    c._initElements = function () {
        this.$registerReminderAlert = $("#register-reminder-alert");
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
                var customActivityInstances = data.map(function (customActivity, index) {
                    return CS.Activities.Custom(customActivity.className, customActivity.title, customActivity.mainText);
                }.bind(this));

                var classicActivityInstances = this.activityFeedItems.map(function (item, index) {
                    var title = item.title;
                    if (item.className === "SpecifyTop1Strength" &&
                        CS.account.data && !_.isEmpty(CS.account.data.strengths)) {
                        title += ": " + CS.account.data.strengths[0].name;
                    } else if (item.className === "SpecifyTop2Strength" &&
                        CS.account.data &&
                        CS.account.data.strengths &&
                        CS.account.data.strengths.length > 1) {
                        title += ": " + CS.account.data.strengths[1].name;
                    } else if (item.className === "SpecifyTop3Strength" &&
                        CS.account.data &&
                        CS.account.data.strengths &&
                        CS.account.data.strengths.length > 2) {
                        title += ": " + CS.account.data.strengths[2].name;
                    }

                    return CS.Activities[item.className](item.className, title);
                }.bind(this));

                this.activityInstances = _.union(customActivityInstances, classicActivityInstances);

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
        var undoneC1sAndActivities = [];
        var doneC1sAndActivities = [];

        activityData.forEach(function (activity) {
            var instance = _.find(this.activityInstances, function (instans) {
                return instans.getClassName() === activity.className;
            });

            if (activity.state === CS.Models.Activity.state.done) {
                doneC1sAndActivities.push({
                    type: CS.Controllers.ActivityFeed.itemType.activity,
                    instance: instance,
                    isDone: true
                });
            } else if (instance.isDoable()) {
                undoneC1sAndActivities.push({
                    type: CS.Controllers.ActivityFeed.itemType.activity,
                    title: instance.getTitle(),
                    instance: instance,
                    isDone: false
                });
            }
        }.bind(this));

        this.c1Instances.forEach(function (c1Instance, index) {
            var isDone = CS.account.data && CS.account.data[c1Instance.getClassName()];

            if (isDone) {
                doneC1sAndActivities.push({
                    type: CS.Controllers.ActivityFeed.itemType.c1,
                    instance: c1Instance
                });
            } else {
                undoneC1sAndActivities.push({
                    type: CS.Controllers.ActivityFeed.itemType.c1,
                    instance: c1Instance
                });
            }
        }.bind(this));

        // We handle instances which didn't have any activity data
        this.activityInstances.forEach(function (instance, index) {
            var isTodo = _.isEmpty(_.find(doneC1sAndActivities, function (activity) {
                return activity.instance.getClassName() === instance.getClassName();
            }));

            if (isTodo && instance.isDoable()) {
                // Is it already is among the undoneActivities?
                var isAlreadyInTheList = _.find(undoneC1sAndActivities, function (activity) {
                    return activity.instance.getClassName() === instance.getClassName();
                });

                if (!isAlreadyInTheList) {
                    undoneC1sAndActivities.push({
                        type: CS.Controllers.ActivityFeed.itemType.activity,
                        instance: instance,
                        isDone: false
                    });
                }
            }
        }.bind(this));

        this._showOrHideRegisterReminder(doneC1sAndActivities.length);

        this.reactInstance.replaceState({
            undoneC1sAndActivities: undoneC1sAndActivities,
            doneC1sAndActivities: doneC1sAndActivities
        });
    };

    c._showOrHideRegisterReminder = function (doneActivitiesCount) {
        if (this.isTemporaryAccount() && doneActivitiesCount > 0) {
            CS.Services.Animator.fadeIn(this.$registerReminderAlert);
        } else {
            CS.Services.Animator.fadeOut(this.$registerReminderAlert);
        }
    };
});

CS.Controllers.ActivityFeed.itemType = {
    c1: "c1",
    activity: "activity"
};

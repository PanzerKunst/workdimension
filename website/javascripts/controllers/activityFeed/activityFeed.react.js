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
                    <div className="alert alert-info" id="intro-to-activities">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>

                        <h2>Aktiviteter att göra</h2>

                        <p>Det dyker upp ett kort i flödet så fort det finns något nytt att göra.</p>

                        <p>Den första aktiviteten är att hitta vilka styrkor som efterfrågas i annonsen till jobbet du söker.</p>

                        <p>När du hittat några styrkor kommer det nya övningar som handlar om att beskriva styrkorna du just har hittat.</p>

                        <p>Det är bara att sätta igång!</p>
                    </div>

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

    c.defaultActivityButtonText = "Gör detta";

    c.init = function () {
        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            document.getElementById("c1-and-activity-feed")
        );

        this._initElements();
        this._initEvents();

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
                title: "Styrkans innebörd{colonAndStrengthName}",
                description: "Vad innebär <strong>{strengthName}</strong> för dig och vilken nytta skapas för företaget? Vi hjälper dig att ta reda på det!",
                buttonText: "Definiera och värdera"
            },
            {
                className: "SpecifyTop2Strength",
                title: "Styrkans innebörd{colonAndStrengthName}",
                description: "Vad innebär <strong>{strengthName}</strong> för dig och vilken nytta skapas för företaget? Vi hjälper dig att ta reda på det!",
                buttonText: "Definiera och värdera"
            },
            {
                className: "SpecifyTop3Strength",
                title: "Styrkans innebörd{colonAndStrengthName}",
                description: "Vad innebär <strong>{strengthName}</strong> för dig och vilken nytta skapas för företaget? Vi hjälper dig att ta reda på det!",
                buttonText: "Definiera och värdera"
            }
        ];

        this.c1Instances = this.c1FeedItems.map(function (item, index) {
            return CS.C1s[item.className](item.className, item.title);
        }.bind(this));
    };

    c._initElements = function () {
        this.$registerReminderAlert = $("#register-reminder");
        this.$introToActivitiesAlert = $("#intro-to-activities");

        this.initIntroToActivitiesAlert();
    };

    c._initEvents = function() {
        this.$introToActivitiesAlert.on('close.bs.alert', $.proxy(this._onIntroToActivitiesAlertClose, this));
    };

    c.refreshData = function () {
        this._fetchCustomActivities();
    };

    c.initIntroToActivitiesAlert = function () {
        if (CS.account.data && CS.account.data.Employer && CS.account.data.Position && !this.getFromLocalStorage("is-intro-to-activities-alert-closed")) {
            CS.Services.Animator.fadeIn(this.$introToActivitiesAlert);
        } else {
            CS.Services.Animator.fadeOut(this.$introToActivitiesAlert);
        }
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
                    return CS.Activities[item.className](item.className, item.title, item.description);
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
        CS.undoneC1sAndActivities = [];
        var doneC1sAndActivities = [];

        activityData.forEach(function (activity) {
            var instance = _.find(this.activityInstances, function (instans) {
                return instans.getClassName() === activity.className;
            });

            // Custom activities are not defined in this.activityFeedItems, in which case "feedItem" is null
            var feedItem = _.find(this.activityFeedItems, function (item) {
                return item.className === activity.className;
            });

            if (activity.state === CS.Models.Activity.state.done) {
                doneC1sAndActivities.push({
                    type: CS.Controllers.ActivityFeed.itemType.activity,
                    instance: instance,
                    buttonText: feedItem ? feedItem.buttonText : this.defaultActivityButtonText,
                    isDone: true
                });
            } else if (instance.isDoable()) {
                CS.undoneC1sAndActivities.push({
                    type: CS.Controllers.ActivityFeed.itemType.activity,
                    instance: instance,
                    buttonText: feedItem ? feedItem.buttonText : this.defaultActivityButtonText,
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
                CS.undoneC1sAndActivities.push({
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
                var isAlreadyInTheList = _.find(CS.undoneC1sAndActivities, function (activity) {
                    return activity.instance.getClassName() === instance.getClassName();
                });

                if (!isAlreadyInTheList) {
                    // Custom activities are not defined in this.activityFeedItems, in which case "feedItem" is null
                    var feedItem = _.find(this.activityFeedItems, function (item) {
                        return item.className === instance.getClassName();
                    });

                    CS.undoneC1sAndActivities.push({
                        type: CS.Controllers.ActivityFeed.itemType.activity,
                        instance: instance,
                        buttonText: feedItem ? feedItem.buttonText : this.defaultActivityButtonText,
                        isDone: false
                    });
                }
            }
        }.bind(this));

        this._showOrHideRegisterReminder(doneC1sAndActivities.length);

        this.reactInstance.replaceState({
            undoneC1sAndActivities: CS.undoneC1sAndActivities,
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

    c._onIntroToActivitiesAlertClose = function(e) {
        e.preventDefault();

        CS.Services.Animator.fadeOut(this.$introToActivitiesAlert);
        this.saveInLocalStorage("is-intro-to-activities-alert-closed", true);
    };
});

CS.Controllers.ActivityFeed.itemType = {
    c1: "c1",
    activity: "activity"
};

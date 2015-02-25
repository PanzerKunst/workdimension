CS.Controllers.ActivityFeed = P(CS.Controllers.Base, function (c, base) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {
                doableC1sAndActivities: [],
                doneC1sAndActivities: [],
                accountData: null
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
                    {this.state.doableC1sAndActivities.map(function (c1OrActivity) {
                        var key = c1OrActivity.instance.getClassName();

                        if (c1OrActivity.type === CS.Controllers.ActivityFeed.itemType.c1) {
                            return <CS.Controllers.C1FeedItem key={key} c1={c1OrActivity}/>;
                        }

                        if (this.state.accountData) {
                            key += JSON.stringify(this.state.accountData);
                        }

                        return <CS.Controllers.ActivityFeedItem key={key} activity={c1OrActivity}/>;
                    }.bind(this))}
                    </ul>

                    {finishedActivitiesTitle}

                    <ul className="styleless">
                    {this.state.doneC1sAndActivities.map(function (c1OrActivity) {
                        var className = c1OrActivity.instance.getClassName();
                        var key = className;

                        if (c1OrActivity.type === CS.Controllers.ActivityFeed.itemType.c1) {
                            if (this.state.accountData) {
                                key += this.state.accountData[className];
                            }

                            return <CS.Controllers.C1FeedItem key={key} c1={c1OrActivity}/>;
                        }

                        if (this.state.accountData) {
                            key += JSON.stringify(this.state.accountData);
                        }

                        return <CS.Controllers.ActivityFeedItem key={key} activity={c1OrActivity}/>;
                    }.bind(this))}
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

        CS.activitiesModel = CS.Models.Activities(this.activityFeedItems);

        CS.activitiesModel.updateActivityStatus($.proxy(this.reRender, this));
    };

    c._initElements = function () {
        this.$registerReminderAlert = $("#register-reminder");
        this.$introToActivitiesAlert = $("#intro-to-activities");

        this.initIntroToActivitiesAlert();
    };

    c._initEvents = function() {
        this.$introToActivitiesAlert.on('close.bs.alert', $.proxy(this._onIntroToActivitiesAlertClose, this));
    };

    c.initIntroToActivitiesAlert = function () {
        if (CS.account.data && CS.account.data.Employer && CS.account.data.Position && !this.getFromLocalStorage("is-intro-to-activities-alert-closed")) {
            CS.Services.Animator.fadeIn(this.$introToActivitiesAlert);
        } else {
            CS.Services.Animator.fadeOut(this.$introToActivitiesAlert);
        }
    };

    c.reRender = function() {
        var doableC1sAndActivities = [];
        var doneC1sAndActivities = [];

        this.c1Instances.forEach(function (c1Instance, index) {
            var isDone = CS.account.data && CS.account.data[c1Instance.getClassName()];

            if (isDone) {
                doneC1sAndActivities.unshift({
                    type: CS.Controllers.ActivityFeed.itemType.c1,
                    instance: c1Instance
                });
            } else {
                doableC1sAndActivities.push({
                    type: CS.Controllers.ActivityFeed.itemType.c1,
                    instance: c1Instance
                });
            }
        }.bind(this));

        CS.activitiesModel.getDoable().forEach(function (activityInstance, index) {
            var feedItem = _.find(this.activityFeedItems, function (item) {
                return item.className === activityInstance.getClassName();
            });

            doableC1sAndActivities.push({
                type: CS.Controllers.ActivityFeed.itemType.activity,
                instance: activityInstance,
                buttonText: feedItem.buttonText,
                isDone: false
            });
        }.bind(this));

        CS.activitiesModel.getDone().forEach(function (activityInstance, index) {
            var feedItem = _.find(this.activityFeedItems, function (item) {
                return item.className === activityInstance.getClassName();
            });

            doneC1sAndActivities.unshift({
                type: CS.Controllers.ActivityFeed.itemType.activity,
                instance: activityInstance,
                buttonText: feedItem.buttonText,
                isDone: true
            });
        }.bind(this));

        this._showOrHideRegisterReminder(doneC1sAndActivities.length);

        this.reactInstance.replaceState({
            doableC1sAndActivities: doableC1sAndActivities,
            doneC1sAndActivities: doneC1sAndActivities,
            accountData: CS.account.data
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

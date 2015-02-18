CS.Controllers.ActivityFeed = P(CS.Controllers.Base, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                undoneC1sAndActivities: [],
                doneC1sAndActivities: [],
                accountData: null
            };
        },

        render: function () {
            var finishedActivitiesTitle;
            if (!_.isEmpty(this.state.doneC1sAndActivities)) {
                finishedActivitiesTitle = (
                    React.createElement("h3", null, "Utförda   aktiviteter")
                    );
            }

            return (
                React.createElement("div", null, 
                    React.createElement("div", {className: "alert alert-info", id: "intro-to-activities"}, 
                        React.createElement("button", {type: "button", className: "close", "data-dismiss": "alert", "aria-label": "Close"}, 
                            React.createElement("span", {"aria-hidden": "true"}, "×")
                        ), 

                        React.createElement("h2", null, "Aktiviteter att göra"), 

                        React.createElement("p", null, "Det dyker upp ett kort i flödet så fort det finns något nytt att göra."), 

                        React.createElement("p", null, "Den första aktiviteten är att hitta vilka styrkor som efterfrågas i annonsen till jobbet du söker."), 

                        React.createElement("p", null, "När du hittat några styrkor kommer det nya övningar som handlar om att beskriva styrkorna du just har hittat."), 

                        React.createElement("p", null, "Det är bara att sätta igång!")
                    ), 

                    React.createElement("ul", {className: "styleless"}, 
                    this.state.undoneC1sAndActivities.map(function (c1OrActivity) {
                        var key = c1OrActivity.instance.getClassName();

                        if (c1OrActivity.type === CS.Controllers.ActivityFeed.itemType.c1) {
                            return React.createElement(CS.Controllers.C1FeedItem, {key: key, c1: c1OrActivity});
                        }

                        if (this.state.accountData) {
                            key += JSON.stringify(this.state.accountData);
                        }

                        return React.createElement(CS.Controllers.ActivityFeedItem, {key: key, activity: c1OrActivity});
                    }.bind(this))
                    ), 

                    finishedActivitiesTitle, 

                    React.createElement("ul", {className: "styleless"}, 
                    this.state.doneC1sAndActivities.map(function (c1OrActivity) {
                        var className = c1OrActivity.instance.getClassName();
                        var key = className;

                        if (c1OrActivity.type === CS.Controllers.ActivityFeed.itemType.c1) {
                            if (this.state.accountData) {
                                key += this.state.accountData[className];
                            }

                            return React.createElement(CS.Controllers.C1FeedItem, {key: key, c1: c1OrActivity});
                        }

                        if (this.state.accountData) {
                            key += JSON.stringify(this.state.accountData);
                        }

                        return React.createElement(CS.Controllers.ActivityFeedItem, {key: key, activity: c1OrActivity});
                    }.bind(this))
                    )
                )
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

CS.Controllers.ActivityFeedItem = React.createClass({displayName: "ActivityFeedItem",
    render: function () {
        var liClasses = React.addons.classSet({
            "well": true,
            "done": this.props.activity.isDone
        });

        var buttonText = this.props.activity.isDone ? "Gör om" : this.props.activity.buttonText;

        return (
            React.createElement("li", {className: liClasses}, 
                React.createElement("h2", {dangerouslySetInnerHTML: {__html: this.props.activity.instance.getTitle()}}), 

                React.createElement("p", {className: "help-text", dangerouslySetInnerHTML: {__html: this.props.activity.instance.getDescription()}}), 

                React.createElement("div", {className: "centered-contents"}, 
                    React.createElement("button", {className: "btn btn-primary", onClick: this._handleClick}, buttonText)
                )
            )
            );
    },
    
    _handleClick: function (e) {
        location.hash = "activities/" + this.props.activity.instance.getClassName();
    }
});

CS.Controllers.C1FeedItem = React.createClass({displayName: "C1FeedItem",
    getInitialState: function() {
        return {inputValue: CS.account.data ? CS.account.data[this._getClassName()] : null};
    },

    render: function () {
        var liClasses = React.addons.classSet({
            "well": true,
            "done": CS.account.data && CS.account.data[this._getClassName()]
        });

        var buttonText = CS.account.data && CS.account.data[this._getClassName()] ? "Ändra" : "Spara";

        return (
            React.createElement("li", {className: liClasses, onSubmit: this._handleSubmit}, 
                React.createElement("form", {role: "form", id: this._getFormId()}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {for: this._getClassName()}, this.props.c1.instance.getTitle()), 
                        React.createElement("input", {type: "text", id: this._getClassName(), className: "form-control", value: this.state.inputValue, onChange: this._handleValueChange}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 
                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "submit", className: "btn btn-primary", "data-loading-text": "Sparar..."}, buttonText)
                    )
                )
            )
            );
    },

    _getClassName: function () {
        return this.props.c1.instance.getClassName();
    },

    _getFormId: function () {
        return this._getClassName() + "-input-form";
    },

    componentDidMount: function (prevProps, prevState) {
        this.account = {
            data: _.clone(CS.account.data, true) || {}
        };

        this._initElements();
        this._initValidation();
    },

    _initElements: function () {
        this.$form = $("#" + this._getFormId());
        this.$inputField = this.$form.find("#" + this._getClassName());
        this.$submitBtn = this.$form.find("[type=submit]");
    },

    _initValidation: function () {
        this.validator = CS.Services.Validator([
            this._getClassName()
        ]);
    },

    _handleValueChange: function(e) {
        this.setState({inputValue: e.target.value});
    },

    _handleSubmit: function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.$submitBtn.button('loading');

            this.account.data[this._getClassName()] = this.$inputField.val().trim();

            var type = "POST";
            var url = "/api/account-data";

            $.ajax({
                url: url,
                type: type,
                contentType: "application/json",
                data: JSON.stringify(this.account.data),
                success: function (data, textStatus, jqXHR) {
                    location.reload();
                }.bind(this),
                error: function (jqXHR, textStatus, errorThrown) {
                    this.$submitBtn.button('reset');
                    alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
                }.bind(this)
            });
        }
    }
});

CS.Controllers.Standouts = P(function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
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
                    React.createElement("h1", null, this.state.position, " på ", this.state.employer)
                    );
            }

            return (
                React.createElement("div", null, 
                    employerAndPosition, 

                    React.createElement("ul", {className: "styleless"}, 
                        this.state.standoutInstances.map(function (standout) {
                            return React.createElement("li", {id: standout.className});
                        })
                    )
                )
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
            success: function (data, textStatus, jqXHR) {
                var itemInstancesCustomStandouts = data.map(function (customActivity, index) {
                    return CS.Standouts.Custom(customActivity.className, customActivity.title);
                }.bind(this));

                var itemInstancesClassicStandouts = this.itemClassNames.map(function (className, index) {
                    return CS.Standouts[className](className);
                }.bind(this));

                var allItemInstances = _.union(itemInstancesCustomStandouts, itemInstancesClassicStandouts);

                this.reactInstance.replaceState({
                    employer: CS.account.data ? CS.account.data.Employer : null,
                    position: CS.account.data ? CS.account.data.Position : null,
                    standoutInstances: allItemInstances
                });

                allItemInstances.forEach(function(instance, index) {
                    instance.run();
                }.bind(this));
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
            }.bind(this)
        });
    };
});

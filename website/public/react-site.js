CS.Controllers.ActivityFeed = P(function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {data: []};
        },

        render: function () {
            return (
                React.createElement("ul", {className: "styleless"}, 
                    this.state.data.map(function (c1OrActivity) {
                        if (c1OrActivity.type === CS.Controllers.ActivityFeed.itemType.c1) {
                            return React.createElement(CS.Controllers.C1FeedItem, {key: c1OrActivity.instance.className, c1: c1OrActivity});
                        }
                        return React.createElement(CS.Controllers.ActivityFeedItem, {key: c1OrActivity.instance.className, activity: c1OrActivity});
                    })
                )
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
                title: "Förstå vad de söker"
            },
            {
                className: "SpecifyTop1Strength",
                title: "Stick ut från mängden"
            }
        ];

        this.c1Instances = this.c1FeedItems.map(function (item, index) {
            return CS.C1s[item.className](item.className, item.title);
        }.bind(this));
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
                var customActivityInstances = data.map(function (customActivity, index) {
                    return CS.Activities.Custom(customActivity.className, customActivity.title, customActivity.mainText);
                }.bind(this));

                var classicActivityInstances = this.activityFeedItems.map(function (item, index) {
                    return CS.Activities[item.className](item.className, item.title);
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

        this.c1Instances.forEach(function(c1Instance, index) {
            var isDone = CS.accountData && CS.accountData[c1Instance.getClassName()];

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

        this.reactInstance.replaceState({ data: _.union(undoneC1sAndActivities, doneC1sAndActivities) });
    };

    c._showOrHideRegisterReminder = function (doneActivitiesCount) {
        if (CS.Controllers.isTemporaryAccount() && doneActivitiesCount > 0) {
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

CS.Controllers.ActivityFeedItem = React.createClass({displayName: "ActivityFeedItem",
    render: function () {
        var liClasses = React.addons.classSet({
            "well": true,
            "done": this.props.activity.isDone
        });

        var buttonText = this.props.activity.isDone ? "Gör om" : "Gör detta";

        return (
            React.createElement("li", {className: liClasses}, 
                React.createElement("h2", null, this.props.activity.instance.getTitle()), 
                React.createElement("button", {className: "btn btn-primary", onClick: this._handleClick}, buttonText)
            )
            );
    },
    
    _handleClick: function (e) {
        var instance = this.props.activity.instance;

        instance.preLaunch();

        location.hash = "activities/" + instance.getClassName();

        $("#c1-and-activity-feed").hide();
        $("#current-c1-or-activity").show();
    }
});

CS.Controllers.C1FeedItem = React.createClass({displayName: "C1FeedItem",
    getInitialState: function() {
        return {inputValue: CS.accountData ? CS.accountData[this._getClassName()] : null};
    },

    render: function () {
        var liClasses = React.addons.classSet({
            "well": true,
            "done": CS.accountData && CS.accountData[this._getClassName()]
        });

        var buttonText = CS.accountData && CS.accountData[this._getClassName()] ? "Ändra" : "Spara";

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
        this.accountData = CS.accountData || {};

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

            this.accountData[this._getClassName()] = this.$inputField.val().trim();

            var type = "POST";
            var url = "/api/account-data";

            $.ajax({
                url: url,
                type: type,
                contentType: "application/json",
                data: JSON.stringify(this.accountData),
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
            return {data: []};
        },

        render: function () {
            return (
                React.createElement("ul", {className: "styleless"}, 
                    this.state.data.map(function (standout) {
                        return React.createElement("li", {key: standout.className, id: standout.className, className: "well"});
                    })
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
                }.bind(this));

                var itemInstancesClassicStandouts = this.itemClassNames.map(function (className, index) {
                    return CS.Standouts[className](className);
                }.bind(this));

                var allItemInstances = _.union(itemInstancesCustomStandouts, itemInstancesClassicStandouts);

                this.reactInstance.replaceState({ data: allItemInstances });

                allItemInstances.forEach(function(instance, index) {
                    instance.render();
                }.bind(this));
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
            }.bind(this)
        });
    };
});

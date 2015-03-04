CS.Models.Activities = P(function (c) {
    c.init = function () {
        var activityItems = [
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

        this.activityInstances = activityItems.map(function (item) {
            return CS.Activities[item.className](item.className, item.title, item.description);
        });
    };

    c.updateActivityStatus = function (onComplete) {
        this.activities = {
            done: [],
            doable: [],
            notDoable: []
        };

        this._fetchActivityData(onComplete);
    };

    c.getDone = function () {
        return this.activities.done;
    };

    c.getDoable = function () {
        return this.activities.doable;
    };

    c.getNotDoable = function () {
        return this.activities.notDoable;
    };

    c.getNextActivity = function () {
        if (_.isEmpty(this.activities.doable)) {
            return null;
        }
        return this.activities.doable[0];
    };

    c._fetchActivityData = function (onComplete) {
        var type = "GET";
        var url = "/api/activities";

        $.ajax({
            url: url,
            type: type,
            dataType: "json",
            success: function (data) {
                this._updateActivityStatus(data, onComplete);
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    };

    c._updateActivityStatus = function (activityData, onComplete) {
        activityData.forEach(function (activity) {
            var instance = _.find(this.activityInstances, function (instans) {
                return instans.getClassName() === activity.className;
            });

            if (activity.state === CS.Models.Activity.state.done) {
                this.activities.done.push(instance);
            } else if (instance.isDoable()) {
                this.activities.doable.push(instance);
            } else {
                this.activities.notDoable.push(instance);
            }
        }.bind(this));

        // We handle instances which didn't have any activity data
        this.activityInstances.forEach(function (instance) {
            var isTodo = _.isEmpty(_.find(this.activities.done, function (activity) {
                return activity.getClassName() === instance.getClassName();
            }));

            if (isTodo) {
                var isAlreadyInTheList;
                if (instance.isDoable()) {
                    // Is it already is among CS.activities.doable?
                    isAlreadyInTheList = _.find(this.activities.doable, function (activity) {
                        return activity.getClassName() === instance.getClassName();
                    });

                    if (!isAlreadyInTheList) {
                        this.activities.doable.push(instance);
                    }
                } else {
                    // Is it already is among CS.activities.notDoable?
                    isAlreadyInTheList = _.find(this.activities.notDoable, function (activity) {
                        return activity.getClassName() === instance.getClassName();
                    });

                    if (!isAlreadyInTheList) {
                        this.activities.notDoable.push(instance);
                    }
                }
            }
        }.bind(this));

        if (onComplete) {
            onComplete();
        }
    };
});

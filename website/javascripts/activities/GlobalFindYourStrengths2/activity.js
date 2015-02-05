CS.Activities.GlobalFindYourStrengths2 = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title) {
        base.init.call(this, className, title);
    };

    c.isDoable = function () {
        return this.model.accountData.strengths &&
            this.model.accountData.strengths.strength1 &&
            this.model.accountData.strengths.strength2 &&
            this.model.accountData.strengths.strength3;
    };

    c.preLaunch = function () {
        // Initialising all app controllers
        this.controller = CS.Activities.GlobalFindYourStrengths2.Controllers.Page1("activities/" + this.model.className, this);

        CS.router.get(this.controller.route, function (req) {
            this.renderController(this.controller.route);
        }.bind(this));
    };
});

CS.Activities.GlobalFindYourStrengths2.Controllers = {};

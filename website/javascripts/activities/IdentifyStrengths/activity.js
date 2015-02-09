CS.Activities.IdentifyStrengths = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title) {
        base.init.call(this, className, title);

        this.model.accountData.strengths = this.model.accountData.strengths || {};
    };

    c.isDoable = function() {
        return true;    // No conditions
    };

    c.preLaunch = function() {
        // Initialising all app controllers
        this.page1Controller = CS.Activities.IdentifyStrengths.Controllers.Page1("activities/" + this.model.className, this);

        CS.router.get(this.page1Controller.route, function (req) {
            this.renderController(this.page1Controller.route);
        }.bind(this));
    };
});

CS.Activities.IdentifyStrengths.Controllers = {};

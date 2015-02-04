CS.Activities.GlobalFindYourStrengths2 = P(CS.Activities.Base, function (c, base) {
    c.initActivity = function (activity) {
        base.initActivity(activity);

        // Initialising all app controllers
        this.controller = CS.Activities.GlobalFindYourStrengths2.Controllers.Page1("activities/" + this.model.className, this);

        this.router.get(this.controller.route, function (req) {
            this.renderController(this.controller.route);
        }.bind(this));
    };
});

CS.Activities.GlobalFindYourStrengths2.Controllers = {};

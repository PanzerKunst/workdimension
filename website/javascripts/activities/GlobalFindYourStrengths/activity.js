CS.Activities.GlobalFindYourStrengths = P(CS.Activities.Base, function (c, base) {
    c.init = function (accoundData) {
        base.init("GlobalFindYourStrengths", accoundData);

        // Initialising all app controllers
        this.page1Controller = CS.Activities.GlobalFindYourStrengths.Controllers.Page1("activities/" + this.model.className, this);
        this.page2Controller = CS.Activities.GlobalFindYourStrengths.Controllers.Page2("activities/" + this.model.className + "/2", this);
        this.page3Controller = CS.Activities.GlobalFindYourStrengths.Controllers.Page3("activities/" + this.model.className + "/3", this);

        this.router.get(this.page1Controller.route, function (req) {
            this.renderController(this.page1Controller.route);
        }.bind(this));

        this.router.get(this.page2Controller.route, function (req) {
            this.renderController(this.page2Controller.route);
        }.bind(this));

        this.router.get(this.page3Controller.route, function (req) {
            this.renderController(this.page3Controller.route);
        }.bind(this));
    };
});

CS.Activities.GlobalFindYourStrengths.Controllers = {};

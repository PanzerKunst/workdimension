CS.Activities.IdentifyStrengths = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title) {
        base.init.call(this, className, title);

        this.model.accountData.strengths = this.model.accountData.strengths || [];
    };

    c.isDoable = function() {
        return this.model.accountData.Employer && this.model.accountData.Position;
    };

    c.preLaunch = function() {
        // Initialising all app controllers
        this.page1Controller = CS.Activities.IdentifyStrengths.Controllers.Page1("activities/" + this.model.className, this);
        this.page2Controller = CS.Activities.IdentifyStrengths.Controllers.Page2("activities/" + this.model.className + "/2", this);
        this.page3Controller = CS.Activities.IdentifyStrengths.Controllers.Page3("activities/" + this.model.className + "/3", this);
        this.page4Controller = CS.Activities.IdentifyStrengths.Controllers.Page4("activities/" + this.model.className + "/4", this);
        this.page5Controller = CS.Activities.IdentifyStrengths.Controllers.Page5("activities/" + this.model.className + "/5", this);

        CS.router.get(this.page1Controller.route, function (req) {
            this.renderController(this.page1Controller.route);
        }.bind(this));

        CS.router.get(this.page2Controller.route, function (req) {
            this.renderController(this.page2Controller.route);
        }.bind(this));

        CS.router.get(this.page3Controller.route, function (req) {
            this.renderController(this.page3Controller.route);
        }.bind(this));

        CS.router.get(this.page4Controller.route, function (req) {
            this.renderController(this.page4Controller.route);
        }.bind(this));

        CS.router.get(this.page5Controller.route, function (req) {
            this.renderController(this.page5Controller.route);
        }.bind(this));
    };
});

CS.Activities.IdentifyStrengths.Controllers = {};

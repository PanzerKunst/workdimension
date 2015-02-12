CS.Activities.SpecifyTop1Strength = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title) {
        base.init.call(this, className, title);
    };

    c.isDoable = function() {
        return this.model.accountData.Employer &&
            this.model.accountData.Position &&
            this.model.accountData.strengths &&
            this.model.accountData.strengths.length > 0;
    };

    c.preLaunch = function() {
        // Initialising all app controllers
        this.introController = CS.Activities.SpecifyTop1Strength.Controllers.Intro("activities/" + this.model.className, this);
        this.step1Controller = CS.Activities.SpecifyTop1Strength.Controllers.Step1("activities/" + this.model.className + "/1", this);
        this.step2Controller = CS.Activities.SpecifyTop1Strength.Controllers.Step2("activities/" + this.model.className + "/2", this);
        this.step3Controller = CS.Activities.SpecifyTop1Strength.Controllers.Step3("activities/" + this.model.className + "/3", this);
        this.step4Controller = CS.Activities.SpecifyTop1Strength.Controllers.Step4("activities/" + this.model.className + "/4", this);

        var controllers = [
            this.introController,
            this.step1Controller,
            this.step2Controller,
            this.step3Controller,
            this.step4Controller
        ];

        base.preLaunch.call(this, controllers);
    };
});

CS.Activities.SpecifyTop1Strength.Controllers = {};

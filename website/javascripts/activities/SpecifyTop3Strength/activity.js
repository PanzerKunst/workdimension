CS.Activities.SpecifyTop3Strength = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title) {
        base.init.call(this, className, title);
    };

    c.isDoable = function() {
        return this.model.account.data.Employer &&
            this.model.account.data.Position &&
            this.model.account.data.strengths &&
            this.model.account.data.strengths.length > 2;
    };

    c.initControllers = function() {
        // Initialising all activity controllers
        this.introController = CS.Activities.SpecifyTop3Strength.Controllers.Intro("activities/" + this.model.className, this);
        this.step1Controller = CS.Activities.SpecifyTop3Strength.Controllers.Step1("activities/" + this.model.className + "/1", this);
        this.step2Controller = CS.Activities.SpecifyTop3Strength.Controllers.Step2("activities/" + this.model.className + "/2", this);
        this.step3Controller = CS.Activities.SpecifyTop3Strength.Controllers.Step3("activities/" + this.model.className + "/3", this);
        this.outroController = CS.Activities.SpecifyTop3Strength.Controllers.Outro("activities/" + this.model.className + "/outro", this);

        var controllers = [
            this.introController,
            this.step1Controller,
            this.step2Controller,
            this.step3Controller,
            this.outroController
        ];

        this.initRouting(controllers);
    };
});

CS.Activities.SpecifyTop3Strength.Controllers = {};

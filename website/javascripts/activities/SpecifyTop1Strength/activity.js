CS.Activities.SpecifyTop1Strength = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title) {
        base.init.call(this, className, title);
    };

    c.isDoable = function() {
        return this.model.account.data.Employer &&
            this.model.account.data.Position &&
            !_.isEmpty(this.model.account.data.strengths);
    };

    c.initControllers = function() {
        // Initialising all activity controllers
        this.introController = CS.Activities.SpecifyTop1Strength.Controllers.Intro("activities/" + this.model.className, this);
        this.step1Controller = CS.Activities.SpecifyTop1Strength.Controllers.Step1("activities/" + this.model.className + "/1", this);
        this.step2Controller = CS.Activities.SpecifyTop1Strength.Controllers.Step2("activities/" + this.model.className + "/2", this);
        this.step3Controller = CS.Activities.SpecifyTop1Strength.Controllers.Step3("activities/" + this.model.className + "/3", this);
        this.outroController = CS.Activities.SpecifyTop1Strength.Controllers.Outro("activities/" + this.model.className + "/outro", this);

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

CS.Activities.SpecifyTop1Strength.Controllers = {};

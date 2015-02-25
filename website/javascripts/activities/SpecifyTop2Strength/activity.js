CS.Activities.SpecifyTop2Strength = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title, description) {
        base.init.call(this, className, title, description);
    };

    c.isDoable = function() {
        this.initModel();

        return this.model.account.data.Employer &&
            this.model.account.data.Position &&
            this.model.account.data.strengths &&
            this.model.account.data.strengths.length > 1;
    };

    c.initControllers = function() {
        // Initialising all activity controllers
        this.introController = CS.Activities.SpecifyTop2Strength.Controllers.Intro(this, "");
        this.step1Controller = CS.Activities.SpecifyTop2Strength.Controllers.Step1(this, "/1");
        this.step2Controller = CS.Activities.SpecifyTop2Strength.Controllers.Step2(this, "/2");
        this.step3Controller = CS.Activities.SpecifyTop2Strength.Controllers.Step3(this, "/3");
        this.outroController = CS.Activities.SpecifyTop2Strength.Controllers.Outro(this, "/outro");

        var controllers = [
            this.introController,
            this.step1Controller,
            this.step2Controller,
            this.step3Controller,
            this.outroController
        ];

        this.initRouting(controllers);
    };

    c.getTitle = function() {
        return CS.Services.String.template(base.getTitle.call(this), "colonAndStrengthName", ": <strong>" + this.model.account.data.strengths[1].name + "</strong>");
    };

    c.getDescription = function() {
        return CS.Services.String.template(base.getDescription.call(this), "strengthName", this.model.account.data.strengths[1].name);
    };
});

CS.Activities.SpecifyTop2Strength.Controllers = {};

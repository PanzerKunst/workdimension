CS.Activities.SpecifyTop3Strength = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title, description) {
        base.init.call(this, className, title, description);
    };

    c.isDoable = function() {
        this.initModel();

        return this.model.account.data.Employer &&
            this.model.account.data.Position &&
            this.model.account.data.strengths &&
            this.model.account.data.strengths.length > 2;
    };

    c.initControllers = function() {
        // Initialising all activity controllers
        this.introController = CS.Activities.SpecifyTop3Strength.Controllers.Intro("activities/" + this.getClassName(), this);
        this.step1Controller = CS.Activities.SpecifyTop3Strength.Controllers.Step1("activities/" + this.getClassName() + "/1", this);
        this.step2Controller = CS.Activities.SpecifyTop3Strength.Controllers.Step2("activities/" + this.getClassName() + "/2", this);
        this.step3Controller = CS.Activities.SpecifyTop3Strength.Controllers.Step3("activities/" + this.getClassName() + "/3", this);
        this.outroController = CS.Activities.SpecifyTop3Strength.Controllers.Outro("activities/" + this.getClassName() + "/outro", this);

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
        return CS.Services.String.template(base.getTitle.call(this), "colonAndStrengthName", ": <strong>" + this.model.account.data.strengths[2].name + "</strong>");
    };

    c.getDescription = function() {
        return CS.Services.String.template(base.getDescription.call(this), "strengthName", this.model.account.data.strengths[2].name);
    };
});

CS.Activities.SpecifyTop3Strength.Controllers = {};

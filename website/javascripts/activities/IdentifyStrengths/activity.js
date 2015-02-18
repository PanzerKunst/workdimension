CS.Activities.IdentifyStrengths = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title, description) {
        base.init.call(this, className, title, description);
    };

    c.isDoable = function() {
        return this.model.account.data.Employer && this.model.account.data.Position;
    };

    c.initControllers = function() {
        // Initialising all activity controllers
        this.introController = CS.Activities.IdentifyStrengths.Controllers.Intro("activities/" + this.model.className, this);
        this.step1Controller = CS.Activities.IdentifyStrengths.Controllers.Step1("activities/" + this.model.className + "/1", this);
        this.step2Controller = CS.Activities.IdentifyStrengths.Controllers.Step2("activities/" + this.model.className + "/2", this);
        this.step3Controller = CS.Activities.IdentifyStrengths.Controllers.Step3("activities/" + this.model.className + "/3", this);
        this.step4Controller = CS.Activities.IdentifyStrengths.Controllers.Step4("activities/" + this.model.className + "/4", this);
        this.step5Controller = CS.Activities.IdentifyStrengths.Controllers.Step5("activities/" + this.model.className + "/5", this);
        this.outroController = CS.Activities.IdentifyStrengths.Controllers.Outro("activities/" + this.model.className + "/outro", this);

        var controllers = [
            this.introController,
            this.step1Controller,
            this.step2Controller,
            this.step3Controller,
            this.step4Controller,
            this.step5Controller,
            this.outroController
        ];

        this.initRouting(controllers);
    };
});

CS.Activities.IdentifyStrengths.Controllers = {};

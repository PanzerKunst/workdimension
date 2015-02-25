CS.Activities.IdentifyStrengths = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title, description) {
        base.init.call(this, className, title, description);
    };

    c.isDoable = function() {
        this.initModel();

        return this.model.account.data.Employer && this.model.account.data.Position;
    };

    c.initControllers = function() {
        // Initialising all activity controllers
        this.introController = CS.Activities.IdentifyStrengths.Controllers.Intro(this, "");
        this.step1Controller = CS.Activities.IdentifyStrengths.Controllers.Step1(this, "/1");
        this.step2Controller = CS.Activities.IdentifyStrengths.Controllers.Step2(this, "/2");
        this.step3Controller = CS.Activities.IdentifyStrengths.Controllers.Step3(this, "/3");
        this.step4Controller = CS.Activities.IdentifyStrengths.Controllers.Step4(this, "/4");
        this.step5Controller = CS.Activities.IdentifyStrengths.Controllers.Step5(this, "/5");
        this.outroController = CS.Activities.IdentifyStrengths.Controllers.Outro(this, "/outro");

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

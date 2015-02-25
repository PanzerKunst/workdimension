CS.Activities.Custom = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title, text) {
        base.init.call(this, className, title);

        this.text = text;

        this.model.account.data.custom = this.model.account.data.custom || {};
    };

    c.isDoable = function () {
        return true;    // Always doable
    };

    c.initControllers = function() {
        this.initRouting([CS.Activities.Custom.Controllers.Step1("activities/" + this.getClassName(), this)]);
    };
});

CS.Activities.Custom.Controllers = {};

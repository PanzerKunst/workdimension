CS.Activities.Custom = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title, text) {
        base.init.call(this, className, title);

        this.text = text;

        this.model.account.data.custom = this.model.account.data.custom || {};
    };

    c.isDoable = function () {
        return true;    // Always doable
    };

    c.preLaunch = function () {
        // Initialising all activity controllers
        var controller = CS.Activities.Custom.Controllers.Page1("activities/" + this.model.className, this);

        CS.router.get(controller.route, function (req) {
            this.renderController(controller.route, { text: this.text});
        }.bind(this));
    };
});

CS.Activities.Custom.Controllers = {};

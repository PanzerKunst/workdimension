CS.Standouts.Strengths = P(function (c) {
    c.init = function (className) {
        this.className = className;

        this.detailsController = CS.Standouts.Strengths.Controllers.Details("standouts/" + this.className + "/details", this);

        CS.router.get(this.detailsController.route, function (req) {
            this.detailsController.render();
        }.bind(this));
    };

    c.run = function() {
        CS.Standouts.Strengths.Controllers.InList(this);
    };
});

CS.Standouts.Strengths.Controllers = {};

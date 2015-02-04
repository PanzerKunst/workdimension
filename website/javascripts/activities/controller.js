CS.Activities.Controller = P(function (c) {
    c.init = function (route, activity) {
        this.route = route;
        this.activity = activity;
        this.activity.registerController(this, this.route);
    };

    c.render = function () {
        if (!this.isRendered) {
            var uuid = CS.Services.guid();

            this.activity.$el.append('<div class="activity-page" id="' + uuid + '"></div>');
            this.$el = $("#" + uuid);

            React.render(
                React.createElement(this.reactClass, {data: this.activity.model.insightModule.data}),
                this.$el[0]
            );

            this.initElements();
            this.initValidation();
            this.initEvents();

            this.isRendered = true;
        }

        this.onReRender();

        this.$el.show();
    };

    c.navigateTo = function(route) {
        location.hash = route;
    };

    // Child functions are call instead if exist
    c.initElements = function() {};
    c.initValidation = function() {};
    c.initEvents = function() {};
    c.onReRender = function() {};
});

CS.Activities.Controller = P(CS.Controllers.OnePageWebapp, function (c, base) {
    c.init = function (route, activity) {
        this.route = route;
        this.activity = activity;
        this.activity.registerController(this, this.route);
    };

    c.render = function () {
        if (!this.isRendered) {
            var uniqueId = _.uniqueId();

            this.activity.$el.append('<div class="activity-page ' + this.activity.model.className + '" id="' + uniqueId + '"></div>');
            this.$el = $("#" + uniqueId);

            this.reactInstance = React.render(
                React.createElement(this.reactClass),
                this.$el[0]
            );

            this.initElements();
            this.initValidation();
            this.initEvents();

            this.isRendered = true;
        }

        this.onReRender();

        TweenLite.set(this.$el, {display: "block", alpha: 0});
        TweenLite.to(this.$el, CS.Activities.Base.pageAnimationDuration, {alpha: 1});
    };

    c.postData = function (callback) {
        var type = "POST";
        var url = "/api/activities";

        $.ajax({
            url: url,
            type: type,
            contentType: "application/json",
            data: JSON.stringify({
                className: this.activity.model.className,
                accountData: this.activity.model.account.data
            }),
            success: function (data, textStatus, jqXHR) {
                CS.account.data = this.activity.model.account.data;
                CS.activityFeedController.refreshData();

                if (callback) {
                    callback();
                } else {
                    this.navigateTo(this.activity.outroController.route);
                }
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                if (this.$submitBtn) {
                    this.$submitBtn.button('reset');
                }

                alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
            }.bind(this)
        });
    };

    c.nagivateToActivityFeed = function() {
        this.navigateTo("activities");
    };

    // Child functions are call instead if exist
    c.initElements = function () {
    };
    c.initValidation = function () {
    };
    c.initEvents = function () {
    };
    c.onReRender = function () {
    };
});

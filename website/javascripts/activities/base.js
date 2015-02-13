CS.Activities = {};

CS.Activities.Base = P(function (c) {
    c.$el = $("#current-activity");
    c.controllers = {};

    c.init = function (className, title) {
        this.title = title;

        this.model = {
            className: className,
            account: {
                data: _.clone(CS.account.data, true) || {}
            }
        };

        this.$el.empty();

        this._initElements();
    };

    c._initElements = function () {
        this.$activitiesTab = $("#activities-tab");

        this.$tabPanels = $('[role="tabpanel"]');
        this.$activitiesPanel = this.$tabPanels.filter("#activities");

        this.$feedSection = this.$activitiesPanel.children("#c1-and-activity-feed");
        this.$currentActivitySection = this.$activitiesPanel.children("#current-activity");
    };

    c.getClassName = function () {
        return this.model.className;
    };

    c.getTitle = function () {
        return this.title;
    };

    c.registerController = function (controllerClass, route) {
        this.controllers[route] = controllerClass;
    };

    c.preLaunch = function (controllers) {
        controllers.forEach(function (controller, index) {
            CS.router.get(controller.route, function (req) {
                this.renderController(controller.route);
            }.bind(this));
        }.bind(this));
    };

    c.renderController = function (route, data) {
        if (!this.$activitiesPanel.hasClass("active")) {
            this.$tabPanels.removeClass("active");
            this.$activitiesTab.tab('show');
            this.$activitiesPanel.addClass("active");
        }

        this.$feedSection.hide();
        this.$currentActivitySection.show();

        this._hidePagesAndDisplayNext(route, data);
    };

    c._hidePagesAndDisplayNext = function (route, data) {
        var $pages = this.$el.children();

        TweenLite.to($pages, CS.Activities.Base.pageAnimationDuration, {
            alpha: 0,
            onComplete: function () {
                $pages.hide();
                this.controllers[route].render(data);
            }.bind(this)
        });
    };
});

CS.Activities.Base.pageAnimationDuration = 0.15;

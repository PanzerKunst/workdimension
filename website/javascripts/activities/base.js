CS.Activities = {};

CS.Activities.Base = P(function (c) {
    c.$el = $("#current-c1-or-activity");
    c.controllers = {};

    c.init = function(className, title) {
        this.title = title;

        this.model = {
            className: className,
            accountData: CS.accountData || {}
        };

        this.$el.empty();

        this._initElements();
    };

    c._initElements = function() {
        this.$activitiesTab = $("#activities-tab");

        this.$tabPanels = $('[role="tabpanel"]');
        this.$activitiesPanel = this.$tabPanels.filter("#activities");

        this.$feedSection = this.$activitiesPanel.children("#c1-and-activity-feed");
        this.$currentC1OrActivitySection = this.$activitiesPanel.children("#current-c1-or-activity");
    };

    c.getClassName = function() {
        return this.model.className;
    };

    c.getTitle = function() {
        return this.title;
    };

    c.registerController = function(controllerClass, route) {
        this.controllers[route] = controllerClass;
    };

    c.renderController = function (route) {
        if (!this.$activitiesPanel.hasClass("active")) {
            this.$tabPanels.removeClass("active");
            this.$activitiesTab.tab('show');
            this.$activitiesPanel.addClass("active");
        }

        this.$feedSection.hide();
        this.$currentC1OrActivitySection.show();

        this.$el.children().hide();
        this.controllers[route].render();
    };
});

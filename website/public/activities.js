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

    c.renderController = function (route, data) {
        if (!this.$activitiesPanel.hasClass("active")) {
            this.$tabPanels.removeClass("active");
            this.$activitiesTab.tab('show');
            this.$activitiesPanel.addClass("active");
        }

        this.$feedSection.hide();
        this.$currentC1OrActivitySection.show();

        this._hidePagesAndDisplayNext(route, data);
    };

    c._hidePagesAndDisplayNext = function(route, data) {
        var $pages = this.$el.children();

        TweenLite.to($pages, CS.Activities.Base.pageAnimationDuration, {
            alpha: 0,
            onComplete: function() {
                $pages.hide();
                this.controllers[route].render(data);
            }.bind(this)
        });
    };
});

CS.Activities.Base.pageAnimationDuration = 0.15;;CS.Activities.Controller = P(function (c) {
    c.init = function (route, activity) {
        this.route = route;
        this.activity = activity;
        this.activity.registerController(this, this.route);
    };

    c.render = function (data) {
        if (!this.isRendered) {
            var uniqueId = _.uniqueId();

            this.activity.$el.append('<div class="activity-page" id="' + uniqueId + '"></div>');
            this.$el = $("#" + uniqueId);

            React.render(
                React.createElement(this.reactClass, data),
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

    c.navigateTo = function(route) {
        location.hash = route;
    };

    c.postData = function() {
        var type = "POST";
        var url = "/api/activities";

        $.ajax({
            url: url,
            type: type,
            contentType: "application/json",
            data: JSON.stringify(this.activity.model),
            success: function (data, textStatus, jqXHR) {
                CS.accountData = this.activity.model.accountData;
                location.href = "/#standouts";
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                this.$submitBtn.button('reset');
                alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
            }.bind(this)
        });
    };

    // Child functions are call instead if exist
    c.initElements = function() {};
    c.initValidation = function() {};
    c.initEvents = function() {};
    c.onReRender = function() {};
});
;CS.Activities.Custom = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title, text) {
        base.init.call(this, className, title);

        this.text = text;

        this.model.accountData.custom = this.model.accountData.custom || {};
    };

    c.isDoable = function () {
        return true;    // Always doable
    };

    c.preLaunch = function () {
        // Initialising all app controllers
        this.controller = CS.Activities.Custom.Controllers.Page1("activities/" + this.model.className, this);

        CS.router.get(this.controller.route, function (req) {
            this.renderController(this.controller.route, { text: this.text});
        }.bind(this));
    };
});

CS.Activities.Custom.Controllers = {};
;CS.Activities.GlobalFindYourStrengths = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title) {
        base.init.call(this, className, title);

        this.model.accountData.strengths = this.model.accountData.strengths || {};
    };

    c.isDoable = function() {
        return true;    // No conditions
    };

    c.preLaunch = function() {
        // Initialising all app controllers
        this.page1Controller = CS.Activities.GlobalFindYourStrengths.Controllers.Page1("activities/" + this.model.className, this);
        this.page2Controller = CS.Activities.GlobalFindYourStrengths.Controllers.Page2("activities/" + this.model.className + "/2", this);
        this.page3Controller = CS.Activities.GlobalFindYourStrengths.Controllers.Page3("activities/" + this.model.className + "/3", this);

        CS.router.get(this.page1Controller.route, function (req) {
            this.renderController(this.page1Controller.route);
        }.bind(this));

        CS.router.get(this.page2Controller.route, function (req) {
            this.renderController(this.page2Controller.route);
        }.bind(this));

        CS.router.get(this.page3Controller.route, function (req) {
            this.renderController(this.page3Controller.route);
        }.bind(this));
    };
});

CS.Activities.GlobalFindYourStrengths.Controllers = {};
;CS.Activities.GlobalFindYourStrengths2 = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title) {
        base.init.call(this, className, title);
    };

    c.isDoable = function () {
        return this.model.accountData.strengths &&
            this.model.accountData.strengths.strength1 &&
            this.model.accountData.strengths.strength2 &&
            this.model.accountData.strengths.strength3;
    };

    c.preLaunch = function () {
        // Initialising all app controllers
        this.controller = CS.Activities.GlobalFindYourStrengths2.Controllers.Page1("activities/" + this.model.className, this);

        CS.router.get(this.controller.route, function (req) {
            this.renderController(this.controller.route);
        }.bind(this));
    };
});

CS.Activities.GlobalFindYourStrengths2.Controllers = {};
;CS.Activities.Custom.Controllers.Page1 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("p", null, this.props.text), 
                        React.createElement("textarea", {id: "custom-activity-answer", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 
                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "submit", className: "btn btn-primary", "data-loading-text": "Saving..."}, "Done")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");

        this.$textarea = this.$form.find("#custom-activity-answer");

        this.$submitBtn = this.$form.find("[type=submit]");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "custom-activity-answer"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._handleSubmit, this));
    };

    c.onReRender = function() {
        // The submit button may still be in loading state when navigating back. We make sure it doesn't happen
        this.$submitBtn.button('reset');
    };

    c._handleSubmit = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.$submitBtn.button('loading');

            this.activity.model.accountData.custom[this.activity.model.className] = this.$textarea.val().trim();

            this.postData();
        }
    };
});

CS.Activities.GlobalFindYourStrengths.Controllers.Page1 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {for: "strength-1"}, "My first strength is"), 
                        React.createElement("input", {type: "text", id: "strength-1", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 
                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Next")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$strengthField = this.$form.find("#strength-1");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength-1"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._doSubmit, this));
    };

    c._doSubmit = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.activity.model.accountData.strengths.strength1 = this.$strengthField.val().trim();

            this.navigateTo(this.activity.page2Controller.route);
        }
    };
});

CS.Activities.GlobalFindYourStrengths.Controllers.Page2 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {for: "strength-2"}, "My second strength is"), 
                        React.createElement("input", {type: "text", id: "strength-2", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 
                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Next")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$strengthField = this.$form.find("#strength-2");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength-2"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._doSubmit, this));
    };

    c._doSubmit = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.activity.model.accountData.strengths.strength2 = this.$strengthField.val().trim();

            this.navigateTo(this.activity.page3Controller.route);
        }
    };
});

CS.Activities.GlobalFindYourStrengths.Controllers.Page3 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {for: "strength-3"}, "My third strength is"), 
                        React.createElement("input", {type: "text", id: "strength-3", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 
                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "submit", className: "btn btn-primary", "data-loading-text": "Saving..."}, "Done")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$strengthField = this.$form.find("#strength-3");
        this.$submitBtn = this.$form.find("[type=submit]");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength-3"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._handleSubmit, this));
    };

    c.onReRender = function() {
        // The submit button may still be in loading state when navigating back. We make sure it doesn't happen
        this.$submitBtn.button('reset');
    };

    c._handleSubmit = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.$submitBtn.button('loading');

            this.activity.model.accountData.strengths.strength3 = this.$strengthField.val().trim();

            this.postData();
        }
    };
});

CS.Activities.GlobalFindYourStrengths2.Controllers.Page1 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {for: "strength-4"}, "My first über-strength is"), 
                        React.createElement("input", {type: "text", id: "strength-4", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {for: "strength-5"}, "My second über-strength is"), 
                        React.createElement("input", {type: "text", id: "strength-5", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {for: "strength-6"}, "My third über-strength is"), 
                        React.createElement("input", {type: "text", id: "strength-6", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 
                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "submit", className: "btn btn-primary", "data-loading-text": "Saving..."}, "Done")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");

        this.$strength4Field = this.$form.find("#strength-4");
        this.$strength5Field = this.$form.find("#strength-5");
        this.$strength6Field = this.$form.find("#strength-6");

        this.$submitBtn = this.$form.find("[type=submit]");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength-4",
            "strength-5",
            "strength-6"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._doSubmit, this));
    };

    c.onReRender = function() {
        // The submit button may still be in loading state when navigating back. We make sure it doesn't happen
        this.$submitBtn.button('reset');
    };

    c._doSubmit = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.$submitBtn.button('loading');

            this.activity.model.accountData.strengths.strength4 = this.$strength4Field.val().trim();
            this.activity.model.accountData.strengths.strength5 = this.$strength5Field.val().trim();
            this.activity.model.accountData.strengths.strength6 = this.$strength6Field.val().trim();

            this.postData();
        }
    };
});

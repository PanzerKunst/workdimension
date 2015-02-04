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
            this.model.accountData.strength1 = this.$strengthField.val();

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
            this.model.accountData.strength2 = this.$strengthField.val();

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

            this.model.accountData.strength3 = this.$strengthField.val();

            var type = "POST";
            var url = "/api/account-activity";

            $.ajax({
                url: url,
                type: type,
                contentType: "application/json",
                data: JSON.stringify(this.model),
                success: function (data, textStatus, jqXHR) {
                    location.href = "/#insights";
                }.bind(this),
                error: function (jqXHR, textStatus, errorThrown) {
                    this.$submitBtn.button('reset');
                    alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
                }.bind(this)
            });
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

        this.$strength4Field = $("#strength-4");
        this.$strength5Field = $("#strength-5");
        this.$strength6Field = $("#strength-6");

        this.$submitBtn = $("[type=submit]");
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

            this.activity.model.insightModule.data.strength4 = this.$strength4Field.val();
            this.activity.model.insightModule.data.strength5 = this.$strength5Field.val();
            this.activity.model.insightModule.data.strength6 = this.$strength6Field.val();

            this._updateInsightModuleData();
        }
    };

    c._updateInsightModuleData = function () {
        var type = "PUT";
        var url = "/api/insight-modules";

        $.ajax({
            url: url,
            type: type,
            contentType: "application/json",
            data: JSON.stringify(this.activity.model.insightModule),
            success: function (data, textStatus, jqXHR) {
                this._updateActivityState();
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                this.$submitBtn.button('reset');
                alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
            }.bind(this)
        });
    };

    c._updateActivityState = function () {
        this.activity.model.state = CS.Models.Activity.state.done;

        var type = "PUT";
        var url = "/api/activities/state";

        $.ajax({
            url: url,
            type: type,
            contentType: "application/json",
            data: JSON.stringify(this.activity.model),
            success: function (data, textStatus, jqXHR) {
                location.href = "/#insights";
            },
            error: function (jqXHR, textStatus, errorThrown) {
                this.$submitBtn.button('reset');
                alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
            }.bind(this)
        });
    };
});

CS.Activities.Custom.Controllers.Page1 = P(CS.Activities.Controller, function (c, base) {
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

CS.Activities.IdentifyStrengths.Controllers.Page1 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {data: []};
        },

        render: function () {
            var listItems = this.state.data.map(function (strength) {
                return (
                    React.createElement("li", null, 
                        React.createElement("span", {className: "tag"}, 
                            React.createElement("span", null, strength), 
                            React.createElement("button", {type: "button", className: "close", "aria-label": "Close", onClick: this._handleRemoveStrengthClick}, React.createElement("span", {"aria-hidden": "true"}, "×"))
                        )
                    )
                    );
            }.bind(this));

            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("h1", null, "Finns det några egenskaper du vill framhäva som inte direkt efterfrågas?"), 

                    React.createElement("p", null, "Det kan t.ex. vara hur dina vänner skille beskriva dig eller styrkor du fått fram i ett Strengths" + ' ' +
                        "Finder-test."), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("div", {className: "input-group"}, 
                            React.createElement("input", {type: "text", id: "strength", className: "form-control", placeholder: "t.ex. strategisk, eller 'ett öga för god design'."}), 
                            React.createElement("span", {className: "input-group-btn"}, 
                                React.createElement("button", {type: "submit", className: "btn btn-default"}, "+ Lägg till")
                            )
                        ), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("ul", {className: "styleless", id: "strength-taglist"}, 
                        listItems
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "button", id: "go-next-step", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        },

        _handleRemoveStrengthClick: function(e) {
            var $li = $(e.currentTarget).parent().parent();

            CS.Services.Animator.fadeOut($li, function() {
                $li.remove();
            });
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$strengthField = this.$form.find("#strength");
        this.$strengthTagList = this.$form.find("#strength-taglist");
        this.$goNextStepBtn = this.$form.find("#go-next-step");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._addStrengthToList, this));
        this.$goNextStepBtn.click($.proxy(this._saveAndNavigateNext, this));
    };

    c._addStrengthToList = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            var strength = this.$strengthField.val().trim();
            var data = this.reactInstance.state.data;
            data.push(strength);

            this.reactInstance.replaceState({ data: data });

            this.$strengthField.val("");
        }
    };

    c._saveAndNavigateNext = function (e) {
        this.activity.model.accountData.strengths = this.$strengthTagList.children().find(".tag").children("span").map(function($span, index) {
            return $span.html();
        }, this);

        this.navigateTo(this.activity.page2Controller.route);
    };
});

CS.Activities.IdentifyStrengths.Controllers.Page2 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("h1", null, "Hur väl stämmer det här in på dig?"), 

                    React.createElement("p", null, "Det kan t.ex. vara hur dina vänner skille beskriva dig eller styrkor du fått fram i ett Strengths" + ' ' +
                        "Finder-test."), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("div", {className: "input-group"}, 
                            React.createElement("input", {type: "text", id: "strength", className: "form-control", placeholder: "t.ex. strategisk, eller 'ett öga för god design'."}), 
                            React.createElement("span", {className: "input-group-btn"}, 
                                React.createElement("button", {type: "submit", className: "btn btn-default"}, "+ Lägg till")
                            )
                        ), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("ul", {className: "styleless", id: "strength-taglist"}, 
                        listItems
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "button", id: "go-next-step", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$strengthField = this.$form.find("#strength");
        this.$strengthTagList = this.$form.find("#strength-taglist");
        this.$goNextStepBtn = this.$form.find("#go-next-step");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._addStrengthToList, this));
        this.$goNextStepBtn.click($.proxy(this._saveAndNavigateNext, this));
    };

    c._addStrengthToList = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            var strength = this.$strengthField.val().trim();
            var data = this.reactInstance.state.data;
            data.push(strength);

            this.reactInstance.replaceState({ data: data });

            this.$strengthField.val("");
        }
    };

    c._saveAndNavigateNext = function (e) {
        this.activity.model.accountData.strengths = this.$strengthTagList.children().find(".tag").children("span").map(function($span, index) {
            return $span.html();
        }, this);

        this.navigateTo(this.activity.page2Controller.route);
    };
});

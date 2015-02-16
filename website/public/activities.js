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

        this.initControllers();
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

    c.initRouting = function (controllers) {
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
;CS.Activities.Controller = P(CS.Controllers.OnePageWebapp, function (c, base) {
    c.init = function (route, activity) {
        this.route = route;
        this.activity = activity;
        this.activity.registerController(this, this.route);
    };

    c.render = function (data) {
        if (!this.isRendered) {
            var uniqueId = _.uniqueId();

            this.activity.$el.append('<div class="activity-page ' + this.activity.model.className + '" id="' + uniqueId + '"></div>');
            this.$el = $("#" + uniqueId);

            this.reactInstance = React.render(
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

                if (callback) {
                    callback();
                } else {
                    // TODO this.navigateTo(this.activity.outroController.route);
                    this.navigateTo("insights");
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
;CS.Activities.Custom = P(CS.Activities.Base, function (c, base) {
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
;CS.Activities.IdentifyStrengths = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title) {
        base.init.call(this, className, title);
    };

    c.isDoable = function() {
        return this.model.account.data.Employer && this.model.account.data.Position;
    };

    c.initControllers = function() {
        // Initialising all activity controllers
        this.introController = CS.Activities.IdentifyStrengths.Controllers.Intro("activities/" + this.model.className, this);
        this.step1Controller = CS.Activities.IdentifyStrengths.Controllers.Step1("activities/" + this.model.className + "/1", this);
        this.step2Controller = CS.Activities.IdentifyStrengths.Controllers.Step2("activities/" + this.model.className + "/2", this);
        this.step3Controller = CS.Activities.IdentifyStrengths.Controllers.Step3("activities/" + this.model.className + "/3", this);
        this.step4Controller = CS.Activities.IdentifyStrengths.Controllers.Step4("activities/" + this.model.className + "/4", this);

        var controllers = [
            this.introController,
            this.step1Controller,
            this.step2Controller,
            this.step3Controller,
            this.step4Controller
        ];

        this.initRouting(controllers);
    };
});

CS.Activities.IdentifyStrengths.Controllers = {};
;CS.Activities.SpecifyTop1Strength = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title) {
        base.init.call(this, className, title);
    };

    c.isDoable = function() {
        return this.model.account.data.Employer &&
            this.model.account.data.Position &&
            !_.isEmpty(this.model.account.data.strengths);
    };

    c.initControllers = function() {
        // Initialising all activity controllers
        this.introController = CS.Activities.SpecifyTop1Strength.Controllers.Intro("activities/" + this.model.className, this);
        this.step1Controller = CS.Activities.SpecifyTop1Strength.Controllers.Step1("activities/" + this.model.className + "/1", this);
        this.step2Controller = CS.Activities.SpecifyTop1Strength.Controllers.Step2("activities/" + this.model.className + "/2", this);
        this.step3Controller = CS.Activities.SpecifyTop1Strength.Controllers.Step3("activities/" + this.model.className + "/3", this);
        this.step4Controller = CS.Activities.SpecifyTop1Strength.Controllers.Step4("activities/" + this.model.className + "/4", this);

        var controllers = [
            this.introController,
            this.step1Controller,
            this.step2Controller,
            this.step3Controller,
            this.step4Controller
        ];

        this.initRouting(controllers);
    };
});

CS.Activities.SpecifyTop1Strength.Controllers = {};
;CS.Activities.SpecifyTop2Strength = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title) {
        base.init.call(this, className, title);
    };

    c.isDoable = function() {
        return this.model.account.data.Employer &&
            this.model.account.data.Position &&
            this.model.account.data.strengths &&
            this.model.account.data.strengths.length > 1;
    };

    c.initControllers = function() {
        // Initialising all activity controllers
        this.introController = CS.Activities.SpecifyTop2Strength.Controllers.Intro("activities/" + this.model.className, this);
        this.step1Controller = CS.Activities.SpecifyTop2Strength.Controllers.Step1("activities/" + this.model.className + "/1", this);
        this.step2Controller = CS.Activities.SpecifyTop2Strength.Controllers.Step2("activities/" + this.model.className + "/2", this);
        this.step3Controller = CS.Activities.SpecifyTop2Strength.Controllers.Step3("activities/" + this.model.className + "/3", this);
        this.step4Controller = CS.Activities.SpecifyTop2Strength.Controllers.Step4("activities/" + this.model.className + "/4", this);

        var controllers = [
            this.introController,
            this.step1Controller,
            this.step2Controller,
            this.step3Controller,
            this.step4Controller
        ];

        this.initRouting(controllers);
    };
});

CS.Activities.SpecifyTop2Strength.Controllers = {};
;CS.Activities.SpecifyTop3Strength = P(CS.Activities.Base, function (c, base) {
    c.init = function (className, title) {
        base.init.call(this, className, title);
    };

    c.isDoable = function() {
        return this.model.account.data.Employer &&
            this.model.account.data.Position &&
            this.model.account.data.strengths &&
            this.model.account.data.strengths.length > 2;
    };

    c.initControllers = function() {
        // Initialising all activity controllers
        this.introController = CS.Activities.SpecifyTop3Strength.Controllers.Intro("activities/" + this.model.className, this);
        this.step1Controller = CS.Activities.SpecifyTop3Strength.Controllers.Step1("activities/" + this.model.className + "/1", this);
        this.step2Controller = CS.Activities.SpecifyTop3Strength.Controllers.Step2("activities/" + this.model.className + "/2", this);
        this.step3Controller = CS.Activities.SpecifyTop3Strength.Controllers.Step3("activities/" + this.model.className + "/3", this);
        this.step4Controller = CS.Activities.SpecifyTop3Strength.Controllers.Step4("activities/" + this.model.className + "/4", this);

        var controllers = [
            this.introController,
            this.step1Controller,
            this.step2Controller,
            this.step3Controller,
            this.step4Controller
        ];

        this.initRouting(controllers);
    };
});

CS.Activities.SpecifyTop3Strength.Controllers = {};
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
                        React.createElement("button", {type: "submit", className: "btn btn-primary", "data-loading-text": "Sparar..."}, "Spara")
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

            this.activity.model.account.data.custom[this.activity.model.className] = this.$textarea.val().trim();

            this.postData();
        }
    };
});

CS.Activities.IdentifyStrengths.Controllers.Intro = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            return (
                React.createElement("div", null, 
                    React.createElement("h1", null, "Förstå vad de söker"), 

                    React.createElement("p", null, "Spännande att du har funnit en annons som du vill svara på! Här hjälper vi dig att ta fram de viktigaste" + ' ' +
                    "egenskaperna som efterfrågas i annonsen samt matcha de kraven med dina egenskaper. "), 

                    React.createElement("p", null, "Genom ett antal frågeställningar och övningar hoppas vi att du kommer at få insikter om just dina egenskaper" + ' ' +
                    "och på vilket sätt de bidrar till dig sätt att vara."), 

                    React.createElement("div", {className: "centered-contents"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "button", className: "btn btn-primary"}, "Sätt igång")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$goBackBtn = this.$el.find(".btn-default");
        this.$goNextStepBtn = this.$el.find(".btn-primary");
    };

    c.initEvents = function () {
        this.$goBackBtn.click($.proxy(this.navigateBack, this));
        this.$goNextStepBtn.click($.proxy(this._navigateNext, this));
    };

    c._navigateNext = function (e) {
        this.activity.model.account.data.strengths = this.activity.model.account.data.strengths || [];

        this.navigateTo(this.activity.step1Controller.route);
    };
});

CS.Activities.IdentifyStrengths.Controllers.Outro = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {strengths: []};
        },

        render: function () {
            var sortedStrengths = CS.Models.Strength.sort(this.state.strengths);

            return (
                React.createElement("div", null, 
                    React.createElement("p", null, "Snyggt jobbat! De här egenskaperna sparas ner till dina smalade insikter och vi kan börja definiera" + ' ' +
                    "dem närmre."), 

                    React.createElement("ol", null, 
                        sortedStrengths.map(function (strength) {
                            return (
                                React.createElement("li", null, strength.name)
                                );
                        }.bind(this))
                    ), 

                    React.createElement("section", null, 
                        React.createElement("span", null, "Nästa steg"), 
                        React.createElement("div", {className: "centered-contents"}
                        )
                    )
                )
                );
        }
    });
});

CS.Activities.IdentifyStrengths.Controllers.Step1 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {data: []};
        },

        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("p", null, "Finns det några egenskaper du vill framhäva som inte direkt efterfrågas?"), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("div", {className: "input-group"}, 
                            React.createElement("input", {type: "text", id: "strength", className: "form-control"}), 
                            React.createElement("span", {className: "input-group-btn"}, 
                                React.createElement("button", {type: "submit", className: "btn btn-default"}, "+ Lägg till")
                            )
                        ), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("p", {className: "field-error other-form-error", id: "one-strength-min"}, "Minst en egenskap ska läggas till"), 
                    React.createElement("p", {className: "field-error other-form-error", id: "strength-already-added"}, "Denna egenskap har redan lagt"), 

                    React.createElement("ul", {className: "styleless", id: "strength-taglist"}, 
                        this.state.data.map(function (strength) {
                            return (
                                React.createElement("li", null, 
                                    React.createElement("span", {className: "tag"}, 
                                        React.createElement("span", null, strength), 
                                        React.createElement("button", {type: "button", className: "close", "aria-label": "Close", onClick: this._handleRemoveStrengthClick}, 
                                            React.createElement("span", {"aria-hidden": "true"}, "×")
                                        )
                                    )
                                )
                                );
                        }.bind(this))
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default go-back"}, "Tillbaka"), 
                        React.createElement("button", {type: "button", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        },

        _handleRemoveStrengthClick: function (e) {
            var $li = $(e.currentTarget).parent().parent();

            CS.Services.Animator.fadeOut($li, function () {
                $li.remove();
            });
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$strengthField = this.$form.find("#strength");

        this.$oneStrengthMinError = this.$form.find("#one-strength-min");
        this.$strengthAlreadyAddedError = this.$form.find("#strength-already-added");

        this.$strengthTagList = this.$form.find("#strength-taglist");
        this.$goBackBtn = this.$form.find(".go-back");
        this.$goNextStepBtn = this.$form.find(".btn-primary");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._addStrengthToList, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));
        this.$goNextStepBtn.click($.proxy(this._saveAndNavigateNext, this));
    };

    c._addStrengthToList = function (e) {
        e.preventDefault();

        this.validator.hideErrorMessage(this.$strengthAlreadyAddedError);

        if (this.validator.isValid()) {
            this.validator.hideErrorMessage(this.$oneStrengthMinError);

            var strength = this.$strengthField.val().trim();

            if (this._isStrengthAlreadyInList(strength)) {
                this.validator.showErrorMessage(this.$strengthAlreadyAddedError);
            } else {
                var data = this.reactInstance.state.data;
                data.push(strength);

                this.reactInstance.replaceState({ data: data });

                this.$strengthField.val("");
            }
        }
    };

    c._isThereAtLeastOneStrengthInList = function ($l1stItems) {
        var $listItems = $l1stItems || this.$strengthTagList.children();

        return $listItems && $listItems.length > 0;
    };

    c._isStrengthAlreadyInList = function (strength) {
        var $listItems = this.$strengthTagList.children();

        if (!this._isThereAtLeastOneStrengthInList($listItems)) {
            return false;
        }

        for (var i = 0; i < $listItems.length; i++) {
            var span = $($listItems[i]).children().children("span")[0];
            if (span.innerHTML === strength) {
                return true;
            }
        }

        return false;
    };

    c._saveAndNavigateNext = function (e) {
        if (!this._isThereAtLeastOneStrengthInList()) {
            this.validator.showErrorMessage(this.$oneStrengthMinError);
        } else {
            // Because jQuery's "map()" function returns an object, see http://xahlee.info/js/js_convert_array-like.html
            this.activity.model.account.data.strengths = Array.prototype.slice.call(
                this.$strengthTagList.children().children().children("span").map(function (index, span) {
                    return {"name": span.innerHTML};
                })
            );

            this.navigateTo(this.activity.step2Controller.route);
        }
    };
});

CS.Activities.IdentifyStrengths.Controllers.Step2 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {strengths: []};
        },

        render: function () {
            return (
                React.createElement("form", {role: "form", className: "how-well"}, 
                    React.createElement("p", null, "Hur väl stämmer det här in på dig?"), 

                    this.state.strengths.map(function (strength) {
                        return (
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", null, strength.name), 
                                React.createElement("input", {type: "range", min: "1", max: "4"})
                            )
                            );
                    }), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$rangeInputs = this.$form.find('[type="range"]');
        this.$goBackBtn = this.$form.find(".btn-default");
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.reactInstance.componentDidUpdate = function (prevProps, prevState) {
            this.initElements();
            this._initSliders();
        }.bind(this);

        this.onReRender();

        /* TODO
         var _this  = this;
         this.$sliders.each(function(index) {
         $(this).on("change", $.proxy(_this._displayCurrentSliderText, _this));
         }); */
    };

    c.onReRender = function () {
        this.reactInstance.replaceState({strengths: this.activity.model.account.data.strengths});
    };

    c._initSliders = function () {
        this.$sliders = this.$rangeInputs.slider({
            min: 1,
            max: 4,
            value: 3,
            tooltip: "always",
            formatter: function (num) {
                switch (num) {
                    case 1:
                        return "Sådär";
                    case 2:
                        return "Hyfsat";
                    case 3:
                        return "Ganska väl";
                    case 4:
                        return "Fullständigt";
                }
            }
        });
    };

    /* TODO
     c._displayCurrentSliderText = function(e) {

     }; */

    c._saveAndNavigateNext = function (e) {
        e.preventDefault();

        this.activity.model.account.data.strengths = this.activity.model.account.data.strengths.map(function (strength, index) {
            var howWellItApplies = parseInt($(this.$sliders[index]).val(), 10);

            return {
                "name": strength.name,
                "howWellItApplies": howWellItApplies
            };
        }.bind(this));

        this.navigateTo(this.activity.step3Controller.route);
    };
});

CS.Activities.IdentifyStrengths.Controllers.Step3 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {strengths: []};
        },

        render: function () {
            return (
                React.createElement("form", {role: "form", className: "how-well"}, 
                    React.createElement("p", null, "Hur viktiga är de här egenskaperna för arbetsgivaren och rollen du söker?"), 

                    this.state.strengths.map(function (strength) {
                        return (
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", null, strength.name), 
                                React.createElement("input", {type: "range", min: "1", max: "4"})
                            )
                            );
                    }), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$rangeInputs = this.$form.find('[type="range"]');
        this.$goBackBtn = this.$form.find(".btn-default");
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.reactInstance.componentDidUpdate = function (prevProps, prevState) {
            this.initElements();
            this._initSliders();
        }.bind(this);

        this.onReRender();
    };

    c.onReRender = function () {
        this.reactInstance.replaceState({strengths: this.activity.model.account.data.strengths});
    };

    c._initSliders = function () {
        this.$sliders = this.$rangeInputs.slider({
            min: 1,
            max: 4,
            value: 3,
            tooltip: "always",
            formatter: function (num) {
                switch (num) {
                    case 1:
                        return "Sådär";
                    case 2:
                        return "Viktigt";
                    case 3:
                        return "En stark fördel";
                    case 4:
                        return "Avgörande";
                }
            }
        });
    };

    c._saveAndNavigateNext = function (e) {
        e.preventDefault();

        this.activity.model.account.data.strengths = this.activity.model.account.data.strengths.map(function (strength, index) {
            var howImportantForEmployer = parseInt($(this.$sliders[index]).val(), 10);

            return {
                "name": strength.name,
                "howWellItApplies": strength.howWellItApplies,
                "howImportantForEmployer": howImportantForEmployer
            };
        }.bind(this));

        this.navigateTo(this.activity.step4Controller.route);
    };
});

CS.Activities.IdentifyStrengths.Controllers.Step4 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {strengths: []};
        },

        render: function () {
            return (
                React.createElement("div", null, 
                    React.createElement("p", null, "Toppen! Du har nu gjort en prioritering av dina starkaste egenskaper för din ansökan."), 

                    this.state.strengths.map(function (strength) {
                        return (
                            React.createElement("article", null, 
                                React.createElement("h2", null, strength.name), 
                                React.createElement("p", null, "Stämmer ", React.createElement("strong", null, this._howWellDoesItApplyFormatter(strength.howWellItApplies)), " in på dig och är ", React.createElement("strong", null, this._howImportantForEmployerformatter(strength.howImportantForEmployer)), " för jobbet.")
                            )
                            );
                    }.bind(this)), 

                    React.createElement("div", {className: "centered-contents"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "button", className: "btn btn-primary", "data-loading-text": "Sparar..."}, "Spara")
                    )
                )
                );
        },

        _howWellDoesItApplyFormatter: function (num) {
            switch (num) {
                case 1:
                    return "sådär";
                case 2:
                    return "hyfsat";
                case 3:
                    return "ganska väl";
                case 4:
                    return "fullständigt";
            }
        },

        _howImportantForEmployerformatter: function (num) {
            switch (num) {
                case 1:
                    return "sådär";
                case 2:
                    return "viktigt";
                case 3:
                    return "en stark fördel";
                case 4:
                    return "avgörande";
            }
        }
    });

    c.initElements = function () {
        this.$goBackBtn = this.$el.find(".btn-default");
        this.$submitBtn = this.$el.find(".btn-primary");
    };

    c.initEvents = function () {
        this.$goBackBtn.click($.proxy(this.navigateBack, this));
        this.$submitBtn.click($.proxy(this._handleSubmit, this));

        this.onReRender();
    };

    c.onReRender = function () {
        this.activity.model.account.data.strengths = CS.Models.Strength.sort(this.activity.model.account.data.strengths);
        this.reactInstance.replaceState({strengths: this.activity.model.account.data.strengths});

        // The submit button may still be in loading state when navigating back. We make sure it doesn't happen
        this.$submitBtn.button('reset');
    };

    c._handleSubmit = function (e) {
        this.$submitBtn.button('loading');

        this.postData();
    };
});

CS.Activities.SpecifyTop1Strength.Controllers.Intro = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            return (
                React.createElement("div", null, 
                    React.createElement("h1", null, "Stick ut från mängden"), 

                    React.createElement("p", null, "Visste du att de tre vanligast angivna egenskaperna i jobbansökningar är kreativ, analytisk och passionerad?"), 

                    React.createElement("p", null, "Vi använder ofta vaga termer när vi beskriver oss själva. Dessutom är egenskaperna som efterfrågas i jobbannonser" + ' ' +
                    "ofta ganska generiska eller tvetydigt formulerade."), 

                    React.createElement("p", null, "I den här övningen hjälper vi dig att definiera vad en specifik egenskap ennebär för just dig och hur den kan" + ' ' +
                    "tillämpas på din roll för att kunna påvisa värdet av den för din framtida arbetsgivare."), 

                    React.createElement("div", {className: "centered-contents"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "button", className: "btn btn-primary"}, "Sätt igång")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$goBackBtn = this.$el.find(".btn-default");
        this.$goNextStepBtn = this.$el.find(".btn-primary");
    };

    c.initEvents = function () {
        this.$goBackBtn.click($.proxy(this.navigateBack, this));
        this.$goNextStepBtn.click($.proxy(this._navigateNext, this));
    };

    c._navigateNext = function (e) {
        this.activity.model.account.data.strengths[0].specify = this.activity.model.account.data.strengths[0].specify || {};

        this.navigateTo(this.activity.step1Controller.route);
    };
});

CS.Activities.SpecifyTop1Strength.Controllers.Step1 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {strengthName: {}};
        },

        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("p", null, "Vi börjar med att specificera egenskapen lite mer. Vad betyder ", React.createElement("strong", null, this.state.strengthName), " för dig?"), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("textarea", {id: "what-this-strength-means", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$whatItMeansField = this.$form.find("#what-this-strength-means");
        this.$goBackBtn = this.$form.find(".btn-default");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "what-this-strength-means"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.onReRender();
    };

    c.onReRender = function () {
        this.reactInstance.replaceState({strengthName: this.activity.model.account.data.strengths[0].name});
    };

    c._saveAndNavigateNext = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.activity.model.account.data.strengths[0].specify.whatItMeans = this.$whatItMeansField.val().trim();

            this.navigateTo(this.activity.step2Controller.route);
        }
    };
});

CS.Activities.SpecifyTop1Strength.Controllers.Step2 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {whatItMeans: {}};
        },

        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("p", null, "Gör nu definitionen till din egen. På vilket sätt stämmer det här in på dig?"), 

                    React.createElement("p", {className: "well", dangerouslySetInnerHTML: {__html: this.state.whatItMeans}}), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("textarea", {id: "how-well-it-applies", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$howWellItAppliesField = this.$form.find("#how-well-it-applies");
        this.$goBackBtn = this.$form.find(".btn-default");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "how-well-it-applies"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.onReRender();
    };

    c.onReRender = function () {
        var whatItMeansAsHtml = CS.Services.String.textToHtml(this.activity.model.account.data.strengths[0].specify.whatItMeans);

        this.reactInstance.replaceState({whatItMeans: whatItMeansAsHtml});
    };

    c._saveAndNavigateNext = function(e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.activity.model.account.data.strengths[0].specify.howWellItApplies = this.$howWellItAppliesField.val().trim();

            this.navigateTo(this.activity.step3Controller.route);
        }
    };
});

CS.Activities.SpecifyTop1Strength.Controllers.Step3 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {data: {}};
        },

        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("p", {className: "well"}, "På vilket sätt kommer det att vara en styrka i rollen som ", React.createElement("strong", null, this.state.data.position), " på ", React.createElement("strong", null, this.state.data.employer), "?"), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("textarea", {id: "strength-for-position", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "submit", className: "btn btn-primary", "data-loading-text": "Sparar..."}, "Gå vidare")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$strengthForPositionField = this.$form.find("#strength-for-position");
        this.$goBackBtn = this.$form.find(".btn-default");
        this.$submitBtn =  this.$form.find(".btn-primary");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength-for-position"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.onReRender();
    };

    c.onReRender = function () {
        // The submit button may still be in loading state when navigating back. We make sure it doesn't happen
        this.$submitBtn.button('reset');

        this.reactInstance.replaceState({ data: {
            position: this.activity.model.account.data.Position,
            employer: this.activity.model.account.data.Employer
        }});
    };

    c._saveAndNavigateNext = function (e) {
        e.preventDefault();

        this.$submitBtn.button("loading");

        if (this.validator.isValid()) {
            this.activity.model.account.data.strengths[0].specify.strengthForPosition = this.$strengthForPositionField.val().trim();

            this.postData(function () {
                this.navigateTo(this.activity.step4Controller.route);
            }.bind(this));
        }
    };
});

CS.Activities.SpecifyTop1Strength.Controllers.Step4 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {data: {}};
        },

        render: function () {
            return (
                React.createElement("div", null, 
                    React.createElement("p", {className: "well"}, "Jättebra! Du har nu definierat hur just du är ", React.createElement("strong", null, this.state.data.strengthName), " och vilket värde det har för jobbet du söker."), 

                    React.createElement("h2", null, "Definition"), 

                    React.createElement("p", {className: "well", dangerouslySetInnerHTML: {__html: this.state.data.howWellItApplies}}), 

                    React.createElement("h2", null, "Värde"), 

                    React.createElement("p", {className: "well", dangerouslySetInnerHTML: {__html: this.state.data.strengthForPosition}}), 

                    React.createElement("div", {className: "centered-contents"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "button", className: "btn btn-primary"}, "Ok")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$goBackBtn = this.$el.find(".btn-default");
        this.$goNextStepBtn = this.$el.find(".btn-primary");
    };

    c.initEvents = function () {
        this.$goBackBtn.click($.proxy(this.navigateBack, this));
        this.$goNextStepBtn.click($.proxy(this._navigateHome, this));

        this.onReRender();
    };

    c.onReRender = function () {
        var strength = this.activity.model.account.data.strengths[0];

        var howWellItAppliesAsHtml = CS.Services.String.textToHtml(strength.specify.howWellItApplies);
        var strengthForPositionAsHtml = CS.Services.String.textToHtml(strength.specify.strengthForPosition);

        this.reactInstance.replaceState({ data: {
            strengthName: strength.name,
            howWellItApplies: howWellItAppliesAsHtml,
            strengthForPosition: strengthForPositionAsHtml
        }});
    };

    c._navigateHome = function (e) {
        this.navigateTo("");
    };
});

CS.Activities.SpecifyTop2Strength.Controllers.Intro = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            return (
                React.createElement("div", null, 
                    React.createElement("h1", null, "Stick ut från mängden"), 

                    React.createElement("p", null, "Visste du att de tre vanligast angivna egenskaperna i jobbansökningar är kreativ, analytisk och passionerad?"), 

                    React.createElement("p", null, "Vi använder ofta vaga termer när vi beskriver oss själva. Dessutom är egenskaperna som efterfrågas i jobbannonser" + ' ' +
                    "ofta ganska generiska eller tvetydigt formulerade."), 

                    React.createElement("p", null, "I den här övningen hjälper vi dig att definiera vad en specifik egenskap ennebär för just dig och hur den kan" + ' ' +
                    "tillämpas på din roll för att kunna påvisa värdet av den för din framtida arbetsgivare."), 

                    React.createElement("div", {className: "centered-contents"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "button", className: "btn btn-primary"}, "Sätt igång")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$goBackBtn = this.$el.find(".btn-default");
        this.$goNextStepBtn = this.$el.find(".btn-primary");
    };

    c.initEvents = function () {
        this.$goBackBtn.click($.proxy(this.navigateBack, this));
        this.$goNextStepBtn.click($.proxy(this._navigateNext, this));
    };

    c._navigateNext = function (e) {
        this.activity.model.account.data.strengths[1].specify = this.activity.model.account.data.strengths[1].specify || {};

        this.navigateTo(this.activity.step1Controller.route);
    };
});

CS.Activities.SpecifyTop2Strength.Controllers.Step1 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {strengthName: {}};
        },

        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("p", null, "Vi börjar med att specificera egenskapen lite mer. Vad betyder ", React.createElement("strong", null, this.state.strengthName), " för dig?"), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("textarea", {id: "what-this-strength-means", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$whatItMeansField = this.$form.find("#what-this-strength-means");
        this.$goBackBtn = this.$form.find(".btn-default");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "what-this-strength-means"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.onReRender();
    };

    c.onReRender = function () {
        this.reactInstance.replaceState({strengthName: this.activity.model.account.data.strengths[1].name});
    };

    c._saveAndNavigateNext = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.activity.model.account.data.strengths[1].specify.whatItMeans = this.$whatItMeansField.val().trim();

            this.navigateTo(this.activity.step2Controller.route);
        }
    };
});

CS.Activities.SpecifyTop2Strength.Controllers.Step2 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {whatItMeans: {}};
        },

        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("p", null, "Gör nu definitionen till din egen. På vilket sätt stämmer det här in på dig?"), 

                    React.createElement("p", {className: "well", dangerouslySetInnerHTML: {__html: this.state.whatItMeans}}), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("textarea", {id: "how-well-it-applies", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$howWellItAppliesField = this.$form.find("#how-well-it-applies");
        this.$goBackBtn = this.$form.find(".btn-default");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "how-well-it-applies"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.onReRender();
    };

    c.onReRender = function () {
        var whatItMeansAsHtml = CS.Services.String.textToHtml(this.activity.model.account.data.strengths[1].specify.whatItMeans);

        this.reactInstance.replaceState({whatItMeans: whatItMeansAsHtml});
    };

    c._saveAndNavigateNext = function(e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.activity.model.account.data.strengths[1].specify.howWellItApplies = this.$howWellItAppliesField.val().trim();

            this.navigateTo(this.activity.step3Controller.route);
        }
    };
});

CS.Activities.SpecifyTop2Strength.Controllers.Step3 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {data: {}};
        },

        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("p", {className: "well"}, "På vilket sätt kommer det att vara en styrka i rollen som ", React.createElement("strong", null, this.state.data.position), " på ", React.createElement("strong", null, this.state.data.employer), "?"), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("textarea", {id: "strength-for-position", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$strengthForPositionField = this.$form.find("#strength-for-position");
        this.$goBackBtn = this.$form.find(".btn-default");
        this.$submitBtn =  this.$form.find(".btn-primary");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength-for-position"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.onReRender();
    };

    c.onReRender = function () {
        // The submit button may still be in loading state when navigating back. We make sure it doesn't happen
        this.$submitBtn.button('reset');

        this.reactInstance.replaceState({ data: {
            position: this.activity.model.account.data.Position,
            employer: this.activity.model.account.data.Employer
        }});
    };

    c._saveAndNavigateNext = function (e) {
        e.preventDefault();

        this.$submitBtn.button("loading");

        if (this.validator.isValid()) {
            this.activity.model.account.data.strengths[1].specify.strengthForPosition = this.$strengthForPositionField.val().trim();

            this.postData(function () {
                this.navigateTo(this.activity.step4Controller.route);
            }.bind(this));
        }
    };
});

CS.Activities.SpecifyTop2Strength.Controllers.Step4 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {data: {}};
        },

        render: function () {
            return (
                React.createElement("div", null, 
                    React.createElement("p", {className: "well"}, "Jättebra! Du har nu definierat hur just du är ", React.createElement("strong", null, this.state.data.strengthName), " och vilket värde det har för jobbet du söker."), 

                    React.createElement("h2", null, "Definition"), 

                    React.createElement("p", {className: "well", dangerouslySetInnerHTML: {__html: this.state.data.howWellItApplies}}), 

                    React.createElement("h2", null, "Värde"), 

                    React.createElement("p", {className: "well", dangerouslySetInnerHTML: {__html: this.state.data.strengthForPosition}}), 

                    React.createElement("div", {className: "centered-contents"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "button", className: "btn btn-primary"}, "Ok")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$goBackBtn = this.$el.find(".btn-default");
        this.$goNextStepBtn = this.$el.find(".btn-primary");
    };

    c.initEvents = function () {
        this.$goBackBtn.click($.proxy(this.navigateBack, this));
        this.$goNextStepBtn.click($.proxy(this._navigateHome, this));

        this.onReRender();
    };

    c.onReRender = function () {
        var strength = this.activity.model.account.data.strengths[1];

        var howWellItAppliesAsHtml = CS.Services.String.textToHtml(strength.specify.howWellItApplies);
        var strengthForPositionAsHtml = CS.Services.String.textToHtml(strength.specify.strengthForPosition);

        this.reactInstance.replaceState({ data: {
            strengthName: strength.name,
            howWellItApplies: howWellItAppliesAsHtml,
            strengthForPosition: strengthForPositionAsHtml
        }});
    };

    c._navigateHome = function (e) {
        this.navigateTo("");
    };
});

CS.Activities.SpecifyTop3Strength.Controllers.Intro = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            return (
                React.createElement("div", null, 
                    React.createElement("h1", null, "Stick ut från mängden"), 

                    React.createElement("p", null, "Visste du att de tre vanligast angivna egenskaperna i jobbansökningar är kreativ, analytisk och passionerad?"), 

                    React.createElement("p", null, "Vi använder ofta vaga termer när vi beskriver oss själva. Dessutom är egenskaperna som efterfrågas i jobbannonser" + ' ' +
                    "ofta ganska generiska eller tvetydigt formulerade."), 

                    React.createElement("p", null, "I den här övningen hjälper vi dig att definiera vad en specifik egenskap ennebär för just dig och hur den kan" + ' ' +
                    "tillämpas på din roll för att kunna påvisa värdet av den för din framtida arbetsgivare."), 

                    React.createElement("div", {className: "centered-contents"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "button", className: "btn btn-primary"}, "Sätt igång")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$goBackBtn = this.$el.find(".btn-default");
        this.$goNextStepBtn = this.$el.find(".btn-primary");
    };

    c.initEvents = function () {
        this.$goBackBtn.click($.proxy(this.navigateBack, this));
        this.$goNextStepBtn.click($.proxy(this._navigateNext, this));
    };

    c._navigateNext = function (e) {
        this.activity.model.account.data.strengths[2].specify = this.activity.model.account.data.strengths[2].specify || {};

        this.navigateTo(this.activity.step1Controller.route);
    };
});

CS.Activities.SpecifyTop3Strength.Controllers.Step1 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {strengthName: {}};
        },

        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("p", null, "Vi börjar med att specificera egenskapen lite mer. Vad betyder ", React.createElement("strong", null, this.state.strengthName), " för dig?"), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("textarea", {id: "what-this-strength-means", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$whatItMeansField = this.$form.find("#what-this-strength-means");
        this.$goBackBtn = this.$form.find(".btn-default");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "what-this-strength-means"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.onReRender();
    };

    c.onReRender = function () {
        this.reactInstance.replaceState({strengthName: this.activity.model.account.data.strengths[2].name});
    };

    c._saveAndNavigateNext = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.activity.model.account.data.strengths[2].specify.whatItMeans = this.$whatItMeansField.val().trim();

            this.navigateTo(this.activity.step2Controller.route);
        }
    };
});

CS.Activities.SpecifyTop3Strength.Controllers.Step2 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {whatItMeans: {}};
        },

        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("p", null, "Gör nu definitionen till din egen. På vilket sätt stämmer det här in på dig?"), 

                    React.createElement("p", {className: "well", dangerouslySetInnerHTML: {__html: this.state.whatItMeans}}), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("textarea", {id: "how-well-it-applies", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$howWellItAppliesField = this.$form.find("#how-well-it-applies");
        this.$goBackBtn = this.$form.find(".btn-default");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "how-well-it-applies"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.onReRender();
    };

    c.onReRender = function () {
        var whatItMeansAsHtml = CS.Services.String.textToHtml(this.activity.model.account.data.strengths[2].specify.whatItMeans);

        this.reactInstance.replaceState({whatItMeans: whatItMeansAsHtml});
    };

    c._saveAndNavigateNext = function(e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.activity.model.account.data.strengths[2].specify.howWellItApplies = this.$howWellItAppliesField.val().trim();

            this.navigateTo(this.activity.step3Controller.route);
        }
    };
});

CS.Activities.SpecifyTop3Strength.Controllers.Step3 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {data: {}};
        },

        render: function () {
            return (
                React.createElement("form", {role: "form"}, 
                    React.createElement("p", {className: "well"}, "På vilket sätt kommer det att vara en styrka i rollen som ", React.createElement("strong", null, this.state.data.position), " på ", React.createElement("strong", null, this.state.data.employer), "?"), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("textarea", {id: "strength-for-position", className: "form-control"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "submit-wrapper"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Gå vidare")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$strengthForPositionField = this.$form.find("#strength-for-position");
        this.$goBackBtn = this.$form.find(".btn-default");
        this.$submitBtn =  this.$form.find(".btn-primary");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength-for-position"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.onReRender();
    };

    c.onReRender = function () {
        // The submit button may still be in loading state when navigating back. We make sure it doesn't happen
        this.$submitBtn.button('reset');

        this.reactInstance.replaceState({ data: {
            position: this.activity.model.account.data.Position,
            employer: this.activity.model.account.data.Employer
        }});
    };

    c._saveAndNavigateNext = function (e) {
        e.preventDefault();

        this.$submitBtn.button("loading");

        if (this.validator.isValid()) {
            this.activity.model.account.data.strengths[2].specify.strengthForPosition = this.$strengthForPositionField.val().trim();

            this.postData(function () {
                this.navigateTo(this.activity.step4Controller.route);
            }.bind(this));
        }
    };
});

CS.Activities.SpecifyTop3Strength.Controllers.Step4 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {data: {}};
        },

        render: function () {
            return (
                React.createElement("div", null, 
                    React.createElement("p", {className: "well"}, "Jättebra! Du har nu definierat hur just du är ", React.createElement("strong", null, this.state.data.strengthName), " och vilket värde det har för jobbet du söker."), 

                    React.createElement("h2", null, "Definition"), 

                    React.createElement("p", {className: "well", dangerouslySetInnerHTML: {__html: this.state.data.howWellItApplies}}), 

                    React.createElement("h2", null, "Värde"), 

                    React.createElement("p", {className: "well", dangerouslySetInnerHTML: {__html: this.state.data.strengthForPosition}}), 

                    React.createElement("div", {className: "centered-contents"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, "Tillbaka"), 
                        React.createElement("button", {type: "button", className: "btn btn-primary"}, "Ok")
                    )
                )
                );
        }
    });

    c.initElements = function () {
        this.$goBackBtn = this.$el.find(".btn-default");
        this.$goNextStepBtn = this.$el.find(".btn-primary");
    };

    c.initEvents = function () {
        this.$goBackBtn.click($.proxy(this.navigateBack, this));
        this.$goNextStepBtn.click($.proxy(this._navigateHome, this));

        this.onReRender();
    };

    c.onReRender = function () {
        var strength = this.activity.model.account.data.strengths[2];

        var howWellItAppliesAsHtml = CS.Services.String.textToHtml(strength.specify.howWellItApplies);
        var strengthForPositionAsHtml = CS.Services.String.textToHtml(strength.specify.strengthForPosition);

        this.reactInstance.replaceState({ data: {
            strengthName: strength.name,
            howWellItApplies: howWellItAppliesAsHtml,
            strengthForPosition: strengthForPositionAsHtml
        }});
    };

    c._navigateHome = function (e) {
        this.navigateTo("");
    };
});

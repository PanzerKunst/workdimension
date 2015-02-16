CS.Standouts.Strengths.Controllers.Details = P(CS.Controllers.OnePageWebapp, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            return (
                React.createElement("div", null, 
                    React.createElement("h1", null, this.props.strengthName), 

                    React.createElement("article", {className: "well"}, 
                        React.createElement("p", null, "Snyggt! Styrkan är nu mer än bara ett ord. Här är hur du har beskrivit den:"), 

                        React.createElement("p", null, 
                            React.createElement("em", {dangerouslySetInnerHTML: {__html: this.props.howWellItApplies}})
                        )
                    ), 

                    React.createElement("article", {className: "well"}, 
                        React.createElement("p", null, "Bra! Du visat hur den här styrkan kan påverka företaget på ett positivt sätt. Här är vad du har kommit fram till:"), 

                        React.createElement("p", null, 
                            React.createElement("em", {dangerouslySetInnerHTML: {__html: this.props.strengthForPosition}})
                        )
                    ), 

                    React.createElement("div", {className: "centered-contents"}, 
                        React.createElement("button", {type: "button", className: "btn btn-primary"}, 
                            React.createElement("span", {className: "glyphicon glyphicon-chevron-left", "aria-hidden": "true"}), 
                        "Tillbaka"), 
                        React.createElement("button", {type: "button", className: "btn btn-default"}, 
                            React.createElement("span", {className: "glyphicon glyphicon-repeat", "aria-hidden": "true"}), 
                        "Gör om aktiviteten"), 
                        React.createElement("button", {type: "button", className: "btn btn-warning", "data-loading-text": "Tar bort..."}, 
                            React.createElement("span", {className: "glyphicon glyphicon-trash", "aria-hidden": "true"}), 
                        "Ta bort styrkan")
                    )
                )
                );
        }
    });

    c.init = function (route, standout) {
        this.route = route;
        this.standout = standout;

        this.$el = $("#standout-detail");
    };

    c.render = function () {
        // TODO: FIX - this if statement shouldn't be necessary, as this.standout.detailData should always exist
        // Maybe linked to https://github.com/EngineeringMode/Grapnel.js/issues/26
        if (this.standout.detailData) {
            console.log("this.standout.detailData NOT NULL");

            var strength = this.standout.detailData.strength;

            var reactData = {
                strengthName: strength.name,
                howWellItApplies: CS.Services.String.textToHtml(strength.specify.howWellItApplies),
                strengthForPosition: CS.Services.String.textToHtml(strength.specify.strengthForPosition)
            };

            // This is to avoid duplicate event bindings - TODO, and probably linked to https://github.com/EngineeringMode/Grapnel.js/issues/26
            this.$el.empty();

            this.reactInstance = React.render(
                React.createElement(this.reactClass, reactData),
                this.$el[0]
            );

            this._initElements();
            this._initEvents();

            $("#standout-list").hide();
            this.$el.show();
        } else {
            console.log("this.standout.detailData NULL");
        }
    };

    c._initElements = function () {
        // TODO: avoid duplication in the inList controller
        this.$headerNav = $('[role="navigation"]');
        this.$activitiesTab = this.$headerNav.find("#activities-tab");

        this.$tabPanels = $('[role="tabpanel"]');
        this.$activitiesPanel = this.$tabPanels.filter("#activities");

        this.$goBackBtn = this.$el.find(".btn-primary");
        this.$redoActivityBtn = this.$el.find(".btn-default");
        this.$removeStrengthBtn = this.$el.find(".btn-warning");
    };

    c._initEvents = function () {
        this.$goBackBtn.click($.proxy(this.navigateBack, this));
        this.$redoActivityBtn.click($.proxy(this._activateActivitiesTabAndNavigateToActivity, this));
        this.$removeStrengthBtn.click($.proxy(this._removeStrengthAndNavigateBack, this));
    };

    c._activateActivitiesTabAndNavigateToActivity = function(e) {
        this.navigateTo("activities/SpecifyTop" + (this.standout.detailData.strengthIndex + 1) + "Strength");

        this.$tabPanels.removeClass("active");
        this.$activitiesTab.tab('show');
        this.$activitiesPanel.addClass("active");
        $("#c1-and-activity-feed").hide();
        $("#current-activity").show();
    };

    c._removeStrengthAndNavigateBack = function () {
        var accountData = _.clone(CS.account.data, true);

        accountData.strengths.splice(this.standout.detailData.strengthIndex, 1);

        this.$removeStrengthBtn.button('loading');

        var type = "POST";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            contentType: "application/json",
            data: JSON.stringify(accountData),
            success: function (data, textStatus, jqXHR) {
                CS.account.data = accountData;
                this.navigateBack();
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                this.$removeStrengthBtn.button('reset');
                alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
            }.bind(this)
        });
    };
});

CS.Standouts.Strengths.Controllers.InList = P(CS.Controllers.OnePageWebapp, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            var employerAndPosition;
            if (this.props.employer && this.props.position) {
                employerAndPosition = (
                    React.createElement("h1", null, this.props.position, " på ", this.props.employer)
                    );
            }

            var sections = this.props.strengths.map(function (strength) {
                if (strength.specify) {
                    return [(
                        React.createElement("section", {className: "section-top with-specify"}, 
                            React.createElement("h2", null, strength.name), 
                            React.createElement("button", {className: "btn btn-default btn-xs"}, "Detaljer")
                        )
                        ), (
                        React.createElement("section", {className: "section-bottom"}, 
                            React.createElement("span", {className: "glyphicon glyphicon-ok", "aria-hidden": "true"}), 
                            React.createElement("span", null, "Definition"), 
                            React.createElement("span", {className: "glyphicon glyphicon-ok", "aria-hidden": "true"}), 
                            React.createElement("span", null, "Värde")
                        )
                        )];
                } else {
                    return [(
                        React.createElement("section", {className: "section-top"}, 
                            React.createElement("h2", null, strength.name)
                        )
                        ), (
                        React.createElement("section", {className: "section-bottom centered-contents"}, 
                            React.createElement("button", {className: "btn btn-primary"}, "Börja utforska")
                        )
                        )];
                }
            });

            return _.isEmpty(this.props.strengths) ?
                (
                    React.createElement("div", null)
                    ) : (
                React.createElement("div", null, 
                    employerAndPosition, 

                    React.createElement("p", null, "Detta är dina främsta styrkor för rollen."), 

                    sections.map(function (section, index) {
                        return (React.createElement("article", {"data-strength-index": index}, section));
                    })
                )
                );
        }
    });

    c.init = function (standout) {
        this.standout = standout;

        this.$el = $("#" + this.standout.className);

        this.render();
    };

    c.render = function () {
        this.strengths = CS.account.data && !_.isEmpty(CS.account.data.strengths) ?
            CS.account.data.strengths :
            [];

        var data = {
            employer: CS.account.data && CS.account.data.Employer,
            position: CS.account.data && CS.account.data.Position,
            strengths: this.strengths
        };

        // This is to avoid duplicate event bindings - TODO, and probably linked to https://github.com/EngineeringMode/Grapnel.js/issues/26
        this.$el.empty();

        this.reactInstance = React.render(
            React.createElement(this.reactClass, data),
            this.$el[0]
        );

        this._initElements();
        this._initEvents();
    };

    c._initElements = function () {
        this.$headerNav = $('[role="navigation"]');
        this.$activitiesTab = this.$headerNav.find("#activities-tab");

        this.$tabPanels = $('[role="tabpanel"]');
        this.$activitiesPanel = this.$tabPanels.filter("#activities");

        this.$detailsBtn = this.$el.find(".btn-xs");
        this.$startExploringBtn = this.$el.find(".btn-primary");
    };

    c._initEvents = function () {
        this.$detailsBtn.click($.proxy(this._showDetails, this));
        this.$startExploringBtn.click($.proxy(this._activateActivitiesTabAndNavigateToActivity, this));
    };

    c._showDetails = function (e) {
        var $article = $(e.currentTarget).parent().parent();

        var strengthIndex = parseInt($article.data("strength-index"), 10);

        this.standout.detailData = {
            strengthIndex: strengthIndex,
            strength: this.strengths[strengthIndex]
        };

        this.navigateTo(this.standout.detailsController.route);
    };

    c._activateActivitiesTabAndNavigateToActivity = function(e) {
        var $article = $(e.currentTarget).parent().parent();

        var sortedStrengthIndex = parseInt($article.data("strength-index"), 10);

        this.navigateTo("activities/SpecifyTop" + (sortedStrengthIndex + 1) + "Strength");

        this.$tabPanels.removeClass("active");
        this.$activitiesTab.tab('show');
        this.$activitiesPanel.addClass("active");
        $("#c1-and-activity-feed").hide();
        $("#current-activity").show();
    };
});

CS.Standouts.Custom = P(function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            return (
                React.createElement("div", null, 
                    React.createElement("h2", null, this.props.title), 
                    React.createElement("p", null, this.props.data)
                )
                );
        }
    });

    c.init = function (className, title) {
        this.className = className;
        this.title = title;
    };

    c.render = function () {
        var data = null;

        if (CS.account.data && CS.account.data.custom) {
            data = CS.account.data.custom[this.className];
        }

        this.reactInstance = React.render(
            React.createElement(this.reactClass, {
                title: this.title,
                data: data
            }),
            document.getElementById(this.className)
        );
    };

    c.run = function() {
        this.render();
    };
});

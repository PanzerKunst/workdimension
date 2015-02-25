CS.Standouts = {};
;CS.Standouts.Strengths = P(function (c) {
    c.init = function (className) {
        this.className = className;

        this.detailsController = CS.Standouts.Strengths.Controllers.Details("standouts/" + this.className + "/details", this);

        CS.router.get(this.detailsController.route, function () {
            this.detailsController.render();
        }.bind(this));
    };

    c.run = function() {
        CS.Standouts.Strengths.Controllers.InList(this);
    };
});

CS.Standouts.Strengths.Controllers = {};
;CS.Standouts.Strengths.Controllers.Details = P(CS.Controllers.OnePageWebapp, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            return (
                React.createElement("div", null, 
                    React.createElement("div", {className: "modal fade"}, 
                        React.createElement("div", {className: "modal-dialog"}, 
                            React.createElement("div", {className: "modal-content"}, 
                                React.createElement("div", {className: "modal-body"}, 
                                    React.createElement("p", null, "Ta bort styrka ", React.createElement("strong", null, this.props.strengthName), "?")
                                ), 
                                React.createElement("div", {className: "modal-footer"}, 
                                    React.createElement("button", {type: "button", className: "btn btn-default", "data-dismiss": "modal"}, "Cancel"), 
                                    React.createElement("button", {type: "button", className: "btn btn-primary js-confirm-delete", "data-loading-text": "Tar bort..."}, "Ta bort styrkan")
                                )
                            )
                        )
                    ), 

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
                        React.createElement("button", {type: "button", className: "btn btn-primary js-go-back"}, 
                            React.createElement("span", {className: "glyphicon glyphicon-chevron-left", "aria-hidden": "true"}), 
                        "Tillbaka"), 
                        React.createElement("button", {type: "button", className: "btn btn-default js-redo-activity"}, 
                            React.createElement("span", {className: "glyphicon glyphicon-pencil", "aria-hidden": "true"}), 
                        "Redigera"), 
                        React.createElement("button", {type: "button", className: "btn btn-warning"}, 
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
        if (this.standout.detailData && this.standout.detailData.strength && this.standout.detailData.strength.specify) {
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
        this.$headerNav = $("[role='navigation']");
        this.$activitiesTab = this.$headerNav.find("#activities-tab");

        this.$tabPanels = $("[role='tabpanel']");
        this.$activitiesPanel = this.$tabPanels.filter("#activit1es");

        this.$goBackBtn = this.$el.find(".js-go-back");
        this.$redoActivityBtn = this.$el.find(".js-redo-activity");
        this.$removeStrengthBtn = this.$el.find(".btn-warning");

        this.$modal = this.$el.find(".modal");
        this.$confirmDeleteBtn = this.$modal.find(".js-confirm-delete");
    };

    c._initEvents = function () {
        this.$goBackBtn.click($.proxy(this.navigateBack, this));
        this.$redoActivityBtn.click($.proxy(this._activateActivitiesTabAndNavigateToActivity, this));
        this.$removeStrengthBtn.click($.proxy(this._showDeletePopup, this));
        this.$confirmDeleteBtn.click($.proxy(this._removeStrengthAndNavigateBack, this));
    };

    c._activateActivitiesTabAndNavigateToActivity = function() {
        this.navigateTo("activities/SpecifyTop" + (this.standout.detailData.strengthIndex + 1) + "Strength");

        this.$tabPanels.removeClass("active");
        this.$activitiesTab.tab("show");
        this.$activitiesPanel.addClass("active");
        $("#c1-and-activity-feed").hide();
        $("#current-activity").show();
    };

    c._showDeletePopup = function() {
        this.$modal.modal();
    };

    c._removeStrengthAndNavigateBack = function () {
        var accountData = _.clone(CS.account.data, true);

        accountData.strengths.splice(this.standout.detailData.strengthIndex, 1);

        this.$confirmDeleteBtn.button("loading");

        var type = "POST";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            contentType: "application/json",
            data: JSON.stringify(accountData),
            success: function () {
                CS.account.data = accountData;
                this.navigateBack();
            }.bind(this),
            error: function () {
                this.$confirmDeleteBtn.button("reset");
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }.bind(this)
        });
    };
});

CS.Standouts.Strengths.Controllers.InList = P(CS.Controllers.OnePageWebapp, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
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
                            React.createElement("button", {className: "btn btn-primary btn-xs"}, "Börja utforska")
                        )
                        )];
                }
            });

            return _.isEmpty(this.props.strengths) ? (
                    React.createElement("h3", null, "Gör styrka aktiviteter för att få insikter!")
                    ) : (
                React.createElement("div", null, 
                    React.createElement("div", {className: "alert alert-info"}, 
                        React.createElement("button", {type: "button", className: "close", "data-dismiss": "alert", "aria-label": "Close"}, 
                            React.createElement("span", {"aria-hidden": "true"}, "×")
                        ), 

                        React.createElement("h2", null, "Styrkor"), 

                        React.createElement("p", null, "Alla styrkor som du har hittat sparas här."), 

                        React.createElement("p", null, "Varje styrka har ett kort som kan öppnas upp för att visa hur du har definierat styrkan och vilket värde den kan tillföra föreget."), 

                        React.createElement("p", null, "Om styrkan har hittats men inte definierats så sparas den också här så du ser vad du ska jobba vidare med!")
                    ), 

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
            _.take(CS.account.data.strengths, 3) :
            [];

        var data = {strengths: this.strengths};

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
        this.$headerNav = $("[role='navigation']");
        this.$activitiesTab = this.$headerNav.find("#activities-tab");

        this.$tabPanels = $("[role='tabpanel']");
        this.$activitiesPanel = this.$tabPanels.filter("#activit1es");

        this.$alert = this.$el.find(".alert");

        this.$detailsBtn = this.$el.find(".btn-xs");
        this.$startExploringBtn = this.$el.find(".btn-primary");

        this._displayAlertIfNeverClosed();
    };

    c._initEvents = function () {
        this.$alert.on("close.bs.alert", $.proxy(this._onAlertClose, this));
        this.$detailsBtn.click($.proxy(this._showDetails, this));
        this.$startExploringBtn.click($.proxy(this._activateActivitiesTabAndNavigateToActivity, this));
    };

    c._displayAlertIfNeverClosed = function() {
        if (!this.getFromLocalStorage("is-strengths-explanation-alert-closed")) {
            CS.Services.Animator.fadeIn(this.$alert);
        }
    };

    c._onAlertClose = function(e) {
        e.preventDefault();

        CS.Services.Animator.fadeOut(this.$alert);
        this.saveInLocalStorage("is-strengths-explanation-alert-closed", true);
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

    c._activateActivitiesTabAndNavigateToActivity = function (e) {
        var $article = $(e.currentTarget).parent().parent();

        var sortedStrengthIndex = parseInt($article.data("strength-index"), 10);

        this.navigateTo("activities/SpecifyTop" + (sortedStrengthIndex + 1) + "Strength");

        this.$tabPanels.removeClass("active");
        this.$activitiesTab.tab("show");
        this.$activitiesPanel.addClass("active");
    };
});

CS.Standouts.Custom = P(function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            return (
                React.createElement("div", {className: "well"}, 
                    React.createElement("h2", null, this.props.title), 
                    React.createElement("p", {dangerouslySetInnerHTML: {__html: this.props.data}})
                )
                );
        }
    });

    c.init = function (className, title) {
        this.className = className;
        this.title = title;
    };

    c.run = function () {
        var data = null;

        if (CS.account.data && CS.account.data.custom && CS.account.data.custom[this.className]) {
            data = CS.Services.String.textToHtml(CS.account.data.custom[this.className]);

            this._render(data);
        }
    };

    c._render = function (data) {
        this.reactInstance = React.render(
            React.createElement(this.reactClass, {
                title: this.title,
                data: data
            }),
            document.getElementById(this.className)
        );
    };
});

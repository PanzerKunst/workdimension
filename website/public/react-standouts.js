CS.Standouts.Strengths.Controllers.Details = P(function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            return (
                React.createElement("div", null, 
                    "Details"
                )
                );
        }
    });

    c.init = function (route) {
        this.route = route;
    };

    c.render = function () {
        var data = {
        };

        this.reactInstance = React.render(
            React.createElement(this.reactClass, data),
            document.getElementById("standout-detail")
        );

        $("#standout-list").hide();
        $("#standout-detail").show();
    };
});

CS.Standouts.Strengths.Controllers.InList = P(function (c) {
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
                        React.createElement("section", {className: "section-bottom"}, 
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

                    sections.map(function (section) {
                        return (React.createElement("article", null, section));
                    })
                )
                );
        }
    });

    c.init = function (className, detailsController) {
        this.detailsController = detailsController;

        this.$el = $("#" + className);

        this.render(className);
    };

    c.render = function (className) {
        var data = {
            employer: CS.account.data && CS.account.data.Employer,
            position: CS.account.data && CS.account.data.Position,
            strengths: CS.account.data && CS.account.data.strengths ?
                CS.Models.Strength.sort(CS.account.data.strengths) :
                []
        };

        this.reactInstance = React.render(
            React.createElement(this.reactClass, data),
            document.getElementById(className)
        );

        this._initElements();
        this._initEvents();
    };

    c._initElements = function () {
        this.$detailsBtn = this.$el.find(".btn-xs");
    };

    c._initEvents = function () {
        this.$detailsBtn.click($.proxy(this._showDetails, this));
    };

    c._showDetails = function () {
        location.hash = this.detailsController.route;
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

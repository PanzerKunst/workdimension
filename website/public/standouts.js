CS.Standouts = {};

CS.Standouts.Base = P(function (c) {
    c.init = function (className) {
        this.className = className;
    };

    c.render = function (data) {
        this.reactInstance = React.render(
            React.createElement(this.reactClass, data),
            document.getElementById(this.className)
        );
    };
});
;CS.Standouts.Custom = P(CS.Standouts.Base, function (c, base) {
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
        base.init.call(this, className);

        this.title = title;
    };

    c.render = function () {
        var data = null;

        if (CS.account.data && CS.account.data.custom) {
            data = CS.account.data.custom[this.className];
        }

        base.render.call(this, {
            title: this.title,
            data: data
        });
    };
});

CS.Standouts.Strengths = P(CS.Standouts.Base, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            var employerAndPosition;
            if (this.props.employer && this.props.position) {
                employerAndPosition = (
                    React.createElement("h1", null, this.props.position, " på ", this.props.employer)
                    );
            }

            var sections = this.props.strengths.map(function (strength) {
                if (strength.specify) {
                    return [(
                        React.createElement("section", {className: "section-top with-specify"}, 
                            React.createElement("h2", null, strength.name), 
                            React.createElement("span", {className: "glyphicon glyphicon-eye-open", "aria-hidden": "true"})
                        )
                        ), (
                        React.createElement("section", {className: "section-bottom"}, 
                            React.createElement("span", null, 
                                React.createElement("span", {className: "glyphicon glyphicon-ok", "aria-hidden": "true"}), 
                            "Definition"), 
                            React.createElement("span", null, 
                                React.createElement("span", {className: "glyphicon glyphicon-ok", "aria-hidden": "true"}), 
                            "Värde")
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

            return (
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

    c.init = function (className) {
        base.init.call(this, className);
    };

    c.render = function () {
        var data = {
            employer: CS.account.data.Employer,
            position: CS.account.data.Position,
            strengths: CS.account.data && CS.account.data.strengths ?
                CS.Models.Strength.sort(CS.account.data.strengths) :
                null
        };

        base.render.call(this, data);
    };
});

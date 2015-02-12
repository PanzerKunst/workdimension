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

        if (CS.accountData && CS.accountData.custom) {
            data = CS.accountData.custom[this.className];
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
            var listItemStrength1, listItemStrength2, listItemStrength3, listItemStrength4, listItemStrength5, listItemStrength6;

            if (this.props.strength1) {
                listItemStrength1 = (
                    React.createElement("li", null, this.props.strength1)
                    );
            }
            if (this.props.strength2) {
                listItemStrength2 = (
                    React.createElement("li", null, this.props.strength2)
                    );
            }
            if (this.props.strength3) {
                listItemStrength3 = (
                    React.createElement("li", null, this.props.strength3)
                    );
            }
            if (this.props.strength4) {
                listItemStrength4 = (
                    React.createElement("li", null, this.props.strength4)
                    );
            }
            if (this.props.strength5) {
                listItemStrength5 = (
                    React.createElement("li", null, this.props.strength5)
                    );
            }
            if (this.props.strength6) {
                listItemStrength6 = (
                    React.createElement("li", null, this.props.strength6)
                    );
            }

            return (
                React.createElement("div", null, 
                    React.createElement("h2", null, "My strengths"), 
                    React.createElement("ul", null, 
                        listItemStrength1, 
                        listItemStrength2, 
                        listItemStrength3, 
                        listItemStrength4, 
                        listItemStrength5, 
                        listItemStrength6
                    )
                )
                );
        }
    });

    c.init = function (className) {
        base.init.call(this, className);
    };

    c.render = function () {
        var data = CS.accountData ? CS.accountData.strengths : null;

        base.render.call(this, data);
    };
});

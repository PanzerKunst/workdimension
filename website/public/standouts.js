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

    c.init = function (className, title, accountDataKey) {
        base.init.call(this, className);

        this.className = className;
        this.title = title;
        this.accountDataKey = accountDataKey;
    };

    c.render = function () {
        base.render.call(this, {
            title: this.title,
            data: CS.accountData.custom[this.accountDataKey]
        });
    };
});

CS.Standouts.Strengths = P(CS.Standouts.Base, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        render: function () {
            var listItemStrenght1, listItemStrenght2, listItemStrenght3, listItemStrenght4, listItemStrenght5, listItemStrenght6;

            if (this.props.strength1) {
                listItemStrenght1 = (
                    React.createElement("li", null, this.props.strength1)
                    );
            }
            if (this.props.strength2) {
                listItemStrenght2 = (
                    React.createElement("li", null, this.props.strength2)
                    );
            }
            if (this.props.strength3) {
                listItemStrenght3 = (
                    React.createElement("li", null, this.props.strength3)
                    );
            }
            if (this.props.strength4) {
                listItemStrenght4 = (
                    React.createElement("li", null, this.props.strength4)
                    );
            }
            if (this.props.strength5) {
                listItemStrenght5 = (
                    React.createElement("li", null, this.props.strength5)
                    );
            }
            if (this.props.strength6) {
                listItemStrenght6 = (
                    React.createElement("li", null, this.props.strength6)
                    );
            }

            return (
                React.createElement("div", null, 
                    React.createElement("h2", null, "My strengths"), 
                    React.createElement("ul", null, 
                        listItemStrenght1, 
                        listItemStrenght2, 
                        listItemStrenght3, 
                        listItemStrenght4, 
                        listItemStrenght5, 
                        listItemStrenght6
                    )
                )
                );
        }
    });

    c.init = function (className) {
        base.init.call(this, className);
    };

    c.render = function () {
        base.render.call(this, CS.accountData.strengths);
    };
});

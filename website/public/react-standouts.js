CS.Standouts.Custom = P(CS.Standouts.Base, function (c, base) {
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
            var titleContent = this.props.email ? this.props.email : "Anonymous user";

            return (
                React.createElement("div", null, 
                    React.createElement("h2", null, titleContent)
                )
                );
        }
    });

    c.init = function (className) {
        base.init.call(this, className);
    };

    c.render = function () {
        var data = {
            email: CS.account.email,
            strengths: CS.account.data && CS.account.data.strengths ? CS.account.data.strengths.map(function (strength) {
                return strength.name;
            }) :
                null
        };

        base.render.call(this, data);
    };
});

CS.Standouts = {};

CS.Standouts.Base = P(function (c) {
    c.$emptyStandoutsMessage = $("#empty-standouts-message");

    c.init = function (className) {
        this.className = className;

        this.$el = $("#standouts").find("#" + this.className + "-standout-wrapper");

        this._render();
    };

    c.getClassName = function () {
        return this.className;
    };

    c.getReactInstance = function() {
        return this.reactInstance;
    };

    c.initModel = function() {
        this.model = {
            account: {
                data: _.clone(CS.account.data, true) || {}
            }
        };
    };

    c._render = function() {
        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$el[0]
        );
    };
});
;CS.Standouts.Strengths = P(CS.Standouts.Base, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                strengths: []
            };
        },

        render: function () {
            return (
                React.createElement("ul", {className: "styleless"}, 
                    this.state.strengths.map(function (strength) {
                        return React.createElement("li", null, strength.name);
                    })
                )
                );
        }
    });

    c.init = function (className) {
        base.init.call(this, className);
    };

    c.reRender = function() {
        this.initModel();

        var strengths = this.model.account.data.strengths;

        if (!_.isEmpty(strengths)) {
            this.$emptyStandoutsMessage.hide();
        }

        this.reactInstance.replaceState({
            strengths: strengths
        });
    };
});

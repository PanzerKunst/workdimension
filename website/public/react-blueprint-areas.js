CS.BlueprintAreas.Area = React.createClass({displayName: "Area",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("ul", {className: "styleless"}, 
                    this.props.items.map(function (item) {
                        return React.createElement("li", null, item.name);
                    })
                ), 

                React.createElement("textarea", {className: "form-control", ref: "textarea"}), 

                React.createElement("a", {onClick: this._handleClick}, "+ Lägg till")
            )
            );
    },

    componentDidUpdate: function() {
        this._initElements();
    },

    _getController: function() {
        return this.props.controller;
    },

    _initElements: function() {
        this.$textarea = $(this.refs.textarea.getDOMNode());
    },

    _handleClick: function () {
        this._getController().showTextarea(this.$textarea);
    }
});

CS.BlueprintAreas.Strengths = P(CS.BlueprintAreas.Base, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                controller: null,
                strengths: []
            };
        },

        render: function () {
            return (
                React.createElement(CS.BlueprintAreas.Area, {controller: this.state.controller, items: this.state.strengths})
                );
        }
    });

    c.init = function (className, title) {
        base.init.call(this, className, title);
    };

    c.reRender = function() {
        base.reRender.call(this);

        var strengths = CS.account.data ? CS.account.data.strengths : [];

        this.getReactInstance().replaceState({
            controller: this,
            strengths: strengths
        });
    };
});

CS.BlueprintAreas.WhatIveDone = P(CS.BlueprintAreas.Base, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                controller: null,
                thingsDone: []
            };
        },

        render: function () {
            return (
                React.createElement(CS.BlueprintAreas.Area, {controller: this.state.controller, items: this.state.thingsDone})
                );
        }
    });

    c.init = function (className, title) {
        base.init.call(this, className, title);
    };

    c.isTouched = function() {
        return !_.isEmpty(CS.account.data) && !_.isEmpty(CS.account.data.thingsDone);
    };

    c.reRender = function() {
        base.reRender.call(this);

        var thingsDone = CS.account.data ? CS.account.data.thingsDone : [];

        this.getReactInstance().replaceState({
            controller: this,
            thingsDone: thingsDone
        });
    };
});

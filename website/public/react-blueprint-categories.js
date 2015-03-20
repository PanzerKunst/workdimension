CS.BlueprintCategories.Category = React.createClass({displayName: "Category",
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

CS.BlueprintCategories.Strengths = P(CS.BlueprintCategories.Base, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                controller: null,
                strengths: []
            };
        },

        render: function () {
            return (
                React.createElement(CS.BlueprintCategories.Category, {controller: this.state.controller, items: this.state.strengths})
                );
        }
    });

    c.init = function (className, title) {
        base.init.call(this, className, title);
    };

    c.isTouched = function() {
        return !_.isEmpty(CS.account.data) && !_.isEmpty(CS.account.data.strengths);
    };

    c.reRender = function() {
        base.reRender.call(this);

        var strengths = CS.account.data ? CS.account.data.strengths : [];

        this.reactInstance.replaceState({
            controller: this,
            strengths: strengths
        });
    };
});

CS.BlueprintCategories.WhatIveDone = P(CS.BlueprintCategories.Base, function (c, base) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                controller: null,
                thingsDone: []
            };
        },

        render: function () {
            return (
                React.createElement(CS.BlueprintCategories.Category, {controller: this.state.controller, items: this.state.thingsDone})
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

        this.reactInstance.replaceState({
            controller: this,
            thingsDone: thingsDone
        });
    };
});

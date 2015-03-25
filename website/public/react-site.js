CS.Controllers.MainMenuInactiveItem = React.createClass({displayName: "MainMenuInactiveItem",
    render: function () {
        return (
            React.createElement("li", null, 
                React.createElement("a", {onClick: this._activateBlueprintArea}, this.props.blueprintArea.getTitle())
            )
            );
    },

    _getBlueprintArea: function() {
        return this.props.blueprintArea;
    },

    _activateBlueprintArea: function() {
        this._getBlueprintArea().activate();
    }
});

CS.Controllers.MainMenu = P(CS.Controllers.Base, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                inactiveBlueprintAreas: [],
                isSignedIn: false
            };
        },

        render: function () {
            var wrapperClasses = classNames({"signed-in": this.state.isSignedIn});

            return (
                React.createElement("div", {className: wrapperClasses}, 
                    /* TODO <div id="header-placeholder">
                        <button className="styleless fa fa-times"></button>
                    </div>*/

                    React.createElement("ul", {className: "styleless"}, 
                        this.state.inactiveBlueprintAreas.map(function (blueprintArea) {
                            var id = "main-menu-" + blueprintArea.getClassName() + "-blueprint-area-item";

                            return React.createElement(CS.Controllers.MainMenuInactiveItem, {key: id, blueprintArea: blueprintArea});
                        })
                    ), 

                    React.createElement("a", {id: "sign-in-with-linked-in"}, "Sign in with LinkedIn"), 
                    React.createElement("a", {id: "sign-out"}, "Sign out")
                )
                );
        }
    });

    c.init = function () {
        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            document.getElementById("main-menu")
        );

        this._initElements();
        this._initEvents();
    };

    c._initElements = function () {
        this.$menuBtn = $("#menu-btn");
        this.$menu = $("#main-menu");
        this.$contentOverlayWhenMenuOpen = $("#content-overlay-when-menu-open");
    };

    c._initEvents = function () {
        this.$menuBtn.click($.proxy(this.toggleMenu, this));
        this.$contentOverlayWhenMenuOpen.click($.proxy(this.toggleMenu, this));
    };

    c.reRender = function () {
        var shownInactiveBlueprintAreas = _.take(CS.blueprintAreasModel.getInactive(), 3);

        this.reactInstance.replaceState({
            inactiveBlueprintAreas: _.sortByAll(shownInactiveBlueprintAreas, "title"),
            isSignedIn: !this.isTemporaryAccount()
        });
    };

    c.toggleMenu = function () {
        var isToShowMenu = this.$menu.css("visibility") === "hidden";

        var contentOverlayZIndex = -1;
        var menuVisibility = "hidden";

        if (isToShowMenu) {
            contentOverlayZIndex = parseInt(this.$menu.css("z-index"), 10) - 1;
            menuVisibility = "visible";
        }

        this.$contentOverlayWhenMenuOpen.css("z-index", contentOverlayZIndex);
        this.$menu.css("visibility", menuVisibility);
    };
});

CS.Controllers.OverviewBlueprintAreaComposer = React.createClass({displayName: "OverviewBlueprintAreaComposer",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("form", {role: "form", className: "item-composer", ref: "form", onSubmit: this._handleComposerFormSubmit}, 
                    React.createElement("textarea", {className: "form-control", onKeyUp: this._handleTextareaKeyUp}), 
                    React.createElement("button", {className: "btn btn-primary"}, "Add"), 
                    React.createElement("button", {type: "button", className: "styleless fa fa-times", onClick: this._hideForm})
                ), 

                React.createElement("a", {onClick: this._showComposer}, "+ Add item")
            )
            );
    },

    componentDidMount: function () {
        this._initElements();

        this.textareaDefaultHeightPx = 41;
    },

    _getController: function () {
        return this.props.controller;
    },

    _getBlueprintAreaClassName: function () {
        return this.props.blueprintArea.className;
    },

    _initElements: function() {
        this.$form = $(React.findDOMNode(this.refs.form));
        this.$textarea = this.$form.children("textarea");
    },

    _showComposer: function (e) {
        // TODO: remove
        console.log("_showComposer");

        var $composerForms = this._getController().$el.find(".item-composer");
        var $addItemLinks = $composerForms.siblings("a");

        $addItemLinks.show();
        $composerForms.hide();
        this.$form.show();
        this.$textarea.focus();

        var $link = $(e.currentTarget);
        $link.hide();
    },

    _handleComposerFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        // TODO: remove
        console.log("_handleComposerFormSubmit");

        var itemNameToAdd = this.$textarea.val().trim();

        if (itemNameToAdd) {
            var updatedBlueprintAreaData = CS.account.data && !_.isEmpty(CS.account.data[this._getBlueprintAreaClassName()]) ? _.clone(CS.account.data[this._getBlueprintAreaClassName()], true) : [];
            updatedBlueprintAreaData.push({name: itemNameToAdd});

            CS.account.data = CS.account.data || {};
            CS.account.data[this._getBlueprintAreaClassName()] = updatedBlueprintAreaData;

            this._getController().saveAccountData();
        }

        this._resetAndHideForm();
    },

    _handleTextareaKeyUp: function (e) {
        if (e.keyCode === CS.Services.Keyboard.keyCode.enter) {
            this._handleComposerFormSubmit();
        } else {
            this._countTextareaLines();
        }
    },

    _countTextareaLines: function () {
        var lineHeight = parseInt(this.$textarea.css("lineHeight"), 10);
        var padding = parseInt(this.$textarea.css("paddingTop"), 10) + parseInt(this.$textarea.css("paddingBottom"), 10);
        var lineCount = Math.round((this.$textarea.prop("scrollHeight") - padding) / lineHeight);

        // TODO: remove
        console.log("lineCount: " + lineCount);

        var currentTextAreaHeightPx = parseFloat(this.$textarea.css("height"));
        var newTextAreaHeightPx = this.textareaDefaultHeightPx - lineHeight + lineCount * lineHeight;

        if (newTextAreaHeightPx !== currentTextAreaHeightPx) {

            // TODO: remove
            console.log("newTextAreaHeightPx: " + newTextAreaHeightPx);

            this.$textarea.css("height", newTextAreaHeightPx);
        }
    },

    _resetAndHideForm: function() {
        this.$textarea.val(null);
        this.$textarea.css("height", this.textareaDefaultHeightPx);

        this._hideForm();
    },

    _hideForm: function() {
        this.$form.hide();
        this.$form.siblings("a").show();
    }
});

CS.Controllers.OverviewBlueprintItem = React.createClass({displayName: "OverviewBlueprintItem",
    render: function () {
        return (
            React.createElement("li", {className: "item-name", ref: "li"}, 
                React.createElement("p", null, this._getBlueprintItemName()), 
                React.createElement("button", {className: "styleless fa fa-pencil", onClick: this._showEditor}), 
                React.createElement("form", {role: "form", className: "item-composer", ref: "form", onSubmit: this._handleComposerFormSubmit}, 
                    React.createElement("textarea", {className: "form-control", ref: "textarea", onKeyUp: this._handleTextareaKeyUp}), 
                    React.createElement("button", {className: "btn btn-primary"}, "Save changes"), 
                    React.createElement("button", {type: "button", className: "styleless fa fa-times", onClick: this._hideForm})
                )
            )
            );
    },

    // TODO: a lot of code is duplicated from blueprintAreaComposer
    componentDidMount: function () {
        this._initElements();

        this.textareaDefaultHeightPx = 41;
        this.listItemEditModeClass = "editing";
    },

    _getController: function () {
        return this.props.controller;
    },

    _getBlueprintAreaClassName: function() {
        return this.props.blueprintAreaWithData.className;
    },

    _getBlueprintItemIndex: function () {
        return this.props.blueprintItemIndex;
    },

    _getBlueprintItemName: function () {
        return this.props.blueprintAreaWithData.items[this._getBlueprintItemIndex()].name;
    },

    _initElements: function() {
        this.$listItem = $(React.findDOMNode(this.refs.li));
        this.$itemNameParagraph = this.$listItem.children("p");
        this.$editBtn = this.$listItem.children("button");
        this.$form = this.$listItem.children("form");
        this.$textarea = this.$form.children("textarea");
    },

    _showEditor: function () {
        // TODO: remove
        console.log("_showEditor. Blueprint item name:", this._getBlueprintItemName());

        this.$textarea.val(this._getBlueprintItemName());

        this.$listItem.addClass(this.listItemEditModeClass);

        this.$itemNameParagraph.hide();
        this.$editBtn.hide();
        this.$form.show();
        this.$textarea.focus();
    },

    _handleComposerFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        // TODO: remove
        console.log("_handleComposerFormSubmit");

        var newItemName = this.$textarea.val().trim();
        var updatedBlueprintAreaData = CS.account.data && !_.isEmpty(CS.account.data[this._getBlueprintAreaClassName()]) ? _.clone(CS.account.data[this._getBlueprintAreaClassName()], true) : [];

        if (newItemName) {
            updatedBlueprintAreaData[this._getBlueprintItemIndex()] = {name: newItemName};
        } else {
            updatedBlueprintAreaData.splice(this._getBlueprintItemIndex(), 1);
        }

        CS.account.data = CS.account.data || {};
        CS.account.data[this._getBlueprintAreaClassName()] = updatedBlueprintAreaData;

        this._getController().saveAccountData();

        this._resetAndHideForm();
    },

    _handleTextareaKeyUp: function (e) {
        if (e.keyCode === CS.Services.Keyboard.keyCode.enter) {
            this._handleComposerFormSubmit();
        } else {
            this._countTextareaLines();
        }
    },

    _countTextareaLines: function () {
        var lineHeight = parseInt(this.$textarea.css("lineHeight"), 10);
        var padding = parseInt(this.$textarea.css("paddingTop"), 10) + parseInt(this.$textarea.css("paddingBottom"), 10);
        var lineCount = Math.round((this.$textarea.prop("scrollHeight") - padding) / lineHeight);

        // TODO: remove
        console.log("lineCount: " + lineCount);

        var currentTextAreaHeightPx = parseFloat(this.$textarea.css("height"));
        var newTextAreaHeightPx = this.textareaDefaultHeightPx - lineHeight + lineCount * lineHeight;

        if (newTextAreaHeightPx !== currentTextAreaHeightPx) {

            // TODO: remove
            console.log("newTextAreaHeightPx: " + newTextAreaHeightPx);

            this.$textarea.css("height", newTextAreaHeightPx);
        }
    },

    _resetAndHideForm: function() {
        this.$textarea.val(null);
        this.$textarea.css("height", this.textareaDefaultHeightPx);

        this._hideForm();
    },

    _hideForm: function() {
        this.$listItem.removeClass(this.listItemEditModeClass);
        this.$form.hide();
        this.$itemNameParagraph.show();
        this.$editBtn.show();
    }
});

CS.Controllers.Overview = P(function (c) {
    c.$el = $(document.getElementById("overview"));

    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                controller: null,
                blueprintAreasWithData: []
            };
        },

        render: function () {
            return (
                React.createElement("ul", {className: "styleless", ref: "list"}, 
                    this.state.blueprintAreasWithData.map(function (blueprintAreaWithData) {
                        var id = blueprintAreaWithData.className + "-blueprint-area-panel";

                        return (
                            React.createElement("li", {id: id, key: id, className: "blueprint-area-panel"}, 
                                React.createElement("div", {className: "well"}, 
                                    React.createElement("h2", null, blueprintAreaWithData.title), 

                                    React.createElement("ul", {className: "styleless"}, 
                                        blueprintAreaWithData.items.map(function (item, index) {
                                            var reactItemId = blueprintAreaWithData.className + "-blueprint-item-" + item.name;

                                            return React.createElement(CS.Controllers.OverviewBlueprintItem, {key: reactItemId, controller: this.state.controller, blueprintAreaWithData: blueprintAreaWithData, blueprintItemIndex: index});
                                        }.bind(this))
                                    ), 

                                    React.createElement(CS.Controllers.OverviewBlueprintAreaComposer, {controller: this.state.controller, blueprintArea: blueprintAreaWithData})
                                )
                            )
                            );
                    }.bind(this))
                )
                );
        },

        componentDidMount: function() {
            this._initElements();
        },

        componentDidUpdate: function() {
            this.rePackerise();
        },

        rePackerise: function() {
            this.unusedVariable = new Packery(this.list, {
                itemSelector: ".blueprint-area-panel"
            });
        },

        _initElements: function() {
            this.list = React.findDOMNode(this.refs.list);
        }
    });

    c.init = function () {
        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$el[0]
        );
    };

    c.reRender = function () {
        var blueprintAreasWithData = CS.blueprintAreasModel.getActive().map(function (blueprintArea) {
            return {
                className: blueprintArea.getClassName(),
                title: blueprintArea.getTitle(),
                items: CS.account.data && !_.isEmpty(CS.account.data[blueprintArea.getClassName()]) ? CS.account.data[blueprintArea.getClassName()] : []
            };
        });

        this.reactInstance.replaceState({
            controller: this,
            blueprintAreasWithData: _.sortByAll(blueprintAreasWithData, "title")
        });
    };

    c.saveAccountData = function () {
        CS.saveAccountData(function () {
            this.reRender();
        }.bind(this));
    };
});

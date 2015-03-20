CS.Controllers.MainMenuInactiveItem = React.createClass({displayName: "MainMenuInactiveItem",
    render: function () {
        return (
            React.createElement("li", null, 
                React.createElement("a", {onClick: this._activateBlueprintArea}, this.props.blueprintArea.getTitle())
            )
            );
    },

    _activateBlueprintArea: function() {

    }
});

CS.Controllers.MainMenu = P(function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                activeBlueprintAreas: [],
                inactiveBlueprintAreas: []
            };
        },

        render: function () {
            return (
                React.createElement("div", null, 
                    React.createElement("ul", {className: "styleless"}, 
                        this.state.activeBlueprintAreas.map(function (blueprintArea) {
                            var id = "main-menu-" + blueprintArea.getClassName() + "-blueprint-area-item";

                            return React.createElement("li", {id: id, key: id}, blueprintArea.getTitle());
                        })
                    ), 
                    React.createElement("ul", {className: "styleless"}, 
                        this.state.inactiveBlueprintAreas.map(function (blueprintArea) {
                            // TODO: remove var id = "main-menu-" + blueprintArea.getClassName() + "-blueprint-area-item";

                            return React.createElement(CS.Controllers.MainMenuInactiveItem, {blueprintArea: blueprintArea});
                        })
                    ), 
                    React.createElement("a", null, "More")
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

        this.reRender();
    };

    c._initElements = function () {
        this.$menuBtn = $("#menu-btn");
        this.$menu = $("#main-menu");
        this.$contentOverlayWhenMenuOpen = $("#content-overlay-when-menu-open");
    };

    c._initEvents = function () {
        this.$menuBtn.click($.proxy(this._toggleMenu, this));
        this.$contentOverlayWhenMenuOpen.click($.proxy(this._toggleMenu, this));
    };

    c.reRender = function () {
        var shownInactiveBlueprintAreas = _.take(CS.blueprintAreasModel.getInactive(), 3);

        this.reactInstance.replaceState({
            activeBlueprintAreas: _.sortByAll(CS.blueprintAreasModel.getActive(), "title"),
            inactiveBlueprintAreas: _.sortByAll(shownInactiveBlueprintAreas, "title")
        });
    };

    c._toggleMenu = function () {
        var isToShowMenu = this.$menu.css("visibility") === "hidden";

        var contentOverlayZIndex = -1;
        var futureVisibility = "hidden";

        if (isToShowMenu) {
            contentOverlayZIndex = parseInt(this.$menu.css("z-index"), 10) - 1;
            futureVisibility = "visible";
        }

        this.$contentOverlayWhenMenuOpen.css("z-index", contentOverlayZIndex);
        this.$menu.css("visibility", futureVisibility);
    };
});

CS.Controllers.OverviewBlueprintAreaComposer = React.createClass({displayName: "OverviewBlueprintAreaComposer",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("form", {role: "form", className: "item-composer", ref: "form", onSubmit: this._handleComposerFormSubmit}, 
                    React.createElement("textarea", {className: "form-control", ref: "textarea", onKeyUp: this._handleTextareaKeyUp}), 
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
        var controller = this._getController();

        if (controller) {
            this.$composerForms = controller.$el.find(".item-composer");
            this.$addItemLinks = this.$composerForms.siblings("a");

            this.$form = $(React.findDOMNode(this.refs.form));
            this.$textarea = $(React.findDOMNode(this.refs.textarea));
        }
    },

    _showComposer: function (e) {
        // TODO: remove
        console.log("_showComposer");

        this.$addItemLinks.show();
        this.$composerForms.hide();
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
            var updatedBlueprintAreaData = _.clone(CS.account.data[this._getBlueprintAreaClassName()], true) || [];
            updatedBlueprintAreaData.push({name: itemNameToAdd});

            CS.account.data[this._getBlueprintAreaClassName()] = updatedBlueprintAreaData;

            this._getController().reRender();
        }

        this._resetAndHideForm();
    },

    _handleTextareaKeyUp: function (e) {
        if (e.keyCode === CS.Services.Keyboard.keyCode.enter) {
            this._handleComposerFormSubmit();
        } else {
            var $textarea = $(e.currentTarget);
            this._countTextareaLines($textarea);
        }
    },

    _countTextareaLines: function ($textarea) {
        var lineHeight = parseInt($textarea.css("lineHeight"), 10);
        var padding = parseInt($textarea.css("paddingTop"), 10) + parseInt($textarea.css("paddingBottom"), 10);
        var lineCount = Math.round(($textarea.prop("scrollHeight") - padding) / lineHeight);

        // TODO: remove
        console.log("lineCount: " + lineCount);

        var currentTextAreaHeightPx = parseFloat($textarea.css("height"));
        var newTextAreaHeightPx = this.textareaDefaultHeightPx - lineHeight + lineCount * lineHeight;

        if (newTextAreaHeightPx !== currentTextAreaHeightPx) {

            // TODO: remove
            console.log("newTextAreaHeightPx: " + newTextAreaHeightPx);

            $textarea.css("height", newTextAreaHeightPx);
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
                React.createElement("ul", {className: "styleless"}, 
                    this.state.blueprintAreasWithData.map(function (blueprintAreaWithData) {
                        var id = blueprintAreaWithData.className + "-blueprint-area-panel";

                        return (
                            React.createElement("li", {id: id, key: id}, 
                                React.createElement("div", {className: "well"}, 
                                    React.createElement("h2", null, blueprintAreaWithData.title), 

                                    React.createElement("ul", {className: "styleless"}, 
                                        blueprintAreaWithData.items.map(function (item) {
                                            var reactItemId = blueprintAreaWithData.className + "-blueprint-item-" + item.name;

                                            return React.createElement("li", {id: reactItemId, key: reactItemId, className: "item-name"}, item.name);
                                        })
                                    ), 

                                    React.createElement(CS.Controllers.OverviewBlueprintAreaComposer, {controller: this.state.controller, blueprintArea: blueprintAreaWithData})
                                )
                            )
                            );
                    }.bind(this))
                )
                );
        }
    });

    c.init = function () {
        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$el[0]
        );

        this.reRender();
    };

    c.reRender = function () {
        var blueprintAreasWithData = CS.blueprintAreasModel.getActive().map(function (blueprintArea) {
            return {
                className: blueprintArea.getClassName(),
                title: blueprintArea.getTitle(),
                items: CS.account.data[blueprintArea.getClassName()] || []
            };
        });

        this.reactInstance.replaceState({
            controller: this,
            blueprintAreasWithData: _.sortByAll(blueprintAreasWithData, "title")
        });
    };
});

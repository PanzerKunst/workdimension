CS.Controllers.BlueprintAreasSelector = P(function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                inactiveBlueprintAreas: []
            };
        },

        render: function () {
            return (
                React.createElement("div", {ref: "wrapper"}, 
                    React.createElement("ul", {className: "styleless"}, 
                        this.state.inactiveBlueprintAreas.map(function (blueprintArea) {
                            var id = blueprintArea.getClassName() + "-blueprint-area-selector-item";

                            return React.createElement(CS.Controllers.BlueprintAreaSelectorItem, {key: id, blueprintArea: blueprintArea});
                        })
                    )
                )
                );
        },

        componentDidMount: function() {
            this._initElements();
        },

        _initElements: function() {
            this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
        }
    });

    c.init = function () {
        this._initElements();
        this._initEvents();

        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$modal.find(".modal-body")[0]
        );

        this.reRender();
        this._initModalWidth();
    };

    c._initElements = function() {
        this.$window = $(window);
        this.$modal = $("#select-areas-modal");
        this.$modalDialog = this.$modal.children(".modal-dialog");
    };

    c._initEvents = function() {
        this.$window.resize(_.debounce(function () {
            this._initModalWidth();
        }.bind(this), 15));
    };

    c.reRender = function() {
        this.reactInstance.replaceState({
            inactiveBlueprintAreas: _.sortByAll(CS.blueprintAreasModel.getInactive(), "title")
        });
    };

    c._initModalWidth = function() {
        this.$modalDialog.toggleClass("modal-lg", CS.Services.Browser.isLargeScreen());
    };
});

CS.Controllers.BlueprintAreaSelectorItem = React.createClass({displayName: "BlueprintAreaSelectorItem",
    render: function () {
        return React.createElement("a", {onClick: this._activateBlueprintArea}, this._getBlueprintArea().getTitle());
    },

    _getBlueprintArea: function() {
        return this.props.blueprintArea;
    },

    _activateBlueprintArea: function() {
        CS.mainMenuController.hideModal();

        this._getBlueprintArea().activate();
    }
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

                React.createElement("a", {className: "add-item-link", onClick: this._showComposer}, "+ Add item")
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
    },

    _getController: function () {
        return this.props.controller;
    },

    _getBlueprintAreaClassName: function () {
        return this.props.blueprintAreaClassName;
    },

    _initElements: function () {
        this.$form = $(React.findDOMNode(this.refs.form));
        this.$textarea = this.$form.children("textarea");
    },

    _showComposer: function (e) {
        // TODO: remove
        console.log("_showComposer");

        this._hideOtherOpenComposers();

        this.$form.show();
        this.$textarea.focus();

        var $link = $(e.currentTarget);
        $link.hide();

        CS.overviewController.rePackerise();
    },

    _hideOtherOpenComposers: function() {
        var $composerForms = CS.overviewController.$el.find(".item-composer");
        var $addItemLinks = $composerForms.siblings(".add-item-link");

        $composerForms.hide();
        $addItemLinks.show();
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

            CS.overviewController.saveAccountData();
        }

        CS.Controllers.OverviewBlueprintAreaCommon.resetAndHideForm(this.$textarea, $.proxy(this._hideForm, this));
    },

    _handleTextareaKeyUp: function(e) {
        CS.Controllers.OverviewBlueprintAreaCommon.handleTextareaKeyUp(e, $.proxy(this._handleComposerFormSubmit, this), $.proxy(this._hideForm, this));
    },

    _hideForm: function () {
        this.$form.hide();
        this.$form.siblings("a").show();

        CS.overviewController.rePackerise();
    }
});

CS.Controllers.OverviewBlueprintAreaPanel = React.createClass({displayName: "OverviewBlueprintAreaPanel",
    render: function () {
        return (
            React.createElement("li", {className: "blueprint-area-panel", ref: "li"}, 
                React.createElement("div", {className: "well"}, 
                    React.createElement("h2", null, this._getBlueprintArea().getTitle()), 
                    React.createElement("button", {className: "styleless fa fa-eye-slash", onClick: this._hideBlueprintAreaPanel}), 

                    React.createElement("ul", {className: "styleless"}, 
                        this._getBlueprintAreaWithData().items.map(function (item, index) {
                            var reactItemId = this._getBlueprintArea().getClassName() + "-blueprint-item-" + item.name;

                            return React.createElement(CS.Controllers.OverviewBlueprintItem, {key: reactItemId, blueprintAreaWithData: this._getBlueprintAreaWithData(), blueprintItemIndex: index});
                        }.bind(this))
                    ), 

                    React.createElement(CS.Controllers.OverviewBlueprintAreaComposer, {blueprintAreaClassName: this._getBlueprintArea().getClassName()})
                )
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
    },

    _getBlueprintAreaWithData: function() {
        return this.props.blueprintAreaWithData;
    },

    _getBlueprintArea: function() {
        return this.props.blueprintAreaWithData.blueprintArea;
    },

    _initElements: function() {
        this.$listItem = $(React.findDOMNode(this.refs.li));
    },

    _hideBlueprintAreaPanel: function () {
        this._getBlueprintArea().deactivate();
        CS.overviewController.reRender();
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

    componentDidMount: function () {
        this._initElements();

        this.listItemEditModeClass = "editing";
    },

    _getBlueprintAreaClassName: function() {
        return this.props.blueprintAreaWithData.blueprintArea.getClassName();
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
        this.$form = this.$listItem.children(".item-composer");
        this.$textarea = this.$form.children("textarea");

        this.$blueprintAreaPanel = this.$listItem.parents(".blueprint-area-panel");
        this.$addItemLink = this.$blueprintAreaPanel.find(".add-item-link");
    },

    _showEditor: function () {
        // TODO: remove
        console.log("_showEditor. Blueprint item name:", this._getBlueprintItemName());

        this._hideOtherOpenComposers();

        this.$textarea.val(this._getBlueprintItemName());

        this.$listItem.addClass(this.listItemEditModeClass);

        this.$itemNameParagraph.hide();
        this.$editBtn.hide();
        this.$addItemLink.hide();
        this.$form.show();
        CS.Controllers.OverviewBlueprintAreaCommon.adaptTextareaHeight(this.$textarea);
        this.$textarea.focus();

        CS.overviewController.rePackerise();
    },

    _hideOtherOpenComposers: function() {
        var $listItems = CS.overviewController.$el.find(".item-name");
        var $composerForms = $listItems.children(".item-composer");
        var $itemNameParagraphs = $listItems.children("p");
        var $editBtns = $listItems.children("button");
        var $addItemLinks = CS.overviewController.$el.find(".add-item-link");

        $listItems.removeClass(this.listItemEditModeClass);
        $composerForms.hide();
        $itemNameParagraphs.show();
        $editBtns.show();
        $addItemLinks.show();
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

            // We hide it from the UI to give faster feedback
            this.$listItem.hide();
        }

        CS.account.data = CS.account.data || {};
        CS.account.data[this._getBlueprintAreaClassName()] = updatedBlueprintAreaData;

        CS.Controllers.OverviewBlueprintAreaCommon.resetAndHideForm(this.$textarea, $.proxy(this._hideForm, this));
        CS.overviewController.saveAccountData();
    },

    _handleTextareaKeyUp: function(e) {
        CS.Controllers.OverviewBlueprintAreaCommon.handleTextareaKeyUp(e, $.proxy(this._handleComposerFormSubmit, this), $.proxy(this._hideForm, this));
    },

    _hideForm: function() {
        this.$listItem.removeClass(this.listItemEditModeClass);
        this.$form.hide();
        this.$itemNameParagraph.show();
        this.$editBtn.show();
        this.$addItemLink.show();

        CS.overviewController.rePackerise();
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
                        var id = blueprintAreaWithData.blueprintArea.getClassName() + "-blueprint-area-panel";

                        return React.createElement(CS.Controllers.OverviewBlueprintAreaPanel, {key: id, controller: this.state.controller, blueprintAreaWithData: blueprintAreaWithData});
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
        CS.blueprintAreasModel = CS.Models.BlueprintAreas();
        CS.blueprintAreasModel.updateStatus();

        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$el[0]
        );
    };

    c.reRender = function () {
        var blueprintAreasWithData = CS.blueprintAreasModel.getActive().map(function (blueprintArea) {
            return {
                blueprintArea: blueprintArea,
                items: CS.account.data && !_.isEmpty(CS.account.data[blueprintArea.getClassName()]) ? CS.account.data[blueprintArea.getClassName()] : []
            };
        });

        this.reactInstance.replaceState({
            controller: this,
            blueprintAreasWithData: _.sortBy(blueprintAreasWithData, function(blueprintAreaWithData) {
                return blueprintAreaWithData.blueprintArea.getTitle();
            })
        });
    };

    c.rePackerise = function() {
        this.reactInstance.rePackerise();
    };

    c.saveAccountData = function () {
        this.reRender();
        CS.saveAccountData();
    };
});

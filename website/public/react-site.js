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
                            var id = blueprintArea.className + "-blueprint-area-selector-item";

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
        return React.createElement("a", {onClick: this._activateBlueprintArea}, this.props.blueprintArea.title);
    },

    _activateBlueprintArea: function() {
        CS.mainMenuController.hideModal();

        this.props.blueprintArea.activate();

        if (window.location.pathname !== "/") {
            location.href = "/workbook-areas/" + this.props.blueprintArea.className;
        }
    }
});

CS.Controllers.MainMenu = P(CS.Controllers.Base, function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                activeWorkbookAreas: []
            };
        },

        render: function () {
            return (
                React.createElement("ul", {className: "styleless"}, 
                    this.state.activeWorkbookAreas.map(function (workbookArea) {
                        var id = workbookArea.className + "-workbook-area-menu-item";

                        var href = "/workbook-areas/" + workbookArea.className;

                        return (
                            React.createElement("li", {key: id}, 
                                React.createElement("a", {href: href}, workbookArea.title)
                            )
                            );
                    })
                )
                );
        }
    });

    c.init = function (blueprintAreas) {
        CS.blueprintAreasModel = CS.Models.BlueprintAreas(blueprintAreas);
        CS.blueprintAreasModel.updateStatus();

        this._initElements();
        this._render();
        this._initEvents();
    };

    c._initElements = function () {
        this.$mainContainer = $("#container");

        this.$menuBtn = this.$mainContainer.find("#menu-btn");
        this.$menu = this.$mainContainer.find("#main-menu");
        this.$contentOverlayWhenMenuOpen = this.$mainContainer.find("#content-overlay-when-menu-open");
        this.$selectAreasModal = this.$mainContainer.find("#select-areas-modal");

        this.$activeAreasSection = this.$menu.children("section");
        this.$selectAreasLink = this.$menu.children("#select-areas");
        this.$signInWithLinkedInLink = this.$mainContainer.find("#sign-in-with-linkedin");
        this.$signOutLink = this.$menu.children("#sign-out");
    };

    c._initEvents = function () {
        this.$menuBtn.click($.proxy(this._toggleMenu, this));
        this.$contentOverlayWhenMenuOpen.click($.proxy(this.hideMenu, this));

        this.$selectAreasLink.click($.proxy(this._showModal, this));
    };

    c.reRender = function() {
        this.reactInstance.replaceState({
            activeWorkbookAreas: _.sortByAll(CS.blueprintAreasModel.getActive(), "title")
        });
    };

    c.hideMenu = function () {
        this.$mainContainer.removeClass("menu-open");
    };

    c.hideModal = function() {
        this.$selectAreasModal.modal("hide");
    };

    c.signOut = function() {
        var type = "DELETE";
        var url = "/api/auth";

        $.ajax({
            url: url,
            type: type,
            success: function () {
                location.href = "/";
            },
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    };

    c._render = function() {
        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$activeAreasSection[0]
        );

        this.reRender();
    };

    c._toggleMenu = function () {
        this._initSignInLinks();

        CS.taskNotificationsController.hide();
        this.$mainContainer.toggleClass("menu-open");
    };

    c._initSignInLinks = function() {
        if (this.isTemporaryAccount()) {
            this.$signOutLink.hide();
            this.$signInWithLinkedInLink.show();
        } else {
            this.$signInWithLinkedInLink.hide();
            this.$signOutLink.show();
        }
    };

    c._showModal = function() {
        CS.blueprintAreasSelector.reRender();
        this.$selectAreasModal.modal();
        this.hideMenu();
    };
});

CS.Controllers.TaskNotifications = P(function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                activeTasks: [],
                doneTasks: []
            };
        },

        render: function () {
            return (
                React.createElement("ul", {className: "styleless"}, 
                    this.state.activeTasks.map(function (task) {
                        var id = "notification-for-task-" + task.id;

                        var workbookArea = CS.blueprintAreasModel.getOfId(task.workbookAreaId);

                        var href = "/workbook-areas/" + workbookArea.className + "?taskIdToMarkAsViewed=" + task.id;

                        var liClasses = classNames({
                            "clicked": _.includes(CS.account.data.clickedTaskIds, task.id)
                        });

                        return (
                            React.createElement("li", {key: id, className: liClasses}, 
                                React.createElement("a", {href: href}, task.notificationText)
                            )
                            );
                    }), 

                    this.state.doneTasks.map(function (task) {
                        var id = "notification-for-task-" + task.id;

                        return (
                            React.createElement("li", {key: id, className: "done"}, task.notificationText)
                            );
                    })
                )
                );
        }
    });

    c.init = function () {
        this._initElements();
        this._render();
        this._initEvents();
    };

    c._initElements = function () {
        this.$mainContainer = $("#container");

        this.$taskNotificationsBtn = this.$mainContainer.find("#task-notifications-btn");
        this.$newTaskCountSpan = this.$taskNotificationsBtn.children("span");

        this.$contentOverlayWhenMenuOpen = this.$mainContainer.find("#content-overlay-when-menu-open");
    };

    c._initEvents = function () {
        this.$taskNotificationsBtn.click($.proxy(this._toggleNotifications, this));
        this.$contentOverlayWhenMenuOpen.click($.proxy(this.hide, this));
    };

    c.reRender = function () {
        this.activeTasks = this._getActiveTasks();
        var viewedTasks = _.filter(CS.WorkbookAreaTasks, function (task) {
            return _.includes(CS.account.data.viewedTaskIds, task.id);
        });
        var newTasks = this._getNewTasks();

        this.reactInstance.replaceState({
            activeTasks: this._getPrioritizedActiveTasks(newTasks),
            doneTasks: _.reject(viewedTasks, function (task) {
                return task.isActive();
            })
        });

        if (newTasks.length > 0) {
            this.$taskNotificationsBtn.addClass("with-new-items");
            this.$newTaskCountSpan.html(newTasks.length);
        }
    };

    c.hide = function () {
        this.$mainContainer.removeClass("task-notifications-open");
    };

    c._render = function () {
        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            document.getElementById("task-notifications")
        );

        this.reRender();
    };

    c._getActiveTasks = function () {
        return _.filter(CS.WorkbookAreaTasks, function (task) {
            return task.isActive();
        });
    };

    c._getNewTasks = function () {
        return _.reject(this.activeTasks, function (task) {
            return _.include(CS.account.data.viewedTaskIds, task.id);
        });
    };

    c._getPrioritizedActiveTasks = function (newTasks) {
        var oldTasks = _.reject(this.activeTasks, function (task) {
            return _.find(newTasks, "id", task.id);
        });

        var activeOldLvl1Tasks = _.filter(oldTasks, function (task) {
            return task.level === 1;
        });

        var prioritizedOldLvl1Tasks = _.sortBy(activeOldLvl1Tasks, function (task) {
            var workbookArea = CS.blueprintAreasModel.getOfId(task.workbookAreaId);
            return CS.account.data[workbookArea.className] ? -CS.account.data[workbookArea.className].length : 0;
        });

        var activeOldLvl2Tasks = _.filter(oldTasks, function (task) {
            return task.level === 2;
        });

        var prioritizedOldLvl2Tasks = _.sortBy(activeOldLvl2Tasks, function (task) {
            var workbookArea = CS.blueprintAreasModel.getOfId(task.workbookAreaId);
            return CS.account.data[workbookArea.className] ? -CS.account.data[workbookArea.className].length : 0;
        });

        var activeOldLvl3Tasks = _.filter(oldTasks, function (task) {
            return task.level === 3;
        });

        return _.union(newTasks, prioritizedOldLvl1Tasks, prioritizedOldLvl2Tasks, activeOldLvl3Tasks);
    };

    c._toggleNotifications = function () {
        CS.mainMenuController.hideMenu();
        this.$mainContainer.toggleClass("task-notifications-open");
        this.$taskNotificationsBtn.removeClass("with-new-items");

        // The reason why we store the taskIds and not the tasks themselves is because the isActive() function isn't serialized
        var viewedTaskIds = _.union(this.activeTasks.map(function (task) {
                return task.id;
            }),
            CS.account.data.viewedTaskIds
        );

        if (!_.isEmpty(_.difference(viewedTaskIds, CS.account.data.viewedTaskIds))) {
            CS.account.data.viewedTaskIds = viewedTaskIds;
            CS.saveAccountData();
        }
    };
});

CS.Controllers.OverviewBlueprintAreaComposer = React.createClass({displayName: "OverviewBlueprintAreaComposer",
    addItemComposerOpenCssClass: "add-item-composer-open",

    render: function () {
        return (
            React.createElement("section", {ref: "wrapper"}, 
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

    _initElements: function () {
        this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
        this.$well = this.$wrapper.parent();
        this.$form = this.$wrapper.children(".item-composer");
        this.$addItemLink = this.$wrapper.children(".add-item-link");
        this.$textarea = this.$form.children("textarea");
    },

    _showComposer: function () {
        this._hideOtherOpenComposers();

        this.$well.addClass(this.addItemComposerOpenCssClass);
        this.$textarea.focus();

        CS.overviewController.rePackerise();
    },

    _hideOtherOpenComposers: function () {
        CS.overviewController.$el.find(".well").removeClass(this.addItemComposerOpenCssClass);
    },

    _handleComposerFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var itemNameToAdd = this.$textarea.val().trim();

        if (itemNameToAdd && !CS.Controllers.WorkbookAreaCommon.doesItemAlreadyExist(itemNameToAdd, this.props.blueprintAreaClassName)) {
            var updatedBlueprintAreaData = CS.account.data && !_.isEmpty(CS.account.data[this.props.blueprintAreaClassName]) ? _.clone(CS.account.data[this.props.blueprintAreaClassName], true) : [];
            updatedBlueprintAreaData.push({
                name: itemNameToAdd,
                notes: []
            });

            CS.account.data = CS.account.data || {};
            CS.account.data[this.props.blueprintAreaClassName] = updatedBlueprintAreaData;

            CS.overviewController.saveAccountData();
        }

        CS.Controllers.WorkbookAreaCommon.resetAndHideForm(this.$textarea, $.proxy(this._hideForm, this));
    },

    _handleTextareaKeyUp: function (e) {
        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, $.proxy(this._handleComposerFormSubmit, this), $.proxy(this._hideForm, this));
    },

    _hideForm: function () {
        this.$well.removeClass(this.addItemComposerOpenCssClass);

        CS.overviewController.rePackerise();
    }
});

CS.Controllers.OverviewBlueprintAreaPanel = React.createClass({displayName: "OverviewBlueprintAreaPanel",
    render: function () {
        var workbookAreaTitleHref = "/workbook-areas/" + this._getBlueprintArea().className;

        var wellClasses = classNames("well",
            {
                "collapsed-list": this.props.blueprintAreaWithData.items.length > CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete
            });

        return (
            React.createElement("li", {className: "blueprint-area-panel", ref: "li"}, 
                React.createElement("div", {className: wellClasses}, 
                    React.createElement("h2", null, 
                        React.createElement("a", {href: workbookAreaTitleHref}, this._getBlueprintArea().title)
                    ), 
                    React.createElement("button", {className: "styleless fa fa-eye-slash", onClick: this._hideBlueprintAreaPanel}), 

                    React.createElement("ul", {className: "styleless item-names-list"}, 
                        this.props.blueprintAreaWithData.items.map(function (item, index) {
                            var reactItemId = this._getBlueprintArea().className + "-blueprint-item-" + item.name;

                            return React.createElement(CS.Controllers.OverviewBlueprintItem, {key: reactItemId, blueprintAreaWithData: this.props.blueprintAreaWithData, blueprintItemIndex: index, controller: this});
                        }.bind(this))
                    ), 

                    React.createElement("button", {className: "styleless fa fa-chevron-down", onClick: this._toggleCollapsedList}), 
                    React.createElement("button", {className: "styleless fa fa-chevron-up", onClick: this._toggleCollapsedList}), 

                    React.createElement(CS.Controllers.OverviewBlueprintAreaComposer, {blueprintAreaClassName: this._getBlueprintArea().className})
                )
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
        this._initPopovers();   // TODO
        this._initSortable();
    },

    _getBlueprintArea: function () {
        return this.props.blueprintAreaWithData.blueprintArea;
    },

    _initElements: function () {
        this.$listItem = $(React.findDOMNode(this.refs.li));
        this.$well = this.$listItem.children();
        this.$popovers = this.$well.children("[data-toggle='popover']");
        this.$itemNamesList = this.$well.children(".item-names-list");
    },

    _initPopovers: function() {
        this.$popovers.popover();
    },

    _initSortable: function () {
        // We don't do it on touch devices, because then it becomes really harder to scroll down the page
        if (!Modernizr.touch) {
            this.sortable = new Sortable(this.$itemNamesList[0],
                {
                    animation: 150,
                    onUpdate: function () {
                        CS.Controllers.WorkbookAreaCommon.handleWorkbookItemsReordered(this.$itemNamesList, this._getBlueprintArea().className);
                    }.bind(this)
                }
            );
        }
    },

    _hideBlueprintAreaPanel: function () {
        this._getBlueprintArea().deactivate();
        CS.overviewController.reRender();
    },

    _toggleCollapsedList: function () {
        this.$well.toggleClass("collapsed-list");
        this.$well.toggleClass("expanded-list");

        CS.overviewController.rePackerise();
    }
});

CS.Controllers.OverviewBlueprintItem = React.createClass({displayName: "OverviewBlueprintItem",
    render: function () {
        var href = "/workbook-items/" + this._getBlueprintAreaClassName() + "/" + this.props.blueprintItemIndex;

        return (
            React.createElement("li", {ref: "li"}, 
                React.createElement("p", null, React.createElement("a", {href: href}, this._getBlueprintItemName())), 
                React.createElement("button", {className: "styleless fa fa-pencil", onClick: this._showEditor}), 
                React.createElement("form", {role: "form", className: "item-composer", onSubmit: this._handleComposerFormSubmit}, 
                    React.createElement("textarea", {className: "form-control", onKeyUp: this._handleTextareaKeyUp}), 
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
        return this.props.blueprintAreaWithData.blueprintArea.className;
    },

    _getBlueprintItemName: function () {
        return this.props.blueprintAreaWithData.items[this.props.blueprintItemIndex].name;
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
        this._hideOtherOpenComposers();

        this.$textarea.val(this._getBlueprintItemName());

        this.$listItem.addClass(this.listItemEditModeClass);

        CS.Controllers.WorkbookAreaCommon.disableSortable(this.props.controller);

        this.$itemNameParagraph.hide();
        this.$editBtn.hide();
        this.$addItemLink.hide();
        this.$form.show();
        CS.Controllers.WorkbookAreaCommon.adaptTextareaHeight(this.$textarea);
        this.$textarea.focus();

        CS.overviewController.rePackerise();
    },

    _hideOtherOpenComposers: function() {
        var $listItems = CS.overviewController.$el.find(".item-names-list").children();
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

        var newItemName = this.$textarea.val().trim();
        var updatedBlueprintAreaData = CS.account.data && !_.isEmpty(CS.account.data[this._getBlueprintAreaClassName()]) ? _.clone(CS.account.data[this._getBlueprintAreaClassName()], true) : [];

        if (newItemName) {
            updatedBlueprintAreaData[this.props.blueprintItemIndex].name = newItemName;
        } else {
            updatedBlueprintAreaData.splice(this.props.blueprintItemIndex, 1);

            // We hide it from the UI to give faster feedback
            this.$listItem.hide();
        }

        CS.account.data = CS.account.data || {};
        CS.account.data[this._getBlueprintAreaClassName()] = updatedBlueprintAreaData;

        CS.Controllers.WorkbookAreaCommon.resetAndHideForm(this.$textarea, $.proxy(this._hideForm, this));
        CS.overviewController.saveAccountData();
    },

    _handleTextareaKeyUp: function(e) {
        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, $.proxy(this._handleComposerFormSubmit, this), $.proxy(this._hideForm, this));
    },

    _hideForm: function() {
        this.$listItem.removeClass(this.listItemEditModeClass);
        this.$form.hide();
        this.$itemNameParagraph.show();
        this.$editBtn.show();
        this.$addItemLink.show();

        CS.overviewController.rePackerise();
        CS.Controllers.WorkbookAreaCommon.enableSortable(this.props.controller);
    }
});

CS.Controllers.Overview = P(function (c) {
    c.$el = $(document.getElementById("content"));

    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                blueprintAreasWithData: []
            };
        },

        render: function () {
            return (
                React.createElement("ul", {className: "styleless", ref: "list"}, 
                    this.state.blueprintAreasWithData.map(function (blueprintAreaWithData) {
                        var id = blueprintAreaWithData.blueprintArea.className + "-blueprint-area-panel";

                        return React.createElement(CS.Controllers.OverviewBlueprintAreaPanel, {key: id, blueprintAreaWithData: blueprintAreaWithData});
                    })
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

        this.reRender();
    };

    c.reRender = function () {
        var blueprintAreasWithData = CS.blueprintAreasModel.getActive().map(function (blueprintArea) {
            return {
                blueprintArea: blueprintArea,
                items: CS.account.data && !_.isEmpty(CS.account.data[blueprintArea.className]) ? CS.account.data[blueprintArea.className] : []
            };
        });

        this.reactInstance.replaceState({
            blueprintAreasWithData: _.sortBy(blueprintAreasWithData, function(blueprintAreaWithData) {
                return blueprintAreaWithData.blueprintArea.title;
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

CS.Controllers.WorkbookAreaAddItemLvl2Task = React.createClass({displayName: "WorkbookAreaAddItemLvl2Task",
    render: function () {
        var comingUpNextParagraph = null;
        if (this.props.comingUpNextText) {
            comingUpNextParagraph = (
                React.createElement("p", {className: "coming-up-next"}, "Coming up next: ", this.props.comingUpNextText)
                );
        }

        return (
            React.createElement("div", {className: "workbook-task"}, 
                React.createElement("p", null, "Working on: ", this.props.task.workingOnText), 
                React.createElement("div", {className: "progress"}, 
                    React.createElement("div", {ref: "progressBar", className: "progress-bar progress-bar-success", role: "progressbar", "aria-valuenow": "", "aria-valuemin": "0", "aria-valuemax": "100"})
                ), 
                comingUpNextParagraph, 
                React.createElement(CS.Controllers.WorkbookAreaAddItemTaskForm, {task: this.props.task, workbookArea: this.props.workbookArea, controller: this.props.controller})
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
        this._initProgressBar();
    },

    componentDidUpdate: function() {
        this._initProgressBar();
    },

    _initElements: function () {
        this.$progressBar = $(React.findDOMNode(this.refs.progressBar));
    },

    _initProgressBar: function() {
        var itemCount = 0;

        if (CS.account.data && !_.isEmpty(CS.account.data[this.props.workbookArea.className])) {
            itemCount = CS.account.data[this.props.workbookArea.className].length - CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        }

        CS.Controllers.WorkbookCommon.setProgressBarWidth(this.$progressBar, itemCount, this.props.task.stepCount);
    }
});

CS.Controllers.WorkbookAreaAddItemTask = React.createClass({displayName: "WorkbookAreaAddItemTask",
    render: function () {
        var comingUpNextParagraph = null;
        if (this.props.comingUpNextText) {
            comingUpNextParagraph = (
                React.createElement("p", {className: "coming-up-next"}, "Coming up next: ", this.props.comingUpNextText)
                );
        }

        return (
            React.createElement("div", {className: "workbook-task"}, 
                React.createElement("p", null, "Working on: ", this.props.task.workingOnText), 
                React.createElement("div", {className: "progress"}, 
                    React.createElement("div", {ref: "progressBar", className: "progress-bar progress-bar-success", role: "progressbar", "aria-valuenow": "", "aria-valuemin": "0", "aria-valuemax": "100"})
                ), 
                comingUpNextParagraph, 
                React.createElement(CS.Controllers.WorkbookAreaAddItemTaskForm, {task: this.props.task, workbookArea: this.props.workbookArea, controller: this.props.controller})
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
        this._initProgressBar();
    },

    componentDidUpdate: function() {
        this._initProgressBar();
    },

    _initElements: function () {
        this.$progressBar = $(React.findDOMNode(this.refs.progressBar));
    },

    _initProgressBar: function() {
        var itemCount = 0;

        if (CS.account.data && !_.isEmpty(CS.account.data[this.props.workbookArea.className])) {
            itemCount = CS.account.data[this.props.workbookArea.className].length;
        }

        CS.Controllers.WorkbookCommon.setProgressBarWidth(this.$progressBar, itemCount, this.props.task.stepCount);
    }
});

CS.Controllers.WorkbookAreaAddItemTaskForm = React.createClass({displayName: "WorkbookAreaAddItemTaskForm",
    render: function () {
        var textareaId = "task-" + this.props.task.id;
        this.currentWording = CS.Models.WorkbookAreaTaskCommon.getNextWording(this.props.task);

        return (
            React.createElement("form", {role: "form", ref: "form", className: "item-composer task", onSubmit: this._handleFormSubmit}, 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("label", {htmlFor: textareaId}, this.currentWording.prompt), 
                    React.createElement("textarea", {className: "form-control", id: textareaId, onKeyUp: this._handleTextareaKeyUp})
                ), 
                React.createElement("button", {className: "btn btn-primary"}, "Add item"), 
                React.createElement("a", {onClick: this._setCurrentTaskAsSkippedAndReRender}, "Try another")
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
        this._initTextareaValue();
    },

    componentDidUpdate: function() {
        this._initTextareaValue();
    },

    _initElements: function () {
        this.$form = $(React.findDOMNode(this.refs.form));
        this.$textarea = this.$form.find("textarea");
    },

    _initTextareaValue: function () {
        if (this.currentWording.sentenceStart) {
            this.$textarea.val(this.currentWording.sentenceStart);
        }
    },

    getLocalStorageKeyForSkippedTaskPrompts: function () {
        return CS.Models.WorkbookAreaTaskCommon.getLocalStorageKeyForSkippedTaskPrompts(this.props.workbookArea.id);
    },

    _handleFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var itemNameToAdd = this.$textarea.val().trim();

        if (this._isValid(itemNameToAdd) && !CS.Controllers.WorkbookAreaCommon.doesItemAlreadyExist(itemNameToAdd, this.props.workbookArea.className)) {
            var updatedBlueprintAreaData = CS.account.data && !_.isEmpty(CS.account.data[this.props.workbookArea.className]) ? _.clone(CS.account.data[this.props.workbookArea.className], true) : [];
            updatedBlueprintAreaData.push({
                name: itemNameToAdd,
                notes: []
            });

            CS.account.data = CS.account.data || {};
            CS.account.data[this.props.workbookArea.className] = updatedBlueprintAreaData;

            CS.saveAccountData();
        }

        this._setCurrentTaskAsSkippedAndReRender();
    },

    _isValid: function(trimmedItemName) {
        if (!trimmedItemName) {
            return false;
        }

        if (!this.currentWording.sentenceStart) {
            return true;
        }

        return this.currentWording.sentenceStart.trim() !== trimmedItemName;
    },

    _setCurrentTaskAsSkippedAndReRender: function () {
        var skippedTaskPrompts = CS.Services.Browser.getFromLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts()) || [];
        skippedTaskPrompts.push(this.currentWording.prompt);

        CS.Services.Browser.saveInLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts(), skippedTaskPrompts);

        this._resetForm();
        this.props.controller.reRender();
    },

    _resetForm: function () {
        this.$textarea.val(null);
    },

    _handleTextareaKeyUp: function (e) {
        if (this.currentWording.sentenceStart && !_.startsWith(this.$textarea.val(), this.currentWording.sentenceStart)) {
            this.$textarea.val(this.currentWording.sentenceStart);
        }

        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, $.proxy(this._handleFormSubmit, this));
    }
});

CS.Controllers.WorkbookAreaPrioritizeItemsTask = React.createClass({displayName: "WorkbookAreaPrioritizeItemsTask",
    render: function () {
        var comingUpNextParagraph = null;
        if (this.props.comingUpNextText) {
            comingUpNextParagraph = (
                React.createElement("p", {className: "coming-up-next"}, "Coming up next: ", this.props.comingUpNextText)
                );
        }

        var currentWording = CS.Models.WorkbookAreaTaskCommon.getNextWording(this.props.task);

        return (
            React.createElement("div", {className: "workbook-task"}, 
                React.createElement("p", null, "Working on: ", this.props.task.workingOnText), 
                React.createElement("div", {className: "progress"}, 
                    React.createElement("div", {ref: "progressBar", className: "progress-bar progress-bar-success", role: "progressbar", "aria-valuenow": "0", "aria-valuemin": "0", "aria-valuemax": "100"}, "0%")
                ), 
                comingUpNextParagraph, 
                React.createElement("label", null, currentWording.prompt), 
                React.createElement("button", {className: "btn btn-primary", onClick: this._setCurrentWorkbookAreaAsPrioritizedAndReRender}, "I'm done prioritizing")
            )
            );
    },

    _setCurrentWorkbookAreaAsPrioritizedAndReRender: function () {
        var prioritizedWorkbookAreaIds = CS.account.data.prioritizedWorkbookAreaIds || [];
        prioritizedWorkbookAreaIds.push(this.props.workbookArea.id);

        CS.account.data.prioritizedWorkbookAreaIds = prioritizedWorkbookAreaIds;

        CS.saveAccountData();
        this.props.controller.reRender();
    }
});

CS.Controllers.WorkbookArea = P(function (c) {
    c.$el = $(document.getElementById("content"));

    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                controller: null,
                workbookArea: null,
                workbookItems: []
            };
        },

        render: function () {
            var taskReact = null;

            if (this.state.workbookArea) {
                var activeTask = _.find(CS.WorkbookAreaTasks, function(task) {  // Level 3
                    return task.workbookAreaId === this.state.workbookArea.id && task.level === 3 && task.isActive();
                }.bind(this)) ||
                    _.find(CS.WorkbookAreaTasks, function(task) {   // Level 2
                        return task.workbookAreaId === this.state.workbookArea.id && task.level === 2 && task.isActive();
                    }.bind(this)) ||
                    _.find(CS.WorkbookAreaTasks, function(task) {   // Level 1
                        return task.workbookAreaId === this.state.workbookArea.id && task.level === 1 && task.isActive();
                    }.bind(this));

                if (activeTask) {
                    if (activeTask.templateClassName === "WorkbookAreaPrioritizeItemsTask") {
                        var isWorkbookAreaPrioritized = _.includes(CS.account.data.prioritizedWorkbookAreaIds, this.state.workbookArea.id);
                        if (isWorkbookAreaPrioritized) {
                            taskReact = (
                                React.createElement("div", {className: "workbook-task"}, 
                                    React.createElement("p", null, "Prioritizing ", this.state.workbookArea.className.toLowerCase(), " - Task complete!"), 
                                    React.createElement("div", {className: "progress"}, 
                                        React.createElement("div", {className: "progress-bar progress-bar-success", role: "progressbar", "aria-valuenow": "100", "aria-valuemin": "0", "aria-valuemax": "100"}, "100%")
                                    )
                                )
                                );
                        }
                    }

                    if (!taskReact) {
                        var nextTask = _.find(CS.WorkbookAreaTasks, function(task) {
                            return task.previousTaskId === activeTask.id;
                        });

                        var comingUpNextText = nextTask ? nextTask.comingUpText : null;

                        taskReact = React.createElement(CS.Controllers[activeTask.templateClassName], {task: activeTask, workbookArea: this.state.workbookArea, comingUpNextText: comingUpNextText, controller: this.state.controller});
                    }
                }
            }

            return (
                React.createElement("div", {ref: "wrapper"}, 
                    taskReact, 

                    React.createElement("ul", {className: "styleless item-names-list"}, 
                        this.state.workbookItems.map(function (item, index) {
                            var reactItemId = "blueprint-item-" + item.name;

                            return React.createElement(CS.Controllers.WorkbookAreaWorkbookItem, {key: reactItemId, workbookAreaClassName: this.state.workbookArea.className, workbookItem: item, workbookItemIndex: index, controller: this});
                        }.bind(this))
                    ), 

                    React.createElement("form", {role: "form", className: "item-composer", onSubmit: this._handleComposerFormSubmit}, 
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

        componentDidUpdate: function() {
            this._initSortable();
        },

        _initElements: function () {
            this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
            this.$list = this.$wrapper.children("ul");
            this.$form = this.$wrapper.children("form");
            this.$addItemLink = this.$form.siblings(".add-item-link");
            this.$textarea = this.$form.children("textarea");
        },

        _initSortable: function () {
            if (!this.sortable) {
                this.sortable = new Sortable(this.$list[0],
                    {
                        animation: 150,
                        onUpdate: function () {
                            CS.Controllers.WorkbookAreaCommon.handleWorkbookItemsReordered(this.$list, this.state.workbookArea.className);
                        }.bind(this)
                    }
                );
            }
        },

        _showComposer: function () {
            this.$form.show();
            this.$textarea.focus();

            this.$addItemLink.hide();
        },

        _handleComposerFormSubmit: function (e) {
            if (e) {
                e.preventDefault();
            }

            var itemNameToAdd = this.$textarea.val().trim();

            if (itemNameToAdd && !CS.Controllers.WorkbookAreaCommon.doesItemAlreadyExist(itemNameToAdd, this.state.workbookArea.className)) {
                var updatedBlueprintAreaData = CS.account.data && !_.isEmpty(CS.account.data[this.state.workbookArea.className]) ? _.clone(CS.account.data[this.state.workbookArea.className], true) : [];
                updatedBlueprintAreaData.push({
                    name: itemNameToAdd,
                    notes: []
                });

                CS.account.data = CS.account.data || {};
                CS.account.data[this.state.workbookArea.className] = updatedBlueprintAreaData;

                this.state.controller.reRender();
                CS.saveAccountData();
            }

            CS.Controllers.WorkbookAreaCommon.resetAndHideForm(this.$textarea, $.proxy(this._hideForm, this));
        },

        _handleTextareaKeyUp: function (e) {
            CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, $.proxy(this._handleComposerFormSubmit, this), $.proxy(this._hideForm, this));
        },

        _hideForm: function () {
            this.$form.hide();
            this.$addItemLink.show();
        }
    });

    c.init = function (workbookArea) {
        this.workbookArea = workbookArea;

        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$el[0]
        );

        this.reRender();
    };

    c.reRender = function () {
        this.reactInstance.replaceState({
            controller: this,
            workbookArea: this.workbookArea,
            workbookItems: CS.account.data[this.workbookArea.className] ? CS.account.data[this.workbookArea.className] : []
        });
    };

    c.saveAccountData = function () {
        this.reRender();
        CS.saveAccountData();
    };
});

CS.Controllers.WorkbookAreaWorkbookItem = React.createClass({displayName: "WorkbookAreaWorkbookItem",
    render: function () {
        var href = "/workbook-items/" + this.props.workbookAreaClassName + "/" + this.props.workbookItemIndex;

        return (
            React.createElement("li", {ref: "li"}, 
                React.createElement("p", null, React.createElement("a", {href: href}, this.props.workbookItem.name)), 
                React.createElement("button", {className: "styleless fa fa-pencil", onClick: this._showEditor}), 
                React.createElement("form", {role: "form", className: "item-composer", onSubmit: this._handleComposerFormSubmit}, 
                    React.createElement("textarea", {className: "form-control", onKeyUp: this._handleTextareaKeyUp}), 
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

    _initElements: function() {
        this.$listItem = $(React.findDOMNode(this.refs.li));
        this.$list = this.$listItem.parent();

        this.$itemNameParagraph = this.$listItem.children("p");
        this.$editBtn = this.$listItem.children("button");
        this.$form = this.$listItem.children(".item-composer");
        this.$textarea = this.$form.children("textarea");

        this.$addItemLink = this.$list.siblings(".add-item-link");
    },

    _showEditor: function () {
        this._hideOtherOpenComposers();

        this.$textarea.val(this.props.workbookItem.name);

        this.$listItem.addClass(this.listItemEditModeClass);

        CS.Controllers.WorkbookAreaCommon.disableSortable(this.props.controller);

        this.$itemNameParagraph.hide();
        this.$editBtn.hide();
        this.$addItemLink.hide();
        this.$form.show();
        CS.Controllers.WorkbookAreaCommon.adaptTextareaHeight(this.$textarea);
        this.$textarea.focus();
    },

    _hideOtherOpenComposers: function() {
        var $listItems = this.$list.children();
        var $composerForms = $listItems.children(".item-composer");
        var $itemNameParagraphs = $listItems.children("p");
        var $editBtns = $listItems.children("button");

        $listItems.removeClass(this.listItemEditModeClass);
        $composerForms.hide();
        $itemNameParagraphs.show();
        $editBtns.show();
        this.$addItemLink.show();
    },

    _handleComposerFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var newItemName = this.$textarea.val().trim();
        var updatedBlueprintAreaData = CS.account.data && !_.isEmpty(CS.account.data[this.props.workbookAreaClassName]) ? _.clone(CS.account.data[this.props.workbookAreaClassName], true) : [];

        if (newItemName) {
            updatedBlueprintAreaData[this.props.workbookItemIndex].name = newItemName;
        } else {
            updatedBlueprintAreaData.splice(this.props.workbookItemIndex, 1);

            // We hide it from the UI to give faster feedback
            this.$listItem.hide();
        }

        CS.account.data = CS.account.data || {};
        CS.account.data[this.props.workbookAreaClassName] = updatedBlueprintAreaData;

        CS.Controllers.WorkbookAreaCommon.resetAndHideForm(this.$textarea, $.proxy(this._hideForm, this));
        CS.workbookAreaController.saveAccountData();
    },

    _handleTextareaKeyUp: function(e) {
        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, $.proxy(this._handleComposerFormSubmit, this), $.proxy(this._hideForm, this));
    },

    _hideForm: function() {
        this.$listItem.removeClass(this.listItemEditModeClass);
        this.$form.hide();
        this.$itemNameParagraph.show();
        this.$editBtn.show();
        this.$addItemLink.show();

        CS.Controllers.WorkbookAreaCommon.enableSortable(this.props.controller);
    }
});

CS.Controllers.WorkbookItemAddItemTask = React.createClass({displayName: "WorkbookItemAddItemTask",
    render: function () {
        var textareaId = "add-note-task";
        this.currentWording = CS.Models.WorkbookItemTaskCommon.getNextWording(this.props.task, this.props.workbookItemIndex);
        var currentWordingPrompt = CS.Services.String.template(this.currentWording.prompt, "itemName", this.props.workbookItemName);

        return (
            React.createElement("div", {className: "workbook-task", ref: "wrapper"}, 
                React.createElement("p", null, "Working on: ", this.props.task.workingOnText), 
                React.createElement("div", {className: "progress"}, 
                    React.createElement("div", {className: "progress-bar progress-bar-success", role: "progressbar", "aria-valuenow": "", "aria-valuemin": "0", "aria-valuemax": "100"})
                ), 
                React.createElement("form", {role: "form", className: "item-composer task", onSubmit: this._handleFormSubmit}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {htmlFor: textareaId, dangerouslySetInnerHTML: {__html: currentWordingPrompt}}), 
                        React.createElement("textarea", {className: "form-control", id: textareaId, onKeyUp: this._handleTextareaKeyUp})
                    ), 
                    React.createElement("button", {className: "btn btn-primary"}, "Add note"), 
                    React.createElement("a", {onClick: this._setCurrentTaskAsSkippedAndReRender}, "Try another")
                )
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
        this._initProgressBar();
        this._initTextareaValue();
    },

    componentDidUpdate: function() {
        this._initProgressBar();
        this._initTextareaValue();
    },

    _initElements: function () {
        this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
        this.$progressBar = this.$wrapper.find(".progress-bar");
        this.$form = this.$wrapper.children("form");
        this.$textarea = this.$form.find("textarea");
    },

    _initProgressBar: function() {
        var itemCount = CS.account.data[this.props.workbookArea.className][this.props.workbookItemIndex].notes.length;
        CS.Controllers.WorkbookCommon.setProgressBarWidth(this.$progressBar, itemCount, this.props.task.stepCount);
    },

    _initTextareaValue: function () {
        if (this.currentWording.sentenceStart) {
            this.$textarea.val(this.currentWording.sentenceStart);
        }
    },

    getLocalStorageKeyForSkippedTaskPrompts: function () {
        return CS.Models.WorkbookItemTaskCommon.getLocalStorageKeyForSkippedTaskPrompts(this.props.workbookArea.id, this.props.workbookItemIndex);
    },

    _handleFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var itemNoteToAdd = this.$textarea.val().trim();

        if (this._isValid(itemNoteToAdd) && !CS.Controllers.WorkbookItemCommon.doesItemAlreadyExist(itemNoteToAdd, this.props.workbookArea.className, this.props.workbookItemIndex)) {
            var updatedWorkbookItemNotesData = CS.account.data[this.props.workbookArea.className][this.props.workbookItemIndex].notes || [];
            updatedWorkbookItemNotesData.push(itemNoteToAdd);

            CS.account.data[this.props.workbookArea.className][this.props.workbookItemIndex].notes = updatedWorkbookItemNotesData;

            CS.saveAccountData();
        }

        this._setCurrentTaskAsSkippedAndReRender();
    },

    _isValid: function(trimmedItemNote) {
        if (!trimmedItemNote) {
            return false;
        }

        if (!this.currentWording.sentenceStart) {
            return true;
        }

        return this.currentWording.sentenceStart.trim() !== trimmedItemNote;
    },

    _setCurrentTaskAsSkippedAndReRender: function () {
        var skippedTaskPrompts = CS.Services.Browser.getFromLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts()) || [];
        skippedTaskPrompts.push(this.currentWording.prompt);

        CS.Services.Browser.saveInLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts(), skippedTaskPrompts);

        this._resetForm();
        this.props.controller.reRender();
    },

    _resetForm: function () {
        this.$textarea.val(null);
    },

    _handleTextareaKeyUp: function (e) {
        if (this.currentWording.sentenceStart && !_.startsWith(this.$textarea.val(), this.currentWording.sentenceStart)) {
            this.$textarea.val(this.currentWording.sentenceStart);
        }

        CS.Controllers.WorkbookItemCommon.handleTextareaKeyUp(e);
    }
});

CS.Controllers.WorkbookItem = P(function (c) {
    c.$el = $(document.getElementById("content"));

    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                controller: null,
                workbookArea: null,
                workbookItem: null,
                workbookItemIndex: null
            };
        },

        render: function () {
            var taskReact = null;

            if (this.state.workbookArea) {
                var activeTask = _.find(CS.WorkbookItemTasks, function (task) {
                    return task.workbookAreaId === this.state.workbookArea.id && task.isActive(this.state.workbookItemIndex);
                }.bind(this));

                if (activeTask) {
                    taskReact = React.createElement(CS.Controllers[activeTask.templateClassName], {task: activeTask, workbookArea: this.state.workbookArea, workbookItemName: this.state.workbookItem.name, workbookItemIndex: this.state.workbookItemIndex, controller: this.state.controller});
                }
            }

            var listItems = null;
            if (this.state.workbookItem && !_.isEmpty(this.state.workbookItem.notes)) {
                listItems = this.state.workbookItem.notes.map(function (note, index) {
                    var reactItemId = "workbook-item-note" + note;

                    return React.createElement(CS.Controllers.WorkbookItemNote, {key: reactItemId, workbookAreaClassName: this.state.workbookArea.className, workbookItem: this.state.workbookItem, workbookItemIndex: this.state.workbookItemIndex, workbookItemNote: note, workbookItemNoteIndex: index});
                }.bind(this));
            }

            return (
                React.createElement("div", {ref: "wrapper"}, 
                    taskReact, 

                    React.createElement("ul", {className: "styleless item-notes-list"}, 
                        listItems
                    ), 

                    React.createElement("form", {role: "form", className: "item-composer note", onSubmit: this._handleComposerFormSubmit}, 
                        React.createElement("textarea", {className: "form-control", onKeyUp: this._handleTextareaKeyUp}), 
                        React.createElement("button", {className: "btn btn-primary"}, "Add"), 
                        React.createElement("button", {type: "button", className: "styleless fa fa-times", onClick: this._hideForm})
                    ), 

                    React.createElement("a", {className: "add-item-link", onClick: this._showComposer}, "+ Add note")
                )
                );
        },

        componentDidMount: function () {
            this._initElements();
        },

        _initElements: function () {
            this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
            this.$list = this.$wrapper.children("ul");
            this.$form = this.$wrapper.children("form");
            this.$addNoteLink = this.$form.siblings(".add-item-link");
            this.$textarea = this.$form.children("textarea");
        },

        _showComposer: function () {
            this.$form.show();
            this.$textarea.focus();

            this.$addNoteLink.hide();
        },

        _handleComposerFormSubmit: function (e) {
            if (e) {
                e.preventDefault();
            }

            var itemNoteToAdd = this.$textarea.val().trim();

            if (itemNoteToAdd && !CS.Controllers.WorkbookItemCommon.doesItemAlreadyExist(itemNoteToAdd, this.state.workbookArea.className, this.state.workbookItemIndex)) {
                var updatedWorkbookItemNotesData = CS.account.data[this.state.workbookArea.className][this.state.workbookItemIndex].notes || [];
                updatedWorkbookItemNotesData.push(itemNoteToAdd);

                CS.account.data[this.state.workbookArea.className][this.state.workbookItemIndex].notes = updatedWorkbookItemNotesData;

                this.state.controller.reRender();
                CS.saveAccountData();
            }

            CS.Controllers.WorkbookItemCommon.resetAndHideForm(this.$textarea, $.proxy(this._hideForm, this));
        },

        _handleTextareaKeyUp: function (e) {
            CS.Controllers.WorkbookItemCommon.handleTextareaKeyUp(e, $.proxy(this._hideForm, this));
        },

        _hideForm: function () {
            this.$form.hide();
            this.$addNoteLink.show();
        }
    });

    c.init = function (workbookArea, workbookItem) {
        this.workbookArea = workbookArea;
        this.workbookItem = workbookItem;

        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$el[0]
        );

        this.reRender();
    };

    c.reRender = function () {
        this.reactInstance.replaceState({
            controller: this,
            workbookArea: this.workbookArea,
            workbookItem: _.find(CS.account.data[this.workbookArea.className], "name", this.workbookItem.name),
            workbookItemIndex: _.findIndex(CS.account.data[this.workbookArea.className], "name", this.workbookItem.name)
        });
    };

    c.saveAccountData = function () {
        this.reRender();
        CS.saveAccountData();
    };
});

CS.Controllers.WorkbookItemNote = React.createClass({displayName: "WorkbookItemNote",
    render: function () {
        var noteText = CS.Services.String.textToHtml(this.props.workbookItemNote);

        return (
            React.createElement("li", {ref: "li"}, 
                React.createElement("p", {dangerouslySetInnerHTML: {__html: noteText}}), 
                React.createElement("button", {className: "styleless fa fa-pencil", onClick: this._showEditor}), 
                React.createElement("form", {role: "form", className: "item-composer note", onSubmit: this._handleComposerFormSubmit}, 
                    React.createElement("textarea", {className: "form-control", onKeyUp: this._handleTextareaKeyUp}), 
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

    _initElements: function() {
        this.$listItem = $(React.findDOMNode(this.refs.li));
        this.$list = this.$listItem.parent();

        this.$itemNoteParagraph = this.$listItem.children("p");
        this.$editBtn = this.$listItem.children("button");
        this.$form = this.$listItem.children(".item-composer");
        this.$textarea = this.$form.children("textarea");

        this.$addNoteLink = this.$list.siblings(".add-item-link");
    },

    _showEditor: function () {
        this._hideOtherOpenComposers();

        this.$textarea.val(this.props.workbookItemNote);

        this.$listItem.addClass(this.listItemEditModeClass);

        this.$itemNoteParagraph.hide();
        this.$editBtn.hide();
        this.$addNoteLink.hide();
        this.$form.show();
        CS.Controllers.WorkbookItemCommon.adaptTextareaHeight(this.$textarea);
        this.$textarea.focus();
    },

    _hideOtherOpenComposers: function() {
        var $listItems = this.$list.children();
        var $composerForms = $listItems.children(".item-composer");
        var $itemNoteParagraphs = $listItems.children("p");
        var $editBtns = $listItems.children("button");

        $listItems.removeClass(this.listItemEditModeClass);
        $composerForms.hide();
        $itemNoteParagraphs.show();
        $editBtns.show();
        this.$addNoteLink.show();
    },

    _handleComposerFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var newItemNote = this.$textarea.val().trim();
        var updatedWorkbookItemNotesData = CS.account.data[this.props.workbookAreaClassName][this.props.workbookItemIndex].notes || [];

        if (newItemNote) {
            updatedWorkbookItemNotesData[this.props.workbookItemNoteIndex] = newItemNote;
        } else {
            updatedWorkbookItemNotesData.splice(this.props.workbookItemNoteIndex, 1);

            // We hide it from the UI to give faster feedback
            this.$listItem.hide();
        }

        CS.account.data[this.props.workbookAreaClassName][this.props.workbookItemIndex].notes = updatedWorkbookItemNotesData;

        CS.Controllers.WorkbookItemCommon.resetAndHideForm(this.$textarea, $.proxy(this._hideForm, this));
        CS.workbookItemController.saveAccountData();
    },

    _handleTextareaKeyUp: function(e) {
        CS.Controllers.WorkbookItemCommon.handleTextareaKeyUp(e, $.proxy(this._handleComposerFormSubmit, this), $.proxy(this._hideForm, this));
    },

    _hideForm: function() {
        this.$listItem.removeClass(this.listItemEditModeClass);
        this.$form.hide();
        this.$itemNoteParagraph.show();
        this.$editBtn.show();
        this.$addNoteLink.show();
    }
});

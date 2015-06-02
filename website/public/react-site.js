CS.Controllers.AddCustomTask = React.createClass({displayName: "AddCustomTask",
    render: function () {
        return (
            React.createElement("div", {ref: "wrapper"}, 
                React.createElement("a", {id: "add-custom-task-link", onClick: this._handleAddCustomTaskClick}, "Add custom task"), 

                React.createElement("form", {onSubmit: this._handleFormSubmit}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {htmlFor: "tip"}, "Tip"), 
                        React.createElement("textarea", {className: "form-control", id: "tip", maxLength: "512", onKeyUp: this._handleTextareaKeyUp}), 

                        React.createElement("p", {className: "field-error", "data-check": "max-length"}, "512 characters maximum")
                    ), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {htmlFor: "question"}, "Question"), 
                        React.createElement("textarea", {className: "form-control", id: "question", maxLength: "512", onKeyUp: this._handleTextareaKeyUp}), 

                        React.createElement("p", {className: "field-error", "data-check": "max-length"}, "512 characters maximum")
                    ), 

                    React.createElement("div", {className: "centered-contents"}, 
                        React.createElement("button", {className: "btn btn-warning"}, "Add task")
                    )
                )
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
        this._initValidation();
    },

    _initElements: function () {
        this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
        this.$form = this.$wrapper.children("form");
        this.$tipField = this.$form.find("#tip");
        this.$questionField = this.$form.find("#question");

        this.$setThreeStandoutsLink = $("#set-three-standouts-link");
    },

    _initValidation: function() {
        this.validator = CS.Services.Validator([
            "tip",
            "question"
        ]);
    },

    _handleAddCustomTaskClick: function () {
        this.$form.toggle();
        this.$setThreeStandoutsLink.toggle();
    },

    _handleTextareaKeyUp: function (e) {
        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleFormSubmit);
    },

    _handleFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        if (this.validator.isValid()) {
            var tip = this.$tipField.val().trim();
            var question = this.$questionField.val().trim();

            var task = {
                accountId: CS.account.id,
                tip: tip || null,
                question: question || null,
                workbookAreaId: this.props.workbookAreaId,
                workbookItemIndex: this.props.workbookItemIndex
            };

            if (task.tip || task.question) {
                this._addCustomTask(task);
            }
        }
    },

    _addCustomTask: function (task) {
        var type = "POST";
        var url = "/api/custom-tasks";

        $.ajax({
            url: url,
            type: type,
            contentType: "application/json",
            data: JSON.stringify(task),
            success: function (id) {
                this.$form[0].reset();

                task.id = id;
                task.templateClassName = _.isNumber(this.props.workbookItemIndex) ? CS.Controllers.WorkbookAreaCommon.customItemTaskTemplateClassName : CS.Controllers.WorkbookAreaCommon.customAreaTaskTemplateClassName;

                this.props.controller.customTasks.push(task);
                this.props.controller.isCustomTaskComplete = false;
                this.props.controller.reRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

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

    c.init = function () {
        CS.blueprintAreasModel = CS.Models.BlueprintAreas();
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
    };

    c._initEvents = function () {
        this.$menuBtn.click(this._toggleMenu.bind(this));
        this.$contentOverlayWhenMenuOpen.click(this.hideMenu.bind(this));

        this.$selectAreasLink.click(this._showModal.bind(this));
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
        CS.taskNotificationsController.hide();
        this.$mainContainer.toggleClass("menu-open");
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
                        var id = "notification-for-task-" + task.entityType + "-" + task.id;

                        var workbookArea = CS.blueprintAreasModel.getOfId(task.getWorkbookArea().id);

                        var href = task.entityType === CS.Controllers.WorkbookCommon.entityTypes.workbookArea ?
                            "/workbook-areas/" + workbookArea.className + "?taskIdToMarkAsViewed=" + task.entityType + "-" + task.id :
                            "/workbook-items/" + workbookArea.className + "/" + task.itemIndex + "?taskIdToMarkAsViewed=" + task.entityType + "-" + task.id;

                        var liClasses = classNames({
                            "clicked": _.includes(CS.account.data.clickedTaskIds, task.entityType + "-" + task.id)
                        });

                        return (
                            React.createElement("li", {key: id, className: liClasses}, 
                                React.createElement("a", {href: href}, task.notificationText)
                            )
                            );
                    }), 

                    this.state.doneTasks.map(function (task) {
                        var id = "notification-for-task-" + task.entityType + "-" + task.id;

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
        this.$taskNotificationsBtn.click(this._toggleNotifications.bind(this));
        this.$contentOverlayWhenMenuOpen.click(this.hide.bind(this));
    };

    c.reRender = function () {
        this.activeAreaTasks = this._getActiveAreaTasks();
        this.activeItemTasks = this._getActiveItemTasks();

        var newAreaTasks = this._getNewTasks(this.activeAreaTasks, CS.Controllers.WorkbookCommon.entityTypes.workbookArea);
        var newItemTasks = this._getNewTasks(this.activeItemTasks, CS.Controllers.WorkbookCommon.entityTypes.workbookItem);

        this.reactInstance.replaceState({
            activeTasks: this._getPrioritizedActiveTasks(newAreaTasks, newItemTasks),
            doneTasks: this._getDoneTasks()
        });

        if (newAreaTasks.length + newItemTasks.length > 0) {
            this.$taskNotificationsBtn.addClass("with-new-items");
            this.$newTaskCountSpan.html(newAreaTasks.length + newItemTasks.length);
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

    c._getActiveAreaTasks = function () {
        var result = [];

        CS.WorkbookAreaTasks.forEach(function (task) {
            if (task.notificationText && task.isActive()) {
                task.entityType = CS.Controllers.WorkbookCommon.entityTypes.workbookArea;
                result.push(task);
            }
        });

        return result;
    };

    c._getActiveItemTasks = function () {
        var result = [];

        // For each active area, get the list of items
        CS.blueprintAreasModel.getActive().forEach(function (workbookArea) {
            var workbookItemTasksForThisArea = _.filter(CS.WorkbookItemTasks, "workbookAreaId", workbookArea.id);
            var workbookItems = CS.account.data[workbookArea.className];

            workbookItemTasksForThisArea.forEach(function (task) {
                if (task.notificationText) {
                    // Call isActive() for each item. Stop on the first found.
                    for (var i = 0; i < _.size(workbookItems); i++) {
                        if (task.isActive(i) && !task.isDone(i)) {
                            // Add that task to the list of active ones
                            task.entityType = CS.Controllers.WorkbookCommon.entityTypes.workbookItem;
                            task.itemIndex = i;
                            result.push(task);

                            break;
                        }
                    }
                }
            });
        });

        return result;
    };

    c._getNewTasks = function (tasks, prefix) {
        return _.reject(tasks, function (task) {
            return _.include(CS.account.data.viewedTaskIds, prefix + "-" + task.id);
        });
    };

    c._getPrioritizedActiveTasks = function (newAreaTasks, newItemTasks) {
        var oldAreaTasks = _.reject(this.activeAreaTasks, function (task) {
            return _.find(newAreaTasks, "id", task.id);
        });

        var activeOldLvl1Tasks = _.filter(oldAreaTasks, function (task) {
            return task.level === 1;
        });

        var prioritizedOldLvl1Tasks = _.sortBy(activeOldLvl1Tasks, function (task) {
            var workbookArea = CS.blueprintAreasModel.getOfId(task.getWorkbookArea().id);
            return CS.account.data[workbookArea.className] ? -CS.account.data[workbookArea.className].length : 0;
        });

        var activeOldLvl2Tasks = _.filter(oldAreaTasks, function (task) {
            return task.level === 2;
        });

        var prioritizedOldLvl2Tasks = _.sortBy(activeOldLvl2Tasks, function (task) {
            var workbookArea = CS.blueprintAreasModel.getOfId(task.getWorkbookArea().id);
            return CS.account.data[workbookArea.className] ? -CS.account.data[workbookArea.className].length : 0;
        });

        var activeOldLvl3Tasks = _.filter(oldAreaTasks, function (task) {
            return task.level === 3;
        });

        var activeOldItemTasks = _.reject(this.activeItemTasks, function (task) {
            return _.find(newItemTasks, "id", task.id);
        });

        return _.union(newAreaTasks, newItemTasks, prioritizedOldLvl1Tasks, prioritizedOldLvl2Tasks, activeOldLvl3Tasks, activeOldItemTasks);
    };

    c._getDoneTasks = function () {
        var doneAreaTasks = [];

        CS.WorkbookAreaTasks.forEach(function (task) {
            if (task.notificationText && task.isDone()) {
                task.entityType = CS.Controllers.WorkbookCommon.entityTypes.workbookArea;
                doneAreaTasks.push(task);
            }
        });

        var doneItemTasks = [];

        CS.blueprintAreasModel.getActive().forEach(function (workbookArea) {
            var workbookItemTasksForThisArea = _.filter(CS.WorkbookItemTasks, "workbookAreaId", workbookArea.id);
            var workbookItems = CS.account.data[workbookArea.className];

            workbookItemTasksForThisArea.forEach(function (task) {
                for (var i = 0; i < _.size(workbookItems); i++) {
                    if (task.isDone(i)) {
                        task.entityType = CS.Controllers.WorkbookCommon.entityTypes.workbookItem;
                        doneItemTasks.push(task);

                        break;
                    }
                }
            });
        });

        return _.union(doneAreaTasks, doneItemTasks);
    };

    c._toggleNotifications = function () {
        CS.mainMenuController.hideMenu();
        this.$mainContainer.toggleClass("task-notifications-open");
        this.$taskNotificationsBtn.removeClass("with-new-items");

        this._fetchLatestAccountDataAndUpdateIt();
    };

    c._fetchLatestAccountDataAndUpdateIt = function () {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var activeTasks = _.union(this.activeAreaTasks, this.activeItemTasks);

                // The reason why we store the taskIds and not the tasks themselves is because the isActive() function isn't serialized
                var viewedTaskIds = _.union(activeTasks.map(function (task) {
                        return task.entityType + "-" + task.id;
                    }),
                    CS.account.data.viewedTaskIds
                );

                if (!_.isEmpty(_.difference(viewedTaskIds, CS.account.data.viewedTaskIds))) {
                    CS.account.data.viewedTaskIds = viewedTaskIds;
                    CS.saveAccountData();
                }
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    };
});

CS.Controllers.OverviewBlueprintAreaComposer = React.createClass({displayName: "OverviewBlueprintAreaComposer",
    addItemComposerOpenCssClass: "add-item-composer-open",

    render: function () {
        return (
            React.createElement("section", {ref: "wrapper", className: "add-item-section"}, 
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
            this._fetchLatestAccountDataAndUpdateIt(itemNameToAdd);
        }

        CS.Controllers.WorkbookAreaCommon.resetAndHideForm(this.$textarea, this._hideForm);
    },

    _handleTextareaKeyUp: function (e) {
        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleComposerFormSubmit, this._hideForm);
    },

    _hideForm: function () {
        this.$well.removeClass(this.addItemComposerOpenCssClass);

        CS.overviewController.rePackerise();
    },

    _fetchLatestAccountDataAndUpdateIt: function(itemNameToAdd) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var updatedBlueprintAreaData = !_.isEmpty(CS.account.data[this.props.blueprintAreaClassName]) ? _.clone(CS.account.data[this.props.blueprintAreaClassName], true) : [];
                updatedBlueprintAreaData.push({
                    name: itemNameToAdd,
                    notes: []
                });

                CS.account.data[this.props.blueprintAreaClassName] = updatedBlueprintAreaData;
                CS.overviewController.saveAccountData();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

CS.Controllers.OverviewBlueprintAreaPanel = React.createClass({displayName: "OverviewBlueprintAreaPanel",
    render: function () {
        var workbookAreaTitleHref = "/workbook-areas/" + this._getBlueprintArea().className;

        var threeStandoutsPanelReact = null;

        if (CS.account.data && CS.account.data.standouts && CS.account.data.standouts[this._getBlueprintArea().className]) {
            threeStandoutsPanelReact = React.createElement(CS.Controllers.OverviewThreeStandoutsPanel, {workbookArea: this._getBlueprintArea(), threeStandouts: CS.account.data.standouts[this._getBlueprintArea().className]});
        }

        var wellClasses = classNames("well", {
            "collapsed-list": this.props.blueprintAreaWithData.items.length > CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
            "hidd3n": threeStandoutsPanelReact !== null
        });

        var workbookAreaDescription = _.find(CS.Controllers.Texts, function(text) {
            return text.type === "workbook-area-description" &&
                text.workbookAreaClassName === this._getBlueprintArea().className;
        }.bind(this)).htmlText;

        return (
            React.createElement("li", {className: "blueprint-area-panel", ref: "li"}, 
                React.createElement("div", {className: wellClasses}, 
                    React.createElement("h2", null, React.createElement("a", {href: workbookAreaTitleHref}, this._getBlueprintArea().title)), 
                    React.createElement("button", {className: "styleless fa fa-chevron-down menu", onClick: this._showActionsMenu}), 

                    React.createElement(CS.Controllers.OverviewWorkbookAreaActions, {workbookArea: this._getBlueprintArea(), controller: this}), 

                    React.createElement("ul", {className: "styleless item-names-list"}, 
                        this.props.blueprintAreaWithData.items.map(function (item, index) {
                            var reactItemId = this._getBlueprintArea().className + "-blueprint-item-" + index + "-" + item.name;

                            return React.createElement(CS.Controllers.OverviewBlueprintItem, {key: reactItemId, blueprintAreaWithData: this.props.blueprintAreaWithData, blueprintItemIndex: index, controller: this});
                        }.bind(this))
                    ), 

                    React.createElement("button", {className: "styleless fa fa-chevron-down expand", onClick: this._toggleCollapsedList}), 
                    React.createElement("button", {className: "styleless fa fa-chevron-up", onClick: this._toggleCollapsedList}), 

                    React.createElement(CS.Controllers.OverviewBlueprintAreaComposer, {blueprintAreaClassName: this._getBlueprintArea().className})
                ), 

                threeStandoutsPanelReact, 

                React.createElement("div", {className: "modal fade workbook-area-description-modal"}, 
                    React.createElement("div", {className: "modal-dialog"}, 
                        React.createElement("div", {className: "modal-content"}, 
                            React.createElement("div", {className: "modal-header"}, 
                                React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close"}, 
                                    React.createElement("span", {"aria-hidden": "true"}, "×")
                                ), 
                                React.createElement("h2", {className: "modal-title"}, this._getBlueprintArea().title)
                            ), 
                            React.createElement("div", {className: "modal-body workbook-area-description-text-wrapper", dangerouslySetInnerHTML: {__html: workbookAreaDescription}}), 
                            React.createElement("div", {className: "modal-footer"}, 
                                React.createElement("button", {type: "button", className: "btn btn-default", "data-dismiss": "modal"}, "Close")
                            )
                        )
                    )
                )
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
        this._initSortable();
        this._initNonReactableEvents();
    },

    _getBlueprintArea: function () {
        return this.props.blueprintAreaWithData.blueprintArea;
    },

    _initElements: function () {
        this.$listItem = $(React.findDOMNode(this.refs.li));
        this.$well = this.$listItem.children(".well");
        this.$areaDescriptionModal = this.$listItem.children(".workbook-area-description-modal");
        this.$actionsMenu = this.$well.children(".workbook-area-actions");
        this.$itemNamesList = this.$well.children(".item-names-list");

        this.$mainContainer = $("#container");
        this.$contentOverlayWhenMenuOpen = this.$mainContainer.find("#content-overlay-when-menu-open");
    },

    _initSortable: function () {
        this.sortable = new Sortable(this.$itemNamesList[0],
            {
                animation: 150,
                onUpdate: function () {
                    CS.Controllers.WorkbookAreaCommon.handleWorkbookItemsReordered(this.$itemNamesList.children(), this._getBlueprintArea().className, CS.overviewController.reRender.bind(CS.overviewController));
                }.bind(this),
                handle: ".fa-bars"
            }
        );
    },

    _initNonReactableEvents: function() {
        this.$contentOverlayWhenMenuOpen.click(this.hideActionsMenu);
        this.$areaDescriptionModal.on("hidden.bs.modal", this._saveAreaDescriptionAsClosed);
    },

    _toggleCollapsedList: function () {
        this.$well.toggleClass("collapsed-list");
        this.$well.toggleClass("expanded-list");

        CS.overviewController.rePackerise();
    },

    _showActionsMenu: function() {
        this.$mainContainer.addClass("workbook-area-actions-menu-open");
        this.$actionsMenu.show();
    },

    hideActionsMenu: function() {
        this.$mainContainer.removeClass("workbook-area-actions-menu-open");
        this.$actionsMenu.hide();
    },

    _saveAreaDescriptionAsClosed: function() {
        CS.Controllers.WorkbookCommon.saveAreaDescriptionAsClosed(this._getBlueprintArea().id);
    }
});

CS.Controllers.OverviewBlueprintItem = React.createClass({displayName: "OverviewBlueprintItem",
    render: function () {
        var href = "/workbook-items/" + this._getBlueprintAreaClassName() + "/" + this.props.blueprintItemIndex;

        // TODO: replace .fa-bars element from <span> back to <button> after bug https://github.com/RubaXa/Sortable/issues/370 is fixed

        return (
            React.createElement("li", {ref: "li"}, 
                React.createElement("div", {className: "notes-indicator"}), 
                React.createElement("span", {className: "fa fa-bars"}), 
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
        CS.Controllers.WorkbookAreaCommon.initNotesIndicator(this.$notesIndicator, CS.account.data[this._getBlueprintAreaClassName()][this.props.blueprintItemIndex].notes.length);
    },

    _getBlueprintAreaClassName: function() {
        return this.props.blueprintAreaWithData.blueprintArea.className;
    },

    _getBlueprintItemName: function () {
        return this.props.blueprintAreaWithData.items[this.props.blueprintItemIndex].name;
    },

    _initElements: function() {
        this.$listItem = $(React.findDOMNode(this.refs.li));
        this.$notesIndicator = this.$listItem.children(".notes-indicator");
        this.$itemNameParagraph = this.$listItem.children("p");
        this.$editBtn = this.$listItem.children(".fa-pencil");
        this.$form = this.$listItem.children(".item-composer");
        this.$textarea = this.$form.children("textarea");

        this.$blueprintAreaWell = this.$listItem.parents(".blueprint-area-panel").children();
    },

    _showEditor: function () {
        this._hideOtherOpenComposers();

        this.$textarea.val(this._getBlueprintItemName());

        this.$listItem.addClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);

        CS.Controllers.WorkbookAreaCommon.disableSortable(this.props.controller);

        this.$itemNameParagraph.hide();
        this.$editBtn.hide();
        this.$blueprintAreaWell.addClass("editing");
        this.$form.show();
        CS.Controllers.WorkbookAreaCommon.adaptTextareaHeight(this.$textarea);
        this.$textarea.focus();

        CS.overviewController.rePackerise();
    },

    _hideOtherOpenComposers: function() {
        var $listItems = CS.overviewController.$el.find(".item-names-list").children();
        var $composerForms = $listItems.children(".item-composer");
        var $itemNameParagraphs = $listItems.children("p");
        var $editBtns = $listItems.children(".fa-pencil");
        var $addItemLinks = CS.overviewController.$el.find(".add-item-link");

        $listItems.removeClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);
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
        this._fetchLatestAccountDataAndUpdateIt(newItemName);
    },

    _handleTextareaKeyUp: function(e) {
        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleComposerFormSubmit, this._hideForm);
    },

    _hideForm: function() {
        this.$listItem.removeClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);
        this.$form.hide();
        this.$itemNameParagraph.show();
        this.$editBtn.show();
        this.$blueprintAreaWell.removeClass("editing");

        CS.overviewController.rePackerise();
        CS.Controllers.WorkbookAreaCommon.enableSortable(this.props.controller);
    },

    _fetchLatestAccountDataAndUpdateIt: function(newItemName) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var updatedBlueprintAreaData = !_.isEmpty(CS.account.data[this._getBlueprintAreaClassName()]) ? _.clone(CS.account.data[this._getBlueprintAreaClassName()], true) : [];

                if (newItemName) {
                    updatedBlueprintAreaData[this.props.blueprintItemIndex].name = newItemName;
                } else {
                    updatedBlueprintAreaData.splice(this.props.blueprintItemIndex, 1);

                    // We hide it from the UI to give faster feedback
                    this.$listItem.hide();
                }

                CS.Controllers.WorkbookAreaCommon.resetAndHideForm(this.$textarea, this._hideForm);

                CS.account.data[this._getBlueprintAreaClassName()] = updatedBlueprintAreaData;
                CS.overviewController.saveAccountData();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
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

CS.Controllers.OverviewThreeStandoutsPanel = React.createClass({displayName: "OverviewThreeStandoutsPanel",
    render: function () {
        var workbookAreaTitleHref = "/workbook-areas/" + this.props.workbookArea.className;
        var humanReadableClassName = this.props.workbookArea.humanReadableClassName.toLowerCase();

        return (
            React.createElement("div", {className: "three-standouts well", ref: "wrapper"}, 
                React.createElement("h2", null, React.createElement("i", {className: "fa fa-star"}), "Top-3 ", React.createElement("a", {href: workbookAreaTitleHref}, humanReadableClassName), React.createElement("i", {className: "fa fa-star"})), 
                React.createElement("button", {className: "styleless fa fa-times", onClick: this._hide}), 

                React.createElement("ul", null, 
                    React.createElement("li", null, this.props.threeStandouts[0]), 
                    React.createElement("li", null, this.props.threeStandouts[1]), 
                    React.createElement("li", null, this.props.threeStandouts[2])
                )
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
    },

    _initElements: function() {
        this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
        this.$workbookAreaPanel = this.$wrapper.siblings(".well");
    },

    _hide: function() {
        CS.Services.Animator.fadeOut(this.$wrapper, {
            animationDuration: CS.animationDuration.short,
            onComplete: function () {
                CS.Services.Animator.fadeIn(this.$workbookAreaPanel);
                CS.overviewController.rePackerise();
            }.bind(this)
        });

        CS.overviewController.rePackerise();
    }
});

CS.Controllers.OverviewWorkbookAreaActions = React.createClass({displayName: "OverviewWorkbookAreaActions",
    render: function () {
        var threeStandoutsItemReact = null;

        if (CS.account.data && CS.account.data.standouts && CS.account.data.standouts[this.props.workbookArea.className]) {
            threeStandoutsItemReact = (
                React.createElement("li", null, React.createElement("i", {className: "fa fa-star"}), React.createElement("a", {onClick: this._showThreeStandouts}, "Standouts"))
                );
        }

        return (
            React.createElement("section", {className: "workbook-area-actions", ref: "wrapper"}, 
                React.createElement("ul", {className: "styleless"}, 
                    React.createElement("li", null, React.createElement("i", {className: "fa fa-question-circle"}), React.createElement("a", {onClick: this._showWorkbookAreaDescriptionModal}, "Area info")), 
                    React.createElement("li", null, React.createElement("i", {className: "fa fa-eye-slash"}), React.createElement("a", {onClick: this._hideBlueprintAreaPanel}, "Hide this area")), 
                    threeStandoutsItemReact
                )
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
    },

    _initElements: function () {
        this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
        this.$workbookAreaPanel = this.$wrapper.parent();
        this.$threeStandoutsPanel = this.$workbookAreaPanel.siblings(".three-standouts");
        this.$areaDescriptionModal = this.$workbookAreaPanel.siblings(".workbook-area-description-modal");
    },

    _showWorkbookAreaDescriptionModal: function() {
        this.props.controller.hideActionsMenu();

        this.$areaDescriptionModal.modal();
    },

    _hideBlueprintAreaPanel: function () {
        this.props.controller.hideActionsMenu();

        this.props.workbookArea.deactivate();
        CS.overviewController.reRender();
    },

    _showThreeStandouts: function() {
        this.props.controller.hideActionsMenu();

        CS.Services.Animator.fadeOut(this.$workbookAreaPanel, {
            animationDuration: CS.animationDuration.short,
            onComplete: function () {
                CS.Services.Animator.fadeIn(this.$threeStandoutsPanel);
                CS.overviewController.rePackerise();
            }.bind(this)
        });
    }
});

CS.Controllers.AdminPanel = React.createClass({displayName: "AdminPanel",
    render: function () {
        return (
            React.createElement("section", {className: "admin-panel"}, 
                React.createElement(CS.Controllers.AddCustomTask, {workbookAreaId: this.props.workbookArea.id, controller: this.props.controller}), 
                React.createElement(CS.Controllers.SetThreeStandouts, {workbookArea: this.props.workbookArea, controller: this.props.controller})
            )
            );
    }
});

CS.Controllers.SetThreeStandouts = React.createClass({displayName: "SetThreeStandouts",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("a", {id: "set-three-standouts-link", onClick: this._handleSetThreeStandoutsClick}, "Three standouts"), 

                React.createElement("form", {onSubmit: this._handleFormSubmit, ref: "form"}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("input", {type: "text", className: "form-control", id: "first-standout", maxLength: "64"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("input", {type: "text", className: "form-control", id: "second-standout", maxLength: "64"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("input", {type: "text", className: "form-control", id: "third-standout", maxLength: "64"}), 

                        React.createElement("p", {className: "field-error", "data-check": "empty"})
                    ), 

                    React.createElement("div", {className: "centered-contents"}, 
                        React.createElement("button", {className: "btn btn-warning"}, "Communicate as the three standouts")
                    )
                )
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
        this._initValidation();
    },

    _initElements: function () {
        this.$form = $(React.findDOMNode(this.refs.form));
        this.$firstStandoutField = this.$form.find("#first-standout");
        this.$secondStandoutField = this.$form.find("#second-standout");
        this.$thirdStandoutField = this.$form.find("#third-standout");

        this.$addCustomTaskLink = $("#add-custom-task-link");
    },

    _initValidation: function() {
        this.validator = CS.Services.Validator([
            "first-standout",
            "second-standout",
            "third-standout"
        ]);
    },

    _handleSetThreeStandoutsClick: function () {
        this.$form.toggle();
        this.$addCustomTaskLink.toggle();
    },

    _handleFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        if (this.validator.isValid()) {
            var firstStandout = this.$firstStandoutField.val().trim();
            var secondStandout = this.$secondStandoutField.val().trim();
            var thirdStandout = this.$thirdStandoutField.val().trim();

            this._fetchLatestAccountDataAndUpdateIt(firstStandout, secondStandout, thirdStandout);
        }
    },

    _fetchLatestAccountDataAndUpdateIt: function(firstStandout, secondStandout, thirdStandout) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                CS.account.data.standouts = CS.account.data.standouts || {};

                CS.account.data.standouts[this.props.workbookArea.className] = [
                    firstStandout,
                    secondStandout,
                    thirdStandout
                ];

                CS.saveAccountData(function() {
                    this.$form[0].reset();

                    this.$form.hide();
                    this.$addCustomTaskLink.show();
                }.bind(this));

                this.props.controller.reRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

CS.Controllers.WorkbookAreaAddItemLvl1Complete = React.createClass({displayName: "WorkbookAreaAddItemLvl1Complete",
    render: function () {
        return (
            React.createElement("div", {id: "task-complete-pep-talk"}, 
                React.createElement("h2", null, React.createElement("i", {className: "fa fa-star"}), "Nice!", React.createElement("i", {className: "fa fa-star"})), 
                React.createElement("p", null, "Let's add two more."), 
                React.createElement("p", null, "Once you have five, a career advisor will have a look and you'll receive additional help."), 
                React.createElement("div", {className: "centered-contents"}, 
                    React.createElement("button", {className: "btn btn-primary", onClick: this._handleTaskCompletePepTalkClosed}, "Alright")
                )
            )
            );
    },

    _handleTaskCompletePepTalkClosed: function () {
        this.props.controller.handleTaskCompletePepTalkClosed();
    }
});

CS.Controllers.WorkbookAreaAddItemLvl2Complete = React.createClass({displayName: "WorkbookAreaAddItemLvl2Complete",
    render: function () {
        return (
            React.createElement("div", {id: "task-complete-pep-talk"}, 
                React.createElement("h2", null, React.createElement("i", {className: "fa fa-star"}), "Great work!", React.createElement("i", {className: "fa fa-star"})), 
                React.createElement("p", null, "A career advisor has been notified of your progress and will e-mail you with additional questions or advice."), 
                React.createElement("p", null, "Meanwhile, please keep moving. Follow the instructions or move to other areas in the app."), 
                React.createElement("div", {className: "centered-contents"}, 
                    React.createElement("button", {className: "btn btn-primary", onClick: this._handleTaskCompletePepTalkClosed}, "Alright")
                )
            )
            );
    },

    _handleTaskCompletePepTalkClosed: function () {
        this.props.controller.handleTaskCompletePepTalkClosed();
    }
});

CS.Controllers.WorkbookAreaCustomTaskComplete = React.createClass({displayName: "WorkbookAreaCustomTaskComplete",
    render: function () {
        return (
            React.createElement("div", {id: "task-complete-pep-talk"}, 
                React.createElement("h2", null, React.createElement("i", {className: "fa fa-star"}), "Thanks!", React.createElement("i", {className: "fa fa-star"})), 
                React.createElement("p", null, "A career advisor will get back to you shortly."), 
                React.createElement("p", null, "In the meantime, we invite you to continue working on this topic, or maybe switch to another one?"), 
                React.createElement("div", {className: "centered-contents"}, 
                    React.createElement("button", {className: "btn btn-primary", onClick: this._handleTaskCompletePepTalkClosed}, "Continue")
                )
            )
            );
    },

    _handleTaskCompletePepTalkClosed: function () {
        this.props.controller.handleTaskCompletePepTalkClosed();
    }
});

CS.Controllers.WorkbookAreaPrioritizeItemsComplete = React.createClass({displayName: "WorkbookAreaPrioritizeItemsComplete",
    render: function () {
        return (
            React.createElement("div", {id: "task-complete-pep-talk"}, 
                React.createElement("h2", null, React.createElement("i", {className: "fa fa-star"}), "Awesome!", React.createElement("i", {className: "fa fa-star"})), 
                React.createElement("p", null, "Dig deeper into what you’ve discovered.", React.createElement("br", null), 
                    "Confirm, find examples and describe more thoroughly."), 
                React.createElement("p", null, "Click on one of the items below to get started:")
            )
            );
    }
});

CS.Controllers.WorkbookAreaAddItemLvl2Task = React.createClass({displayName: "WorkbookAreaAddItemLvl2Task",
    render: function () {
        var comingUpNextParagraph = null;
        if (this.props.comingUpNextText) {
            comingUpNextParagraph = (
                React.createElement("p", {className: "coming-up-next"}, "Coming up next: ", this.props.comingUpNextText)
                );
        }

        var wrapperClasses = classNames({
            "workbook-task": true,
            "hidd3n": this.props.hidden
        });

        return (
            React.createElement("div", {className: wrapperClasses}, 
                React.createElement("button", {className: "styleless fa fa-question-circle", onClick: CS.Controllers.WorkbookAreaCommon.showAreaDescription}), 
                React.createElement("p", {className: "working-on"}, "Working on: ", this.props.task.workingOnText), 
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

    componentDidUpdate: function () {
        this._initProgressBar();
    },

    _initElements: function () {
        this.$progressBar = $(React.findDOMNode(this.refs.progressBar));
    },

    _initProgressBar: function () {
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

        var wrapperClasses = classNames({
            "workbook-task": true,
            "hidd3n": this.props.hidden
        });

        return (
            React.createElement("div", {className: wrapperClasses}, 
                React.createElement("button", {className: "styleless fa fa-question-circle", onClick: CS.Controllers.WorkbookAreaCommon.showAreaDescription}), 
                React.createElement("p", {className: "working-on"}, "Working on: ", this.props.task.workingOnText), 
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

    componentDidUpdate: function () {
        this._initProgressBar();
    },

    _initElements: function () {
        this.$progressBar = $(React.findDOMNode(this.refs.progressBar));
    },

    _initProgressBar: function () {
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
            this._fetchLatestAccountDataAndUpdateIt(itemNameToAdd);
        }
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

        this.$form[0].reset();
        this.props.controller.reRender();
    },

    _handleTextareaKeyUp: function (e) {
        if (this.currentWording.sentenceStart && !_.startsWith(this.$textarea.val(), this.currentWording.sentenceStart)) {
            this.$textarea.val(this.currentWording.sentenceStart);
        }

        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleFormSubmit);
    },

    _fetchLatestAccountDataAndUpdateIt: function(itemNameToAdd) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var updatedBlueprintAreaData = !_.isEmpty(CS.account.data[this.props.workbookArea.className]) ? _.clone(CS.account.data[this.props.workbookArea.className], true) : [];
                updatedBlueprintAreaData.push({
                    name: itemNameToAdd,
                    notes: []
                });

                CS.account.data[this.props.workbookArea.className] = updatedBlueprintAreaData;
                CS.saveAccountData();

                this.props.controller.isPepTalkClosed = false;

                this._setCurrentTaskAsSkippedAndReRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

CS.Controllers.WorkbookAreaCustomTask = React.createClass({displayName: "WorkbookAreaCustomTask",
    render: function () {
        var tipReact = null;
        if (this.props.task.tip) {
            var tipReadBtnReact = null;

            if (!this.props.task.question) {
                tipReadBtnReact = (
                    React.createElement("div", {className: "centered-contents"}, 
                        React.createElement("button", {className: "btn btn-primary", onClick: this._setCustomTaskAsCompletedAndReRender}, "Got it")
                    )
                    );
            }

            tipReact = (
                React.createElement("div", {id: "custom-task-tip"}, 
                    React.createElement("i", {className: "fa fa-lightbulb-o"}), React.createElement("p", null, this.props.task.tip), 
                    tipReadBtnReact
                )
                );
        }

        var questionReact = null;
        if (this.props.task.question) {
            questionReact = (
                React.createElement("form", {role: "form", ref: "form", className: "item-composer task custom", onSubmit: this._handleFormSubmit}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {htmlFor: "custom-task-field"}, this.props.task.question), 
                        React.createElement("textarea", {className: "form-control", id: "custom-task-field", onKeyUp: this._handleTextareaKeyUp})
                    ), 
                    React.createElement("button", {className: "btn btn-primary"}, "Add item")
                )
                );
        }

        return (
            React.createElement("div", {className: "workbook-task"}, 
                React.createElement("button", {className: "styleless fa fa-question-circle", onClick: CS.Controllers.WorkbookAreaCommon.showAreaDescription}), 
                tipReact, 
                questionReact
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
    },

    _initElements: function () {
        this.$form = $(React.findDOMNode(this.refs.form));
        this.$textarea = this.$form.find("#custom-task-field");
    },

    _handleFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var itemNameToAdd = this.$textarea.val().trim();

        if (this._isValid(itemNameToAdd) && !CS.Controllers.WorkbookAreaCommon.doesItemAlreadyExist(itemNameToAdd, this.props.workbookArea.className)) {
            this._fetchLatestAccountDataAndUpdateIt(itemNameToAdd);
        }
    },

    _handleTextareaKeyUp: function (e) {
        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleFormSubmit);
    },

    _fetchLatestAccountDataAndUpdateIt: function (itemNameToAdd) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var updatedBlueprintAreaData = !_.isEmpty(CS.account.data[this.props.workbookArea.className]) ? _.clone(CS.account.data[this.props.workbookArea.className], true) : [];
                updatedBlueprintAreaData.push({
                    name: itemNameToAdd,
                    notes: []
                });

                CS.account.data[this.props.workbookArea.className] = updatedBlueprintAreaData;
                CS.saveAccountData();

                this._setCustomTaskAsCompletedAndReRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    },

    _isValid: function(trimmedItemName) {
        return trimmedItemName;
    },

    _setCustomTaskAsCompletedAndReRender: function () {
        var type = "PUT";
        var url = "/api/custom-tasks";

        $.ajax({
            url: url,
            type: type,
            contentType: "application/json",
            data: JSON.stringify(this.props.task),
            success: function (data) {
                this._resetForm();

                var lastIndex = this.props.controller.customTasks.length - 1;
                this.props.controller.customTasks[lastIndex] = data;
                this.props.controller.isCustomTaskComplete = true;

                this.props.controller.reRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    },

    _resetForm: function() {
        if (this.$form.length > 0) {
            this.$form[0].reset();
        }
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

        var wrapperClasses = classNames({
            "workbook-task": true,
            "hidd3n": this.props.hidden
        });

        var currentWording = CS.Models.WorkbookAreaTaskCommon.getNextWording(this.props.task);

        return (
            React.createElement("div", {className: wrapperClasses}, 
                React.createElement("button", {className: "styleless fa fa-question-circle", onClick: CS.Controllers.WorkbookAreaCommon.showAreaDescription}), 
                React.createElement("p", {className: "working-on"}, "Working on: ", this.props.task.workingOnText), 
                React.createElement("div", {className: "progress"}, 
                    React.createElement("div", {ref: "progressBar", className: "progress-bar progress-bar-success", role: "progressbar", "aria-valuenow": "0", "aria-valuemin": "0", "aria-valuemax": "100"}, "0%")
                ), 
                comingUpNextParagraph, 
                React.createElement("label", null, currentWording.prompt), 
                React.createElement("div", {className: "centered-contents"}, 
                    React.createElement("button", {className: "btn btn-primary", onClick: this._setCurrentWorkbookAreaAsPrioritizedAndReRender}, "I'm done prioritizing")
                )
            )
            );
    },

    _setCurrentWorkbookAreaAsPrioritizedAndReRender: function () {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var prioritizedWorkbookAreaIds = CS.account.data.prioritizedWorkbookAreaIds || [];
                prioritizedWorkbookAreaIds.push(this.props.workbookArea.id);

                CS.account.data.prioritizedWorkbookAreaIds = prioritizedWorkbookAreaIds;
                CS.saveAccountData();

                this.props.controller.isPepTalkClosed = false;

                this.props.controller.reRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

CS.Controllers.ThreeStandoutPanel.Contexts = React.createClass({displayName: "Contexts",
    render: function () {
        return (
            React.createElement("div", {className: "three-standouts"}, 
                React.createElement("h2", null, React.createElement("i", {className: "fa fa-star"}), "Your top-3 contexts", React.createElement("i", {className: "fa fa-star"})), 

                React.createElement("p", null, "From what you've indicated so far, these are the three contexts that you should focus on when describing yourself:"), 

                React.createElement("ul", null, 
                    React.createElement("li", null, this.props.threeStandouts[0]), 
                    React.createElement("li", null, this.props.threeStandouts[1]), 
                    React.createElement("li", null, this.props.threeStandouts[2])
                ), 

                React.createElement("p", null, "You have great examples for all of them. Use examples when you write your application and always be prepared to use them during an interview."), 

                React.createElement("p", null, "This exercise is now over. You'll find your top-3 contexts in the app at any time. Keep using the service at your wish."), 

                React.createElement("p", null, "Please help us out by ", React.createElement("a", {href: "#"}, "answering a three-question survey."))
            )
            );
    }
});

CS.Controllers.ThreeStandoutPanel.Drivers = React.createClass({displayName: "Drivers",
    render: function () {
        return (
            React.createElement("div", {className: "three-standouts"}, 
                React.createElement("h2", null, React.createElement("i", {className: "fa fa-star"}), "Your top-3 drivers", React.createElement("i", {className: "fa fa-star"})), 

                React.createElement("p", null, "From what you've indicated so far, these are the three drivers that you should focus on when describing yourself:"), 

                React.createElement("ul", null, 
                    React.createElement("li", null, this.props.threeStandouts[0]), 
                    React.createElement("li", null, this.props.threeStandouts[1]), 
                    React.createElement("li", null, this.props.threeStandouts[2])
                ), 

                React.createElement("p", null, "You have great examples for all of them. Use examples when you write your application and always be prepared to use them during an interview."), 

                React.createElement("p", null, "This exercise is now over. You'll find your top-3 drivers in the app at any time. Keep using the service at your wish."), 

                React.createElement("p", null, "Please help us out by ", React.createElement("a", {href: "#"}, "answering a three-question survey."))
            )
            );
    }
});

CS.Controllers.ThreeStandoutPanel.Strengths = React.createClass({displayName: "Strengths",
    render: function () {
        return (
            React.createElement("div", {className: "three-standouts"}, 
                React.createElement("h2", null, React.createElement("i", {className: "fa fa-star"}), "Your top-3 strengths", React.createElement("i", {className: "fa fa-star"})), 

                React.createElement("p", null, "From what you've indicated so far, these are the three strengths that you should focus on when describing yourself:"), 

                React.createElement("ul", null, 
                    React.createElement("li", null, this.props.threeStandouts[0]), 
                    React.createElement("li", null, this.props.threeStandouts[1]), 
                    React.createElement("li", null, this.props.threeStandouts[2])
                ), 

                React.createElement("p", null, "You have great examples for all of them. Use examples when you write your application and always be prepared to use them during an interview."), 

                React.createElement("p", null, "This exercise is now over. You'll find your top-3 strengths in the app at any time. Keep using the service at your wish."), 

                React.createElement("p", null, "Please help us out by ", React.createElement("a", {href: "#"}, "answering a three-question survey."))
            )
            );
    }
});

CS.Controllers.WorkbookArea = P(function (c) {
    c.$el = $(document.getElementById("content"));

    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                controller: null,
                workbookArea: null,
                workbookItems: [],
                customTask: null,
                isAdmin: false,
                isCustomTaskComplete: false,
                isPepTalkClosed: false
            };
        },

        render: function () {
            var workbookAreaDescriptionReact = null;
            var threeStandoutsReact = null;
            var pepTalkReact = null;
            var taskReact = null;
            var adminPanelReact = null;

            if (this.state.workbookArea) {
                workbookAreaDescriptionReact = React.createElement(CS.Controllers.WorkbookAreaDescription, {workbookAreaClassName: this.state.workbookArea.className, controller: this.state.controller});

                if (CS.account.data && CS.account.data.standouts && CS.account.data.standouts[this.state.workbookArea.className]) {
                    threeStandoutsReact = React.createElement(CS.Controllers.ThreeStandoutPanel[this.state.workbookArea.className], {threeStandouts: CS.account.data.standouts[this.state.workbookArea.className]});
                } else {
                    if (!this.state.isPepTalkClosed && !this.state.customTask) {
                        var taskCompletePepTalk = null;

                        if (this.state.isCustomTaskComplete) {
                            taskCompletePepTalk = { templateClassName: "WorkbookAreaCustomTaskComplete" };
                        } else {
                            taskCompletePepTalk = _.find(CS.WorkbookAreaTaskCompletePepTalks, function (pepTalk) {
                                return pepTalk.getWorkbookArea().id === this.state.workbookArea.id && pepTalk.isActive();
                            }.bind(this));
                        }

                        if (taskCompletePepTalk) {
                            pepTalkReact = React.createElement(CS.Controllers[taskCompletePepTalk.templateClassName], {workbookArea: this.state.workbookArea, controller: this.state.controller});
                        }
                    }

                    if (!this.state.isCustomTaskComplete) {
                        var activeTask = this.state.customTask ||
                            _.find(CS.WorkbookAreaTasks, function (task) {  // Level 3
                                return task.getWorkbookArea().id === this.state.workbookArea.id && task.level === 3 && task.isActive();
                            }.bind(this)) ||
                            _.find(CS.WorkbookAreaTasks, function (task) {  // Level 2
                                return task.getWorkbookArea().id === this.state.workbookArea.id && task.level === 2 && task.isActive();
                            }.bind(this)) ||
                            _.find(CS.WorkbookAreaTasks, function (task) {  // Level 1
                                return task.getWorkbookArea().id === this.state.workbookArea.id && task.level === 1 && task.isActive();
                            }.bind(this));

                        if (activeTask) {
                            var nextTask = _.find(CS.WorkbookAreaTasks, function (task) {
                                return task.previousTaskId === activeTask.id;
                            });

                            var comingUpNextText = nextTask ? nextTask.comingUpText : null;

                            taskReact = React.createElement(CS.Controllers[activeTask.templateClassName], {task: activeTask, workbookArea: this.state.workbookArea, comingUpNextText: comingUpNextText, hidden: taskCompletePepTalk && !this.state.isPepTalkClosed, controller: this.state.controller});
                        }
                    }
                }

                if (this.state.isAdmin && !this.state.customTask) {
                    adminPanelReact = React.createElement(CS.Controllers.AdminPanel, {workbookArea: this.state.workbookArea, controller: this.state.controller});
                }
            }

            return (
                React.createElement("div", {ref: "wrapper", id: "content-wrapper"}, 
                    workbookAreaDescriptionReact, 
                    threeStandoutsReact, 
                    pepTalkReact, 
                    taskReact, 
                    adminPanelReact, 

                    React.createElement("ul", {className: "styleless item-names-list"}, 
                        this.state.workbookItems.map(function (item, index) {
                            var reactItemId = "blueprint-item-" + index + "-" + item.name;

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

        componentDidUpdate: function () {
            this._initSortable();
            this._initDescriptionAndTaskPanels();
        },

        _initElements: function () {
            this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
            this.$list = this.$wrapper.children("ul");
            this.$form = this.$wrapper.children("form");
            this.$addItemLink = this.$form.siblings(".add-item-link");
            this.$textarea = this.$form.children("textarea");
        },

        _initDescriptionAndTaskPanels: function () {
            this.$areaDescriptionWrapper = this.$wrapper.children("#area-description");
            this.$taskWrapper = this.$wrapper.children(".workbook-task");

            if (_.isEmpty(this.state.workbookItems) && !_.includes(CS.account.data.idOfClosedAreaDescriptionPanels, this.state.workbookArea.id)) {
                this.$addItemLink.hide();
                this.$taskWrapper.hide();
                this.$areaDescriptionWrapper.show();
            } else {
                this.$areaDescriptionWrapper.hide();

                if (!this.$taskWrapper.hasClass("hidd3n")) {
                    this.$taskWrapper.show();
                    this.$addItemLink.show();
                }
            }
        },

        _initSortable: function () {
            if (!this.sortable) {
                this.sortable = new Sortable(this.$list[0],
                    {
                        animation: 150,
                        onUpdate: function () {
                            CS.Controllers.WorkbookAreaCommon.handleWorkbookItemsReordered(this.$list.children(), this.state.workbookArea.className, this.state.controller.reRender.bind(this.state.controller));
                        }.bind(this),
                        handle: ".fa-bars"
                    }
                );
            }
        },

        _showComposer: function () {
            this.$form.show();
            this.$textarea.focus();

            CS.Controllers.WorkbookAreaCommon.adaptTextareaHeight(this.$textarea);

            this.$addItemLink.hide();
        },

        _handleComposerFormSubmit: function (e) {
            if (e) {
                e.preventDefault();
            }

            var itemNameToAdd = this.$textarea.val().trim();
            if (itemNameToAdd && !CS.Controllers.WorkbookAreaCommon.doesItemAlreadyExist(itemNameToAdd, this.state.workbookArea.className)) {
                this._fetchLatestAccountDataAndUpdateIt(itemNameToAdd);
            }

            CS.Controllers.WorkbookAreaCommon.resetAndHideForm(this.$textarea, this._hideForm);
        },

        _handleTextareaKeyUp: function (e) {
            CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleComposerFormSubmit, this._hideForm);
        },

        _hideForm: function () {
            this.$form.hide();
            this.$addItemLink.show();
        },

        _fetchLatestAccountDataAndUpdateIt: function (itemNameToAdd) {
            var type = "GET";
            var url = "/api/account-data";

            $.ajax({
                url: url,
                type: type,
                success: function (data) {
                    CS.account.data = data || {};

                    var updatedBlueprintAreaData = !_.isEmpty(CS.account.data[this.state.workbookArea.className]) ? _.clone(CS.account.data[this.state.workbookArea.className], true) : [];
                    updatedBlueprintAreaData.push({
                        name: itemNameToAdd,
                        notes: []
                    });

                    CS.account.data[this.state.workbookArea.className] = updatedBlueprintAreaData;
                    this.state.controller.saveAccountData();
                }.bind(this),
                error: function () {
                    alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
                }
            });
        },

        showTask: function () {
            CS.Controllers.WorkbookCommon.saveAreaDescriptionAsClosed(this.state.workbookArea.id);

            CS.Services.Animator.fadeOut(this.$areaDescriptionWrapper, {
                animationDuration: CS.animationDuration.short,
                onComplete: function () {
                    CS.Services.Animator.fadeIn(this.$taskWrapper);
                    CS.Services.Animator.fadeIn(this.$addItemLink);
                }.bind(this)
            });
        }
    });

    c.init = function (workbookArea, customTasks, isAdmin) {
        this.workbookArea = workbookArea;

        if (!_.isEmpty(customTasks)) {
            this.customTasks = _.map(customTasks, function(task) {
                task.templateClassName = CS.Controllers.WorkbookAreaCommon.customAreaTaskTemplateClassName;
                return task;
            });
        }

        this.isAdmin = isAdmin;

        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$el[0]
        );

        this.reRender();
    };

    c.reRender = function () {
        var firstCustomTaskNotCompleted = _.find(this.customTasks, function(task) {
            return task.completionTimestamp === undefined;
        });

        this.reactInstance.replaceState({
            controller: this,
            workbookArea: this.workbookArea,
            workbookItems: CS.account.data[this.workbookArea.className] ? CS.account.data[this.workbookArea.className] : [],
            customTask: firstCustomTaskNotCompleted,
            isAdmin: this.isAdmin,
            isCustomTaskComplete: this.isCustomTaskComplete || false,
            isPepTalkClosed: this.isPepTalkClosed || false
        });
    };

    c.saveAccountData = function () {
        this.reRender();
        CS.saveAccountData();
    };

    c.showTask = function() {
        this.reactInstance.showTask();
    };

    c.handleCustomTaskCompleteConfirmed = function() {
        this.isCustomTaskComplete = false;
        this.reRender();
    };

    c.handleTaskCompletePepTalkClosed = function() {
        this.isPepTalkClosed = true;
        this.reRender();
    };
});

CS.Controllers.WorkbookAreaDescription = React.createClass({displayName: "WorkbookAreaDescription",
    render: function () {
        var workbookAreaDescription = _.find(CS.Controllers.Texts, function(text) {
            return text.type === "workbook-area-description" &&
                text.workbookAreaClassName === this.props.workbookAreaClassName;
        }.bind(this)).htmlText;

        return (
            React.createElement("div", {id: "area-description"}, 
                React.createElement("article", {className: "workbook-area-description-text-wrapper", dangerouslySetInnerHTML: {__html: workbookAreaDescription}}), 
                React.createElement("div", {className: "centered-contents"}, 
                    React.createElement("button", {className: "btn btn-primary", onClick: this._showTask}, "Got it")
                )
            )
            );
    },

    _showTask: function() {
        this.props.controller.showTask();
    }
});

CS.Controllers.WorkbookAreaWorkbookItem = React.createClass({displayName: "WorkbookAreaWorkbookItem",
    render: function () {
        var href = "/workbook-items/" + this.props.workbookAreaClassName + "/" + this.props.workbookItemIndex;

        // TODO: replace .fa-bars element from <span> back to <button> after bug https://github.com/RubaXa/Sortable/issues/370 is fixed

        return (
            React.createElement("li", {ref: "li"}, 
                React.createElement("div", {className: "notes-indicator"}), 
                React.createElement("span", {className: "fa fa-bars"}), 
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
        CS.Controllers.WorkbookAreaCommon.initNotesIndicator(this.$notesIndicator, CS.account.data[this.props.workbookAreaClassName][this.props.workbookItemIndex].notes.length);
    },

    _initElements: function() {
        this.$listItem = $(React.findDOMNode(this.refs.li));
        this.$list = this.$listItem.parent();

        this.$notesIndicator = this.$listItem.children(".notes-indicator");
        this.$itemNameParagraph = this.$listItem.children("p");
        this.$editBtn = this.$listItem.children("button");
        this.$form = this.$listItem.children(".item-composer");
        this.$textarea = this.$form.children("textarea");

        this.$contentWrapper = this.$listItem.parents("#content-wrapper");
    },

    _showEditor: function () {
        this._hideOtherOpenComposers();

        this.$textarea.val(this.props.workbookItem.name);

        this.$listItem.addClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);

        CS.Controllers.WorkbookAreaCommon.disableSortable(this.props.controller);

        this.$itemNameParagraph.hide();
        this.$editBtn.hide();
        this.$contentWrapper.addClass("editing");
        this.$form.show();
        CS.Controllers.WorkbookAreaCommon.adaptTextareaHeight(this.$textarea);
        this.$textarea.focus();
    },

    _hideOtherOpenComposers: function() {
        var $listItems = this.$list.children();
        var $composerForms = $listItems.children(".item-composer");
        var $itemNameParagraphs = $listItems.children("p");
        var $editBtns = $listItems.children(".fa-pencil");

        $listItems.removeClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);
        $composerForms.hide();
        $itemNameParagraphs.show();
        $editBtns.show();
    },

    _handleComposerFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var newItemName = this.$textarea.val().trim();
        this._fetchLatestAccountDataAndUpdateIt(newItemName);
    },

    _handleTextareaKeyUp: function(e) {
        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleComposerFormSubmit, this._hideForm);
    },

    _hideForm: function() {
        this.$listItem.removeClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);
        this.$form.hide();
        this.$itemNameParagraph.show();
        this.$editBtn.show();
        this.$contentWrapper.removeClass("editing");

        CS.Controllers.WorkbookAreaCommon.enableSortable(this.props.controller);
    },

    _fetchLatestAccountDataAndUpdateIt: function(newItemName) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var updatedBlueprintAreaData = !_.isEmpty(CS.account.data[this.props.workbookAreaClassName]) ? _.clone(CS.account.data[this.props.workbookAreaClassName], true) : [];

                if (newItemName) {
                    updatedBlueprintAreaData[this.props.workbookItemIndex].name = newItemName;
                } else {
                    updatedBlueprintAreaData.splice(this.props.workbookItemIndex, 1);

                    // We hide it from the UI to give faster feedback
                    this.$listItem.hide();
                }

                CS.Controllers.WorkbookAreaCommon.resetAndHideForm(this.$textarea, this._hideForm);

                CS.account.data[this.props.workbookAreaClassName] = updatedBlueprintAreaData;
                CS.workbookAreaController.saveAccountData();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

CS.Controllers.WorkbookItemAddItemComplete = React.createClass({displayName: "WorkbookItemAddItemComplete",
    render: function () {
        return (
            React.createElement("div", {id: "task-complete-pep-talk"}, 
                React.createElement("h2", null, React.createElement("i", {className: "fa fa-star"}), "Great work!", React.createElement("i", {className: "fa fa-star"})), 
                React.createElement("p", null, "Keep adding examples or try describing more."), 
                React.createElement("p", null, "Or ", React.createElement("a", {onClick: this._navigateBack}, "go back"), " to work on another item."), 
                React.createElement("div", {className: "centered-contents"}, 
                    React.createElement("button", {className: "btn btn-primary", onClick: this._handleTaskCompletePepTalkClosed}, "Alright")
                )
            )
            );
    },

    _handleTaskCompletePepTalkClosed: function () {
        this.props.controller.handleTaskCompletePepTalkClosed();
    },

    _navigateBack: function() {
        history.back();
    }
});

CS.Controllers.WorkbookItemCustomTaskComplete = React.createClass({displayName: "WorkbookItemCustomTaskComplete",
    render: function () {
        return (
            React.createElement("div", {id: "task-complete-pep-talk"}, 
                React.createElement("h2", null, React.createElement("i", {className: "fa fa-star"}), "Thanks!", React.createElement("i", {className: "fa fa-star"})), 
                React.createElement("p", null, "A career advisor will get back to you shortly."), 
                React.createElement("p", null, "In the meantime, we invite you to continue working on this topic, or maybe switch to another one?"), 
                React.createElement("div", {className: "centered-contents"}, 
                    React.createElement("button", {className: "btn btn-primary", onClick: this._handleTaskCompletePepTalkClosed}, "Continue")
                )
            )
            );
    },

    _handleTaskCompletePepTalkClosed: function () {
        this.props.controller.handleTaskCompletePepTalkClosed();
    }
});

CS.Controllers.WorkbookItemAddItemTask = React.createClass({displayName: "WorkbookItemAddItemTask",
    render: function () {
        var textareaId = "add-note-task";
        this.currentWording = CS.Models.WorkbookItemTaskCommon.getNextWording(this.props.task, this.props.workbookItemIndex);
        var currentWordingPrompt = CS.Services.String.template(this.currentWording.prompt, "itemName", this.props.workbookItemName);

        var wrapperClasses = classNames({
            "workbook-task": true,
            "hidd3n": this.props.hidden
        });

        return (
            React.createElement("div", {className: wrapperClasses, ref: "wrapper"}, 
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
            this._fetchLatestAccountDataAndUpdateIt(itemNoteToAdd);
        }
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

        this.$form[0].reset();
        this.props.controller.reRender();
    },

    _handleTextareaKeyUp: function (e) {
        if (this.currentWording.sentenceStart && !_.startsWith(this.$textarea.val(), this.currentWording.sentenceStart)) {
            this.$textarea.val(this.currentWording.sentenceStart);
        }

        CS.Controllers.WorkbookItemCommon.handleTextareaKeyUp(e);
    },

    _fetchLatestAccountDataAndUpdateIt: function(itemNoteToAdd) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var updatedWorkbookItemNotesData = CS.account.data[this.props.workbookArea.className][this.props.workbookItemIndex].notes || [];
                updatedWorkbookItemNotesData.push(itemNoteToAdd);

                CS.account.data[this.props.workbookArea.className][this.props.workbookItemIndex].notes = updatedWorkbookItemNotesData;

                var describedWorkbookItemIds = CS.account.data.describedWorkbookItemIds || {};
                var describedWorkbookItemIdsForThisArea = describedWorkbookItemIds[this.props.workbookArea.className] || [];
                if (!_.contains(describedWorkbookItemIdsForThisArea, this.props.workbookItemIndex)) {
                    describedWorkbookItemIdsForThisArea.push(this.props.workbookItemIndex);
                }
                describedWorkbookItemIds[this.props.workbookArea.className] = describedWorkbookItemIdsForThisArea;
                CS.account.data.describedWorkbookItemIds = describedWorkbookItemIds;

                CS.saveAccountData();

                this._setCurrentTaskAsSkippedAndReRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

CS.Controllers.WorkbookItemCustomTask = React.createClass({displayName: "WorkbookItemCustomTask",
    render: function () {
        var tipReact = null;
        if (this.props.task.tip) {
            var tipReadBtnReact = null;

            if (!this.props.task.question) {
                tipReadBtnReact = (
                    React.createElement("div", {className: "centered-contents"}, 
                        React.createElement("button", {className: "btn btn-primary", onClick: this._setCustomTaskAsCompletedAndReRender}, "Got it")
                    )
                    );
            }

            tipReact = (
                React.createElement("div", {id: "custom-task-tip"}, 
                    React.createElement("i", {className: "fa fa-lightbulb-o"}), React.createElement("p", null, this.props.task.tip), 
                    tipReadBtnReact
                )
                );
        }

        var questionReact = null;
        if (this.props.task.question) {
            questionReact = (
                React.createElement("form", {role: "form", ref: "form", className: "item-composer task custom", onSubmit: this._handleFormSubmit}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("label", {htmlFor: "custom-task-field"}, this.props.task.question), 
                        React.createElement("textarea", {className: "form-control", id: "custom-task-field", onKeyUp: CS.Controllers.WorkbookItemCommon.handleTextareaKeyUp})
                    ), 
                    React.createElement("button", {className: "btn btn-primary"}, "Add note")
                )
                );
        }

        return (
            React.createElement("div", {className: "workbook-task"}, 
                tipReact, 
                questionReact
            )
            );
    },

    componentDidMount: function () {
        this._initElements();
    },

    _initElements: function () {
        this.$form = $(React.findDOMNode(this.refs.form));
        this.$textarea = this.$form.find("#custom-task-field");
    },

    _handleFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var itemNoteToAdd = this.$textarea.val().trim();

        if (this._isValid(itemNoteToAdd) && !CS.Controllers.WorkbookItemCommon.doesItemAlreadyExist(itemNoteToAdd, this.props.workbookArea.className, this.props.workbookItemIndex)) {
            this._fetchLatestAccountDataAndUpdateIt(itemNoteToAdd);
        }
    },

    _fetchLatestAccountDataAndUpdateIt: function (itemNoteToAdd) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var updatedWorkbookItemNotesData = CS.account.data[this.props.workbookArea.className][this.props.workbookItemIndex].notes || [];
                updatedWorkbookItemNotesData.push(itemNoteToAdd);

                CS.account.data[this.props.workbookArea.className][this.props.workbookItemIndex].notes = updatedWorkbookItemNotesData;

                var describedWorkbookItemIds = CS.account.data.describedWorkbookItemIds || {};
                var describedWorkbookItemIdsForThisArea = describedWorkbookItemIds[this.props.workbookArea.className] || [];
                if (!_.contains(describedWorkbookItemIdsForThisArea, this.props.workbookItemIndex)) {
                    describedWorkbookItemIdsForThisArea.push(this.props.workbookItemIndex);
                }
                describedWorkbookItemIds[this.props.workbookArea.className] = describedWorkbookItemIdsForThisArea;
                CS.account.data.describedWorkbookItemIds = describedWorkbookItemIds;

                CS.saveAccountData();

                this._setCustomTaskAsCompletedAndReRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    },

    _isValid: function(trimmedItemName) {
        return trimmedItemName;
    },

    _setCustomTaskAsCompletedAndReRender: function () {
        var type = "PUT";
        var url = "/api/custom-tasks";

        $.ajax({
            url: url,
            type: type,
            contentType: "application/json",
            data: JSON.stringify(this.props.task),
            success: function (data) {
                this._resetForm();

                var lastIndex = this.props.controller.customTasks.length - 1;
                this.props.controller.customTasks[lastIndex] = data;
                this.props.controller.isCustomTaskComplete = true;

                this.props.controller.reRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    },

    _resetForm: function() {
        if (this.$form.length > 0) {
            this.$form[0].reset();
        }
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
                workbookItemIndex: null,
                customTask: null,
                isAdmin: false,
                isCustomTaskComplete: false,
                isPepTalkClosed: false
            };
        },

        render: function () {
            var pepTalkReact = null;
            var taskReact = null;
            var addCustomTaskPanelReact = null;
            var listItemsReact = null;

            if (this.state.workbookArea) {
                if (!this.state.isPepTalkClosed && !this.state.customTask) {
                    var taskCompletePepTalk = null;

                    if (this.state.isCustomTaskComplete) {
                        taskCompletePepTalk = { templateClassName: "WorkbookItemCustomTaskComplete" };
                    } else {
                        taskCompletePepTalk = _.find(CS.WorkbookItemTaskCompletePepTalks, function(pepTalk) {
                            return pepTalk.getWorkbookArea().id === this.state.workbookArea.id && pepTalk.isActive(this.state.workbookItemIndex);
                        }.bind(this));
                    }

                    if (taskCompletePepTalk) {
                        pepTalkReact = React.createElement(CS.Controllers[taskCompletePepTalk.templateClassName], {workbookArea: this.state.workbookArea, controller: this.state.controller});
                    }
                }

                if (!this.state.isCustomTaskComplete) {
                    var activeTask = this.state.customTask ||
                        _.find(CS.WorkbookItemTasks, function (task) {
                            return task.getWorkbookArea().id === this.state.workbookArea.id && task.isActive(this.state.workbookItemIndex);
                        }.bind(this));

                    if (activeTask) {
                        taskReact = React.createElement(CS.Controllers[activeTask.templateClassName], {task: activeTask, workbookArea: this.state.workbookArea, workbookItemName: this.state.workbookItem.name, workbookItemIndex: this.state.workbookItemIndex, hidden: taskCompletePepTalk && !this.state.isPepTalkClosed, controller: this.state.controller});
                    }
                }

                if (this.state.isAdmin && !this.state.customTask) {
                    addCustomTaskPanelReact = React.createElement(CS.Controllers.AddCustomTask, {workbookAreaId: this.state.workbookArea.id, workbookItemIndex: this.state.workbookItemIndex, controller: this.state.controller});
                }

                if (this.state.workbookItem && !_.isEmpty(this.state.workbookItem.notes)) {
                    listItemsReact = this.state.workbookItem.notes.map(function (note, index) {
                        var reactItemId = "workbook-item-note" + note;

                        return React.createElement(CS.Controllers.WorkbookItemNote, {key: reactItemId, workbookAreaClassName: this.state.workbookArea.className, workbookItem: this.state.workbookItem, workbookItemIndex: this.state.workbookItemIndex, workbookItemNote: note, workbookItemNoteIndex: index});
                    }.bind(this));
                }
            }

            return (
                React.createElement("div", {ref: "wrapper"}, 
                    pepTalkReact, 
                    taskReact, 
                    addCustomTaskPanelReact, 

                    React.createElement("ul", {className: "styleless item-notes-list"}, 
                        listItemsReact
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

            CS.Controllers.WorkbookItemCommon.adaptTextareaHeight(this.$textarea);

            this.$addNoteLink.hide();
        },

        _handleComposerFormSubmit: function (e) {
            if (e) {
                e.preventDefault();
            }

            var itemNoteToAdd = this.$textarea.val().trim();
            if (itemNoteToAdd && !CS.Controllers.WorkbookItemCommon.doesItemAlreadyExist(itemNoteToAdd, this.state.workbookArea.className, this.state.workbookItemIndex)) {
                this._fetchLatestAccountDataAndUpdateIt(itemNoteToAdd);
            }

            CS.Controllers.WorkbookItemCommon.resetAndHideForm(this.$textarea, this._hideForm);
        },

        _handleTextareaKeyUp: function (e) {
            CS.Controllers.WorkbookItemCommon.handleTextareaKeyUp(e, this._hideForm);
        },

        _handleCustomTaskCompleteConfirmed: function() {
            this.controller.isCustomTaskComplete = false;
            this.controller.reRender();
        },

        _hideForm: function () {
            this.$form.hide();
            this.$addNoteLink.show();
        },

        _fetchLatestAccountDataAndUpdateIt: function (itemNoteToAdd) {
            var type = "GET";
            var url = "/api/account-data";

            $.ajax({
                url: url,
                type: type,
                success: function (data) {
                    CS.account.data = data || {};

                    var updatedWorkbookItemNotesData = CS.account.data[this.state.workbookArea.className][this.state.workbookItemIndex].notes || [];
                    updatedWorkbookItemNotesData.push(itemNoteToAdd);

                    CS.account.data[this.state.workbookArea.className][this.state.workbookItemIndex].notes = updatedWorkbookItemNotesData;

                    var describedWorkbookItemIds = CS.account.data.describedWorkbookItemIds || {};
                    var describedWorkbookItemIdsForThisArea = describedWorkbookItemIds[this.state.workbookArea.className] || [];
                    if (!_.contains(describedWorkbookItemIdsForThisArea, this.state.workbookItemIndex)) {
                        describedWorkbookItemIdsForThisArea.push(this.state.workbookItemIndex);
                    }
                    describedWorkbookItemIds[this.state.workbookArea.className] = describedWorkbookItemIdsForThisArea;
                    CS.account.data.describedWorkbookItemIds = describedWorkbookItemIds;

                    this.state.controller.saveAccountData();
                }.bind(this),
                error: function () {
                    alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
                }
            });
        }
    });

    c.init = function (workbookArea, workbookItem, customTasks, isAdmin) {
        this.workbookArea = workbookArea;
        this.workbookItem = workbookItem;

        this.customTasks = customTasks;
        if (!_.isEmpty(this.customTasks)) {
            this.customTasks = _.map(this.customTasks, function (task) {
                task.templateClassName = CS.Controllers.WorkbookAreaCommon.customItemTaskTemplateClassName;
                return task;
            });
        }

        this.isAdmin = isAdmin;

        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$el[0]
        );

        this.reRender();
    };

    c.reRender = function () {
        var firstCustomTaskNotCompleted = _.find(this.customTasks, function (task) {
            return task.completionTimestamp === undefined;
        });

        this.reactInstance.replaceState({
            controller: this,
            workbookArea: this.workbookArea,
            workbookItem: _.find(CS.account.data[this.workbookArea.className], "name", this.workbookItem.name),
            workbookItemIndex: _.findIndex(CS.account.data[this.workbookArea.className], "name", this.workbookItem.name),
            customTask: firstCustomTaskNotCompleted,
            isAdmin: this.isAdmin,
            isCustomTaskComplete: this.isCustomTaskComplete || false,
            isPepTalkClosed: this.isPepTalkClosed || false
        });
    };

    c.saveAccountData = function () {
        this.reRender();
        CS.saveAccountData();
    };

    c.handleCustomTaskCompleteConfirmed = function() {
        this.isCustomTaskComplete = false;
        this.reRender();
    };

    c.handleTaskCompletePepTalkClosed = function() {
        this.isPepTalkClosed = true;
        this.reRender();
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

        this.$listItem.addClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);

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

        $listItems.removeClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);
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
        this._hideForm();
        this._fetchLatestAccountDataAndUpdateIt(newItemNote);
    },

    _handleTextareaKeyUp: function(e) {
        CS.Controllers.WorkbookItemCommon.handleTextareaKeyUp(e, this._handleComposerFormSubmit, this._hideForm);
    },

    _hideForm: function() {
        this.$listItem.removeClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);
        this.$form.hide();
        this.$itemNoteParagraph.show();
        this.$editBtn.show();
        this.$addNoteLink.show();
    },

    _fetchLatestAccountDataAndUpdateIt: function(newItemNote) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var updatedWorkbookItemNotesData = CS.account.data[this.props.workbookAreaClassName][this.props.workbookItemIndex].notes || [];

                if (newItemNote) {
                    updatedWorkbookItemNotesData[this.props.workbookItemNoteIndex] = newItemNote;
                } else {
                    updatedWorkbookItemNotesData.splice(this.props.workbookItemNoteIndex, 1);

                    // We hide it from the UI to give faster feedback
                    this.$listItem.hide();
                }

                CS.account.data[this.props.workbookAreaClassName][this.props.workbookItemIndex].notes = updatedWorkbookItemNotesData;
                CS.workbookItemController.saveAccountData();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

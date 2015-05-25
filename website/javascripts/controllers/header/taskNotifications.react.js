CS.Controllers.TaskNotifications = P(function (c) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {
                activeTasks: [],
                doneTasks: []
            };
        },

        render: function () {
            return (
                <ul className="styleless">
                    {this.state.activeTasks.map(function (task) {
                        var id = "notification-for-task-" + task.entityType + "-" + task.id;

                        var workbookArea = CS.blueprintAreasModel.getOfId(task.workbookAreaId);

                        var href = task.entityType === CS.Controllers.WorkbookCommon.entityTypes.workbookArea ?
                            "/workbook-areas/" + workbookArea.className + "?taskIdToMarkAsViewed=" + task.entityType + "-" + task.id :
                            "/workbook-items/" + workbookArea.className + "/" + task.itemIndex + "?taskIdToMarkAsViewed=" + task.entityType + "-" + task.id;

                        var liClasses = classNames({
                            "clicked": _.includes(CS.account.data.clickedTaskIds, task.entityType + "-" + task.id)
                        });

                        return (
                            <li key={id} className={liClasses}>
                                <a href={href}>{task.notificationText}</a>
                            </li>
                            );
                    })}

                    {this.state.doneTasks.map(function (task) {
                        var id = "notification-for-task-" + task.entityType + "-" + task.id;

                        return (
                            <li key={id} className="done">{task.notificationText}</li>
                            );
                    })}
                </ul>
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
            var workbookArea = CS.blueprintAreasModel.getOfId(task.workbookAreaId);
            return CS.account.data[workbookArea.className] ? -CS.account.data[workbookArea.className].length : 0;
        });

        var activeOldLvl2Tasks = _.filter(oldAreaTasks, function (task) {
            return task.level === 2;
        });

        var prioritizedOldLvl2Tasks = _.sortBy(activeOldLvl2Tasks, function (task) {
            var workbookArea = CS.blueprintAreasModel.getOfId(task.workbookAreaId);
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

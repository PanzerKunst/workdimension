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
                        var id = "notification-for-task-" + task.id;

                        var workbookArea = CS.blueprintAreasModel.getOfId(task.workbookAreaId);

                        var href = "/workbook-areas/" + workbookArea.className + "?taskIdToMarkAsViewed=" + task.id;

                        var liClasses = classNames({
                            "clicked": _.includes(CS.account.data.clickedTaskIds, task.id)
                        });

                        return (
                            <li key={id} className={liClasses}>
                                <a href={href}>{task.notificationText}</a>
                            </li>
                            );
                    })}

                    {this.state.doneTasks.map(function (task) {
                        var id = "notification-for-task-" + task.id;

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
        this.$taskNotificationsBtn.click($.proxy(this._toggleNotifications, this));
        this.$contentOverlayWhenMenuOpen.click($.proxy(this.hide, this));
    };

    c.reRender = function () {
        this.activeTasks = this._getActiveTasks();
        var newTasks = this._getNewTasks();

        this.reactInstance.replaceState({
            activeTasks: this._getPrioritizedActiveTasks(newTasks),
            doneTasks: _.filter(CS.WorkbookAreaTasks, function (task) {
                return task.isDone();
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

        this._fetchLatestAccountDataAndUpdateIt();
    };

    c._fetchLatestAccountDataAndUpdateIt = function() {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data;

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
            },
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    };
});

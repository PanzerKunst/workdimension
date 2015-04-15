CS.Controllers.TaskNotifications = P(function (c) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {
                tasks: []
            };
        },

        render: function () {
            return (
                <ul className="styleless">
                    {this.state.tasks.map(function (task) {
                        var id = "notification-for-task-" + task.id;

                        var workbookArea = CS.blueprintAreasModel.getOfId(task.workbookAreaId);

                        var href = "/workbook-areas/" + workbookArea.className;

                        return (
                            <li key={id}>
                                <a href={href}>{task.notificationText}</a>
                            </li>
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

    c._initElements = function() {
        this.$mainContainer = $("#container");
        this.$taskNotificationsBtn = this.$mainContainer.find("#task-notifications-btn");
        this.$contentOverlayWhenMenuOpen = this.$mainContainer.find("#content-overlay-when-menu-open");
    };

    c._initEvents = function() {
        this.$taskNotificationsBtn.click($.proxy(this._toggleNotifications, this));
        this.$contentOverlayWhenMenuOpen.click($.proxy(this.hide, this));
    };

    c.reRender = function () {
        this.reactInstance.replaceState({
            tasks: this._getTasks()
        });
    };

    c.hide = function() {
        this.$mainContainer.removeClass("task-notifications-open");
    };

    c._render = function() {
        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            document.getElementById("task-notifications")
        );

        this.reRender();
    };

    c._getTasks = function() {
        var activeTasks = _.filter(CS.WorkbookAreaTasks, function(task) {
            return task.isActive();
        });

        var activeLvl1Tasks = _.filter(activeTasks, function(task) {
            return task.level === 1;
        });

        var prioritizedLvl1Tasks = _.sortBy(activeLvl1Tasks, function(task) {
            var workbookArea = CS.blueprintAreasModel.getOfId(task.workbookAreaId);
            return CS.account.data[workbookArea.className] ? -CS.account.data[workbookArea.className].length : 0;
        });

        var activeLvl2Tasks = _.filter(activeTasks, function(task) {
            return task.level === 2;
        });

        var prioritizedLvl2Tasks = _.sortBy(activeLvl2Tasks, function(task) {
            var workbookArea = CS.blueprintAreasModel.getOfId(task.workbookAreaId);
            return CS.account.data[workbookArea.className] ? -CS.account.data[workbookArea.className].length : 0;
        });

        var activeLvl3Tasks = _.filter(activeTasks, function(task) {
            return task.level === 3;
        });

        return _.union(prioritizedLvl1Tasks, prioritizedLvl2Tasks, activeLvl3Tasks);
    };

    c._toggleNotifications = function() {
        CS.mainMenuController.hideMenu();
        this.$mainContainer.toggleClass("task-notifications-open");
    };
});

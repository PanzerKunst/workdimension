CS.WorkbookItemTaskCompletePepTalks = [
    {
        completedTaskId: 1, // Achievements
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookItemTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        isActive: function (itemIndex) {
            var workbookArea = this.getWorkbookArea();

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]) && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex].notes);
        },
        templateClassName: "WorkbookItemAddItemComplete"
    },
    {
        completedTaskId: 2, // Tracks
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookItemTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        isActive: function (itemIndex) {
            var workbookArea = this.getWorkbookArea();

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]) && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex].notes);
        },
        templateClassName: "WorkbookItemAddItemComplete"
    },
    {
        completedTaskId: 3, // Strengths
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookItemTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        isActive: function (itemIndex) {
            var workbookArea = this.getWorkbookArea();

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]) && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex].notes);
        },
        templateClassName: "WorkbookItemAddItemComplete"
    },
    {
        completedTaskId: 4, // Drivers
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookItemTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        isActive: function (itemIndex) {
            var workbookArea = this.getWorkbookArea();

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]) && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex].notes);
        },
        templateClassName: "WorkbookItemAddItemComplete"
    },
    {
        completedTaskId: 5, // Workplace
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookItemTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        isActive: function (itemIndex) {
            var workbookArea = this.getWorkbookArea();

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]) && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex].notes);
        },
        templateClassName: "WorkbookItemAddItemComplete"
    },
    {
        completedTaskId: 6, // Mores
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookItemTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        isActive: function (itemIndex) {
            var workbookArea = this.getWorkbookArea();

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]) && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex].notes);
        },
        templateClassName: "WorkbookItemAddItemComplete"
    },
    {
        completedTaskId: 7, // ToolsAndMethods
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookItemTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        isActive: function (itemIndex) {
            var workbookArea = this.getWorkbookArea();

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]) && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex].notes);
        },
        templateClassName: "WorkbookItemAddItemComplete"
    },
    {
        completedTaskId: 8, // Leadership
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookItemTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        isActive: function (itemIndex) {
            var workbookArea = this.getWorkbookArea();

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]) && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex].notes);
        },
        templateClassName: "WorkbookItemAddItemComplete"
    },
    {
        completedTaskId: 9, // Contexts
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookItemTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        isActive: function (itemIndex) {
            var workbookArea = this.getWorkbookArea();

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]) && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex].notes);
        },
        templateClassName: "WorkbookItemAddItemComplete"
    }
];

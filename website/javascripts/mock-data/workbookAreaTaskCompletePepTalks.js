CS.WorkbookAreaTaskCompletePepTalks = [
    {
        completedTaskId: 1, // Achievements lvl 1
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length === CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        templateClassName: "WorkbookAreaAddItemLvl1Complete"
    },
    {
        completedTaskId: 2, // Tracks lvl 1
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length === CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        templateClassName: "WorkbookAreaAddItemLvl1Complete"
    },
    {
        completedTaskId: 3, // Strengths lvl 1
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length === CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        templateClassName: "WorkbookAreaAddItemLvl1Complete"
    },
    {
        completedTaskId: 4, // Drivers lvl 1
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length === CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        templateClassName: "WorkbookAreaAddItemLvl1Complete"
    },
    {
        completedTaskId: 6, // Mores lvl 1
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length === CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        templateClassName: "WorkbookAreaAddItemLvl1Complete"
    },
    {
        completedTaskId: 7, // ToolsAndMethods lvl 1
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length === CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        templateClassName: "WorkbookAreaAddItemLvl1Complete"
    },
    {   // Level 2
        completedTaskId: 12, // Strengths lvl 2
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length === CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete &&
                (!CS.account.data || !CS.account.data.prioritizedWorkbookAreaIds || !_.includes(CS.account.data.prioritizedWorkbookAreaIds, this.getWorkbookArea().id));
        },
        templateClassName: "WorkbookAreaAddItemLvl2Complete"
    },
    {
        completedTaskId: 13, // Drivers lvl 2
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length === CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete &&
                (!CS.account.data || !CS.account.data.prioritizedWorkbookAreaIds || !_.includes(CS.account.data.prioritizedWorkbookAreaIds, this.getWorkbookArea().id));
        },
        templateClassName: "WorkbookAreaAddItemLvl2Complete"
    },
    {
        completedTaskId: 15, // Mores lvl 2
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length === CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete &&
                (!CS.account.data || !CS.account.data.prioritizedWorkbookAreaIds || !_.includes(CS.account.data.prioritizedWorkbookAreaIds, this.getWorkbookArea().id));
        },
        templateClassName: "WorkbookAreaAddItemLvl2Complete"
    },
    {
        completedTaskId: 16, // ToolsAndMethods lvl 2
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length === CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete &&
                (!CS.account.data || !CS.account.data.prioritizedWorkbookAreaIds || !_.includes(CS.account.data.prioritizedWorkbookAreaIds, this.getWorkbookArea().id));
        },
        templateClassName: "WorkbookAreaAddItemLvl2Complete"
    },
    {   // Level 3
        completedTaskId: 19, // Prioritize strengths
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete &&
                CS.account.data && CS.account.data.prioritizedWorkbookAreaIds && _.includes(CS.account.data.prioritizedWorkbookAreaIds, this.getWorkbookArea().id);
        },
        templateClassName: "WorkbookAreaPrioritizeItemsComplete"
    },
    {
        completedTaskId: 20, // Prioritize drivers
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete &&
                CS.account.data && CS.account.data.prioritizedWorkbookAreaIds && _.includes(CS.account.data.prioritizedWorkbookAreaIds, this.getWorkbookArea().id);
        },
        templateClassName: "WorkbookAreaPrioritizeItemsComplete"
    },
    {
        completedTaskId: 22, // Prioritize achievements
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete &&
                CS.account.data && CS.account.data.prioritizedWorkbookAreaIds && _.includes(CS.account.data.prioritizedWorkbookAreaIds, this.getWorkbookArea().id);
        },
        templateClassName: "WorkbookAreaPrioritizeItemsComplete"
    },
    {
        completedTaskId: 24, // Prioritize Mores
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete &&
                CS.account.data && CS.account.data.prioritizedWorkbookAreaIds && _.includes(CS.account.data.prioritizedWorkbookAreaIds, this.getWorkbookArea().id);
        },
        templateClassName: "WorkbookAreaPrioritizeItemsComplete"
    },
    {
        completedTaskId: 25, // Prioritize Tracks
        getWorkbookArea: function() {
            var completedTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.completedTaskId;
            }.bind(this));

            return completedTask.getWorkbookArea();
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete &&
                CS.account.data && CS.account.data.prioritizedWorkbookAreaIds && _.includes(CS.account.data.prioritizedWorkbookAreaIds, this.getWorkbookArea().id);
        },
        templateClassName: "WorkbookAreaPrioritizeItemsComplete"
    }
];

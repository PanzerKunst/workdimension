CS.WorkbookItemTasks = [
    {
        id: 1,
        workbookAreaId: 5,  // Achievements
        getWorkbookArea: function() {
            return CS.blueprintAreasModel.getOfId(this.workbookAreaId);
        },
        isActive: function (itemIndex) {
            var workbookArea = this.getWorkbookArea();

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]);
        },
        isDone: function (itemIndex) {
            return CS.account.data.describedWorkbookItemIds && _.includes(CS.account.data.describedWorkbookItemIds[this.getWorkbookArea().className], itemIndex);
        },
        wordings: [
            {
                prompt: "<p>How did you achieve this:</p><p><em>{itemName}</em></p>"
            },
            {
                prompt: "<p><em>{itemName}</em></p><p>What made you succeed?</p>"
            },
            {
                prompt: "<p>What circumstances were important for you to achieve this:</p><p><em>{itemName}</em></p>"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "describing Achievements",
        notificationText: "Describe Achievements"
    },
    {
        id: 2,
        workbookAreaId: 18,  // Tracks
        getWorkbookArea: function() {
            return CS.blueprintAreasModel.getOfId(this.workbookAreaId);
        },
        isActive: function (itemIndex) {
            var workbookArea = this.getWorkbookArea();

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]);
        },
        isDone: function (itemIndex) {
            return CS.account.data.describedWorkbookItemIds && _.includes(CS.account.data.describedWorkbookItemIds[this.getWorkbookArea().className], itemIndex);
        },
        wordings: [
            {
                prompt: "<p>What makes you interested in this:</p><p><em>{itemName}</em></p>"
            },
            {
                prompt: "<p>Is there anything keeping you from this:</p><p><em>{itemName}</em></p>"
            },
            {
                prompt: "<p>If you were not paid, would you still be interested in this:</p><p><em>{itemName}</em></p><p>Why/why not?</p>"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "describing Tracks",
        notificationText: "Describe Tracks"
    },
    {
        id: 3,
        workbookAreaId: 1,  // Strengths
        getWorkbookArea: function() {
            return CS.blueprintAreasModel.getOfId(this.workbookAreaId);
        },
        isActive: function (itemIndex) {
            var workbookArea = this.getWorkbookArea();

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]);
        },
        isDone: function (itemIndex) {
            return CS.account.data.describedWorkbookItemIds && _.includes(CS.account.data.describedWorkbookItemIds[this.getWorkbookArea().className], itemIndex);
        },
        wordings: [
            {
                prompt: "<p>How can people observe this in your work:</p><p><em>{itemName}</em></p>"
            },
            {
                prompt: "<p>Please describe a situation where this was really important in achieving results at work:</p><p><em>{itemName}</em></p>"
            },
            {
                prompt: "<p>What happens if you don't get to do this in your work:</p><p><em>{itemName}</em></p>"
            },
            {
                prompt: "<p>What are the drawbacks of:</p><p><em>{itemName}</em></p>"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "describing Strengths",
        notificationText: "Describe Strengths"
    },
    {
        id: 4,
        workbookAreaId: 2,  // Drivers
        getWorkbookArea: function() {
            return CS.blueprintAreasModel.getOfId(this.workbookAreaId);
        },
        isActive: function (itemIndex) {
            var workbookArea = this.getWorkbookArea();

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]);
        },
        isDone: function (itemIndex) {
            return CS.account.data.describedWorkbookItemIds && _.includes(CS.account.data.describedWorkbookItemIds[this.getWorkbookArea().className], itemIndex);
        },
        wordings: [
            {
                prompt: "<p>Why is this a driver for you:</p><p><em>{itemName}</em></p>"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "describing Drivers",
        notificationText: "Describe Drivers"
    },
    {
        id: 6,
        workbookAreaId: 12,  // Mores
        getWorkbookArea: function() {
            return CS.blueprintAreasModel.getOfId(this.workbookAreaId);
        },
        isActive: function (itemIndex) {
            var workbookArea = this.getWorkbookArea();

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]);
        },
        isDone: function (itemIndex) {
            return CS.account.data.describedWorkbookItemIds && _.includes(CS.account.data.describedWorkbookItemIds[this.getWorkbookArea().className], itemIndex);
        },
        wordings: [
            {
                prompt: "<p>Can you describe why you want to do more of this:</p><p><em>{itemName}</em></p>"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "describing Mores",
        notificationText: "Describe Mores"
    },
    {
        id: 7,
        workbookAreaId: 17,  // ToolsAndMethods
        getWorkbookArea: function() {
            return CS.blueprintAreasModel.getOfId(this.workbookAreaId);
        },
        isActive: function (itemIndex) {
            var workbookArea = this.getWorkbookArea();

            if (!workbookArea.isActive()) {
                return false;
            }

            return CS.account.data[workbookArea.className] && !_.isEmpty(CS.account.data[workbookArea.className][itemIndex]);
        },
        isDone: function (itemIndex) {
            return CS.account.data.describedWorkbookItemIds && _.includes(CS.account.data.describedWorkbookItemIds[this.getWorkbookArea().className], itemIndex);
        },
        wordings: [
            {
                prompt: "<p>How come you like to use this:</p><p><em>{itemName}</em></p>"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "describing Tools and Methods",
        notificationText: "Describe Tools and Methods"
    }
];

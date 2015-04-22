CS.WorkbookItemTasks = [
    {
        id: 1,
        workbookAreaId: 5,  // Achievements
        isActive: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(5);

            if (!workbookArea.isActive()) {
                return false;
            }

            this.workbookNotesForThisItem = CS.account.data[workbookArea.className][itemIndex].notes;

            return true;
        },
        wordings: [
            {
                prompt: "You mentioned that you <em>{itemName}</em>. How did you achieve this?"
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
        isActive: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(18);

            if (!workbookArea.isActive()) {
                return false;
            }

            this.workbookNotesForThisItem = CS.account.data[workbookArea.className][itemIndex].notes;

            return true;
        },
        wordings: [
            {
                prompt: "Why do you want to pursue <em>{itemName}</em>?"
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
        isActive: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(1);

            if (!workbookArea.isActive()) {
                return false;
            }

            this.workbookNotesForThisItem = CS.account.data[workbookArea.className][itemIndex].notes;

            return true;
        },
        wordings: [
            {
                prompt: "Can you describe how you've used <em>{itemName}</em> successfully in your work?"
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
        isActive: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(2);

            if (!workbookArea.isActive()) {
                return false;
            }

            this.workbookNotesForThisItem = CS.account.data[workbookArea.className][itemIndex].notes;

            return true;
        },
        wordings: [
            {
                prompt: "Why is <em>{itemName}</em> a driver for you?"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "describing Drivers",
        notificationText: "Describe Drivers"
    },
    {
        id: 5,
        workbookAreaId: 4,  // Workplace
        isActive: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(4);

            if (!workbookArea.isActive()) {
                return false;
            }

            this.workbookNotesForThisItem = CS.account.data[workbookArea.className][itemIndex].notes;

            return true;
        },
        wordings: [
            {
                prompt: "Why is <em>{itemName}</em> important for you at the workplace?"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "describing Workplace preferences",
        notificationText: "Describe Workplace preferences"
    },
    {
        id: 6,
        workbookAreaId: 12,  // Mores
        isActive: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(12);

            if (!workbookArea.isActive()) {
                return false;
            }

            this.workbookNotesForThisItem = CS.account.data[workbookArea.className][itemIndex].notes;

            return true;
        },
        wordings: [
            {
                prompt: "Can you describe why you want to do more of <em>{itemName}</em>?"
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
        isActive: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(17);

            if (!workbookArea.isActive()) {
                return false;
            }

            this.workbookNotesForThisItem = CS.account.data[workbookArea.className][itemIndex].notes;

            return true;
        },
        wordings: [
            {
                prompt: "How come you like to use <em>{itemName}</em>?"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "describing Tools and Methods",
        notificationText: "Describe Tools and Methods"
    },
    {
        id: 8,
        workbookAreaId: 9,  // Leadership
        isActive: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(9);

            if (!workbookArea.isActive()) {
                return false;
            }

            this.workbookNotesForThisItem = CS.account.data[workbookArea.className][itemIndex].notes;

            return true;
        },
        wordings: [
            {
                prompt: "In what way a leadership characterized by <em>{itemName}</em> helps you in your work?"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "describing Leadership preferences",
        notificationText: "Describe Leadership preferences"
    },
    {
        id: 9,
        workbookAreaId: 3,  // Contexts
        isActive: function (itemIndex) {
            var workbookArea = CS.blueprintAreasModel.getOfId(3);

            if (!workbookArea.isActive()) {
                return false;
            }

            this.workbookNotesForThisItem = CS.account.data[workbookArea.className][itemIndex].notes;

            return true;
        },
        wordings: [
            {
                prompt: "Can you describe <em>{itemName}</em>?"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "describing Contexts",
        notificationText: "Describe Contexts"
    }
];

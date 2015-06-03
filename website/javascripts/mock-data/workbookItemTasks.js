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
                prompt: "<p>Hur gjorde för att uppnå det här?</p><p><em>{itemName}</em></p>"
            },
            {
                prompt: "<p><em>{itemName}</em></p><p>Vad var framångsfaktorerna bakom detta?</p>"
            },
            {
                prompt: "<p>Vilka förutsättningar var viktiga för att lyckas med det här?</p><p><em>{itemName}</em></p>"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "beskriver ett resultat",
        notificationText: "Beskriv resultat"
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
                prompt: "<p>Vad ligger bakom ditt intresse för detta:</p><p><em>{itemName}</em></p>"
            },
            {
                prompt: "<p>Finns det något som hindrar dig från att göra det här?</p><p><em>{itemName}</em></p>"
            },
            {
                prompt: "<p>Om du inte fick betal, skulle du fortfarande vara intresserad av detta?</p><p><em>{itemName}</em></p><p>Why/why not?</p>"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "beskriver ett spår att följa",
        notificationText: "Beskriv spår att följa"
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
                prompt: "<p>Hur kan andra människor observera detta i ditt jobb:</p><p><em>{itemName}</em></p>"
            },
            {
                prompt: "<p>Beskriv en situation där det här verkligen var viktigt: :</p><p><em>{itemName}</em></p>"
            },
            {
                prompt: "<p><em>{itemName}</em></p><p>Vad händer om du inte får tillfälle att göra det här i jobbet?</p>"
            },
            {
                prompt: "<p>Vad kan vara baksidan av: </p><p><em>{itemName}</em></p>"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "beskriva styrka",
        notificationText: "Beskriv styrka"
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
                prompt: "<p>Kan du ge ett exempel på när du verkligen känt att du drivs av det här?</p><p><em>{itemName}</em></p>"
            }
            {
                prompt: "<p>När har du som mest fått tillfälle att göra leva enligt den här drivkraften?</p><p><em>{itemName}</em></p>"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "beskriver drivkraft",
        notificationText: "Beskriv drivkraft"
    },
    {
        id: 5,
        workbookAreaId: 4,  // Workplace
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
                prompt: "<p>Why is this important for you at the workplace:</p><p><em>{itemName}</em></p>"
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
                prompt: "<p>Beskriv lite närmare, varför vill du göra mer av det här?</p><p><em>{itemName}</em></p>"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "beskriver något du vill göra mer av",
        notificationText: "Beskriv Göra mer av... "
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
                prompt: "<p><em>{itemName}</em></p><p>Vad är det som gör att du gillar det?</p>"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "beskriver en metod eller ett verktyg",
        notificationText: "Beskriv Metod eller verktyg"
    },
    {
        id: 8,
        workbookAreaId: 9,  // Leadership
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
                prompt: "<p><em>{itemName}</em></p><p>In what way such a leadership helps you in your work?</p>"
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
                prompt: "<p>Can you describe this:</p><p><em>{itemName}</em></p>"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "describing Contexts",
        notificationText: "Describe Contexts"
    }
];

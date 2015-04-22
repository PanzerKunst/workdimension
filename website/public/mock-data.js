CS.WorkbookAreaTasks = [
    {   // Level 1
        id: 1,
        level: 1,
        workbookAreaId: 5,  // Achievements
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(5);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(5);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        wordings: [
            {
                prompt: "Describe a situation where you've solved a problem in a very good or unexpected way"
            },
            {
                prompt: "Something you feel really proud of"
            },
            {
                prompt: "Have you won any awards or prices for you work or educational achievements?",
                sentenceStart: "I was "
            },
            {
                prompt: "Think about the last job you had. One thing you achieved when you worked there was..."
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemTask",
        workingOnText: "making inventory of Achievements",
        notificationText: "Make inventory of Achievements"
    },
    {
        id: 2,
        level: 1,
        workbookAreaId: 18,  // Tracks
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(18);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(18);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        wordings: [
            {
                prompt: "What tracks would you like to pursue at some point?"
            },
            {
                prompt: "Anything you dreamed of when you were younger but haven't done and still would find exciting to try out?"
            },
            {
                prompt: "If you get a salary for working on anything you want, what would you work with?"
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemTask",
        workingOnText: "making inventory of Tracks",
        notificationText: "Make inventory of Tracks"
    },
    {
        id: 3,
        level: 1,
        workbookAreaId: 1,  // Strengths
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(1);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(1);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        wordings: [
            {
                prompt: "When are you the happiest with your work?",
                sentenceStart: "When I "
            },
            {
                prompt: "What are you the most confident at in your work?"
            },
            {
                prompt: "What qualities were important in the last role you had?"
            },
            {
                prompt: "What things are you good at?"
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemTask",
        workingOnText: "making inventory of Strengths",
        notificationText: "Make inventory of Strengths"
    },
    {
        id: 4,
        level: 1,
        workbookAreaId: 2,  // Drivers
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(2);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(2);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        wordings: [
            {
                prompt: "Why do you go to work, except from the salary?"
            },
            {
                prompt: "When do you feel the most energy at work?",
                sentenceStart: "When I "
            },
            {
                prompt: "What are you passions?",
                sentenceStart: "I'm passionate about "
            },
            {
                prompt: "What impact do you want to have on the world?"
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemTask",
        workingOnText: "making inventory of Drivers",
        notificationText: "Make inventory of Drivers"
    },
    {
        id: 5,
        level: 1,
        workbookAreaId: 4,  // Workplace
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(4);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(4);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        wordings: [
            {
                prompt: "What kind of environment are you the most creative in?"
            },
            {
                prompt: "What kind of environment are you the most productive in?"
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemTask",
        workingOnText: "making inventory of Workplace preferences",
        notificationText: "Make inventory of Workplace preferences"
    },
    {
        id: 6,
        level: 1,
        workbookAreaId: 12,  // Mores
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(12);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(12);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        wordings: [
            {
                prompt: "What would you like to spend more time on in your work?"
            },
            {
                prompt: "In what area do you want to improve yourself in your work?"
            },
            {
                prompt: "What are the tasks you look the most forward to?"
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemTask",
        workingOnText: "making inventory of Mores",
        notificationText: "Make inventory of Mores"
    },
    {
        id: 7,
        level: 1,
        workbookAreaId: 17,  // ToolsAndMethods
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(17);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(17);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        wordings: [
            {
                prompt: "What methods do you use to do your work?"
            },
            {
                prompt: "What are the tools you consider essential to do your work?"
            },
            {
                prompt: "If you could freely select the tools and methodologies to do your work, what would you chose?"
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemTask",
        workingOnText: "making inventory of Tools and Methods",
        notificationText: "Make inventory of Tools and Methods"
    },
    {
        id: 8,
        level: 1,
        workbookAreaId: 9,  // Leadership
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(9);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(9);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        wordings: [
            {
                prompt: "This is something my boss should keep in mind to make me stay..."
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemTask",
        workingOnText: "making inventory of Leadership preferences",
        notificationText: "Make inventory of Leadership preferences"
    },
    {
        id: 9,
        level: 1,
        workbookAreaId: 3,  // Contexts
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(3);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(3);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        wordings: [
            {
                prompt: "Name a position or role you'd like to have!",
                sentenceStart: "I would like to work as "
            },
            {
                prompt: "Name an industry you're interested in working in!"
            },
            {
                prompt: "What position would you chose, if given the possibility to decide all by yourself?"
            },
            {
                prompt: "Please name an organization that you would find interesting to work with"
            },
            {
                prompt: "What industries would you not work in?",
                sentenceStart: "I would never work in "
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemTask",
        workingOnText: "making inventory of Contexts",
        notificationText: "Make inventory of Contexts"
    },
    {   // Level 2
        id: 10,
        level: 2,
        workbookAreaId: 5,  // Achievements
        previousTaskId: 1,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(5);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(5);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        wordings: [
            {
                prompt: "Describe a situation where you've solved a problem in a very good or unexpected way"
            },
            {
                prompt: "Something you feel really proud of"
            },
            {
                prompt: "Have you won any awards or prices for your work or educational achievements?",
                sentenceStart: "I was "
            },
            {
                prompt: "Think about the last job you had. One thing you achieved when you worked there was..."
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete - CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemLvl2Task",
        workingOnText: "making level 2 inventory of Achievements",
        notificationText: "Make level 2 inventory of Achievements",
        comingUpText: "making inventory level 2"
    },
    {
        id: 11,
        level: 2,
        workbookAreaId: 18,  // Tracks
        previousTaskId: 2,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(18);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(18);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        wordings: [
            {
                prompt: "What tracks would you like to pursue at some point?"
            },
            {
                prompt: "Anything you dreamed of when you were younger but haven't done and still would find exciting to try out?"
            },
            {
                prompt: "If you get a salary for working on anything you want, what would you work with?"
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete - CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemLvl2Task",
        workingOnText: "making level 2 inventory of Tracks",
        notificationText: "Make level 2 inventory of Tracks",
        comingUpText: "making inventory level 2"
    },
    {
        id: 12,
        level: 2,
        workbookAreaId: 1,  // Strengths
        previousTaskId: 3,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(1);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(1);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        wordings: [
            {
                prompt: "What things are you good at?"
            },
            {
                prompt: "What qualities were important in the last role you had"
            },
            {
                prompt: "What are you the most confident at in your work?"
            },
            {
                prompt: "When are you the happiest with your work?",
                sentenceStart: "When I "
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete - CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemLvl2Task",
        workingOnText: "making level 2 inventory of Strengths",
        notificationText: "Make level 2 inventory of Strengths",
        comingUpText: "making inventory level 2"
    },
    {
        id: 13,
        level: 2,
        workbookAreaId: 2,  // Drivers
        previousTaskId: 4,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(2);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(2);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        wordings: [
            {
                prompt: "Why do you go to work, except from the salary?"
            },
            {
                prompt: "When do you feel the most energy at work?",
                sentenceStart: "When I "
            },
            {
                prompt: "What are you passions?",
                sentenceStart: "I'm passionate about "
            },
            {
                prompt: "What impact do you want to have on the world?"
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete - CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemLvl2Task",
        workingOnText: "making level 2 inventory of Drivers",
        notificationText: "Make level 2 inventory of Drivers",
        comingUpText: "making inventory level 2"
    },
    {
        id: 14,
        level: 2,
        workbookAreaId: 4,  // Workplace
        previousTaskId: 5,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(4);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(4);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        wordings: [
            {
                prompt: "What kind of environment are you the most creative in?"
            },
            {
                prompt: "What kind of environment are you the most productive in?"
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete - CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemLvl2Task",
        workingOnText: "making level 2 inventory of Workplace preferences",
        notificationText: "Make level 2 inventory of Workplace preferences",
        comingUpText: "making inventory level 2"
    },
    {
        id: 15,
        level: 2,
        workbookAreaId: 12,  // Mores
        previousTaskId: 6,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(12);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(12);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        wordings: [
            {
                prompt: "What would you like to spend more time on in your work?"
            },
            {
                prompt: "In what area do you want to improve yourself in your work?"
            },
            {
                prompt: "What are the tasks you look the most forward to?"
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete - CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemLvl2Task",
        workingOnText: "making level 2 inventory of Mores",
        notificationText: "Make level 2 inventory of Mores",
        comingUpText: "making inventory level 2"
    },
    {
        id: 16,
        level: 2,
        workbookAreaId: 17,  // ToolsAndMethods
        previousTaskId: 7,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(17);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(17);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        wordings: [
            {
                prompt: "What methods do you use to do your work?"
            },
            {
                prompt: "What are the tools you consider indespensible to do your work?"
            },
            {
                prompt: "If you could freely select the tools and methodologies to do your work, what would you chose?"
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete - CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemLvl2Task",
        workingOnText: "making level 2 inventory of Tools and Methods",
        notificationText: "Make level 2 inventory of Tools and Methods",
        comingUpText: "making inventory level 2"
    },
    {
        id: 17,
        level: 2,
        workbookAreaId: 9,  // Leadership
        previousTaskId: 8,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(9);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(9);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        wordings: [
            {
                prompt: "This is something my boss should keep in mind to make me stay..."
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete - CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemLvl2Task",
        workingOnText: "making level 2 inventory of Leadership preferences",
        notificationText: "Make level 2 inventory of Leadership preferences",
        comingUpText: "making inventory level 2"
    },
    {
        id: 18,
        level: 2,
        workbookAreaId: 3,  // Contexts
        previousTaskId: 9,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(3);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(3);
            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        wordings: [
            {
                prompt: "Name a position or role you'd like to have!",
                sentenceStart: "I would like to work as "
            },
            {
                prompt: "Name an industry you're interested in working in!"
            },
            {
                prompt: "What position would you chose, if given the possibility to decide all by yourself?"
            },
            {
                prompt: "Please name an organization that you would find interesting to work with"
            },
            {
                prompt: "What industries would you not work in?",
                sentenceStart: "I would never work in "
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete - CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemLvl2Task",
        workingOnText: "making level 2 inventory of Contexts",
        notificationText: "Make level 2 inventory of Contexts",
        comingUpText: "making inventory level 2"
    },
    {   // Level 3
        id: 19,
        level: 3,
        workbookAreaId: 1,  // Strengths
        previousTaskId: 12,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(1);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !this.isDone() &&
                !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(1);
            return _.includes(CS.account.data.prioritizedWorkbookAreaIds, workbookArea.id);
        },
        wordings: [
            {
                prompt: "Which ones of these do you feel best describe your strengths? Prioritize by drag-and-dropping the items in this area"
            }
        ],
        stepCount: 1,
        templateClassName: "WorkbookAreaPrioritizeItemsTask",
        workingOnText: "prioritizing my Strengths",
        notificationText: "Prioritize my Strengths",
        comingUpText: "prioritizing"
    },
    {
        id: 20,
        level: 3,
        workbookAreaId: 2,  // Drivers
        previousTaskId: 13,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(2);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !this.isDone() &&
                !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(2);
            return _.includes(CS.account.data.prioritizedWorkbookAreaIds, workbookArea.id);
        },
        wordings: [
            {
                prompt: "What's most important to you? Prioritize your drivers by drag-and-dropping the items"
            }
        ],
        stepCount: 1,
        templateClassName: "WorkbookAreaPrioritizeItemsTask",
        workingOnText: "prioritizing my Drivers",
        notificationText: "Prioritize my Drivers",
        comingUpText: "prioritizing"
    },
    {
        id: 21,
        level: 3,
        workbookAreaId: 4,  // Workplace
        previousTaskId: 14,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(4);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !this.isDone() &&
                !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(4);
            return _.includes(CS.account.data.prioritizedWorkbookAreaIds, workbookArea.id);
        },
        wordings: [
            {
                prompt: "What's most important to you in a work environment? Please order these items in order of importance by drag-and-dropping"
            }
        ],
        stepCount: 1,
        templateClassName: "WorkbookAreaPrioritizeItemsTask",
        workingOnText: "prioritizing Workplace preferences",
        notificationText: "Prioritize Workplace preferences",
        comingUpText: "prioritizing"
    },
    {
        id: 22,
        level: 3,
        workbookAreaId: 5,  // Achievements
        previousTaskId: 10,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(5);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !this.isDone() &&
                !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(5);
            return _.includes(CS.account.data.prioritizedWorkbookAreaIds, workbookArea.id);
        },
        wordings: [
            {
                prompt: "Which ones of these do you feel are your most important achievements? Prioritize by drag-and-dropping the items in this area"
            }
        ],
        stepCount: 1,
        templateClassName: "WorkbookAreaPrioritizeItemsTask",
        workingOnText: "prioritizing my Achievements",
        notificationText: "Prioritize my Achievements",
        comingUpText: "prioritizing"
    },
    {
        id: 23,
        level: 3,
        workbookAreaId: 9,  // Leadership
        previousTaskId: 17,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(9);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !this.isDone() &&
                !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(9);
            return _.includes(CS.account.data.prioritizedWorkbookAreaIds, workbookArea.id);
        },
        wordings: [
            {
                prompt: "Prioritize the list by drag-and-dropping. What's the top things you need in the leadership to do a great job?"
            }
        ],
        stepCount: 1,
        templateClassName: "WorkbookAreaPrioritizeItemsTask",
        workingOnText: "prioritizing Leadership preferences",
        notificationText: "Prioritize Leadership preferences",
        comingUpText: "prioritizing"
    },
    {
        id: 24,
        level: 3,
        workbookAreaId: 12,  // Mores
        previousTaskId: 15,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(12);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !this.isDone() &&
                !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(12);
            return _.includes(CS.account.data.prioritizedWorkbookAreaIds, workbookArea.id);
        },
        wordings: [
            {
                prompt: "If you were given the opportunity to do more of only three things in this list, which ones would it be? Place them at the top by drag-and-dropping"
            }
        ],
        stepCount: 1,
        templateClassName: "WorkbookAreaPrioritizeItemsTask",
        workingOnText: "prioritizing what I want More",
        notificationText: "Prioritize what I want More",
        comingUpText: "prioritizing"
    },
    {
        id: 25,
        level: 3,
        workbookAreaId: 18,  // Tracks
        previousTaskId: 11,
        isActive: function () {
            var workbookArea = CS.blueprintAreasModel.getOfId(18);

            if (!workbookArea.isActive()) {
                return false;
            }

            var workbookItemsForThisArea = CS.account.data[workbookArea.className];

            return !this.isDone() &&
                !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookArea = CS.blueprintAreasModel.getOfId(18);
            return _.includes(CS.account.data.prioritizedWorkbookAreaIds, workbookArea.id);
        },
        wordings: [
            {
                prompt: "Which ones of these tracks do you find the most interesting to pursue right now? Prioritize by drag-and-dropping the items in this area"
            }
        ],
        stepCount: 1,
        templateClassName: "WorkbookAreaPrioritizeItemsTask",
        workingOnText: "prioritizing my Tracks",
        notificationText: "Prioritize my Tracks",
        comingUpText: "prioritizing"
    }
];
;CS.WorkbookItemTasks = [
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

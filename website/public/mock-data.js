CS.WorkbookAreaTasks = [
    {   // Level 1
        id: 1,
        level: 1,
        workbookAreaId: 5,  // Achievements
        getWorkbookArea: function() {
            return CS.blueprintAreasModel.getOfId(this.workbookAreaId);
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

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
                prompt: "Have you won any awards or prices for your work or educational achievements?",
                sentenceStart: "I was "
            },
            {
                prompt: "Think about the last job you had. One thing you achieved when you worked there was..."
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemTask",
        workingOnText: "Gör en inventering av Resultat",
        notificationText: "Gör en inventering av Resultat"
    },
    {
        id: 2,
        level: 1,
        workbookAreaId: 18,  // Tracks
        getWorkbookArea: function() {
            return CS.blueprintAreasModel.getOfId(this.workbookAreaId);
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

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
        workingOnText: "Gör en inventering av Spår att följa... ",
        notificationText: "Gör en inventering av Spår att följa... "
    },
    {
        id: 3,
        level: 1,
        workbookAreaId: 1,  // Strengths
        getWorkbookArea: function() {
            return CS.blueprintAreasModel.getOfId(this.workbookAreaId);
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

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
        workingOnText: "Gör en inventering av Styrkor",
        notificationText: "Gör en inventering av Styrkor"
    },
    {
        id: 4,
        level: 1,
        workbookAreaId: 2,  // Drivers
        getWorkbookArea: function() {
            return CS.blueprintAreasModel.getOfId(this.workbookAreaId);
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

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
        workingOnText: "Gör en inventering av Drivkrafter",
        notificationText: "Gör en inventering av Drivkrafter"
    },
    {
        id: 6,
        level: 1,
        workbookAreaId: 12,  // Mores
        getWorkbookArea: function() {
            return CS.blueprintAreasModel.getOfId(this.workbookAreaId);
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

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
        workingOnText: "Gör en inventering av Göra mer av... ",
        notificationText: "Gör en inventering av Göra mer av... "
    },
    {
        id: 7,
        level: 1,
        workbookAreaId: 17,  // ToolsAndMethods
        getWorkbookArea: function() {
            return CS.blueprintAreasModel.getOfId(this.workbookAreaId);
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return _.isEmpty(workbookItemsForThisArea) || workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        },
        isDone: function() {
            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

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
        workingOnText: "Gör en inventering av Metoder och verktyg",
        notificationText: "Gör en inventering av Metoder och verktyg"
    },
    {   // Level 2
        id: 10,
        level: 2,
        previousTaskId: 1,
        getWorkbookArea: function() {
            var previousTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.previousTaskId;
            }.bind(this));

            return previousTask.getWorkbookArea();
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
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

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
        workingOnText: "Inventering nivå 2 av Resultat",
        notificationText: "Inventering nivå 2 av Resultat",
        comingUpText: "Inventering nivå 2 av Resultat"
    },
    {
        id: 11,
        level: 2,
        previousTaskId: 2,
        getWorkbookArea: function() {
            var previousTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.previousTaskId;
            }.bind(this));

            return previousTask.getWorkbookArea();
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
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

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
        workingOnText: "Inventering nivå 2 av Spår att följa... ",
        notificationText: "Inventering nivå 2 av Spår att följa... ",
        comingUpText: "Inventering nivå 2 av Spår att följa... "
    },
    {
        id: 12,
        level: 2,
        previousTaskId: 3,
        getWorkbookArea: function() {
            var previousTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.previousTaskId;
            }.bind(this));

            return previousTask.getWorkbookArea();
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
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
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
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete - CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemLvl2Task",
        workingOnText: "Inventering nivå 2 av Styrkor",
        notificationText: "MakeInventering nivå 2 av Styrkor",
        comingUpText: "Inventering nivå 2 av Styrkor"
    },
    {
        id: 13,
        level: 2,
        previousTaskId: 4,
        getWorkbookArea: function() {
            var previousTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.previousTaskId;
            }.bind(this));

            return previousTask.getWorkbookArea();
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
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

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
        workingOnText: "Inventering nivå 2 av Drivkrafter",
        notificationText: "Inventering nivå 2 av Drivkrafter",
        comingUpText: "Inventering nivå 2 av Drivkrafter"
    },
    {
        id: 15,
        level: 2,
        previousTaskId: 6,
        getWorkbookArea: function() {
            var previousTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.previousTaskId;
            }.bind(this));

            return previousTask.getWorkbookArea();
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
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

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
        workingOnText: "Inventering nivå 2 av Göra mer av... ",
        notificationText: "Inventering nivå 2 av Göra mer av... ",
        comingUpText: "Inventering nivå 2 av Göra mer av... "
    },
    {
        id: 16,
        level: 2,
        previousTaskId: 7,
        getWorkbookArea: function() {
            var previousTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.previousTaskId;
            }.bind(this));

            return previousTask.getWorkbookArea();
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
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete &&
                workbookItemsForThisArea.length < CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return !_.isEmpty(workbookItemsForThisArea) && workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
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
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete - CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemLvl2Task",
        workingOnText: "Inventering nivå 2 av Metoder och verktyg",
        notificationText: "Inventering nivå 2 av Metoder och verktyg",
        comingUpText: "Inventering nivå 2 av Metoder och verktyg"
    },
    {   // Level 3
        id: 19,
        level: 3,
        previousTaskId: 12,
        getWorkbookArea: function() {
            var previousTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.previousTaskId;
            }.bind(this));

            return previousTask.getWorkbookArea();
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return !this.isDone() &&
                !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            return CS.account.data && CS.account.data.prioritizedWorkbookAreaIds && _.includes(CS.account.data.prioritizedWorkbookAreaIds, this.getWorkbookArea().id);
        },
        wordings: [
            {
                prompt: "Which ones of these do you feel best describe your strengths? Prioritize by drag-and-dropping the items in this area."
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
        previousTaskId: 13,
        getWorkbookArea: function() {
            var previousTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.previousTaskId;
            }.bind(this));

            return previousTask.getWorkbookArea();
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return !this.isDone() &&
                !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            return CS.account.data && CS.account.data.prioritizedWorkbookAreaIds && _.includes(CS.account.data.prioritizedWorkbookAreaIds, this.getWorkbookArea().id);
        },
        wordings: [
            {
                prompt: "What's most important to you? Prioritize your drivers by drag-and-dropping the items."
            }
        ],
        stepCount: 1,
        templateClassName: "WorkbookAreaPrioritizeItemsTask",
        workingOnText: "prioritizing my Drivers",
        notificationText: "Prioritize my Drivers",
        comingUpText: "prioritizing"
    },
    {
        id: 22,
        level: 3,
        previousTaskId: 10,
        getWorkbookArea: function() {
            var previousTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.previousTaskId;
            }.bind(this));

            return previousTask.getWorkbookArea();
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return !this.isDone() &&
                !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            return CS.account.data && CS.account.data.prioritizedWorkbookAreaIds && _.includes(CS.account.data.prioritizedWorkbookAreaIds, this.getWorkbookArea().id);
        },
        wordings: [
            {
                prompt: "Which ones of these do you feel are your most important achievements? Prioritize by drag-and-dropping the items in this area."
            }
        ],
        stepCount: 1,
        templateClassName: "WorkbookAreaPrioritizeItemsTask",
        workingOnText: "prioritizing my Achievements",
        notificationText: "Prioritize my Achievements",
        comingUpText: "prioritizing"
    },
    {
        id: 24,
        level: 3,
        previousTaskId: 15,
        getWorkbookArea: function() {
            var previousTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.previousTaskId;
            }.bind(this));

            return previousTask.getWorkbookArea();
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return !this.isDone() &&
                !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            return CS.account.data && CS.account.data.prioritizedWorkbookAreaIds && _.includes(CS.account.data.prioritizedWorkbookAreaIds, this.getWorkbookArea().id);
        },
        wordings: [
            {
                prompt: "If you were given the opportunity to do more of only three things in this list, which ones would it be? Place them at the top by drag-and-dropping."
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
        previousTaskId: 11,
        getWorkbookArea: function() {
            var previousTask = _.find(CS.WorkbookAreaTasks, function (task) {
                return task.id === this.previousTaskId;
            }.bind(this));

            return previousTask.getWorkbookArea();
        },
        getWorkbookItemsForThisArea: function() {
            return CS.account.data ? CS.account.data[this.getWorkbookArea().className] : [];
        },
        isActive: function () {
            if (!this.getWorkbookArea().isActive()) {
                return false;
            }

            var workbookItemsForThisArea = this.getWorkbookItemsForThisArea();

            return !this.isDone() &&
                !_.isEmpty(workbookItemsForThisArea) &&
                workbookItemsForThisArea.length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete;
        },
        isDone: function() {
            return CS.account.data && CS.account.data.prioritizedWorkbookAreaIds && _.includes(CS.account.data.prioritizedWorkbookAreaIds, this.getWorkbookArea().id);
        },
        wordings: [
            {
                prompt: "Which ones of these tracks do you find the most interesting to pursue right now? Prioritize by drag-and-dropping the items in this area."
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
;CS.WorkbookAreaTaskCompletePepTalks = [
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
;CS.WorkbookItemTaskCompletePepTalks = [
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
    }
];

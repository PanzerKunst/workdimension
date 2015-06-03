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
        id: 5,
        level: 1,
        workbookAreaId: 4,  // Workplace
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
    {
        id: 8,
        level: 1,
        workbookAreaId: 9,  // Leadership
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
                prompt: "This is something my boss should keep in mind to make me stay..."
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemTask",
        workingOnText: "Gör en inventering av Ledarskapet jag behöver",
        notificationText: "Gör en inventering av Ledarskapet jag behöver"
    },
    {
        id: 9,
        level: 1,
        workbookAreaId: 3,  // Contexts
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
        id: 14,
        level: 2,
        previousTaskId: 5,
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
    {
        id: 17,
        level: 2,
        previousTaskId: 8,
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
        previousTaskId: 9,
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
        id: 21,
        level: 3,
        previousTaskId: 14,
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
                prompt: "What's most important to you in a work environment? Please order these items in order of importance by drag-and-dropping."
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
        id: 23,
        level: 3,
        previousTaskId: 17,
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

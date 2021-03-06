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
                prompt: "Beskriv en situation där du löst ett problem på ett bra eller oväntat sätt"
            },
            {
                prompt: "Något du är riktigt stolt över från tidigare jobb och studier: "
            },
            {
                prompt: "Har du vunnit några priser för ditt jobb eller under din utbildning?",
                sentenceStart: "Jag "
            },
            {
                prompt: "Tänk på det senaste jobb du hade. En sak du lyckades riktigt bra med där var... "
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
                prompt: "Vilka spår skulle du nån gång kunna tänka dig att följa? Jobb, roller, branscher, titlar, uppgifter... "
            },
            {
                prompt: "Något du drömde om att göra när du var yngre och fortfarande skulle vilja prova på?"
            },
            {
                prompt: "Om du fick lön för att jobba med vad som helst, vad skulle det vara?"
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
                prompt: "När känner du dig som mest glad över ditt jobb?",
                sentenceStart: "När jag "
            },
            {
                prompt: "Vad känner du dig som mest trygg med att göra på jobbet?"
            },
            {
                prompt: "Vilka egenskaper var viktiga för att göra ett bra jobb i den senaste roll du hade?"
            },
            {
                prompt: "Vad är du bra på?"
            },
            {
                prompt: "Hur tror du att dina kollegor beskriver dig i din yrkesroll?"
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
                prompt: "Varför går du till jobbet förutom för lönen? "
            },
            {
                prompt: "När känner du som mest energi på jobbet?",
                sentenceStart: "När jag "
            },
            {
                prompt: "Vad är du som mest intresserad av?",
                sentenceStart: "Jag är väldigt intresserad av "
            },
            {
                prompt: "På vilket sätt vill du påverka världen?"
            },
            {
                prompt: "När känner du dig som mest nöjd (eller stolt!) över vad du gjort?"
            },
            {
                prompt: "Vad trivs du mest med att göra - utanför jobbet?"
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
                prompt: "Vad skulle du vilja lägga mer tid på i jobbet? "
            },
            {
                prompt: "Vilka delar av ditt jobb skulle du hellre vara utan? ",
                sentenceStart: "Jag skulle kunna göra mer av det roliga om jag minskade på "
            },
            {
                prompt: "Vilka delar av jobbet ser du mest fram emot att göra? "
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
                prompt: "Vilka verktyg gillar du att använda för att göra ditt jobb?"
            },
            {
                prompt: "Har du några metoder som du tycker fungerar riktigt bra för att göra det du gör? "
            },
            {
                prompt: "Om du kunde välja metoder och verktyg helt fritt, vad skulle du välja?"
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
                prompt: "Beskriv en situation där du löst ett problem på ett bra eller oväntat sätt"
            },
            {
                prompt: "Något du är riktigt stolt över från tidigare jobb och studier: "
            },
            {
                prompt: "Har du vunnit några priser för ditt jobb eller under din utbildning?",
                sentenceStart: "Jag "
            },
            {
                prompt: "Tänk på det senaste jobb du hade. En sak du lyckades riktigt bra med där var... "
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
                prompt: "Vilka spår skulle du nån gång kunna tänka dig att följa? Jobb, roller, branscher, titlar, uppgifter... "
            },
            {
                prompt: "Något du drömde om att göra när du var yngre och fortfarande skulle vilja prova på?"
            },
            {
                prompt: "Om du fick lön för att jobba med vad som helst, vad skulle det vara?"
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
                prompt: "När känner du dig som mest glad över ditt jobb?",
                sentenceStart: "När jag "
            },
            {
                prompt: "Vad känner du dig som mest trygg med att göra på jobbet?"
            },
            {
                prompt: "Vilka egenskaper var viktiga för att göra ett bra jobb i den senaste roll du hade?"
            },
            {
                prompt: "Vad är du bra på?"
            },
            {
                prompt: "Hur skulle de människor du jobbar med besrkiva dig?"
            }
        ],
        stepCount: CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete - CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
        templateClassName: "WorkbookAreaAddItemLvl2Task",
        workingOnText: "Inventering nivå 2 av Styrkor",
        notificationText: "Inventering nivå 2 av Styrkor",
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
                prompt: "Varför går du till jobbet förutom för lönen? "
            },
            {
                prompt: "När känner du som mest energi på jobbet?",
                sentenceStart: "När jag "
            },
            {
                prompt: "Vad är du som mest intresserad av?",
                sentenceStart: "Jag är väldigt intresserad av "
            },
            {
                prompt: "På vilket sätt vill du påverka världen?"
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
                prompt: "Vad skulle du vilja lägga mer tid på i jobbet? "
            },
            {
                prompt: "Vilka delar av ditt jobb skulle du hellre vara utan? ",
                sentenceStart: "Jag skulle kunna göra mer av det roliga om jag minskade på "
            },
            {
                prompt: "Vilka delar av jobbet ser du mest fram emot att göra? "
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
                prompt: "Vilka verktyg gillar du att använda för att göra ditt jobb?"
            },
            {
                prompt: "Har du några metoder som du tycker fungerar riktigt bra för att göra det du gör? "
            },
            {
                prompt: "Om du kunde välja metoder och verktyg helt fritt, vad skulle du välja?"
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
                prompt: "Vilka av de här tycker du bäst beskriver dina styrkor? Sortera dina styrkorna med de viktigaste överst genom genom att dra-och-släppa."
            }
        ],
        stepCount: 1,
        templateClassName: "WorkbookAreaPrioritizeItemsTask",
        workingOnText: "sortera styrkor",
        notificationText: "Sortera styrkor",
        comingUpText: "sortera"
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
                prompt: "Vad är viktigast för dig? Sortera dina drivkrafter med de viktigaste överst genom att dra-och-släppa"
            }
        ],
        stepCount: 1,
        templateClassName: "WorkbookAreaPrioritizeItemsTask",
        workingOnText: "sortera drivkrafter",
        notificationText: "Sortera drivkrafter",
        comingUpText: "sortera"
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
                prompt: "Vilka resultat känner du är mest engagerande? Sortera med det viktigaste överst genom att dra-och-släppa."
            }
        ],
        stepCount: 1,
        templateClassName: "WorkbookAreaPrioritizeItemsTask",
        workingOnText: "sortera resultat",
        notificationText: "Sortera resultat",
        comingUpText: "sortera"
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
                prompt: "Om du bara fick välja en sak i listan, vad skulle det vara? Sortera listan med det viktigaste överst genom att dra-och-släppa.Place them at the top by drag-and-dropping."
            }
        ],
        stepCount: 1,
        templateClassName: "WorkbookAreaPrioritizeItemsTask",
        workingOnText: "sortera saker jag vill göra mer av",
        notificationText: "Sortera saker jag vill göra mer av",
        comingUpText: "sortera"
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
                prompt: "Vilka av de här tycker känns mest intressant just nu? Sortera med de viktigaste längst upp."
            }
        ],
        stepCount: 1,
        templateClassName: "WorkbookAreaPrioritizeItemsTask",
        workingOnText: "sortera Spår att följa",
        notificationText: "Sortera spår att följa",
        comingUpText: "sortera"
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
                prompt: "<p>Beskriv en situation där det här verkligen var viktigt:</p><p><em>{itemName}</em></p>"
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
            },
            {
                prompt: "<p>När har du som mest fått tillfälle att leva enligt den här drivkraften?</p><p><em>{itemName}</em></p>"
            }
        ],
        stepCount: CS.Models.WorkbookItemTaskCommon.minItemCountForAddItemsTaskComplete,
        templateClassName: "WorkbookItemAddItemTask",
        workingOnText: "beskriver drivkraft",
        notificationText: "Beskriv drivkraft"
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

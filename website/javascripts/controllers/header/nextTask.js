CS.Controllers.NextTask = P(function (c) {
    c.init = function () {
        this._initElements();
        this._initEvents();

        this.initNextTask();
    };

    c._initElements = function () {
        this.$mainContainer = $("#container");
        this.$nextTaskBtn = $("#next-task-btn");
        this.$nextTaskPrompt = $("#next-task-prompt");

        this.$nextTaskSpan = this.$nextTaskPrompt.children("span");
        this.$nextTaskActionBtn = this.$nextTaskPrompt.children("button");
    };

    c._initEvents = function () {
        this.$nextTaskBtn.click($.proxy(this._toggleNextTaskPrompt, this));
    };

    c.initNextTask = function () {
        var nextTask = this._getNextTask();

        if (!nextTask) {
            this.$nextTaskBtn.hide();
        } else {
            this.$nextTaskBtn.show();

            this.$nextTaskSpan.html(nextTask.text);
            this.$nextTaskActionBtn.unbind();
            this.$nextTaskActionBtn.click(nextTask.action);

            this.nextTask = nextTask;

            if (this._isTaskRead()) {
                this.$nextTaskBtn.addClass("read");
            } else {
                this.$nextTaskBtn.removeClass("read");
                TweenLite.set(this.$nextTaskBtn, {backgroundColor: "rgb(255, 255, 255)"});
                TweenLite.to(this.$nextTaskBtn, CS.defaultAnimationDuration * 2, {backgroundColor: "rgb(255, 138, 56)", onComplete: $.proxy(this._markTaskAsRead, this)});
                this.$nextTaskPrompt.css("height", "auto");
            }
        }
    };

    c._toggleNextTaskPrompt = function () {
        var newHeight = "0px";

        if (this.$nextTaskPrompt.height() === 0) {
            newHeight = "auto";
            this._markTaskAsRead();
        }

        this.$nextTaskPrompt.css("height", newHeight);
    };

    c._getNextTask = function () {
        var activeWorkbookAreaToInventorize = _.find(CS.blueprintAreasModel.getActive(), function (workbookArea) {
            return CS.account.data[workbookArea.className] && CS.account.data[workbookArea.className].length === 2;
        });

        if (!activeWorkbookAreaToInventorize) {
            activeWorkbookAreaToInventorize = _.find(CS.blueprintAreasModel.getActive(), function (workbookArea) {
                return CS.account.data[workbookArea.className] && CS.account.data[workbookArea.className].length === 1;
            });
        }

        if (!activeWorkbookAreaToInventorize) {
            activeWorkbookAreaToInventorize = _.find(CS.blueprintAreasModel.getActive(), function (workbookArea) {
                return !CS.account.data[workbookArea.className] || CS.account.data[workbookArea.className].length === 0;
            });
        }

        if (activeWorkbookAreaToInventorize) {
            return {
                text: "Making inventory of " + activeWorkbookAreaToInventorize.className.toLowerCase(),
                action: function () {
                    location.href = "/workbook-areas/" + activeWorkbookAreaToInventorize.className;
                }
            };
        }

        var activeWorkbookAreaToInventorizeLvl2 = _.find(CS.blueprintAreasModel.getActive(), function (workbookArea) {
            return CS.account.data[workbookArea.className] && CS.account.data[workbookArea.className].length === 5;
        });

        if (!activeWorkbookAreaToInventorizeLvl2) {
            activeWorkbookAreaToInventorizeLvl2 = _.find(CS.blueprintAreasModel.getActive(), function (workbookArea) {
                return CS.account.data[workbookArea.className] && CS.account.data[workbookArea.className].length === 4;
            });
        }

        if (!activeWorkbookAreaToInventorizeLvl2) {
            activeWorkbookAreaToInventorizeLvl2 = _.find(CS.blueprintAreasModel.getActive(), function (workbookArea) {
                return !CS.account.data[workbookArea.className] || CS.account.data[workbookArea.className].length === 3;
            });
        }

        if (activeWorkbookAreaToInventorizeLvl2) {
            return {
                text: "Making inventory level 2 of " + activeWorkbookAreaToInventorize.className.toLowerCase(),
                action: function () {
                    location.href = "/workbook-areas/" + activeWorkbookAreaToInventorize.className;
                }
            };
        }

        var areasWhichHaveEnoughItemsForPrioritizationTask = [];
        CS.blueprintAreasModel.getActive().forEach(function(workbookArea) {
            if (!_.includes(CS.account.data.prioritizedWorkbookAreaIds, workbookArea.id) &&
                CS.account.data[workbookArea.className] &&
                CS.account.data[workbookArea.className].length >= CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl2TaskComplete ) {
                areasWhichHaveEnoughItemsForPrioritizationTask.push({
                    workbookAreaClassName: workbookArea.className,
                    workbookItems: CS.account.data[workbookArea.className]
                });
            }
        });

        var areaToPrioritize = _.first(_.sortBy(areasWhichHaveEnoughItemsForPrioritizationTask, function(area) {
            return -area.workbookItems.length;
        }));

        if (areaToPrioritize) {
            return {
                text: "Prioritizing " + areaToPrioritize.workbookAreaClassName.toLowerCase(),
                action: function() {
                    location.href = "/workbook-areas/" + areaToPrioritize.workbookAreaClassName;
                }
            };
        }
    };

    c._markTaskAsRead = function () {
        this.$nextTaskBtn.addClass("read");

        if (!this._isTaskRead()) {
            CS.account.data.readTaskTexts = CS.account.data.readTaskTexts || [];
            CS.account.data.readTaskTexts.push(this.nextTask.text);
            CS.saveAccountData();
        }
    };

    c._isTaskRead = function () {
        return _.indexOf(CS.account.data.readTaskTexts, this.nextTask.text) > -1;
    };
});

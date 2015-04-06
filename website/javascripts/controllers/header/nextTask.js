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
                TweenLite.to(this.$nextTaskBtn, CS.defaultAnimationDuration * 2, {backgroundColor: "rgb(255, 138, 56)"});
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

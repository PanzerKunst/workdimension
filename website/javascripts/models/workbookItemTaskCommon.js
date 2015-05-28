CS.Models.WorkbookItemTaskCommon = {
    minItemCountForAddItemsTaskComplete: 1,

    getNextWording: function (itemTask, itemIndex) {
        var firstNotSkipped = _.find(itemTask.wordings, function (wording) {
            return !_.includes(CS.Services.Browser.getFromLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts(itemTask.getWorkbookArea().id, itemIndex)), wording.prompt);
        }.bind(this));

        if (firstNotSkipped) {
            return firstNotSkipped;
        }

        // All have been skipped, we need to unskip them all
        this._unskipAll(itemTask.getWorkbookArea().id, itemIndex);

        return _.find(itemTask.wordings, function (wording) {
            return !_.includes(CS.Services.Browser.getFromLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts(itemTask.getWorkbookArea().id, itemIndex)), wording.prompt);
        }.bind(this));
    },

    getLocalStorageKeyForSkippedTaskPrompts: function (workbookAreaId, workbookItemIndex) {
        return "skippedTaskPrompts-" + workbookAreaId + "-" + workbookItemIndex;
    },

    _unskipAll: function (workbookAreaId, workbookItemIndex) {
        CS.Services.Browser.removeFromLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts(workbookAreaId, workbookItemIndex));
    }
};

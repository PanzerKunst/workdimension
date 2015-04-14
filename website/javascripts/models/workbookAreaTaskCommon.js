CS.Models.WorkbookAreaTaskCommon = {
    minItemCountForAddItemsLvl1TaskComplete: 3,
    minItemCountForAddItemsLvl2TaskComplete: 6,

    getNextWording: function (areaTask) {
        var firstNotSkipped = _.find(areaTask.wordings, function (wording) {
            return !_.includes(CS.Services.Browser.getFromLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts(areaTask.workbookAreaId)), wording.prompt);
        }.bind(this));

        if (firstNotSkipped) {
            return firstNotSkipped;
        }

        // All have been skipped, we need to unskip them all
        this._unskipAll(areaTask.workbookAreaId);

        return _.find(areaTask.wordings, function (wording) {
            return !_.includes(CS.Services.Browser.getFromLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts(areaTask.workbookAreaId)), wording.prompt);
        }.bind(this));
    },

    getLocalStorageKeyForSkippedTaskPrompts: function (workbookAreaId) {
        return "skippedTaskPrompts-" + workbookAreaId;
    },

    _unskipAll: function (workbookAreaId) {
        CS.Services.Browser.removeFromLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts(workbookAreaId));
    }
};

CS.Controllers.AddItemTaskCommon = {
    getNextTask: function (areaTasks, workbookAreaClassName) {
        var firstNotSkipped = _.find(areaTasks, function (task) {
            return !_.includes(CS.Services.Browser.getFromLocalStorage(this.getLocalStorageKeyForSkippedTaskIds(workbookAreaClassName)), task.id);
        }.bind(this));

        if (firstNotSkipped) {
            return firstNotSkipped;
        }

        // All have been skipped, we need to unskip them all
        this._unskipAll(workbookAreaClassName);

        return _.find(areaTasks, function (task) {
            return !_.includes(CS.Services.Browser.getFromLocalStorage(this.getLocalStorageKeyForSkippedTaskIds(workbookAreaClassName)), task.id);
        }.bind(this));
    },

    getLocalStorageKeyForSkippedTaskIds: function (workbookAreaClassName) {
        return "skippedTaskIds-" + workbookAreaClassName;
    },

    _unskipAll: function (workbookAreaClassName) {
        CS.Services.Browser.removeFromLocalStorage(this.getLocalStorageKeyForSkippedTaskIds(workbookAreaClassName));
    }
};

CS.Controllers.WorkbookAreaPrioritizeItemsTask = React.createClass({
    render: function () {
        this._initCurrentTask();

        if (!this.currentTask) {
            return null;
        }

        return (
            <div className="workbook-area-task">
                <p>Working on: prioritizing {this.props.workbookArea.className.toLowerCase()}</p>
                <div className="task-progress-bar">
                    <div></div>
                </div>
                <label>{this.currentTask.text}</label>
                <button className="btn btn-primary" onClick={this._setCurrentWorkbookAreaAsPrioritizedAndReRender}>I'm done prioritizing</button>
            </div>
            );
    },

    _getLocalStorageKeyForPrioritizedWorkbookAreas: function() {
        return this.props.controller.reactInstance.localStorageKeyForPrioritizedWorkbookAreas;
    },

    _initCurrentTask: function () {
        this.currentTask = _.find(CS.PrioritizeItemsTasks, "workbookAreaId", this.props.workbookArea.id) || {
            id: 0,
            workbookAreaId: this.props.workbookArea.id,
            text: "What's most important to you? Prioritize by drag-and-dropping the items"
        };
    },

    _setCurrentWorkbookAreaAsPrioritizedAndReRender: function () {
        var prioritizedWorkbookAreaIds = CS.account.data.prioritizedWorkbookAreaIds || [];
        prioritizedWorkbookAreaIds.push(this.props.workbookArea.id);

        CS.account.data.prioritizedWorkbookAreaIds = prioritizedWorkbookAreaIds;

        CS.saveAccountData();
        this.props.controller.reRender();
    }
});

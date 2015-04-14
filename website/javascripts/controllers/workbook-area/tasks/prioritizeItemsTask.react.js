CS.Controllers.WorkbookAreaPrioritizeItemsTask = React.createClass({
    render: function () {
        var comingUpNextParagraph = null;
        if (this.props.comingUpNextText) {
            comingUpNextParagraph = (
                <p className="coming-up-next">Coming up next: {this.props.comingUpNextText}</p>
                );
        }

        var currentWording = CS.Models.WorkbookAreaTaskCommon.getNextWording(this.props.task);

        return (
            <div className="workbook-area-task">
                <p>Working on: prioritizing {this.props.workbookArea.className.toLowerCase()}</p>
                <div className="task-progress-bar">
                    <div></div>
                </div>
                {comingUpNextParagraph}
                <label>{currentWording.prompt}</label>
                <button className="btn btn-primary" onClick={this._setCurrentWorkbookAreaAsPrioritizedAndReRender}>I'm done prioritizing</button>
            </div>
            );
    },

    _setCurrentWorkbookAreaAsPrioritizedAndReRender: function () {
        var prioritizedWorkbookAreaIds = CS.account.data.prioritizedWorkbookAreaIds || [];
        prioritizedWorkbookAreaIds.push(this.props.workbookArea.id);

        CS.account.data.prioritizedWorkbookAreaIds = prioritizedWorkbookAreaIds;

        CS.saveAccountData();
        this.props.controller.reRender();
    }
});

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
            <div className="workbook-task">
                <button className="styleless fa fa-question-circle" onClick={CS.Controllers.WorkbookAreaCommon.showAreaDescription}></button>
                <p className="working-on">Working on: {this.props.task.workingOnText}</p>
                <div className="progress">
                    <div ref="progressBar" className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
                </div>
                {comingUpNextParagraph}
                <label>{currentWording.prompt}</label>
                <div className="centered-contents">
                    <button className="btn btn-primary" onClick={this._setCurrentWorkbookAreaAsPrioritizedAndReRender}>I'm done prioritizing</button>
                </div>
            </div>
            );
    },

    _setCurrentWorkbookAreaAsPrioritizedAndReRender: function () {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var prioritizedWorkbookAreaIds = CS.account.data.prioritizedWorkbookAreaIds || [];
                prioritizedWorkbookAreaIds.push(this.props.workbookArea.id);

                CS.account.data.prioritizedWorkbookAreaIds = prioritizedWorkbookAreaIds;
                CS.saveAccountData();
                this.props.controller.reRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

CS.Controllers.WorkbookAreaPrioritizeItemsTask = React.createClass({
    render: function () {
        var comingUpNextParagraph = null;
        if (this.props.comingUpNextText) {
            comingUpNextParagraph = (
                <p className="coming-up-next">Nästa steg: {this.props.comingUpNextText}</p>
                );
        }

        var wrapperClasses = classNames({
            "workbook-task": true,
            "hidd3n": this.props.hidden
        });

        var currentWording = CS.Models.WorkbookAreaTaskCommon.getNextWording(this.props.task);

        return (
            <div className={wrapperClasses}>
                <button className="styleless fa fa-question-circle" onClick={CS.Controllers.WorkbookAreaCommon.showAreaDescription}></button>
                <p className="working-on">Du jobbar med: {this.props.task.workingOnText}</p>
                <div className="progress">
                    <div ref="progressBar" className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
                </div>
                {comingUpNextParagraph}
                <label>{currentWording.prompt}</label>
                <div className="centered-contents">
                    <button className="btn btn-primary" onClick={this._setCurrentWorkbookAreaAsPrioritizedAndReRender}>Jag har prioriterat klart!</button>
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

                this.props.controller.isPepTalkClosed = false;

                this.props.controller.reRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });

        ga("send", "event", "button", "click", "Workbook Area > Prioritize items task > Done");
    }
});

CS.Controllers.WorkbookAreaAddItemLvl2Task = React.createClass({
    render: function () {
        var comingUpNextParagraph = null;
        if (this.props.comingUpNextText) {
            comingUpNextParagraph = (
                <p className="coming-up-next">Coming up next: {this.props.comingUpNextText}</p>
                );
        }

        return (
            <div className="workbook-task">
                <p>Working on: {this.props.task.workingOnText}</p>
                <div className="progress">
                    <div ref="progressBar" className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                {comingUpNextParagraph}
                <CS.Controllers.WorkbookAreaAddItemTaskForm task={this.props.task} workbookArea={this.props.workbookArea} controller={this.props.controller} />
            </div>
            );
    },

    componentDidMount: function () {
        this._initElements();
        this._initProgressBar();
    },

    componentDidUpdate: function() {
        this._initProgressBar();
    },

    _initElements: function () {
        this.$progressBar = $(React.findDOMNode(this.refs.progressBar));
    },

    _initProgressBar: function() {
        var itemCount = 0;

        if (CS.account.data && !_.isEmpty(CS.account.data[this.props.workbookArea.className])) {
            itemCount = CS.account.data[this.props.workbookArea.className].length - CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete;
        }

        CS.Controllers.WorkbookCommon.setProgressBarWidth(this.$progressBar, itemCount, this.props.task.stepCount);
    }
});

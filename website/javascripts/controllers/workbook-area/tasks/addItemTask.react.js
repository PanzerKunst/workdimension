CS.Controllers.WorkbookAreaAddItemTask = React.createClass({
    render: function () {
        var comingUpNextParagraph = null;
        if (this.props.comingUpNextText) {
            comingUpNextParagraph = (
                <p className="coming-up-next">Coming up next: {this.props.comingUpNextText}</p>
                );
        }

        return (
            <div className="workbook-area-task">
                <p>Working on: {this.props.task.workingOnText}</p>
                <div className="task-progress-bar" ref="progressBar">
                    <div></div>
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
        this.$progressBar = $(React.findDOMNode(this.refs.progressBar)).children();
    },

    _initProgressBar: function() {
        var itemCount = 0;

        if (CS.account.data && !_.isEmpty(CS.account.data[this.props.workbookArea.className])) {
            itemCount = CS.account.data[this.props.workbookArea.className].length;
        }

        var itemPercent = itemCount / this.props.task.stepCount * 100;

        this.$progressBar.css("width", itemPercent + "%");
    }
});

CS.Controllers.WorkbookAreaAddItemTask = React.createClass({
    render: function () {
        var comingUpNextParagraph = null;
        if (this.props.comingUpNextText) {
            comingUpNextParagraph = (
                <p className="coming-up-next">Coming up next: {this.props.comingUpNextText}</p>
                );
        }

        return (
            <div className="workbook-task" ref="wrapper">
                <button className="styleless fa fa-question-circle" onClick={this._showAreaDescription}></button>
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

    componentDidUpdate: function () {
        this._initProgressBar();
    },

    _initElements: function () {
        this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
        this.$progressBar = this.$wrapper.find(".progress-bar");
        this.$areaDescriptionWrapper = $("#area-description");
    },

    _initProgressBar: function () {
        var itemCount = 0;

        if (CS.account.data && !_.isEmpty(CS.account.data[this.props.workbookArea.className])) {
            itemCount = CS.account.data[this.props.workbookArea.className].length;
        }

        CS.Controllers.WorkbookCommon.setProgressBarWidth(this.$progressBar, itemCount, this.props.task.stepCount);
    },

    _showAreaDescription: function () {
        CS.Services.Animator.fadeOut(this.$wrapper, {
            animationDuration: 0.2,
            onComplete: function () {
                CS.Services.Animator.fadeIn(this.$areaDescriptionWrapper);
            }.bind(this)
        });
    }
});

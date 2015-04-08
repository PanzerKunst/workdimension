CS.Controllers.WorkbookAreaAddItemTask = React.createClass({
    render: function () {
        this._initCurrentTask();

        if (!this.currentTask) {
            return null;
        }

        return (
            <div className="add-item-task">
                <p>Working on: making inventory of {this.props.workbookArea.className.toLowerCase()}</p>
                <div className="task-progress-bar" ref="progressBar">
                    <div></div>
                </div>
                <CS.Controllers.WorkbookAreaAddItemTaskForm currentTask={this.currentTask} workbookArea={this.props.workbookArea} controller={this.props.controller} />
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

    _initCurrentTask: function () {
        this.areaTasks = _.where(CS.AddItemToAreaTasks, {workbookAreaId: this.props.workbookArea.id});
        this.currentTask = CS.Controllers.AddItemTaskCommon.getNextTask(this.areaTasks, this.props.workbookArea.className);
    },

    _initProgressBar: function() {
        var itemCount = 0;

        if (CS.account.data && !_.isEmpty(CS.account.data[this.props.workbookArea.className])) {
            itemCount = CS.account.data[this.props.workbookArea.className].length;
        }

        var itemPercent = itemCount / this.props.controller.reactInstance.minItemCountForAddItemTasksComplete * 100;

        this.$progressBar.css("width", itemPercent + "%");
    }
});

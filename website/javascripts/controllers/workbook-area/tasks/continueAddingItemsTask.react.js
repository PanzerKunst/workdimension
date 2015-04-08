CS.Controllers.WorkbookAreaContinueAddingItemsTask = React.createClass({
    render: function () {
        this._initCurrentTask();

        if (!this.currentTask) {
            return null;
        }

        return (
            <div className="workbook-area-task">
                <p>Making inventory of {this.props.workbookArea.className.toLowerCase()} - Task complete!</p>
                <div className="task-progress-bar" ref="progressBar">
                    <div style={{width: "100%"}}></div>
                </div>
                <CS.Controllers.WorkbookAreaAddItemTaskForm currentTask={this.currentTask} workbookArea={this.props.workbookArea} controller={this.props.controller} />
            </div>
            );
    },

    _initCurrentTask: function () {
        this.areaTasks = _.where(CS.AddItemToAreaTasks, {workbookAreaId: this.props.workbookArea.id});
        this.currentTask = CS.Controllers.AddItemTaskCommon.getNextTask(this.areaTasks, this.props.workbookArea.className);
    }
});

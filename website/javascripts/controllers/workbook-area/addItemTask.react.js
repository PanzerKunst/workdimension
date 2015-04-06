CS.Controllers.WorkbookAreaAddItemTask = React.createClass({
    itemCountForTaskComplete: 3,

    render: function () {
        this._initCurrentTask();

        if (!this.currentTask) {
            return null;
        }

        var textareaId = "task-" + this.currentTask.id;

        return (
            <div className="add-item-task" ref="wrapper">
                <p>Working on: making inventory of {this.props.workbookArea.className.toLowerCase()}</p>
                <div className="task-progress-bar">
                    <div></div>
                </div>
                <form role="form" className="item-composer task" onSubmit={this._handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor={textareaId}>{this.currentTask.text}</label>
                        <textarea className="form-control" id={textareaId} onKeyUp={this._handleTextareaKeyUp} />
                    </div>
                    <button className="btn btn-primary">Add item</button>
                    <a onClick={this._setCurrentTaskAsSkippedAndReRender}>Try another one</a>
                </form>
            </div>
            );
    },

    componentDidMount: function () {
        this._initElements();
        this._initProgressBar();
        this._initTextareaValue();
    },

    componentDidUpdate: function() {
        this._initProgressBar();
        this._initTextareaValue();
    },

    _initElements: function () {
        this.$el = $(React.findDOMNode(this.refs.wrapper));
        this.$form = this.$el.children("form");
        this.$textarea = this.$form.find("textarea");
        this.$progressBar = this.$el.children(".task-progress-bar").children();
    },

    _getLocalStorageKeyForSkippedTaskIds: function () {
        return "skippedTaskIds-" + this.props.workbookArea.className;
    },

    _initCurrentTask: function () {
        this.areaTasks = _.where(CS.AddItemToAreaTasks, {workbookAreaId: this.props.workbookArea.id});
        this.currentTask = this._getNextTask();
    },

    _initProgressBar: function() {
        var itemCount = 0;

        if (CS.account.data && !_.isEmpty(CS.account.data[this.props.workbookArea.className])) {
            itemCount = CS.account.data[this.props.workbookArea.className].length;
        }

        var itemPercent = itemCount / this.itemCountForTaskComplete * 100;

        this.$progressBar.css("width", itemPercent + "%");
    },

    _initTextareaValue: function () {
        if (this.currentTask && this.currentTask.sentenceStart) {
            this.$textarea.val(this.currentTask.sentenceStart);
        }
    },

    _getNextTask: function () {
        var firstNotSkipped = _.find(this.areaTasks, function (task) {
            return !_.includes(CS.Services.Browser.getFromLocalStorage(this._getLocalStorageKeyForSkippedTaskIds()), task.id);
        }.bind(this));

        if (firstNotSkipped) {
            return firstNotSkipped;
        }

        // All have been skipped, we need to unskip them all
        this._unskipAll();

        return _.find(this.areaTasks, function (task) {
            return !_.includes(CS.Services.Browser.getFromLocalStorage(this._getLocalStorageKeyForSkippedTaskIds()), task.id);
        }.bind(this));
    },

    _handleFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var itemNameToAdd = this.$textarea.val().trim();

        if (this._isValid(itemNameToAdd) && !CS.Controllers.WorkbookAreaCommon.doesItemAlreadyExist(itemNameToAdd, this.props.workbookArea.className)) {
            var updatedBlueprintAreaData = CS.account.data && !_.isEmpty(CS.account.data[this.props.workbookArea.className]) ? _.clone(CS.account.data[this.props.workbookArea.className], true) : [];
            updatedBlueprintAreaData.push({name: itemNameToAdd});

            CS.account.data = CS.account.data || {};
            CS.account.data[this.props.workbookArea.className] = updatedBlueprintAreaData;

            CS.saveAccountData();
        }

        this._setCurrentTaskAsSkippedAndReRender();
    },

    _isValid: function(trimmedItemName) {
        if (!trimmedItemName) {
            return false;
        }

        if (!this.currentTask.sentenceStart) {
            return true;
        }

        return this.currentTask.sentenceStart.trim() !== trimmedItemName;
    },

    _handleTextareaKeyUp: function (e) {
        if (this.currentTask.sentenceStart && !_.startsWith(this.$textarea.val(), this.currentTask.sentenceStart)) {
            this.$textarea.val(this.currentTask.sentenceStart);
        }

        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, $.proxy(this._handleFormSubmit, this));
    },

    _resetForm: function () {
        this.$textarea.val(null);
    },

    _setCurrentTaskAsSkippedAndReRender: function () {
        var skippedTaskIds = CS.Services.Browser.getFromLocalStorage(this._getLocalStorageKeyForSkippedTaskIds()) || [];
        skippedTaskIds.push(this.currentTask.id);

        CS.Services.Browser.saveInLocalStorage(this._getLocalStorageKeyForSkippedTaskIds(), skippedTaskIds);

        this._resetForm();
        this.props.controller.reRender();
    },

    _unskipAll: function () {
        CS.Services.Browser.removeFromLocalStorage(this._getLocalStorageKeyForSkippedTaskIds());
    }
});
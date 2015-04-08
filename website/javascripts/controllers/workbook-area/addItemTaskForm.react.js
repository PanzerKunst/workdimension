CS.Controllers.WorkbookAreaAddItemTaskForm = React.createClass({
    render: function () {
        var textareaId = "task-" + this.props.currentTask.id;

        return (
            <form role="form" ref="form" className="item-composer task" onSubmit={this._handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor={textareaId}>{this.props.currentTask.text}</label>
                    <textarea className="form-control" id={textareaId} onKeyUp={this._handleTextareaKeyUp} />
                </div>
                <button className="btn btn-primary">Add item</button>
                <a onClick={this._setCurrentTaskAsSkippedAndReRender}>Try another one</a>
            </form>
            );
    },

    componentDidMount: function () {
        this._initElements();
        this._initTextareaValue();
    },

    componentDidUpdate: function() {
        this._initTextareaValue();
    },

    _initElements: function () {
        this.$form = $(React.findDOMNode(this.refs.form));
        this.$textarea = this.$form.find("textarea");
    },

    _initTextareaValue: function () {
        if (this.props.currentTask && this.props.currentTask.sentenceStart) {
            this.$textarea.val(this.props.currentTask.sentenceStart);
        }
    },

    _getLocalStorageKeyForSkippedTaskIds: function () {
        return CS.Controllers.AddItemTaskCommon.getLocalStorageKeyForSkippedTaskIds(this.props.workbookArea.className);
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

        if (!this.props.currentTask.sentenceStart) {
            return true;
        }

        return this.props.currentTask.sentenceStart.trim() !== trimmedItemName;
    },

    _setCurrentTaskAsSkippedAndReRender: function () {
        var skippedTaskIds = CS.Services.Browser.getFromLocalStorage(this._getLocalStorageKeyForSkippedTaskIds()) || [];
        skippedTaskIds.push(this.props.currentTask.id);

        CS.Services.Browser.saveInLocalStorage(this._getLocalStorageKeyForSkippedTaskIds(), skippedTaskIds);

        this._resetForm();
        this.props.controller.reRender();
    },

    _resetForm: function () {
        this.$textarea.val(null);
    },

    _handleTextareaKeyUp: function (e) {
        if (this.props.currentTask.sentenceStart && !_.startsWith(this.$textarea.val(), this.props.currentTask.sentenceStart)) {
            this.$textarea.val(this.props.currentTask.sentenceStart);
        }

        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, $.proxy(this._handleFormSubmit, this));
    }
});

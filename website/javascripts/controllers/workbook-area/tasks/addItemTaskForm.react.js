CS.Controllers.WorkbookAreaAddItemTaskForm = React.createClass({
    render: function () {
        var textareaId = "task-" + this.props.task.id;
        this.currentWording = CS.Models.WorkbookAreaTaskCommon.getNextWording(this.props.task);

        return (
            <form role="form" ref="form" className="item-composer task" onSubmit={this._handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor={textareaId}>{this.currentWording.prompt}</label>
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
        if (this.currentWording.sentenceStart) {
            this.$textarea.val(this.currentWording.sentenceStart);
        }
    },

    getLocalStorageKeyForSkippedTaskPrompts: function () {
        return CS.Models.WorkbookAreaTaskCommon.getLocalStorageKeyForSkippedTaskPrompts(this.props.workbookArea.id);
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

        if (!this.currentWording.sentenceStart) {
            return true;
        }

        return this.currentWording.sentenceStart.trim() !== trimmedItemName;
    },

    _setCurrentTaskAsSkippedAndReRender: function () {
        var skippedTaskPrompts = CS.Services.Browser.getFromLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts()) || [];
        skippedTaskPrompts.push(this.currentWording.prompt);

        CS.Services.Browser.saveInLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts(), skippedTaskPrompts);

        this._resetForm();
        this.props.controller.reRender();
    },

    _resetForm: function () {
        this.$textarea.val(null);
    },

    _handleTextareaKeyUp: function (e) {
        if (this.currentWording.sentenceStart && !_.startsWith(this.$textarea.val(), this.currentWording.sentenceStart)) {
            this.$textarea.val(this.currentWording.sentenceStart);
        }

        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, $.proxy(this._handleFormSubmit, this));
    }
});

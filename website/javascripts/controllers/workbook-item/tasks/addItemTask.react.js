CS.Controllers.WorkbookItemAddItemTask = React.createClass({
    render: function () {
        var textareaId = "add-note-task";
        this.currentWording = CS.Models.WorkbookItemTaskCommon.getNextWording(this.props.task, this.props.workbookItemIndex);
        this.currentWordingPrompt = CS.Services.String.template(this.currentWording.prompt, "itemName", this.props.workbookItemName);

        var wrapperClasses = classNames({
            "workbook-task": true,
            "hidd3n": this.props.hidden
        });

        return (
            <div className={wrapperClasses} ref="wrapper">
                <p>Du jobbar med: {this.props.task.workingOnText}</p>
                <div className="progress">
                    <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <form role="form" className="item-composer task" onSubmit={this._handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor={textareaId} dangerouslySetInnerHTML={{__html: this.currentWordingPrompt}} />
                        <textarea className="form-control" id={textareaId} onKeyUp={this._handleTextareaKeyUp} />
                    </div>
                    <button className="btn btn-primary">Lägg till</button>
                    <a onClick={this._setCurrentTaskAsSkippedAndReRender}>Prova en annan fråga</a>
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
        this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
        this.$progressBar = this.$wrapper.find(".progress-bar");
        this.$form = this.$wrapper.children("form");
        this.$textarea = this.$form.find("textarea");
    },

    _initProgressBar: function() {
        var itemCount = CS.account.data[this.props.workbookArea.className][this.props.workbookItemIndex].notes.length;
        CS.Controllers.WorkbookCommon.setProgressBarWidth(this.$progressBar, itemCount, this.props.task.stepCount);
    },

    _initTextareaValue: function () {
        if (this.currentWording.sentenceStart) {
            this.$textarea.val(this.currentWording.sentenceStart);
        }
    },

    getLocalStorageKeyForSkippedTaskPrompts: function () {
        return CS.Models.WorkbookItemTaskCommon.getLocalStorageKeyForSkippedTaskPrompts(this.props.workbookArea.id, this.props.workbookItemIndex);
    },

    _handleFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var itemNoteToAdd = this.$textarea.val().trim();

        if (this._isValid(itemNoteToAdd) && !CS.Controllers.WorkbookItemCommon.doesItemAlreadyExist(itemNoteToAdd, this.props.workbookArea.className, this.props.workbookItemIndex)) {
            this._fetchLatestAccountDataAndUpdateIt(itemNoteToAdd);
        }

        ga("send", "event", "form", "submit", "[" + CS.account.email + "] Workbook Item (" + this.props.workbookItemName + ") > Add note task (" + this.currentWordingPrompt + ") > Add note: " + itemNoteToAdd);
    },

    _isValid: function(trimmedItemNote) {
        if (!trimmedItemNote) {
            return false;
        }

        if (!this.currentWording.sentenceStart) {
            return true;
        }

        return this.currentWording.sentenceStart.trim() !== trimmedItemNote;
    },

    _setCurrentTaskAsSkippedAndReRender: function () {
        var skippedTaskPrompts = CS.Services.Browser.getFromLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts()) || [];
        skippedTaskPrompts.push(this.currentWording.prompt);

        CS.Services.Browser.saveInLocalStorage(this.getLocalStorageKeyForSkippedTaskPrompts(), skippedTaskPrompts);

        this.$form[0].reset();
        this.props.controller.reRender();

        ga("send", "event", "link", "click", "Workbook Item > Add item task > Try another");
    },

    _handleTextareaKeyUp: function (e) {
        if (this.currentWording.sentenceStart && !_.startsWith(this.$textarea.val(), this.currentWording.sentenceStart)) {
            this.$textarea.val(this.currentWording.sentenceStart);
        }

        CS.Controllers.WorkbookItemCommon.handleTextareaKeyUp(e);
    },

    _fetchLatestAccountDataAndUpdateIt: function(itemNoteToAdd) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var updatedWorkbookItemNotesData = CS.account.data[this.props.workbookArea.className][this.props.workbookItemIndex].notes || [];
                updatedWorkbookItemNotesData.push(itemNoteToAdd);

                CS.account.data[this.props.workbookArea.className][this.props.workbookItemIndex].notes = updatedWorkbookItemNotesData;

                var describedWorkbookItemIds = CS.account.data.describedWorkbookItemIds || {};
                var describedWorkbookItemIdsForThisArea = describedWorkbookItemIds[this.props.workbookArea.className] || [];
                if (!_.contains(describedWorkbookItemIdsForThisArea, this.props.workbookItemIndex)) {
                    describedWorkbookItemIdsForThisArea.push(this.props.workbookItemIndex);
                }
                describedWorkbookItemIds[this.props.workbookArea.className] = describedWorkbookItemIdsForThisArea;
                CS.account.data.describedWorkbookItemIds = describedWorkbookItemIds;

                CS.saveAccountData();

                this._setCurrentTaskAsSkippedAndReRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

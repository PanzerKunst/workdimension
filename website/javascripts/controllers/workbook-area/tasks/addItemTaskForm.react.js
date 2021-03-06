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
                <button className="btn btn-primary">Lägg till</button>
                <a onClick={this._setCurrentTaskAsSkippedAndReRender}>Prova en annan fråga</a>
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
            this._fetchLatestAccountDataAndUpdateIt(itemNameToAdd);
        }

        ga("send", "event", "form", "submit", "[" + CS.account.email + "] Workbook Area (" + this.props.workbookArea.className + ") > Add item task (" + this.currentWording.prompt + ") > Add item: " + itemNameToAdd);
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

        this.$form[0].reset();
        this.props.controller.reRender();

        ga("send", "event", "link", "click", "Workbook Area > Add item task > Try another");
    },

    _handleTextareaKeyUp: function (e) {
        if (this.currentWording.sentenceStart && !_.startsWith(this.$textarea.val(), this.currentWording.sentenceStart)) {
            this.$textarea.val(this.currentWording.sentenceStart);
        }

        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleFormSubmit);
    },

    _fetchLatestAccountDataAndUpdateIt: function(itemNameToAdd) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var updatedBlueprintAreaData = !_.isEmpty(CS.account.data[this.props.workbookArea.className]) ? _.clone(CS.account.data[this.props.workbookArea.className], true) : [];
                updatedBlueprintAreaData.push({
                    name: itemNameToAdd,
                    notes: []
                });

                CS.account.data[this.props.workbookArea.className] = updatedBlueprintAreaData;
                CS.saveAccountData();

                this.props.controller.isPepTalkClosed = false;

                this._setCurrentTaskAsSkippedAndReRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

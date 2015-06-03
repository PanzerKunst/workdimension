CS.Controllers.WorkbookItemCustomTask = React.createClass({
    render: function () {
        var tipReact = null;
        if (this.props.task.tip) {
            var tipReadBtnReact = null;

            if (!this.props.task.question) {
                tipReadBtnReact = (
                    <div className="centered-contents">
                        <button className="btn btn-primary" onClick={this._setCustomTaskAsCompletedAndReRender}>Got it</button>
                    </div>
                    );
            }

            tipReact = (
                <div id="custom-task-tip">
                    <i className="fa fa-lightbulb-o"></i><p>{this.props.task.tip}</p>
                    {tipReadBtnReact}
                </div>
                );
        }

        var questionReact = null;
        if (this.props.task.question) {
            questionReact = (
                <form role="form" ref="form" className="item-composer task custom" onSubmit={this._handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="custom-task-field">{this.props.task.question}</label>
                        <textarea className="form-control" id="custom-task-field" onKeyUp={CS.Controllers.WorkbookItemCommon.handleTextareaKeyUp} />
                    </div>
                    <button className="btn btn-primary">Lägg till</button>
                </form>
                );
        }

        return (
            <div className="workbook-task">
                {tipReact}
                {questionReact}
            </div>
            );
    },

    componentDidMount: function () {
        this._initElements();
    },

    _initElements: function () {
        this.$form = $(React.findDOMNode(this.refs.form));
        this.$textarea = this.$form.find("#custom-task-field");
    },

    _handleFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var itemNoteToAdd = this.$textarea.val().trim();

        if (this._isValid(itemNoteToAdd) && !CS.Controllers.WorkbookItemCommon.doesItemAlreadyExist(itemNoteToAdd, this.props.workbookArea.className, this.props.workbookItemIndex)) {
            this._fetchLatestAccountDataAndUpdateIt(itemNoteToAdd);
        }
    },

    _fetchLatestAccountDataAndUpdateIt: function (itemNoteToAdd) {
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

                this._setCustomTaskAsCompletedAndReRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    },

    _isValid: function(trimmedItemName) {
        return trimmedItemName;
    },

    _setCustomTaskAsCompletedAndReRender: function () {
        var type = "PUT";
        var url = "/api/custom-tasks";

        $.ajax({
            url: url,
            type: type,
            contentType: "application/json",
            data: JSON.stringify(this.props.task),
            success: function (data) {
                this._resetForm();

                var lastIndex = this.props.controller.customTasks.length - 1;
                this.props.controller.customTasks[lastIndex] = data;
                this.props.controller.isCustomTaskComplete = true;

                this.props.controller.reRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    },

    _resetForm: function() {
        if (this.$form.length > 0) {
            this.$form[0].reset();
        }
    }
});

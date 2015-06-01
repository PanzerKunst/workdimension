CS.Controllers.WorkbookAreaCustomTask = React.createClass({
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
                        <textarea className="form-control" id="custom-task-field" onKeyUp={this._handleTextareaKeyUp} />
                    </div>
                    <button className="btn btn-primary">Add item</button>
                </form>
                );
        }

        return (
            <div className="workbook-task">
                <button className="styleless fa fa-question-circle" onClick={CS.Controllers.WorkbookAreaCommon.showAreaDescription}></button>
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

        var itemNameToAdd = this.$textarea.val().trim();

        if (this._isValid(itemNameToAdd) && !CS.Controllers.WorkbookAreaCommon.doesItemAlreadyExist(itemNameToAdd, this.props.workbookArea.className)) {
            this._fetchLatestAccountDataAndUpdateIt(itemNameToAdd);
        }
    },

    _handleTextareaKeyUp: function (e) {
        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleFormSubmit);
    },

    _fetchLatestAccountDataAndUpdateIt: function (itemNameToAdd) {
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

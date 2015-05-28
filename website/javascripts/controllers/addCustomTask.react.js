CS.Controllers.AddCustomTask = React.createClass({
    render: function () {
        return (
            <section className="add-custom-task-panel" ref="wrapper">
                <a onClick={this._handleAddCustomTaskClick}>Add custom task</a>

                <form onSubmit={this._handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="tip">Tip</label>
                        <textarea className="form-control" id="tip" maxLength="512" onKeyUp={this._handleTextareaKeyUp}></textarea>

                        <p className="field-error" data-check="max-length">512 characters maximum</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="question">Question</label>
                        <textarea className="form-control" id="question" maxLength="512" onKeyUp={this._handleTextareaKeyUp}></textarea>

                        <p className="field-error" data-check="max-length">512 characters maximum</p>
                    </div>

                    <div className="centered-contents">
                        <button className="btn btn-warning">Add task</button>
                    </div>
                </form>
            </section>
            );
    },

    componentDidMount: function () {
        this._initElements();
        this._initValidation();
    },

    _initElements: function () {
        this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
        this.$form = this.$wrapper.children("form");
        this.$tipField = this.$form.find("#tip");
        this.$questionField = this.$form.find("#question");
    },

    _initValidation: function() {
        this.validator = CS.Services.Validator([
            "tip",
            "question"
        ]);
    },

    _handleAddCustomTaskClick: function () {
        this.$form.toggle();
    },

    _handleTextareaKeyUp: function (e) {
        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleFormSubmit);
    },

    _handleFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        if (this.validator.isValid()) {
            var tip = this.$tipField.val().trim();
            var question = this.$questionField.val().trim();

            var task = {
                accountId: CS.account.id,
                tip: tip || null,
                question: question || null,
                workbookAreaId: this.props.workbookAreaId,
                workbookItemIndex: this.props.workbookItemIndex
            };

            if (task.tip || task.question) {
                this._addCustomTask(task);
            }
        }
    },

    _addCustomTask: function (task) {
        var type = "POST";
        var url = "/api/custom-tasks";

        $.ajax({
            url: url,
            type: type,
            contentType: "application/json",
            data: JSON.stringify(task),
            success: function (id) {
                this.$form[0].reset();

                task.id = id;
                task.templateClassName = _.isNumber(this.props.workbookItemIndex) ? CS.Controllers.WorkbookAreaCommon.customItemTaskTemplateClassName : CS.Controllers.WorkbookAreaCommon.customAreaTaskTemplateClassName;

                this.props.controller.customTasks.push(task);
                this.props.controller.isCustomTaskComplete = false;
                this.props.controller.reRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

CS.Controllers.WorkbookItem = P(function (c) {
    c.$el = $(document.getElementById("content"));

    c.reactClass = React.createClass({
        getInitialState: function () {
            return {
                controller: null,
                workbookArea: null,
                workbookItem: null,
                workbookItemIndex: null,
                customTask: null,
                isAdmin: false
            };
        },

        render: function () {
            var taskReact = null;
            var addCustomTaskPanelReact = null;

            if (this.state.workbookArea) {
                var activeTask = this.state.customTask ||
                    _.find(CS.WorkbookItemTasks, function (task) {
                        return task.workbookAreaId === this.state.workbookArea.id && task.isActive(this.state.workbookItemIndex);
                    }.bind(this));

                if (activeTask) {
                    taskReact = React.createElement(CS.Controllers[activeTask.templateClassName], {task: activeTask, workbookArea: this.state.workbookArea, workbookItemName: this.state.workbookItem.name, workbookItemIndex: this.state.workbookItemIndex, controller: this.state.controller});
                }
            }

            if (this.state.isAdmin && !this.state.customTask) {
                addCustomTaskPanelReact = <CS.Controllers.AddCustomTask workbookAreaId={this.state.workbookArea.id} workbookItemIndex={this.state.workbookItemIndex} controller={this.state.controller} />;
            }

            var listItems = null;
            if (this.state.workbookItem && !_.isEmpty(this.state.workbookItem.notes)) {
                listItems = this.state.workbookItem.notes.map(function (note, index) {
                    var reactItemId = "workbook-item-note" + note;

                    return <CS.Controllers.WorkbookItemNote key={reactItemId} workbookAreaClassName={this.state.workbookArea.className} workbookItem={this.state.workbookItem} workbookItemIndex={this.state.workbookItemIndex} workbookItemNote={note} workbookItemNoteIndex={index} />;
                }.bind(this));
            }

            return (
                <div ref="wrapper">
                    {taskReact}
                    {addCustomTaskPanelReact}

                    <ul className="styleless item-notes-list">
                        {listItems}
                    </ul>

                    <form role="form" className="item-composer note" onSubmit={this._handleComposerFormSubmit}>
                        <textarea className="form-control" onKeyUp={this._handleTextareaKeyUp} />
                        <button className="btn btn-primary">Add</button>
                        <button type="button" className="styleless fa fa-times" onClick={this._hideForm}></button>
                    </form>

                    <a className="add-item-link" onClick={this._showComposer}>+ Add note</a>
                </div>
                );
        },

        componentDidMount: function () {
            this._initElements();
        },

        _initElements: function () {
            this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
            this.$list = this.$wrapper.children("ul");
            this.$form = this.$wrapper.children("form");
            this.$addNoteLink = this.$form.siblings(".add-item-link");
            this.$textarea = this.$form.children("textarea");
        },

        _showComposer: function () {
            this.$form.show();
            this.$textarea.focus();

            this.$addNoteLink.hide();
        },

        _handleComposerFormSubmit: function (e) {
            if (e) {
                e.preventDefault();
            }

            var itemNoteToAdd = this.$textarea.val().trim();
            if (itemNoteToAdd && !CS.Controllers.WorkbookItemCommon.doesItemAlreadyExist(itemNoteToAdd, this.state.workbookArea.className, this.state.workbookItemIndex)) {
                this._fetchLatestAccountDataAndUpdateIt(itemNoteToAdd);
            }

            CS.Controllers.WorkbookItemCommon.resetAndHideForm(this.$textarea, this._hideForm);
        },

        _handleTextareaKeyUp: function (e) {
            CS.Controllers.WorkbookItemCommon.handleTextareaKeyUp(e, this._hideForm);
        },

        _hideForm: function () {
            this.$form.hide();
            this.$addNoteLink.show();
        },

        _fetchLatestAccountDataAndUpdateIt: function (itemNoteToAdd) {
            var type = "GET";
            var url = "/api/account-data";

            $.ajax({
                url: url,
                type: type,
                success: function (data) {
                    CS.account.data = data || {};

                    var updatedWorkbookItemNotesData = CS.account.data[this.state.workbookArea.className][this.state.workbookItemIndex].notes || [];
                    updatedWorkbookItemNotesData.push(itemNoteToAdd);

                    CS.account.data[this.state.workbookArea.className][this.state.workbookItemIndex].notes = updatedWorkbookItemNotesData;

                    var describedWorkbookItemIds = CS.account.data.describedWorkbookItemIds || {};
                    var describedWorkbookItemIdsForThisArea = describedWorkbookItemIds[this.state.workbookArea.className] || [];
                    if (!_.contains(describedWorkbookItemIdsForThisArea, this.state.workbookItemIndex)) {
                        describedWorkbookItemIdsForThisArea.push(this.state.workbookItemIndex);
                    }
                    describedWorkbookItemIds[this.state.workbookArea.className] = describedWorkbookItemIdsForThisArea;
                    CS.account.data.describedWorkbookItemIds = describedWorkbookItemIds;

                    this.state.controller.saveAccountData();
                }.bind(this),
                error: function () {
                    alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
                }
            });
        }
    });

    c.init = function (workbookArea, workbookItem, customTasks, isAdmin) {
        this.workbookArea = workbookArea;
        this.workbookItem = workbookItem;

        this.customTasks = customTasks;
        if (!_.isEmpty(this.customTasks)) {
            this.customTasks = _.map(this.customTasks, function(task) {
                task.templateClassName = CS.Controllers.WorkbookAreaCommon.customItemTaskTemplateClassName;
                return task;
            });
        }

        this.isAdmin = isAdmin;

        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$el[0]
        );

        this.reRender();
    };

    c.reRender = function () {
        var firstCustomTaskNotCompleted = _.find(this.customTasks, function(task) {
            return task.completionTimestamp === undefined;
        });

        this.reactInstance.replaceState({
            controller: this,
            workbookArea: this.workbookArea,
            workbookItem: _.find(CS.account.data[this.workbookArea.className], "name", this.workbookItem.name),
            workbookItemIndex: _.findIndex(CS.account.data[this.workbookArea.className], "name", this.workbookItem.name),
            customTask: firstCustomTaskNotCompleted,
            isAdmin: this.isAdmin
        });
    };

    c.saveAccountData = function () {
        this.reRender();
        CS.saveAccountData();
    };
});

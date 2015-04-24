CS.Controllers.WorkbookArea = P(function (c) {
    c.$el = $(document.getElementById("content"));

    c.reactClass = React.createClass({
        getInitialState: function () {
            return {
                controller: null,
                workbookArea: null,
                workbookItems: []
            };
        },

        render: function () {
            var taskReact = null;

            if (this.state.workbookArea) {
                var activeTask = _.find(CS.WorkbookAreaTasks, function(task) {  // Level 3
                    return task.workbookAreaId === this.state.workbookArea.id && task.level === 3 && task.isActive();
                }.bind(this)) ||
                    _.find(CS.WorkbookAreaTasks, function(task) {   // Level 2
                        return task.workbookAreaId === this.state.workbookArea.id && task.level === 2 && task.isActive();
                    }.bind(this)) ||
                    _.find(CS.WorkbookAreaTasks, function(task) {   // Level 1
                        return task.workbookAreaId === this.state.workbookArea.id && task.level === 1 && task.isActive();
                    }.bind(this));

                if (activeTask) {
                    var nextTask = _.find(CS.WorkbookAreaTasks, function(task) {
                        return task.previousTaskId === activeTask.id;
                    });

                    var comingUpNextText = nextTask ? nextTask.comingUpText : null;

                    taskReact = React.createElement(CS.Controllers[activeTask.templateClassName], {task: activeTask, workbookArea: this.state.workbookArea, comingUpNextText: comingUpNextText, controller: this.state.controller});
                } else {
                    var doneTask = _.find(CS.WorkbookAreaTasks, function(task) {  // Level 3
                        return task.workbookAreaId === this.state.workbookArea.id && task.level === 3 && task.isDone();
                    }.bind(this));

                    if (doneTask) {
                        taskReact = (
                            <div className="workbook-task complete">
                                <h2><i className="fa fa-star"></i>Great work!<i className="fa fa-star"></i></h2>
                                <p>You have completed all tasks for {this.state.workbookArea.className}.<br />
                                We invite you to work on other areas.</p>
                            </div>
                            );
                    }
                }
            }

            return (
                <div ref="wrapper" id="content-wrapper">
                    {taskReact}

                    <ul className="styleless item-names-list">
                        {this.state.workbookItems.map(function (item, index) {
                            var reactItemId = "blueprint-item-" + item.name;

                            return <CS.Controllers.WorkbookAreaWorkbookItem key={reactItemId} workbookAreaClassName={this.state.workbookArea.className} workbookItem={item} workbookItemIndex={index} controller={this} />;
                        }.bind(this))}
                    </ul>

                    <form role="form" className="item-composer" onSubmit={this._handleComposerFormSubmit}>
                        <textarea className="form-control" onKeyUp={this._handleTextareaKeyUp} />
                        <button className="btn btn-primary">Add</button>
                        <button type="button" className="styleless fa fa-times" onClick={this._hideForm}></button>
                    </form>

                    <a className="add-item-link" onClick={this._showComposer}>+ Add item</a>
                </div>
                );
        },

        componentDidMount: function () {
            this._initElements();
        },

        componentDidUpdate: function() {
            this._initSortable();
        },

        _initElements: function () {
            this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
            this.$list = this.$wrapper.children("ul");
            this.$form = this.$wrapper.children("form");
            this.$addItemLink = this.$form.siblings(".add-item-link");
            this.$textarea = this.$form.children("textarea");
        },

        _initSortable: function () {
            if (!this.sortable) {
                this.sortable = new Sortable(this.$list[0],
                    {
                        animation: 150,
                        onUpdate: function () {
                            CS.Controllers.WorkbookAreaCommon.handleWorkbookItemsReordered(this.$list, this.state.workbookArea.className);
                        }.bind(this),
                        handle: ".fa-bars"
                    }
                );
            }
        },

        _showComposer: function () {
            this.$form.show();
            this.$textarea.focus();

            this.$addItemLink.hide();
        },

        _handleComposerFormSubmit: function (e) {
            if (e) {
                e.preventDefault();
            }

            var itemNameToAdd = this.$textarea.val().trim();

            if (itemNameToAdd && !CS.Controllers.WorkbookAreaCommon.doesItemAlreadyExist(itemNameToAdd, this.state.workbookArea.className)) {
                var updatedBlueprintAreaData = CS.account.data && !_.isEmpty(CS.account.data[this.state.workbookArea.className]) ? _.clone(CS.account.data[this.state.workbookArea.className], true) : [];
                updatedBlueprintAreaData.push({
                    name: itemNameToAdd,
                    notes: []
                });

                CS.account.data = CS.account.data || {};
                CS.account.data[this.state.workbookArea.className] = updatedBlueprintAreaData;

                this.state.controller.reRender();
                CS.saveAccountData();
            }

            CS.Controllers.WorkbookAreaCommon.resetAndHideForm(this.$textarea, $.proxy(this._hideForm, this));
        },

        _handleTextareaKeyUp: function (e) {
            CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, $.proxy(this._handleComposerFormSubmit, this), $.proxy(this._hideForm, this));
        },

        _hideForm: function () {
            this.$form.hide();
            this.$addItemLink.show();
        }
    });

    c.init = function (workbookArea) {
        this.workbookArea = workbookArea;

        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$el[0]
        );

        this.reRender();
    };

    c.reRender = function () {
        this.reactInstance.replaceState({
            controller: this,
            workbookArea: this.workbookArea,
            workbookItems: CS.account.data[this.workbookArea.className] ? CS.account.data[this.workbookArea.className] : []
        });
    };

    c.saveAccountData = function () {
        this.reRender();
        CS.saveAccountData();
    };
});

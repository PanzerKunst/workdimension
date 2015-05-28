CS.Controllers.WorkbookArea = P(function (c) {
    c.$el = $(document.getElementById("content"));

    c.reactClass = React.createClass({
        getInitialState: function () {
            return {
                controller: null,
                workbookArea: null,
                workbookItems: [],
                customTask: null,
                isAdmin: false,
                isCustomTaskComplete: false,
                isPepTalkClosed: false
            };
        },

        render: function () {
            var workbookAreaDescriptionReact = null;
            var pepTalkReact = null;
            var taskReact = null;
            var addCustomTaskPanelReact = null;

            if (this.state.workbookArea) {
                workbookAreaDescriptionReact = <CS.Controllers.WorkbookAreaDescription workbookAreaClassName={this.state.workbookArea.className} controller={this.state.controller} />;

                if (!this.state.isPepTalkClosed) {
                    var taskCompletePepTalk = null;

                    if (this.state.isCustomTaskComplete) {
                        taskCompletePepTalk = { templateClassName: "WorkbookAreaCustomTaskComplete" };
                    } else {
                        taskCompletePepTalk = _.find(CS.WorkbookAreaTaskCompletePepTalks, function(pepTalk) {
                            return pepTalk.getWorkbookArea().id === this.state.workbookArea.id && pepTalk.isActive();
                        }.bind(this));
                    }
                }

                if (taskCompletePepTalk) {
                    pepTalkReact = React.createElement(CS.Controllers[taskCompletePepTalk.templateClassName], {workbookArea: this.state.workbookArea, controller: this.state.controller});
                }

                if (!this.state.isCustomTaskComplete) {
                    var activeTask = this.state.customTask ||
                        _.find(CS.WorkbookAreaTasks, function (task) {  // Level 3
                            return task.getWorkbookArea().id === this.state.workbookArea.id && task.level === 3 && task.isActive();
                        }.bind(this)) ||
                        _.find(CS.WorkbookAreaTasks, function (task) {  // Level 2
                            return task.getWorkbookArea().id === this.state.workbookArea.id && task.level === 2 && task.isActive();
                        }.bind(this)) ||
                        _.find(CS.WorkbookAreaTasks, function (task) {  // Level 1
                            return task.getWorkbookArea().id === this.state.workbookArea.id && task.level === 1 && task.isActive();
                        }.bind(this));

                    if (activeTask) {
                        var nextTask = _.find(CS.WorkbookAreaTasks, function (task) {
                            return task.previousTaskId === activeTask.id;
                        });

                        var comingUpNextText = nextTask ? nextTask.comingUpText : null;

                        taskReact = React.createElement(CS.Controllers[activeTask.templateClassName], {task: activeTask, workbookArea: this.state.workbookArea, comingUpNextText: comingUpNextText, hidden: taskCompletePepTalk && !this.state.isPepTalkClosed, controller: this.state.controller});
                    }
                }

                if (this.state.isAdmin && !this.state.customTask) {
                    addCustomTaskPanelReact = <CS.Controllers.AddCustomTask workbookAreaId={this.state.workbookArea.id} controller={this.state.controller} />;
                }
            }

            return (
                <div ref="wrapper" id="content-wrapper">
                    {workbookAreaDescriptionReact}
                    {pepTalkReact}
                    {taskReact}
                    {addCustomTaskPanelReact}

                    <ul className="styleless item-names-list">
                        {this.state.workbookItems.map(function (item, index) {
                            var reactItemId = "blueprint-item-" + index + "-" + item.name;

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

        componentDidUpdate: function () {
            this._initSortable();
            this._initDescriptionAndTaskPanels();
        },

        _initElements: function () {
            this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
            this.$list = this.$wrapper.children("ul");
            this.$form = this.$wrapper.children("form");
            this.$addItemLink = this.$form.siblings(".add-item-link");
            this.$textarea = this.$form.children("textarea");
        },

        _initDescriptionAndTaskPanels: function () {
            this.$areaDescriptionWrapper = this.$wrapper.children("#area-description");
            this.$taskWrapper = this.$wrapper.children(".workbook-task");

            if (_.isEmpty(this.state.workbookItems) && !_.includes(CS.account.data.idOfClosedAreaDescriptionPanels, this.state.workbookArea.id)) {
                this.$addItemLink.hide();
                this.$taskWrapper.hide();
                this.$areaDescriptionWrapper.show();
            } else {
                this.$areaDescriptionWrapper.hide();

                if (!this.$taskWrapper.hasClass("hidd3n")) {
                    this.$taskWrapper.show();
                    this.$addItemLink.show();
                }
            }
        },

        _initSortable: function () {
            if (!this.sortable) {
                this.sortable = new Sortable(this.$list[0],
                    {
                        animation: 150,
                        onUpdate: function () {
                            CS.Controllers.WorkbookAreaCommon.handleWorkbookItemsReordered(this.$list.children(), this.state.workbookArea.className, this.state.controller.reRender.bind(this.state.controller));
                        }.bind(this),
                        handle: ".fa-bars"
                    }
                );
            }
        },

        _showComposer: function () {
            this.$form.show();
            this.$textarea.focus();

            CS.Controllers.WorkbookAreaCommon.adaptTextareaHeight(this.$textarea);

            this.$addItemLink.hide();
        },

        _handleComposerFormSubmit: function (e) {
            if (e) {
                e.preventDefault();
            }

            var itemNameToAdd = this.$textarea.val().trim();
            if (itemNameToAdd && !CS.Controllers.WorkbookAreaCommon.doesItemAlreadyExist(itemNameToAdd, this.state.workbookArea.className)) {
                this._fetchLatestAccountDataAndUpdateIt(itemNameToAdd);
            }

            CS.Controllers.WorkbookAreaCommon.resetAndHideForm(this.$textarea, this._hideForm);
        },

        _handleTextareaKeyUp: function (e) {
            CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleComposerFormSubmit, this._hideForm);
        },

        _hideForm: function () {
            this.$form.hide();
            this.$addItemLink.show();
        },

        _fetchLatestAccountDataAndUpdateIt: function (itemNameToAdd) {
            var type = "GET";
            var url = "/api/account-data";

            $.ajax({
                url: url,
                type: type,
                success: function (data) {
                    CS.account.data = data || {};

                    var updatedBlueprintAreaData = CS.account.data && !_.isEmpty(CS.account.data[this.state.workbookArea.className]) ? _.clone(CS.account.data[this.state.workbookArea.className], true) : [];
                    updatedBlueprintAreaData.push({
                        name: itemNameToAdd,
                        notes: []
                    });

                    CS.account.data[this.state.workbookArea.className] = updatedBlueprintAreaData;
                    this.state.controller.saveAccountData();
                }.bind(this),
                error: function () {
                    alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
                }
            });
        },

        showTask: function () {
            CS.Controllers.WorkbookCommon.saveAreaDescriptionAsClosed(this.state.workbookArea.id);

            CS.Services.Animator.fadeOut(this.$areaDescriptionWrapper, {
                animationDuration: CS.animationDuration.short,
                onComplete: function () {
                    CS.Services.Animator.fadeIn(this.$taskWrapper);
                    CS.Services.Animator.fadeIn(this.$addItemLink);
                }.bind(this)
            });
        }
    });

    c.init = function (workbookArea, customTasks, isAdmin) {
        this.workbookArea = workbookArea;

        this.customTasks = customTasks;
        if (!_.isEmpty(this.customTasks)) {
            this.customTasks = _.map(this.customTasks, function(task) {
                task.templateClassName = CS.Controllers.WorkbookAreaCommon.customAreaTaskTemplateClassName;
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
            workbookItems: CS.account.data[this.workbookArea.className] ? CS.account.data[this.workbookArea.className] : [],
            customTask: firstCustomTaskNotCompleted,
            isAdmin: this.isAdmin,
            isCustomTaskComplete: this.isCustomTaskComplete || false,
            isPepTalkClosed: this.isPepTalkClosed || false
        });
    };

    c.saveAccountData = function () {
        this.reRender();
        CS.saveAccountData();
    };

    c.showTask = function() {
        this.reactInstance.showTask();
    };

    c.handleCustomTaskCompleteConfirmed = function() {
        this.isCustomTaskComplete = false;
        this.reRender();
    };

    c.handleTaskCompletePepTalkClosed = function() {
        this.isPepTalkClosed = true;
        this.reRender();
    };
});

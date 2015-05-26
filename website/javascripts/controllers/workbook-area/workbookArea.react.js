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
                isCustomTaskComplete: false
            };
        },

        render: function () {
            var workbookAreaDescriptionReact = null;
            var taskReact = null;
            var addCustomTaskPanelReact = null;

            if (this.state.workbookArea) {
                var workbookAreaDescription = _.find(CS.Controllers.Texts, function(text) {
                    return text.type === "workbook-area-description" &&
                        text.workbookAreaClassName === this.state.workbookArea.className;
                }.bind(this)).htmlText;

                workbookAreaDescriptionReact = (
                    <div id="area-description">
                        <article className="workbook-area-description-text-wrapper" dangerouslySetInnerHTML={{__html: workbookAreaDescription}} />
                        <div className="centered-contents">
                            <button className="btn btn-primary" onClick={this._showTask}>Got it</button>
                        </div>
                    </div>
                    );

                var activeTask = null;

                if (this.state.isCustomTaskComplete) {
                    taskReact = (
                        <div className="workbook-task complete">
                            <h2><i className="fa fa-star"></i>Great work!<i className="fa fa-star"></i></h2>
                            <p>A career advisor will get back to you shortly.</p>
                            <p>In the meantime, we invite you to continue working on this topic, or maybe switch to another one&#63;</p>
                            <div className="centered-contents">
                                <button className="btn btn-primary" onClick={this._handleCustomTaskCompleteConfirmed}>Continue</button>
                            </div>
                        </div>
                        );
                } else {
                    activeTask = this.state.customTask ||
                        _.find(CS.WorkbookAreaTasks, function (task) {  // Level 3
                            return task.workbookAreaId === this.state.workbookArea.id && task.level === 3 && task.isActive();
                        }.bind(this)) ||
                        _.find(CS.WorkbookAreaTasks, function (task) {   // Level 2
                            return task.workbookAreaId === this.state.workbookArea.id && task.level === 2 && task.isActive();
                        }.bind(this)) ||
                        _.find(CS.WorkbookAreaTasks, function (task) {   // Level 1
                            return task.workbookAreaId === this.state.workbookArea.id && task.level === 1 && task.isActive();
                        }.bind(this));
                }

                if (activeTask) {
                    var nextTask = _.find(CS.WorkbookAreaTasks, function (task) {
                        return task.previousTaskId === activeTask.id;
                    });

                    var comingUpNextText = nextTask ? nextTask.comingUpText : null;

                    taskReact = React.createElement(CS.Controllers[activeTask.templateClassName], {task: activeTask, workbookArea: this.state.workbookArea, comingUpNextText: comingUpNextText, controller: this.state.controller});
                } else if (!this.state.isCustomTaskComplete) {
                    var doneTask = _.find(CS.WorkbookAreaTasks, function (task) {  // Level 3
                        return task.workbookAreaId === this.state.workbookArea.id && task.level === 3 && task.isDone();
                    }.bind(this));

                    if (doneTask) {
                        taskReact = (
                            <div className="workbook-task complete">
                                <h2><i className="fa fa-star"></i>Great work!<i className="fa fa-star"></i></h2>
                                <p>You have completed all tasks for {this.state.workbookArea.className}.</p>
                                <p>We invite you to work on other topics.</p>
                            </div>
                            );
                    }
                }

                if (this.state.isAdmin && !this.state.customTask) {
                    addCustomTaskPanelReact = <CS.Controllers.AddCustomTask workbookAreaId={this.state.workbookArea.id} controller={this.state.controller} />;
                }
            }

            return (
                <div ref="wrapper" id="content-wrapper">
                    {workbookAreaDescriptionReact}
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
                this.$taskWrapper.show();
                this.$addItemLink.show();
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

        _handleCustomTaskCompleteConfirmed: function() {
            this.controller.isCustomTaskComplete = false;
            this.controller.reRender();
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

        _showTask: function () {
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
            isCustomTaskComplete: this.isCustomTaskComplete || false
        });
    };

    c.saveAccountData = function () {
        this.reRender();
        CS.saveAccountData();
    };
});

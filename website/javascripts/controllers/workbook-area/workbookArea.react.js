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
            var workbookAreaDescriptionReact = null;
            var taskReact = null;

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

                var activeTask = _.find(CS.WorkbookAreaTasks, function (task) {  // Level 3
                    return task.workbookAreaId === this.state.workbookArea.id && task.level === 3 && task.isActive();
                }.bind(this)) ||
                    _.find(CS.WorkbookAreaTasks, function (task) {   // Level 2
                        return task.workbookAreaId === this.state.workbookArea.id && task.level === 2 && task.isActive();
                    }.bind(this)) ||
                    _.find(CS.WorkbookAreaTasks, function (task) {   // Level 1
                        return task.workbookAreaId === this.state.workbookArea.id && task.level === 1 && task.isActive();
                    }.bind(this));

                if (activeTask) {
                    var nextTask = _.find(CS.WorkbookAreaTasks, function (task) {
                        return task.previousTaskId === activeTask.id;
                    });

                    var comingUpNextText = nextTask ? nextTask.comingUpText : null;

                    taskReact = React.createElement(CS.Controllers[activeTask.templateClassName], {task: activeTask, workbookArea: this.state.workbookArea, comingUpNextText: comingUpNextText, controller: this.state.controller});
                } else {
                    var doneTask = _.find(CS.WorkbookAreaTasks, function (task) {  // Level 3
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
                    {workbookAreaDescriptionReact}
                    {taskReact}

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

            if (_.isEmpty(this.state.workbookItems)) {
                this.$taskWrapper.hide();
                this.$areaDescriptionWrapper.show();
            } else {
                this.$areaDescriptionWrapper.hide();
                this.$taskWrapper.show();
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
            CS.Services.Animator.fadeOut(this.$areaDescriptionWrapper, {
                animationDuration: 0.2,
                onComplete: function () {
                    CS.Services.Animator.fadeIn(this.$taskWrapper);
                }.bind(this)
            });
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

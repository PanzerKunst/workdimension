CS.Controllers.WorkbookArea = P(function (c) {
    c.$el = $(document.getElementById("content"));

    c.reactClass = React.createClass({
        minItemCountForAddItemTasksComplete: 3,

        getInitialState: function () {
            return {
                controller: null,
                workbookArea: null,
                workbookItems: []
            };
        },

        render: function () {
            var taskReact = null;

            if (this.state.workbookArea && this.state.workbookItems.length < this.minItemCountForAddItemTasksComplete) {
                taskReact = <CS.Controllers.WorkbookAreaAddItemTask controller={this.state.controller} workbookArea={this.state.workbookArea} />;
            }

            return (
                <div ref="wrapper">
                    {taskReact}

                    <ul className="styleless item-names-list">
                        {this.state.workbookItems.map(function (item, index) {
                            var reactItemId = "blueprint-item-" + item.name;

                            return <CS.Controllers.WorkbookAreaWorkbookItem key={reactItemId} workbookAreaClassName={this.state.workbookArea.className} workbookItem={item} workbookItemIndex={index} />;
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
            Sortable.create(this.$list[0], {onUpdate: function() {
                CS.Controllers.WorkbookAreaCommon.handleWorkbookItemsReordered(this.$list, this.state.workbookArea.className);
            }.bind(this)});
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
                updatedBlueprintAreaData.push({name: itemNameToAdd});

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

CS.Controllers.WorkbookArea = P(function (c) {
    c.$el = $(document.getElementById("content"));

    c.reactClass = React.createClass({
        getInitialState: function () {
            return {
                controller: null,
                workbookAreaClassName: null,
                workbookItems: []
            };
        },

        render: function () {
            return (
                <div>
                    <ul className="styleless item-names-list">
                        {this.state.workbookItems.map(function (item, index) {
                            var reactItemId = "blueprint-item-" + item.name;

                            return <CS.Controllers.WorkbookAreaWorkbookItem key={reactItemId} workbookAreaClassName={this.state.workbookAreaClassName} workbookItem={item} workbookItemIndex={index} />;
                        }.bind(this))}
                    </ul>

                    <form role="form" className="item-composer" ref="form" onSubmit={this._handleComposerFormSubmit}>
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

        _initElements: function () {
            this.$form = $(React.findDOMNode(this.refs.form));
            this.$addItemLink = this.$form.siblings(".add-item-link");
            this.$textarea = this.$form.children("textarea");
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

            // TODO: remove
            console.log("_handleComposerFormSubmit");

            var itemNameToAdd = this.$textarea.val().trim();

            if (itemNameToAdd) {
                var updatedBlueprintAreaData = CS.account.data && !_.isEmpty(CS.account.data[this.state.workbookAreaClassName]) ? _.clone(CS.account.data[this.state.workbookAreaClassName], true) : [];
                updatedBlueprintAreaData.push({name: itemNameToAdd});

                CS.account.data = CS.account.data || {};
                CS.account.data[this.state.workbookAreaClassName] = updatedBlueprintAreaData;

                this.state.controller._reRender();
                CS.saveAccountData();
            }

            CS.Controllers.WorkbookAreaCommon.resetAndHideForm(this.$textarea, $.proxy(this._hideForm, this));
        },

        _handleTextareaKeyUp: function(e) {
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

        this._reRender();
    };

    c._reRender = function() {
        this.reactInstance.replaceState({
            controller: this,
            workbookAreaClassName: this.workbookArea.className,
            workbookItems: CS.account.data[this.workbookArea.className] ? CS.account.data[this.workbookArea.className] : []
        });
    };

    c.saveAccountData = function () {
        this._reRender();
        CS.saveAccountData();
    };
});
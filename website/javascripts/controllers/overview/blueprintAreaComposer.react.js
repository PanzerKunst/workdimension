CS.Controllers.OverviewBlueprintAreaComposer = React.createClass({
    render: function () {
        return (
            <div>
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
        this._hideOtherOpenComposers();

        this.$form.show();
        this.$textarea.focus();

        this.$addItemLink.hide();

        CS.overviewController.rePackerise();
    },

    _hideOtherOpenComposers: function() {
        var $composerForms = CS.overviewController.$el.find(".item-composer");
        var $addItemLinks = $composerForms.siblings(".add-item-link");

        $composerForms.hide();
        $addItemLinks.show();
    },

    _handleComposerFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var itemNameToAdd = this.$textarea.val().trim();

        if (itemNameToAdd) {
            var updatedBlueprintAreaData = CS.account.data && !_.isEmpty(CS.account.data[this.props.blueprintAreaClassName]) ? _.clone(CS.account.data[this.props.blueprintAreaClassName], true) : [];
            updatedBlueprintAreaData.push({name: itemNameToAdd});

            CS.account.data = CS.account.data || {};
            CS.account.data[this.props.blueprintAreaClassName] = updatedBlueprintAreaData;

            CS.overviewController.saveAccountData();
        }

        CS.Controllers.WorkbookAreaCommon.resetAndHideForm(this.$textarea, $.proxy(this._hideForm, this));
    },

    _handleTextareaKeyUp: function(e) {
        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, $.proxy(this._handleComposerFormSubmit, this), $.proxy(this._hideForm, this));
    },

    _hideForm: function () {
        this.$form.hide();
        this.$addItemLink.show();

        CS.overviewController.rePackerise();
    }
});

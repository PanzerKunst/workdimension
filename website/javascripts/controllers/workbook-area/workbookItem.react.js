CS.Controllers.WorkbookAreaWorkbookItem = React.createClass({
    render: function () {
        var href = "/workbook-items/" + this.props.workbookAreaClassName + "/" + this.props.workbookItemIndex;

        return (
            <li ref="li">
                <button className="styleless fa fa-bars"></button>
                <p><a href={href}>{this.props.workbookItem.name}</a></p>
                <button className="styleless fa fa-pencil" onClick={this._showEditor}></button>
                <form role="form" className="item-composer" onSubmit={this._handleComposerFormSubmit}>
                    <textarea className="form-control" onKeyUp={this._handleTextareaKeyUp} />
                    <button className="btn btn-primary">Save changes</button>
                    <button type="button" className="styleless fa fa-times" onClick={this._hideForm}></button>
                </form>
            </li>
            );
    },

    componentDidMount: function () {
        this._initElements();

        this.listItemEditModeClass = "editing";
    },

    _initElements: function() {
        this.$listItem = $(React.findDOMNode(this.refs.li));
        this.$list = this.$listItem.parent();

        this.$itemNameParagraph = this.$listItem.children("p");
        this.$editBtn = this.$listItem.children("button");
        this.$form = this.$listItem.children(".item-composer");
        this.$textarea = this.$form.children("textarea");

        this.$contentWrapper = this.$listItem.parents("#content-wrapper");
    },

    _showEditor: function () {
        this._hideOtherOpenComposers();

        this.$textarea.val(this.props.workbookItem.name);

        this.$listItem.addClass(this.listItemEditModeClass);

        CS.Controllers.WorkbookAreaCommon.disableSortable(this.props.controller);

        this.$itemNameParagraph.hide();
        this.$editBtn.hide();
        this.$contentWrapper.addClass("editing");
        this.$form.show();
        CS.Controllers.WorkbookAreaCommon.adaptTextareaHeight(this.$textarea);
        this.$textarea.focus();
    },

    _hideOtherOpenComposers: function() {
        var $listItems = this.$list.children();
        var $composerForms = $listItems.children(".item-composer");
        var $itemNameParagraphs = $listItems.children("p");
        var $editBtns = $listItems.children(".fa-pencil");

        $listItems.removeClass(this.listItemEditModeClass);
        $composerForms.hide();
        $itemNameParagraphs.show();
        $editBtns.show();
    },

    _handleComposerFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var newItemName = this.$textarea.val().trim();
        var updatedBlueprintAreaData = CS.account.data && !_.isEmpty(CS.account.data[this.props.workbookAreaClassName]) ? _.clone(CS.account.data[this.props.workbookAreaClassName], true) : [];

        if (newItemName) {
            updatedBlueprintAreaData[this.props.workbookItemIndex].name = newItemName;
        } else {
            updatedBlueprintAreaData.splice(this.props.workbookItemIndex, 1);

            // We hide it from the UI to give faster feedback
            this.$listItem.hide();
        }

        CS.account.data = CS.account.data || {};
        CS.account.data[this.props.workbookAreaClassName] = updatedBlueprintAreaData;

        CS.Controllers.WorkbookAreaCommon.resetAndHideForm(this.$textarea, $.proxy(this._hideForm, this));
        CS.workbookAreaController.saveAccountData();
    },

    _handleTextareaKeyUp: function(e) {
        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, $.proxy(this._handleComposerFormSubmit, this), $.proxy(this._hideForm, this));
    },

    _hideForm: function() {
        this.$listItem.removeClass(this.listItemEditModeClass);
        this.$form.hide();
        this.$itemNameParagraph.show();
        this.$editBtn.show();
        this.$contentWrapper.removeClass("editing");

        CS.Controllers.WorkbookAreaCommon.enableSortable(this.props.controller);
    }
});

CS.Controllers.OverviewBlueprintItem = React.createClass({
    render: function () {
        return (
            <li className="item-name" ref="li">
                <p>{this._getBlueprintItemName()}</p>
                <button className="styleless fa fa-pencil" onClick={this._showEditor}></button>
                <form role="form" className="item-composer" ref="form" onSubmit={this._handleComposerFormSubmit}>
                    <textarea className="form-control" ref="textarea" onKeyUp={this._handleTextareaKeyUp} />
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

    _getBlueprintAreaClassName: function() {
        return this.props.blueprintAreaWithData.blueprintArea.getClassName();
    },

    _getBlueprintItemIndex: function () {
        return this.props.blueprintItemIndex;
    },

    _getBlueprintItemName: function () {
        return this.props.blueprintAreaWithData.items[this._getBlueprintItemIndex()].name;
    },

    _initElements: function() {
        this.$listItem = $(React.findDOMNode(this.refs.li));
        this.$itemNameParagraph = this.$listItem.children("p");
        this.$editBtn = this.$listItem.children("button");
        this.$form = this.$listItem.children(".item-composer");
        this.$textarea = this.$form.children("textarea");

        this.$blueprintAreaPanel = this.$listItem.parents(".blueprint-area-panel");
        this.$addItemLink = this.$blueprintAreaPanel.find(".add-item-link");
    },

    _showEditor: function () {
        // TODO: remove
        console.log("_showEditor. Blueprint item name:", this._getBlueprintItemName());

        this._hideOtherOpenComposers();

        this.$textarea.val(this._getBlueprintItemName());

        this.$listItem.addClass(this.listItemEditModeClass);

        this.$itemNameParagraph.hide();
        this.$editBtn.hide();
        this.$addItemLink.hide();
        this.$form.show();
        CS.Controllers.OverviewBlueprintAreaCommon.adaptTextareaHeight(this.$textarea);
        this.$textarea.focus();

        CS.overviewController.rePackerise();
    },

    _hideOtherOpenComposers: function() {
        var $listItems = CS.overviewController.$el.find(".item-name");
        var $composerForms = $listItems.children(".item-composer");
        var $itemNameParagraphs = $listItems.children("p");
        var $editBtns = $listItems.children("button");
        var $addItemLinks = CS.overviewController.$el.find(".add-item-link");

        $listItems.removeClass(this.listItemEditModeClass);
        $composerForms.hide();
        $itemNameParagraphs.show();
        $editBtns.show();
        $addItemLinks.show();
    },

    _handleComposerFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        // TODO: remove
        console.log("_handleComposerFormSubmit");

        var newItemName = this.$textarea.val().trim();
        var updatedBlueprintAreaData = CS.account.data && !_.isEmpty(CS.account.data[this._getBlueprintAreaClassName()]) ? _.clone(CS.account.data[this._getBlueprintAreaClassName()], true) : [];

        if (newItemName) {
            updatedBlueprintAreaData[this._getBlueprintItemIndex()] = {name: newItemName};
        } else {
            updatedBlueprintAreaData.splice(this._getBlueprintItemIndex(), 1);

            // We hide it from the UI to give faster feedback
            this.$listItem.hide();
        }

        CS.account.data = CS.account.data || {};
        CS.account.data[this._getBlueprintAreaClassName()] = updatedBlueprintAreaData;

        CS.Controllers.OverviewBlueprintAreaCommon.resetAndHideForm(this.$textarea, $.proxy(this._hideForm, this));
        CS.overviewController.saveAccountData();
    },

    _handleTextareaKeyUp: function(e) {
        CS.Controllers.OverviewBlueprintAreaCommon.handleTextareaKeyUp(e, $.proxy(this._handleComposerFormSubmit, this), $.proxy(this._hideForm, this));
    },

    _hideForm: function() {
        this.$listItem.removeClass(this.listItemEditModeClass);
        this.$form.hide();
        this.$itemNameParagraph.show();
        this.$editBtn.show();
        this.$addItemLink.show();

        CS.overviewController.rePackerise();
    }
});

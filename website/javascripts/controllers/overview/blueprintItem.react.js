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

    // TODO: a lot of code is duplicated from blueprintAreaComposer
    componentDidMount: function () {
        this._initElements();

        this.textareaDefaultHeightPx = 41;
        this.listItemEditModeClass = "editing";
    },

    _getController: function () {
        return this.props.controller;
    },

    _getBlueprintAreaClassName: function() {
        return this.props.blueprintAreaWithData.className;
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
        this.$form = this.$listItem.children("form");
        this.$textarea = this.$form.children("textarea");
    },

    _showEditor: function () {
        // TODO: remove
        console.log("_showEditor. Blueprint item name:", this._getBlueprintItemName());

        this.$textarea.val(this._getBlueprintItemName());

        this.$listItem.addClass(this.listItemEditModeClass);

        this.$itemNameParagraph.hide();
        this.$editBtn.hide();
        this.$form.show();
        this.$textarea.focus();
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
        }

        CS.account.data = CS.account.data || {};
        CS.account.data[this._getBlueprintAreaClassName()] = updatedBlueprintAreaData;

        this._getController().saveAccountData();

        this._resetAndHideForm();
    },

    _handleTextareaKeyUp: function (e) {
        if (e.keyCode === CS.Services.Keyboard.keyCode.enter) {
            this._handleComposerFormSubmit();
        } else {
            this._countTextareaLines();
        }
    },

    _countTextareaLines: function () {
        var lineHeight = parseInt(this.$textarea.css("lineHeight"), 10);
        var padding = parseInt(this.$textarea.css("paddingTop"), 10) + parseInt(this.$textarea.css("paddingBottom"), 10);
        var lineCount = Math.round((this.$textarea.prop("scrollHeight") - padding) / lineHeight);

        // TODO: remove
        console.log("lineCount: " + lineCount);

        var currentTextAreaHeightPx = parseFloat(this.$textarea.css("height"));
        var newTextAreaHeightPx = this.textareaDefaultHeightPx - lineHeight + lineCount * lineHeight;

        if (newTextAreaHeightPx !== currentTextAreaHeightPx) {

            // TODO: remove
            console.log("newTextAreaHeightPx: " + newTextAreaHeightPx);

            this.$textarea.css("height", newTextAreaHeightPx);
        }
    },

    _resetAndHideForm: function() {
        this.$textarea.val(null);
        this.$textarea.css("height", this.textareaDefaultHeightPx);

        this._hideForm();
    },

    _hideForm: function() {
        this.$listItem.removeClass(this.listItemEditModeClass);
        this.$form.hide();
        this.$itemNameParagraph.show();
        this.$editBtn.show();
    }
});

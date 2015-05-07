CS.Controllers.WorkbookAreaWorkbookItem = React.createClass({
    render: function () {
        var href = "/workbook-items/" + this.props.workbookAreaClassName + "/" + this.props.workbookItemIndex;

        return (
            <li ref="li">
                <div className="notes-indicator"></div>
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
        CS.Controllers.WorkbookAreaCommon.initNotesIndicator(this.$notesIndicator, CS.account.data[this.props.workbookAreaClassName][this.props.workbookItemIndex].notes.length);
    },

    _initElements: function() {
        this.$listItem = $(React.findDOMNode(this.refs.li));
        this.$list = this.$listItem.parent();

        this.$notesIndicator = this.$listItem.children(".notes-indicator");
        this.$itemNameParagraph = this.$listItem.children("p");
        this.$editBtn = this.$listItem.children("button");
        this.$form = this.$listItem.children(".item-composer");
        this.$textarea = this.$form.children("textarea");

        this.$contentWrapper = this.$listItem.parents("#content-wrapper");
    },

    _showEditor: function () {
        this._hideOtherOpenComposers();

        this.$textarea.val(this.props.workbookItem.name);

        this.$listItem.addClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);

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

        $listItems.removeClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);
        $composerForms.hide();
        $itemNameParagraphs.show();
        $editBtns.show();
    },

    _handleComposerFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var newItemName = this.$textarea.val().trim();
        this._fetchLatestAccountDataAndUpdateIt(newItemName);
    },

    _handleTextareaKeyUp: function(e) {
        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleComposerFormSubmit.bind(this), this._hideForm.bind(this));
    },

    _hideForm: function() {
        this.$listItem.removeClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);
        this.$form.hide();
        this.$itemNameParagraph.show();
        this.$editBtn.show();
        this.$contentWrapper.removeClass("editing");

        CS.Controllers.WorkbookAreaCommon.enableSortable(this.props.controller);
    },

    _fetchLatestAccountDataAndUpdateIt: function(newItemName) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var updatedBlueprintAreaData = CS.account.data && !_.isEmpty(CS.account.data[this.props.workbookAreaClassName]) ? _.clone(CS.account.data[this.props.workbookAreaClassName], true) : [];

                if (newItemName) {
                    updatedBlueprintAreaData[this.props.workbookItemIndex].name = newItemName;
                } else {
                    updatedBlueprintAreaData.splice(this.props.workbookItemIndex, 1);

                    // We hide it from the UI to give faster feedback
                    this.$listItem.hide();
                }

                CS.Controllers.WorkbookAreaCommon.resetAndHideForm(this.$textarea, this._hideForm.bind(this));

                CS.account.data[this.props.workbookAreaClassName] = updatedBlueprintAreaData;
                CS.workbookAreaController.saveAccountData();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

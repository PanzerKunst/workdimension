CS.Controllers.WorkbookItemNote = React.createClass({
    render: function () {
        var noteText = CS.Services.String.textToHtml(this.props.workbookItemNote);

        return (
            <li ref="li">
                <p dangerouslySetInnerHTML={{__html: noteText}} />
                <button className="styleless fa fa-pencil" onClick={this._showEditor}></button>
                <form role="form" className="item-composer note" onSubmit={this._handleComposerFormSubmit}>
                    <textarea className="form-control" onKeyUp={this._handleTextareaKeyUp} />
                    <button className="btn btn-primary">Save changes</button>
                    <button type="button" className="styleless fa fa-times" onClick={this._hideForm}></button>
                </form>
            </li>
            );
    },

    componentDidMount: function () {
        this._initElements();
    },

    _initElements: function() {
        this.$listItem = $(React.findDOMNode(this.refs.li));
        this.$list = this.$listItem.parent();

        this.$itemNoteParagraph = this.$listItem.children("p");
        this.$editBtn = this.$listItem.children("button");
        this.$form = this.$listItem.children(".item-composer");
        this.$textarea = this.$form.children("textarea");

        this.$addNoteLink = this.$list.siblings(".add-item-link");
    },

    _showEditor: function () {
        this._hideOtherOpenComposers();

        this.$textarea.val(this.props.workbookItemNote);

        this.$listItem.addClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);

        this.$itemNoteParagraph.hide();
        this.$editBtn.hide();
        this.$addNoteLink.hide();
        this.$form.show();
        CS.Controllers.WorkbookItemCommon.adaptTextareaHeight(this.$textarea);
        this.$textarea.focus();
    },

    _hideOtherOpenComposers: function() {
        var $listItems = this.$list.children();
        var $composerForms = $listItems.children(".item-composer");
        var $itemNoteParagraphs = $listItems.children("p");
        var $editBtns = $listItems.children("button");

        $listItems.removeClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);
        $composerForms.hide();
        $itemNoteParagraphs.show();
        $editBtns.show();
        this.$addNoteLink.show();
    },

    _handleComposerFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var newItemNote = this.$textarea.val().trim();
        this._hideForm();
        this._fetchLatestAccountDataAndUpdateIt(newItemNote);
    },

    _handleTextareaKeyUp: function(e) {
        CS.Controllers.WorkbookItemCommon.handleTextareaKeyUp(e, this._handleComposerFormSubmit, this._hideForm);
    },

    _hideForm: function() {
        this.$listItem.removeClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);
        this.$form.hide();
        this.$itemNoteParagraph.show();
        this.$editBtn.show();
        this.$addNoteLink.show();
    },

    _fetchLatestAccountDataAndUpdateIt: function(newItemNote) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var updatedWorkbookItemNotesData = CS.account.data[this.props.workbookAreaClassName][this.props.workbookItemIndex].notes || [];

                if (newItemNote) {
                    updatedWorkbookItemNotesData[this.props.workbookItemNoteIndex] = newItemNote;
                } else {
                    updatedWorkbookItemNotesData.splice(this.props.workbookItemNoteIndex, 1);

                    // We hide it from the UI to give faster feedback
                    this.$listItem.hide();
                }

                CS.account.data[this.props.workbookAreaClassName][this.props.workbookItemIndex].notes = updatedWorkbookItemNotesData;
                CS.workbookItemController.saveAccountData();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

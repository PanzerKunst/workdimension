CS.Controllers.OverviewBlueprintItem = React.createClass({
    render: function () {
        var href = "/workbook-items/" + this._getBlueprintAreaClassName() + "/" + this.props.blueprintItemIndex;

        // TODO: replace .fa-bars element from <span> back to <button> after bug https://github.com/RubaXa/Sortable/issues/370 is fixed

        return (
            <li ref="li">
                <div className="notes-indicator"></div>
                <span className="fa fa-bars"></span>
                <p><a href={href}>{this._getBlueprintItemName()}</a></p>
                <button className="styleless fa fa-pencil" onClick={this._showEditor}></button>
                <form role="form" className="item-composer" onSubmit={this._handleComposerFormSubmit}>
                    <textarea className="form-control" onKeyUp={this._handleTextareaKeyUp} />
                    <button className="btn btn-primary">Spara ändringar</button>
                    <button type="button" className="styleless fa fa-times" onClick={this._hideForm}></button>
                </form>
            </li>
            );
    },

    componentDidMount: function () {
        this._initElements();
        CS.Controllers.WorkbookAreaCommon.initNotesIndicator(this.$notesIndicator, CS.account.data[this._getBlueprintAreaClassName()][this.props.blueprintItemIndex].notes.length);
    },

    _getBlueprintAreaClassName: function() {
        return this.props.blueprintAreaWithData.blueprintArea.className;
    },

    _getBlueprintItemName: function () {
        return this.props.blueprintAreaWithData.items[this.props.blueprintItemIndex].name;
    },

    _initElements: function() {
        this.$listItem = $(React.findDOMNode(this.refs.li));
        this.$notesIndicator = this.$listItem.children(".notes-indicator");
        this.$itemNameParagraph = this.$listItem.children("p");
        this.$editBtn = this.$listItem.children(".fa-pencil");
        this.$form = this.$listItem.children(".item-composer");
        this.$textarea = this.$form.children("textarea");

        this.$blueprintAreaWell = this.$listItem.parents(".blueprint-area-panel").children();
    },

    _showEditor: function () {
        this._hideOtherOpenComposers();

        this.$textarea.val(this._getBlueprintItemName());

        this.$listItem.addClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);

        CS.Controllers.WorkbookAreaCommon.disableSortable(this.props.controller);

        this.$itemNameParagraph.hide();
        this.$editBtn.hide();
        this.$blueprintAreaWell.addClass("editing");
        this.$form.show();
        CS.Controllers.WorkbookAreaCommon.adaptTextareaHeight(this.$textarea);
        this.$textarea.focus();

        CS.overviewController.rePackerise();
    },

    _hideOtherOpenComposers: function() {
        var $listItems = CS.overviewController.$el.find(".item-names-list").children();
        var $composerForms = $listItems.children(".item-composer");
        var $itemNameParagraphs = $listItems.children("p");
        var $editBtns = $listItems.children(".fa-pencil");
        var $addItemLinks = CS.overviewController.$el.find(".add-item-link");

        $listItems.removeClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);
        $composerForms.hide();
        $itemNameParagraphs.show();
        $editBtns.show();
        $addItemLinks.show();
    },

    _handleComposerFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var newItemName = this.$textarea.val().trim();
        this._fetchLatestAccountDataAndUpdateIt(newItemName);
    },

    _handleTextareaKeyUp: function(e) {
        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleComposerFormSubmit, this._hideForm);
    },

    _hideForm: function() {
        this.$listItem.removeClass(CS.Controllers.WorkbookCommon.listItemEditModeClass);
        this.$form.hide();
        this.$itemNameParagraph.show();
        this.$editBtn.show();
        this.$blueprintAreaWell.removeClass("editing");

        CS.overviewController.rePackerise();
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

                var updatedBlueprintAreaData = !_.isEmpty(CS.account.data[this._getBlueprintAreaClassName()]) ? _.clone(CS.account.data[this._getBlueprintAreaClassName()], true) : [];

                if (newItemName) {
                    updatedBlueprintAreaData[this.props.blueprintItemIndex].name = newItemName;
                } else {
                    updatedBlueprintAreaData.splice(this.props.blueprintItemIndex, 1);

                    // We hide it from the UI to give faster feedback
                    this.$listItem.hide();
                }

                CS.Controllers.WorkbookAreaCommon.resetAndHideForm(this.$textarea, this._hideForm);

                CS.account.data[this._getBlueprintAreaClassName()] = updatedBlueprintAreaData;
                CS.overviewController.saveAccountData();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

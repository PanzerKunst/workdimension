CS.Controllers.OverviewBlueprintAreaComposer = React.createClass({
    addItemComposerOpenCssClass: "add-item-composer-open",

    render: function () {
        return (
            <section ref="wrapper" className="add-item-section">
                <form role="form" className="item-composer" ref="form" onSubmit={this._handleComposerFormSubmit}>
                    <textarea className="form-control" onKeyUp={this._handleTextareaKeyUp} />
                    <button className="btn btn-primary">Add</button>
                    <button type="button" className="styleless fa fa-times" onClick={this._hideForm}></button>
                </form>

                <a className="add-item-link" onClick={this._showComposer}>+ Lägg till</a>
            </section>
            );
    },

    componentDidMount: function () {
        this._initElements();
    },

    _initElements: function () {
        this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
        this.$well = this.$wrapper.parent();
        this.$form = this.$wrapper.children(".item-composer");
        this.$addItemLink = this.$wrapper.children(".add-item-link");
        this.$textarea = this.$form.children("textarea");
    },

    _showComposer: function () {
        this._hideOtherOpenComposers();

        this.$well.addClass(this.addItemComposerOpenCssClass);
        this.$textarea.focus();

        CS.overviewController.rePackerise();
    },

    _hideOtherOpenComposers: function () {
        CS.overviewController.$el.find(".well").removeClass(this.addItemComposerOpenCssClass);
    },

    _handleComposerFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        var itemNameToAdd = this.$textarea.val().trim();

        if (itemNameToAdd && !CS.Controllers.WorkbookAreaCommon.doesItemAlreadyExist(itemNameToAdd, this.props.blueprintAreaClassName)) {
            this._fetchLatestAccountDataAndUpdateIt(itemNameToAdd);
        }

        CS.Controllers.WorkbookAreaCommon.resetAndHideForm(this.$textarea, this._hideForm);
    },

    _handleTextareaKeyUp: function (e) {
        CS.Controllers.WorkbookAreaCommon.handleTextareaKeyUp(e, this._handleComposerFormSubmit, this._hideForm);
    },

    _hideForm: function () {
        this.$well.removeClass(this.addItemComposerOpenCssClass);

        CS.overviewController.rePackerise();
    },

    _fetchLatestAccountDataAndUpdateIt: function(itemNameToAdd) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                var updatedBlueprintAreaData = !_.isEmpty(CS.account.data[this.props.blueprintAreaClassName]) ? _.clone(CS.account.data[this.props.blueprintAreaClassName], true) : [];
                updatedBlueprintAreaData.push({
                    name: itemNameToAdd,
                    notes: []
                });

                CS.account.data[this.props.blueprintAreaClassName] = updatedBlueprintAreaData;
                CS.overviewController.saveAccountData();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

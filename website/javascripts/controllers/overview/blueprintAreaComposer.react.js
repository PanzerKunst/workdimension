CS.Controllers.OverviewBlueprintAreaComposer = React.createClass({
    render: function () {
        return (
            <div>
                <form role="form" className="item-composer" ref="form" onSubmit={this._handleComposerFormSubmit}>
                    <textarea className="form-control" onKeyUp={this._handleTextareaKeyUp} />
                    <button className="btn btn-primary">Add</button>
                    <button type="button" className="styleless fa fa-times" onClick={this._hideForm}></button>
                </form>

                <a onClick={this._showComposer}>+ Add item</a>
            </div>
            );
    },

    componentDidMount: function () {
        this._initElements();

        this.textareaDefaultHeightPx = 41;
    },

    _getController: function () {
        return this.props.controller;
    },

    _getBlueprintAreaClassName: function () {
        return this.props.blueprintArea.className;
    },

    _initElements: function() {
        this.$form = $(React.findDOMNode(this.refs.form));
        this.$textarea = this.$form.children("textarea");
    },

    _showComposer: function (e) {
        // TODO: remove
        console.log("_showComposer");

        var $composerForms = this._getController().$el.find(".item-composer");
        var $addItemLinks = $composerForms.siblings("a");

        $addItemLinks.show();
        $composerForms.hide();
        this.$form.show();
        this.$textarea.focus();

        var $link = $(e.currentTarget);
        $link.hide();
    },

    _handleComposerFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        // TODO: remove
        console.log("_handleComposerFormSubmit");

        var itemNameToAdd = this.$textarea.val().trim();

        if (itemNameToAdd) {
            var updatedBlueprintAreaData = CS.account.data && !_.isEmpty(CS.account.data[this._getBlueprintAreaClassName()]) ? _.clone(CS.account.data[this._getBlueprintAreaClassName()], true) : [];
            updatedBlueprintAreaData.push({name: itemNameToAdd});

            CS.account.data = CS.account.data || {};
            CS.account.data[this._getBlueprintAreaClassName()] = updatedBlueprintAreaData;

            this._getController().saveAccountData();
        }

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
        this.$form.hide();
        this.$form.siblings("a").show();
    }
});

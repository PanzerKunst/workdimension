CS.Controllers.OverviewBlueprintAreaComposer = React.createClass({
    render: function () {
        return (
            <div>
                <form role="form" className="item-composer" ref="form" onSubmit={this._handleComposerFormSubmit}>
                    <textarea className="form-control" ref="textarea" onKeyUp={this._handleTextareaKeyUp} />
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
        var controller = this._getController();

        if (controller) {
            this.$composerForms = controller.$el.find(".item-composer");
            this.$addItemLinks = this.$composerForms.siblings("a");

            this.$form = $(React.findDOMNode(this.refs.form));
            this.$textarea = $(React.findDOMNode(this.refs.textarea));
        }
    },

    _showComposer: function (e) {
        // TODO: remove
        console.log("_showComposer");

        this.$addItemLinks.show();
        this.$composerForms.hide();
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
            var updatedBlueprintAreaData = _.clone(CS.account.data[this._getBlueprintAreaClassName()], true) || [];
            updatedBlueprintAreaData.push({name: itemNameToAdd});

            CS.account.data[this._getBlueprintAreaClassName()] = updatedBlueprintAreaData;

            this._getController().reRender();
        }

        this._resetAndHideForm();
    },

    _handleTextareaKeyUp: function (e) {
        if (e.keyCode === CS.Services.Keyboard.keyCode.enter) {
            this._handleComposerFormSubmit();
        } else {
            var $textarea = $(e.currentTarget);
            this._countTextareaLines($textarea);
        }
    },

    _countTextareaLines: function ($textarea) {
        var lineHeight = parseInt($textarea.css("lineHeight"), 10);
        var padding = parseInt($textarea.css("paddingTop"), 10) + parseInt($textarea.css("paddingBottom"), 10);
        var lineCount = Math.round(($textarea.prop("scrollHeight") - padding) / lineHeight);

        // TODO: remove
        console.log("lineCount: " + lineCount);

        var currentTextAreaHeightPx = parseFloat($textarea.css("height"));
        var newTextAreaHeightPx = this.textareaDefaultHeightPx - lineHeight + lineCount * lineHeight;

        if (newTextAreaHeightPx !== currentTextAreaHeightPx) {

            // TODO: remove
            console.log("newTextAreaHeightPx: " + newTextAreaHeightPx);

            $textarea.css("height", newTextAreaHeightPx);
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

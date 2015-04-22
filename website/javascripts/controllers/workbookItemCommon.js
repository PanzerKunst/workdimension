CS.Controllers.WorkbookItemCommon = {
    textareaDefaultHeightPx: 70,
    mediumScreenTextareaDefaultHeightPx: 91,
    largeScreenTextareaDefaultHeightPx: 112,

    handleTextareaKeyUp: function (e, formCancelFunction) {
        if (e.keyCode === CS.Services.Keyboard.keyCode.escape && formCancelFunction) {
            formCancelFunction();
        } else {
            var $textarea = $(e.currentTarget);
            CS.Controllers.WorkbookItemCommon.adaptTextareaHeight($textarea);
        }
    },

    adaptTextareaHeight: function ($textarea) {
        var lineHeight = parseInt($textarea.css("lineHeight"), 10);
        var padding = parseInt($textarea.css("paddingTop"), 10) + parseInt($textarea.css("paddingBottom"), 10);
        var scrollHeight = Math.floor(($textarea.prop("scrollHeight") - padding));
        var currentTextAreaHeightPx = parseFloat($textarea.css("height"));

        var difference = scrollHeight - currentTextAreaHeightPx;

        if (difference > 0) {
            var linesCount = Math.ceil(difference / lineHeight);
            $textarea.css("height", currentTextAreaHeightPx + lineHeight * linesCount);
        }
    },

    resetAndHideForm: function ($textarea, callback) {
        CS.Controllers.WorkbookCommon.resetAndHideForm($textarea, callback, this.textareaDefaultHeightPx);
    },

    doesItemAlreadyExist: function(note, workbookAreaClassName, workbookItemIndex) {
        if (_.isEmpty(CS.account.data[workbookAreaClassName][workbookItemIndex].notes)) {
            return false;
        }

        var itemNotes = CS.account.data[workbookAreaClassName][workbookItemIndex].notes;
        return _.includes(itemNotes, note);
    },

    _getTextareaDefaultHeight: function($textarea) {
        return CS.Controllers.WorkbookCommon.getTextareaDefaultHeight($textarea, this.textareaDefaultHeightPx, this.mediumScreenTextareaDefaultHeightPx, this.largeScreenTextareaDefaultHeightPx);
    }
};

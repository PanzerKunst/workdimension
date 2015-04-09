CS.Controllers.WorkbookAreaCommon = {
    textareaDefaultHeightPx: 41,
    mediumScreenTextareaDefaultHeightPx: 53,
    largeScreenTextareaDefaultHeightPx: 65,
    fontSizeLargeScreen: 22.3,
    fontSizeMediumScreen: 18.1,

    handleTextareaKeyUp: function (e, formSubmitFunction, formCancelFunction) {
        if (e.keyCode === CS.Services.Keyboard.keyCode.enter) {
            formSubmitFunction();
        } else if (e.keyCode === CS.Services.Keyboard.keyCode.escape) {
            formCancelFunction();
        } else {
            var $textarea = $(e.currentTarget);
            CS.Controllers.WorkbookAreaCommon.adaptTextareaHeight($textarea);
        }
    },

    adaptTextareaHeight: function ($textarea) {
        var lineHeight = parseInt($textarea.css("lineHeight"), 10);
        var padding = parseInt($textarea.css("paddingTop"), 10) + parseInt($textarea.css("paddingBottom"), 10);
        var lineCount = Math.floor(($textarea.prop("scrollHeight") - padding) / lineHeight);

        var currentTextAreaHeightPx = parseFloat($textarea.css("height"));
        var newTextAreaHeightPx = this._getTextAreaDefaultHeight($textarea) - lineHeight + lineCount * lineHeight;

        if (newTextAreaHeightPx !== currentTextAreaHeightPx) {
            $textarea.css("height", newTextAreaHeightPx);

            if (CS.overviewController) {
                CS.overviewController.rePackerise();
            }
        }
    },

    resetAndHideForm: function ($textarea, callback) {
        $textarea.val(null);
        $textarea.css("height", this.textareaDefaultHeightPx);

        if (callback) {
            callback();
        }
    },

    doesItemAlreadyExist: function(itemName, workbookAreaClassName) {
        if (!CS.account.data || _.isEmpty(CS.account.data[workbookAreaClassName])) {
            return false;
        }

        var areaItems = CS.account.data[workbookAreaClassName];
        return !_.isEmpty(_.find(areaItems, "name", itemName));
    },

    handleWorkbookItemsReordered: function($list, workbookAreaClassName) {
        var newlyOrderedItems = [];

        $list.children().each(function () {
            var itemName = $(this).children("p").text();
            newlyOrderedItems.push(_.find(CS.account.data[workbookAreaClassName], "name", itemName));
        });

        CS.account.data[workbookAreaClassName] = newlyOrderedItems;
        CS.saveAccountData();
    },

    disableSortable: function(controller) {
        controller.sortable.option("disabled", true);
    },

    enableSortable: function(controller) {
        controller.sortable.option("disabled", false);
    },

    _getTextAreaDefaultHeight: function($textarea) {
        var fontSizeStr = $textarea.css("font-size");
        var fontSizePx = parseInt(fontSizeStr.substring(0, fontSizeStr.indexOf("px")), 10);

        if (fontSizePx > this.fontSizeLargeScreen) {
            return this.largeScreenTextareaDefaultHeightPx;
        }
        if (fontSizePx > this.fontSizeMediumScreen) {
            return this.mediumScreenTextareaDefaultHeightPx;
        }
        return this.textareaDefaultHeightPx;
    }
};

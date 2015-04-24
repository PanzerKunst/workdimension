CS.Controllers.WorkbookCommon = {
    fontSizeLargeScreen: 22,
    fontSizeMediumScreen: 18,
    listItemEditModeClass: "editing",

    resetAndHideForm: function ($textarea, callback, textareaDefaultHeightPx) {
        $textarea.val(null);
        $textarea.css("height", textareaDefaultHeightPx);

        if (callback) {
            callback();
        }
    },

    getTextareaDefaultHeight: function($textarea, textareaDefaultHeightPx, mediumScreenTextareaDefaultHeightPx, largeScreenTextareaDefaultHeightPx) {
        var fontSizeStr = $textarea.css("font-size");
        var fontSizePx = parseFloat(fontSizeStr.substring(0, fontSizeStr.indexOf("px")));

        if (fontSizePx > this.fontSizeLargeScreen) {
            return largeScreenTextareaDefaultHeightPx;
        }
        if (fontSizePx > this.fontSizeMediumScreen) {
            return mediumScreenTextareaDefaultHeightPx;
        }
        return textareaDefaultHeightPx;
    },

    setProgressBarWidth: function($progressBar, itemCount, stepCount) {
        var itemPercent = itemCount / stepCount * 100;

        if (itemPercent > 100) {
            itemPercent = 100;
        }

        $progressBar.attr("aria-valuenow", itemPercent);
        $progressBar.css("width", itemPercent + "%");
        $progressBar.html(parseInt(itemPercent, 10) + "%");
    }
};

CS.Services.String = {
    textToHtml: function (text) {
        return text.replace(/\n/g, "<br/>");
    },

    template: function (string, key, value) {
        var regExp = new RegExp("\\{" + key + "\\}", "g");
        return string.replace(regExp, value);
    }
};

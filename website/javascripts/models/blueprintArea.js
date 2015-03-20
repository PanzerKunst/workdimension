CS.Models.BlueprintArea = P(function (c) {
    c.init = function (className, blueprintCategoryId, title, priority) {
        this.className = className;
        this.blueprintCategoryId = blueprintCategoryId;
        this.title = title;
        this.priority = priority;
    };

    c.getClassName = function() {
        return this.className;
    };

    c.getTitle = function() {
        return this.title;
    };

    // TODO: use DB instead of local storage
    c.isActive = function() {
        return CS.Services.Browser.getFromLocalStorage("isBlueprintArea" + this.className + "Active");
    };

    c.activate = function() {
        return CS.Services.Browser.saveInLocalStorage("isBlueprintArea" + this.className + "Active", true);
    };

    c.deactivate = function() {
        return CS.Services.Browser.removeFromLocalStorage("isBlueprintArea" + this.className + "Active");
    };
});

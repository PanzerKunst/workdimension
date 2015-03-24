CS.Models.BlueprintArea = P(function (c) {
    c.init = function (className, blueprintCategoryId, title, priority) {
        this.className = className;
        this.blueprintCategoryId = blueprintCategoryId;
        this.title = title;
        this.priority = priority;
    };

    c.getClassName = function () {
        return this.className;
    };

    c.getTitle = function () {
        return this.title;
    };

    c.isActive = function () {
        if (!CS.account.data || !CS.account.data.activeBlueprintAreas) {
            return false;
        }

        return CS.account.data.activeBlueprintAreas.indexOf(this.className) > -1;
    };

    c.activate = function (isDefault) {
        CS.account.data = CS.account.data || {};
        CS.account.data.activeBlueprintAreas = CS.account.data.activeBlueprintAreas || [];
        CS.account.data.activeBlueprintAreas.push(this.className);

        if (!isDefault) {
            CS.saveAccountData();
            CS.blueprintAreasModel.updateStatus();
        }
    };

    // TODO: use DB instead of local storage
    c.deactivate = function () {
        return CS.Services.Browser.removeFromLocalStorage("isBlueprintArea" + this.className + "Active");
    };
});

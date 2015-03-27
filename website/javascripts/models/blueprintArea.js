CS.Models.BlueprintArea = P(function (c) {
    c.init = function (className, blueprintCategoryId, title) {
        this.className = className;
        this.blueprintCategoryId = blueprintCategoryId;
        this.title = title;
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

    c.activate = function (isInitial) {
        CS.account.data = CS.account.data || {};
        CS.account.data.activeBlueprintAreas = CS.account.data.activeBlueprintAreas || [];
        CS.account.data.activeBlueprintAreas.push(this.className);

        if (!isInitial) {
            CS.saveAccountData();
            CS.blueprintAreasModel.updateStatus();
        }
    };

    c.deactivate = function () {
        CS.account.data = CS.account.data || {};
        CS.account.data.activeBlueprintAreas = CS.account.data.activeBlueprintAreas || [];
        _.remove(CS.account.data.activeBlueprintAreas, function(className) {
            return className === this.className;
        }.bind(this));

        CS.saveAccountData();
        CS.blueprintAreasModel.updateStatus();
    };
});

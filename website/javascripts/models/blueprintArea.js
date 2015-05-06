CS.Models.BlueprintArea = P(function (c) {
    c.init = function (id, className, blueprintCategoryId, title) {
        this.id = id;
        this.className = className;
        this.blueprintCategoryId = blueprintCategoryId;
        this.title = title;
    };

    c.isActive = function () {
        if (!CS.account.data || !CS.account.data.activeBlueprintAreas) {
            return false;
        }

        return CS.account.data.activeBlueprintAreas.indexOf(this.className) > -1;
    };

    c.activate = function (isInitial) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};
                CS.account.data.activeBlueprintAreas = CS.account.data.activeBlueprintAreas || [];
                CS.account.data.activeBlueprintAreas.push(this.className);

                if (!isInitial) {
                    CS.saveAccountData();
                    CS.blueprintAreasModel.updateStatus();
                }
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    };

    c.deactivate = function () {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};
                CS.account.data.activeBlueprintAreas = CS.account.data.activeBlueprintAreas || [];
                _.remove(CS.account.data.activeBlueprintAreas, function(className) {
                    return className === this.className;
                }.bind(this));

                CS.saveAccountData();
                CS.blueprintAreasModel.updateStatus();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    };
});

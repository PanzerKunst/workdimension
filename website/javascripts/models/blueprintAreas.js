CS.Models.BlueprintAreas = P(function (c) {
    c.nbDefaultActiveBlueprintAreas = 3;

    c.init = function () {
        this.blueprintAreaInstances = CS.workbookAreas.map(function (item) {
            return CS.Models.BlueprintArea(
                item.id,
                item.className,
                item.humanReadableClassName,
                item.workbookCategoryId,
                item.title
            );
        });

        this.isInitial = true;
    };

    c.updateStatus = function () {
        this.blueprintAreas = {
            active: [],
            inactive: []
        };

        this._updateStatus();
    };

    c.getActive = function () {
        return this.blueprintAreas.active;
    };

    c.getInactive = function () {
        return this.blueprintAreas.inactive;
    };

    c.getOfId = function(id) {
        return _.find(this.blueprintAreaInstances, "id", id);
    };

    c._updateStatus = function () {
        this.blueprintAreaInstances.forEach(function (instance) {
            if (instance.isActive()) {
                this.blueprintAreas.active.push(instance);
            } else {
                this.blueprintAreas.inactive.push(instance);
            }
        }.bind(this));

        // If none is active, we set the top-N priority as active
        if (this.isInitial && _.isEmpty(this.blueprintAreas.active)) {
            this._activateSeveral(_.take(this.blueprintAreaInstances, this.nbDefaultActiveBlueprintAreas));
        }

        if (CS.overviewController) {
            CS.overviewController.reRender();
        }
        if (CS.mainMenuController) {
            CS.mainMenuController.reRender();
        }

        this.isInitial = false;
    };

    c._activateSeveral = function(instancesToActivate) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};
                CS.account.data.activeBlueprintAreas = CS.account.data.activeBlueprintAreas || [];
                instancesToActivate.forEach(function(instanceToActivate) {
                    CS.account.data.activeBlueprintAreas.push(instanceToActivate.className);
                    this.blueprintAreas.active.push(instanceToActivate);
                    this.blueprintAreas.inactive = _.without(this.blueprintAreas.inactive, instanceToActivate);
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

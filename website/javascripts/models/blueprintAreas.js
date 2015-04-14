CS.Models.BlueprintAreas = P(function (c) {
    c.nbDefaultActiveBlueprintAreas = 3;

    c.init = function (blueprintAreas) {
        this.blueprintAreaInstances = blueprintAreas.map(function (item) {
            return CS.Models.BlueprintArea(item.id, item.className, item.workbookCategoryId, item.title);
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
            for (var i = 0; i < this.nbDefaultActiveBlueprintAreas; i++) {
                var instanceToActivate = this.blueprintAreaInstances[i];
                instanceToActivate.activate(this.isInitial);
                this.blueprintAreas.active.push(instanceToActivate);
                this.blueprintAreas.inactive = _.without(this.blueprintAreas.inactive, instanceToActivate);
            }
            CS.saveAccountData();
        }

        if (CS.overviewController) {
            CS.overviewController.reRender();
        }
        if (CS.mainMenuController) {
            CS.mainMenuController.reRender();
        }

        this.isInitial = false;
    };
});

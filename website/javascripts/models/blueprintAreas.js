CS.Models.BlueprintAreas = P(function (c) {
    c.nbDefaultActiveBlueprintAreas = 3;

    c.init = function () {
        this.blueprintAreaInstances = CS.BlueprintAreas.map(function (item) {
            return CS.Models.BlueprintArea(item.className, item.blueprintCategoryId, item.title, item.priority);
        });
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

    c._updateStatus = function () {
        this.blueprintAreaInstances.forEach(function (instance) {
            if (instance.isActive()) {
                this.blueprintAreas.active.push(instance);
            } else {
                this.blueprintAreas.inactive.push(instance);
            }
        }.bind(this));

        // If none is active, we set the top-N priority as active
        if (_.isEmpty(this.blueprintAreas.active)) {
            for (var i = 0; i < this.nbDefaultActiveBlueprintAreas; i++) {
                var instanceToActivate = this.blueprintAreaInstances[i];
                instanceToActivate.activate(true);
                this.blueprintAreas.active.push(instanceToActivate);
                this.blueprintAreas.inactive = _.without(this.blueprintAreas.inactive, instanceToActivate);
            }
            CS.saveAccountData();
        }

        CS.mainMenuController.reRender();
        CS.overviewController.reRender();
    };
});

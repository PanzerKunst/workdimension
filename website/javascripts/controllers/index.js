CS.Controllers.Index = P(function(c) {
    c.init = function (blueprintAreas) {
        CS.overviewController = CS.Controllers.Overview();
        CS.blueprintAreasSelector = CS.Controllers.BlueprintAreasSelector(blueprintAreas);
    };
});

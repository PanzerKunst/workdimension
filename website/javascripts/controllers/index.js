CS.Controllers.Index = P(function(c) {
    c.init = function () {
        CS.overviewController = CS.Controllers.Overview();
        CS.blueprintAreasSelector = CS.Controllers.BlueprintAreasSelector();
    };
});

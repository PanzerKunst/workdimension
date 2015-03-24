CS.Controllers.Index = P(function (c) {
    c.init = function (accountId, accountEmail, accountData) {
        CS.account.id = accountId;
        CS.account.email = accountEmail;
        CS.account.data = accountData;

        CS.mainMenuController = CS.Controllers.MainMenu();
        CS.overviewController = CS.Controllers.Overview();

        CS.blueprintAreasModel = CS.Models.BlueprintAreas();
        CS.blueprintAreasModel.updateStatus();

        CS.Controllers.Header();
    };
});

CS.Controllers.Index = P(function (c) {
    c.init = function (accountId, accountEmail, accountData) {
        CS.account.id = accountId;
        CS.account.email = accountEmail;
        CS.account.data = accountData;

        CS.Controllers.Header();
        CS.Controllers.HeaderModal.Register();
        CS.Controllers.HeaderModal.SignIn();
        CS.Controllers.Standouts();

        CS.activitiesModel = CS.Models.Activities();
        CS.activitiesModel.updateActivityStatus();
    };
});

CS.Controllers.Index = P(function (c) {
    c.init = function (accountId, accountEmail, accountData) {
        CS.account.id = accountId;
        CS.account.email = accountEmail;
        CS.account.data = accountData;

        CS.Controllers.Header();
        CS.Controllers.MainMenu();

        CS.Controllers.Blueprint();
    };
});

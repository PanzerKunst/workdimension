CS.Controllers.Base = P(function(c) {
    c.httpStatusCode = {
        noContent: 204,
        emailAlreadyRegistered: 230
    };

    c.isTemporaryAccount = function () {
        return CS.account.id < 0;
    };
});

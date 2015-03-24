CS.Controllers.Base = P(function(c) {
    c.httpStatusCode = {
        noContent: 204,
        emailAlreadyRegistered: 230,
        linkedInAccountIdAlreadyRegistered: 231
    };

    c.isTemporaryAccount = function () {
        return CS.account.id < 0;
    };
});

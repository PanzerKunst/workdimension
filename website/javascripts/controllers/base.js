CS.Controllers.Base = P(function(c) {
    c.httpStatusCode = {
        ok: 200,
        noContent: 204,
        emailAlreadyRegistered: 230,
        linkedInAccountIdAlreadyRegistered: 231
    };

    c.isTemporaryAccount = function () {
        return CS.account.id < 0;
    };
});

CS.Controllers = {
    httpStatusCode: {
        noContent: 204,
        emailAlreadyRegistered: 230
    },
    isTemporaryAccount: function () {
        return CS.accountId < 0;
    }
};

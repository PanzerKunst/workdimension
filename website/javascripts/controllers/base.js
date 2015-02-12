CS.Controllers = {
    httpStatusCode: {
        noContent: 204,
        emailAlreadyRegistered: 230
    },
    isTemporaryAccount: function () {
        return CS.account.id < 0;
    }
};

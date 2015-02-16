CS.Controllers.Base = P(function(c) {
    c.httpStatusCode = {
        noContent: 204,
        emailAlreadyRegistered: 230
    };

    c.isTemporaryAccount = function () {
        return CS.account.id < 0;
    };

    c.saveInLocalStorage = function (key, value) {
        if (Modernizr.localstorage) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    };

    c.getFromLocalStorage = function (key) {
        if (Modernizr.localstorage) {
            return JSON.parse(localStorage.getItem(key));
        }
    };

    c.removeFromLocalStorage = function (key) {
        if (Modernizr.localstorage) {
            localStorage.removeItem(key);
        }
    };
});

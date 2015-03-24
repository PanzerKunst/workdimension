// Base namespace
var CS = {};

// Additional namespaces
CS.Models = {};
CS.Controllers = {};
CS.Services = {};

// Global objects
CS.account = {
    id: null,
    email: null,
    data: null
};
CS.router = new Grapnel();
CS.defaultAnimationDuration = 0.5;
CS.blueprintAreasModel = null;
CS.indexController = null;
CS.mainMenuController = null;
CS.overviewController = null;

// Global functions
CS.saveAccountData = function (callback) {
    var type = "POST";
    var url = "/api/account-data";

    $.ajax({
        url: url,
        type: type,
        contentType: "application/json",
        data: JSON.stringify(CS.account.data),
        success: function () {
            if (callback) {
                callback();
            }
        },
        error: function () {
            alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
        }
    });
};

CS.Controllers.OnePageWebapp = P(CS.Controllers.Base, function (c) {
    c.navigateTo = function (route) {
        location.hash = route;
    };

    c.navigateBack = function () {
        history.back();
    };
});

CS.Controllers.OnePageWebapp = P(CS.Controllers.Base, function (c, base) {
    c.navigateTo = function (route) {
        location.hash = route;
    };

    c.navigateBack = function () {
        history.back();
    };
});

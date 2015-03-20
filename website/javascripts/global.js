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

if (typeof String.prototype.startsWith !== 'function') {
    String.prototype.startsWith = function (str) {
        return this.slice(0, str.length) === str;
    };
}

if (typeof Array.prototype.clone !== 'function') {
    Array.prototype.clone = function () {
        return this.slice(0);
    };
}

// create the base namespace
var CS = {};

// create additional namespace
CS.Models = {};
CS.Controllers = {};
CS.Services = {};
CS.C1s = {};

// Global objects
CS.account = {
    id: null,
    email: null,
    data: null
};
CS.router = new Grapnel();
CS.defaultAnimationDuration = 0.5;
CS.activityFeedController = null;
CS.undoneC1sAndActivities = [];

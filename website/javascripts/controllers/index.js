CS.Controllers.Index = P(function (c) {
    c.init = function (accountId, accountData) {
        this.accountId = accountId;
        CS.accountData = accountData;

        this.activityFeedController = CS.Controllers.ActivityFeed();
        this.standoutsController = CS.Controllers.Standouts();

        CS.Controllers.HeaderModal.Register();
        CS.Controllers.HeaderModal.SignIn();

        this._initElements();
        this._initHeaderLinks();
        this._initEvents();

        this._initRouter();
    };

    c._initElements = function () {
        this.$headerNav = $('[role="navigation"]');
        this.$activitiesTab = this.$headerNav.find("#activities-tab");
        this.$standoutsTab = this.$headerNav.find("#standouts-tab");

        this.$headerLinks = this.$headerNav.children("a");
        this.$signOutLink = this.$headerLinks.filter("#sign-out-link");

        this.$tabPanels = $('[role="tabpanel"]');
        this.$activitiesPanel = this.$tabPanels.filter("#activities");
        this.$standoutsPanel = this.$tabPanels.filter("#standouts");

        this.$feedSection = this.$activitiesPanel.children("#c1-and-activity-feed");
        this.$currentC1OrActivitySection = this.$activitiesPanel.children("#current-c1-or-activity");
    };

    c._initHeaderLinks = function () {
        if (this._isTemporaryAccount()) {
            this.$headerLinks.show();
            this.$signOutLink.hide();
        } else {
            this.$signOutLink.show();
        }
    };

    c._initEvents = function () {
        this.$activitiesTab.click(function (e) {
            location.hash = "activities";
        });

        this.$standoutsTab.click(function (e) {
            location.hash = "standouts";
        });

        this.$signOutLink.click($.proxy(this._signOut, this));

        window.onbeforeunload = $.proxy(this._confirmExit, this);
    };

    c._initRouter = function () {
        CS.router.get("", function (req) {
            this._activateActivitiesPanel();
        }.bind(this));

        CS.router.get("activities", function (req) {
            this._activateActivitiesPanel();
        }.bind(this));

        CS.router.get("standouts", function (req) {
            this._activateStandoutsPanel();
        }.bind(this));
    };

    c._activateActivitiesPanel = function () {
        if (!this.$activitiesPanel.hasClass("active")) {
            this.$tabPanels.removeClass("active");
            this.$activitiesTab.tab('show');
            this.$activitiesPanel.addClass("active");
        }

        this.activityFeedController.refreshData();
        this.standoutsController.refreshData();

        this.$currentC1OrActivitySection.hide();
        this.$feedSection.show();
    };

    c._activateStandoutsPanel = function () {
        if (!this.$standoutsPanel.hasClass("active")) {
            this.$tabPanels.removeClass("active");
            this.$standoutsTab.tab('show');
            this.$standoutsPanel.addClass("active");
        }

        this.activityFeedController.refreshData();
        this.standoutsController.refreshData();

        this.$currentC1OrActivitySection.hide();
        this.$feedSection.show();
    };

    c._isTemporaryAccount = function () {
        return this.accountId < 0;
    };

    c._signOut = function (e) {
        var type = "DELETE";
        var url = "/api/auth";

        $.ajax({
            url: url,
            type: type,
            success: function (data, textStatus, jqXHR) {
                location.href = "/";
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
            }.bind(this)
        });
    };

    c._confirmExit = function (e) {
        if (this._isTemporaryAccount() && CS.Controllers.Index.isUnsavedProgress) {
            return "You are about to lose your progress. You can save it by registering via the link at the top of the page.";
        }
    };

    c._isTemporaryAccount = function () {
        return this.accountId < 0;
    };
});

CS.Controllers.Index.isUnsavedProgress = false;

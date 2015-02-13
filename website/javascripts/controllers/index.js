CS.Controllers.Index = P(function (c) {
    c.init = function (accountId, accountEmail, accountData) {
        CS.account.id = accountId;
        CS.account.email = accountEmail;
        CS.account.data = accountData;

        this.activityFeedController = CS.Controllers.ActivityFeed();
        this.standoutsController = CS.Controllers.Standouts();

        CS.Controllers.HeaderModal.Register();
        CS.Controllers.HeaderModal.SignIn();
        CS.Controllers.RegisterReminder();

        this._initElements();
        this._initHeaderLinks();
        this._initEvents();

        this._initRouter();
    };

    c._initElements = function () {
        this.$headerSection = $("#header-links");
        this.$headerLinks = this.$headerSection.children("a");
        this.$signOutLink = this.$headerLinks.filter("#sign-out-link");

        this.$headerNav = $('[role="navigation"]');
        this.$activitiesTab = this.$headerNav.find("#activities-tab");
        this.$standoutsTab = this.$headerNav.find("#standouts-tab");

        this.$tabPanels = $('[role="tabpanel"]');
        this.$activitiesPanel = this.$tabPanels.filter("#activities");
        this.$standoutsPanel = this.$tabPanels.filter("#standouts");

        this.$feedSection = this.$activitiesPanel.children("#c1-and-activity-feed");
        this.$currentActivitySection = this.$activitiesPanel.children("#current-activity");

        this.$standoutListSection = this.$standoutsPanel.children("#standout-list");
        this.$standoutDetailSection = this.$standoutsPanel.children("#standout-detail");
    };

    c._initHeaderLinks = function () {
        if (CS.Controllers.isTemporaryAccount()) {
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

        this._handlePanelActivated();
    };

    c._activateStandoutsPanel = function () {
        if (!this.$standoutsPanel.hasClass("active")) {
            this.$tabPanels.removeClass("active");
            this.$standoutsTab.tab('show');
            this.$standoutsPanel.addClass("active");
        }

        this._handlePanelActivated();
    };

    c._handlePanelActivated = function() {
        this.activityFeedController.refreshData();
        this.standoutsController.refreshData();

        this.$currentActivitySection.hide();
        this.$feedSection.show();

        this.$standoutDetailSection.hide();
        this.$standoutListSection.show();
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
});


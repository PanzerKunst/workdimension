CS.Controllers.Index = P(function (c) {
    c.init = function (accountId) {
        this.accountId = accountId;

        this.c1AndActivityFeedController = CS.Controllers.C1AndActivityFeed();

        CS.Controllers.HeaderModal.Register(this);
        CS.Controllers.HeaderModal.SignIn(this);

        this._initElements();
        this._initHeaderLinks();
        this._initEvents();

        this._initRouter();
    };

    c._initElements = function () {
        this.$headerNav = $('[role="navigation"]');
        this.$activitiesTab = this.$headerNav.find("#activities-tab");
        this.$insightsTab = this.$headerNav.find("#insights-tab");

        this.$headerLinks = this.$headerNav.children("a");
        this.$signOutLink = this.$headerLinks.filter("#sign-out-link");

        this.$tabPanels = $('[role="tabpanel"]');
        this.$activitiesPanel = this.$tabPanels.filter("#activities");
        this.$insightsPanel = this.$tabPanels.filter("#insights");

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
            // TODO: remove if (!location.hash.startsWith("#activities")) {
            location.hash = "activities";
            //}
        });

        this.$insightsTab.click(function (e) {
            location.hash = "insights";
        });

        this.$signOutLink.click($.proxy(this._signOut, this));

        window.onbeforeunload = $.proxy(this._confirmExit, this);
    };

    c._initRouter = function () {
        var router = new Grapnel();

        router.get("", function (req) {
            this._activateActivitiesPanel();
        }.bind(this));

        router.get("activities", function (req) {
            this._activateActivitiesPanel();
        }.bind(this));

        router.get("insights", function (req) {
            this._activateInsightsPanel();
        }.bind(this));
    };

    c._activateActivitiesPanel = function () {
        if (!this.$activitiesPanel.hasClass("active")) {
            this.$tabPanels.removeClass("active");
            this.$activitiesTab.tab('show');
            this.$activitiesPanel.addClass("active");
        }

        this.c1AndActivityFeedController.refreshData();

        this.$currentC1OrActivitySection.hide();
        this.$feedSection.show();
    };

    c._activateInsightsPanel = function () {
        if (!this.$insightsPanel.hasClass("active")) {
            this.$tabPanels.removeClass("active");
            this.$insightsTab.tab('show');
            this.$insightsPanel.addClass("active");
        }

        this.c1AndActivityFeedController.refreshData();

        this.$currentC1OrActivitySection.hide();
        this.$feedSection.show();
    };

    c._isTemporaryAccount = function () {
        return this.accountId < 0;
    };

    c._signOut = function(e) {
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

    c._confirmExit = function(e) {
        if (this._isTemporaryAccount() && CS.Controllers.Index.isUnsavedProgress) {
            return "You are about to lose your progress. You can save it by registering via the link at the top of the page.";
        }
    };

    c._isTemporaryAccount = function () {
        return this.accountId < 0;
    };
});

CS.Controllers.Index.isUnsavedProgress = false;

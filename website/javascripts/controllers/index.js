CS.Controllers.Index = P(CS.Controllers.OnePageWebapp, function (c, base) {
    c.init = function (accountId, accountEmail, accountData) {
        CS.account.id = accountId;
        CS.account.email = accountEmail;
        CS.account.data = accountData;

        CS.activityFeedController = CS.Controllers.ActivityFeed();
        this.standoutsController = CS.Controllers.Standouts();

        CS.Controllers.HeaderModal.Register();
        CS.Controllers.HeaderModal.SignIn();
        CS.Controllers.RegisterReminder();

        this._initElements();
        this.initHeaderLinks();
        this.initActivityTabText();
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

        this.$headerAlerts = $("#header-alerts");
        this.$welcomePanel = this.$headerAlerts.children("#welcome-panel");

        this.$tabPanels = $('[role="tabpanel"]');
        this.$activitiesPanel = this.$tabPanels.filter("#activit1es");
        this.$standoutsPanel = this.$tabPanels.filter("#standouts");

        this.$feedSection = this.$activitiesPanel.children("#c1-and-activity-feed");
        this.$currentActivitySection = this.$activitiesPanel.children("#current-activity");

        this.$standoutListSection = this.$standoutsPanel.children("#standout-list");
        this.$standoutDetailSection = this.$standoutsPanel.children("#standout-detail");

        this.initWelcomePanel();
    };

    c._initEvents = function () {
        this.$activitiesTab.click(function (e) {
            this.navigateTo("activities");
        }.bind(this));

        this.$standoutsTab.click(function (e) {
            this.navigateTo("insights");
        }.bind(this));

        this.$signOutLink.click($.proxy(this._signOut, this));
    };

    c.initHeaderLinks = function () {
        if (this.isTemporaryAccount()) {
            this.$headerLinks.css("display", "inline-block");
            this.$signOutLink.hide();
        } else {
            this.$headerLinks.hide();
            this.$signOutLink.show("display", "inline-block");
        }
    };

    c.initActivityTabText = function() {
        if (CS.account.data && CS.account.data.Employer && CS.account.data.Position) {
            this.$activitiesTab.html("Aktiviteter");
        } else {
            this.$activitiesTab.html("Din ansökan");
        }
    };

    c.initWelcomePanel = function () {
        if (CS.account.data && CS.account.data.Employer && CS.account.data.Position) {
            CS.Services.Animator.fadeOut(this.$welcomePanel);
        } else {
            CS.Services.Animator.fadeIn(this.$welcomePanel);
        }
    };

    c._initRouter = function () {
        CS.router.get("", function (req) {
            this._activateActivitiesPanel();
        }.bind(this));

        CS.router.get("activities", function (req) {
            this._activateActivitiesPanel();
        }.bind(this));

        CS.router.get("insights", function (req) {
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

    c._handlePanelActivated = function () {
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

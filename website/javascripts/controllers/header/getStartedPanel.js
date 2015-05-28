CS.Controllers.GetStartedPanel = P(function (c) {
    c.init = function () {
        this._initElements();
        this._initEvents();
        this._showPanelIfNeverClosed();
    };

    c._initElements = function () {
        this.$mainContainer = $("#container");
        this.$contentOverlayWhenMenuOpen = this.$mainContainer.find("#content-overlay-when-menu-open");
        this.$toggleBtn = this.$mainContainer.find("#top-bar").children(".fa-question-circle");
        this.$getStartedPanel = this.$mainContainer.find("#get-started");
    };

    c._initEvents = function () {
        this.$toggleBtn.click(this._togglePanel.bind(this));
        this.$contentOverlayWhenMenuOpen.click(this._hidePanel.bind(this));
    };

    c._showPanelIfNeverClosed = function() {
        if (!CS.account.data || !CS.account.data.hasClosedGetStartedPanel) {
            this._showPanel();
        }
    };

    c._togglePanel = function() {
        if (this.$getStartedPanel.is(":visible")) {
            this._hidePanel();
        } else {
            this._showPanel();
        }
    };

    c._showPanel = function() {
        CS.Services.Animator.fadeIn(this.$getStartedPanel, {
            animationDuration: CS.animationDuration.short,
            opacity: 0.95,
            onComplete: function() {
                this.$mainContainer.addClass("get-started-section-open");
            }.bind(this)
        });
    };

    c._hidePanel = function() {
        if (!CS.account.data || !CS.account.data.hasClosedGetStartedPanel) {
            this._fetchLatestAccountDataAndUpdateIt();
        }

        CS.Services.Animator.fadeOut(this.$getStartedPanel, {
            animationDuration: CS.animationDuration.short,
            onComplete: function() {
                this.$mainContainer.removeClass("get-started-section-open");
            }.bind(this)
        });
    };

    c._fetchLatestAccountDataAndUpdateIt = function () {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                CS.account.data.hasClosedGetStartedPanel = true;
                CS.saveAccountData();
            },
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    };
});

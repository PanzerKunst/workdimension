// This controller is seperate from the main menu because initialized by LinkedIn platform
CS.Controllers.MainMenuLinkedInAuthenticator = P(CS.Controllers.Base, function (c) {
    c.init = function () {
        this._initElements();
        this._initEvents();
    };

    c._initElements = function () {
        this.$signInWithLinkedInLink = $("#sign-in-with-linkedin");
        this.$signOutLink = $("#sign-out");
    };

    c._initEvents = function () {
        this.$signInWithLinkedInLink.click($.proxy(this._signInWithLinkedIn, this));
        this.$signOutLink.click($.proxy(this._signOut, this));
        IN.Event.on(IN, "auth", $.proxy(this._signIn, this));
    };

    c._signInWithLinkedIn = function () {
        IN.User.authorize(this._saveProfileData, this);
    };

    c._saveProfileData = function () {
        IN.API.Raw("/people/~:(id,first-name,last-name,maiden-name,formatted-name,phonetic-first-name,phonetic-last-name,formatted-phonetic-name,headline,location,industry,current-share,num-connections,num-connections-capped,summary,specialties,positions,picture-url,picture-urls::(original),site-standard-profile-request,api-standard-profile-request,public-profile-url,email-address)")
            .result(function (data) {
                this._checkIfAccountExists(data);
            }.bind(this))
            .error(function (error) {
                alert("Error while signing-in with LinkedIn: " + error);
            });
    };

    c._checkIfAccountExists = function (linkedInAccountData) {
        var type = "GET";
        var url = "/api/accounts/" + linkedInAccountData.id;

        $.ajax({
            url: url,
            type: type,
            success: function (data, textStatus, jqXHR) {
                if (jqXHR.status === this.httpStatusCode.noContent) {
                    this._createAccount(linkedInAccountData);
                }
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    };

    c._signIn = function () {
        if (this.isTemporaryAccount()) {
            IN.API.Profile("me").result(function (profiles) {
                var type = "POST";
                var url = "/api/auth?linkedinAccountId=" + profiles.values[0].id;

                $.ajax({
                    url: url,
                    type: type,
                    success: function (data, textStatus, jqXHR) {
                        if (jqXHR.status === this.httpStatusCode.ok) {
                            this._loadAccountData(data);
                        }
                    }.bind(this),
                    error: function () {
                        alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
                    }
                });
            }.bind(this));
        }
    };

    c._createAccount = function (linkedInAccountData) {
        var data = {
            emailAddress: linkedInAccountData.emailAddress.trim(),
            linkedInAccountId: linkedInAccountData.id.trim()
        };

        var type = "POST";
        var url = "/api/accounts";

        $.ajax({
            url: url,
            type: type,
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (d4ta, textStatus, jqXHR) {
                if (jqXHR.status === this.httpStatusCode.emailAlreadyRegistered) {
                    alert("Trying to create an account for an already registered email address. This is a bug!");
                } else if (jqXHR.status === this.httpStatusCode.linkedInAccountIdAlreadyRegistered) {
                    alert("Trying to create an account for an already registered LinkedIn account ID. This is a bug!");
                } else {
                    this._loadAccountData(d4ta);
                }
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    };

    c._loadAccountData = function (data) {
        CS.account.id = data.accountId;
        CS.account.data = data.accountData;

        this.$signInWithLinkedInLink.hide();
        this.$signOutLink.show();

        CS.mainMenuController.hideMenu();
        CS.blueprintAreasModel.updateStatus();
        CS.taskNotificationsController.reRender();
    };

    c._signOut = function () {
        IN.User.logout(CS.mainMenuController.signOut, this);
    };
});

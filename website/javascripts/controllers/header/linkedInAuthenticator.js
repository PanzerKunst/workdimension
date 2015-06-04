// This controller is seperate from the main menu because initialized by LinkedIn platform
CS.Controllers.MainMenuLinkedInAuthenticator = P(CS.Controllers.Base, function (c) {
    c.init = function () {
        this._initElements();
        this._initEvents();
    };

    c._initElements = function () {
        this.$signInWithLinkedInBtn = $(".sign-in-with-linkedin");
        this.$signInBtnSpan = this.$signInWithLinkedInBtn.children("span");
        this.$signInBtnSpinner = this.$signInWithLinkedInBtn.children(".fa-spinner");

        this.$signOutLink = $("#sign-out");
        this.$signInModal = $("#sign-in-modal");
    };

    c._initEvents = function () {
        this.$signInWithLinkedInBtn.click(this._signInWithLinkedIn.bind(this));
        this.$signOutLink.click(this._signOut.bind(this));
        IN.Event.on(IN, "auth", this._signIn.bind(this));

        /* TODO if (CS.Services.Browser.isIOS()) {
            CS.Services.iosWindowFocusDetector();

            document.addEventListener("iosWindowFocus", function () {
                this._signIn();
            }.bind(this), false);
        } */
    };

    c._signInWithLinkedIn = function () {
        IN.User.authorize(this._saveProfileData, this);

        ga("send", "event", "button", "click", "Sign in with linkedIn");
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
        /* TODO if (!this.isSigningIn) {
            this.isSigningIn = true; */

            if (this.isTemporaryAccount()) {
                this._spin();

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
            /* TODO }
            else {
                this.isSigningIn = false; */
            }
        //}
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

        this.$signInWithLinkedInBtn.hide();
        this.$signOutLink.show();
        this.$signInModal.modal("hide");

        CS.mainMenuController.hideMenu();

        CS.blueprintAreasModel = CS.Models.BlueprintAreas();
        CS.blueprintAreasModel.updateStatus();

        CS.taskNotificationsController.reRender();

        // TODO this.isSigningIn = false;
    };

    c._signOut = function () {
        IN.User.logout(CS.mainMenuController.signOut, this);

        ga("send", "event", "link", "click", "Sign out");
    };

    c._spin = function () {
        this.$signInBtnSpan.hide();
        this.$signInBtnSpinner.show();
    };
});

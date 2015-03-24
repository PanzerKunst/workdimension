CS.Controllers.MainMenuAuthenticator = P(CS.Controllers.Base, function (c) {
    c.init = function () {
        this._initElements();
        this._initEvents();
    };

    c._initElements = function () {
        this.$signInWithLinkedInLink = $("#sign-in-with-linked-in");
        this.$signOut = $("#sign-out");
    };

    c._initEvents = function () {
        this.$signInWithLinkedInLink.click($.proxy(this._signInWithLinkedIn, this));
        this.$signOut.click($.proxy(this._signOut, this));
    };

    c._signInWithLinkedIn = function () {
        IN.User.authorize(this._getProfileData, this);
    };

    c._signOut = function() {
        var type = "DELETE";
        var url = "/api/auth";

        $.ajax({
            url: url,
            type: type,
            success: function () {
                location.href = "/";
            },
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    };

    c._getProfileData = function () {
        IN.API.Raw("/people/~:(id,first-name,last-name,maiden-name,formatted-name,phonetic-first-name,phonetic-last-name,formatted-phonetic-name,headline,location,industry,current-share,num-connections,num-connections-capped,summary,specialties,positions,picture-url,picture-urls::(original),site-standard-profile-request,api-standard-profile-request,public-profile-url,email-address)")
            .result(function (data) {
                this._signIn(data);
            }.bind(this))
            .error(function (error) {
                alert("Error while signing-in with LinkedIn: " + error);
            });
    };

    c._signIn = function(linkedInAccountData) {
        var type = "POST";
        var url = "/api/auth?emailAddress=" + linkedInAccountData.emailAddress;

        $.ajax({
            url: url,
            type: type,
            success: function (data, textStatus, jqXHR) {
                if (jqXHR.status === this.httpStatusCode.noContent) {
                    this._createAccount(linkedInAccountData);
                } else {
                    this._loadAccountData(data);
                }
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
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

    c._loadAccountData = function(data) {
        CS.account.id = data.accountId;
        CS.account.email = data.accountEmail;
        CS.account.data = data.accountData;

        CS.blueprintAreasModel.updateStatus();

        CS.mainMenuController.toggleMenu();
    };
});

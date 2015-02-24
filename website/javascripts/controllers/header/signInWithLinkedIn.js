CS.Controllers.SignInWithLinkedIn = P(function (c) {
    c.init = function () {
        this._initElements();
        this._initEvents();
    };

    c._initElements = function () {
        this.$signInWithLinkedInLink = $(".sign-in-with-linked-in");
    };

    c._initEvents = function () {
        this.$signInWithLinkedInLink.click($.proxy(this._signIn, this));
    };


    c._signIn = function (e) {
        IN.User.authorize(this._getProfileData, this);
    };

    c._getProfileData = function () {
        IN.API.Raw("/people/~:(id,first-name,last-name,maiden-name,formatted-name,phonetic-first-name,phonetic-last-name,formatted-phonetic-name,headline,location,industry,current-share,num-connections,num-connections-capped,summary,specialties,positions,picture-url,picture-urls::(original),site-standard-profile-request,api-standard-profile-request,public-profile-url,email-address,skills)")
            .result(function (data) {
                console.log("LinkedIn user data:", data);
                alert("LinkedIn sign-in successful. Email address: " + data.emailAddress);
            })
            .error(function (error) {
                alert("Error while signing-in with LinkedIn: " + error);
            });
    };
});

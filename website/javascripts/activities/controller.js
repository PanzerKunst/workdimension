CS.Activities.Controller = P(function (c) {
    c.init = function (route, activity) {
        this.route = route;
        this.activity = activity;
        this.activity.registerController(this, this.route);
    };

    c.render = function (data) {
        if (!this.isRendered) {
            var uuid = CS.Services.guid();

            this.activity.$el.append('<div class="activity-page" id="' + uuid + '"></div>');
            this.$el = $("#" + uuid);

            React.render(
                React.createElement(this.reactClass, data),
                this.$el[0]
            );

            this.initElements();
            this.initValidation();
            this.initEvents();

            this.isRendered = true;
        }

        this.onReRender();

        this.$el.show();
    };

    c.navigateTo = function(route) {
        location.hash = route;
    };

    c.postData = function() {
        var type = "POST";
        var url = "/api/activities";

        $.ajax({
            url: url,
            type: type,
            contentType: "application/json",
            data: JSON.stringify(this.activity.model),
            success: function (data, textStatus, jqXHR) {
                CS.accountData = this.activity.model.accountData;
                location.href = "/#insights";
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                this.$submitBtn.button('reset');
                alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
            }.bind(this)
        });
    };

    // Child functions are call instead if exist
    c.initElements = function() {};
    c.initValidation = function() {};
    c.initEvents = function() {};
    c.onReRender = function() {};
});

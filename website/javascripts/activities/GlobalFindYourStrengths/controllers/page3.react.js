CS.Activities.GlobalFindYourStrengths.Controllers.Page3 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({
        render: function () {
            return (
                <form role="form">
                    <div className="form-group">
                        <label for="strength-3">My third strength is</label>
                        <input type="text" id="strength-3" className="form-control" />

                        <p className="field-error" data-check="empty"></p>
                    </div>
                    <div className="submit-wrapper">
                        <button type="submit" className="btn btn-primary" data-loading-text="Saving...">Done</button>
                    </div>
                </form>
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$strengthField = this.$form.find("#strength-3");
        this.$submitBtn = this.$form.find("[type=submit]");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength-3"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._doSubmit, this));
    };

    c.onReRender = function() {
        // The submit button may still be in loading state when navigating back. We make sure it doesn't happen
        this.$submitBtn.button('reset');
    };

    c._doSubmit = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.$submitBtn.button('loading');

            this.model.accountData.strength3 = this.$strengthField.val();

            var type = "POST";
            var url = "/api/account-activity";

            $.ajax({
                url: url,
                type: type,
                contentType: "application/json",
                data: JSON.stringify(this.model),
                success: function (data, textStatus, jqXHR) {
                    location.href = "/#insights";
                }.bind(this),
                error: function (jqXHR, textStatus, errorThrown) {
                    this.$submitBtn.button('reset');
                    alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
                }.bind(this)
            });
        }
    };
});

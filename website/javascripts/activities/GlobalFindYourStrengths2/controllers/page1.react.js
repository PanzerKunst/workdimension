CS.Activities.GlobalFindYourStrengths2.Controllers.Page1 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({
        render: function () {
            return (
                <form role="form">
                    <div className="form-group">
                        <label for="strength-4">My first über-strength is</label>
                        <input type="text" id="strength-4" className="form-control" />

                        <p className="field-error" data-check="empty"></p>
                    </div>
                    <div className="form-group">
                        <label for="strength-5">My second über-strength is</label>
                        <input type="text" id="strength-5" className="form-control" />

                        <p className="field-error" data-check="empty"></p>
                    </div>
                    <div className="form-group">
                        <label for="strength-6">My third über-strength is</label>
                        <input type="text" id="strength-6" className="form-control" />

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

        this.$strength4Field = this.$form.find("#strength-4");
        this.$strength5Field = this.$form.find("#strength-5");
        this.$strength6Field = this.$form.find("#strength-6");

        this.$submitBtn = this.$form.find("[type=submit]");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength-4",
            "strength-5",
            "strength-6"
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

            this.activity.model.accountData.strengths.strength4 = this.$strength4Field.val();
            this.activity.model.accountData.strengths.strength5 = this.$strength5Field.val();
            this.activity.model.accountData.strengths.strength6 = this.$strength6Field.val();

            this.postData();
        }
    };
});

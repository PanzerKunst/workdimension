CS.Activities.GlobalFindYourStrengths.Controllers.Page1 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({
        render: function () {
            return (
                <form role="form">
                    <div className="form-group">
                        <label for="strength-1">My first strength is</label>
                        <input type="text" id="strength-1" className="form-control" />

                        <p className="field-error" data-check="empty"></p>
                    </div>
                    <div className="submit-wrapper">
                        <button type="submit" className="btn btn-primary">Next</button>
                    </div>
                </form>
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$strengthField = this.$form.find("#strength-1");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength-1"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._doSubmit, this));
    };

    c._doSubmit = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.activity.model.accountData.strengths.strength1 = this.$strengthField.val().trim();

            this.navigateTo(this.activity.page2Controller.route);
        }
    };
});

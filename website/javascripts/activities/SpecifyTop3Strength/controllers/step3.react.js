CS.Activities.SpecifyTop3Strength.Controllers.Step3 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {
                position: null,
                employer: null
            };
        },

        render: function () {
            return (
                <form role="form">
                    <p className="well">På vilket sätt kommer det att vara en styrka i rollen som <strong>{this.state.position}</strong> på <strong>{this.state.employer}</strong>&#63;</p>

                    <div className="form-group">
                        <textarea id="strength-for-position" className="form-control"></textarea>

                        <p className="field-error" data-check="empty"></p>
                    </div>

                    <div className="submit-wrapper">
                        <button type="button" className="btn btn-default">Tillbaka</button>
                        <button type="submit" className="btn btn-primary" data-loading-text="Sparar...">Gå vidare</button>
                    </div>
                </form>
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$strengthForPositionField = this.$form.find("#strength-for-position");
        this.$goBackBtn = this.$form.find(".btn-default");
        this.$submitBtn = this.$form.find(".btn-primary");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength-for-position"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.onReRender();
    };

    c.onReRender = function () {
        // The submit button may still be in loading state when navigating back. We make sure it doesn't happen
        this.$submitBtn.button('reset');

        this.reactInstance.replaceState({
            position: this.activity.model.account.data.Position,
            employer: this.activity.model.account.data.Employer
        });
    };

    c._saveAndNavigateNext = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.$submitBtn.button("loading");

            this.activity.model.account.data.strengths[2].specify.strengthForPosition = this.$strengthForPositionField.val().trim();

            this.postData(function () {
                this.navigateTo(this.activity.outroController.route);
            }.bind(this));
        }
    };
});

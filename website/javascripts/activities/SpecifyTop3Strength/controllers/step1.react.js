CS.Activities.SpecifyTop3Strength.Controllers.Step1 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {strengthName: {}};
        },

        render: function () {
            return (
                <form role="form">
                    <p>Vi börjar med att specificera egenskapen lite mer. Vad betyder <strong>{this.state.strengthName}</strong> för dig&#63;</p>

                    <div className="form-group">
                        <textarea id="what-this-strength-means" className="form-control"></textarea>

                        <p className="field-error" data-check="empty"></p>
                    </div>

                    <div className="submit-wrapper">
                        <button type="button" className="btn btn-default">Tillbaka</button>
                        <button type="submit" className="btn btn-primary">Gå vidare</button>
                    </div>
                </form>
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$whatItMeansField = this.$form.find("#what-this-strength-means");
        this.$goBackBtn = this.$form.find(".btn-default");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "what-this-strength-means"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.onReRender();
    };

    c.onReRender = function () {
        this.reactInstance.replaceState({strengthName: this.activity.model.account.data.strengths[2].name});
    };

    c._saveAndNavigateNext = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.activity.model.account.data.strengths[2].specify.whatItMeans = this.$whatItMeansField.val().trim();

            this.navigateTo(this.activity.step2Controller.route);
        }
    };
});

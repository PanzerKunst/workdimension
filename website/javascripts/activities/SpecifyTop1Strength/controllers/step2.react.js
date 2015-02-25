CS.Activities.SpecifyTop1Strength.Controllers.Step2 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {whatItMeans: null};
        },

        render: function () {
            return (
                <form role="form">
                    <p>Gör nu definitionen till din egen. På vilket sätt stämmer det här in på dig&#63;</p>

                    <p className="well" dangerouslySetInnerHTML={{__html: this.state.whatItMeans}} />

                    <div className="form-group">
                        <textarea id="how-well-it-applies" className="form-control"></textarea>

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
        this.$howWellItAppliesField = this.$form.find("#how-well-it-applies");
        this.$goBackBtn = this.$form.find(".btn-default");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "how-well-it-applies"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.onReRender();
    };

    c.onReRender = function () {
        var whatItMeansAsHtml = CS.Services.String.textToHtml(this.activity.model.account.data.strengths[0].specify.whatItMeans);

        this.reactInstance.replaceState({whatItMeans: whatItMeansAsHtml});
    };

    c._saveAndNavigateNext = function(e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.activity.model.account.data.strengths[0].specify.howWellItApplies = this.$howWellItAppliesField.val().trim();

            this.navigateTo(this.activity.step3Controller.getRoute());
        }
    };
});

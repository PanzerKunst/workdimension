CS.Activities.IdentifyStrengths.Controllers.Step5 = P(CS.Activities.Controller, function (c) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {strengths: []};
        },

        render: function () {
            return (
                <div>
                    <h3>Toppen! Du har nu gjort en prioritering av dina starkaste egenskaper för din ansökan.</h3>

                    <p className="help-text">När du börjar skriva din ansökan är det här sannolikt dina starkaste kort att lyfta fram och vi kommer därför att prioritera dem tre i kommande aktiviteter. De övriga sparas tillsvidare.</p>

                    {this.state.strengths.map(function (strength, index) {
                        return (
                            <article>
                                <h2>{index + 1}. {strength.name}</h2>
                                <p>Stämmer <strong>{this._howWellDoesItApplyFormatter(strength.howWellItApplies)}</strong> in på dig och är <strong>{this._howImportantForEmployerformatter(strength.howImportantForEmployer)}</strong> för jobbet.</p>
                            </article>
                            );
                    }.bind(this))}

                    <div className="centered-contents">
                        <button type="button" className="btn btn-default">Tillbaka</button>
                        <button type="button" className="btn btn-primary" data-loading-text="Sparar...">Gå vidare</button>
                    </div>
                </div>
                );
        },

        _howWellDoesItApplyFormatter: function (num) {
            switch (num) {
                case 1:
                    return "sådär";
                case 2:
                    return "hyfsat";
                case 3:
                    return "ganska väl";
                case 4:
                    return "fullständigt";
            }
        },

        _howImportantForEmployerformatter: function (num) {
            switch (num) {
                case 1:
                    return "sådär";
                case 2:
                    return "viktigt";
                case 3:
                    return "en stark fördel";
                case 4:
                    return "avgörande";
            }
        }
    });

    c.initElements = function () {
        this.$goBackBtn = this.$el.find(".btn-default");
        this.$submitBtn = this.$el.find(".btn-primary");
    };

    c.initEvents = function () {
        this.$goBackBtn.click($.proxy(this.navigateBack, this));
        this.$submitBtn.click($.proxy(this._handleSubmit, this));

        this.onReRender();
    };

    c.onReRender = function () {
        this.activity.model.account.data.strengths = CS.Models.Strength.sort(this.activity.model.account.data.strengths);
        this.reactInstance.replaceState({strengths: _.take(this.activity.model.account.data.strengths, 3)});

        // The submit button may still be in loading state when navigating back. We make sure it doesn't happen
        this.$submitBtn.button("reset");
    };

    c._handleSubmit = function () {
        this.$submitBtn.button("loading");

        this.postData();
    };
});

CS.Activities.IdentifyStrengths.Controllers.Step4 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {strengths: []};
        },

        render: function () {
            var sortedStrengths = _.sortBy(this.state.strengths, function (strength) {
                return -strength.howWellItApplies - strength.howImportantForEmployer;
            });

            return (
                <div>
                    <p>Toppen! Du har nu gjort en prioritering av dina starkaste egenskaper för din ansökan.</p>

                    {sortedStrengths.map(function (strength) {
                        var paragraph = "Stämmer <strong>" + this._howWellDoesItApplyFormatter(strength.howWellItApplies) + "</strong> in på dig och är <strong>" +
                            this._howImportantForEmployerformatter(strength.howImportantForEmployer) + "</strong> för jobbet.";

                        return (
                            <article>
                                <h2>{strength.name}</h2>
                                <p dangerouslySetInnerHTML={{__html: paragraph}} />
                            </article>
                            );
                    }.bind(this))}

                    <div className="centered-contents">
                        <button type="button" className="btn btn-default">Tillbaka</button>
                        <button type="button" className="btn btn-primary">Spara</button>
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
        this.reactInstance.replaceState({strengths: this.activity.model.account.data.strengths});

        // The submit button may still be in loading state when navigating back. We make sure it doesn't happen
        this.$submitBtn.button('reset');
    };

    c._handleSubmit = function (e) {
        this.$submitBtn.button('loading');

        this.postData();
    };
});

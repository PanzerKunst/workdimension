CS.Activities.SpecifyTop1Strength.Controllers.Step4 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {data: {}};
        },

        render: function () {
            return (
                <div>
                    <p className="well">Jättebra! Du har nu definierat hur just du är <strong>{this.state.data.strengthName}</strong> och vilket värde det har för jobbet du söker.</p>

                    <h2>Definition</h2>

                    <p className="well" dangerouslySetInnerHTML={{__html: this.state.data.howWellItApplies}} />

                    <h2>Värde</h2>

                    <p className="well" dangerouslySetInnerHTML={{__html: this.state.data.strengthForPosition}} />

                    <div className="centered-contents">
                        <button type="button" className="btn btn-default">Tillbaka</button>
                        <button type="button" className="btn btn-primary">Ok</button>
                    </div>
                </div>
                );
        }
    });

    c.initElements = function () {
        this.$goBackBtn = this.$el.find(".btn-default");
        this.$goNextStepBtn = this.$el.find(".btn-primary");
    };

    c.initEvents = function () {
        this.$goBackBtn.click($.proxy(this.navigateBack, this));
        this.$goNextStepBtn.click($.proxy(this._navigateHome, this));

        this.onReRender();
    };

    c.onReRender = function () {
        var strength = this.activity.model.account.data.strengths[0];

        var howWellItAppliesAsHtml = CS.Services.String.textToHtml(strength.specify.howWellItApplies);
        var strengthForPositionAsHtml = CS.Services.String.textToHtml(strength.specify.strengthForPosition);

        this.reactInstance.replaceState({ data: {
            strengthName: strength.name,
            howWellItApplies: howWellItAppliesAsHtml,
            strengthForPosition: strengthForPositionAsHtml
        }});
    };

    c._navigateHome = function (e) {
        this.navigateTo("");
    };
});

CS.Activities.SpecifyTop2Strength.Controllers.Outro = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {
                nextActivity: null,
                strengthName: null,
                howWellItApplies: null,
                strengthForPosition: null
            };
        },

        render: function () {
            var reactKey = this.state.nextActivity ? this.state.nextActivity.getClassName() : _.uniqueId();

            return (
                <div>
                    <p className="well">Jättebra! Du har nu definierat hur just du är <strong>{this.state.strengthName}</strong> och vilket värde det har för jobbet du söker.</p>

                    <h2>Definition</h2>

                    <p className="well" dangerouslySetInnerHTML={{__html: this.state.howWellItApplies}} />

                    <h2>Värde</h2>

                    <p className="well" dangerouslySetInnerHTML={{__html: this.state.strengthForPosition}} />

                    <CS.Activities.Controller.NextStep key={reactKey} activity={this.state.nextActivity}/>
                </div>
                );
        }
    });

    c.initEvents = function () {
        this.onReRender();
    };

    c.onReRender = function () {
        var strength = this.activity.model.account.data.strengths[1];

        var howWellItAppliesAsHtml = CS.Services.String.textToHtml(strength.specify.howWellItApplies);
        var strengthForPositionAsHtml = CS.Services.String.textToHtml(strength.specify.strengthForPosition);

        this.reactInstance.replaceState({
            nextActivity: CS.activitiesModel.getNextActivity(),
            strengthName: strength.name,
            howWellItApplies: howWellItAppliesAsHtml,
            strengthForPosition: strengthForPositionAsHtml
        });
    };
});

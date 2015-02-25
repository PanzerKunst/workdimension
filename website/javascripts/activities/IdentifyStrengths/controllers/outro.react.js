CS.Activities.IdentifyStrengths.Controllers.Outro = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {
                nextActivity: null,
                firstThreeStrengths: [],
                otherStrengths: []
            };
        },

        render: function () {
            var reactKey = this.state.nextActivity ? this.state.nextActivity.getClassName() : _.uniqueId();

            return (
                <div>
                    <h3>De här egenskaperna sparas ner till dina samlade insikter så du kan börja definiera dem närmre.</h3>

                    <ol>
                        {this.state.firstThreeStrengths.map(function (strength) {
                            return (
                                <li>{strength.name}</li>
                                );
                        }.bind(this))}
                    </ol>

                    <div className="strength-taglist-container">
                        <ul className="styleless">
                            {this.state.otherStrengths.map(function (strength) {
                                return (
                                    <li>
                                        <span className="tag">
                                            <span>{strength.name}</span>
                                        </span>
                                    </li>
                                    );
                            }.bind(this))}
                        </ul>
                    </div>

                    <CS.Activities.Controller.NextStep key={reactKey} activity={this.state.nextActivity}/>
                </div>
                );
        }
    });

    c.initEvents = function () {
        this.onReRender();
    };

    c.onReRender = function () {
        this.reactInstance.replaceState({
            nextActivity: CS.activitiesModel.getNextActivity(),
            firstThreeStrengths: _.take(this.activity.model.account.data.strengths, 3),
            otherStrengths: _.drop(this.activity.model.account.data.strengths, 3)
        });
    };
});

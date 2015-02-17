CS.Activities.IdentifyStrengths.Controllers.Outro = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {strengths: []};
        },

        render: function () {
            var sortedStrengths = CS.Models.Strength.sort(this.state.strengths);

            return (
                <div>
                    <h3>Snyggt jobbat! De här egenskaperna sparas ner till dina smalade insikter och vi kan börja definiera
                    dem närmre.</h3>

                    <ol>
                        {sortedStrengths.map(function (strength) {
                            return (
                                <li>{strength.name}</li>
                                );
                        }.bind(this))}
                    </ol>

                    <section>
                        <span>Nästa steg</span>
                        <div className="centered-contents">
                        </div>
                    </section>
                </div>
                );
        }
    });
});

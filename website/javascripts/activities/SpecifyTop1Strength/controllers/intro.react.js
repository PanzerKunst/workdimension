CS.Activities.SpecifyTop1Strength.Controllers.Intro = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({
        render: function () {
            return (
                <div>
                    <h1>Stick ut från mängden</h1>

                    <p>Visste du att de tre vanligast angivna egenskaperna i jobbansökningar är kreativ, analytisk och passionerad&#63;</p>

                    <p>Vi använder ofta vaga termer när vi beskriver oss själva. Dessutom är egenskaperna som efterfrågas i jobbannonser
                    ofta ganska generiska eller tvetydigt formulerade.</p>

                    <p>I den här övningen hjälper vi dig att definiera vad en specifik egenskap ennebär för just dig och hur den kan
                    tillämpas på din roll för att kunna påvisa värdet av den för din framtida arbetsgivare.</p>

                    <div className="centered-contents">
                        <button type="button" className="btn btn-primary">Sätt igång</button>
                    </div>
                </div>
                );
        }
    });

    c.initElements = function () {
        this.$goNextStepBtn = this.$el.find(".btn-primary");
    };

    c.initEvents = function () {
        this.$goNextStepBtn.click($.proxy(this._navigateNext, this));
    };

    c._navigateNext = function (e) {
        this.activity.model.accountData.strengths[0].specify = this.activity.model.accountData.strengths[0].specify || {};

        this.navigateTo(this.activity.step1Controller.route);
    };
});

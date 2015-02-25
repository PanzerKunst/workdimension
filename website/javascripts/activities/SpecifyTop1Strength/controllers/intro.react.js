CS.Activities.SpecifyTop1Strength.Controllers.Intro = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {title: null};
        },

        render: function () {
            return (
                <div>
                    <h1 dangerouslySetInnerHTML={{__html: this.state.title}} />

                    <p>Visste du att de tre vanligast angivna egenskaperna i jobbansökningar är kreativ, analytisk och passionerad&#63;</p>

                    <p>Vi använder ofta vaga termer när vi beskriver oss själva. Dessutom är egenskaperna som efterfrågas i jobbannonser
                    ofta ganska generiska eller tvetydigt formulerade.</p>

                    <p>I den här övningen hjälper vi dig att definiera vad en specifik egenskap innebär för just dig och på vilket sätt det är en fördel för arbetsgivaren.</p>

                    <div className="centered-contents">
                        <button type="button" className="btn btn-default">Tillbaka</button>
                        <button type="button" className="btn btn-primary">Sätt igång</button>
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
        this.$goBackBtn.click($.proxy(this.nagivateToActivityFeed, this));
        this.$goNextStepBtn.click($.proxy(this._navigateNext, this));

        this.onReRender();
    };

    c.onReRender = function () {
        this.reactInstance.replaceState({title: this.activity.getTitle()});
    };

    c._navigateNext = function (e) {
        this.activity.model.account.data.strengths[0].specify = this.activity.model.account.data.strengths[0].specify || {};

        this.navigateTo(this.activity.step1Controller.getRoute());
    };
});

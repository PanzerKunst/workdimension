CS.Activities.IdentifyStrengths.Controllers.Intro = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({
        render: function () {
            return (
                <div>
                    <h1>Förstå vad de söker</h1>

                    <p>Spännande att du har funnit en annons som du vill svara på! Här hjälper vi dig att ta fram de viktigaste
                    egenskaperna som efterfrågas i annonsen samt matcha de kraven med dina egenskaper. </p>

                    <p>Genom ett antal frågeställningar och övningar hoppas vi att du kommer at få insikter om just dina egenskaper
                    och på vilket sätt de bidrar till dig sätt att vara.</p>

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
        this.$goBackBtn.click($.proxy(this.navigateBack, this));
        this.$goNextStepBtn.click($.proxy(this._navigateNext, this));
    };

    c._navigateNext = function (e) {
        this.activity.model.account.data.strengths = this.activity.model.account.data.strengths || [];

        this.navigateTo(this.activity.step1Controller.route);
    };
});

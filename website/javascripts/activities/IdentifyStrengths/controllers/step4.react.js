CS.Activities.IdentifyStrengths.Controllers.Step4 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {
                employer: null,
                position: null,
                strengths: []
            };
        },

        render: function () {
            return (
                <form role="form" className="how-well">
                    <h3>Hur viktiga tror du att <strong>{this.state.employer}</strong> tycker att de här egenskaperna är för rollen som <strong>{this.state.position}</strong>&#63;</h3>

                    {this.state.strengths.map(function (strength) {
                        return (
                            <div className="form-group">
                                <label>{strength.name}</label>
                                <input type="range" min="1" max="4" />
                            </div>
                            );
                    })}

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
        this.$rangeInputs = this.$form.find('[type="range"]');
        this.$goBackBtn = this.$form.find(".btn-default");
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.reactInstance.componentDidUpdate = function (prevProps, prevState) {
            this.initElements();
            this._initSliders();
        }.bind(this);

        this.onReRender();
    };

    c.onReRender = function () {
        this.reactInstance.replaceState({
            position: this.activity.model.account.data.Position,
            employer: this.activity.model.account.data.Employer,
            strengths: this.activity.model.account.data.strengths
        });
    };

    c._initSliders = function () {
        this.$sliders = this.$rangeInputs.slider({
            min: 1,
            max: 4,
            value: 3,
            tooltip: "always",
            formatter: function (num) {
                switch (num) {
                    case 1:
                        return "Sådär";
                    case 2:
                        return "Viktigt";
                    case 3:
                        return "En stark fördel";
                    case 4:
                        return "Avgörande";
                }
            }
        });
    };

    c._saveAndNavigateNext = function (e) {
        e.preventDefault();

        this.activity.model.account.data.strengths = this.activity.model.account.data.strengths.map(function (strength, index) {
            var howImportantForEmployer = parseInt($(this.$sliders[index]).val(), 10);

            return {
                "name": strength.name,
                "howWellItApplies": strength.howWellItApplies,
                "howImportantForEmployer": howImportantForEmployer
            };
        }.bind(this));

        this.navigateTo(this.activity.step5Controller.route);
    };
});

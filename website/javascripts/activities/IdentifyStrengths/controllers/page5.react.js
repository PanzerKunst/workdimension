CS.Activities.IdentifyStrengths.Controllers.Page5 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {strengths: []};
        },

        render: function () {
            var sortedStrengths = _.sortBy(this.state.strengths, function(strength) {
                return strength.howWellDoesItApply + strength.howImportantForEmployer;
            });

            return (
                <form role="form" className="how-well">
                    <p>Toppen! Du har nu gjort en prioritering av dina egenskaper för kommande övningar.</p>

                    {sortedStrengths.map(function (strength) {
                        return (
                            <div className="form-group">
                                <label>{strength.name}</label>
                                <input type="range" min="1" max="4" />
                            </div>
                            );
                    })}

                    <div className="submit-wrapper">
                        <button type="button" className="btn btn-default go-back">Tillbaka</button>
                        <button type="submit" className="btn btn-primary">Gå vidare</button>
                    </div>
                </form>
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$rangeInputs = this.$form.find('[type="range"]');
        this.$goBackBtn = this.$form.find(".go-back");
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.reactInstance.componentDidUpdate = function(prevProps, prevState) {
            this.initElements();
            this._initSliders();
        }.bind(this);

        this.onReRender();
    };

    c.onReRender = function() {
        this.reactInstance.replaceState({strengths: this.activity.model.accountData.strengths});
    };

    c._initSliders = function() {
        this.$sliders = this.$rangeInputs.slider({
            min: 1,
            max: 4,
            value: 3,
            tooltip: "always",
            formatter: function(num) {
                switch(num) {
                    case 1: return "Sådär";
                    case 2: return "Hyfsat";
                    case 3: return "Ganska väl";
                    case 4: return "Fullständigt";
                }
            }
        });
    };

    c._saveAndNavigateNext = function (e) {
        e.preventDefault();

        this.activity.model.accountData.strengths = this.activity.model.accountData.strengths.map(function (strength, index) {
            var howImportantForEmployer = parseInt(this.$sliders[index].val(), 10);

            return {
                "name": strength.name,
                "howWellDoesItApply": strength.howWellDoesItApply,
                "howImportantForEmployer": howImportantForEmployer
            };
        }.bind(this));

        this.navigateTo(this.activity.page4Controller.route);
    };
});

CS.Activities.IdentifyStrengths.Controllers.Step3 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {strengths: []};
        },

        render: function () {
            return (
                <form role="form" className="how-well">
                    <h3>Hur väl stämmer det här in på dig&#63;</h3>

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

        /* TODO
         this.$sliders.each(function(index, element) {
         $(element).on("change", $.proxy(this._displayCurrentSliderText, this));
         }.bind(this); */
    };

    c.onReRender = function () {
        this.reactInstance.replaceState({strengths: this.activity.model.account.data.strengths});
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
                        return "Hyfsat";
                    case 3:
                        return "Ganska väl";
                    case 4:
                        return "Fullständigt";
                }
            }
        });
    };

    /* TODO
     c._displayCurrentSliderText = function(e) {

     }; */

    c._saveAndNavigateNext = function (e) {
        e.preventDefault();

        this.activity.model.account.data.strengths = this.activity.model.account.data.strengths.map(function (strength, index) {
            var howWellItApplies = parseInt($(this.$sliders[index]).val(), 10);

            return {
                "name": strength.name,
                "howWellItApplies": howWellItApplies
            };
        }.bind(this));

        this.navigateTo(this.activity.step4Controller.getRoute());
    };
});

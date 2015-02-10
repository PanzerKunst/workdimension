CS.Activities.IdentifyStrengths.Controllers.Page2 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({
        render: function () {
            return (
                <form role="form">
                    <h1>Hur väl stämmer det här in på dig&#63;</h1>

                    {this.props.strengths.map(function (strength) {
                        return (
                            <div className="form-group">
                                <label>{strength}</label>
                                <input type="range" min="1" max="4" />
                            </div>
                            );
                    })}

                    <div className="submit-wrapper">
                        <button type="submit" className="btn btn-primary">Gå vidare</button>
                    </div>
                </form>
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$rangeInputs = this.$form.find('[type="range"]');

        this._initRangeInputs();
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
    };

    c._initRangeInputs = function() {
        this.$rangeInputs.slider({
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
        this.navigateTo(this.activity.page3Controller.route);
    };
});

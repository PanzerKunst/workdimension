CS.Activities.SpecifyTop1Strength.Controllers.Step3 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {data: {}};
        },

        render: function () {
            var paragraph = "På vilket sätt kommer det att vara en styrka i rollen som <strong>" + this.state.data.position +
                "</strong> på <strong>" + this.state.data.employer + "</strong> &#63;";

            return (
                <form role="form">
                    <p className="well" dangerouslySetInnerHTML={{__html: paragraph}} />

                    <div className="form-group">
                        <textarea id="strength-for-position" className="form-control"></textarea>

                        <p className="field-error" data-check="empty"></p>
                    </div>

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
        this.$strengthForPositionField = this.$form.find("#strength-for-position");
        this.$goBackBtn = this.$form.find(".btn-default");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength-for-position"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._saveAndNavigateNext, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));

        this.onReRender();
    };

    c.onReRender = function () {
        this.reactInstance.replaceState({ data: {
            position: this.activity.model.accountData.Position,
            employer: this.activity.model.accountData.Employer
        }});
    };

    c._saveAndNavigateNext = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.activity.model.accountData.strengths[0].specify.strengthForPosition = this.$strengthForPositionField.val().trim();

            this.postData(function() {
                this.navigateTo(this.activity.step4Controller.route);
            }.bind(this));
        }
    };
});

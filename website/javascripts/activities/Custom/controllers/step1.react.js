CS.Activities.Custom.Controllers.Step1 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {text: null};
        },

        render: function () {
            return (
                <form role="form">
                    <div className="form-group">
                        <p>{this.state.text}</p>
                        <textarea id="custom-activity-answer" className="form-control"></textarea>

                        <p className="field-error" data-check="empty"></p>
                    </div>
                    <div className="submit-wrapper">
                        <button type="submit" className="btn btn-primary" data-loading-text="Sparar...">Spara</button>
                    </div>
                </form>
                );
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$textarea = this.$form.find("#custom-activity-answer");
        this.$submitBtn = this.$form.find("[type=submit]");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "custom-activity-answer"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._handleSubmit, this));
        this.onReRender();
    };

    c.onReRender = function () {

        // TODO: remove
        console.log(this.activity.text);

        this.reactInstance.replaceState({text: CS.Services.String.textToHtml(this.activity.text)});

        // The submit button may still be in loading state when navigating back. We make sure it doesn't happen
        this.$submitBtn.button('reset');
    };

    c._handleSubmit = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.$submitBtn.button('loading');

            this.activity.model.account.data.custom[this.activity.model.className] = this.$textarea.val().trim();

            this.postData(function () {
                this.navigateTo("insights");
            }.bind(this));
        }
    };
});

CS.Activities.IdentifyStrengths.Controllers.Step1 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {data: []};
        },

        render: function () {
            return (
                <form role="form">
                    <p>Finns det några egenskaper du vill framhäva som inte direkt efterfrågas&#63;</p>

                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" id="strength" className="form-control" />
                            <span className="input-group-btn">
                                <button type="submit" className="btn btn-default">+ Lägg till</button>
                            </span>
                        </div>

                        <p className="field-error" data-check="empty"></p>
                    </div>

                    <ul className="styleless" id="strength-taglist">
                        {this.state.data.map(function (strength) {
                            return (
                                <li>
                                    <span className="tag">
                                        <span>{strength}</span>
                                        <button type="button" className="close" aria-label="Close" onClick={this._handleRemoveStrengthClick}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </span>
                                </li>
                                );
                        }.bind(this))}
                    </ul>

                    <div className="submit-wrapper">
                        <button type="button" className="btn btn-default go-back">Tillbaka</button>
                        <button type="button" className="btn btn-primary">Gå vidare</button>
                    </div>
                </form>
                );
        },

        _handleRemoveStrengthClick: function (e) {
            var $li = $(e.currentTarget).parent().parent();

            CS.Services.Animator.fadeOut($li, function () {
                $li.remove();
            });
        }
    });

    c.initElements = function () {
        this.$form = this.$el.find("form");
        this.$strengthField = this.$form.find("#strength");
        this.$strengthTagList = this.$form.find("#strength-taglist");
        this.$goBackBtn = this.$form.find(".go-back");
        this.$goNextStepBtn = this.$form.find(".btn-primary");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._addStrengthToList, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));
        this.$goNextStepBtn.click($.proxy(this._saveAndNavigateNext, this));
    };

    c._addStrengthToList = function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            var strength = this.$strengthField.val().trim();
            var data = this.reactInstance.state.data;
            data.push(strength);

            this.reactInstance.replaceState({ data: data });

            this.$strengthField.val("");
        }
    };

    c._saveAndNavigateNext = function (e) {
        // Because "map()" returns an object, see http://xahlee.info/js/js_convert_array-like.html
        this.activity.model.account.data.strengths = Array.prototype.slice.call(
            this.$strengthTagList.children().find(".tag").children("span").map(function (index) {
                return {"name": this.innerHTML};
            })
        );

        this.navigateTo(this.activity.step2Controller.route);
    };
});

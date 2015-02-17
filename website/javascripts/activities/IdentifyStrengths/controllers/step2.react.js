CS.Activities.IdentifyStrengths.Controllers.Step2 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {strengths: []};
        },

        render: function () {
            return (
                <form role="form">
                    <h3>Har du några egenskaper som är viktiga för rollen men som inte nämns i annonsen&#63;</h3>

                    <p className="help-text">Kanske har du vitsord från tidigare anställningar eller rekommendationer skrivna av andra&#63;
                    Försök lyfta egenskaper du tror skulle bidra till jobbet.</p>

                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" id="other-strength" className="form-control" placeholder="t.ex. strategisk eller socialt smidig" />
                            <span className="input-group-btn">
                                <button type="submit" className="btn btn-default">+ Lägg till</button>
                            </span>
                        </div>

                        <p className="field-error" data-check="empty"></p>
                    </div>

                    <p className="field-error other-form-error strength-already-added">Den här egenskapen har redan lagts till</p>

                    <div className="strength-taglist-container">
                        <ul className="styleless">
                            {this.state.strengths.map(function (strength) {
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
                    </div>

                    <div className="submit-wrapper">
                        <button type="button" className="btn btn-default js-go-back">Tillbaka</button>
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
        this.$strengthField = this.$form.find("#other-strength");

        this.$strengthAlreadyAddedError = this.$form.find(".strength-already-added");

        this.$strengthTagList = this.$form.find(".strength-taglist-container").children();
        this.$goBackBtn = this.$form.find(".js-go-back");
        this.$goNextStepBtn = this.$form.find(".btn-primary");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "other-strength"
        ]);
    };

    c.initEvents = function () {
        this.$form.submit($.proxy(this._addStrengthToList, this));
        this.$goBackBtn.click($.proxy(this.navigateBack, this));
        this.$goNextStepBtn.click($.proxy(this._saveAndNavigateNext, this));
    };

    c._addStrengthToList = function (e) {
        e.preventDefault();

        this.validator.hideErrorMessage(this.$strengthAlreadyAddedError);

        if (this.validator.isValid()) {
            var strength = this.$strengthField.val().trim();

            if (this._isStrengthAlreadyInList(strength)) {
                this.validator.showErrorMessage(this.$strengthAlreadyAddedError);
            } else {
                var strengths = this.reactInstance.state.strengths;
                strengths.push(strength);

                this.reactInstance.replaceState({ strengths: strengths });

                this.$strengthField.val("");
            }
        }
    };

    c._isStrengthAlreadyInList = function (strength) {
        var strengthsAlreadyInput = this.activity.model.account.data.strengths;
        for (var i = 0; i < strengthsAlreadyInput.length; i++) {
            if (strengthsAlreadyInput[i].name.toLowerCase() === strength.toLowerCase()) {
                return true;
            }
        }

        var $listItems = this.$strengthTagList.children();

        for (i = 0; i < $listItems.length; i++) {
            var span = $($listItems[i]).children().children("span")[0];
            if (span.innerHTML.toLowerCase() === strength.toLowerCase()) {
                return true;
            }
        }

        return false;
    };

    c._saveAndNavigateNext = function (e) {
        // Because jQuery's "map()" function returns an object, see http://xahlee.info/js/js_convert_array-like.html
        var strengthsToAdd = Array.prototype.slice.call(
            this.$strengthTagList.children().children().children("span").map(function (index, span) {
                return {"name": span.innerHTML};
            })
        );

        this.activity.model.account.data.strengths = _.union(this.activity.model.account.data.strengths, strengthsToAdd);

        this.navigateTo(this.activity.step3Controller.route);
    };
});

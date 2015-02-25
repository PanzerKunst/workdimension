CS.Activities.IdentifyStrengths.Controllers.Step1 = P(CS.Activities.Controller, function (c, base) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {strengths: []};
        },

        render: function () {
            return (
                <form role="form">
                    <h3>Börja med att identifiera efterfrågade egenskaper i jobbannonsen.</h3>

                    <p className="help-text">Försök hitta de egenskaper du uppfattar som allra viktigast för tjänsten.
                    Med egenskaper menas att sätta att vara, ett karaktärsdrag.</p>

                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" id="strength-in-job-add" className="form-control" placeholder="t.ex. kreativ eller resultatorienterad" />
                            <span className="input-group-btn">
                                <button type="submit" className="btn btn-default">+ Lägg till</button>
                            </span>
                        </div>

                        <p className="field-error" data-check="empty"></p>
                    </div>

                    <p className="field-error other-form-error" id="one-strength-min">Ange minst en egenskap</p>
                    <p className="field-error other-form-error strength-already-added">Den här egenskapen har redan lagts till</p>

                    <div className="strength-taglist-container">
                        <ul className="styleless">
                            {this.state.strengths.map(function (strength) {
                                return (
                                    <li>
                                        <span className="tag with-close-btn">
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
        this.$strengthField = this.$form.find("#strength-in-job-add");

        this.$oneStrengthMinError = this.$form.find("#one-strength-min");
        this.$strengthAlreadyAddedError = this.$form.find(".strength-already-added");

        this.$strengthTagList = this.$form.find(".strength-taglist-container").children();
        this.$goBackBtn = this.$form.find(".js-go-back");
        this.$goNextStepBtn = this.$form.find(".btn-primary");
    };

    c.initValidation = function () {
        this.validator = CS.Services.Validator([
            "strength-in-job-add"
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
            this.validator.hideErrorMessage(this.$oneStrengthMinError);

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

    c._isThereAtLeastOneStrengthInList = function ($l1stItems) {
        var $listItems = $l1stItems || this.$strengthTagList.children();

        return $listItems && $listItems.length > 0;
    };

    c._isStrengthAlreadyInList = function (strength) {
        var $listItems = this.$strengthTagList.children();

        if (!this._isThereAtLeastOneStrengthInList($listItems)) {
            return false;
        }

        for (var i = 0; i < $listItems.length; i++) {
            var span = $($listItems[i]).children().children("span")[0];
            if (span.innerHTML.toLowerCase() === strength.toLowerCase()) {
                return true;
            }
        }

        return false;
    };

    c._saveAndNavigateNext = function (e) {
        if (!this._isThereAtLeastOneStrengthInList()) {
            this.validator.showErrorMessage(this.$oneStrengthMinError);
        } else {
            // Because jQuery's "map()" function returns an object, see http://xahlee.info/js/js_convert_array-like.html
            this.activity.model.account.data.strengths = Array.prototype.slice.call(
                this.$strengthTagList.children().children().children("span").map(function (index, span) {
                    return {"name": span.innerHTML};
                })
            );

            this.navigateTo(this.activity.step2Controller.getRoute());
        }
    };
});

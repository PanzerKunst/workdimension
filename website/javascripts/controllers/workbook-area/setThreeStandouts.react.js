CS.Controllers.SetThreeStandouts = React.createClass({
    render: function () {
        return (
            <div>
                <a id="set-three-standouts-link" onClick={this._handleSetThreeStandoutsClick}>Three standouts</a>

                <form onSubmit={this._handleFormSubmit} ref="form">
                    <div className="form-group">
                        <input type="text" className="form-control" id="first-standout" maxLength="256" />

                        <p className="field-error" data-check="empty" />
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" id="second-standout" maxLength="256" />

                        <p className="field-error" data-check="empty" />
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" id="third-standout" maxLength="256" />

                        <p className="field-error" data-check="empty" />
                    </div>

                    <div className="centered-contents">
                        <button className="btn btn-warning">Communicate as the three standouts</button>
                    </div>
                </form>
            </div>
            );
    },

    componentDidMount: function () {
        this._initElements();
        this._initValidation();
    },

    _initElements: function () {
        this.$form = $(React.findDOMNode(this.refs.form));
        this.$firstStandoutField = this.$form.find("#first-standout");
        this.$secondStandoutField = this.$form.find("#second-standout");
        this.$thirdStandoutField = this.$form.find("#third-standout");

        this.$addCustomTaskLink = $("#add-custom-task-link");
    },

    _initValidation: function() {
        this.validator = CS.Services.Validator([
            "first-standout",
            "second-standout",
            "third-standout"
        ]);
    },

    _handleSetThreeStandoutsClick: function () {
        this.$form.toggle();
        this.$addCustomTaskLink.toggle();
    },

    _handleFormSubmit: function (e) {
        if (e) {
            e.preventDefault();
        }

        if (this.validator.isValid()) {
            var firstStandout = this.$firstStandoutField.val().trim();
            var secondStandout = this.$secondStandoutField.val().trim();
            var thirdStandout = this.$thirdStandoutField.val().trim();

            this._fetchLatestAccountDataAndUpdateIt(firstStandout, secondStandout, thirdStandout);
        }
    },

    _fetchLatestAccountDataAndUpdateIt: function(firstStandout, secondStandout, thirdStandout) {
        var type = "GET";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            success: function (data) {
                CS.account.data = data || {};

                CS.account.data.standouts = CS.account.data.standouts || {};

                CS.account.data.standouts[this.props.workbookArea.className] = [
                    firstStandout,
                    secondStandout,
                    thirdStandout
                ];

                CS.saveAccountData(function() {
                    this.$form[0].reset();

                    this.$form.hide();
                    this.$addCustomTaskLink.show();
                }.bind(this));

                this.props.controller.reRender();
            }.bind(this),
            error: function () {
                alert("AJAX failure doing a " + type + " request to \"" + url + "\"");
            }
        });
    }
});

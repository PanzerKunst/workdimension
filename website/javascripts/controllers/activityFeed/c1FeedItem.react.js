CS.Controllers.C1FeedItem = React.createClass({
    getInitialState: function() {
        return {inputValue: CS.accountData ? CS.accountData[this._getClassName()] : null};
    },

    render: function () {
        var liClasses = React.addons.classSet({
            "well": true,
            "done": CS.accountData && CS.accountData[this._getClassName()]
        });

        var buttonText = CS.accountData && CS.accountData[this._getClassName()] ? "Ändra" : "Spara";

        return (
            <li className={liClasses} onSubmit={this._handleSubmit}>
                <form role="form" id={this._getFormId()}>
                    <div className="form-group">
                        <label for={this._getClassName()}>{this.props.c1.instance.getTitle()}</label>
                        <input type="text" id={this._getClassName()} className="form-control" value={this.state.inputValue} onChange={this._handleValueChange} />

                        <p className="field-error" data-check="empty"></p>
                    </div>
                    <div className="submit-wrapper">
                        <button type="submit" className="btn btn-primary" data-loading-text="Sparar...">{buttonText}</button>
                    </div>
                </form>
            </li>
            );
    },

    _getClassName: function () {
        return this.props.c1.instance.getClassName();
    },

    _getFormId: function () {
        return this._getClassName() + "-input-form";
    },

    componentDidMount: function (prevProps, prevState) {
        this.accountData = CS.accountData || {};

        this._initElements();
        this._initValidation();
    },

    _initElements: function () {
        this.$form = $("#" + this._getFormId());
        this.$inputField = this.$form.find("#" + this._getClassName());
        this.$submitBtn = this.$form.find("[type=submit]");
    },

    _initValidation: function () {
        this.validator = CS.Services.Validator([
            this._getClassName()
        ]);
    },

    _handleValueChange: function(e) {
        this.setState({inputValue: e.target.value});
    },

    _handleSubmit: function (e) {
        e.preventDefault();

        if (this.validator.isValid()) {
            this.$submitBtn.button('loading');

            this.accountData[this._getClassName()] = this.$inputField.val().trim();

            var type = "POST";
            var url = "/api/account-data";

            $.ajax({
                url: url,
                type: type,
                contentType: "application/json",
                data: JSON.stringify(this.accountData),
                success: function (data, textStatus, jqXHR) {
                    location.reload();
                }.bind(this),
                error: function (jqXHR, textStatus, errorThrown) {
                    this.$submitBtn.button('reset');
                    alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
                }.bind(this)
            });
        }
    }
});

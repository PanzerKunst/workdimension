CS.Standouts.Strengths.Controllers.Details = P(CS.Controllers.OnePageWebapp, function (c, base) {
    c.reactClass = React.createClass({
        render: function () {
            return (
                <div>
                    <h1>{this.props.strengthName}</h1>

                    <article className="well">
                        <p>Snyggt! Styrkan är nu mer än bara ett ord. Här är hur du har beskrivit den:</p>

                        <p>
                            <em dangerouslySetInnerHTML={{__html: this.props.howWellItApplies}} />
                        </p>
                    </article>

                    <article className="well">
                        <p>Bra! Du visat hur den här styrkan kan påverka företaget på ett positivt sätt. Här är vad du har kommit fram till:</p>

                        <p>
                            <em dangerouslySetInnerHTML={{__html: this.props.strengthForPosition}} />
                        </p>
                    </article>

                    <div className="centered-contents">
                        <button type="button" className="btn btn-primary">
                            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                        Tillbaka</button>
                        <button type="button" className="btn btn-default">
                            <span className="glyphicon glyphicon-repeat" aria-hidden="true"></span>
                        Gör om aktiviteten</button>
                        <button type="button" className="btn btn-warning" data-loading-text="Tar bort...">
                            <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                        Ta bort styrkan</button>
                    </div>
                </div>
                );
        }
    });

    c.init = function (route, standout) {
        this.route = route;
        this.standout = standout;

        this.$el = $("#standout-detail");
    };

    c.render = function () {
        // TODO: FIX - this if statement shouldn't be necessary, as this.standout.detailData should always exist
        // Maybe linked to https://github.com/EngineeringMode/Grapnel.js/issues/26
        if (this.standout.detailData) {
            console.log("this.standout.detailData NOT NULL");

            var strength = this.standout.detailData.strength;

            var reactData = {
                strengthName: strength.name,
                howWellItApplies: CS.Services.String.textToHtml(strength.specify.howWellItApplies),
                strengthForPosition: CS.Services.String.textToHtml(strength.specify.strengthForPosition)
            };

            // This is to avoid duplicate event bindings - TODO, and probably linked to https://github.com/EngineeringMode/Grapnel.js/issues/26
            this.$el.empty();

            this.reactInstance = React.render(
                React.createElement(this.reactClass, reactData),
                this.$el[0]
            );

            this._initElements();
            this._initEvents();

            $("#standout-list").hide();
            this.$el.show();
        } else {
            console.log("this.standout.detailData NULL");
        }
    };

    c._initElements = function () {
        // TODO: avoid duplication in the inList controller
        this.$headerNav = $('[role="navigation"]');
        this.$activitiesTab = this.$headerNav.find("#activities-tab");

        this.$tabPanels = $('[role="tabpanel"]');
        this.$activitiesPanel = this.$tabPanels.filter("#activities");

        this.$goBackBtn = this.$el.find(".btn-primary");
        this.$redoActivityBtn = this.$el.find(".btn-default");
        this.$removeStrengthBtn = this.$el.find(".btn-warning");
    };

    c._initEvents = function () {
        this.$goBackBtn.click($.proxy(this.navigateBack, this));
        this.$redoActivityBtn.click($.proxy(this._activateActivitiesTabAndNavigateToActivity, this));
        this.$removeStrengthBtn.click($.proxy(this._removeStrengthAndNavigateBack, this));
    };

    c._activateActivitiesTabAndNavigateToActivity = function(e) {
        this.navigateTo("activities/SpecifyTop" + (this.standout.detailData.strengthIndex + 1) + "Strength");

        this.$tabPanels.removeClass("active");
        this.$activitiesTab.tab('show');
        this.$activitiesPanel.addClass("active");
        $("#c1-and-activity-feed").hide();
        $("#current-activity").show();
    };

    c._removeStrengthAndNavigateBack = function () {
        var accountData = _.clone(CS.account.data, true);

        accountData.strengths.splice(this.standout.detailData.strengthIndex, 1);

        this.$removeStrengthBtn.button('loading');

        var type = "POST";
        var url = "/api/account-data";

        $.ajax({
            url: url,
            type: type,
            contentType: "application/json",
            data: JSON.stringify(accountData),
            success: function (data, textStatus, jqXHR) {
                CS.account.data = accountData;
                this.navigateBack();
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                this.$removeStrengthBtn.button('reset');
                alert('AJAX failure doing a ' + type + ' request to "' + url + '"');
            }.bind(this)
        });
    };
});

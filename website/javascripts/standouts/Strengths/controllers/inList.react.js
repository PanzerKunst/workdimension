CS.Standouts.Strengths.Controllers.InList = P(CS.Controllers.OnePageWebapp, function (c, base) {
    c.reactClass = React.createClass({
        render: function () {
            var employerAndPosition;
            if (this.props.employer && this.props.position) {
                employerAndPosition = (
                    <h1>{this.props.position} på {this.props.employer}</h1>
                    );
            }

            var sections = this.props.strengths.map(function (strength) {
                if (strength.specify) {
                    return [(
                        <section className="section-top with-specify">
                            <h2>{strength.name}</h2>
                            <button className="btn btn-default btn-xs">Detaljer</button>
                        </section>
                        ), (
                        <section className="section-bottom">
                            <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                            <span>Definition</span>
                            <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                            <span>Värde</span>
                        </section>
                        )];
                } else {
                    return [(
                        <section className="section-top">
                            <h2>{strength.name}</h2>
                        </section>
                        ), (
                        <section className="section-bottom centered-contents">
                            <button className="btn btn-primary btn-xs">Börja utforska</button>
                        </section>
                        )];
                }
            });

            return _.isEmpty(this.props.strengths) ?
                (
                    <h3>Gör styrka aktiviteter för att få insikter!</h3>
                    ) : (
                <div>
                    <div className="alert alert-info">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>

                        <h2>Styrkor</h2>

                        <p>Alla styrkor som du har hittat sparas här.</p>

                        <p>Varje styrka har ett kort som kan öppnas upp för att visa hur du har definierat styrkan och vilket värde den kan tillföra föreget.</p>

                        <p>Om styrkan har hittats men inte definierats så sparas den också här så du ser vad du ska jobba vidare med!</p>
                    </div>

                    {employerAndPosition}

                    <p>Detta är dina främsta styrkor för rollen.</p>

                    {sections.map(function (section, index) {
                        return (<article data-strength-index={index}>{section}</article>);
                    })}
                </div>
                );
        }
    });

    c.init = function (standout) {
        this.standout = standout;

        this.$el = $("#" + this.standout.className);

        this.render();
    };

    c.render = function () {
        this.strengths = CS.account.data && !_.isEmpty(CS.account.data.strengths) ?
            CS.account.data.strengths :
            [];

        var data = {
            employer: CS.account.data && CS.account.data.Employer,
            position: CS.account.data && CS.account.data.Position,
            strengths: this.strengths
        };

        // This is to avoid duplicate event bindings - TODO, and probably linked to https://github.com/EngineeringMode/Grapnel.js/issues/26
        this.$el.empty();

        this.reactInstance = React.render(
            React.createElement(this.reactClass, data),
            this.$el[0]
        );

        this._initElements();
        this._initEvents();
    };

    c._initElements = function () {
        this.$headerNav = $('[role="navigation"]');
        this.$activitiesTab = this.$headerNav.find("#activities-tab");

        this.$tabPanels = $('[role="tabpanel"]');
        this.$activitiesPanel = this.$tabPanels.filter("#activit1es");

        this.$alert = this.$el.find(".alert");

        this.$detailsBtn = this.$el.find(".btn-xs");
        this.$startExploringBtn = this.$el.find(".btn-primary");

        this._displayAlertIfNeverClosed();
    };

    c._initEvents = function () {
        this.$alert.on('close.bs.alert', $.proxy(this._onAlertClose, this));
        this.$detailsBtn.click($.proxy(this._showDetails, this));
        this.$startExploringBtn.click($.proxy(this._activateActivitiesTabAndNavigateToActivity, this));
    };

    c._displayAlertIfNeverClosed = function() {
        if (!this.getFromLocalStorage("is-strengths-explanation-alert-closed")) {
            CS.Services.Animator.fadeIn(this.$alert);
        }
    };

    c._onAlertClose = function(e) {
        e.preventDefault();

        CS.Services.Animator.fadeOut(this.$alert);
        this.saveInLocalStorage("is-strengths-explanation-alert-closed", true);
    };

    c._showDetails = function (e) {
        var $article = $(e.currentTarget).parent().parent();

        var strengthIndex = parseInt($article.data("strength-index"), 10);

        this.standout.detailData = {
            strengthIndex: strengthIndex,
            strength: this.strengths[strengthIndex]
        };

        this.navigateTo(this.standout.detailsController.route);
    };

    c._activateActivitiesTabAndNavigateToActivity = function (e) {
        var $article = $(e.currentTarget).parent().parent();

        var sortedStrengthIndex = parseInt($article.data("strength-index"), 10);

        this.navigateTo("activities/SpecifyTop" + (sortedStrengthIndex + 1) + "Strength");

        this.$tabPanels.removeClass("active");
        this.$activitiesTab.tab('show');
        this.$activitiesPanel.addClass("active");
        $("#c1-and-activity-feed").hide();
        $("#current-activity").show();
    };
});

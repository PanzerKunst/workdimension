CS.Standouts.Strengths.Controllers.InList = P(function (c) {
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
                        <section className="section-bottom">
                            <button className="btn btn-primary">Börja utforska</button>
                        </section>
                        )];
                }
            });

            return _.isEmpty(this.props.strengths) ?
                (
                    <div></div>
                    ) : (
                <div>
                    {employerAndPosition}

                    <p>Detta är dina främsta styrkor för rollen.</p>

                    {sections.map(function (section) {
                        return (<article>{section}</article>);
                    })}
                </div>
                );
        }
    });

    c.init = function (className, detailsController) {
        this.detailsController = detailsController;

        this.$el = $("#" + className);

        this.render(className);
    };

    c.render = function (className) {
        var data = {
            employer: CS.account.data && CS.account.data.Employer,
            position: CS.account.data && CS.account.data.Position,
            strengths: CS.account.data && CS.account.data.strengths ?
                CS.Models.Strength.sort(CS.account.data.strengths) :
                []
        };

        this.reactInstance = React.render(
            React.createElement(this.reactClass, data),
            document.getElementById(className)
        );

        this._initElements();
        this._initEvents();
    };

    c._initElements = function () {
        this.$detailsBtn = this.$el.find(".btn-xs");
    };

    c._initEvents = function () {
        this.$detailsBtn.click($.proxy(this._showDetails, this));
    };

    c._showDetails = function () {
        location.hash = this.detailsController.route;
    };
});

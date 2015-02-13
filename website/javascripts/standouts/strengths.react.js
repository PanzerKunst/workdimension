CS.Standouts.Strengths = P(CS.Standouts.Base, function (c, base) {
    c.reactClass = React.createClass({
        render: function () {
            var employerAndPosition;
            if (this.props.employer && this.props.position) {
                employerAndPosition = (
                    <h1>{this.props.position}&nbsp;på&nbsp;{this.props.employer}</h1>
                    );
            }

            var sections = this.props.strengths.map(function (strength) {
                if (strength.specify) {
                    return [(
                        <section className="section-top with-specify">
                            <h2>{strength.name}</h2>
                            <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                        </section>
                        ), (
                        <section className="section-bottom">
                            <span>
                                <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                            Definition</span>
                            <span>
                                <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                            Värde</span>
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

            return (
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

    c.init = function (className) {
        base.init.call(this, className);
    };

    c.render = function () {
        var data = {
            employer: CS.account.data.Employer,
            position: CS.account.data.Position,
            strengths: CS.account.data && CS.account.data.strengths ?
                CS.Models.Strength.sort(CS.account.data.strengths) :
                null
        };

        base.render.call(this, data);
    };
});

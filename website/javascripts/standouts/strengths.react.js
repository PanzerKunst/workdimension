CS.Standouts.Strengths = P(CS.Standouts.Base, function (c, base) {
    c.reactClass = React.createClass({
        render: function () {
            var titleContent = this.props.email ? this.props.email : "Anonymous user";

            return (
                <div>
                    <h2>{titleContent}</h2>
                </div>
                );
        }
    });

    c.init = function (className) {
        base.init.call(this, className);
    };

    c.render = function () {
        var data = {
            email: CS.account.email,
            strengths: CS.account.data && CS.account.data.strengths ? CS.account.data.strengths.map(function (strength) {
                return strength.name;
            }) :
                null
        };

        base.render.call(this, data);
    };
});

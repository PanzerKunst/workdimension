CS.Standouts.Strengths = P(CS.Standouts.Base, function (c, base) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {
                strengths: []
            };
        },

        render: function () {
            return (
                <ul className="styleless">
                    {this.state.strengths.map(function (strength) {
                        return <li>{strength.name}</li>;
                    })}
                </ul>
                );
        }
    });

    c.init = function (className) {
        base.init.call(this, className);
    };

    c.reRender = function() {
        this.initModel();

        var strengths = this.model.account.data.strengths;

        if (!_.isEmpty(strengths)) {
            this.$emptyStandoutsMessage.hide();
        }

        this.reactInstance.replaceState({
            strengths: strengths
        });
    };
});

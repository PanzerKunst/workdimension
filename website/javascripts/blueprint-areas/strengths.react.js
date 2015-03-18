CS.BlueprintAreas.Strengths = P(CS.BlueprintAreas.Base, function (c, base) {
    c.reactClass = React.createClass({
        getInitialState: function () {
            return {
                controller: null,
                strengths: []
            };
        },

        render: function () {
            return (
                <CS.BlueprintAreas.Area controller={this.state.controller} items={this.state.strengths} />
                );
        }
    });

    c.init = function (className, title) {
        base.init.call(this, className, title);
    };

    c.reRender = function() {
        base.reRender.call(this);

        var strengths = CS.account.data ? CS.account.data.strengths : [];

        this.getReactInstance().replaceState({
            controller: this,
            strengths: strengths
        });
    };
});

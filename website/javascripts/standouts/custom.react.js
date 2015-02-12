CS.Standouts.Custom = P(CS.Standouts.Base, function (c, base) {
    c.reactClass = React.createClass({
        render: function () {
            return (
                <div>
                    <h2>{this.props.title}</h2>
                    <p>{this.props.data}</p>
                </div>
                );
        }
    });

    c.init = function (className, title) {
        base.init.call(this, className);

        this.title = title;
    };

    c.render = function () {
        var data = null;

        if (CS.account.data && CS.account.data.custom) {
            data = CS.account.data.custom[this.className];
        }

        base.render.call(this, {
            title: this.title,
            data: data
        });
    };
});

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

    c.init = function (className, title, accountDataKey) {
        base.init.call(this, className);

        this.className = className;
        this.title = title;
        this.accountDataKey = accountDataKey;
    };

    c.render = function () {
        base.render.call(this, {
            title: this.title,
            data: CS.accountData.custom[this.accountDataKey]
        });
    };
});

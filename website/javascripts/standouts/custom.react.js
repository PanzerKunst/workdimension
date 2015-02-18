CS.Standouts.Custom = P(function (c) {
    c.reactClass = React.createClass({
        render: function () {
            return (
                <div className="well">
                    <h2>{this.props.title}</h2>
                    <p dangerouslySetInnerHTML={{__html: this.props.data}} />
                </div>
                );
        }
    });

    c.init = function (className, title) {
        this.className = className;
        this.title = title;
    };

    c.run = function () {
        var data = null;

        if (CS.account.data && CS.account.data.custom && CS.account.data.custom[this.className]) {
            data = CS.Services.String.textToHtml(CS.account.data.custom[this.className]);

            this._render(data);
        }
    };

    c._render = function (data) {
        this.reactInstance = React.render(
            React.createElement(this.reactClass, {
                title: this.title,
                data: data
            }),
            document.getElementById(this.className)
        );
    };
});

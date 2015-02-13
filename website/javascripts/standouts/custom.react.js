CS.Standouts.Custom = P(function (c) {
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
        this.className = className;
        this.title = title;
    };

    c.render = function () {
        var data = null;

        if (CS.account.data && CS.account.data.custom) {
            data = CS.account.data.custom[this.className];
        }

        this.reactInstance = React.render(
            React.createElement(this.reactClass, {
                title: this.title,
                data: data
            }),
            document.getElementById(this.className)
        );
    };

    c.run = function() {
        this.render();
    };
});

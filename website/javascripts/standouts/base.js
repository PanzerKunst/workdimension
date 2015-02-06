CS.Standouts = {};

CS.Standouts.Base = P(function (c) {
    c.init = function (className) {
        this.className = className;
    };

    c.render = function (data) {
        this.reactInstance = React.render(
            React.createElement(this.reactClass, data),
            document.getElementById(this.className)
        );
    };
});

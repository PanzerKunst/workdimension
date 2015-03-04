CS.Standouts = {};

CS.Standouts.Base = P(function (c) {
    c.$emptyStandoutsMessage = $("#empty-standouts-message");

    c.init = function (className) {
        this.className = className;

        this.$el = $("#standouts").find("#" + this.className + "-standout-wrapper");

        this._render();
    };

    c.getClassName = function () {
        return this.className;
    };

    c.getReactInstance = function() {
        return this.reactInstance;
    };

    c.initModel = function() {
        this.model = {
            account: {
                data: _.clone(CS.account.data, true) || {}
            }
        };
    };

    c._render = function() {
        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$el[0]
        );
    };
});

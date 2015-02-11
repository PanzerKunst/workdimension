CS.C1s.Base = P(function (c) {
    c.init = function (className, title) {
        this.className = className;
        this.title = title;
    };

    c.getClassName = function() {
        return this.className;
    };

    c.getTitle = function() {
        return this.title;
    };
});

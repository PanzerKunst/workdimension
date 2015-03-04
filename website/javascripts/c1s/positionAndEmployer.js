CS.C1s.PositionAndEmployer = P(CS.C1s.Base, function (c, base) {
    c.init = function (className, title) {
        base.init.call(this, className, title);
    };
});

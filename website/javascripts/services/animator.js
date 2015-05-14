CS.Services.Animator = {
    fadeIn: function ($el, params) {
        if (!$el.is(":visible")) {
            var animationDuration = params && _.isNumber(params.animationDuration) ? params.animationDuration : CS.defaultAnimationDuration;

            TweenLite.set($el, {display: "block", alpha: 0});
            TweenLite.to($el, animationDuration, {alpha: 1});
        }
    },
    fadeOut: function ($el, params) {
        if ($el.is(":visible")) {
            var animationDuration = params && _.isNumber(params.animationDuration) ? params.animationDuration : CS.defaultAnimationDuration;

            TweenLite.to($el, animationDuration, {
                alpha: 0,
                onComplete: function () {
                    $el.hide().css("opacity", 1);
                    if (params && _.isFunction(params.onComplete)) {
                        params.onComplete();
                    }
                }
            });
        }
    }
};

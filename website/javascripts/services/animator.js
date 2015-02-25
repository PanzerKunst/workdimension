CS.Services.Animator = {
    fadeIn: function ($el) {
        if (!$el.is(":visible")) {
            TweenLite.set($el, {display: "block", alpha: 0});
            TweenLite.to($el, CS.defaultAnimationDuration, {alpha: 1});
        }
    },
    fadeOut: function ($el, onComplete) {
        if ($el.is(":visible")) {
            TweenLite.to($el, CS.defaultAnimationDuration, {
                alpha: 0,
                onComplete: function () {
                    if (onComplete) {
                        onComplete();
                    } else {
                        $el.hide();
                    }
                }
            });
        }
    }
};

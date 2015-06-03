CS.Services.iosWindowFocusDetector = P(function (c) {
    c.timestamp = new Date().getTime();

    c.init = function () {
        window.setInterval(this.checkResume, 50);
    };

    c.checkResume = function () {
        var current = new Date().getTime();

        if (current - this.timestamp > 3000) {
            var event = document.createEvent("Events");
            event.initEvent("iosWindowFocus", true, true);
            document.dispatchEvent(event);
        }

        this.timestamp = current;
    };
});

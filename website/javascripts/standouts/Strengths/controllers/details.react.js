CS.Standouts.Strengths.Controllers.Details = P(function (c) {
    c.reactClass = React.createClass({
        render: function () {
            return (
                <div>
                    Details
                </div>
                );
        }
    });

    c.init = function (route) {
        this.route = route;
    };

    c.render = function () {
        var data = {
        };

        this.reactInstance = React.render(
            React.createElement(this.reactClass, data),
            document.getElementById("standout-detail")
        );

        $("#standout-list").hide();
        $("#standout-detail").show();
    };
});

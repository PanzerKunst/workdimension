CS.Controllers.ActivityFeedItem = React.createClass({
    render: function () {
        var liClasses = React.addons.classSet({
            "well": true,
            "done": this.props.c1OrActivity.isDone
        });

        var buttonText = this.props.c1OrActivity.isDone ? "Restart" : "Start";

        return (
            <li className={liClasses}>
                <h2>{this.props.c1OrActivity.title}</h2>
                <button className="btn btn-default" onClick={this._handleClick}>{buttonText}</button>
            </li>
            );
    },
    
    _handleClick: function (e) {
        var instance = this.props.c1OrActivity.instance;

        instance.preLaunch();

        location.hash = "activities/" + instance.getClassName();

        $("#c1-and-activity-feed").hide();
        $("#current-c1-or-activity").show();
    }
});

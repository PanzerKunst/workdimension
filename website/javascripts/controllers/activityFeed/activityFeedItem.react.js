CS.Controllers.ActivityFeedItem = React.createClass({
    render: function () {
        var liClasses = React.addons.classSet({
            "well": true,
            "done": this.props.activity.isDone
        });

        var buttonText = this.props.activity.isDone ? "Starta om" : "Starta";

        return (
            <li className={liClasses}>
                <h2>{this.props.activity.instance.getTitle()}</h2>
                <button className="btn btn-default" onClick={this._handleClick}>{buttonText}</button>
            </li>
            );
    },
    
    _handleClick: function (e) {
        var instance = this.props.activity.instance;

        instance.preLaunch();

        location.hash = "activities/" + instance.getClassName();

        $("#c1-and-activity-feed").hide();
        $("#current-c1-or-activity").show();
    }
});

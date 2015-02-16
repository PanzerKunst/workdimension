CS.Controllers.ActivityFeedItem = React.createClass({
    render: function () {
        var liClasses = React.addons.classSet({
            "well": true,
            "done": this.props.activity.isDone
        });

        var buttonText = this.props.activity.isDone ? "Gör om" : "Gör detta";

        return (
            <li className={liClasses}>
                <h2>{this.props.activity.instance.getTitle()}</h2>
                <div className="centered-contents">
                    <button className="btn btn-primary" onClick={this._handleClick}>{buttonText}</button>
                </div>
            </li>
            );
    },
    
    _handleClick: function (e) {
        var instance = this.props.activity.instance;

        location.hash = "activities/" + instance.getClassName();

        $("#c1-and-activity-feed").hide();
        $("#current-activity").show();
    }
});

CS.Controllers.C1OrActivityFeedItem = React.createClass({
    render: function () {
        var liClasses = React.addons.classSet({
            "well": true,
            "done": this.props.c1OrActivity.isDone
        });

        var buttonText = this.props.c1OrActivity.isDone ? "Restart" : "Start";

        return (
            <li className={liClasses}>
                <h2>{this.props.c1OrActivity.name}</h2>
                <button onClick={this._handleClick}>{buttonText}</button>
            </li>
            );
    },
    
    _handleClick: function (e) {
        if (this._isC1(this.props.c1OrActivity)) {
            var c1 = this.props.c1OrActivity.model;
            var c1ClassName = c1.c1.className;

            if (_.isFunction(CS.C1s[c1ClassName])) {
                CS.C1s[c1ClassName]().initC1(c1);
            } else {
                CS.C1s[c1ClassName].initC1(c1);
            }

            location.hash = "c1s/" + c1ClassName;
        } else {
            var activity = this.props.c1OrActivity.model;

            if (_.isFunction(CS.Activities[activity.className])) {
                CS.Activities[activity.className]().initActivity(activity);
            } else {
                CS.Activities[activity.className].initActivity(activity);
            }

            location.hash = "activities/" + activity.className;
        }
        $("#c1-and-activity-feed").hide();
        $("#current-c1-or-activity").show();

        CS.Controllers.Index.isUnsavedProgress = true;
    },
    
    _isC1: function (c1OrActivity) {
        return c1OrActivity.model.c1 !== undefined;
    }
});

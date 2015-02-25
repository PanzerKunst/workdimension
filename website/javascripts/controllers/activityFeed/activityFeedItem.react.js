CS.Controllers.ActivityFeedItem = React.createClass({
    render: function () {
        var liClasses = React.addons.classSet({
            "well": true,
            "done": this.props.activity.isDone
        });

        var buttonText = this.props.activity.isDone ? "Gör om" : this.props.activity.buttonText;

        return (
            <li className={liClasses}>
                <h2 dangerouslySetInnerHTML={{__html: this.props.activity.instance.getTitle()}} />

                <p className="help-text" dangerouslySetInnerHTML={{__html: this.props.activity.instance.getDescription()}} />

                <div className="centered-contents">
                    <button className="btn btn-primary" onClick={this._handleClick}>{buttonText}</button>
                </div>
            </li>
            );
    },

    _handleClick: function () {
        location.hash = "activities/" + this.props.activity.instance.getClassName();
    }
});

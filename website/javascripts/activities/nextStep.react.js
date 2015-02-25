CS.Activities.Controller.NextStep = React.createClass({
    render: function () {
        var markup = null;

        if (this.props.activity) {
            markup = (
                <div>
                    <section className="alert alert-info">
                        <div className="centered-contents">
                            <p>Nästa steg</p>

                            <h3 dangerouslySetInnerHTML={{__html: this.props.activity.getTitle()}} />

                            <div className="centered-contents">
                                <button type="button" className="btn btn-default" onClick={this._navigateBack}>Tillbaka</button>
                                <button type="button" className="btn btn-primary" onClick={this._launchNextActivity}>Sätt igång</button>
                            </div>
                        </div>
                    </section>

                    <div className="centered-contents">
                        <span>eller</span> <a onClick={this._navigateToInsights}>gå till dina insikter</a>
                    </div>
                </div>
                );
        } else {
            markup = (
                <div className="centered-contents">
                    <button type="button" className="btn btn-default" onClick={this._navigateBack}>Tillbaka</button>
                    <button type="button" className="btn btn-primary" onClick={this._navigateToInsights}>Gå till dina insikter</button>
                </div>
                );
        }

        return (
            <div>
                {markup}
            </div>
            );
    },

    _navigateBack: function () {
        history.back();
    },

    _launchNextActivity: function () {
        location.hash = "activities/" + this.props.activity.getClassName();
    },

    _navigateToInsights: function () {
        location.hash = "insights";
    }
});

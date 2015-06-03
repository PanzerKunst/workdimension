CS.Controllers.WorkbookAreaDescription = React.createClass({
    render: function () {
        var workbookAreaDescription = _.find(CS.Controllers.Texts, function(text) {
            return text.type === "workbook-area-description" &&
                text.workbookAreaClassName === this.props.workbookAreaClassName;
        }.bind(this)).htmlText;

        return (
            <div id="area-description">
                <article className="workbook-area-description-text-wrapper" dangerouslySetInnerHTML={{__html: workbookAreaDescription}} />
                <div className="centered-contents">
                    <button className="btn btn-primary" onClick={this._showTask}>Ok!</button>
                </div>
            </div>
            );
    },

    _showTask: function() {
        this.props.controller.showTask();
    }
});

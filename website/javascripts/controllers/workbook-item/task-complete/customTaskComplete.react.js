CS.Controllers.WorkbookItemCustomTaskComplete = React.createClass({
    render: function () {
        return (
            <div id="task-complete-pep-talk">
                <h2><i className="fa fa-star"></i>Tack!<i className="fa fa-star"></i></h2>
                <p>En karriäragent kommer att ta en titt för att hjälpa dig vidare ytterligare. </p>
                <p>Jobba gärna vidare under tiden! Med det här ämnet eller med ett annat. </p>
                <div className="centered-contents">
                    <button className="btn btn-primary" onClick={this._handleTaskCompletePepTalkClosed}>Ok!</button>
                </div>
            </div>
            );
    },

    _handleTaskCompletePepTalkClosed: function () {
        this.props.controller.handleTaskCompletePepTalkClosed();
    }
});

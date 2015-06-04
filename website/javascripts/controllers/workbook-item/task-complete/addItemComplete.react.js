CS.Controllers.WorkbookItemAddItemComplete = React.createClass({
    render: function () {
        return (
            <div id="task-complete-pep-talk">
                <h2><i className="fa fa-star"></i>Bra jobbat! <i className="fa fa-star"></i></h2>
                <p>Lägg till fler exempel och förklara djupare. Ju längre du går, desto bättre. </p>
                <p>Du kan också gå tillbaka för att jobba med <a onClick={this._navigateBack}>ett annat ämne.</a></p>
                <div className="centered-contents">
                    <button className="btn btn-primary" onClick={this._handleTaskCompletePepTalkClosed}>Ok!</button>
                </div>
            </div>
            );
    },

    _handleTaskCompletePepTalkClosed: function () {
        this.props.controller.handleTaskCompletePepTalkClosed();

        ga("send", "event", "button", "click", "Workbook Item > Pep talk > Closed add note");
    },

    _navigateBack: function() {
        history.back();
    }
});

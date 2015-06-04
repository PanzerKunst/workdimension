CS.Controllers.WorkbookAreaAddItemLvl1Complete = React.createClass({
    render: function () {
        return (
            <div id="task-complete-pep-talk">
                <h2><i className="fa fa-star"></i>Härligt!<i className="fa fa-star"></i></h2>
                <p>Vi gör två stycken till. </p>
                <p>När du har totalt fem kommer en av våra karriärrådgivare att ta en titt för att kunna guida dig vidare med tips och frågor. </p>
                <div className="centered-contents">
                    <button className="btn btn-primary" onClick={this._handleTaskCompletePepTalkClosed}>Ok!</button>
                </div>
            </div>
            );
    },

    _handleTaskCompletePepTalkClosed: function () {
        this.props.controller.handleTaskCompletePepTalkClosed();

        ga("send", "event", "button", "click", "Workbook Area > Pep talk > Closed add item lvl 1");
    }
});

CS.Controllers.WorkbookAreaAddItemLvl1Complete = React.createClass({
    render: function () {
        return (
            <div id="task-complete-pep-talk">
                <h2><i className="fa fa-star"></i>Härligt!<i className="fa fa-star"></i></h2>
                <p>Vi gör två till. </p>
                <p>När du har totalt fem kommer en av våra karriärvägledare att ta en titt för att ge dig ytterligare hjälp. </p>
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

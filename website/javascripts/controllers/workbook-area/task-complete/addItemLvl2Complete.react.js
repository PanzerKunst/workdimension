CS.Controllers.WorkbookAreaAddItemLvl2Complete = React.createClass({
    render: function () {
        return (
            <div id="task-complete-pep-talk">
                <h2><i className="fa fa-star"></i>Bra jobbat!<i className="fa fa-star"></i></h2>
                <p>En karriäragent har meddelats om dina svar och du kommer att få ett mejl med ytterligare frågor och tips. </p>
                <p>Fortsätt gärna så länge. Följ instruktionerna eller gå till andra områden i appen. </p>
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

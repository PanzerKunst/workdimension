CS.Controllers.WorkbookAreaAddItemLvl2Complete = React.createClass({
    render: function () {
        return (
            <div id="task-complete-pep-talk">
                <h2><i className="fa fa-star"></i>Great work!<i className="fa fa-star"></i></h2>
                <p>A career advisor has been notified of your progress and will e-mail you with additional questions or advice.</p>
                <p>Meanwhile, please keep moving. Follow the instructions or move to other areas in the app.</p>
                <div className="centered-contents">
                    <button className="btn btn-primary" onClick={this._handleTaskCompletePepTalkClosed}>Alright</button>
                </div>
            </div>
            );
    },

    _handleTaskCompletePepTalkClosed: function () {
        this.props.controller.handleTaskCompletePepTalkClosed();
    }
});

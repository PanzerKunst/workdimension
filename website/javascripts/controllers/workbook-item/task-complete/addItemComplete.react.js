CS.Controllers.WorkbookItemAddItemComplete = React.createClass({
    render: function () {
        return (
            <div id="task-complete-pep-talk">
                <h2><i className="fa fa-star"></i>Great work!<i className="fa fa-star"></i></h2>
                <p>Keep adding examples or try describing more.</p>
                <p>Or <a onClick={this._navigateBack}>go back</a> to work on another item.</p>
                <div className="centered-contents">
                    <button className="btn btn-primary" onClick={this._handleTaskCompletePepTalkClosed}>Alright</button>
                </div>
            </div>
            );
    },

    _handleTaskCompletePepTalkClosed: function () {
        this.props.controller.handleTaskCompletePepTalkClosed();
    },

    _navigateBack: function() {
        history.back();
    }
});

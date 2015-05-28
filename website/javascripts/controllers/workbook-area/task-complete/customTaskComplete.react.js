CS.Controllers.WorkbookAreaCustomTaskComplete = React.createClass({
    render: function () {
        return (
            <div id="task-complete-pep-talk">
                <h2><i className="fa fa-star"></i>Thanks!<i className="fa fa-star"></i></h2>
                <p>A career advisor will get back to you shortly.</p>
                <p>In the meantime, we invite you to continue working on this topic, or maybe switch to another one&#63;</p>
                <div className="centered-contents">
                    <button className="btn btn-primary" onClick={this._handleTaskCompletePepTalkClosed}>Continue</button>
                </div>
            </div>
            );
    },

    _handleTaskCompletePepTalkClosed: function () {
        this.props.controller.handleTaskCompletePepTalkClosed();
    }
});

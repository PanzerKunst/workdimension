CS.Controllers.WorkbookAreaAddItemLvl1Complete = React.createClass({
    render: function () {
        return (
            <div id="task-complete-pep-talk">
                <h2><i className="fa fa-star"></i>Nice!<i className="fa fa-star"></i></h2>
                <p>Let's add two more.</p>
                <p>Once you have five, a career advisor will have a look and you'll receive additional help.</p>
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

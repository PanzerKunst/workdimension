CS.Controllers.WorkbookItemCustomTaskComplete = React.createClass({
    render: function () {
        return (
            <div id="task-complete-pep-talk">
                <h2><i className="fa fa-star"></i>Great work!<i className="fa fa-star"></i></h2>
                <p>A career advisor will get back to you shortly.</p>
                <p>In the meantime, we invite you to continue working on this item, or switch to something else&#63;</p>
                <div className="centered-contents">
                    <button className="btn btn-primary" onClick={this.props.controller.handleCustomTaskCompleteConfirmed}>Continue</button>
                </div>
            </div>
            );
    }
});

CS.Controllers.ThreeStandoutPanel.Contexts = React.createClass({
    render: function () {
        return (
            <div className="three-standouts">
                <h2><i className="fa fa-star"></i>Your top-3 contexts<i className="fa fa-star"></i></h2>

                <p>From what you've indicated so far, these are the three contexts that you should focus on when describing yourself:</p>

                <ul>
                    <li>{this.props.threeStandouts[0]}</li>
                    <li>{this.props.threeStandouts[1]}</li>
                    <li>{this.props.threeStandouts[2]}</li>
                </ul>

                <p>You have great examples for all of them. Use examples when you write your application and always be prepared to use them during an interview.</p>

                <p>This exercise is now over. You'll find your top-3 contexts in the app at any time. Keep using the service at your wish.</p>

                <p>Please help us out by <a href="#">answering a three-question survey.</a></p>
            </div>
            );
    }
});

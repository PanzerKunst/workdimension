CS.Controllers.OverviewThreeStandoutsPanel = React.createClass({
    render: function () {
        var workbookAreaTitleHref = "/workbook-areas/" + this.props.workbookArea.className;
        var humanReadableClassName = this.props.workbookArea.humanReadableClassName.toLowerCase();

        return (
            <div className="three-standouts well" ref="wrapper">
                <h2><i className="fa fa-star"></i>Top-3 <a href={workbookAreaTitleHref}>{humanReadableClassName}</a><i className="fa fa-star"></i></h2>
                <button className="styleless fa fa-times" onClick={this._hide}></button>

                <ul>
                    <li>{this.props.threeStandouts[0]}</li>
                    <li>{this.props.threeStandouts[1]}</li>
                    <li>{this.props.threeStandouts[2]}</li>
                </ul>
            </div>
            );
    },

    componentDidMount: function () {
        this._initElements();
    },

    _initElements: function() {
        this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
    },

    _hide: function() {
        this.$wrapper.hide();
        this.$wrapper.siblings(".well").show();

        CS.overviewController.rePackerise();
    }
});

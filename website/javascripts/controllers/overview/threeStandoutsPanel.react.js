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

    _initElements: function () {
        this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
        this.$workbookAreaPanel = this.$wrapper.siblings(".well");

        this._hideIfRequired();
    },

    _hide: function () {
        CS.Services.Animator.fadeOut(this.$wrapper, {
            animationDuration: CS.animationDuration.short,
            onComplete: function () {
                CS.Services.Animator.fadeIn(this.$workbookAreaPanel);
                CS.overviewController.rePackerise();
            }.bind(this)
        });

        if (!_.includes(CS.account.data.hiddenThreeStandoutsPanelsIds, this.props.workbookArea.id)) {
            var hiddenThreeStandoutsPanelsIds = CS.account.data.hiddenThreeStandoutsPanelsIds || [];
            hiddenThreeStandoutsPanelsIds.push(this.props.workbookArea.id);

            CS.account.data.hiddenThreeStandoutsPanelsIds = hiddenThreeStandoutsPanelsIds;
            CS.saveAccountData();
        }

        ga("send", "event", "button", "click", "Overview > Hide three standouts panel");
    },

    _hideIfRequired: function() {
        if (_.includes(CS.account.data.hiddenThreeStandoutsPanelsIds, this.props.workbookArea.id)) {
            this.$wrapper.hide();
        }
    }
});

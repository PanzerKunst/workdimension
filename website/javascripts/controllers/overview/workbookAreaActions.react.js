CS.Controllers.OverviewWorkbookAreaActions = React.createClass({
    render: function () {
        var threeStandoutsItemReact = null;

        if (CS.account.data && CS.account.data.standouts && CS.account.data.standouts[this.props.workbookArea.className]) {
            threeStandoutsItemReact = (
                <li><i className="fa fa-star"></i><a onClick={this._showThreeStandouts}>Standouts</a></li>
                );
        }

        return (
            <section className="workbook-area-actions" ref="wrapper">
                <ul className="styleless">
                    <li><i className="fa fa-question-circle"></i><a onClick={this._showWorkbookAreaDescriptionModal}>Mer info om ämnet</a></li>
                    <li><i className="fa fa-eye-slash"></i><a onClick={this._hideBlueprintAreaPanel}>Göm det här ämnet</a></li>
                    {threeStandoutsItemReact}
                </ul>
            </section>
            );
    },

    componentDidMount: function () {
        this._initElements();
    },

    _initElements: function () {
        this.$wrapper = $(React.findDOMNode(this.refs.wrapper));
        this.$workbookAreaPanel = this.$wrapper.parent();
        this.$threeStandoutsPanel = this.$workbookAreaPanel.siblings(".three-standouts");
        this.$areaDescriptionModal = this.$workbookAreaPanel.siblings(".workbook-area-description-modal");
    },

    _showWorkbookAreaDescriptionModal: function() {
        this.props.controller.hideActionsMenu();

        this.$areaDescriptionModal.modal();
    },

    _hideBlueprintAreaPanel: function () {
        this.props.controller.hideActionsMenu();

        this.props.workbookArea.deactivate();
        CS.overviewController.reRender();
    },

    _showThreeStandouts: function() {
        this.props.controller.hideActionsMenu();

        CS.Services.Animator.fadeOut(this.$workbookAreaPanel, {
            animationDuration: CS.animationDuration.short,
            onComplete: function () {
                CS.Services.Animator.fadeIn(this.$threeStandoutsPanel);
                CS.overviewController.rePackerise();
            }.bind(this)
        });
    }
});

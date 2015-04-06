CS.Controllers.BlueprintAreaSelectorItem = React.createClass({
    render: function () {
        return <a onClick={this._activateBlueprintArea}>{this.props.blueprintArea.title}</a>;
    },

    _activateBlueprintArea: function() {
        CS.mainMenuController.hideModal();

        this.props.blueprintArea.activate();

        if (window.location.pathname !== "/") {
            location.href = "/workbook-areas/" + this.props.blueprintArea.className;
        }
    }
});

CS.Controllers.BlueprintAreaSelectorItem = React.createClass({
    render: function () {
        return <a onClick={this._activateBlueprintArea}>{this._getBlueprintArea().getTitle()}</a>;
    },

    _getBlueprintArea: function() {
        return this.props.blueprintArea;
    },

    _activateBlueprintArea: function() {
        CS.mainMenuController.hideModal();

        this._getBlueprintArea().activate();
    }
});

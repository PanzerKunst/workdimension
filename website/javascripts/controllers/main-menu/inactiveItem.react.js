CS.Controllers.MainMenuInactiveItem = React.createClass({
    render: function () {
        return (
            <li>
                <a onClick={this._activateBlueprintArea}>{this.props.blueprintArea.getTitle()}</a>
            </li>
            );
    },

    _getBlueprintArea: function() {
        return this.props.blueprintArea;
    },

    _activateBlueprintArea: function() {
        this._getBlueprintArea().activate();
    }
});

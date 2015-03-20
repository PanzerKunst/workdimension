CS.Controllers.MainMenuInactiveItem = React.createClass({
    render: function () {
        return (
            <li>
                <a onClick={this._activateBlueprintArea}>{this.props.blueprintArea.getTitle()}</a>
            </li>
            );
    },

    _activateBlueprintArea: function() {

    }
});

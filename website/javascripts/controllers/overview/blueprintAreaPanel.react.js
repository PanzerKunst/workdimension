CS.Controllers.OverviewBlueprintAreaPanel = React.createClass({
    render: function () {
        return (
            <li className="blueprint-area-panel" ref="li">
                <div className="well">
                    <h2>{this._getBlueprintArea().getTitle()}</h2>
                    <button className="styleless fa fa-eye-slash" onClick={this._hideBlueprintAreaPanel}></button>

                    <ul className="styleless">
                        {this._getBlueprintAreaWithData().items.map(function (item, index) {
                            var reactItemId = this._getBlueprintArea().getClassName() + "-blueprint-item-" + item.name;

                            return <CS.Controllers.OverviewBlueprintItem key={reactItemId} blueprintAreaWithData={this._getBlueprintAreaWithData()} blueprintItemIndex={index} />;
                        }.bind(this))}
                    </ul>

                    <CS.Controllers.OverviewBlueprintAreaComposer blueprintAreaClassName={this._getBlueprintArea().getClassName()} />
                </div>
            </li>
            );
    },

    componentDidMount: function () {
        this._initElements();
    },

    _getBlueprintAreaWithData: function() {
        return this.props.blueprintAreaWithData;
    },

    _getBlueprintArea: function() {
        return this.props.blueprintAreaWithData.blueprintArea;
    },

    _initElements: function() {
        this.$listItem = $(React.findDOMNode(this.refs.li));
    },

    _hideBlueprintAreaPanel: function () {
        this._getBlueprintArea().deactivate();
        CS.overviewController.reRender();
    }
});

CS.Controllers.OverviewBlueprintAreaPanel = React.createClass({
    render: function () {
        var workbookAreaTitleHref = "/workbook-areas/" + this._getBlueprintArea().className;

        return (
            <li className="blueprint-area-panel" ref="li">
                <div className="well">
                    <h2><a href={workbookAreaTitleHref}>{this._getBlueprintArea().title}</a></h2>
                    <button className="styleless fa fa-eye-slash" onClick={this._hideBlueprintAreaPanel}></button>

                    <ul className="styleless item-names-list">
                        {this.props.blueprintAreaWithData.items.map(function (item, index) {
                            var reactItemId = this._getBlueprintArea().className + "-blueprint-item-" + item.name;

                            return <CS.Controllers.OverviewBlueprintItem key={reactItemId} blueprintAreaWithData={this.props.blueprintAreaWithData} blueprintItemIndex={index} />;
                        }.bind(this))}
                    </ul>

                    <CS.Controllers.OverviewBlueprintAreaComposer blueprintAreaClassName={this._getBlueprintArea().className} />
                </div>
            </li>
            );
    },

    componentDidMount: function () {
        this._initElements();
        this._initSortable();
    },

    _getBlueprintArea: function() {
        return this.props.blueprintAreaWithData.blueprintArea;
    },

    _initElements: function() {
        this.$listItem = $(React.findDOMNode(this.refs.li));
        this.$itemNamesList = this.$listItem.find(".item-names-list");
    },

    _initSortable: function () {
        Sortable.create(this.$itemNamesList[0], {onUpdate: function() {
            CS.Controllers.WorkbookAreaCommon.handleWorkbookItemsReordered(this.$itemNamesList, this._getBlueprintArea().className);
        }.bind(this)});
    },

    _hideBlueprintAreaPanel: function () {
        this._getBlueprintArea().deactivate();
        CS.overviewController.reRender();
    }
});

CS.Controllers.OverviewBlueprintAreaPanel = React.createClass({
    render: function () {
        var workbookAreaTitleHref = "/workbook-areas/" + this._getBlueprintArea().className;

        var wellClasses = classNames("well",
            {
                "collapsed-list": this.props.blueprintAreaWithData.items.length > CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete
            });

        return (
            <li className="blueprint-area-panel" ref="li">
                <div className={wellClasses}>
                    <h2>
                        <a href={workbookAreaTitleHref}>{this._getBlueprintArea().title}</a>
                    </h2>
                    <button className="styleless fa fa-eye-slash" onClick={this._hideBlueprintAreaPanel}></button>

                    <ul className="styleless item-names-list">
                        {this.props.blueprintAreaWithData.items.map(function (item, index) {
                            var reactItemId = this._getBlueprintArea().className + "-blueprint-item-" + index + "-" + item.name;

                            return <CS.Controllers.OverviewBlueprintItem key={reactItemId} blueprintAreaWithData={this.props.blueprintAreaWithData} blueprintItemIndex={index} controller={this} />;
                        }.bind(this))}
                    </ul>

                    <button className="styleless fa fa-chevron-down" onClick={this._toggleCollapsedList}></button>
                    <button className="styleless fa fa-chevron-up" onClick={this._toggleCollapsedList}></button>

                    <CS.Controllers.OverviewBlueprintAreaComposer blueprintAreaClassName={this._getBlueprintArea().className} />
                </div>
            </li>
            );
    },

    componentDidMount: function () {
        this._initElements();
        this._initSortable();
    },

    _getBlueprintArea: function () {
        return this.props.blueprintAreaWithData.blueprintArea;
    },

    _initElements: function () {
        this.$listItem = $(React.findDOMNode(this.refs.li));
        this.$well = this.$listItem.children();
        this.$itemNamesList = this.$well.children(".item-names-list");
    },

    _initSortable: function () {
        this.sortable = new Sortable(this.$itemNamesList[0],
            {
                animation: 150,
                onUpdate: function () {
                    CS.Controllers.WorkbookAreaCommon.handleWorkbookItemsReordered(this.$itemNamesList, this._getBlueprintArea().className);
                    CS.overviewController.reRender();
                }.bind(this),
                handle: ".fa-bars"
            }
        );
    },

    _hideBlueprintAreaPanel: function () {
        this._getBlueprintArea().deactivate();
        CS.overviewController.reRender();
    },

    _toggleCollapsedList: function () {
        this.$well.toggleClass("collapsed-list");
        this.$well.toggleClass("expanded-list");

        CS.overviewController.rePackerise();
    }
});

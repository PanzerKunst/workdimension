CS.Controllers.OverviewBlueprintAreaPanel = React.createClass({
    render: function () {
        var workbookAreaTitleHref = "/workbook-areas/" + this._getBlueprintArea().className;

        var threeStandoutsPanelReact = null;

        if (CS.account.data && CS.account.data.standouts && CS.account.data.standouts[this._getBlueprintArea().className]) {
            threeStandoutsPanelReact = <CS.Controllers.OverviewThreeStandoutsPanel workbookArea={this._getBlueprintArea()} threeStandouts={CS.account.data.standouts[this._getBlueprintArea().className]} />;
        }

        var wellClasses = classNames("well", {
            "collapsed-list": this.props.blueprintAreaWithData.items.length > CS.Models.WorkbookAreaTaskCommon.minItemCountForAddItemsLvl1TaskComplete,
            "hidd3n": threeStandoutsPanelReact !== null && !_.includes(CS.account.data.hiddenThreeStandoutsPanelsIds, this._getBlueprintArea().id)
        });

        var workbookAreaDescription = _.find(CS.Controllers.Texts, function(text) {
            return text.type === "workbook-area-description" &&
                text.workbookAreaClassName === this._getBlueprintArea().className;
        }.bind(this)).htmlText;

        return (
            <li className="blueprint-area-panel" ref="li">
                <div className={wellClasses}>
                    <h2><a href={workbookAreaTitleHref}>{this._getBlueprintArea().title}</a></h2>
                    <button className="styleless fa fa-chevron-down menu" onClick={this._showActionsMenu}></button>

                    <CS.Controllers.OverviewWorkbookAreaActions workbookArea={this._getBlueprintArea()} controller={this} />

                    <ul className="styleless item-names-list">
                        {this.props.blueprintAreaWithData.items.map(function (item, index) {
                            var reactItemId = this._getBlueprintArea().className + "-blueprint-item-" + index + "-" + item.name;

                            return <CS.Controllers.OverviewBlueprintItem key={reactItemId} blueprintAreaWithData={this.props.blueprintAreaWithData} blueprintItemIndex={index} controller={this} />;
                        }.bind(this))}
                    </ul>

                    <button className="styleless fa fa-chevron-down expand" onClick={this._toggleCollapsedList}></button>
                    <button className="styleless fa fa-chevron-up" onClick={this._toggleCollapsedList}></button>

                    <CS.Controllers.OverviewBlueprintAreaComposer blueprintAreaClassName={this._getBlueprintArea().className} />
                </div>

                {threeStandoutsPanelReact}

                <div className="modal fade workbook-area-description-modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h2 className="modal-title">{this._getBlueprintArea().title}</h2>
                            </div>
                            <div className="modal-body workbook-area-description-text-wrapper" dangerouslySetInnerHTML={{__html: workbookAreaDescription}}></div>
                        </div>
                    </div>
                </div>
            </li>
            );
    },

    componentDidMount: function () {
        this._initElements();
        this._initSortable();
        this._initNonReactableEvents();
    },

    _getBlueprintArea: function () {
        return this.props.blueprintAreaWithData.blueprintArea;
    },

    _initElements: function () {
        this.$listItem = $(React.findDOMNode(this.refs.li));
        this.$well = this.$listItem.children(".well");
        this.$areaDescriptionModal = this.$listItem.children(".workbook-area-description-modal");
        this.$actionsMenu = this.$well.children(".workbook-area-actions");
        this.$itemNamesList = this.$well.children(".item-names-list");

        this.$mainContainer = $("#container");
        this.$contentOverlayWhenMenuOpen = this.$mainContainer.find("#content-overlay-when-menu-open");
    },

    _initSortable: function () {
        this.sortable = new Sortable(this.$itemNamesList[0],
            {
                animation: 150,
                onUpdate: function () {
                    CS.Controllers.WorkbookAreaCommon.handleWorkbookItemsReordered(this.$itemNamesList.children(), this._getBlueprintArea().className, CS.overviewController.reRender.bind(CS.overviewController));
                }.bind(this),
                handle: ".fa-bars"
            }
        );
    },

    _initNonReactableEvents: function() {
        this.$contentOverlayWhenMenuOpen.click(this.hideActionsMenu);
        this.$areaDescriptionModal.on("hidden.bs.modal", this._saveAreaDescriptionAsClosed);
    },

    _toggleCollapsedList: function () {
        this.$well.toggleClass("collapsed-list");
        this.$well.toggleClass("expanded-list");

        CS.overviewController.rePackerise();

        ga("send", "event", "link", "click", "Overview > Toggle collapsed list");
    },

    _showActionsMenu: function() {
        this.$mainContainer.addClass("workbook-area-actions-menu-open");
        this.$actionsMenu.show();

        ga("send", "event", "button", "click", "Overview > Show actions menu");
    },

    hideActionsMenu: function() {
        this.$mainContainer.removeClass("workbook-area-actions-menu-open");
        this.$actionsMenu.hide();
    },

    _saveAreaDescriptionAsClosed: function() {
        CS.Controllers.WorkbookCommon.saveAreaDescriptionAsClosed(this._getBlueprintArea().id);
    }
});

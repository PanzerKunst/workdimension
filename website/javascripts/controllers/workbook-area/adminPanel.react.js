CS.Controllers.AdminPanel = React.createClass({
    render: function () {
        return (
            <section className="admin-panel">
                <CS.Controllers.AddCustomTask workbookAreaId={this.props.workbookArea.id} controller={this.props.controller} />
                <CS.Controllers.SetThreeStandouts workbookArea={this.props.workbookArea} controller={this.props.controller} />
            </section>
            );
    }
});

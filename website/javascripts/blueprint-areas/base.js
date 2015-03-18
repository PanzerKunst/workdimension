CS.BlueprintAreas = {};

CS.BlueprintAreas.Base = P(CS.Controllers.Base, function (c) {
    c.init = function (className, title) {
        this.className = className;
        this.title = title;
    };

    c.getClassName = function () {
        return this.className;
    };

    c.getTitle = function () {
        return this.title;
    };

    c.getReactInstance = function() {
        return this.reactInstance;
    };

    c.reRender = function() {
        if (!this.reactInstance) {
            this._render();
        }
    };

    c.isActive = function() {
        return this.getFromLocalStorage("isBlueprintArea" + this.className + "Active");
    };

    c.activate = function() {
        return this.saveInLocalStorage("isBlueprintArea" + this.className + "Active", true);
    };

    c.deactivate = function() {
        return this.removeFromLocalStorage("isBlueprintArea" + this.className + "Active");
    };

    c._render = function() {
        this.$el = $("#blueprint").find("#" + this.className + "-blueprint-area-wrapper");

        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            this.$el[0]
        );
    };

    c.showTextarea = function($textarea) {
        $textarea.show();
        $textarea.focus();
    };
});

CS.Models.WorkbookAreaTask = P(function (c) {
    c.init = function (id, level, workbookAreaId, previousTaskId, isActiveFunction, wordings, stepCount, templateClassName, comingUpNextText) {
        this.id = id;
        this.level = level;
        this.workbookAreaId = workbookAreaId;
        this.previousTaskId = previousTaskId;
        this.isActiveFunction = isActiveFunction;
        this.wordings = wordings;
        this.stepCount = stepCount;
        this.templateClassName = templateClassName;
        this.comingUpNextText = comingUpNextText;
    };
});

CS.Controllers.Standouts = P(function (c) {
    c.reactClass = React.createClass({displayName: "reactClass",
        getInitialState: function () {
            return {
                position: null,
                employer: null,
                standoutClassNames: []
            };
        },

        render: function () {
            var positionAndEmployer;
            if (this.state.position && this.state.employer) {
                positionAndEmployer = (
                    React.createElement("h1", null, this.state.position, " på ", this.state.employer)
                    );
            }

            return (
                React.createElement("div", null, 
                    positionAndEmployer, 

                    React.createElement("p", {id: "empty-standouts-message"}, "Gör en aktivitet för att få insikter!"), 

                    React.createElement("ul", {className: "styleless"}, 
                        this.state.standoutClassNames.map(function (standoutClassName) {
                            var id = standoutClassName + "-standout-wrapper";

                            return React.createElement("li", {id: id, key: id});
                        })
                    )
                )
                );
        }
    });

    c.init = function () {
        this.standoutClassNames = ["Strengths"];

        this.reactInstance = React.render(
            React.createElement(this.reactClass),
            document.getElementById("standouts")
        );

        this._initEvents();

        this._replaceReactState();
    };

    c._initEvents = function() {
        this.reactInstance.componentDidUpdate = function () {
            this._initStandouts();
        }.bind(this);
    };

    c.reRender = function () {
        this._replaceReactState();

        this.standoutInstances.forEach(function(standout) {
            standout.reRender();
        });
    };

    c._replaceReactState = function() {
        this.reactInstance.replaceState({
            position: CS.account.data ? CS.account.data.position : null,
            employer: CS.account.data ? CS.account.data.employer : null,
            standoutClassNames: this.standoutClassNames
        });
    };

    c._initStandouts = function() {
        this.standoutInstances = this.standoutClassNames.map(function (className) {
            return CS.Standouts[className](className);
        });
    };
});

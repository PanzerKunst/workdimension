CS.Controllers.Standouts = P(function (c) {
    c.reactClass = React.createClass({
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
                    <h1>{this.state.position} på {this.state.employer}</h1>
                    );
            }

            return (
                <div>
                    {positionAndEmployer}

                    <p id="empty-standouts-message">Gör en aktivitet för att få insikter!</p>

                    <ul className="styleless">
                        {this.state.standoutClassNames.map(function (standoutClassName) {
                            var id = standoutClassName + "-standout-wrapper";

                            return <li id={id} key={id}></li>;
                        })}
                    </ul>
                </div>
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

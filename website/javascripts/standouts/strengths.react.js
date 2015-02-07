CS.Standouts.Strengths = P(CS.Standouts.Base, function (c, base) {
    c.reactClass = React.createClass({
        render: function () {
            var listItemStrength1, listItemStrength2, listItemStrength3, listItemStrength4, listItemStrength5, listItemStrength6;

            if (this.props.strength1) {
                listItemStrength1 = (
                    <li>{this.props.strength1}</li>
                    );
            }
            if (this.props.strength2) {
                listItemStrength2 = (
                    <li>{this.props.strength2}</li>
                    );
            }
            if (this.props.strength3) {
                listItemStrength3 = (
                    <li>{this.props.strength3}</li>
                    );
            }
            if (this.props.strength4) {
                listItemStrength4 = (
                    <li>{this.props.strength4}</li>
                    );
            }
            if (this.props.strength5) {
                listItemStrength5 = (
                    <li>{this.props.strength5}</li>
                    );
            }
            if (this.props.strength6) {
                listItemStrength6 = (
                    <li>{this.props.strength6}</li>
                    );
            }

            return (
                <div>
                    <h2>My strengths</h2>
                    <ul>
                        {listItemStrength1}
                        {listItemStrength2}
                        {listItemStrength3}
                        {listItemStrength4}
                        {listItemStrength5}
                        {listItemStrength6}
                    </ul>
                </div>
                );
        }
    });

    c.init = function (className) {
        base.init.call(this, className);
    };

    c.render = function () {
        var data = CS.accountData ? CS.accountData.strengths : null;

        base.render.call(this, data);
    };
});

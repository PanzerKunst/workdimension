CS.Standouts.Strengths = P(CS.Standouts.Base, function (c, base) {
    c.reactClass = React.createClass({
        render: function () {
            var listItemStrenght1, listItemStrenght2, listItemStrenght3, listItemStrenght4, listItemStrenght5, listItemStrenght6;

            if (this.props.strength1) {
                listItemStrenght1 = (
                    <li>{this.props.strength1}</li>
                    );
            }
            if (this.props.strength2) {
                listItemStrenght2 = (
                    <li>{this.props.strength2}</li>
                    );
            }
            if (this.props.strength3) {
                listItemStrenght3 = (
                    <li>{this.props.strength3}</li>
                    );
            }
            if (this.props.strength4) {
                listItemStrenght4 = (
                    <li>{this.props.strength4}</li>
                    );
            }
            if (this.props.strength5) {
                listItemStrenght5 = (
                    <li>{this.props.strength5}</li>
                    );
            }
            if (this.props.strength6) {
                listItemStrenght6 = (
                    <li>{this.props.strength6}</li>
                    );
            }

            return (
                <div>
                    <h2>My strengths</h2>
                    <ul>
                        {listItemStrenght1}
                        {listItemStrenght2}
                        {listItemStrenght3}
                        {listItemStrenght4}
                        {listItemStrenght5}
                        {listItemStrenght6}
                    </ul>
                </div>
                );
        }
    });

    c.init = function (className) {
        base.init.call(this, className);
    };

    c.render = function () {
        base.render.call(this, CS.accountData.strengths);
    };
});

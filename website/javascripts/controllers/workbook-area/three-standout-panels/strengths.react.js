CS.Controllers.ThreeStandoutPanel.Strengths = React.createClass({
    render: function () {
        return (
            <div className="three-standouts">
                <h2><i className="fa fa-star"></i>Dina topp 3 styrkor<i className="fa fa-star"></i></h2>

                <p>Utifrån dina svar så här långt, är det här de styrkor du bör fokusera på när du beskriver dig själv::</p>

                <ul>
                    <li>{this.props.threeStandouts[0]}</li>
                    <li>{this.props.threeStandouts[1]}</li>
                    <li>{this.props.threeStandouts[2]}</li>
                </ul>

                <p>Du har gett bra exempel på dem alla! Använd exemplen när du skriver din jobbansökan och var också beredd att använda dem under en intervju. </p>

                <p>Den här övningen är nu slut. Du kommer att hitta dina topp-3-styrkor i appen när du vill. Fortsätt gärna använda tjänsten! </p>

                <p>Hjälp oss genom att svara på <a href="https://docs.google.com/forms/d/13iqOYQDe6YHEhDdc-XIoQQe4DD6HXLUVYf1W4GcUu0o/viewform?usp=send_form" target="_blank">två korta frågor.</a></p>
            </div>
            );
    }
});

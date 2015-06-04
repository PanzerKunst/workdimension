CS.Controllers.ThreeStandoutPanel.Drivers = React.createClass({
    render: function () {
        return (
            <div className="three-standouts">
                <h2><i className="fa fa-star"></i>Dina viktigaste drivkrafter<i className="fa fa-star"></i></h2>

                <p>Här är de tre viktigaste drivkrafter du identifierat hittills:</p>

                <ul>
                    <li>{this.props.threeStandouts[0]}</li>
                    <li>{this.props.threeStandouts[1]}</li>
                    <li>{this.props.threeStandouts[2]}</li>
                </ul>

                <p>Använd dem när du beskriver dig själv. Ta med dem i ditt personliga brev och i fältet Sammanfattning i din LinkedIn-profil. </p>

                <p>Den här övningen är nu slut. Du kommer att hitta dina drivkrafter i appen när du vill. Fortsätt gärna använda tjänsten! </p>

                <p>Hjälp oss genom att svara på <a href="https://docs.google.com/forms/d/13iqOYQDe6YHEhDdc-XIoQQe4DD6HXLUVYf1W4GcUu0o/viewform?usp=send_form" target="_blank">två korta frågor</a></p>
            </div>
            );
    }
});

// src/main.js

// Build the base page structure first
const root = document.getElementById('root');
buildStartingPage(root);

function main() {
	getWelcomeData()
		.then((response) => filterWelcomeData(response))
		.then((welcomeData) => {
			// Welcome section
			const welcomeDiv = document.getElementById('welcome-section');
			fillWelcomeSection(welcomeDiv, welcomeData);

			// Country section
			getCountryData(welcomeData.country).then((countryResponse) => {
				const countryData = filterCountryData(countryResponse);
				const countryDiv = document.getElementById('country-section');
				fillCountrySection(countryDiv, countryData);
			});

			// Weather section
            getWeatherData(welcomeData.latitude, welcomeData.longitude).then(
	            (weatherResponse) => {
		            const weatherData = filterWeatherData(weatherResponse);
                    const weatherDiv = document.getElementById("weather-section");
		            const theme = fillWeatherSection(weatherDiv, weatherData, welcomeData);

            		document.body.style.backgroundColor = theme.backgroundColor;
            		document.body.style.color = theme.textColor;
            	}
            );

			// ISS section
			getIssInfo().then((issResponse) => {
				const issData = filterIssData(issResponse);
				const issDiv = document.getElementById('iss-section');
				fillIssSection(issDiv, welcomeData, issData);
			});
		})
		.catch((err) => console.log('Error:', err));
}

main();

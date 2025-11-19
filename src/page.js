// src/page.js

function buildStartingPage(root) {
	const welcomeSection = c('div', '', 'section');
	welcomeSection.id = 'welcome-section';

	const countrySection = c('div', '', 'section');
	countrySection.id = 'country-section';

	const weatherSection = c('div', '', 'section');
	weatherSection.id = 'weather-section';

	const issSection = c('div', '', 'section');
	issSection.id = 'iss-section';

	root.append(welcomeSection, countrySection, weatherSection, issSection);
}

// Welcome Section
function fillWelcomeSection(section, welcomeData) {
	const header = c('h2', 'Welcome!', 'section-header');
	const message = c(
		'p',
		`Looks like you are in ${welcomeData.city}, ${welcomeData.country}.`,
		'message'
	);
	section.append(header, message);
}

// Country Section
function fillCountrySection(section, countryData) {
	const header = c('h2', `${countryData.country}`, 'section-header');

	// Format population nicely (e.g. 47,351,567)
	const populationString = new Intl.NumberFormat().format(
		countryData.population
	);

	const messageString = `Known locally as ${countryData.nativeName}, \
has a population of ${populationString}. Its Gini coefficient is \
${countryData.gini}, which is ${compareGini(countryData.gini)}.`;

	const message = c('p', messageString, 'message');
	section.append(header, message);
}

// Weather Section
function fillWeatherSection(section, weatherData, welcomeData) {
	const sunrise = new Date(weatherData.sunrise * 1000);
	const sunset = new Date(weatherData.sunset * 1000);
	const timeOfDayData = getTimeOfDayData(sunrise, sunset);

	// 🌡️ Verifica si el país usa Fahrenheit
	const countryCode = welcomeData.countryCode || welcomeData.country || "ES";
	const isFahrenheit = usesFahrenheit(countryCode);

	// Usa °C o °F según corresponda
	const temp = Math.round(weatherData.feels_like);
	const displayTemp = isFahrenheit ? cToF(temp) + "°F" : temp + "°C";

	const weather = weatherData.weather;
	const messageString = `It's ${weather} and around ${displayTemp}`;

	const header = c("h2", `It's ${timeOfDayData.timeOfDay}`, "section-header");
	const message = c("p", messageString, "message");
	section.append(header, message);

	return timeOfDayData;
}

// ISS Section
function fillIssSection(section, welcomeData, issData) {
	console.log(issData);

	const header = c('h2', 'The International Space Station', 'section-header');

	const distance = Math.round(
		getDistanceFromLatLonInKm(
			welcomeData.latitude,
			welcomeData.longitude,
			issData.latitude,
			issData.longitude
		)
	);

	const formattedDistance = new Intl.NumberFormat().format(distance);

	let messageString = '';
	if (distance < 1000) {
		messageString = 'Is passing over you right now!';
	} else {
		messageString = `Is about ${formattedDistance} km from you right now.`;
	}

	const message = c('p', messageString, 'message');
	section.append(header, message);
}


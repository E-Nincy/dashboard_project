// src/requests.js

function getWelcomeData() {
	return fetch("http://ip-api.com/json/")
		.then((response) => response.json())
		.catch((err) => console.log(err, "welcome data failed"));
}

// Function for REST Countries API
function getCountryData(country) {
	return fetch("https://restcountries.com/v2/name/" + country)
		.then((response) => response.json())
		.catch((err) => console.log(err, "country data failed"));
}

// 🌤️ New function — OpenWeather API
function getWeatherData(latitude, longitude) {
	const apiKey = "Your_OpenWeather_API_Key_Here"; // Replace with your OpenWeather API key
	const url =
		"https://api.openweathermap.org/data/2.5/weather?lat=" +
		latitude +
		"&lon=" +
		longitude +
		"&appid=" +
		apiKey +
		"&units=metric"; // add units=metric for Celsius

	return fetch(url)
		.then((response) => response.json())
		.catch((err) => console.log(err, "weather data failed"));
}

// New function — ISS Location API
function getIssInfo() {
	return fetch("https://api.wheretheiss.at/v1/satellites/25544")
		.then((response) => response.json())
		.catch((err) => console.log(err, "iss data failed"));
}

// --- Filter functions ---

// Filter data from ip-api
function filterWelcomeData(response) {
	console.log("Filtering IP data:", response);
	return {
		city: response.city,          // nice to show the user
		country: response.country,    // for REST Countries API
		latitude: response.lat,       // for OpenWeather & ISS
		longitude: response.lon       // for OpenWeather & ISS
	};
}

// Filter data from REST Countries
function filterCountryData(response) {
	console.log("Filtering Country data:", response);
	return {
		country: response[0].name,
		gini: response[0].gini,           // wealth inequality
		nativeName: response[0].nativeName,
		population: response[0].population
	};
}

// Filter data from OpenWeather
function filterWeatherData(response) {
	console.log("Filtering Weather data:", response);
	return {
		feels_like: response.main.feels_like,  // more meaningful temp
		sunrise: response.sys.sunrise,         // for later use
		sunset: response.sys.sunset,
		weather: response.weather[0].main
	};
}

// Filter data from ISS API
function filterIssData(response) {
	console.log("Filtering ISS data:", response);
	return {
		latitude: response.latitude,
		longitude: response.longitude
	};
}


/**
 * https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
 */

// Calculate distance between two coordinates (in km)
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
	const R = 6371; // Radius of the Earth in km
	const dLat = deg2rad(lat2 - lat1); // deg2rad below
	const dLon = deg2rad(lon2 - lon1);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) *
			Math.cos(deg2rad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const d = R * c; // Distance in km
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI / 180);
}

// Convert temperature from Kelvin to Celsius (optional)
function KtoC(temp) {
	return Math.round(temp - 273.15);
}

// Process Gini coefficient into human-readable form
function compareGini(x) {
	if (x > 50) {
		return "very high";
	} else if (x > 40) {
		return "high";
	} else if (x > 30) {
		return "medium";
	} else {
		return "low";
	}
}

// Convert Celsius to Fahrenheit
function cToF(celsius) {
	return Math.round((celsius * 9) / 5 + 32);
}

// Check if the user's country uses Fahrenheit
function usesFahrenheit(countryCode) {
	const fahrenheitCountries = ["US", "BS", "BZ", "KY", "PW"]; 
	// 🇺🇸 United States, 🇧🇸 Bahamas, 🇧🇿 Belize, 🇰🇾 Cayman Islands, 🇵🇼 Palau
	return fahrenheitCountries.includes(countryCode);
}
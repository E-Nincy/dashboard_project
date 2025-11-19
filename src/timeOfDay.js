// src/timeOfDay.js

function getTimeOfDayData(sunrise, sunset) {
	const now = new Date();

	// Convert all times to "minutes since midnight"
	const minsNow = getMinsFromStartOfDay(now);
	const sunriseMins = getMinsFromStartOfDay(sunrise);
	const sunsetMins = getMinsFromStartOfDay(sunset);

	// Calculate differences (positive = before, negative = after)
	const minsToSunrise = sunriseMins - minsNow;
	const minsToSunset = sunsetMins - minsNow;

	let timeOfDay = "";
	let backgroundColor = "";
	let textColor = "";

	if (minsToSunrise <= 60 && minsToSunrise > 0) {
		timeOfDay = "dawn";
		backgroundColor = "#E3C8C4";
		textColor = "#1F2D50";
	} else if (minsToSunrise <= 0 && minsToSunrise > -60) {
		timeOfDay = "sunrise";
		backgroundColor = "#F2E879";
		textColor = "#122959";
	} else if (minsToSunset <= 60 && minsToSunset > 0) {
		timeOfDay = "sunset";
		backgroundColor = "#F78807";
		textColor = "#161A1D";
	} else if (minsToSunset <= 0 && minsToSunset > -60) {
		timeOfDay = "dusk";
		backgroundColor = "#3F548C";
		textColor = "#11121E";
	} else if (minsToSunrise <= 0 && minsToSunset >= 0) {
		timeOfDay = "day";
		backgroundColor = "#9AD4DB";
		textColor = "#14826F";
	} else if (minsToSunrise <= 0 || minsToSunset >= 0) {
		timeOfDay = "night";
		backgroundColor = "#131D35";
		textColor = "#DBF7A0";
	} else {
		timeOfDay = "unknown";
		backgroundColor = "#595959";
		textColor = "#FFFFFF";
	}

	console.log({ timeOfDay, backgroundColor, textColor });

	return { timeOfDay, backgroundColor, textColor };
}

// Helper — converts Date → minutes since midnight
function getMinsFromStartOfDay(date) {
	const hours = date.getHours();
	const minutes = date.getMinutes();
	return hours * 60 + minutes;
}

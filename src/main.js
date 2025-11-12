function main() {
	getWelcomeData()
		.then((json) => getCountryData(json.country))
		.then((countryData) => console.log("Country data:", countryData))
		.catch((err) => console.log("Error:", err));
}

main();

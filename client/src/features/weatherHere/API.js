// A mock function to mimic making an async request for data

export const fetchWeather = async (location) => {
	console.log(location);
	try {
		const [myLat, myLon] = location;
		const apiURL = `/weather/${myLat}-${myLon}`;
		const weather_response = await fetch(apiURL);
		// GET WEATHER DATA
		const weather_data = await weather_response.json();
		return weather_data;
	} catch (error) {
		console.error(error);
	}
};

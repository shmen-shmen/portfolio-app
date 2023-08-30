// A mock function to mimic making an async request for data

export const fetchWeather = async (location) => {
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

export const fetchTimezone = async (location) => {
	try {
		const [myLat, myLon] = location;
		const apiURL = `/timezone/${myLat}-${myLon}`;
		const timezone_response = await fetch(apiURL);
		// GET WEATHER DATA
		const timezone_data = await timezone_response.json();
		return timezone_data;
	} catch (error) {
		console.error(error);
	}
};

export const logWeather = async (data) => {
	try {
		const options = {
			method: "POST",
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
		};
		const response = await fetch("/api", options);
		console.log("DATA SENT TO SERVER, AWAIT RESPONSE");
		const newData = await response.json();
		console.log("RESPONSE FROM SERVER: ", newData);
		return newData;
	} catch (error) {
		console.error(error);
	}
};

export const fetchWeatherLogs = async () => {
	try {
		const response = await fetch("/weatherLogs");
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

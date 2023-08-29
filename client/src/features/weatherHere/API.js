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
export const logWeather = async (data) => {
	console.log("data that i send to server:", data);
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

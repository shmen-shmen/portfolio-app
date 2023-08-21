import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import MapComponent from "./mapComponent";
import WeatherDialog from "./weatherDialog";
import "./weatherHere.scss";

function TheWeatherHere() {
	const [loading, setLoadig] = useState(false);
	const [location, setLocation] = useState(null);
	const cities = {
		Tokyo: [35.689722, 139.692222],
		Marrakesh: [31.63, -8.008889],
		Huliaipole: [47.65, 36.266667],
	};
	const [weatherData, setWeatherData] = useState(null);

	const getLocation = async (e) => {
		setLoadig(true);
		let coordinates;
		const cityName = e.target.innerText;
		if (cityName in cities) {
			coordinates = cities[cityName];
			setLocation(coordinates);
			setLoadig(false);
		} else {
			if ("geolocation" in navigator) {
				console.log("GEOLOCATION IS AVAILABLE");
				navigator.geolocation.getCurrentPosition(async (position) => {
					coordinates = [position.coords.latitude, position.coords.longitude];
					setLocation(coordinates);
				});
			} else console.error("ERROR GEOLOCATION IS NOT AVAILABLE");
		}
	};

	const getWeatherData = async () => {
		try {
			const [myLat, myLon] = location;
			const apiURL = `/weather/${myLat}-${myLon}`;
			const weather_response = await fetch(apiURL);
			// GET WEATHER DATA
			const weather_data = await weather_response.json();
			setWeatherData(weather_data);
			setLoadig(false);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (!location) {
			return;
		}
		console.log("location is set to ", location);
		getWeatherData();
	}, [location]);

	return (
		<article id="the-weather-here">
			<NavLink to={"/"} className="btn close-btn">
				back
			</NavLink>
			{location ? (
				<MapComponent
					location={location}
					loading={loading}
					weatherData={weatherData}
				/>
			) : (
				<WeatherDialog
					loading={loading}
					getLocation={getLocation}
					cities={cities}
				/>
			)}
		</article>
	);
}

export default TheWeatherHere;

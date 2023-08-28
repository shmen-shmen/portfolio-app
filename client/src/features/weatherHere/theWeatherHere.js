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
		Novosibirsk: [55.05, 82.95],
	};
	const [weatherData, setWeatherData] = useState(null);
	const [units, setUnits] = useState("metric");
	const [day, setDay] = useState(true);
	const changeUnits = () => {
		if (units === "metric") {
			setUnits("imperial");
		} else setUnits("metric");
	};

	const [geoStatus, setGeoStatus] = useState(false);

	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.permissions.query({ name: "geolocation" }).then((result) => {
				if (result.state === "granted") {
					getLocation();
					// Geolocation access is granted
				} else if (result.state === "prompt") {
					// Geolocation access permission has not been decided yet
				} else {
					// Geolocation access is denied
				}
				setGeoStatus(result.state);
			});
		} else {
			setGeoStatus("not supported");
			console.log("Geolocation is not supported in this browser");
		}
	}, []);

	useEffect(() => {
		console.log(geoStatus);
	}, [geoStatus]);

	const getLocation = async (e) => {
		setLoadig(true);
		let coordinates;
		if (e) {
			const cityName = e.target.innerText;
			console.log(cityName);
			if (cityName in cities) {
				coordinates = cities[cityName];
				setLocation(coordinates);
				return;
			} else {
				console.log("you are in naivgator.getposition");
				try {
					const position = await new Promise((resolve, reject) => {
						navigator.geolocation.getCurrentPosition(resolve, reject);
					});
					coordinates = [position.coords.latitude, position.coords.longitude];
					setLocation(coordinates);
				} catch (error) {
					console.log("penis");
					setGeoStatus("revoked");
					setLoadig(false);
					console.error(error);
				}
			}
		}
		try {
			const position = await new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});
			coordinates = [position.coords.latitude, position.coords.longitude];
			setLocation(coordinates);
		} catch (error) {
			setGeoStatus("revoked");
			setLoadig(false);
			console.error(error);
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
		if (weatherData) {
			console.log(weatherData);
		}
	}, [weatherData]);

	useEffect(() => {
		if (!location) {
			return;
		}
		console.log("your location is", location);
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
					units={units}
					changeUnits={changeUnits}
					day={day}
					setDay={setDay}
				/>
			) : (
				<WeatherDialog
					geoStatus={geoStatus}
					loading={loading}
					getLocation={getLocation}
					cities={cities}
				/>
			)}
		</article>
	);
}

export default TheWeatherHere;

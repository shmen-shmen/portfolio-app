import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./weatherHere.scss";
import MapComponent from "./mapComponent";
import WeatherDialog from "./weatherDialog";
import { useSelector, useDispatch } from "react-redux";
import {
	setGeoStatus,
	setLocation,
	getWeatherData,
	setLoadingWeather,
} from "./weatherSlice";

function TheWeatherHere() {
	const dispatch = useDispatch();
	const { geoStatus, location, weatherData, cities } = useSelector(
		(state) => state.weatherHere
	);

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
				dispatch(setGeoStatus(result.state));
			});
		} else {
			dispatch(setGeoStatus("not supported"));
			console.log("Geolocation is not supported in this browser");
		}
	}, []);

	useEffect(() => {
		console.log(geoStatus);
	}, [geoStatus]);

	const getLocation = async (e) => {
		dispatch(setLoadingWeather(true));
		let coordinates;
		if (e) {
			const cityName = e.target.innerText;
			console.log(cityName);
			if (cityName in cities) {
				coordinates = cities[cityName];
				dispatch(setLocation(coordinates));
				return;
			} else {
				console.log("you are in naivgator.getposition");
				try {
					const position = await new Promise((resolve, reject) => {
						navigator.geolocation.getCurrentPosition(resolve, reject);
					});
					coordinates = [position.coords.latitude, position.coords.longitude];
					dispatch(setLocation(coordinates));
				} catch (error) {
					console.log("penis");
					dispatch(setGeoStatus("revoked"));
					dispatch(setLoadingWeather(false));
					console.error(error);
				}
			}
		}
		try {
			const position = await new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});
			coordinates = [position.coords.latitude, position.coords.longitude];
			dispatch(setLocation(coordinates));
		} catch (error) {
			dispatch(setGeoStatus("revoked"));
			dispatch(setLoadingWeather(false));
			console.error(error);
		}
	};

	const getWeather = async (location) => {
		dispatch(getWeatherData(location));
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
		getWeather(location);
	}, [location]);

	return (
		<article id="the-weather-here">
			<NavLink to={"/"} className="btn close-btn">
				back
			</NavLink>
			{location ? (
				<MapComponent location={location} />
			) : (
				<WeatherDialog getLocation={getLocation} />
			)}
		</article>
	);
}

export default TheWeatherHere;

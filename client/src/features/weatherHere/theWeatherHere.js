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
	getTimezoneData,
	setLoadingWeather,
	resetState,
} from "./weatherSlice";

function TheWeatherHere() {
	const dispatch = useDispatch();
	const { geoStatus, location, weatherData, timezoneData, cities } =
		useSelector((state) => state.weatherHere);

	const checkGeoStatus = () => {
		if ("geolocation" in navigator) {
			navigator.permissions.query({ name: "geolocation" }).then((result) => {
				if (result.state === "granted") {
					console.log("Geolocation access is granted");
				} else if (result.state === "prompt") {
					console.log("Geolocation access permission has not been decided yet");
				} else {
					console.log("Geolocation access is denied");
				}
				dispatch(setGeoStatus(result.state));
			});
		} else {
			dispatch(setGeoStatus("not supported"));
			console.log("Geolocation is not supported in this browser");
		}
	};

	useEffect(() => {
		checkGeoStatus();
	}, []);

	useEffect(() => {
		const geoAccessGranted = geoStatus == "granted";
		if (geoAccessGranted) {
			getLocation();
		}
		return;
	}, [geoStatus]);

	const getLocation = async (e) => {
		dispatch(setLoadingWeather(true));
		let coordinates;

		const coordsFromNavigator = async () => {
			let position;
			try {
				position = await new Promise((resolve, reject) => {
					navigator.geolocation.getCurrentPosition(resolve, reject);
				});
			} catch (error) {
				dispatch(setGeoStatus("revoked"));
				dispatch(setLoadingWeather(false));
				console.error(error);
			}
			return [position.coords.latitude, position.coords.longitude];
		};

		if (e) {
			const cityName = e.target.innerText;
			if (cityName in cities) {
				coordinates = cities[cityName];
			} else {
				coordinates = await coordsFromNavigator();
			}
		} else {
			coordinates = await coordsFromNavigator();
		}

		dispatch(setLocation(coordinates));
	};

	const getWeatherAndTimezone = async (location) => {
		dispatch(getWeatherData(location));
		dispatch(getTimezoneData(location));
	};

	useEffect(() => {
		if (location) {
			getWeatherAndTimezone(location);
		}
	}, [location]);

	useEffect(() => {
		if (weatherData && timezoneData) {
			console.log(weatherData, timezoneData);
		}
	}, [weatherData]);

	return (
		<article id="the-weather-here">
			<NavLink
				to={"/"}
				className="btn close-btn"
				onClick={() => {
					console.log("reset click");
					dispatch(resetState());
				}}
			>
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

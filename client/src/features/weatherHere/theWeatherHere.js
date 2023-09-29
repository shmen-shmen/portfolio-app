import React, { useEffect } from "react";
import "./weatherHere.scss";
import MapComponent from "./mapComponent";
import WeatherDialog from "./weatherDialog";
import WeatherNavComponent from "./WeatherNavComponent";
import WeatherAboutDialogComponent from "./WeatherAboutDialogComponent";
import { useSelector, useDispatch } from "react-redux";
import {
	setGeoStatus,
	setLocation,
	getWeatherData,
	getTimezoneData,
	setLoadingWeather,
} from "./weatherSlice";

function TheWeatherHere() {
	const dispatch = useDispatch();
	const { geoStatus, location, weatherData, timezoneData, cities } =
		useSelector((state) => state.weatherHere);

	const checkGeoStatus = () => {
		if ("geolocation" in navigator) {
			if (!navigator.permissions) {
				checkGeoStatusSafari();
				return;
			} else {
				navigator.permissions.query({ name: "geolocation" }).then((result) => {
					if (result.state === "granted") {
						console.log("Geolocation access is granted");
					} else if (result.state === "prompt") {
						console.log(
							"Geolocation access permission has not been decided yet"
						);
					} else {
						console.log("Geolocation access is denied");
					}
					dispatch(setGeoStatus(result.state));
				});
			}
		} else {
			dispatch(setGeoStatus("not supported"));
			console.log("Geolocation is not supported in this browser");
		}
	};

	const checkGeoStatusSafari = () => {
		// for no apparent reason this way is slow and buggy, thus it is not default and only kicks in if navigator.permissions is undefined (Safari)
		navigator.geolocation.getCurrentPosition(
			() => {
				console.log("Geolocation access is granted");
				dispatch(setGeoStatus("granted"));
			},
			(error) => {
				if (error.code === error.PERMISSION_DENIED) {
					console.log("Geolocation access is denied");
					dispatch(setGeoStatus("denied"));
				} else if (error.code === error.POSITION_UNAVAILABLE) {
					console.log("Geolocation information is unavailable");
					dispatch(setGeoStatus("unavailable"));
				} else if (error.code === error.TIMEOUT) {
					console.log("Geolocation request timed out");
					dispatch(setGeoStatus("timeout"));
				} else {
					console.log("Geolocation access permission has not been decided yet");
					dispatch(setGeoStatus("prompt"));
				}
			}
		);
		return;
	};

	useEffect(() => {
		checkGeoStatus();
	}, []);

	useEffect(() => {
		if (geoStatus == "granted") {
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
			console.log("geolocation:", [
				position.coords.latitude,
				position.coords.longitude,
			]);
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

	useEffect(() => {
		if (location) {
			dispatch(getWeatherData(location));
			dispatch(getTimezoneData(location));
		}
	}, [location]);

	useEffect(() => {
		if (weatherData && timezoneData) {
			console.log(weatherData, timezoneData);
		}
	}, [weatherData]);

	return (
		<article id="the-weather-here">
			<WeatherNavComponent />
			<WeatherAboutDialogComponent />
			{location ? (
				<MapComponent location={location} />
			) : (
				<WeatherDialog getLocation={getLocation} />
			)}
		</article>
	);
}

export default TheWeatherHere;

import React, { useEffect } from "react";
import WeatherReport from "./weatherReport";
import { getWeatherLogs } from "./weatherSlice";
import { useDispatch, useSelector } from "react-redux";

function WeatherLogs() {
	const dispatch = useDispatch();
	const { weatherLogs } = useSelector((state) => state.weatherHere);

	useEffect(() => {
		dispatch(getWeatherLogs());
	}, []);

	useEffect(() => {
		setTimeout(() => {
			document
				.getElementById("weather-logs-message-wrapper")
				.classList.add("hidden");
		}, 3000);
	}, []);

	// useEffect(() => {
	// 	if (weatherLogs) {
	// 		function getRandomNumberBetween(arr) {
	// 			const random = Math.random();
	// 			const range = arr.length - 1 - 1;
	// 			const randomNumber = 1 + random * range;
	// 			return Math.floor(randomNumber);
	// 		}

	// 		const randomPlace = getRandomNumberBetween(weatherLogs);
	// 		const { lat, lon } = weatherLogs[randomPlace]["coord"];
	// 		const location = [lat, lon];
	// 	}
	// 	return;
	// }, [weatherLogs]);

	return (
		<>
			<div id="weather-logs-message-wrapper">
				<span>you can look about the map to see</span>
				<span> check ins from other users!</span>
				<br />
				<span className="weather-logs-message-emoji">🪂</span>
			</div>
			{weatherLogs
				? weatherLogs.map((log) => {
						return <WeatherReport key={"key-" + log["_id"]} data={log} />;
				  })
				: null}
		</>
	);
}

export default WeatherLogs;

import React, { useEffect } from "react";
import WeatherMapMarker from "./weatherMapMarker";
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
			const logMessageWrapper = document.getElementById(
				"weather-logs-message-wrapper"
			);
			if (logMessageWrapper) {
				logMessageWrapper.classList.add("hidden");
			} else return;
		}, 3500);
	}, []);

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
						return <WeatherMapMarker key={"key-" + log["_id"]} data={log} />;
				  })
				: null}
		</>
	);
}

export default WeatherLogs;

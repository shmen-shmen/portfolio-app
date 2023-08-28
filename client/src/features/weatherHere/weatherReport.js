import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popup } from "react-leaflet";
import transcribeWeatherData from "./transcribeWeatherData.js";
import { changeUnits, setDayNight } from "./weatherSlice.js";
function WeatherReport() {
	const dispatch = useDispatch();
	const { loadingWeather, weatherData, metric, daylight } = useSelector(
		(state) => state.weatherHere
	);

	const setTimeOfDay = (dayNight) => {
		console.log("isItDay?:", dayNight, daylight);
		dispatch(setDayNight(dayNight));
	};

	const report = transcribeWeatherData(weatherData, metric, setTimeOfDay);

	return (
		<Popup closeButton={false}>
			{loadingWeather ? (
				<p>"wait a second"</p>
			) : (
				<div className={`report ${daylight ? "report-day" : "report-night"}`}>
					<p className="conditions-emoji">{report.emoji()}</p>
					<button
						id="metric-imperial-btn"
						onClick={() => {
							dispatch(changeUnits());
						}}
					>
						{!metric ? "°C" : "°F"}
					</button>
					<br />
					<span>{report.header()}</span>
					<br />
					<span>{report.long()}</span>
				</div>
			)}
		</Popup>
	);
}

export default WeatherReport;

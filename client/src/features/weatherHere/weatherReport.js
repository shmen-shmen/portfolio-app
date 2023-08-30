import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popup } from "react-leaflet";
import transcribeWeatherData from "./transcribeWeatherData.js";
import { changeUnits, saveWeatherLog } from "./weatherSlice.js";
function WeatherReport() {
	const dispatch = useDispatch();
	const { loadingWeather, weatherData, timezoneData, metric } = useSelector(
		(state) => state.weatherHere
	);

	const report = transcribeWeatherData(weatherData, timezoneData, metric);

	return (
		<Popup closeButton={false}>
			{loadingWeather ? (
				<p>"wait a second"</p>
			) : (
				<div
					className={`report ${
						report.sunIsOut() ? "report-day" : "report-night"
					}`}
				>
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
					<button
						onClick={() => {
							dispatch(saveWeatherLog(weatherData));
						}}
					>
						save this weather report for someone to see :3
					</button>
				</div>
			)}
		</Popup>
	);
}

export default WeatherReport;

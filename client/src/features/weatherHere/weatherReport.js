import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popup } from "react-leaflet";
import transcribeWeatherData from "./transcribeWeatherData.js";
import { changeUnits } from "./weatherSlice.js";
function WeatherReport() {
	const dispatch = useDispatch();
	const { loadingWeather, weatherData, metric } = useSelector(
		(state) => state.weatherHere
	);

	const report = transcribeWeatherData(weatherData, metric);

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
				</div>
			)}
		</Popup>
	);
}

export default WeatherReport;

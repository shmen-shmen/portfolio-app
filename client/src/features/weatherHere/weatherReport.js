import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popup, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import transcribeWeatherData from "./transcribeWeatherData.js";
import {
	changeUnits,
	saveWeatherLog,
	changeViewCurrentLogs,
} from "./weatherSlice.js";

function WeatherReport({ weatherData, timezoneData }) {
	const dispatch = useDispatch();
	const { loadingWeather, loadingTimezone, metric } = useSelector(
		(state) => state.weatherHere
	);
	const customIcon = new Icon({
		iconUrl: "./images/pin-complex.png",
		className: "my-div-icon",
		iconSize: [78, 78],
		iconAnchor: [44, 78],
		popupAnchor: [-5, -60],
	});
	const { lat, lon } = weatherData["coord"];
	const location = [lat, lon];
	const report = transcribeWeatherData(weatherData, timezoneData, metric);

	return (
		<Marker position={location} icon={customIcon}>
			<Popup closeButton={false}>
				{loadingWeather && loadingTimezone ? (
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
								dispatch(saveWeatherLog({ weatherData, timezoneData }));
							}}
						>
							save this weather report for someone to see :3
						</button>
						<button
							onClick={() => {
								dispatch(changeViewCurrentLogs());
							}}
						>
							see logs
						</button>
					</div>
				)}
			</Popup>
		</Marker>
	);
}

export default WeatherReport;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popup, Marker } from "react-leaflet";
import { divIcon } from "leaflet";
import transcribeWeatherData from "./transcribeWeatherData.js";
import {
	changeUnits,
	saveWeatherLog,
	changeViewCurrentLogs,
	typingMessage,
} from "./weatherSlice.js";

function WeatherReport(props) {
	const dispatch = useDispatch();

	const { loadingWeather, loadingTimezone, metric, showLogs, message } =
		useSelector((state) => state.weatherHere);

	const data = showLogs
		? props["data"]
		: {
				...props["weatherData"],
				timezone: props["timezoneData"]["timezoneId"],
		  };

	const report = transcribeWeatherData(data, metric, showLogs);

	const { lat, lon } = data["coord"];
	const location = [lat, lon];

	const customIcon = new divIcon({
		html: '<img src="/images/pin-complex.png" alt="marker" />',
		// +
		// `<span class="tooltip ${
		// 	report.sunIsOut() ? "tooltip-day" : "tooltip-night"
		// } ${showLogs ? "tooltip-logs" : ""}">${report.emoji()}</span>`,
		iconAnchor: [44, 78],
		popupAnchor: [-5, -60],
		className: "my-div-icon",
	});

	// const handleTypingMessage = (e) => {
	// 	dispatch(typingMessage(e.target.value));
	// };

	// const handleMessageSubmit = () => {
	// 	console.log("penis");
	// 	dispatch(saveWeatherLog({ ...report.dbEntry(), message: message }));
	// 	dispatch(typingMessage(""));
	// 	document.getElementById("report-message").value =
	// 		"nice! now go see other places";
	// 	setTimeout(() => {
	// 		document.getElementById("report-message").value = "";
	// 	}, 3000);
	// };

	const handleCheckIn = () => {
		dispatch(saveWeatherLog(report.dbEntry()));
	};

	return (
		<Marker position={location} icon={customIcon}>
			<Popup closeButton={false}>
				{loadingWeather || loadingTimezone ? (
					<p>"wait a second"</p>
				) : (
					<div className="report">
						<div
							id="report-top"
							className={`${report.sunIsOut() ? "report-day" : "report-night"}`}
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
							<span className="report-header">{report.header()}</span>
						</div>
						<div id="report-bottom">
							<div id="report-text">
								<span>{report.long()}</span>
							</div>
							<div id="report-buttons-wrapper">
								<button
									onClick={handleCheckIn}
									id="checkin-btn"
									className={`weather-report-btn weather-report-btn-${
										report.sunIsOut() ? "day" : "night"
									} show-${!showLogs}`}
								>
									Check in
								</button>
								<button
									onClick={() => {
										dispatch(changeViewCurrentLogs());
									}}
									id="toggle-logs-btn"
									className={`weather-report-btn weather-report-btn-${
										report.sunIsOut() ? "day" : "night"
									} `}
								>
									{showLogs ? "Back to my location" : "See other places"}
								</button>
								{/* {showLogs ? null : (
							<div className="checkin-wrapper">
								<textarea
									id="report-message"
									name="story"
									rows="5"
									cols="33"
									placeholder="(✍️ You can leave a message for someone else to see)"
									onChange={handleTypingMessage}
									maxLength={140}
								>
									{message}
								</textarea>
							</div>
						)} */}
							</div>
						</div>
					</div>
				)}
			</Popup>
		</Marker>
	);
}

export default WeatherReport;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popup, Marker, Tooltip } from "react-leaflet";
import { Icon, divIcon, tooltip } from "leaflet";
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

	// const customIcon = new Icon({
	// 	iconUrl: "./images/pin-complex.png",
	// 	className: "my-div-icon",
	// 	iconSize: [78, 78],
	// 	iconAnchor: [44, 78],
	// 	popupAnchor: [-5, -60],
	// });
	const customIcon = new divIcon({
		html:
			'<img src="/images/pin-complex.png" alt="marker" />' +
			`<span class="tooltip ${
				report.sunIsOut() ? "tooltip-day" : "tooltip-night"
			} ${showLogs ? "tooltip-logs" : ""}">${report.message()}</span>`,
		iconAnchor: [44, 78],
		popupAnchor: [-5, -60],
		className: "my-div-icon",
	});

	const handleTypingMessage = (e) => {
		dispatch(typingMessage(e.target.value));
	};

	const handleMessageSubmit = () => {
		console.log("penis");
		dispatch(saveWeatherLog({ ...report.dbEntry(), message: message }));
		dispatch(typingMessage(""));
		document.getElementById("report-message").value =
			"nice! now go see other places";
		setTimeout(() => {
			document.getElementById("report-message").value = "";
		}, 3000);
	};

	return (
		<Marker position={location} icon={customIcon}>
			<Popup closeButton={false}>
				{loadingWeather || loadingTimezone ? (
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
						{showLogs ? null : (
							<div className="checkin-wrapper">
								<textarea
									id="report-message"
									name="story"
									rows="5"
									cols="33"
									// placeholder="(You can leave a message for someone else to see ✍️)"
									// placeholder="(You can leave a message for someone else to see ✍️)"
									onChange={handleTypingMessage}
									maxLength={140}
								>
									{message}
								</textarea>
								<button onClick={handleMessageSubmit} id="checkin-btn">
									Check in
								</button>
							</div>
						)}
						<button
							onClick={() => {
								dispatch(changeViewCurrentLogs());
							}}
							id="toggle-logs-btn"
						>
							{showLogs ? "Back to my location" : "See other places"}
						</button>
					</div>
				)}
			</Popup>
		</Marker>
	);
}

export default WeatherReport;

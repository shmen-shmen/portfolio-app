import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popup, Marker } from "react-leaflet";
import { divIcon } from "leaflet";
import transcribeWeatherData from "./transcribeWeatherData.js";
import ReportMessage from "./reportMessage.js";
import {
	changeUnits,
	saveWeatherLog,
	changeViewCurrentLogs,
	hideCheckInElements,
	typingMessage,
} from "./weatherSlice.js";

function WeatherReport(props) {
	const dispatch = useDispatch();

	const {
		loadingWeather,
		loadingTimezone,
		metric,
		showLogs,
		logging,
		message,
		checkedIn,
		showCheckInElements,
	} = useSelector((state) => state.weatherHere);

	const data = showLogs
		? props["data"]
		: {
				...props["weatherData"],
				timezone: props["timezoneData"]["timezoneId"],
		  };

	const report = transcribeWeatherData(data, metric, showLogs, checkedIn);

	const { lat, lon } = data["coord"];
	const location = [lat, lon];

	const customIcon = new divIcon({
		html: '<img src="/images/pin-complex.png" alt="marker" />',
		iconAnchor: [44, 78],
		popupAnchor: [-6, -65],
		className: "my-div-icon",
	});

	const handleCheckIn = () => {
		dispatch(saveWeatherLog({ ...report.dbEntry(), message: message }));
	};

	useEffect(() => {
		if (checkedIn === true) {
			document.getElementById("checkin-message-textarea").value = "👍";
			setTimeout(() => {
				dispatch(hideCheckInElements());
				document.getElementById("checkin-message-textarea").value = message;
			}, 3000);
		} else if (checkedIn == "error") {
			document.getElementById("checkin-message-textarea").value =
				"could not check in(( try again later";
			setTimeout(() => {
				document.getElementById("checkin-message-textarea").value = message;
			}, 3000);
		}
	}, [checkedIn]);

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
							{showCheckInElements ? (
								<ReportMessage sunIsOut={report.sunIsOut()} />
							) : null}
							<div id="report-buttons-wrapper">
								{showCheckInElements ? (
									<button
										onClick={handleCheckIn}
										id="checkin-btn"
										className={`weather-report-btn weather-report-btn-${
											report.sunIsOut() ? "day" : "night"
										} show-${!showLogs}`}
									>
										{logging ? "checking in..." : "Check in"}
									</button>
								) : null}
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
							</div>
						</div>
					</div>
				)}
			</Popup>
		</Marker>
	);
}

export default WeatherReport;

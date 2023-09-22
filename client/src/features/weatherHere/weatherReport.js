import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popup } from "react-leaflet";
import transcribeWeatherData from "./transcribeWeatherData.js";
import ReportMessage from "./reportMessage.js";
import {
	changeUnits,
	saveWeatherLog,
	changeViewCurrentLogs,
	hideCheckInElements,
	typingMessage,
} from "./weatherSlice.js";

function WeatherReport({ data }) {
	const dispatch = useDispatch();
	const {
		location,
		weatherError,
		metric,
		showLogs,
		logging,
		message,
		checkedIn,
		showCheckInElements,
	} = useSelector((state) => state.weatherHere);

	const report = data
		? transcribeWeatherData(
				data,
				metric,
				showLogs,
				showCheckInElements,
				weatherError
		  )
		: null;

	const handleCheckIn = () => {
		dispatch(saveWeatherLog({ ...report.dbEntry(), message: message }));
	};

	useEffect(() => {
		const messageTextarea = document.getElementById("checkin-message-textarea");
		if (messageTextarea) {
			if (checkedIn === true) {
				messageTextarea.value = "you are checked in allright ✍️";
				setTimeout(() => {
					dispatch(hideCheckInElements());
					messageTextarea.value = message;
				}, 3000);
			} else if (checkedIn == "error") {
				messageTextarea.value = "could not check in(( try again later";
				setTimeout(() => {
					messageTextarea.value = message;
				}, 3000);
			}
			dispatch(typingMessage(""));
		}
		return;
	}, [checkedIn]);

	const renderConditional = () => {
		if (!data) {
			return (
				<div id="report-bottom">
					{weatherError ? (
						<p className="popup-noreport-message">
							{` ${location[0].toString().slice(0, 6)} ${location[1]
								.toString()
								.slice(0, 6)}`}
							<br />
							{`Could not get weather for your location `}
							<span>😞</span>
							{` please try again later`}
						</p>
					) : (
						<p className="popup-noreport-message">
							<span>🌝</span> please wait a second...
						</p>
					)}
				</div>
			);
		} else
			return (
				<>
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
						{showCheckInElements && !showLogs ? (
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
				</>
			);
	};

	return (
		<Popup closeButton={false}>
			<div className="report">{renderConditional()}</div>
		</Popup>
	);
}

export default WeatherReport;

import React, { useEffect } from "react";
import { Popup } from "react-leaflet";
import transcribeWeatherData from "./transcribeWeatherData.js";

function WeatherReport({
	loading,
	weatherData,
	metric,
	changeUnits,
	day,
	setDay,
}) {
	// useEffect(() => {
	// 	dragElement(document.getElementById("drag"));
	// }, []);

	// function dragElement(elmnt) {
	// 	console.log(elmnt);
	// 	var pos1 = 0,
	// 		pos2 = 0,
	// 		pos3 = 0,
	// 		pos4 = 0;

	// 	elmnt.onmousedown = dragMouseDown;

	// 	function dragMouseDown(e) {
	// 		e = e || window.event;
	// 		e.preventDefault();
	// 		// get the mouse cursor position at startup:
	// 		pos3 = e.clientX;
	// 		pos4 = e.clientY;
	// 		document.onmouseup = closeDragElement;
	// 		// call a function whenever the cursor moves:
	// 		document.onmousemove = elementDrag;
	// 	}

	// 	function elementDrag(e) {
	// 		e = e || window.event;
	// 		e.preventDefault();
	// 		// calculate the new cursor position:
	// 		pos1 = pos3 - e.clientX;
	// 		pos2 = pos4 - e.clientY;
	// 		pos3 = e.clientX;
	// 		pos4 = e.clientY;
	// 		// set the element's new position:
	// 		elmnt.style.top = elmnt.offsetTop - pos2 + "px";
	// 		elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
	// 	}

	// 	function closeDragElement() {
	// 		// stop moving when mouse button is released:
	// 		document.onmouseup = null;
	// 		document.onmousemove = null;
	// 	}
	// }

	const report = transcribeWeatherData(weatherData, metric, setDay);
	return (
		<Popup closeButton={false}>
			{loading ? (
				<p>"wait a second"</p>
			) : (
				<div className={`report ${day ? "report-day" : "report-night"}`}>
					<p className="conditions-emoji">{report.emoji()}</p>
					<button id="metric-imperial-btn" onClick={changeUnits}>
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

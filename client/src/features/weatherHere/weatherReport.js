import React, { useEffect } from "react";
import { Popup } from "react-leaflet";
import transcribeWeatherData from "./transcribeWeatherData.js";

function WeatherReport({ loading, weatherData, metric, changeUnits }) {
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

	const report = transcribeWeatherData(weatherData, metric);
	return (
		<Popup>
			{loading ? (
				<p>"wait a second"</p>
			) : (
				<div>
					<button id="metric-imperial-btn" onClick={changeUnits}>
						{!metric ? "°C" : "°F"}
					</button>
					<img
						src={`https://openweathermap.org/img/wn/${weatherData["weather"][0]["icon"]}@2x.png`}
						alt=""
					/>
					<br />
					{report.header()}
					<br />
					<br />
					{report.long()}
				</div>
			)}
		</Popup>
	);
}

export default WeatherReport;

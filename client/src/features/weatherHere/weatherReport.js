import React, { useEffect } from "react";

function WeatherReport({ loading, weatherData }) {
	const dateString = Intl.DateTimeFormat("kk-KZ", {
		weekday: "long",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
	}).format(new Date(Date.now()));

	useEffect(() => {
		dragElement(document.getElementById("weather-report"));
	}, []);

	function dragElement(elmnt) {
		console.log(elmnt);
		var pos1 = 0,
			pos2 = 0,
			pos3 = 0,
			pos4 = 0;

		elmnt.onmousedown = dragMouseDown;

		function dragMouseDown(e) {
			e = e || window.event;
			e.preventDefault();
			// get the mouse cursor position at startup:
			pos3 = e.clientX;
			pos4 = e.clientY;
			document.onmouseup = closeDragElement;
			// call a function whenever the cursor moves:
			document.onmousemove = elementDrag;
		}

		function elementDrag(e) {
			e = e || window.event;
			e.preventDefault();
			// calculate the new cursor position:
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;
			// set the element's new position:
			elmnt.style.top = elmnt.offsetTop - pos2 + "px";
			elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
		}

		function closeDragElement() {
			// stop moving when mouse button is released:
			document.onmouseup = null;
			document.onmousemove = null;
		}
	}

	return (
		<div id="weather-report">
			{loading ? (
				<p>"wait a second"</p>
			) : (
				<p>
					{`The weather in ${weatherData["name"]} ${dateString}`}
					<br />
					<br />
					{`Right now it is ${Math.floor(
						weatherData["main"]["temp"]
					)}°C which feels like: ${Math.floor(
						weatherData["main"]["feels_like"]
					)}°C outside, with ${
						weatherData["weather"][0]["description"]
					}. The wind is ${weatherData["wind"]["speed"]} m/sec.`}
				</p>
			)}
		</div>
	);
}

export default WeatherReport;

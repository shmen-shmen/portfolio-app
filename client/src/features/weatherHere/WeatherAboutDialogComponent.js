import React from "react";

function WeatherAboutDialogComponent() {
	return (
		<dialog id="weather-here-about-dialog">
			<div className="weather-here-about-dialog-contents">
				<p>
					This is a little application that gets your location and then shows
					you a weather report for this location. Users can also 'check in' –
					save their reports along with a little message and then navigate the
					map to see each other's check ins.
				</p>
				<form method="dialog">
					<br />
					<button>OK</button>
				</form>
			</div>
		</dialog>
	);
}

export default WeatherAboutDialogComponent;

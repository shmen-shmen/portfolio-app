import React from "react";

function WeatherDialog({ loading, getLocation, cities }) {
	return (
		<dialog open id="weather-dialog">
			{loading ? (
				<div>Kabashi satellites triangulating your exact location...</div>
			) : (
				<div className="dialog-contents">
					<p>
						You will see a browser popup asking you to share your location data.
						The app will use it to show you weather at your location. If you are
						fine with that, press OK
					</p>
					<button onClick={getLocation} className="weather-btn">
						OK
					</button>
					<p>
						If you are paranoid about that (which I fully understand) you can
						instead choose coordinates for one of those beautiful cities:
					</p>
					{Object.keys(cities).map((city) => {
						return (
							<button
								key={`weather-city-btn-${city}`}
								className="weather-btn"
								onClick={getLocation}
							>
								{city}
							</button>
						);
					})}
				</div>
			)}
		</dialog>
	);
}

export default WeatherDialog;

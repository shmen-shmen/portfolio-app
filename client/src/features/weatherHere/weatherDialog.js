import React from "react";

function WeatherDialog({ loading, getLocation, cities, geoStatus }) {
	return (
		<dialog open id="weather-dialog">
			{loading ? (
				<div>Kabashi satellites triangulating your exact location...</div>
			) : (
				<div className="dialog-contents">
					{geoStatus == "prompt" ? (
						<>
							<p>
								You will see a browser popup asking you to share your location
								data. The app will use it to show you weather at your location.
								If you are fine with that, press OK
							</p>
							<button onClick={getLocation} className="weather-btn">
								OK
							</button>
							<p>
								If you are paranoid about that (which I fully understand) you
								can instead choose coordinates for one of those beautiful
								cities:
							</p>
						</>
					) : (
						<p>
							I'm sorry, it seems that your browser does not allow access to
							geolocation data, thus you can't see weather at your location😞
							<br />
							But you can still check weather in one of those beautiful cities
							instead:
						</p>
					)}

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
					{geoStatus === "revoked" ? (
						<b>
							<em style={{ fontSize: "1rem" }}>
								°If you allowed geolocation access but still get the error try
								reloading your browser for changes to take action.
							</em>
						</b>
					) : null}
				</div>
			)}
		</dialog>
	);
}

export default WeatherDialog;

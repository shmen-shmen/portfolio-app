import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideCheckInElements } from "./weatherSlice";

function WeatherDialog({ getLocation }) {
	const { loadingWeather, loadingTimezone, cities, geoStatus } = useSelector(
		(state) => state.weatherHere
	);

	const dispatch = useDispatch();

	const dialogRenderDecision = () => {
		if (geoStatus == null) {
			return <></>;
		} else if (geoStatus == "granted") {
			return loadingWeather ? (
				<div className="dialog-contents">
					Kabashi satellites triangulating your exact location...
				</div>
			) : null;
		} else {
			if (geoStatus == "prompt") {
				return (
					<div className="dialog-contents">
						<p>
							You will see a browser popup asking you to share your location
							data. The app will use it to show you
							<span className="emoji"> 🌝</span>weather
							<span className="emoji">⛈ </span>at your location. If you are fine
							with that, press OK
						</p>
						<button onClick={getLocation} className="weather-btn">
							OK
						</button>
						<p>
							If you are paranoid about that (which I fully understand) you can
							instead choose coordinates for one of those beautiful cities:
						</p>
						{logsCycler()}
					</div>
				);
			} else {
				return (
					<div className="dialog-contents">
						<p>
							I'm sorry, it seems that your browser does not allow access to
							geolocation data so you can't see weather at your location
							<span className="emoji">😞</span>
							<br />
							But you can still check weather in one of those beautiful cities
							instead:
						</p>
						{logsCycler()}
						{geoStatus === "revoked" ? (
							<b>
								<em style={{ fontSize: "1rem" }}>
									°If you allowed geolocation access but still get the error try
									reloading your browser for changes to take action.
								</em>
							</b>
						) : null}
					</div>
				);
			}
		}
	};

	const logsCycler = () => {
		return Object.keys(cities).map((city) => {
			return (
				<button
					key={`weather-city-btn-${city}`}
					className="weather-btn"
					onClick={(e) => {
						getLocation(e);
						dispatch(hideCheckInElements());
					}}
				>
					{city}
				</button>
			);
		});
	};

	return (
		<dialog open id="weather-dialog">
			{dialogRenderDecision()}
		</dialog>
	);
}

export default WeatherDialog;

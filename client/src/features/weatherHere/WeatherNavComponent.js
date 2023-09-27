import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { resetState } from "./weatherSlice";

function WeatherNavComponent() {
	const dispatch = useDispatch();

	const aboutDialogToggle = () => {
		const aboutDialog = document.getElementById("weather-here-about-dialog");
		if (!aboutDialog.open) {
			aboutDialog.show();
		} else aboutDialog.close();
	};

	return (
		<nav id="weather-here-nav">
			<div className="weather-nav-btn-wrapper">
				<NavLink
					to={"/"}
					id="weather-here-exit"
					className="weather-here-nav-btn navlink"
					onClick={() => {
						dispatch(resetState());
					}}
				>
					◄←◄←
				</NavLink>
				<button
					id="weather-here-about"
					className="weather-here-nav-btn"
					onClick={aboutDialogToggle}
				>
					¿?¿?
				</button>
			</div>
		</nav>
	);
}

export default WeatherNavComponent;

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
			<NavLink
				to={"/"}
				id="weather-here-exit"
				className="weather-here-nav-btn"
				onClick={() => {
					dispatch(resetState());
				}}
			>
				exit
			</NavLink>
			<button
				id="weather-here-about"
				className="weather-here-nav-btn"
				onClick={aboutDialogToggle}
			>
				about
			</button>
		</nav>
	);
}

export default WeatherNavComponent;

import React from "react";
import WeatherMapMarker from "./weatherMapMarker";
import { useSelector } from "react-redux";

function WeatherRightNow() {
	const { weatherData, timezoneData } = useSelector(
		(state) => state.weatherHere
	);

	return (
		<>
			<WeatherMapMarker weatherData={weatherData} timezoneData={timezoneData} />
		</>
	);
}

export default WeatherRightNow;

import React from "react";
import WeatherReport from "./weatherReport";
import { useSelector } from "react-redux";

function WeatherRightNow() {
	const { weatherData, timezoneData } = useSelector(
		(state) => state.weatherHere
	);
	return (
		<>
			{weatherData && timezoneData ? (
				<WeatherReport weatherData={weatherData} timezoneData={timezoneData} />
			) : null}
		</>
	);
}

export default WeatherRightNow;

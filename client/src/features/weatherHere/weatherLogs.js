import React, { useEffect } from "react";
import WeatherReport from "./weatherReport";
import { getWeatherLogs } from "./weatherSlice";
import { useDispatch, useSelector } from "react-redux";

function WeatherLogs() {
	const dispatch = useDispatch();
	const { weatherLogs } = useSelector((state) => state.weatherHere);

	useEffect(() => {
		dispatch(getWeatherLogs());
	}, []);

	return (
		<>
			{weatherLogs
				? weatherLogs.map((log) => {
						const { weatherData, timezoneData, _id } = log;
						return (
							<WeatherReport
								key={"key-" + _id}
								weatherData={weatherData}
								timezoneData={timezoneData}
							/>
						);
				  })
				: null}
		</>
	);
}

export default WeatherLogs;

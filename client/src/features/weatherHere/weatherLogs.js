import React, { useEffect } from "react";
import { Marker } from "react-leaflet";
import WeatherReport from "./weatherReport";
import { Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { getWeatherLogs } from "./weatherSlice";
import { useDispatch, useSelector } from "react-redux";

function WeatherLogs() {
	const dispatch = useDispatch();
	const { weatherLogs } = useSelector((state) => state.weatherHere);
	const customIcon = new Icon({
		iconUrl: "./images/pin-complex.png",
		className: "my-div-icon",
		iconSize: [78, 78],
		iconAnchor: [44, 78],
		popupAnchor: [-5, -60],
	});

	useEffect(() => {
		dispatch(getWeatherLogs());
	}, []);
	useEffect(() => {
		if (weatherLogs) {
			console.log("logs:", weatherLogs);
		}
		return;
	}, [weatherLogs]);

	return null;
	// <Marker position={[51.1652, 71.4151]} icon={customIcon}></Marker>;
}

export default WeatherLogs;

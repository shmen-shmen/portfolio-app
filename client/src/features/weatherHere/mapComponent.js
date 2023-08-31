import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import WeatherReport from "./weatherReport";
import WeatherLogs from "./weatherLogs";

function MapComponent() {
	const {
		location,
		loadingWeather,
		loadingTimezone,
		showLogs,
		weatherData,
		timezoneData,
	} = useSelector((state) => state.weatherHere);

	const MyLocation = () => {
		const map = useMap();
		useEffect(() => {
			map.setView(location);
		}, [location]);
		return null;
	};

	return (
		<MapContainer
			center={location}
			zoom={14}
			scrollWheelZoom={true}
			zoomControl={false}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<MyLocation />
			{showLogs ? (
				<WeatherLogs />
			) : weatherData && timezoneData ? (
				<WeatherReport
					weatherData={weatherData}
					timezoneData={timezoneData}
					location={location}
				/>
			) : null}
		</MapContainer>
	);
}

export default MapComponent;

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import WeatherLogs from "./weatherLogs";
import WeatherRightNow from "./weatherRightNow";

function MapComponent() {
	const { location, showLogs } = useSelector((state) => state.weatherHere);

	const MyLocation = () => {
		const map = useMap();
		useEffect(() => {
			map.setView(location);
			const zoom = showLogs ? 3 : 14;
			map.setZoom(zoom);
		}, [location]);
		return null;
	};

	return (
		<MapContainer
			center={location}
			zoom={14}
			scrollWheelZoom={true}
			zoomControl={false}
			worldCopyJump={true}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<MyLocation />
			{showLogs ? <WeatherLogs /> : <WeatherRightNow />}
		</MapContainer>
	);
}

export default MapComponent;

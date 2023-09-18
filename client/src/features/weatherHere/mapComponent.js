import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import WeatherLogs from "./weatherLogs";
import WeatherRightNow from "./weatherRightNow";

function MapComponent() {
	const { location, showLogs } = useSelector((state) => state.weatherHere);

	const map = useMemo(() => {
		const MyLocation = () => {
			const map = useMap();
			useEffect(() => {
				map.setView(location, showLogs ? 4 : 14);
			}, []);
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
	}, [location, showLogs]);

	return map;
}

export default MapComponent;

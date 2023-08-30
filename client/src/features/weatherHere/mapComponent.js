import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import WeatherReport from "./weatherReport";
import WeatherLogs from "./weatherLogs";

function MapComponent() {
	const { location, loadingWeather, showLogs } = useSelector(
		(state) => state.weatherHere
	);
	const customIcon = new Icon({
		iconUrl: "./images/pin-complex.png",
		className: "my-div-icon",
		iconSize: [78, 78],
		iconAnchor: [44, 78],
		popupAnchor: [-5, -60],
	});

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
			) : loadingWeather ? null : (
				<Marker position={location} icon={customIcon}>
					<WeatherReport />
				</Marker>
			)}
		</MapContainer>
	);
}

export default MapComponent;

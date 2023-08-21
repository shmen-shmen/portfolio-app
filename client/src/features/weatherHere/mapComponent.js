import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import WeatherReport from "./weatherReport";
import "leaflet/dist/leaflet.css";

function MapComponent({ location, loading, weatherData }) {
	const customIcon = new Icon({
		iconUrl: "./images/map-marker.png",
		iconSize: [64, 64],
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
			<Marker position={location} icon={customIcon}>
				<Popup>
					Hello! You are here) <br /> {location[0] + " " + location[1]}
				</Popup>
			</Marker>
			<WeatherReport loading={loading} weatherData={weatherData} />
		</MapContainer>
	);
}

export default MapComponent;

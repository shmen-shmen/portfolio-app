import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { Icon, divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import WeatherReport from "./weatherReport";

function MapComponent({ location, loading, weatherData, units, changeUnits }) {
	// const customIcon = new divIcon({
	// 	html: "🌝",
	// 	className: "my-div-icon",
	// 	iconAnchor: [20, 20],
	// });
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

	const metric = units == "metric";

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
			{loading ? null : (
				<Marker position={location} icon={customIcon}>
					<WeatherReport
						loading={loading}
						weatherData={weatherData}
						metric={metric}
						changeUnits={changeUnits}
					/>
				</Marker>
			)}
		</MapContainer>
	);
}

export default MapComponent;

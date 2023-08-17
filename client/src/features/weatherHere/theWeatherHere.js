import React from "react";
import { NavLink } from "react-router-dom";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "./weatherHere.scss";
import "leaflet/dist/leaflet.css";

function TheWeatherHere() {
	const customIcon = new Icon({
		iconUrl: "./images/map-marker.png",
		iconSize: [64, 64],
	});

	return (
		<article id="the-weather-here">
			<NavLink to={"/"} className="btn close-btn">
				back
			</NavLink>
			<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[51.505, -0.09]} icon={customIcon}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</article>
	);
}

export default TheWeatherHere;

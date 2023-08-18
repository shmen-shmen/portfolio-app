import React, { useEffect, useState } from "react";
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

	const [location, setLocation] = useState(null);

	const MyLocation = () => {
		const map = useMap();
		useEffect(() => {
			map.setView(location);
		}, [location]);

		return null;
	};

	useEffect(() => {
		if ("geolocation" in navigator) {
			console.log("GEOLOCATION IS AVAILABLE");
			navigator.geolocation.getCurrentPosition(async (position) => {
				const myLat = position.coords.latitude;
				const myLon = position.coords.longitude;
				setLocation([myLat, myLon]);
			});
		} else console.error("ERROR GEOLOCATION IS NOT AVAILABLE");
	}, []);

	return (
		<article id="the-weather-here">
			<NavLink to={"/"} className="btn close-btn">
				back
			</NavLink>
			{location ? (
				<MapContainer
					center={location}
					zoom={15}
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
				</MapContainer>
			) : null}
		</article>
	);
}

export default TheWeatherHere;

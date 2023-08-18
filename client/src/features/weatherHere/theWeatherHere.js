import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "./weatherHere.scss";
import "leaflet/dist/leaflet.css";

function TheWeatherHere() {
	const [loading, setLoadig] = useState(false);
	const [location, setLocation] = useState(null);
	const cities = {
		Tokyo: [35.689722, 139.692222],
		Marrakesh: [31.63, -8.008889],
		Huliaipole: [47.65, 36.266667],
	};
	const [weatherData, setWeatherData] = useState(null);

	const selectCity = (e) => {
		const cityLocation = cities[e.target.innerText];
		setLocation(cityLocation);
	};

	const MyLocation = () => {
		const map = useMap();
		useEffect(() => {
			map.setView(location);
		}, [location]);
		return null;
	};

	const getLocation = async () => {
		setLoadig(true);
		if ("geolocation" in navigator) {
			console.log("GEOLOCATION IS AVAILABLE");
			navigator.geolocation.getCurrentPosition(async (position) => {
				const myLat = position.coords.latitude;
				const myLon = position.coords.longitude;
				console.log(myLat, myLon);
				setLoadig(false);
				setLocation([myLat, myLon]);
				try {
					const apiURL = `/weather/${myLat}-${myLon}`;
					const weather_response = await fetch(apiURL);
					// GET WEATHER DATA
					const weather_data = await weather_response.json();
					setWeatherData(weather_data);
				} catch (error) {
					console.error(error);
				}
			});
		} else console.error("ERROR GEOLOCATION IS NOT AVAILABLE");
	};

	useEffect(() => {
		console.log(weatherData);
	}, [weatherData]);

	const customIcon = new Icon({
		iconUrl: "./images/map-marker.png",
		iconSize: [64, 64],
	});

	return (
		<article id="the-weather-here">
			<NavLink to={"/"} className="btn close-btn">
				back
			</NavLink>
			{location ? (
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
				</MapContainer>
			) : (
				<dialog open id="weather-dialog">
					{loading ? (
						<div>Kabashi satellites triangulating your exact location...</div>
					) : (
						<div className="dialog-contents">
							<p>
								You will see a browser popup asking you to share your location
								data. The app will use it to show you weather at your location.
								If you are fine with that, press OK
							</p>
							<button onClick={getLocation} className="weather-btn">
								OK
							</button>
							<p>
								If you are paranoid about that (which I fully understand) you
								can instead choose coordinates for one of those beautiful
								cities:
							</p>
							{Object.keys(cities).map((city) => {
								return (
									<button
										key={`weather-city-btn-${city}`}
										className="weather-btn"
										onClick={selectCity}
									>
										{city}
									</button>
								);
							})}
						</div>
					)}
				</dialog>
			)}
		</article>
	);
}

export default TheWeatherHere;

import React from "react";
import { useSelector } from "react-redux";
import { Marker } from "react-leaflet";
import { divIcon } from "leaflet";
import WeatherReport from "./weatherReport";

function WeatherMapMarker(props) {
	const { location, showLogs } = useSelector((state) => state.weatherHere);

	const customIcon = new divIcon({
		html: '<img src="/images/pin-complex.png" alt="marker" />',
		iconAnchor: [44, 78],
		popupAnchor: [-6, -65],
		className: "my-div-icon",
	});

	const getData = () => {
		if (showLogs) {
			return props["data"];
		} else {
			if (props["weatherData"]) {
				return {
					...props["weatherData"],
					timezone: props["timezoneData"]?.timezoneId ?? null,
				};
			} else return null;
		}
	};
	const data = getData();

	const getCoords = () => {
		return showLogs ? [data["coord"].lat, data["coord"].lon] : location;
	};

	const coords = getCoords();

	// first we figure out if we have data
	// then we figure out if we are showing current or log
	// 1) if we are CURRENT and HAVE DATA we show MARKER + REPORT
	// 2) if we are CURRENT but HAVE NO DATA we show MARKER + SORRY
	// 3) if we are LOGS and HAVE DATA we show MARKER + REPORT
	// 4) if we are LOGS and HAVE NO DATA we show NOTHING

	const renderCondition = () => {
		if (data || !showLogs) {
			return (
				<Marker position={coords} icon={customIcon}>
					<WeatherReport data={data} />
				</Marker>
			);
		}
		return null;
	};

	return <>{renderCondition()}</>;
}

export default WeatherMapMarker;

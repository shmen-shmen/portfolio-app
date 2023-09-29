export default function transcribeWeatherData(
	data,
	metric,
	showLogs,
	showCheckInElements
) {
	if (data === null) {
		return;
	}
	const presentTense = !showLogs;
	const place = data["name"];
	const speedUnit = metric ? "kph" : "mph";
	const tempUnit = metric ? "°C" : "°F";
	const utcTimestamp = data.dt;

	const temperature = metric
		? Math.floor(data["main"]["temp"])
		: Math.floor(data["main"]["temp"] * (9 / 5) + 32);

	const feelsLike = metric
		? Math.floor(data["main"]["feels_like"])
		: Math.floor(data["main"]["feels_like"] * (9 / 5) + 32);

	const windSpeed = metric
		? Math.round(data["wind"]["speed"] * 3.6 * 1) / 1
		: Math.round(data["wind"]["speed"] * 2.2369 * 1) / 1;

	const windGusts = metric
		? Math.round(data["wind"]["gust"] * 3.6 * 1) / 1
		: Math.round(data["wind"]["gust"] * 2.2369 * 1) / 1;

	const windDirectionDeg = data["wind"]["deg"];
	const calcWindDirectionCardinal = (degrees) => {
		let cardinal = "";
		const table = {
			North: [-11.25, 11.25],
			"North-northeast": [11.25, 33.75],
			Northeast: [33.75, 56.25],
			"East-northeast": [56.25, 78.75],
			East: [78.75, 101.25],
			"East-southeast": [101.25, 123.75],
			Southeast: [123.75, 146.25],
			"South-southeast": [146.25, 168.75],
			South: [168.75, 191.25],
			"South-southwest": [191.25, 213.75],
			Southwest: [213.75, 236.25],
			"West-southwest": [236.25, 258.75],
			West: [258.75, 281.25],
			"West-northwest": [281.25, 303.75],
			Northwest: [303.75, 326.25],
			"North-northwest": [326.25, 348.75],
		};

		if (degrees >= 348.75 && degrees <= 360) {
			degrees = degrees - 360;
		}

		Object.keys(table).map((key) => {
			if (degrees >= table[key][0] && degrees < table[key][1]) {
				cardinal = key;
			}
		});
		return cardinal;
	};
	const windDirectionCardinal = calcWindDirectionCardinal(windDirectionDeg);

	const description = data["weather"][0]["description"];
	const weatherConditionsCode = data["weather"][0]["id"];

	let sunIsOut = () => {
		const sunrise = data.sys.sunrise;
		const sunset = data.sys.sunset;

		return utcTimestamp >= sunrise && utcTimestamp <= sunset;
	};

	const setConditionsEmoji = (code) => {
		let emoji = "";
		let emojiAlt = "";

		const table = {
			"🌧⛈🌧": [200, 232],
			"🌧🌧🌧": [300, 531],
			"🌨🌨": [600, 602],
			"🌧❄️": [611, 622],
			"": [701, 780],
			"🌪": [781, 781],
			"🌝": [810, 810],
			"🌚": [820, 820],
			"☁️🌝☁️": [811, 812],
			"☁️🌚☁️": [821, 822],
			"☁️☁️☁️": [803, 804],
		};

		if (code >= 800 && code <= 802) {
			if (sunIsOut()) {
				code = code + 10;
			} else code = code + 20;
		}

		Object.keys(table).map((key) => {
			if (code >= table[key][0] && code <= table[key][1]) {
				if (key) {
					emoji = key;
				}
			}
		});

		const icon = data["weather"][0]["icon"];
		const description = data["weather"][0]["description"];
		emojiAlt = (
			<img
				className="emoji-alternative"
				src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
				alt={description}
			/>
		);

		return { emoji, emojiAlt };
	};

	const conditionsEmoji = setConditionsEmoji(weatherConditionsCode);

	const getDateString = () => {
		const timezone = data["timezone"] || "UTC";
		const utcMilliseconds = utcTimestamp * 1000;

		const utcDate = new Date(utcMilliseconds);
		const options = {
			timeZone: timezone,
			weekday: "long",
			month: "short",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
		};

		const dateString = `${utcDate.toLocaleString(["en-GB"], options)}${
			timezone === "UTC" ? " Universal Time." : ""
		}`;

		return dateString;
	};

	const dateString = getDateString();

	return {
		sunIsOut: () => {
			return sunIsOut();
		},
		emoji: () => {
			return conditionsEmoji["emoji"] || conditionsEmoji["emojiAlt"];
		},
		header: () => {
			return `The weather in ${place} on ${dateString}`;
		},
		message: () => {
			return showLogs ? data.message || "🙋‍♀️" : conditionsEmoji;
		},
		long: () => {
			const whenString = presentTense ? "Right now it" : "It";

			const tempString = temperature
				? `${presentTense ? "is" : "was"} ${temperature}${tempUnit}`
				: "";

			const feelsLikeString =
				feelsLike && temperature !== feelsLike
					? `${temperature ? "which" : ""} ${
							presentTense ? "feels" : "felt"
					  } like ${feelsLike}${tempUnit}`
					: "";

			const descriptionString = description ? `, with ${description}` : "";

			const gustsString = windGusts
				? `, with gusts of ${windGusts}${speedUnit}`
				: "";

			const windDirectionString = windDirectionDeg
				? `${windDirectionCardinal},`
				: "";

			const windString = windSpeed
				? ` The wind ${
						presentTense ? "is" : "was"
				  } ${windDirectionString} ${windSpeed}${speedUnit}${gustsString}`
				: "";

			const endString = () => {
				if (presentTense) {
					if (showCheckInElements === false) {
						return ".";
					} else return ", and I say:";
				} else return ", and I said";
			};

			const messageString = showLogs ? data.message || "nothing 🤭" : "";

			return `${whenString} ${tempString} ${feelsLikeString} outside${descriptionString}.${windString}${endString()} ${messageString}`;
		},
		dbEntry: () => {
			return data;
		},
	};
}

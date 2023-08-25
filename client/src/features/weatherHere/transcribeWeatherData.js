export default function transcribeWeatherData(data, metric, setDay) {
	const place = data["name"];
	const country = data.sys.country;
	const speedUnit = metric ? "kph" : "mph";
	const tempUnit = metric ? "°C" : "°F";

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
	const setConditionsEmoji = (code) => {
		let emoji = "";

		const sunrise = data.sys.sunrise;
		const sunset = data.sys.sunset;
		const utcTimestamp = data.dt;
		const sunIsOut = utcTimestamp >= sunrise && utcTimestamp <= sunset;

		// not sure if can do this but it works
		setDay(sunIsOut);

		const table = {
			"🌧⛈🌧": [200, 232],
			"🌧🌧🌧": [300, 531],
			"🌨🌨": [600, 602],
			"🌧❄️": [611, 622],
			"🌪": [781, 781],
			"🌝": [810, 810],
			"🌚": [820, 820],
			"☁️🌝☁️": [811, 812],
			"☁️🌚☁️": [821, 822],
			"☁️☁️☁️": [803, 804],
		};

		if (code >= 800 && code <= 802) {
			console.log("code is chlen");
			if (sunIsOut) {
				code = code + 10;
			} else code = code + 20;
		}

		Object.keys(table).map((key) => {
			if (code >= table[key][0] && code <= table[key][1]) {
				emoji = key;
			}
		});
		return emoji;
	};

	const conditionsEmoji = setConditionsEmoji(weatherConditionsCode);

	const dateString = Intl.DateTimeFormat("en-GB", {
		weekday: "long",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
	}).format(new Date(Date.now()));

	return {
		emoji: () => {
			return conditionsEmoji;
		},
		header: () => {
			return `The weather in ${place} on ${dateString}`;
		},
		long: () => {
			const tempString = temperature ? `is ${temperature}${tempUnit}` : "";

			const feelsLikeString =
				feelsLike && temperature !== feelsLike
					? `${temperature ? "which" : ""} feels like ${feelsLike}${tempUnit}`
					: "";

			const descriptionString = description ? `, with ${description}` : "";

			const gustsString = windGusts
				? `, with gusts of ${windGusts}${speedUnit}`
				: "";

			const windString = windSpeed
				? ` The wind is  ${
						windDirectionDeg ? windDirectionCardinal + "," : ""
				  } ${windSpeed}${speedUnit}${gustsString}.`
				: "";

			return `Right now it ${tempString} ${feelsLikeString} outside${descriptionString}.${windString}`;
		},
	};
}

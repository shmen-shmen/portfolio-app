import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	fetchWeather,
	fetchTimezone,
	logWeather,
	fetchWeatherLogs,
} from "./API";

const initialState = {
	displayName: "The Weather Here",
	geoStatus: null,
	location: null,
	loadingWeather: false,
	weatherData: null,
	loadingTimezone: false,
	timezoneData: null,
	cities: {
		Tokyo: [35.689722, 139.692222],
		Marrakesh: [31.63, -8.008889],
		Huliaipole: [47.65, 36.266667],
		Novosibirsk: [55.05, 82.95],
	},
	metric: true,
	logging: false,
	logResponse: null,
	showLogs: false,
	weatherLogs: null,
	message: "",
};

export const getWeatherData = createAsyncThunk(
	"weatherHere/fetchData",
	async (location) => {
		try {
			const response = await fetchWeather(location);
			return response;
		} catch (error) {
			console.error(error);
		}
	}
);
export const getTimezoneData = createAsyncThunk(
	"weatherHere/fetchTimezone",
	async (location) => {
		try {
			const response = await fetchTimezone(location);
			return response;
		} catch (error) {
			console.error(error);
		}
	}
);
export const saveWeatherLog = createAsyncThunk(
	"weatherHere/logData",
	async (data) => {
		try {
			const response = await logWeather(data);
			return response;
		} catch (error) {
			console.error(error);
		}
	}
);
export const getWeatherLogs = createAsyncThunk(
	"weatherHere/getLogs",
	async (data) => {
		try {
			const response = await fetchWeatherLogs(data);
			return response;
		} catch (error) {
			console.error(error);
		}
	}
);

export const weatherHereSlice = createSlice({
	name: "weatherHere",
	initialState,
	reducers: {
		setLocation: (state, action) => {
			state.location = action.payload;
		},
		setGeoStatus: (state, action) => {
			state.geoStatus = action.payload;
		},
		setLoadingWeather: (state, action) => {
			state.loadingWeather = action.payload;
		},
		changeUnits: (state) => {
			state.metric = !state.metric;
		},
		changeViewCurrentLogs: (state) => {
			state.showLogs = !state.showLogs;
		},
		typingMessage: (state, action) => {
			state.message = action.payload;
		},
		resetState: () => initialState,
	},

	extraReducers: (builder) => {
		builder
			.addCase(getWeatherData.pending, (state) => {
				state.loadingWeather = true;
			})
			.addCase(getWeatherData.fulfilled, (state, action) => {
				state.loadingWeather = false;
				state.weatherData = action.payload;
			})
			.addCase(getWeatherData.rejected, (state) => {
				// state.quote = {
				// 	author: "shmin",
				// 	quote: "for some reason something went wrong somewhere 🥲",
				// };
			})
			.addCase(getTimezoneData.pending, (state) => {
				state.loadingTimezone = true;
			})
			.addCase(getTimezoneData.fulfilled, (state, action) => {
				state.loadingTimezone = false;
				state.timezoneData = action.payload;
			})
			.addCase(getTimezoneData.rejected, (state) => {
				state.timezoneData = initialState.timezoneData;
			})
			.addCase(saveWeatherLog.pending, (state) => {
				state.logging = true;
			})
			.addCase(saveWeatherLog.fulfilled, (state, action) => {
				state.logging = false;
				state.logResponse = action.payload;
			})
			.addCase(saveWeatherLog.rejected, (state) => {
				// state.quote = {
				// 	author: "shmin",
				// 	quote: "for some reason something went wrong somewhere 🥲",
				// };
			})
			.addCase(getWeatherLogs.fulfilled, (state, action) => {
				state.weatherLogs = action.payload;
			});
	},
});

export const {
	setGeoStatus,
	setLocation,
	setLoadingWeather,
	changeUnits,
	setDayNight,
	changeViewCurrentLogs,
	typingMessage,
	resetState,
} = weatherHereSlice.actions;

export default weatherHereSlice.reducer;

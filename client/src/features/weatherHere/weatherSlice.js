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
	cities: {
		Tokyo: [35.689722, 139.692222],
		Marrakesh: [31.63, -8.008889],
		Huliaipole: [47.65, 36.266667],
	},
	loadingWeather: false,
	weatherError: false,
	weatherData: null,
	loadingTimezone: false,
	timezoneError: false,
	timezoneData: null,
	metric: true,
	message: "",
	logging: false,
	checkedIn: false,
	showCheckInElements: true,
	logResponse: null,
	showLogs: false,
	weatherLogs: null,
};

export const getWeatherData = createAsyncThunk(
	"weatherHere/fetchData",
	async (location, { rejectWithValue }) => {
		const response = await fetchWeather(location);
		if (response) {
			return response;
		} else {
			return rejectWithValue(
				"there was an error getting weather data 😞 please try again later"
			);
		}
	}
);
export const getTimezoneData = createAsyncThunk(
	"weatherHere/fetchTimezone",
	async (location, { rejectWithValue }) => {
		const response = await fetchTimezone(location);
		if (response) {
			return response;
		} else {
			return rejectWithValue(
				"there was an error getting timezone data 😞 please try again later"
			);
		}
	}
);
export const saveWeatherLog = createAsyncThunk(
	"weatherHere/logData",
	async (data, { rejectWithValue }) => {
		const response = await logWeather(data);
		if (response) {
			return response;
		} else {
			return rejectWithValue(
				"there was an error checking in 😞 please try again later"
			);
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
		hideCheckInElements: (state) => {
			state.showCheckInElements = false;
		},
		resetState: () => initialState,
	},

	extraReducers: (builder) => {
		builder
			.addCase(getWeatherData.pending, (state) => {
				state.weatherError = false;
				state.loadingWeather = true;
			})
			.addCase(getWeatherData.fulfilled, (state, action) => {
				state.loadingWeather = false;
				state.weatherData = action.payload;
			})
			.addCase(getWeatherData.rejected, (state, action) => {
				console.error(action.payload);
				state.loadingWeather = false;
				state.weatherError = true;
				state.weatherData = initialState.weatherData;
			})
			.addCase(getTimezoneData.pending, (state) => {
				state.timezoneError = false;
				state.loadingTimezone = true;
			})
			.addCase(getTimezoneData.fulfilled, (state, action) => {
				state.loadingTimezone = false;
				state.timezoneData = action.payload;
			})
			.addCase(getTimezoneData.rejected, (state, action) => {
				console.error(action.payload);
				state.loadingTimezone = false;
				state.timezoneError = true;
				state.timezoneData = initialState.timezoneData;
			})
			.addCase(saveWeatherLog.pending, (state) => {
				state.logging = true;
				state.checkedIn = false;
			})
			.addCase(saveWeatherLog.fulfilled, (state, action) => {
				state.logging = false;
				state.checkedIn = true;
				state.logResponse = action.payload;
			})
			.addCase(saveWeatherLog.rejected, (state, action) => {
				console.error(action.payload);
				state.logging = false;
				state.checkedIn = "error";
				state.logResponse = action.payload;
			})
			.addCase(getWeatherLogs.fulfilled, (state, action) => {
				state.weatherLogs = action.payload;
				state.message = initialState.message;
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
	hideCheckInElements,
	resetState,
} = weatherHereSlice.actions;

export default weatherHereSlice.reducer;

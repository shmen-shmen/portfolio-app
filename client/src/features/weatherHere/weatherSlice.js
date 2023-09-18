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
	},
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
	async (data, { rejectWithValue }) => {
		const response = await logWeather(data);
		if (response) {
			return response;
		} else {
			return rejectWithValue("there was an error checking in"); // Reject with an error payload
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
				state.loadingWeather = true;
			})
			.addCase(getWeatherData.fulfilled, (state, action) => {
				state.loadingWeather = false;
				state.weatherData = action.payload;
			})
			.addCase(getWeatherData.rejected, (state) => {
				console.error("ERROR GET WEATHER DATA");
			})
			.addCase(getTimezoneData.pending, (state) => {
				state.loadingTimezone = true;
			})
			.addCase(getTimezoneData.fulfilled, (state, action) => {
				state.loadingTimezone = false;
				state.timezoneData = action.payload;
			})
			.addCase(getTimezoneData.rejected, (state) => {
				console.error("ERROR GET TIMEZONE DATA");
				state.timezoneData = initialState.timezoneData;
			})
			.addCase(saveWeatherLog.pending, (state) => {
				state.logging = true;
				state.checkedIn = false;
			})
			.addCase(saveWeatherLog.fulfilled, (state, action) => {
				console.log("SAVE WEATHER LOG FULLFILLED");
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

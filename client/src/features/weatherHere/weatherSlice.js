import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWeather } from "./API";

const initialState = {
	displayName: "The Weather Here",
	geoStatus: null,
	location: null,
	loadingWeather: false,
	cities: {
		Tokyo: [35.689722, 139.692222],
		Marrakesh: [31.63, -8.008889],
		Huliaipole: [47.65, 36.266667],
		Novosibirsk: [55.05, 82.95],
	},
	weatherData: null,
	metric: true,
};

export const getWeatherData = createAsyncThunk(
	"weatherHere/fetchData",
	async (location) => {
		console.log("location from slice", location);
		try {
			const response = await fetchWeather(location);
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
				state.quote = {
					author: "shmin",
					quote: "for some reason something went wrong somewhere 🥲",
				};
			});
	},
});

export const {
	setGeoStatus,
	setLocation,
	setLoadingWeather,
	changeUnits,
	setDayNight,
	resetState,
} = weatherHereSlice.actions;

export default weatherHereSlice.reducer;

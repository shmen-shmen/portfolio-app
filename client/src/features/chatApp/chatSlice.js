import { createSlice } from "@reduxjs/toolkit";
import { contacts, getMessages, generateUser } from "./static-data.js";

const chatSlice = createSlice({
	name: "chat",
	initialState: {
		user: generateUser(),
		messages: getMessages(5),
		typing: "",
		contacts,
		actuveUserId: null,
	},
	reducers: {
		userReducer: (state) => state,
		messagesReducer: (state) => state,
		typingReducer: (state, action) => {
			state.typing = action.payload;
		},
		contactsReducer: (state) => {},
		setActiveUserId: (state, action) => {
			state.actuveUserId = action.payload;
		},
	},
});

export default chatSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { contacts, getMessages, generateUser } from "./static-data.js";

const chatSlice = createSlice({
	name: "chat",
	initialState: {
		user: generateUser(),
		messages: getMessages(10),
		typing: "",
		contacts,
		activeUserId: null,
	},
	reducers: {
		// userReducer: (state) => state,
		// messagesReducer: (state) => state,
		// contactsReducer: (state) => state,
		typingChatMessage: (state, action) => {
			state.typing = action.payload;
		},
		submitChatMessage: (state, action) => {
			const { newMsgText, id } = action.payload;
			const activeDialog = state.messages[id];
			const newMsgNumber = Object.keys(activeDialog).length + 1;
			const newMsg = {
				number: newMsgNumber,
				text: newMsgText,
				is_user_msg: true,
			};
			state.messages[id][newMsgNumber] = newMsg;
			state.typing = "";
		},
		setActiveUserId: (state, action) => {
			state.activeUserId = action.payload;
		},
	},
});

export const { setActiveUserId, typingChatMessage, submitChatMessage } =
	chatSlice.actions;

export default chatSlice.reducer;

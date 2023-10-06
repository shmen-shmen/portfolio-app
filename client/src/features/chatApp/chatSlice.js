import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contacts, getMessages, generateUser } from "./static-data.js";
import { startRecording } from "./mediaRecorder.js";

const initialState = {
	user: generateUser(),
	messages: getMessages(10),
	typing: "",
	contacts,
	activeUserId: null,
	recordingVoice: false,
	voiceDraft: null,
};

export const getDataStream = createAsyncThunk(
	"chat/getDataStream",
	async (_, { rejectWithValue }) => {
		console.log("GETDATASTREAM FIRED");
		const response = await startRecording();
		if (response) {
			return response;
		} else {
			return rejectWithValue(
				"there was an error getting weather data 😞 please try again later"
			);
		}
	}
);

const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
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
	extraReducers: (builder) => {
		builder
			.addCase(getDataStream.pending, (state) => {
				state.recordingVoice = true;
			})
			.addCase(getDataStream.fulfilled, (state, action) => {
				state.recordingVoice = false;
				state.voiceDraft = action.payload;
			})
			.addCase(getDataStream.rejected, (state, action) => {
				console.error(action.payload);
				state.recordingVoice = false;
				state.voiceDraft = initialState.voiceDraft;
			});
	},
});

export const {
	setActiveUserId,
	typingChatMessage,
	submitChatMessage,
	startRecordingVoice,
	abortRecordigVoice,
	newVoiceDraft,
} = chatSlice.actions;

export default chatSlice.reducer;

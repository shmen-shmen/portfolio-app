import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contacts, getMessages, generateUser } from "./static-data.js";
import { startRecording } from "./mediaRecorder.js";
import _ from "lodash";

const initialState = {
	user: generateUser(),
	messages: getMessages(10),
	typing: "",
	contacts,
	activeContactId: null,
	videoMode: false,
	recordingVoice: false,
	voiceDraft: null,
	mediaPlaybackRate: 1,
};

export const getDataStream = createAsyncThunk(
	"chat/getDataStream",
	async (videoMode, { rejectWithValue }) => {
		const response = await startRecording(videoMode);
		if (response) {
			return response;
		} else {
			return rejectWithValue(
				`there was an error accessing your ${
					videoMode ? "camera" : "microphone"
				} 😞 please try again later`
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
			const { type, contents, id } = action.payload;
			const activeDialog = state.messages[id];
			const newMsgNumber = Object.keys(activeDialog).length + 1;
			const newMsg = {
				number: newMsgNumber,
				type,
				contents,
				is_user_msg: true,
			};
			state.messages[id][newMsgNumber] = newMsg;
			state.typing = initialState.typing;
			state.voiceDraft = initialState.voiceDraft;
		},
		setPreviewValue: (state, action) => {
			const id = action.payload;

			const messagesArr = _.values(state.messages[id]);
			const lastMsg = messagesArr[messagesArr.length - 1];

			const value = () => {
				if (lastMsg.type == "text") {
					return lastMsg.contents;
				} else if (lastMsg.type == "video") {
					return "Video Message";
				} else return "Audio Message";
			};

			state.contacts[id].previewValue = value();
		},
		setActiveContactId: (state, action) => {
			state.activeContactId = action.payload;
		},
		switchVideoMode: (state) => {
			state.videoMode = !state.videoMode;
		},
		discardVoiceDraft: (state) => {
			state.voiceDraft = initialState.voiceDraft;
		},
		setPlaybackRate: (state) => {
			if (state.mediaPlaybackRate === 1) {
				state.mediaPlaybackRate = 1.5;
			} else if (state.mediaPlaybackRate === 1.5) {
				state.mediaPlaybackRate = 2;
			} else if (state.mediaPlaybackRate === 2) {
				state.mediaPlaybackRate = 0.5;
			} else {
				state.mediaPlaybackRate = 1;
			}
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
	setPreviewValue,
	setActiveContactId,
	typingChatMessage,
	submitChatMessage,
	switchVideoMode,
	startRecordingVoice,
	abortRecordigVoice,
	newVoiceDraft,
	discardVoiceDraft,
	setPlaybackRate,
} = chatSlice.actions;

export default chatSlice.reducer;

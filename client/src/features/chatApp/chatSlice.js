import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contacts, getMessages, generateUser } from "./static-data.js";
import { startRecording } from "./mediaRecorder.js";
import _ from "lodash";

const initialState = {
	user: generateUser(),
	messages: getMessages(10),
	typing: "",
	editing: { number: null, contents: null },
	contacts,
	activeContactId: null,
	videoMode: false,
	recordingVoice: false,
	mediaDraft: null,
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
			// if i was editing and my message is the same as it was, then just abort
			if (state.editing.contents && state.editing.contents == contents) {
				state.typing = initialState.typing;
				state.editing = initialState.editing;
				return;
			}
			const activeDialog = state.messages[id];
			// if editing message it's key is the same, else it is calculated
			const newMsgNumber =
				state.editing.number || Object.keys(activeDialog).length + 1;

			const newMsg = {
				number: newMsgNumber,
				type,
				contents,
				is_user_msg: true,
			};
			if (state.editing.contents) {
				newMsg.edited = true;
			}
			// put new message into dialog
			state.messages[id][newMsgNumber] = newMsg;
			// put everything back
			state.typing = initialState.typing;
			state.mediaDraft = initialState.mediaDraft;
			if (state.editing.contents) {
				state.editing = initialState.editing;
			}
		},
		editChatMessage: (state, action) => {
			state.typing = action.payload.contents;
			state.editing = action.payload;
		},
		removeChatMessage: (state, action) => {
			const number = action.payload;
			const id = state.activeContactId;
			const messagesopy = state.messages[id];

			delete messagesopy[number];

			state.messages[id] = messagesopy;
		},
		setPreviewValue: (state, action) => {
			const id = action.payload;

			const messagesArr = _.values(state.messages[id]);
			if (messagesArr.length === 0) {
				state.contacts[id].previewValue = "...";
			} else {
				const lastMsg = messagesArr[messagesArr.length - 1];
				const value = () => {
					if (lastMsg.type == "text") {
						return lastMsg.contents;
					} else if (lastMsg.type == "video") {
						return "Video Message";
					} else return "Audio Message";
				};
				state.contacts[id].previewValue = value();
			}
		},
		setActiveContactId: (state, action) => {
			state.activeContactId = action.payload;
		},
		switchVideoMode: (state) => {
			state.videoMode = !state.videoMode;
		},
		discardMediaDraft: (state) => {
			state.mediaDraft = initialState.mediaDraft;
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
				state.mediaDraft = action.payload;
			})
			.addCase(getDataStream.rejected, (state, action) => {
				console.error(action.payload);
				state.recordingVoice = false;
				state.mediaDraft = initialState.mediaDraft;
			});
	},
});

export const {
	setPreviewValue,
	setActiveContactId,
	typingChatMessage,
	submitChatMessage,
	editChatMessage,
	removeChatMessage,
	switchVideoMode,
	startRecordingVoice,
	abortRecordigVoice,
	discardMediaDraft,
	setPlaybackRate,
} = chatSlice.actions;

export default chatSlice.reducer;

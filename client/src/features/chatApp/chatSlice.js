import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contacts, getMessages, generateUser } from "./static-data.js";
import { startRecording } from "./mediaRecorder.js";
import _ from "lodash";

const initialState = {
	user: generateUser(),
	messages: getMessages(10),
	inputHeight: null,
	typing: "",
	editing: { number: null, contents: null },
	showMessageSubmenu: false,
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
		setActiveContactId: (state, action) => {
			state.activeContactId = action.payload;
		},
		dropActiveDialog: (state) => {
			state.activeContactId = initialState.activeContactId;
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
		typingChatMessage: (state, action) => {
			state.typing = action.payload;
		},
		setInputHeight: (state, action) => {
			state.inputHeight = action.payload;
		},
		submitChatMessage: (state, action) => {
			const { type, contents, id, time } = action.payload;
			// if i was editing and my message is the same as it was, then just abort
			if (state.editing.contents && state.editing.contents == contents) {
				state.typing = initialState.typing;
				state.editing = initialState.editing;
				return;
			}
			const activeDialog = state.messages[id];
			// if editing message it's key is the same, else it is calculated
			const newMsgNumber =
				state.editing.number || Object.keys(activeDialog).length;

			const newMsg = {
				number: newMsgNumber,
				type,
				contents,
				time,
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
		toggleMessageSubmenu: (state, action) => {
			state.showMessageSubmenu = action.payload;
		},
		editChatMessage: (state, action) => {
			state.typing = action.payload.contents;
			state.editing = action.payload;
		},
		abortEditChatMessage: (state) => {
			state.editing = initialState.editing;
			state.typing = initialState.typing;
		},
		removeChatMessage: (state, action) => {
			const number = action.payload;
			const id = state.activeContactId;
			const messagescopy = state.messages[id];

			delete messagescopy[number];

			state.messages[id] = messagescopy;
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
	dropActiveDialog,
	setPreviewValue,
	setActiveContactId,
	typingChatMessage,
	setInputHeight,
	submitChatMessage,
	toggleMessageSubmenu,
	editChatMessage,
	abortEditChatMessage,
	removeChatMessage,
	switchVideoMode,
	startRecordingVoice,
	abortRecordigVoice,
	discardMediaDraft,
	setPlaybackRate,
} = chatSlice.actions;

export default chatSlice.reducer;

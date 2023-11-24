import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contacts, getMessages, generateUser } from "./static-data.js";
import { startRecording } from "./mediaRecorder.js";

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
	mediaDraft: { type: "audio", contents: "./ubici.mp3" },
	mediaDeviceErr: false,
	mediaPlaybackRate: 1,
};

export const getDataStream = createAsyncThunk(
	"chat/getDataStream",
	async (videoMode, { rejectWithValue }) => {
		try {
			const response = await startRecording(videoMode);
			return response;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		setActiveContactId: (state, action) => {
			if (state.activeContactId === action.payload) {
				return state;
			}
			state.activeContactId = action.payload;
		},
		dropActiveDialog: (state) => {
			state.activeContactId = initialState.activeContactId;
		},
		setPreviewValue: (state, action) => {
			const id = action.payload;
			// const messagesArr = _.values(state.messages[id]);
			const messagesArr = state.messages[id];
			if (messagesArr.length === 0) {
				state.contacts[id].previewValue = "...";
			} else {
				const lastMsg = messagesArr[messagesArr.length - 1];
				const value = () => {
					if (lastMsg.type === "text") {
						return lastMsg.contents;
					} else if (lastMsg.type === "video") {
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
			// if editing message and the content is the same, abort
			if (state.editing.contents && state.editing.contents === contents) {
				state.typing = initialState.typing;
				state.editing = initialState.editing;
				return state;
			}

			const newMsg = {
				type,
				contents,
				time,
				is_user_msg: true,
			};

			if (state.editing.contents) {
				newMsg.edited = true;
				const activeDialog = state.messages[id];
				const updatedDialog = [...activeDialog];
				const index = state.editing.number;
				updatedDialog[index] = newMsg;
				state.messages[id] = updatedDialog;
				state.editing = initialState.editing;
			} else {
				state.messages[id].push(newMsg);
			}

			state.typing = initialState.typing;
			state.mediaDraft = initialState.mediaDraft;
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
			const id = state.activeContactId;
			const number = action.payload;
			let messagescopy = state.messages[id];
			messagescopy = messagescopy
				.slice(0, number)
				.concat(messagescopy.slice(number + 1));
			state.messages[id] = messagescopy;
		},

		switchVideoMode: (state) => {
			state.videoMode = !state.videoMode;
		},
		discardMediaDraft: (state) => {
			state.mediaDraft = initialState.mediaDraft;
		},
		resetMediaDeviceErr: (state) => {
			state.mediaDeviceErr = initialState.mediaDeviceErr;
		},
		setPlaybackRate: (state, action) => {
			state.mediaPlaybackRate = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getDataStream.pending, (state) => {
				state.recordingVoice = true;
				state.mediaDeviceErr = initialState.mediaDeviceErr;
			})
			.addCase(getDataStream.fulfilled, (state, action) => {
				state.recordingVoice = false;
				state.mediaDraft = action.payload;
			})
			.addCase(getDataStream.rejected, (state, action) => {
				const err = action.payload;
				console.error("media recorder: ", err);
				state.mediaDeviceErr = true;
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
	resetMediaDeviceErr,
	setPlaybackRate,
} = chatSlice.actions;

export default chatSlice.reducer;

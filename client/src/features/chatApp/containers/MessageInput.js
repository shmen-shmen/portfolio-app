import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	typingChatMessage,
	submitChatMessage,
	getDataStream,
} from "../chatSlice";

import { stopRecording } from "../mediaRecorder";

function MessageInput() {
	const { typing, activeUserId, voiceDraft, recordingVoice } = useSelector(
		(state) => state.chat
	);
	const dispatch = useDispatch();

	const handleInputChange = (e) => {
		dispatch(typingChatMessage(e.target.value));
	};
	const handleMessageSubmit = (e) => {
		e.preventDefault();
		dispatch(submitChatMessage({ newMsgText: typing, id: activeUserId }));
	};
	const handleRecPress = (e) => {
		e.preventDefault();
		if (!recordingVoice) {
			dispatch(getDataStream());
		}
	};
	const handleRecRelease = (e) => {
		e.preventDefault();
		if (recordingVoice) {
			stopRecording();
		}
	};

	return (
		<>
			<form className="Message" onSubmit={handleMessageSubmit}>
				{voiceDraft ? (
					<audio controls src={voiceDraft} className="Message__input"></audio>
				) : (
					<input
						type="text"
						className="Message__input"
						value={typing}
						placeholder="say something cunt"
						onChange={handleInputChange}
					/>
				)}
				<button
					className="Message__rec_btn"
					onMouseDown={handleRecPress}
					onMouseUp={handleRecRelease}
				>
					rec
				</button>
			</form>
		</>
	);
}

export default MessageInput;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	typingChatMessage,
	submitChatMessage,
	getDataStream,
} from "../chatSlice";
import VoiceWrapper from "./VoiceWrapper";
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
		const btnClick = e.type === "click";
		const ctrlEnter = e.keyCode === 13 && (e.metaKey || e.ctrlKey);
		const notEmpty = typing || voiceDraft;
		if ((btnClick || ctrlEnter) && notEmpty) {
			dispatch(
				submitChatMessage({
					type: voiceDraft ? "voice" : "text",
					payload: voiceDraft ? voiceDraft.url : typing,
					id: activeUserId,
				})
			);
		}
		return;
	};

	const handleRecPress = () => {
		if (!recordingVoice) {
			dispatch(getDataStream());
		}
	};

	const handleRecRelease = () => {
		if (recordingVoice) {
			stopRecording();
		}
	};

	const messageInputBtn = () => {
		if (typing || voiceDraft) {
			return (
				<button className="Message__send_rec_btn" onClick={handleMessageSubmit}>
					send
				</button>
			);
		} else
			return (
				<button
					className="Message__send_rec_btn"
					onMouseDown={handleRecPress}
					onMouseUp={handleRecRelease}
				>
					rec
				</button>
			);
	};

	return (
		<article className="Message" onSubmit={handleMessageSubmit}>
			<div className="Message__input_preview">
				{voiceDraft ? (
					<VoiceWrapper src={voiceDraft.url} draft={true}></VoiceWrapper>
				) : (
					<input
						type="text"
						className="Message__input_text"
						value={typing}
						placeholder="say something cunt"
						onChange={handleInputChange}
						onKeyDown={handleMessageSubmit}
					/>
				)}
			</div>
			{messageInputBtn()}
		</article>
	);
}

export default MessageInput;

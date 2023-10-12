import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	typingChatMessage,
	submitChatMessage,
	getDataStream,
	switchVideoMode,
} from "../chatSlice";
import VoiceWrapper from "./VoiceWrapper";
import { stopRecording } from "../mediaRecorder";

function MessageInput() {
	const { typing, activeUserId, videoMode, voiceDraft, recordingVoice } =
		useSelector((state) => state.chat);

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
					type: voiceDraft ? voiceDraft.type : "text",
					contents: voiceDraft ? voiceDraft.contents : typing,
					id: activeUserId,
				})
			);
		}
		return;
	};

	let recPressTimeoutId = null;
	let touchStartTime = 0;
	const clickHoldCutoff = 200;

	const handleRecPress = () => {
		touchStartTime = new Date();
		recPressTimeoutId = setTimeout(() => {
			if (!recordingVoice) {
				dispatch(getDataStream(videoMode));
			}
		}, clickHoldCutoff);
	};

	const handleRecRelease = () => {
		if (new Date() - touchStartTime < clickHoldCutoff) {
			dispatch(switchVideoMode());
		}
		if (recPressTimeoutId) {
			clearTimeout(recPressTimeoutId);
		}
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
					className={`Message__send_rec_btn ${recordingVoice ? "active" : ""}`}
					onMouseDown={handleRecPress}
					onMouseUp={handleRecRelease}
				>
					<span className={"Message__send_rec_btn_emoji"}>
						{videoMode ? "📷" : "🎤"}
					</span>
				</button>
			);
	};

	return (
		<article className="Message" onSubmit={handleMessageSubmit}>
			<div className="Message__input_preview">
				{voiceDraft ? (
					<VoiceWrapper
						contents={voiceDraft.contents}
						type={voiceDraft.type}
						draft={true}
					></VoiceWrapper>
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

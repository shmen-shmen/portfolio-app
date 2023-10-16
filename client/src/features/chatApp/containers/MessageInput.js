import React, { useEffect, useRef, useState } from "react";
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

	// const [voiceDraft, setVoiceDraft] = useState(null);
	// const [recordingVoice, setRecordingVoice] = useState(false);
	// const [videoPreview, setVideoPreview] = useState(null);
	// useEffect(() => {
	// 	console.log("VIDEOPREVIEW: ", videoPreview);
	// }, [videoPreview]);
	// useEffect(() => {
	// 	console.log("VOICEDRAFT: ", voiceDraft);
	// }, [voiceDraft]);

	const dispatch = useDispatch();
	// const previewRef = useRef(null);

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
				// let preview = previewRef;
				dispatch(getDataStream(videoMode));
				// startRecording(
				// 	videoMode,
				// 	setRecordingVoice,
				// 	setVoiceDraft,
				// 	setVideoPreview,
				// 	preview
				// );
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
				{
					// recordingVoice && videoMode ? (
					// 	<video ref={previewRef} src={videoPreview}></video>
					// ) :
					voiceDraft ? (
						<VoiceWrapper
							contents={voiceDraft.contents}
							type={voiceDraft.type}
							draft={true}
						></VoiceWrapper>
					) : (
						<textarea
							type="text"
							className="Message__input_text"
							value={typing}
							placeholder="say something cunt"
							onChange={handleInputChange}
							onKeyDown={handleMessageSubmit}
						></textarea>
					)
				}
			</div>
			{messageInputBtn()}
		</article>
	);
}

export default MessageInput;

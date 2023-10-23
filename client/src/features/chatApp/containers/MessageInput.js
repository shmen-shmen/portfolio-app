import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	typingChatMessage,
	submitChatMessage,
	getDataStream,
	switchVideoMode,
} from "../chatSlice";
import MediaWrapper from "./MediaWrapper";
import { stopRecording } from "../mediaRecorder";

function MessageInput() {
	const { typing, activeContactId, videoMode, mediaDraft, recordingVoice } =
		useSelector((state) => state.chat);

	const dispatch = useDispatch();

	const handleInputChange = (e) => {
		dispatch(typingChatMessage(e.target.value));
	};

	// useEffect(() => {
	// 	window.addEventListener("keydown", checkCtrlEnter);
	// 	return () => {
	// 		window.removeEventListener("keydown", checkCtrlEnter);
	// 	};
	// }, []);

	// const checkCtrlEnter = (e) => {
	// 	if ((e.key === "Enter" || e.keyCode === 13) && (e.metaKey || e.ctrlKey)) {
	// 		console.log("typing from checkctrlenter", typing);
	// 		console.log("ctrl+enter");
	// 		handleMessageSubmit();
	// 	} else return;
	// };

	const handleMessageSubmit = (e) => {
		const notEmpty = typing || mediaDraft;

		const sendBtnClick = e.type === "click";
		const ctrlEnter =
			(e.key === "Enter" || e.keyCode === 13) && (e.metaKey || e.ctrlKey);
		const correctTrigger = ctrlEnter || sendBtnClick;

		if (notEmpty && correctTrigger) {
			dispatch(
				submitChatMessage({
					type: mediaDraft ? mediaDraft.type : "text",
					contents: mediaDraft ? mediaDraft.contents : typing,
					id: activeContactId,
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
		if (typing || mediaDraft) {
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
		<article className="Message" onKeyDown={handleMessageSubmit}>
			<div className="Message__input_preview">
				{recordingVoice ? (
					<canvas className="voiceVisualizer"></canvas>
				) : mediaDraft ? (
					<MediaWrapper
						contents={mediaDraft.contents}
						type={mediaDraft.type}
						draft={true}
					></MediaWrapper>
				) : (
					<textarea
						type="text"
						className="Message__input_text"
						value={typing}
						placeholder="say something cunt"
						onChange={handleInputChange}
					></textarea>
				)}
			</div>
			{messageInputBtn()}
		</article>
	);
}

export default MessageInput;

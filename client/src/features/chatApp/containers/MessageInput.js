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
	const dispatch = useDispatch();
	const messageInputRef = useRef(null);
	const { typing, activeContactId, videoMode, mediaDraft, recordingVoice } =
		useSelector((state) => state.chat);

	const resizeMessageInput = (reset) => {
		messageInputRef.current.setAttribute(
			"style",
			"height:" + messageInputRef.current.scrollHeight + "px;overflow-y:hidden;"
		);
		if (reset) {
			messageInputRef.current.style.height = "18px";
			return;
		} else {
			if (messageInputRef.current.scrollHeight > window.innerHeight * 0.6) {
				console.log(messageInputRef.current.scrollHeight);
				messageInputRef.current.style.overflow = "scroll";
				return;
			} else {
				messageInputRef.current.style.overflow = "hidden";
				messageInputRef.current.style.height = 0;
				messageInputRef.current.style.height =
					messageInputRef.current.scrollHeight + "px";
			}
		}
	};

	useEffect(() => {
		resizeMessageInput();
	}, [typing]);

	const handleInputChange = (e) => {
		dispatch(typingChatMessage(e.target.value));
	};

	const sendMessage = (e) => {
		const notEmpty = typing || mediaDraft;

		const sendBtnClick = e.type === "click";
		const ctrlEnter =
			(e.key === "Enter" || e.keyCode === 13) && (e.metaKey || e.ctrlKey);
		const correctTrigger = ctrlEnter || sendBtnClick;

		if (notEmpty && correctTrigger) {
			if (!mediaDraft) {
				resizeMessageInput(true);
			}
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
				<button className="Message__send_rec_btn" onClick={sendMessage}>
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
	// 		sendMessage();
	// 	} else return;
	// };

	const [placeholderMobile, setPlaceholderMobile] = useState(
		window.innerWidth <= 600
	);
	useEffect(() => {
		const placeholderCallback = () => {
			setPlaceholderMobile(window.innerWidth <= 600);
			return;
		};
		window.addEventListener("resize", placeholderCallback);
		return () => window.removeEventListener("resize", placeholderCallback);
	}, []);

	return (
		<article className="Message" onKeyDown={sendMessage}>
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
						ref={messageInputRef}
						type="text"
						className="Message__input_text"
						value={typing}
						placeholder={
							placeholderMobile ? "message" : "cmd(ctrl) + enter to send"
						}
						onChange={handleInputChange}
					></textarea>
				)}
			</div>
			{messageInputBtn()}
		</article>
	);
}

export default MessageInput;

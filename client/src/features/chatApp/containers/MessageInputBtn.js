import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataStream, switchVideoMode } from "../chatSlice";
import { stopRecording } from "../mediaRecorder";
import "./MessageInput.scss";

function MessageInputBtn({ sendMessage }) {
	const dispatch = useDispatch();
	const { typing, videoMode, mediaDraft, recordingVoice } = useSelector(
		(state) => state.chat
	);

	let recPressTimeoutId = null;
	let touchStartTime = 0;
	const clickHoldCutoff = 200;

	const handleRecPress = (e) => {
		e.preventDefault();
		touchStartTime = new Date();
		// console.log(touchStartTime);
		recPressTimeoutId = setTimeout(() => {
			if (!recordingVoice) {
				dispatch(getDataStream(videoMode));
			}
		}, clickHoldCutoff);
	};

	const handleRecRelease = (e) => {
		e.preventDefault();
		if (recordingVoice) {
			stopRecording();
		} else {
			if (new Date() - touchStartTime < clickHoldCutoff) {
				dispatch(switchVideoMode());
			}
			if (recPressTimeoutId) {
				clearTimeout(recPressTimeoutId);
			}
		}
	};

	return (
		<>
			{typing || mediaDraft ? (
				<button className="Message__send_rec_btn" onClick={sendMessage}>
					send
				</button>
			) : (
				<button
					className={`Message__send_rec_btn ${recordingVoice ? "active" : ""}`}
					onMouseDown={handleRecPress}
					onTouchStart={handleRecPress}
					onMouseUp={handleRecRelease}
					onMouseLeave={handleRecRelease}
					onTouchEnd={handleRecRelease}
					onTouchCancel={handleRecRelease}
				>
					<span className={"Message__send_rec_btn_emoji"}>
						{videoMode ? "📷" : "🎤"}
					</span>
				</button>
			)}
		</>
	);
}

export default MessageInputBtn;

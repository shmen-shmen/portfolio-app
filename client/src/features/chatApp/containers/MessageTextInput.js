import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	typingChatMessage,
	abortEditChatMessage,
	resetMediaDeviceErr,
} from "../chatSlice";
import "./MessageInput.scss";

function MessageTextInput({ messageInputRef }) {
	const dispatch = useDispatch();
	const { typing, mediaDeviceErr } = useSelector((state) => state.chat);
	const editing = useSelector((state) => Boolean(state.chat.editing.number));

	const handleInputChange = (e) => {
		dispatch(typingChatMessage(e.target.value));
	};

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

	const [mediaDeviceErrTimeout, setMediaDeviceErrTimeout] = useState(null);
	useEffect(() => {
		if (!mediaDeviceErr) {
			return;
		}
		if (mediaDeviceErrTimeout) {
			clearTimeout(mediaDeviceErrTimeout);
		}
		const id = setTimeout(() => {
			dispatch(resetMediaDeviceErr());
			setMediaDeviceErrTimeout(null);
		}, 3000);
		setMediaDeviceErrTimeout(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, mediaDeviceErr]);

	const placeholder = () => {
		if (mediaDeviceErr) {
			return "check camera/mic permissson";
		} else if (placeholderMobile) {
			return "message";
		} else return "cmd(ctrl) + enter to send";
	};

	return (
		<div className="Message__input_text-wrap">
			{editing && (
				<p
					className="Message__input_edit_flag"
					onClick={() => {
						dispatch(abortEditChatMessage());
					}}
				>
					editing (click to cancel)
				</p>
			)}
			<textarea
				className="Message__input_text"
				ref={messageInputRef}
				type="text"
				value={typing}
				placeholder={placeholder()}
				onChange={handleInputChange}
			></textarea>
		</div>
	);
}

export default MessageTextInput;

import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { submitChatMessage, setInputHeight } from "../chatSlice";
import MessageInputPreview from "./MessageInputPreview";
import MessageInputBtn from "./MessageInputBtn";
import "./MessageInput.scss";

function MessageInput() {
	const dispatch = useDispatch();

	const { typing, activeContactId, mediaDraft, recordingVoice } = useSelector(
		(state) => state.chat
	);

	const messageInputRef = useRef(null);

	const sendMessage = (e) => {
		if (messageInputRef.current) {
			messageInputRef.current.focus();
		}
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
					duration: mediaDraft ? mediaDraft.duration : null,
					id: activeContactId,
					time: Date.now(),
				})
			);
		}
		return;
	};

	// this code block resizes text input when typing multi-line messages
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
	// useEffect(() => {
	// 	resizeMessageInput();
	// }, [typing]);

	// this code block resizes input wrapper when video message preview
	const inputWrapperRef = useRef(null);
	useEffect(() => {
		const element = inputWrapperRef?.current;
		if (!element) return;
		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				dispatch(setInputHeight(entry.contentBoxSize[0].blockSize));
			}
		});
		observer.observe(element);
		return () => {
			observer.disconnect();
		};
	}, [dispatch]);

	return (
		<article
			className="Message__input"
			onKeyDown={sendMessage}
			ref={inputWrapperRef}
		>
			<MessageInputPreview
				messageInputRef={messageInputRef}
				mediaDraft={mediaDraft}
				recordingVoice={recordingVoice}
			/>
			<MessageInputBtn sendMessage={sendMessage} />
		</article>
	);
}

export default MessageInput;

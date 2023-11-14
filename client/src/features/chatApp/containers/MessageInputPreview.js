import React from "react";
import MediaWrapper from "./MediaWrapper";
import MessageTextInput from "./MessageTextInput";
import "./MessageInput.scss";

function MessageInputPreview({ mediaDraft, recordingVoice, messageInputRef }) {
	return (
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
				<MessageTextInput messageInputRef={messageInputRef} />
			)}
		</div>
	);
}

export default MessageInputPreview;

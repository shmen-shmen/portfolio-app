import React from "react";
import { typingMessage } from "./weatherSlice";
import { useDispatch, useSelector } from "react-redux";

function ReportMessage({ sunIsOut }) {
	const { message } = useSelector((state) => state.weatherHere);
	const dispatch = useDispatch();
	const handleTypingMessage = (e) => {
		dispatch(typingMessage(e.target.value));
	};

	return (
		<textarea
			id="checkin-message-textarea"
			className={`report-log-message-${sunIsOut ? "day" : "night"}`}
			maxLength={70}
			placeholder="(You can leave a short message for someone else to see ✍️)"
			value={message}
			onChange={handleTypingMessage}
		></textarea>
	);
}

export default ReportMessage;

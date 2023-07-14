import { useSelector } from "react-redux";
import { useEffect } from "react";

const ClockDialog = ({ beep }) => {
	const { sessionBreak, intervalId } = useSelector(
		(state) => state.twentyFiveClock
	);

	const dialog = document.getElementById("clock-dialog");

	const dialogHandler = () => {
		beep.pause();
		beep.currentTime = 0;
	};

	useEffect(() => {
		if (intervalId != 0) {
			dialog.show();
		}
	}, [sessionBreak]);

	return (
		<dialog id="clock-dialog">
			<div id="clock-dialog-content">
				<div>
					<span>{sessionBreak}</span>
					<span> has begun!</span>
				</div>
				<form method="dialog">
					<button onClick={dialogHandler} className="clock-btn">
						{sessionBreak == "session" ? "💪" : "😌"}
					</button>
				</form>
			</div>
		</dialog>
	);
};

export default ClockDialog;

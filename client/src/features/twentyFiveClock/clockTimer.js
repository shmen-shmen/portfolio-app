import { useDispatch, useSelector } from "react-redux";
import { reset, start, tick, stop } from "./twentyFiveClockSlice";

import { useEffect } from "react";

const ClockTimer = ({ timeConverter, beep }) => {
	const dispatch = useDispatch();
	const { timeRemaining, intervalId, startStop, sessionBreak } = useSelector(
		(state) => state.twentyFiveClock
	);

	const startHandler = () => {
		if (intervalId == 0) {
			let interval = setInterval(() => {
				dispatch(tick());
			}, 1000);
			dispatch(start(interval));
		} else {
			clearInterval(intervalId);
			dispatch(stop());

			beep.pause();
			beep.currentTime = 0;
		}
	};

	const resetHandler = () => {
		clearInterval(intervalId);
		beep = document.getElementById("beep");
		beep.pause();
		beep.currentTime = 0;

		dispatch(reset());
	};

	useEffect(() => {
		if (intervalId != 0) {
			beep.play();
			setTimeout(() => {
				beep.pause();
				beep.currentTime = 0;
			}, 5000);
		}
	}, [sessionBreak]);

	return (
		<div id="timer" className="clock-control">
			<div id="timer-toprow">
				<span id="timer-label">{sessionBreak + " "}</span>
				<span id="time-left">{timeConverter(timeRemaining, true)}</span>
			</div>
			<div id="timer-bottomrow">
				<button
					id="start_stop"
					className={`clock-btn timer-btn timer-btn-${startStop}`}
					onClick={startHandler}
				>
					{startStop + " timer"}
				</button>
				<button
					id="reset"
					className="clock-btn timer-btn"
					onClick={resetHandler}
				>
					reset
				</button>
			</div>
		</div>
	);
};

export default ClockTimer;

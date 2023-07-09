import { useSelector, useDispatch } from "react-redux";
import {
	toggleAlarmMenu,
	selectAlarm,
	hide_twentyFiveClock,
	reset,
} from "./twentyFiveClockSlice";

import { show_appSelector } from "../appSelector/appSelectorSlice";

const ClockAlarmMenu = () => {
	const dispatch = useDispatch();

	const { displayName, alarms, alarmMenu, activeAlarm, intervalId } =
		useSelector((state) => state.twentyFiveClock);

	const exitHandler = () => {
		clearInterval(intervalId);
		dispatch(reset());
		dispatch(hide_twentyFiveClock());
		dispatch(show_appSelector());
	};

	const showAlarmMenu = () => {
		dispatch(toggleAlarmMenu(true));
	};

	const hideAlarmMenu = () => {
		dispatch(toggleAlarmMenu(false));
	};

	const selectAlarmSound = (e) => {
		dispatch(selectAlarm(e.target.id));
		const alarmCheck = document.getElementById(e.target.id + "-audio");
		alarmCheck.play();
	};

	const stopCheckAlarmSound = (e) => {
		const alarmCheck = document.getElementById(e.target.id + "-audio");
		alarmCheck.pause();
		alarmCheck.currentTime = 0;
	};

	return (
		<div
			id="clock-label-menu"
			onMouseOver={showAlarmMenu}
			onMouseLeave={hideAlarmMenu}
		>
			{alarmMenu ? (
				<div id="alarm-menu">
					{alarms.map((alarm) => {
						return (
							<div
								id={alarm}
								className={
									alarm == activeAlarm
										? "alarm-menu-item alarm-menu-item-active"
										: "alarm-menu-item"
								}
								key={alarm + "-key"}
								onDoubleClick={selectAlarmSound}
								onMouseLeave={stopCheckAlarmSound}
							>
								{alarm}
								<audio
									id={alarm + "-audio"}
									src={`sounds/tortTulikMal/${alarm}.wav`}
								></audio>
							</div>
						);
					})}
					<button id="twentyFiveClock-close-btn" onClick={exitHandler}>
						QUIT APP
					</button>
				</div>
			) : (
				<h1 id="twentyFiveClock-label">{displayName}</h1>
			)}
		</div>
	);
};

export default ClockAlarmMenu;

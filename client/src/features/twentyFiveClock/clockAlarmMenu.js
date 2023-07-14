import { useSelector, useDispatch } from "react-redux";
import {
	toggleAlarmMenu,
	selectAlarm,
	hide_twentyFiveClock,
} from "./twentyFiveClockSlice";

import { show_appSelector } from "../appSelector/appSelectorSlice";

const ClockAlarmMenu = () => {
	const dispatch = useDispatch();
	let interval = 0;
	let MenuIntervalId;

	const { displayName, alarms, alarmMenu, activeAlarm, intervalId } =
		useSelector((state) => state.twentyFiveClock);

	const exitHandler = () => {
		clearInterval(intervalId);
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

	const MobileSelectAlarmSound = (e) => {
		const alarmCheck = document.getElementById(e.target.id + "-audio");
		alarmCheck.play();
		MenuIntervalId = setInterval(() => {
			if (interval == 500) {
				dispatch(selectAlarm(e.target.id));
				clearInterval(MenuIntervalId);
				interval = 0;
			} else {
				console.log(interval);
				interval++;
			}
		}, 1);
	};

	const MobileStopCheckAlarmSound = (e) => {
		stopCheckAlarmSound(e);
		clearInterval(MenuIntervalId);
		interval = 0;
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
			onClick={showAlarmMenu}
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
								onTouchStart={MobileSelectAlarmSound}
								onTouchEnd={MobileStopCheckAlarmSound}
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
				<div id="twentyFiveClock-label">
					<h1>{displayName}</h1>
					<p className="clock-menu-disclaimer-hover">
						* hover to see alarms ** double click to change alarm sound
					</p>
					<p className="clock-menu-disclaimer-nohover">
						* press to listen to alarm ** press and hold to select alarm
					</p>
				</div>
			)}
		</div>
	);
};

export default ClockAlarmMenu;

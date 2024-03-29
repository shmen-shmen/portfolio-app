import { useSelector, useDispatch } from "react-redux";
import {
	reset_drumMachine,
	padPress,
	padRelease,
	sampleEnd,
} from "./drumMachineSlice";
import "./drumMachine.scss";
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const DrumMachine = () => {
	const dispatch = useDispatch();
	const { pads, nowPlaying } = useSelector((state) => state.drumMachine);

	const padsRef = useRef(null);

	useEffect(() => {
		padsRef.current.focus();
	}, []);

	const handleExit = () => {
		dispatch(reset_drumMachine());
	};

	const handlePadPress = (e) => {
		let padId;
		e.code
			? (padId = e.code.replace(/^Key/, ""))
			: (padId = e.target.id.replace(/^pad-/, ""));

		if (padId in pads) {
			const sample = document.getElementById(padId);
			switch (e.type) {
				case "keydown":
				case "mousedown":
				case "touchstart":
					dispatch(padPress(padId));
					sample.load();
					sample.play();
					break;
				case "keyup":
				case "mouseup":
				case "touchend":
					dispatch(padRelease(padId));
					break;
				default:
					break;
			}
		}
	};

	const handleSampleEnd = (e) => {
		const padId = e.target.id;
		dispatch(sampleEnd(padId));
	};

	return (
		<section
			id="drum-machine"
			ref={padsRef}
			tabIndex={0}
			onKeyDown={handlePadPress}
			onKeyUp={handlePadPress}
		>
			<div className="pad-bank">
				<NavLink
					to={"/"}
					id="drums-close-btn"
					className="drums-btn"
					onClick={handleExit}
				>
					✕
				</NavLink>
				<div id="drums-display">
					<div id="emoji-container">
						{nowPlaying.map((emoji) => {
							return (
								<span className="now-playing" key={emoji + "key"}>
									{emoji}
								</span>
							);
						})}
					</div>
				</div>
				{Object.keys(pads).map((pad) => {
					const status = pads[pad]["press"];
					return (
						<div
							id={"pad-" + pad}
							key={"pad-" + pad}
							onMouseDown={handlePadPress}
							onMouseUp={handlePadPress}
							onTouchStart={handlePadPress}
							onTouchEnd={handlePadPress}
							className={`drum-pad drum-pad-${status}`}
						>
							<span className="center desktop">{`${pad}`}</span>
							<span className="center mobile">{`${pads[pad]["sample"]}`}</span>
							<audio
								className="clip"
								id={pad}
								src={`/sounds/tortTulikMal/${pads[pad]["sample"]}.wav`}
								onEnded={handleSampleEnd}
							></audio>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default DrumMachine;

import { useSelector, useDispatch } from "react-redux";
import { hide_drumMachine, padPress, padRelease } from "./drumMachineSlice";
import "./drumMachine.css";

const DrumMachine = () => {
	const { display, pads, nowPlaying } = useSelector(
		(state) => state.drumMachine
	);
	const dispatch = useDispatch();

	const handlePadPress = (e) => {
		let padId;
		e.code
			? (padId = e.code.replace(/^Key/, ""))
			: (padId = e.target.id.replace(/^pad-/, ""));

		if (padId in pads) {
			switch (e.type) {
				case "keydown":
				case "mousedown":
					dispatch(padPress(padId));
					document.getElementById(padId).play();
					break;
				case "keyup":
					dispatch(padRelease(padId));
					document.getElementById(padId).pause();
					document.getElementById(padId).load();
				case "mouseup":
					dispatch(padRelease(padId));
					break;
				default:
					break;
			}
		}
	};

	if (display) {
		return (
			<section
				id="drum-machine"
				tabIndex={0}
				onKeyDown={handlePadPress}
				onKeyUp={handlePadPress}
			>
				<button
					id="drums-close-btn"
					className="drums-btn"
					onClick={() => {
						dispatch(hide_drumMachine());
					}}
				>
					✕
				</button>
				<div className="pad-bank">
					{Object.keys(pads).map((pad) => {
						const status = pads[pad]["press"];
						return (
							<div
								id={"pad-" + pad}
								key={"pad-" + pad}
								onMouseDown={handlePadPress}
								onMouseUp={handlePadPress}
								className={`drum-pad drum-pad-${status}`}
							>
								{pad}
								<audio
									className="clip"
									id={pad}
									src={`/sounds/pads/${pads[pad]["sample"]}.wav`}
								></audio>
							</div>
						);
					})}
				</div>
				<div id="display">{nowPlaying}</div>
			</section>
		);
	} else {
		return null;
	}
};

export default DrumMachine;

import { useSelector, useDispatch } from "react-redux";
import { hide_drumMachine, padPress, padRelease } from "./drumMachineSlice";
import "./drumMachine.css";
import { useEffect, useRef } from "react";

const DrumMachine = () => {
	const dispatch = useDispatch();
	const { display, pads, nowPlaying } = useSelector(
		(state) => state.drumMachine
	);
	const padsRef = useRef(null);
	useEffect(() => {
		if (display) {
			console.log("pads in focus");
			padsRef.current.focus();
		}
	}, [display]);

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
				ref={padsRef}
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
									src={`/sounds/tortTulikMal/${pads[pad]["sample"]}.wav`}
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

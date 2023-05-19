import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import {} from "./fmSynthSlice";
import "./fmSynth.css";

const FmSynth = () => {
	const { display } = useSelector((state) => state.fmSynth);

	let context = new AudioContext();
	let o = context.createOscillator();
	o.type = "sine";
	o.connect(context.destination);

	if (display) {
		return (
			<div className="startstop">
				<button
					id="start"
					onClick={() => {
						o.start();
						// g.gain.exponentialRampToValueAtTime(
						// 	1.0,
						// 	context.currentTime + 0.04
						// );
						return;
					}}
				>
					PLAY
				</button>
				<button
					id="stop"
					onClick={() => {
						o.stop();
						// g.gain.exponentialRampToValueAtTime(
						// 	0.00001,
						// 	context.currentTime + 0.04
						// );
						o.disconnect(context.destination);
						return;
					}}
				>
					PAUSE
				</button>
			</div>
		);
	} else {
		return null;
	}
};

export default FmSynth;

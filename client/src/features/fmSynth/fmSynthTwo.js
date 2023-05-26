import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hide_fmSynth } from "./fmSynthSlice";
import "./fmSynth.css";

const FmSynthTwo = () => {
	const dispatch = useDispatch();
	const { display } = useSelector((state) => state.fmSynth);
	const audioContext = new AudioContext();

	const [microphoneStarted, setMicrophoneStarted] = useState(false);
	const [delayIsOn, setDelayIsOn] = useState(false);

	const primaryGainControl = audioContext.createGain();
	primaryGainControl.gain.setValueAtTime(0.35, 0);

	function createEchoDelayEffect(ctx) {
		const delay = ctx.createDelay(1);
		const dryNode = ctx.createGain();
		const wetNode = ctx.createGain();
		const mixer = ctx.createGain();
		const filter = ctx.createBiquadFilter();

		delay.delayTime.value = 0.75;
		dryNode.gain.value = 1;
		wetNode.gain.value = 0;
		filter.frequency.value = 1100;
		filter.type = "highpass";

		return {
			apply: function () {
				wetNode.gain.setValueAtTime(0.75, ctx.currentTime);
			},
			discard: function () {
				wetNode.gain.setValueAtTime(0, ctx.currentTime);
			},
			isApplied: function () {
				return wetNode.gain.value > 0;
			},
			placeBetween: function (inputNode, outputNode) {
				inputNode.connect(delay);
				delay.connect(wetNode);
				wetNode.connect(filter);
				filter.connect(delay);

				inputNode.connect(dryNode);
				dryNode.connect(mixer);
				wetNode.connect(mixer);
				mixer.connect(outputNode);
			},
		};
	}

	const echoDelay = createEchoDelayEffect(audioContext);

	primaryGainControl.connect(audioContext.destination);

	const voiceInput = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			let microphoneSource = audioContext.createMediaStreamSource(stream);
			echoDelay.placeBetween(microphoneSource, primaryGainControl);
		} catch (error) {
			console.error("something wrong with microphone", error);
		}
	};

	useEffect(() => {
		if (microphoneStarted) {
			voiceInput();
		}
		return;
	}, [microphoneStarted]);

	if (display) {
		return (
			<section className="pad">
				<button
					onClick={() => {
						dispatch(hide_fmSynth());
					}}
				>
					x
				</button>
				<button
					onClick={() => {
						setMicrophoneStarted(!microphoneStarted);
					}}
				>
					voice
				</button>
				<button
					id="delay"
					onClick={() => {
						if (echoDelay.isApplied()) {
							echoDelay.discard();
						} else {
							echoDelay.apply();
						}
					}}
					style={delayIsOn ? { color: "red" } : {}}
				>
					delay
				</button>
			</section>
		);
	} else {
		return null;
	}
};

export default FmSynthTwo;

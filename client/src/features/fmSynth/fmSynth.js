import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hide_fmSynth } from "./fmSynthSlice";
import "./fmSynth.css";

let audioContext = new AudioContext();

const FmSynth = () => {
	const dispatch = useDispatch();
	const { display } = useSelector((state) => state.fmSynth);

	const [delaySwitch, setDelaySwitch] = useState(false);
	const [voiceSwitch, setVoiceSwitch] = useState(false);
	// const [hihatSwitch, setHihatSwitch] = useState(false);
	// const [snare1Switch, setSnare1Switch] = useState(false);
	// const [snare2Switch, setSnare2Switch] = useState(false);
	// const [kickSwitch, setKickSwitch] = useState(false);

	// const buffer = audioContext.createBuffer(
	// 	1,
	// 	audioContext.sampleRate * 1,
	// 	audioContext.sampleRate
	// );

	// const channelData = buffer.getChannelData(0);

	// for (let i = 0; i < buffer.length; i++) {
	// 	channelData[i] = Math.random() * 2 - 1;
	// }

	const primaryGainControl = audioContext.createGain();
	primaryGainControl.gain.setValueAtTime(0.35, 0);

	const delay = audioContext.createDelay();
	delay.delayTime.setValueAtTime(0.1, 0);
	const delayFeedback = audioContext.createGain();
	delayFeedback.gain.setValueAtTime(0.8, 0);
	delay.connect(delayFeedback);
	delayFeedback.connect(delay);
	delay.connect(primaryGainControl);

	// const snareFilterHP = audioContext.createBiquadFilter();
	// snareFilterHP.type = "highpass";
	// snareFilterHP.frequency.value = 1500;
	// snareFilterHP.connect(delaySwitch ? delay : primaryGainControl);
	// const snareFilterLP = audioContext.createBiquadFilter();
	// snareFilterLP.type = "lowpass";
	// snareFilterLP.frequency.value = 1500;
	// snareFilterLP.connect(delaySwitch ? delay : primaryGainControl);

	primaryGainControl.connect(audioContext.destination);

	// const snare1 = () => {
	// 	const whiteNoizeSource = audioContext.createBufferSource();
	// 	whiteNoizeSource.buffer = buffer;

	// 	const snareGain = audioContext.createGain();
	// 	snareGain.gain.setValueAtTime(1, 0);
	// 	snareGain.gain.exponentialRampToValueAtTime(
	// 		0.0001,
	// 		audioContext.currentTime + 0.5
	// 	);
	// 	whiteNoizeSource.connect(snareGain);
	// 	snareGain.connect(snareFilterHP);

	// 	whiteNoizeSource.start();
	// 	whiteNoizeSource.stop(audioContext.currentTime + 0.5);

	// 	const snareOscillator = audioContext.createOscillator();
	// 	snareOscillator.type = "sine";
	// 	snareOscillator.frequency.setValueAtTime(1500, 0);
	// 	snareOscillator.frequency.exponentialRampToValueAtTime(
	// 		0.001,
	// 		audioContext.currentTime + 0.5
	// 	);
	// 	snareOscillator.connect(snareGain);
	// 	snareOscillator.start();
	// 	snareOscillator.stop(audioContext.currentTime + 0.5);
	// };

	// const snare2 = () => {
	// 	const whiteNoizeSource = audioContext.createBufferSource();
	// 	whiteNoizeSource.buffer = buffer;

	// 	const snareGain = audioContext.createGain();
	// 	snareGain.gain.setValueAtTime(1, 0);
	// 	snareGain.gain.exponentialRampToValueAtTime(
	// 		0.0001,
	// 		audioContext.currentTime + 0.5
	// 	);
	// 	whiteNoizeSource.connect(snareGain);
	// 	snareGain.connect(snareFilterLP);

	// 	whiteNoizeSource.start();
	// 	whiteNoizeSource.stop(audioContext.currentTime + 0.5);

	// 	const snareOscillator = audioContext.createOscillator();
	// 	snareOscillator.type = "sawtooth";
	// 	snareOscillator.frequency.setValueAtTime(100, 0);
	// 	snareOscillator.frequency.exponentialRampToValueAtTime(
	// 		0.001,
	// 		audioContext.currentTime + 0.5
	// 	);
	// 	snareOscillator.connect(snareGain);
	// 	snareOscillator.start();
	// 	snareOscillator.stop(audioContext.currentTime + 0.5);
	// };

	// const kick = () => {
	// 	const kickOscillator = audioContext.createOscillator();

	// 	kickOscillator.frequency.setValueAtTime(100, 0);
	// 	kickOscillator.type = "square";
	// 	kickOscillator.frequency.exponentialRampToValueAtTime(
	// 		0.001,
	// 		audioContext.currentTime + 0.5
	// 	);

	// 	const kickGain = audioContext.createGain();
	// 	kickGain.gain.setValueAtTime(1, 0);
	// 	kickGain.gain.exponentialRampToValueAtTime(
	// 		0.001,
	// 		audioContext.currentTime + 0.5
	// 	);

	// 	kickOscillator.connect(kickGain);
	// 	kickGain.connect(delaySwitch ? delay : primaryGainControl);
	// 	kickOscillator.start();
	// 	kickOscillator.stop(audioContext.currentTime + 0.5);
	// };

	// const hihat = async () => {
	// 	const response = await fetch("/sounds/634818__collinb1000__closed3.wav");
	// 	const soundBuffer = await response.arrayBuffer();
	// 	const hihatBuffer = await audioContext.decodeAudioData(soundBuffer);

	// 	const hihatSource = audioContext.createBufferSource();
	// 	hihatSource.buffer = hihatBuffer;
	// 	hihatSource.connect(delaySwitch ? delay : primaryGainControl);

	// 	hihatSource.start();
	// 	hihatSource.stop(audioContext.currentTime + hihatBuffer.duration);
	// };

	const voiceInput = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const microphoneSource = audioContext.createMediaStreamSource(stream);
			microphoneSource.connect(delaySwitch ? delay : primaryGainControl);
		} catch (error) {
			console.error("something wrong with microphone", error);
		}
	};

	if (display) {
		return (
			<section>
				<div
					className="pad"
					onKeyDown={(e) => {
						switch (e.key) {
							// case "f":
							// 	setHihatSwitch(true);
							// 	hihat();
							// 	break;
							// case "g":
							// 	snare1();
							// 	setSnare1Switch(true);
							// 	break;
							// case "h":
							// 	setSnare2Switch(true);
							// 	snare2();
							// 	break;
							// case "b":
							// 	setKickSwitch(true);
							// 	kick();
							// 	break;
							case "v":
								setVoiceSwitch(!voiceSwitch);
								voiceInput();
								break;
							case "d":
								setDelaySwitch(!delaySwitch);
								break;
							default:
								return;
						}
					}}
					onKeyUp={(e) => {
						switch (
							e.key
							// case "f":
							// 	setHihatSwitch(false);
							// 	break;
							// case "g":
							// 	setSnare1Switch(false);
							// 	break;
							// case "h":
							// 	setSnare2Switch(false);
							// 	break;
							// case "b":
							// 	setKickSwitch(false);
							// 	break;
						) {
						}
					}}
				>
					<button
						onClick={() => {
							dispatch(hide_fmSynth());
						}}
					>
						x
					</button>
					{/* <button
						id="hi-hat"
						onClick={hihat}
						style={hihatSwitch ? { color: "red" } : {}}
					>
						hihat
					</button>
					<button
						id="snare-one"
						onClick={snare1}
						style={snare1Switch ? { color: "red" } : {}}
					>
						snare1
					</button>
					<button
						id="snare-two"
						onClick={snare2}
						style={snare2Switch ? { color: "red" } : {}}
					>
						snare2
					</button>
					<button
						id="kick-drum"
						onClick={kick}
						style={kickSwitch ? { color: "red" } : {}}
					>
						kick
					</button> */}
					<button
						id="delay"
						onClick={() => {
							setDelaySwitch(!delaySwitch);
						}}
						style={delaySwitch ? { color: "red" } : {}}
					>
						delay
					</button>
					<button
						id="voice"
						onClick={() => {
							voiceInput();
							setVoiceSwitch(!voiceSwitch);
						}}
						style={voiceSwitch ? { color: "red" } : {}}
					>
						voice
					</button>
				</div>
			</section>
		);
	} else {
		return null;
	}
};

export default FmSynth;

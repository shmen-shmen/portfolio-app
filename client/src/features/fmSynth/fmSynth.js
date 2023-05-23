import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hide_fmSynth } from "./fmSynthSlice";
import "./fmSynth.css";

const FmSynth = () => {
	const { display } = useSelector((state) => state.fmSynth);
	const dispatch = useDispatch();

	let audioContext = new AudioContext();

	const buffer = audioContext.createBuffer(
		1,
		audioContext.sampleRate * 1,
		audioContext.sampleRate
	);

	const channelData = buffer.getChannelData(0);

	for (let i = 0; i < buffer.length; i++) {
		channelData[i] = Math.random() * 2 - 1;
	}

	const primaryGainControl = audioContext.createGain();
	primaryGainControl.gain.setValueAtTime(0.05, 0);

	primaryGainControl.connect(audioContext.destination);

	const snareFilterHP = audioContext.createBiquadFilter();
	snareFilterHP.type = "highpass";
	snareFilterHP.frequency.value = 1500;
	snareFilterHP.connect(primaryGainControl);
	const snareFilterLP = audioContext.createBiquadFilter();
	snareFilterLP.type = "lowpass";
	snareFilterLP.frequency.value = 1500;
	snareFilterLP.connect(primaryGainControl);

	if (display) {
		return (
			<section>
				<div className="startstop">
					<button
						onClick={() => {
							dispatch(hide_fmSynth());
						}}
					>
						x
					</button>
					<button
						id="snare-one"
						onClick={() => {
							const whiteNoizeSource = audioContext.createBufferSource();
							whiteNoizeSource.buffer = buffer;

							const snareGain = audioContext.createGain();
							snareGain.gain.setValueAtTime(1, 0);
							snareGain.gain.exponentialRampToValueAtTime(
								0.0001,
								audioContext.currentTime + 0.5
							);
							whiteNoizeSource.connect(snareGain);
							snareGain.connect(snareFilterHP);

							whiteNoizeSource.start();
							whiteNoizeSource.stop(audioContext.currentTime + 0.5);

							const snareOscillator = audioContext.createOscillator();
							snareOscillator.type = "sine";
							snareOscillator.frequency.setValueAtTime(1500, 0);
							snareOscillator.frequency.exponentialRampToValueAtTime(
								0.001,
								audioContext.currentTime + 0.5
							);
							snareOscillator.connect(snareGain);
							snareOscillator.start();
							return;
						}}
					>
						snare1
					</button>
					<button
						id="snare-two"
						onClick={() => {
							const whiteNoizeSource = audioContext.createBufferSource();
							whiteNoizeSource.buffer = buffer;

							const snareGain = audioContext.createGain();
							snareGain.gain.setValueAtTime(1, 0);
							snareGain.gain.exponentialRampToValueAtTime(
								0.0001,
								audioContext.currentTime + 0.5
							);
							whiteNoizeSource.connect(snareGain);
							snareGain.connect(snareFilterLP);

							whiteNoizeSource.start();
							whiteNoizeSource.stop(audioContext.currentTime + 0.5);

							const snareOscillator = audioContext.createOscillator();
							snareOscillator.type = "sawtooth";
							snareOscillator.frequency.setValueAtTime(100, 0);
							snareOscillator.frequency.exponentialRampToValueAtTime(
								0.001,
								audioContext.currentTime + 0.5
							);
							snareOscillator.connect(snareGain);
							snareOscillator.start();
							return;
						}}
					>
						snare2
					</button>
					<button
						id="kick-drum"
						onClick={() => {
							const kickOscillator = audioContext.createOscillator();

							kickOscillator.frequency.setValueAtTime(100, 0);
							kickOscillator.type = "square";
							kickOscillator.frequency.exponentialRampToValueAtTime(
								0.001,
								audioContext.currentTime + 0.5
							);

							const kickGain = audioContext.createGain();
							kickGain.gain.setValueAtTime(1, 0);
							kickGain.gain.exponentialRampToValueAtTime(
								0.001,
								audioContext.currentTime + 0.5
							);

							kickOscillator.connect(kickGain);
							kickGain.connect(primaryGainControl);
							kickOscillator.start();
							kickOscillator.stop(audioContext.currentTime + 0.5);
							return;
						}}
					>
						kick
					</button>
					<button
						id="hi-hat"
						onClick={async () => {
							const response = await fetch(
								"/sounds/634818__collinb1000__closed3.wav"
							);
							const soundBuffer = await response.arrayBuffer();
							const hihatBuffer = await audioContext.decodeAudioData(
								soundBuffer
							);

							const hihatSource = audioContext.createBufferSource();
							hihatSource.buffer = hihatBuffer;
							hihatSource.connect(primaryGainControl);

							hihatSource.start();
							return;
						}}
					>
						hihat
					</button>
				</div>
			</section>
		);
	} else {
		return null;
	}
};

export default FmSynth;

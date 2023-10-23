import { visualizeAudio } from "./audioVisualizer";
import { visualizeVideo, videoPreviewDispose } from "./videoPreviewVisualizer";

let mediaRecorder;
let mediaURL;

export const startRecording = (videoMode) => {
	return new Promise((resolve, reject) => {
		if (navigator.mediaDevices) {
			console.log("getUserMedia supported.");

			const constraints = {
				audio: true,
				video: videoMode,
			};
			let chunks = [];

			navigator.mediaDevices
				.getUserMedia(constraints)
				.then((stream) => {
					mediaRecorder = new MediaRecorder(stream);
					// gives camera some time to load
					setTimeout(
						() => {
							mediaRecorder.start();
							previewSetup(stream, videoMode);
						},
						videoMode ? 1000 : 0
					);

					// store media
					mediaRecorder.ondataavailable = (e) => {
						chunks.push(e.data);
					};

					mediaRecorder.onstop = () => {
						console.log("data available after MediaRecorder.stop() called.");

						// stop showing preview
						videoPreviewDispose();

						// check if anything was recorded
						const dataIsEmpty = chunks[0]["size"] == 0;
						if (dataIsEmpty) {
							return;
						}

						// saving recorded media
						const options = {
							audioBitsPerSecond: 128000,
							videoBitsPerSecond: 2500000,
							mimeType: videoMode
								? "video/webm;codecs=vp8,vorbis"
								: "audio/webm;codecs=opus",
						};
						const blob = new Blob(chunks, options);
						chunks = [];
						mediaURL = URL.createObjectURL(blob);
						resolve({
							type: videoMode ? "video" : "audio",
							contents: mediaURL,
						});

						// turn off camera/microphone
						if (stream) {
							const tracks = stream.getTracks();
							tracks.forEach((track) => track.stop());
						}
					};
				})
				.catch((err) => {
					reject(new Error(`The following error occurred: ${err}`));
				});
		} else reject(new Error("getUserMedia not supported."));
	});
};

// shows user his face or pretty waveform
const previewSetup = (stream, videoMode) => {
	if (!videoMode) {
		visualizeAudio(stream);
		return;
	}
	visualizeVideo(stream);
};

export const stopRecording = () => {
	console.log("STOP RECORDING");
	mediaRecorder.stop();
};

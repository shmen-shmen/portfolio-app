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
					mediaRecorder.start();

					mediaRecorder.onstop = () => {
						console.log("data available after MediaRecorder.stop() called.");
						const dataIsEmpty = chunks[0]["size"] == 0;
						if (dataIsEmpty) {
							return;
						}
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
						if (stream) {
							const tracks = stream.getTracks();
							tracks.forEach((track) => track.stop());
						}
					};

					mediaRecorder.ondataavailable = (e) => {
						chunks.push(e.data);
					};
				})
				.catch((err) => {
					reject(new Error(`The following error occurred: ${err}`));
				});
		} else reject(new Error("getUserMedia not supported."));
	});
};

export const stopRecording = () => {
	console.log("STOP RECORDING");
	mediaRecorder.stop();
};

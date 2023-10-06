let mediaRecorder;
let audioURL;

export const startRecording = () => {
	return new Promise((resolve, reject) => {
		if (navigator.mediaDevices) {
			console.log("getUserMedia supported.");

			const constraints = { audio: true };
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
						const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
						chunks = [];
						audioURL = URL.createObjectURL(blob);
						resolve(audioURL);
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

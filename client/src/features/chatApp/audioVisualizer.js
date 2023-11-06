let audioCtx;
let canvas;

export function visualizeAudio(stream) {
	if (!audioCtx) {
		audioCtx = new AudioContext();
	}

	const source = audioCtx.createMediaStreamSource(stream);
	source.gain = 10;

	const analyser = audioCtx.createAnalyser();
	analyser.fftSize = 2048;
	const bufferLength = analyser.frequencyBinCount;
	const dataArray = new Uint8Array(bufferLength);

	source.connect(analyser);

	canvas = document.querySelector(".voiceVisualizer");
	const canvasCtx = canvas.getContext("2d");
	const messageInputPreview = document.querySelector(".Message__input_preview");

	window.onresize = function () {
		canvas.width = messageInputPreview.offsetWidth;
	};

	draw();

	function draw() {
		window.onresize();

		const WIDTH = canvas.width;
		const HEIGHT = canvas.height;

		requestAnimationFrame(draw);

		analyser.getByteTimeDomainData(dataArray);

		canvasCtx.fillStyle = "rgb(255, 255, 255)";
		canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

		canvasCtx.lineWidth = 10;
		canvasCtx.strokeStyle = "rgb(255, 0, 89)";

		canvasCtx.beginPath();

		let sliceWidth = (WIDTH * 1.0) / bufferLength;
		let x = 0;

		for (let i = 0; i < bufferLength; i++) {
			let v = dataArray[i] / 128.0;
			let y = (v * HEIGHT) / 2;

			if (i === 0) {
				canvasCtx.moveTo(x, y);
			} else {
				canvasCtx.lineTo(x, y);
			}

			x += sliceWidth;
		}

		canvasCtx.lineTo(canvas.width, canvas.height / 2);
		canvasCtx.stroke();
	}
}

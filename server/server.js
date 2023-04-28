const path = require("path");
const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
	res.json({ message: "Hello from server!" });
});

// Handle GET requests made by RANDOM QUOTE MACHINE
const QUOTES_API_KEY = process.env.QUOTES_API_KEY;
app.get("/getQuote", (req, res) => {
	res.json(
		// 	async () => {
		// 	const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
		// 		headers: { QUOTES_API_KEY },
		// 	});
		// 	return response;
		// }
		{ message: "Hello from server!" }
	);
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

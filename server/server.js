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
app.get("/getQuote", async (req, res) => {
	const QUOTES_API_KEY = process.env.QUOTES_API_KEY;
	const weatherApiUrl = "https://api.api-ninjas.com/v1/quotes";
	const quote_response = await fetch(weatherApiUrl, {
		headers: { "X-Api-Key": QUOTES_API_KEY },
	});
	const quote_JSON = await quote_response.json();
	res.json(quote_JSON);
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

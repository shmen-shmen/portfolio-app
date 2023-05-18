// import express, { static } from "express";
import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();
import { readFile } from "fs";
import { resolve } from "path";

// Have Node serve the files for our built React app
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(resolve(__dirname, "../client/build")));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
	res.json({ message: "Hello from server!" });
});

// Handle GET requests made by RANDOM QUOTE MACHINE
app.get("/getQuote/:category", async (req, res) => {
	try {
		const { category } = req.params;
		const QUOTES_API_KEY = process.env.QUOTES_API_KEY;
		const weatherApiUrl =
			"https://api.api-ninjas.com/v1/quotes" +
			(category === "no-category" ? "" : "?category=" + category);
		const quote_response = await fetch(weatherApiUrl, {
			headers: { "X-Api-Key": QUOTES_API_KEY },
		});
		const quote_JSON = await quote_response.json();
		res.json(quote_JSON);
		return;
	} catch (error) {
		console.error(error);
		return;
	}
});

app.get("/getMarkdown", async (req, res) => {
	readFile("assets/initialMarkdown.txt", "utf8", (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		const markdown = data;
		res.json(markdown);
		return;
	});
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
	res.sendFile(resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

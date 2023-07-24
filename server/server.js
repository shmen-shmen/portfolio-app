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
		const APININJAS_API_KEY = process.env.APININJAS_API_KEY;
		const quotesApiUrl =
			"https://api.api-ninjas.com/v1/quotes" +
			(category === "no-category" ? "" : "?category=" + category);
		const quote_response = await fetch(quotesApiUrl, {
			headers: { "X-Api-Key": APININJAS_API_KEY },
		});
		const quote_JSON = await quote_response.json();
		res.json(quote_JSON);
		return;
	} catch (error) {
		console.error(error);
		return;
	}
});

app.get("/getImage/:category", async (req, res) => {
	try {
		const { category } = req.params;
		const APININJAS_API_KEY = process.env.APININJAS_API_KEY;
		const imagesApiUrl =
			"https://api.api-ninjas.com/v1/randomimage" +
			(category === "no-category" ? "" : "?category=" + category);

		const image_response = await fetch(imagesApiUrl, {
			headers: { "X-Api-Key": APININJAS_API_KEY, Accept: "image/jpg" },
		});

		if (!image_response.ok) {
			throw new Error("Failed to fetch the image.");
		}

		const image_data = await image_response.arrayBuffer();
		// Get the raw image data

		// If the image is in Base64 encoding, decode it
		// Assuming the image is received in Base64 and needs to be decoded
		const image_decoded = Buffer.from(image_data, "base64");

		// Set the appropriate Content-Type header for the image
		res.setHeader("Content-Type", "image/jpeg");

		// Send the image data in the response
		res.end(image_decoded);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to fetch the image." });
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

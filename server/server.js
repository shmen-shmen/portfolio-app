import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import Datastore from "@seald-io/nedb";
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
app.use(express.json({ limit: "1mb" }));
// initializing a database using NeDB
const database = new Datastore({ filename: "database.db" });
database.loadDatabase();

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

//making weather request with client coordinates and sending result back to client
app.get("/weather/:lat-:lon", async (request, response) => {
	try {
		const { lat, lon } = request.params;
		const weatherApiKey = process.env.WEATHER_API_KEY;
		const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${weatherApiKey}&units=metric`;
		const weather_response = await fetch(apiURL);
		const weather_JSON = await weather_response.json();
		response.json(weather_JSON);
	} catch (error) {
		console.error(error);
	}
});
//making timezone request with client coordinates and sending result back to client
app.get("/timezone/:lat-:lon", async (request, response) => {
	try {
		const { lat, lon } = request.params;
		const apiURL = `http://api.geonames.org/timezoneJSON?lat=${lat}&lng=${lon}&username=ymtktu`;
		const timezone_response = await fetch(apiURL);
		const timezone_JSON = await timezone_response.json();
		response.json(timezone_JSON);
	} catch (error) {
		console.error(error);
	}
});

//adding data generated from client to db
let data;
app.post("/api", async (request, response) => {
	try {
		data = request.body;
		console.log("data that server recieved:", data);
		database.insert(data);
		//RESPONSE
		//you are required to make a response, for example:
		response.json({
			...data,
		});
	} catch (error) {
		console.error("FAILED TO WRITE TO DATABASE ", error);
	}
});

//sending data from db upon request
app.get("/weatherLogs", (request, response) => {
	database.find({}, async (err, data) => {
		if (err) {
			console.error(err);
			response.end;
			return;
		} else {
			data = await database.findAsync({}).sort({ time: -1 });
			response.json(data);
		}
	});
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

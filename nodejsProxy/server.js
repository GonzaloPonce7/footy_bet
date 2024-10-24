const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(
  cors({
    origin: "http://localhost:8100",
  })
);
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});
app.get("/proxy", async (req, res) => {
  try {
    const url = req.query.url;
    console.log(`Fetching data from: ${url}`);
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0", // Mimic a browser request
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    res.status(500).send("Error fetching data");
  }
});
app.listen(3000, () => {
  console.log("Proxy server running on http://localhost:8100");
});

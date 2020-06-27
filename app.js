const express = require("express");
const morgan = require("morgan");
const playstore = require("./playstore");
const { query } = require("express");

const app = express();

app.use(morgan("dev"));

app.get("/apps", (req, res) => {
  const { sort, genres } = req.query;
  let results = playstore
  if (sort) {
    if (!["rating", "app"].includes(sort)) {
      return res.status(400).send("Sort must be by rating or app");
    }
  }

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  res.json(results);
});

app.listen(8080, () => {
  console.log("Express server is listening on 8080...");
});

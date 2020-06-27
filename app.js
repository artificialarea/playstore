const express = require("express");
const morgan = require("morgan");
const playstore = require("./playstore");
const { query } = require("express");
const { forEach } = require("./playstore");

const app = express();

app.use(morgan("dev"));

app.get("/apps", (req, res) => {
  const { sort, genres, search = ''} = req.query;

  let results = playstore.filter( game => game.App.toLowerCase().includes(search.toLocaleLowerCase()) );

  if (sort) {
    if (!["Rating", "App"].includes(sort)) {
      return res.status(400).send("Sort must be by Rating or App");
    }
  }

  if (genres) {
    if (!["action", "puzzle", "strategy", "casual", "arcade", "card"].includes(genres)) {
      return res.status(400).send("Genre must be either Action, Puzzle, Strategy, Casual, Arcade, or Card.");
    }
  }

  if (genres) {
    // console.log('genres invoked')
    // console.log(genres)
    results = results.filter(game =>
      game
        .Genres
        .toLowerCase()
        .includes(genres.toLowerCase())
    );
  }
  

  if (sort) {
    console.log(sort);
    // sort = sort.toLowerCase
    results = results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }


  res.json(results);



});

app.listen(8080, () => {
  console.log("Express server is listening on 8080...");
});

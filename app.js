const express = require("express");
const morgan = require("morgan");
const playstore = require("./playstore");

const app = express();

app.use(morgan("dev"));

app.get("/apps", (req, res) => {
  const { sort, genres, search = '' } = req.query;

  // VALIDATION
  if (sort) {
    if (!["Rating", "App"].includes(sort)) {
      return res.status(400).send("Sort must be by 'Rating' or 'App'");
    }
  }

  if (genres) {
    if (!["action", "puzzle", "strategy", "casual", "arcade", "card"].includes(genres.toLowerCase())) {
      return res.status(400).send("Genre must be either Action, Puzzle, Strategy, Casual, Arcade, or Card.");
    }
  }

  // if search
  let results = playstore
    .filter(game => 
      game
        .App
        .toLowerCase()
        .includes(search.toLowerCase()));

  if (genres) {
    results = results.filter(game =>
      game
        .Genres
        .toLowerCase()
        .includes(genres.toLowerCase())
    );
  }
  
  if (sort) {
    results = results.sort((a, b) => {
      // return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      return ( 
        a[sort] > b[sort] ? 
          (sort === 'App' ? 1 : -1)  // if app: a to z , else ratings: hi to lo
        : a[sort] < b[sort] ? 
          (sort === 'App' ? -1 : 1) 
        : 0
      )
    });
  }

  res.json(results);

});

module.exports = app

// app.listen(8080, () => {
//   console.log("Express server is listening on 8080...");
// });

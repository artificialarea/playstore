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

  // if (search)
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

// SEPARATE SERVER FROM APP FOR TESING
// To prepare the app for testing, need to
// seperate the server controller code 
// from the application code (everything else)
// by placing the app.listen controller code in a seperate file (server.js)
//
app.listen(8000, () => {
  console.log("Express server is listening on 8000...");
});
//
// Export this module for server.js to require/import
// module.exports = app;
const express = require("express");
const morgan = require("morgan");
const playstore = require("./playstore");

const app = express();

app.use(morgan("dev"));

app.get("/apps", (req, res) => {
  const { sort, genres, search = '' } = req.query;

  // probably an overkill
  // but converting keys of the objects in the playstore dataset array to *lowercase*
  // so the values of the sort query (ratings and app) can be lowercase (or even a mixthereof)

  // v2 keys to lowercase (more elegant solution, but a blackbox to me)
  const playstoreLowerCase = playstore.map(obj => {
    return Object.keys(obj).reduce(function(accum, key) {
      accum[key.toLowerCase()] = obj[key];
      return accum;
    }, {});
  })

  // v1 keys to lowercase
  // unfortunately my solution didn't consistently work. troubleshooting exceed timebox.
  // function keysToLowerCase (obj) {
  //   let keys = Object.keys(obj);
  //   for (let i = 0; i < keys.length; i++) {
  //     let key = keys[i];
  //     obj[key.toLowerCase()] = obj[key]
  //     delete obj[key]
  //   }
  //   return (obj);
  // }
  // const playstoreLowerCase = playstore.map(obj => {
  //   return keysToLowerCase(obj)
  // })

  console.log(playstore)
  console.log(playstoreLowerCase)

  // VALIDATION
  if (sort) {
    if (!["rating", "app"].includes(sort.toLowerCase())) {
      return res.status(400).send("Sort must be by 'Rating' or 'App'");
    }
  }

  if (genres) {
    if (!["action", "puzzle", "strategy", "casual", "arcade", "card"].includes(genres.toLowerCase())) {
      return res.status(400).send("Genre must be either Action, Puzzle, Strategy, Casual, Arcade, or Card.");
    }
  }

  // if search
  let results = playstoreLowerCase
    .filter(game => 
      game
        .app
        .toLowerCase()
        .includes(search.toLowerCase()));

  if (genres) {
    results = results.filter(game =>
      game
        .genres
        .toLowerCase()
        .includes(genres.toLowerCase())
    );
  }
  
  if (sort) {
    
    const sortLowerCase = sort.toLowerCase();
    console.log(sortLowerCase)
    results = results.sort((a, b) => {
        // console.log(a[sortLowerCase], b[sortLowerCase])
        // return a[sortLowerCase] > b[sortLowerCase] ? 1 : a[sortLowerCase] < b[sortLowerCase] ? -1 : 0;
        return ( 
          a[sortLowerCase] > b[sortLowerCase] ? 
            (sortLowerCase === 'app' ? 1 : -1)     // if app: a to z , else ratings: hi to lo
          : a[sortLowerCase] < b[sortLowerCase] ? 
            (sortLowerCase === 'app' ? -1 : 1) 
          : 0
        )
    });

  }

  res.json(results);

});

app.listen(8080, () => {
  console.log("Express server is listening on 8080...");
});

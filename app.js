const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {

  res.send('Yo MTV Raps!')



})

app.listen(8080, () => {
  console.log('Express server is listening on 8080...')
})
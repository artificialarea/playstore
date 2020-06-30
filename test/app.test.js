const mocha = require('mocha');           // testing framework
const { expect } = require('chai');       // asserting library
const supertest = require('supertest');   // tool for testing HTTP calls

const app = require('../app');
const playstore = require('../playstore');

// POSSIBLE TESTS for /books endpoint...
// response 200 array exists
// response 400 if sort query values incorrect
// response 400 if genre query values incorrect
// response 200 if sort query App sorts array by title alphabetically from A-Z
// response 200 if sort query Ratings sorts array from highest to lowest ratings
// response 200 if genre query filters array appropriately
// response 200 if search query returns appropriate matches
// response ___ if search query returns no matches (not 4xx... 2xx or 1xx?)
// 

describe('GET /apps endpoint', () => {

  it('returns the full playstore array with no query', () => {
    // return supertest(app)
    //   .get('/apps')
    //   .expect('Content-Type', /json/)
    //   .expect(200, done);
      // .then(res => {
      //   // make sure you get an array
      //   expect(res.body).to.be.an('array');
      //   // array must not be empty
      //   expect(res.body).to.have.lengthOf.at.least(1);
      //   // array of all apps
      //   expect(res.body).to.deep.equal(playstore); // could use '.to.eql(playstore)' instead
      // })
  });

});




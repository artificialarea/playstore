const mocha = require('mocha');           // testing framework
const { expect } = require('chai');       // asserting library
const supertest = require('supertest');   // tool for testing HTTP calls

const app = require('../app');

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

describe('GET /books endpoint', () => {

  it('', () => {

  });

});




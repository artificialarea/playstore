const mocha = require('mocha');           // testing framework
const { expect } = require('chai');       // asserting library
const supertest = require('supertest');   // tool for testing HTTP calls

const app = require('../app');
const playstore = require('../playstore');
const { get } = require('../app');

// POSSIBLE TESTS for /books endpoint...
// [x] response 200 array exists
// [x] response 400 if sort query values incorrect
// [x] response 400 if genre query values incorrect
// [x] response 200 if sort query App sorts array by title alphabetically from A-Z
// [x] response 200 if sort query Ratings sorts array from highest to lowest ratings
// [x] response 200 if genre query filters array appropriately
// [ ] response 200 should (search AND) sort AND filter appropriately
// [ ] response 200 if search query returns appropriate matches
// [ ] response 204 No Content: if search query returns no matches
// 

describe('GET /apps endpoint', () => {

  it('should return full playstore array with no query', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        // console.log(res.body);
        // make sure you get an array
        expect(res.body).to.be.an('array');
        // array must not be empty
        expect(res.body).to.have.lengthOf.at.least(1);
        // array of all apps
        expect(res.body).to.deep.equal(playstore); // could use '.to.eql(playstore)' instead
      });
  });

  it('should 400 if sort parameters incorrect', () => {
    return supertest(app)
      .get('/apps')
      // .query({ sort: !['Rating', 'App'] }) // works, too
      .query({ sort: 'MISTAKE' })
      .expect(400, `Sort must be by 'Rating' or 'App'`)
  });

  it('should 400 if genre parameters incorrect', () => {
    return supertest(app)
      .get('/apps')
      .query({ genres: 'MISTAKE'})
      .expect(400, "Genre must be either Action, Puzzle, Strategy, Casual, Arcade, or Card.")
  });

  it('should sort alphabetically by App title from A to Z', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'App'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array')
        let sorted = true;
        let i = 0;
        while (i < res.body.length - 1){
          const appsAtI = res.body[i];
          const appsAtIPlus = res.body[i + 1];
          if(appsAtIPlus.Apps < appsAtI.Apps) {
            sorted = false;
            break;
          }
          i++;
        }
        expect(sorted).to.be.true;
      })
  });
  
  it('should sort by Rating from highest to lowest', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'Rating'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array')
        let sorted = true;
        let i = 0;
        while( i < res.body.length - 1){
          const appsAtI = res.body[i];
          const appsAtIPlus = res.body[i + 1];
          if(appsAtIPlus.Rating > appsAtI.Rating) {
            sorted = false;
            break;
          }
          i++;
        }
        expect(sorted).to.be.true;
      })
  });

  it('should filter by genre', () => {
    return supertest(app)
      .get('/apps')
      .query({ genres: 'Casual' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        let filtered = true;
        let i = 0;
        while (i < res.body.length) {
          // console.log(res.body[i].Genres);
          if(!(res.body[i].Genres).includes('Casual')) {
            filtered = false;
            break;
          }
          i++;
        }
        expect(filtered).to.be.true;
      })
  });

  it.skip('search should filter only relevant App titles', () => {
    return supertest(app)
      .get('apps')
  });


});




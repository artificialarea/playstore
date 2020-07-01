const mocha = require('mocha')
const {expect} = require('chai')
const supertest = require('supertest')
const app = require('../app')
const playstore = require('../playstore')

/* POSSIBLE TESTS
[x] 1. Array and all its keys exist
[x] 2. 400 if the sort values are incorrect
[x] 3. 400 if the genre values are incorrect
[x] 4. Should sort alphabetically by app title from A to Z
[x] 5. Should sort query ratings from highest to lowest 
[x] 6. Should filter by genre 
[ ] 7. sort, filter/genres, and search should work together 
[ ] 8. Search query returns appropiate title matches 
[ ] 9. If search query returns no matches then 204 no content 
*/

describe('GET/apps endpoint', () => {

  it('without query parameters it should return a full array', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf.at.least(1);
          // const app = res.body[0]
          // expect(app).to.include.all.keys('App', 'Genre', 'Rating')
          expect(res.body).to.deep.equal(playstore)
      });
  });

  it('should 400 if sort parameters incorrect', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'Blahblah'})
      .expect(400, `Sort must be by 'Rating' or 'App'`)
  });
  
  it('should 400 if genres parameters incorrect', () => {
    return supertest(app)
      .get('/apps')
      .query({ genres: 'Blahblah'})
      .expect(400, "Genre must be either Action, Puzzle, Strategy, Casual, Arcade, or Card.")
  });

  it('Should sort alphabetically by App title from A to Z', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'App'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        let i = 0;
        let sorted = true;

        while(sorted && i < res.body.length - 1) {
          sorted = sorted && res.body[i].App < res.body[i + 1].App;
          i++;
        }

        // interesting to note that this test below was truthy when false
        // because values were 'undefined' (due to 'title' not a key in the object)
        //
        // while(i < res.body.length - 1) {
        //   if (res.body[i+1].title < res.body[i].title) {
        //     sorted = false;
        //     break;
        //   }
        //   i++;
        // }

        expect(sorted).to.be.true;
      });
  });
  
  it('Should sort query ratings from highest to lowest (although many apps have the same rating)', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'Rating'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        let i = 0;
        let sorted = true;
        while(sorted && i < res.body.length - 1) {
          sorted = sorted && res.body[i].Rating >= res.body[i + 1].Rating;
          i++;
        }
        expect(sorted).to.be.true;
      });
  });

  it('Should filter by genre', () => {
    return supertest(app) 
      .get('/apps')
      .query({ genres: 'Casual'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        let i = 0;
        let filtered = true;
        while(filtered && i < res.body.length - 1) {
          filtered = filtered && (res.body[i].Genres).includes('Casual');
          i++;
        }
        expect(filtered).to.be.true;
      })
  });

})
const mocha = require('mocha')
const {expect} = require('chai')
const supertest = require('supertest')
const app = require('../app')
const playstore = require('../playstore')

/*
1. Array and all its keys exist
2. 400 if the sort values are incorrect
3. 400 if the genre values are incorrect
4. Should sort alphabetically by app title from A to Z
5. shoud sort query ratings from highest to lowest 
6. Should filter by genre 
7. sort, filter/genres, and search should work together 
8. Search query returns appropiate title matches 
9. If search query returns no matches then 204 no content 
*/

describe('GET/apps endpoint', () => {
    it('without query parameters it should return a full array', () =>{
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
            })
    })
})
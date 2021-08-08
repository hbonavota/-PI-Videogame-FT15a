/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');
const { v4: uuidv4 } = require('uuid');

const agent = session(app);
const id = "86c524ac-7d37-46a1-b088-6c225cc30bce"
const videogame = { name: 'Super Mario Bros', id:"86c524ac-7d37-46a1-b088-6c225cc30bce" };


describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', () =>
      agent.get('/videogames').expect(200)
    );
    
  });
  describe('GET /genres', () => {
    it('should get 200', () =>
      agent.get('/genres').expect(200)
    );
    
  });
  describe('GET /videogame/ID', () => {
    it('should get 200', () =>
    agent.get(`/videogame/${id}`).expect(200)
  );
  });
});

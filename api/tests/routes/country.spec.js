/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana',
  summary: 'resumen',
};

describe('Recipe routes', function () {
  this.timeout(6000);
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
    it('should get 200 with id in the parameter', () =>
      agent.get('/recipes/716426').expect(200)
    )
    it('should get 404 with id in the parameter', () =>
      agent.get('/recipes/712216426').expect(404)
    )
    it('should get 200 with name in the query', () =>
      agent.get('/recipes?name=veg').expect(200)
    )
    it('should get 404 with name in the query', () =>
      agent.get('/recipes?name=veasdasdg').expect(404)
    )
  });

  describe('POST /recipes', () => {
    it('responde con status 200', () =>
    agent.post('/recipes')
      .send({"name": "testeando 200",
      "summary": "resumen",
      "image": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Weekend_in_Buenos_Aires.jpg",
      "healthScore": "50", 
      "steps": ["paso1", "paso2"],
      "diets": ["vegan", "pescatarian"]})
      .expect(200));
  
    it('responde con status 404', () =>
    agent.post('/recipes')
      .send()
      .expect(404));
  })
});

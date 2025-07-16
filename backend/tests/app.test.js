const request = require('supertest');
const app = require('../src/index');

describe('API Gerencie-Comercio', () => {
  it('deve responder na rota raiz', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/API Gerencie-Comercio/);
  });
});



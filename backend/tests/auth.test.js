const request = require('supertest');
const app = require('../src/index');
const { Usuario } = require('../src/usuario');
const sequelize = require('../src/db');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Autenticação', () => {
  beforeEach(async () => {
    // Limpa usuários antes de cada teste
    await Usuario.destroy({ where: {}, truncate: true });
  });

  it('deve registrar e logar um usuário', async () => {
    const email = `user${Date.now()}@test.com`;
    const senha = '123456';
    // Registro
    const registro = await request(app)
      .post('/auth/registro')
      .send({ nome: 'Teste', email, senha });
    expect(registro.statusCode).toBe(201);
    expect(registro.body.email).toBe(email);
    // Login
    const login = await request(app)
      .post('/auth/login')
      .send({ email, senha });
    expect(login.statusCode).toBe(200);
    expect(login.body.token).toBeDefined();
  });
});



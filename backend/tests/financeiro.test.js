const request = require('supertest');
const app = require('../src/index');
const { Usuario } = require('../src/usuario');
const sequelize = require('../src/db');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Financeiro', () => {
  let token;
  beforeAll(async () => {
    jest.setTimeout(15000); // aumenta timeout para evitar falha
    await Usuario.destroy({ where: {}, truncate: true }); // limpa usuários
    const email = `fin${Date.now()}@test.com`;
    const senha = '123456';
    await request(app)
      .post('/auth/registro')
      .send({ nome: 'Fin', email, senha });
    const login = await request(app)
      .post('/auth/login')
      .send({ email, senha });
    token = login.body.token;
  });

  it('deve criar e listar uma receita', async () => {
    const receita = {
      data: '2025-07-16',
      descricao: 'Venda Teste',
      categoria: 'Venda',
      valor: 100.0
    };
    const res = await request(app)
      .post('/financeiro/receitas')
      .set('Authorization', `Bearer ${token}`)
      .send(receita);
    expect(res.statusCode).toBe(201);
    expect(res.body.descricao).toBe('Venda Teste');

    const list = await request(app)
      .get('/financeiro/receitas')
      .set('Authorization', `Bearer ${token}`);
    expect(list.body.length).toBeGreaterThan(0);
  });
});

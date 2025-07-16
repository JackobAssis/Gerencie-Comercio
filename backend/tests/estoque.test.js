const request = require('supertest');
const app = require('../src/index');
const sequelize = require('../src/db');
const { Usuario } = require('../src/usuario');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Estoque', () => {
  let token;
  beforeAll(async () => {
    await Usuario.destroy({ where: {}, truncate: true });
    const email = `estoque${Date.now()}@test.com`;
    const senha = '123456';
    await request(app)
      .post('/auth/registro')
      .send({ nome: 'Estoque', email, senha });
    const login = await request(app)
      .post('/auth/login')
      .send({ email, senha });
    token = login.body.token;
  });

  it('deve criar e listar um produto', async () => {
    const produto = {
      nome: 'Produto Teste',
      codigo: 'P123',
      descricao: 'Teste',
      quantidade: 10,
      preco_custo: 5.0,
      preco_venda: 10.0,
      fornecedor: 'Fornecedor X'
    };
    const res = await request(app)
      .post('/estoque/produtos')
      .set('Authorization', `Bearer ${token}`)
      .send(produto);
    expect(res.statusCode).toBe(201);
    expect(res.body.nome).toBe('Produto Teste');

    const list = await request(app)
      .get('/estoque/produtos')
      .set('Authorization', `Bearer ${token}`);
    expect(list.body.length).toBeGreaterThan(0);
  });

  it('deve criar e listar uma movimentação', async () => {
    // Cria produto
    const produto = await request(app)
      .post('/estoque/produtos')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'MovProd', codigo: 'M1', quantidade: 5, preco_custo: 2, preco_venda: 4 });
    const produtoId = produto.body.id;
    // Cria movimentação
    const mov = {
      tipo: 'entrada',
      quantidade: 3,
      data: '2025-07-16',
      produtoId
    };
    const res = await request(app)
      .post('/estoque/movimentacoes')
      .set('Authorization', `Bearer ${token}`)
      .send(mov);
    expect(res.statusCode).toBe(201);
    expect(res.body.tipo).toBe('entrada');

    const list = await request(app)
      .get('/estoque/movimentacoes')
      .set('Authorization', `Bearer ${token}`);
    expect(list.body.length).toBeGreaterThan(0);
  });
});

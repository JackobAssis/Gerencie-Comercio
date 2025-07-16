import React, { useEffect, useState } from 'react';

function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [form, setForm] = useState({ nome: '', codigo: '', descricao: '', quantidade: '', preco_custo: '', preco_venda: '', fornecedor: '' });
  const [movForm, setMovForm] = useState({ tipo: 'entrada', quantidade: '', data: '', produtoId: '' });
  const [erro, setErro] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:3001/estoque/produtos', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setProdutos);
    fetch('http://localhost:3001/estoque/movimentacoes', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setMovimentacoes);
  }, [token]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleMovChange = e => setMovForm({ ...movForm, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setErro('');
    try {
      const res = await fetch('http://localhost:3001/estoque/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Erro ao salvar produto');
      window.location.reload();
    } catch {
      setErro('Erro ao salvar produto');
    }
  };

  const handleMovSubmit = async e => {
    e.preventDefault();
    setErro('');
    try {
      const res = await fetch('http://localhost:3001/estoque/movimentacoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(movForm)
      });
      if (!res.ok) throw new Error('Erro ao salvar movimentação');
      window.location.reload();
    } catch {
      setErro('Erro ao salvar movimentação');
    }
  };

  return (
    <div>
      <h2>Produtos</h2>
      <ul>
        {produtos.map(p => (
          <li key={p.id}>{p.nome} - {p.codigo} - Qtd: {p.quantidade} - R$ {p.preco_venda}</li>
        ))}
      </ul>
      <h3>Novo Produto</h3>
      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
        <input name="codigo" placeholder="Código" value={form.codigo} onChange={handleChange} required />
        <input name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} />
        <input name="quantidade" type="number" placeholder="Quantidade" value={form.quantidade} onChange={handleChange} required />
        <input name="preco_custo" type="number" step="0.01" placeholder="Preço de Custo" value={form.preco_custo} onChange={handleChange} required />
        <input name="preco_venda" type="number" step="0.01" placeholder="Preço de Venda" value={form.preco_venda} onChange={handleChange} required />
        <input name="fornecedor" placeholder="Fornecedor" value={form.fornecedor} onChange={handleChange} />
        <button type="submit">Salvar Produto</button>
      </form>
      <h2>Movimentações</h2>
      <ul>
        {movimentacoes.map(m => (
          <li key={m.id}>{m.tipo} - Qtd: {m.quantidade} - Data: {m.data} - Produto: {m.produto?.nome || m.produtoId}</li>
        ))}
      </ul>
      <h3>Nova Movimentação</h3>
      <form onSubmit={handleMovSubmit}>
        <select name="tipo" value={movForm.tipo} onChange={handleMovChange}>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
          <option value="devolucao">Devolução</option>
        </select>
        <input name="quantidade" type="number" placeholder="Quantidade" value={movForm.quantidade} onChange={handleMovChange} required />
        <input name="data" type="date" value={movForm.data} onChange={handleMovChange} required />
        <select name="produtoId" value={movForm.produtoId} onChange={handleMovChange} required>
          <option value="">Selecione o produto</option>
          {produtos.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
        <button type="submit">Salvar Movimentação</button>
      </form>
      {erro && <p style={{color:'red'}}>{erro}</p>}
    </div>
  );
}

export default Estoque;

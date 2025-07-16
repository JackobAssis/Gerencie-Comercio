import React, { useEffect, useState } from 'react';

function Financeiro() {
  const [receitas, setReceitas] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [form, setForm] = useState({ tipo: 'receita', data: '', descricao: '', categoria: '', valor: '' });
  const [erro, setErro] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:3001/financeiro/receitas', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setReceitas);
    fetch('http://localhost:3001/financeiro/despesas', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setDespesas);
  }, [token]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setErro('');
    const url = form.tipo === 'receita' ? 'receitas' : 'despesas';
    try {
      const res = await fetch(`http://localhost:3001/financeiro/${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Erro ao salvar');
      window.location.reload();
    } catch {
      setErro('Erro ao salvar');
    }
  };

  return (
    <div>
      <h2>Receitas</h2>
      <ul>
        {receitas.map(r => (
          <li key={r.id}>{r.data} - {r.descricao} - {r.categoria} - R$ {r.valor}</li>
        ))}
      </ul>
      <h2>Despesas</h2>
      <ul>
        {despesas.map(d => (
          <li key={d.id}>{d.data} - {d.descricao} - {d.categoria} - R$ {d.valor}</li>
        ))}
      </ul>
      <h3>Nova Receita/Despesa</h3>
      <form onSubmit={handleSubmit}>
        <select name="tipo" value={form.tipo} onChange={handleChange}>
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>
        <input name="data" type="date" value={form.data} onChange={handleChange} required />
        <input name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} required />
        <input name="categoria" placeholder="Categoria" value={form.categoria} onChange={handleChange} required />
        <input name="valor" type="number" step="0.01" placeholder="Valor" value={form.valor} onChange={handleChange} required />
        <button type="submit">Salvar</button>
      </form>
      {erro && <p style={{color:'red'}}>{erro}</p>}
    </div>
  );
}

export default Financeiro;

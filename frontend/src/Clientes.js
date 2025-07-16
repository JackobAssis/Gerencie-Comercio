import React, { useEffect, useState } from 'react';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [compras, setCompras] = useState([]);
  const [form, setForm] = useState({ nome: '', contato: '', endereco: '' });
  const [compraForm, setCompraForm] = useState({ data: '', valor: '', clienteId: '' });
  const [erro, setErro] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:3001/clientes/clientes', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setClientes);
    fetch('http://localhost:3001/clientes/compras', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setCompras);
  }, [token]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleCompraChange = e => setCompraForm({ ...compraForm, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setErro('');
    try {
      const res = await fetch('http://localhost:3001/clientes/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Erro ao salvar cliente');
      window.location.reload();
    } catch {
      setErro('Erro ao salvar cliente');
    }
  };

  const handleCompraSubmit = async e => {
    e.preventDefault();
    setErro('');
    try {
      const res = await fetch('http://localhost:3001/clientes/compras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(compraForm)
      });
      if (!res.ok) throw new Error('Erro ao salvar compra');
      window.location.reload();
    } catch {
      setErro('Erro ao salvar compra');
    }
  };

  return (
    <div>
      <h2>Clientes</h2>
      <ul>
        {clientes.map(c => (
          <li key={c.id}>{c.nome} - {c.contato} - {c.endereco}</li>
        ))}
      </ul>
      <h3>Novo Cliente</h3>
      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
        <input name="contato" placeholder="Contato" value={form.contato} onChange={handleChange} />
        <input name="endereco" placeholder="Endereço" value={form.endereco} onChange={handleChange} />
        <button type="submit">Salvar Cliente</button>
      </form>
      <h2>Compras</h2>
      <ul>
        {compras.map(compra => (
          <li key={compra.id}>{compra.data} - R$ {compra.valor} - Cliente: {compra.cliente?.nome || compra.clienteId}</li>
        ))}
      </ul>
      <h3>Nova Compra</h3>
      <form onSubmit={handleCompraSubmit}>
        <input name="data" type="date" value={compraForm.data} onChange={handleCompraChange} required />
        <input name="valor" type="number" step="0.01" placeholder="Valor" value={compraForm.valor} onChange={handleCompraChange} required />
        <select name="clienteId" value={compraForm.clienteId} onChange={handleCompraChange} required>
          <option value="">Selecione o cliente</option>
          {clientes.map(c => (
            <option key={c.id} value={c.id}>{c.nome}</option>
          ))}
        </select>
        <button type="submit">Salvar Compra</button>
      </form>
      {erro && <p style={{color:'red'}}>{erro}</p>}
    </div>
  );
}

export default Clientes;

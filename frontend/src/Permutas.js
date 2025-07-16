import React, { useEffect, useState } from 'react';

function Permutas() {
  const [permutas, setPermutas] = useState([]);
  const [form, setForm] = useState({ data: '', descricao: '', valor_equivalente: '', parteA: '', parteB: '' });
  const [erro, setErro] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:3001/permutas/permutas', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setPermutas);
  }, [token]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setErro('');
    try {
      const res = await fetch('http://localhost:3001/permutas/permutas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Erro ao salvar permuta');
      window.location.reload();
    } catch {
      setErro('Erro ao salvar permuta');
    }
  };

  return (
    <div>
      <h2>Permutas</h2>
      <ul>
        {permutas.map(p => (
          <li key={p.id}>{p.data} - {p.descricao} - Valor: R$ {p.valor_equivalente} - {p.parteA} ↔ {p.parteB}</li>
        ))}
      </ul>
      <h3>Nova Permuta</h3>
      <form onSubmit={handleSubmit}>
        <input name="data" type="date" value={form.data} onChange={handleChange} required />
        <input name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} required />
        <input name="valor_equivalente" type="number" step="0.01" placeholder="Valor equivalente" value={form.valor_equivalente} onChange={handleChange} />
        <input name="parteA" placeholder="Parte A" value={form.parteA} onChange={handleChange} required />
        <input name="parteB" placeholder="Parte B" value={form.parteB} onChange={handleChange} required />
        <button type="submit">Salvar Permuta</button>
      </form>
      {erro && <p style={{color:'red'}}>{erro}</p>}
    </div>
  );
}

export default Permutas;

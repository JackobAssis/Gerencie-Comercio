import React, { useState } from 'react';
import Login from './Login';
import Menu from './Menu';
import Financeiro from './Financeiro';
import Estoque from './Estoque';
import Clientes from './Clientes';
import Permutas from './Permutas';

function App() {
  const [logado, setLogado] = useState(!!localStorage.getItem('token'));
  const [modulo, setModulo] = useState('');

  if (!logado) {
    return <Login onLogin={() => setLogado(true)} />;
  }

  let conteudo;
  switch (modulo) {
    case 'financeiro':
      conteudo = <Financeiro />; break;
    case 'estoque':
      conteudo = <Estoque />; break;
    case 'clientes':
      conteudo = <Clientes />; break;
    case 'permutas':
      conteudo = <Permutas />; break;
    default:
      conteudo = <p>Bem-vindo! Escolha um módulo no menu.</p>;
  }

  return (
    <div className="App">
      <h1>Gerencie-Comercio</h1>
      <Menu onSelect={setModulo} />
      {conteudo}
    </div>
  );
}

export default App;

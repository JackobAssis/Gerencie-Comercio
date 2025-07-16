import React from 'react';

function Menu({ onSelect }) {
  return (
    <nav className="menu">
      <button onClick={() => onSelect('financeiro')}>Financeiro</button>
      <button onClick={() => onSelect('estoque')}>Estoque</button>
      <button onClick={() => onSelect('clientes')}>Clientes</button>
      <button onClick={() => onSelect('permutas')}>Permutas</button>
      <button onClick={() => {
        localStorage.removeItem('token');
        window.location.reload();
      }}>Sair</button>
    </nav>
  );
}

export default Menu;

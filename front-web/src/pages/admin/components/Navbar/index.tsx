import React from 'react';
import './styles.scss';

const Navbar = () =>(
    <nav className="admin-nav-container">
        <ul>
            <li>
                <a href="Link" className="nav-item active">Meus Produtos</a>
            </li>
            <li>
                <a href="Link" className="nav-item">Minhas Categorias</a>
            </li>
            <li>
                <a href="Link" className="nav-item">Meus Usuários</a>
            </li>
        </ul>
    </nav>
);

export default Navbar;
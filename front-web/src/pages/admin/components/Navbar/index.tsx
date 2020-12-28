import React from 'react';
import './styles.scss';
import { Link, NavLink } from 'react-router-dom';
import { isAllowByRole } from 'core/utils/auth';

const Navbar = () =>(
    <nav className="admin-nav-container">
        <ul>
            <li>
                <NavLink to="/admin/products" className="nav-item">
                    Meus Produtos
                </NavLink>
            </li>
            <li>
                <NavLink to="/admin/categories" className="nav-item">
                    Minhas Categorias
                </NavLink>
            </li>
            {isAllowByRole(['ROLE_ADMIN']) &&(
                 <li>
                 <NavLink to="/admin/users" className="nav-item">
                     Meus Usuários
                 </NavLink>
             </li>
            )}
        </ul>
    </nav>
);

export default Navbar;
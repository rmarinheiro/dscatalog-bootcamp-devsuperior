import React from 'react';
import { ReactComponent as AuthImagem } from 'core/assets/images/auth.svg';
import './style.scss';
import Login from './components/login';
import Products from '../admin/Products';
import { Switch, Route } from 'react-router-dom';

const Auth = () => (
    <div className="auth-container">
        <div className="auth-info">
            <h1 className="auth-info-title">
                Divulgue seus produtos <br /> no DS Catalog
        </h1>
            <p className="auth-info-subtitle">
                Faça parte do nosso catálogo de divulgação e <br /> aumente a venda dos seus produtos.
        </p>
            <AuthImagem />

        </div>

        <div className="auth-content">
            <Switch>
                <Route path="/admin/auth/login">
                    <Login/>
                </Route>

                <Route path="/admin/auth/register">
                    <h1>Cadastro</h1>
                </Route>

                <Route path="/admin/auth/recover">
                    <h1>Recuperação</h1>
                </Route>

            </Switch>
        </div>
    </div>
);

export default Auth;
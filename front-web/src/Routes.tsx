import React from 'react';
import { Router,Switch,Route, Redirect} from 'react-router-dom';
import Home from './pages/home';
import Catalog from './pages/catalog';
import Admin from './pages/admin';
import Navbar from './core/components/Navbar';
import ProductDetails from './pages/catalog/components/ProductDetails';
import Auth from './pages/auth';
import history from './core/utils/history';


const Routers = () =>(
    <Router history = {history}>
        <Navbar />
        <Switch>
            <Route path="/" exact>
                <Home/>
            </Route>

            <Route path="/products" exact>
                <Catalog/>
            </Route>


        
            <Route path="/products/:productsId">
                <ProductDetails/>
            </Route>
            
            <Redirect from="/admin/auth" to="/admin/auth/login" exact/>
            <Route path="/admin/auth">
                <Auth />  
            </Route>         
   

            <Redirect from="/admin" to="/admin/products" exact/>
            <Route path="/admin">
                <Admin/>
            </Route>

        </Switch>
    </Router>
    
);

export default Routers;
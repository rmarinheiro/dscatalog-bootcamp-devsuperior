import React from 'react';
import { BrowserRouter,Switch,Route} from 'react-router-dom';
import Home from './pages/home';
import Catalog from './pages/catalog';
import Admin from './pages/admin';
import Navbar from './core/components/Navbar';
import ProductDetails from './pages/catalog/components/ProductDetails';


const Routers = () =>(
    <BrowserRouter>
        <Navbar />
        <Switch>
            <Route path="/" exact>
                <Home/>
            </Route>

        </Switch>

         <Switch>
            <Route path="/products" exact>
                <Catalog/>
            </Route>

        </Switch>

         <Switch>
            <Route path="/products/:productsId">
                <ProductDetails/>
            </Route>

        </Switch>

        <Switch>
            <Route path="/admin">
                <Admin/>
            </Route>

        </Switch>
    </BrowserRouter>
    
);

export default Routers;
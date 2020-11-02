import React from 'react';
import { BrowserRouter,Switch,Route} from 'react-router-dom';
import Home from './pages/home';
import Catalog from './pages/catalog';
import Admin from './pages/admin';
import Navbar from './core/components/Navbar';


const Routers = () =>(
    <BrowserRouter>
        <Navbar />
        <Switch>
            <Route path="/" exact>
                <Home/>
            </Route>

        </Switch>

         <Switch>
            <Route path="/catalog">
                <Catalog/>
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
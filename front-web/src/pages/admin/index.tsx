import React from 'react';
import Navbar from './components/Navbar';
import './styles.scss';
import { Switch, Route} from 'react-router';
import Products from './Products';
const Admin = () => (
   <div className="admin-container">
       <Navbar />
       <div className="admin-content">
            <Switch>
                <Route path="/admin/products">
                    <Products/>

                </Route>

                  <Route path="/admin/categories">
                    <h1>Categories</h1>

                </Route>

                  <Route path="/admin/users">
                    <h1>Users</h1>

                </Route>


            </Switch>
       </div>
    </div>
);

export default Admin;
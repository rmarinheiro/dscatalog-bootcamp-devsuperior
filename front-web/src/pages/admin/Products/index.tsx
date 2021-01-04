import React from 'react';
import { Switch, Route } from 'react-router';
import List from './List';
import Form from './Form';

const Products = () =>{
    return(
     
        <div>
            <Switch>
                <Route path="/admin/products" exact>
                    <List/>
                </Route>

                <Route path="/admin/products/:productsId">
                    <Form/>
                </Route>
            </Switch>
        </div>
    )
}

export default Products;
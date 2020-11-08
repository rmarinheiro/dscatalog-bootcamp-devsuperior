import React, { useEffect, useState } from 'react';
import './styles.scss';
import ProductCard from './components/ProductCard';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { makeRequest } from '../../core/utils/request';
import { ProductsResponse } from '../../core/types/Products';

const Catalog = () => {
    //quando a lista de produtos estiver disponivel,
    //popular um estado no componente e listar os produtos dinamicamente
 
    const[productsResponse,setProductsResponse] = useState<ProductsResponse>();

    console.log(productsResponse);

    //quando o componente inicializar, busca a lisa de produtos
     useEffect(()=>{
      
            const params ={
                page:0,
                linesPerPage:12
            }

            makeRequest({url:'/products',params})
            //.then(response => response.json())
            .then(response => setProductsResponse(response.data));
     },[]);

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">Catalogo de Produtos</h1>
        <div className="catalog-products">
            {productsResponse?.content.map(products =>(
                <Link to={`/products/${products.id}`} key={products.id}>
                    <ProductCard product={products}/>

                 </Link>   
            ))}
           
        </div>
    </div>
    ) 
};
export default Catalog;
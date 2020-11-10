import React, { useEffect, useState } from 'react';
import './styles.scss';
import ProductCard from './components/ProductCard';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { makeRequest } from 'core/utils/request';
import { ProductsResponse } from 'core/types/Products';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import Pagination from 'core/components/Pagination';

const Catalog = () => {
    //quando a lista de produtos estiver disponivel,
    //popular um estado no componente e listar os produtos dinamicamente
 
    const[productsResponse,setProductsResponse] = useState<ProductsResponse>();
    const [isLoading,setIsLoading] = useState(false);

    console.log(productsResponse);

    //quando o componente inicializar, busca a lisa de produtos
     useEffect(()=>{
      
            const params ={
                page:0,
                linesPerPage:12
            }

            //iniciar o loader
            setIsLoading(true);
            makeRequest({url:'/products',params})
            .then(response => setProductsResponse(response.data))
            .finally(()=>{
                //finaliza o loader
                setIsLoading(false);
            })
     },[]);

    return ( 
    
    
        <div className="catalog-container">
          
            <h1 className="catalog-title">Catalogo de Produtos</h1>
        <div className="catalog-products">
            {isLoading ? <ProductCardLoader/> :(
                productsResponse?.content.map(products =>(
                    <Link to={`/products/${products.id}`} key={products.id}>
                        <ProductCard product={products}/>
    
                     </Link>   
                ))
            )}
            
            <Pagination/>
           
        </div>
       
    </div>
    ) 
};
export default Catalog;
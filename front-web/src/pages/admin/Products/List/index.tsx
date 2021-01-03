import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../card';
import { makeRequest } from 'core/utils/request';
import { ProductsResponse } from 'core/types/Products';
import Pagination from 'core/components/Pagination';

const List = () =>{
    const[productsResponse,setProductsResponse] = useState<ProductsResponse>();
    const [isLoading,setIsLoading] = useState(false);
    const [activePage ,setActivePage] = useState(0);

    console.log(productsResponse);

    //quando o componente inicializar, busca a lisa de produtos
     useEffect(()=>{
      
            const params ={
                page:activePage,
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
     },[activePage]);

    const history = useHistory();

    const handleCreate = () =>{
        history.push('/admin/products/create');

    }
    return (
        <div className="admin-product-list">
            <button className="btn  btn-primary btn-lg" onClick={handleCreate}>
                Adicionar
            </button>
            <div className="admin-list-container">
                {productsResponse?.content.map(products=>(
                    <Card product={products} key={products.id}/>
                ))}

            {productsResponse && (
            <Pagination 
             totalPages={productsResponse.totalPages}
             activePage={activePage}
             onChange={page=> setActivePage(page)}
             />
        )}
                

            </div>

        </div>
    )

}

export default List;
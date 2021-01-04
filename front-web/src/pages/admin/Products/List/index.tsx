import React, { useState, useEffect,useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../card';
import { makeRequest, makePrivateRequest } from 'core/utils/request';
import { ProductsResponse } from 'core/types/Products';
import Pagination from 'core/components/Pagination';
import { toast } from '../../../../../node_modules/react-toastify';

const List = () =>{
    const[productsResponse,setProductsResponse] = useState<ProductsResponse>();
    const [isLoading,setIsLoading] = useState(false);
    const [activePage ,setActivePage] = useState(0);

    console.log(productsResponse);

    //quando o componente inicializar, busca a lisa de produtos

    const getProducts = useCallback (() =>{
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

     useEffect(()=>{
        getProducts();
           
     },[getProducts]);

    const history = useHistory();

    const handleCreate = () =>{
        history.push('/admin/products/create');

    }
    const onRemove= (productId:number)=>{
        const confirm = window.confirm('Deseja realmente excluir este produto?');
        
       if(confirm){
        makePrivateRequest({ url:`/products/${productId}`, method:'DELETE'})
        .then(()=>{
            toast.info("Produto deletado com Sucesso!!!");
            getProducts();
        }).catch(()=>{
            toast.error("Erro ao deletar um Produto!!!")
        })
       }

        
    }
    return (
        <div className="admin-product-list">
            <button className="btn  btn-primary btn-lg" onClick={handleCreate}>
                Adicionar
            </button>
            <div className="admin-list-container">
                {productsResponse?.content.map(products=>(
                    <Card product={products} key={products.id} onRemove={onRemove}/>
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
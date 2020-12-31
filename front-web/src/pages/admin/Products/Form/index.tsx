import React from 'react';
import BaseForm from '../../../catalog/components/BaseForm';
import './styles.scss'
import {  makePrivateRequest } from 'core/utils/request';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';

type FormState ={
    name:string;
    price:string;
    description:string;
    imgUrl: string;
}

const Form = () => {

    const { register,handleSubmit, errors } = useForm<FormState>();
    const  history = useHistory();


    const onSubmit = (data:FormState) => {
      

        //console.log(data);
        makePrivateRequest({url:'/products',method:'POST', data:data})
        .then(()=>{
            toast.info('Produto Cadastrado com Sucesso!!');
            history.push("/admin/products");
        })
        .catch(()=>{
            toast.error('Erro ao inserir um produto!!')
        });
    };

    



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title="Cadastrar Produto">
                
                <div className="row">
                    <div className="col-6">
                    <div className="margin-bottom-30">
                        <input
                            ref={register
                                ({required: "Campo obrigatório",
                                 minLength: {value:5, message:'O campo deve ter no minimo 5 caracteres'},
                                 maxLength:{value:60,message:'O campo deve ter no máximo 60 caracteres'}
                            })}
                            name="name"
                            type="text"
                            className="form-control input-base"
                            placeholder="Nome do Produto"
                        />

                        {errors.name && (
                    <div className="invalid-feedback d-block">
                        {errors.name.message}
                    </div>
               )}
                    </div>      
                      <div className="margin-bottom-30">
                        <input
                            ref={register({ 
                                required: "Campo obrigatório",
                               
                            })}
                            name="price"
                            type="number"
                            className="form-control input-base"
                            placeholder="Preço"
                        />

                          {errors.price && (
                    <div className="invalid-feedback d-block">
                        {errors.price.message}
                    </div>
               )}

                        </div>  
                     <div className="margin-bottom-30">
                        <input
                            ref={register({required: "Campo obrigatório"})}
                            name="imgUrl"
                            type="text"
                            className="form-control  input-base"
                            placeholder="Imagem do Produto"
                        />
                          {errors.imgUrl && (
                    <div className="invalid-feedback d-block">
                        {errors.imgUrl.message}
                    </div>
               )}

                        </div>

                    </div>
                    <div className="col-6">
                        <textarea name="description" id="" cols={30} rows={10} 
                         ref={register({required: "Campo obrigatório"})}
                         className="form-control margin-bottom-30  input-base"
                         placeholder="Descrição"   
                         
                         />
                    {errors.description && (
                    <div className="invalid-feedback d-block">
                        {errors.description.message}
                    </div>
                    )}

                    </div>
                    
                </div>


            </BaseForm>
        </form>


    )
}


export default Form;
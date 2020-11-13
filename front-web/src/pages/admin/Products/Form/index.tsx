import React from 'react';
import BaseForm from '../../../catalog/components/BaseForm';
import './styles.scss'

const Form = () =>{
    return (
        <BaseForm  title="Cadastrar Produto">
            <div className="row">
                <div className="col-6">
                    <input type="text" className="form-control"/>
                    
                </div>
            </div>
           

        </BaseForm>

      
    )
}

export default Form;
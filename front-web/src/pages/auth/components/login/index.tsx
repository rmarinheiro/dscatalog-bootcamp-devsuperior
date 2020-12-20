import React from 'react';
import './styles.scss';
import AuthCard from '../../card';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import ButtonIcon from 'core/components/ButtonIcon/Index';

type FormData = {
    email:string;
    password: string;
}

const Login =  () => {
    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit = (data:FormData) =>{
        console.log(data);
    }

    return (
        <AuthCard title="Login">
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                 name="email" 
                 ref={register} 
                type="email" 
                className="form-control input-base margin-bottom-30"
                placeholder="Email"
                />

                 <input 
                type="password" 
                className="form-control input-base"
                placeholder="Senha"
                name="senha" 
                ref={register}
                />

                <Link to="/admin/auth/recover" className="login-link-recover">
                    Esqueci a Senha?
                </Link> 
                <div className="login-submit">
                    <ButtonIcon text="Logar" />
                </div>
                <div>
                    <span className="not-register">
                        Não tem Cadastro
                    </span>
                </div>
                <Link to="/admin/auth/register" className="login-link-register">
                    Cadastrar
                </Link>
            </form>
        </AuthCard>
    )
}

export default Login;
import React, { useState } from 'react';
import './styles.scss';
import AuthCard from '../../card';
import { useForm } from 'react-hook-form';
import { Link, useHistory,useLocation } from 'react-router-dom';
import ButtonIcon from 'core/components/ButtonIcon/Index';
import { makeLogin } from 'core/utils/request';
import { saveSessionData } from 'core/utils/auth';

type FormData = {
    username:string;
    password: string;
}

type LocationState = {
    from: string;
}

const Login =  () => {
    const { register, handleSubmit,errors } = useForm<FormData>();
    const [hasError,setHasError] = useState(false); 
    const history = useHistory();
    const location = useLocation<LocationState>();

    const { from } = location.state || { from: { pathname: "/admin" } };

    const onSubmit = (data:FormData) =>{
        console.log(data);
        makeLogin(data)
        .then(response =>{
            setHasError(false);
            saveSessionData(response.data);
            history.replace(from);

        })
        .catch(() =>{
            setHasError(true);
        })
    }

    return (
        <AuthCard title="Login">
           {hasError &&(
            <div className="alert alert-danger mt-5">
                Usuário e Senha Inválidos.
            </div>
           )}
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="margin-bottom-30">

                <input
                 name="username" 
                 ref={register({
                    required: "Campo obrigatório",
                     pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Email inválido"
                        }
                        })}
                type="email" 
                className={`form-control input-base margin-bottom-30 ${errors.username? 'is-invalid':''}`}
                placeholder="Email"
                />
               {errors.username && (
                    <div className="invalid-feedback d-block">
                        {errors.username.message}
                </div>
               )}
                    </div>
                 <div className="margin-bottom-30">
                 <input 
                    type="password" 
                    className={`form-control input-base margin-bottom-30 ${errors.password? 'is-invalid':''}`}
                    placeholder="Senha"
                    name="password" 
                     ref={register({required: "Campo obrigatório",minLength:5})}
                />

                {errors.password && (
                    <div className="invalid-feedback d-block">
                    {errors.password.message}
                </div>
               )}

                 </div>

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
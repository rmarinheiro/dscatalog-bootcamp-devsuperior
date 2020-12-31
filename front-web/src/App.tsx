import React from 'react';
import './core/assets/styles/custom.scss';
import './App.scss';
import Routers from './Routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const App = () =>{

    return (
        <React.Fragment>
            <ToastContainer/>
            <Routers />
        </React.Fragment>
    )
}

export default App;
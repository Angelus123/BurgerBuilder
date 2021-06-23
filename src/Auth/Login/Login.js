
import React, { useCallback, useContext, useState } from 'react';
 import './Login.css'
import { withRouter, Redirect } from "react-router";
import Spinner from '../../components/UI/Spinner/Spinner'
import { NavLink } from 'react-router-dom'
import app from '../base'

import {AuthContext} from "../Auth.js";


const Login = ({history} )=>{
    const [loading, setLoading] = useState(false);
    const handleLogin = useCallback(
        
        async event =>{
        event.preventDefault();
        setLoading(true)
        const{email, password} = event.target.elements;
        try{
            await app
            .auth()
            .signInWithEmailAndPassword(email.value, password.value);
            setLoading(false)
            history.push("/");
           
        
        } catch (error){
            setLoading(false)
            alert(error);
         }

        }, [history]);
        
        const {currentUser}= useContext(AuthContext);
        if (currentUser) {
            return <Redirect to= '/'/>;
        }   

        let form = (
            <form onSubmit={handleLogin} >
    
            <div>
                <input name="email" type="email" placeholder="Email"  className='inpt-style'  />
            </div>
    
            <div>
                <input name="password" type="password" placeholder="Password"  className='inpt-style'  />  
            </div>
    
            <button type="submit" className='btn-style' >Login</button>
           
    
        </form>
        )
        console.log('izzzz',loading)
        if (loading){
           form= <Spinner />
        }
      

return(
  <div className='lgn-style'>
    <h1 >Login</h1>
        {form}
    <p> Not have account <NavLink to="/signup">sign Up</NavLink> </p>
    </div>          
)
};

export default withRouter(Login); 

import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from "react-router";
import app from './base'
import {AuthContext} from "./Auth.js";
const Login = ({history} )=>{
    const handleLogin = useCallback(
        async event =>{
        event.preventDefault();
        const{email, password} = event.target.elements;
        try{
            await app
            .auth()
            .signInWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error){
            alert(error);
         }

}, [history]);
 const {currentUser}= useContext(AuthContext);
if (currentUser) {
    return <Redirect to= '/'/>;
}   

return(
  <div style={lgnStyle}>
        <h1>Login</h1>

         <form onSubmit={handleLogin} >
              <div>
                
                <input name="email" type="email" placeholder="Email"  style={inptStyle} />
                </div>
            <div>
           
            <input name="password" type="password" placeholder="Password"  style={inptStyle} />  

        <button type="submit" style={btnStyle} >Login</button>
        </div>
      
    </form>

</div>

        
   
)
};
const inptStyle ={
    backgroundColor:'#eef',
    height: '40px',
    width:'90%',
    padding:'0px 10px 0px 0px',
    borderBottom: '1px #079 solid',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    margin: '3px',


  
   
}
const lgnStyle = {
    width:'30%',
    color: '#fff',
    padding: '5px 9px',
    borderRadius: '10%',
    cursor: 'pointer',
    margin:'0 35% 0 35%'

}
const btnStyle = {
    backgroundColor:'#077',
    color: '#fff',
    border: 'none',
    borderRadius: '10%',
    cursor: 'pointer',
    margin: '3px',
    height: '40px',
    width:'90%'
    
}
export default withRouter(Login); 
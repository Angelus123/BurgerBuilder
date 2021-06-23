import React from 'react'
import {Route} from 'react-router-dom';
import user from "./user";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
// import app from "./base";
import { AuthoProvider } from "./Auth";
import PrivateRoute from './PrivateRouter';
import Layout from '../hoc/Layout/Layout'
import Checkout from '../containers/Checkout/Checkout'      
import Orders from '../containers/Orders/Orders'
import Auth from '../containers/Auth/Auth'

const UserAuth = () => {
    return (
        <AuthoProvider>  

   <Layout>
       
     <PrivateRoute exact path="/" component={user} />
    <PrivateRoute path="/checkout" component ={Checkout} />
    <PrivateRoute path ="/orders" component ={Orders} />
    <PrivateRoute path ="/auth" component ={Auth} />  
      <Route exact path="/signUp" component={SignUp} />
      <Route exact path="/login" component={Login}/>
    </Layout>
      
     </AuthoProvider> 
    );

} 
export default UserAuth; 
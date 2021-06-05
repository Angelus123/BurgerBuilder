import React from "react";
import app from "./base";
import App from "../App"

const user = () => {
    return (  
<>
        
            <button onClick= {() => app.auth().signOut()}>Sign out</button>
<App/>
        
    
  </> 
   )
}
export default user;
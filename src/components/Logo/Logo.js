import React from 'react'
import {Link} from 'react-router-dom'
import burgerLog from '../../assets/Logo/BurgerLogo.PNG'
import './Logo.css'
const logo = (props) => (

    
    <Link to="/posts"><div className= 'Logo' style={{height:props.height}}><img src ={burgerLog} alt ="MyBurger" />
</div></Link>
)
export default logo
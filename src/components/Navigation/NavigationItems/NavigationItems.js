import React from 'react'
import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'
const navigationItems = () => (
<ul className='NavigationItems'>
    <NavigationItem link ="/" exact>Burger Builder</NavigationItem>
    <NavigationItem link ="/Orders">Orders</NavigationItem>
    {/* <NavigationItem link ="/Login">Login</NavigationItem>
    <NavigationItem link ="/Signup">Signup</NavigationItem> */}
</ul>
)
export default navigationItems
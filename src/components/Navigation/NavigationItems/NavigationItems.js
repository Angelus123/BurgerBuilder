import React from 'react'
import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'
const navigationItems = () => (
<ul className='NavigationItems'>
    <NavigationItem link ="/" exact>Burger Builder</NavigationItem>
    <NavigationItem link ="/Orders">Orders</NavigationItem>
    <NavigationItem link ="/login">Login</NavigationItem>
</ul>
)
export default navigationItems
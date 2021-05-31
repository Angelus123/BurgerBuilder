import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import './toolbar.css'
const toolbar = (props) => {
  console.log(props.open)
    return <header className="Toolbar">
       <DrawToggle clicked ={props.toggle} />
        <Logo height='80%'/>
        <nav className="DesktopOnly">
          <NavigationItems />
        </nav>
    </header>
}
export default toolbar
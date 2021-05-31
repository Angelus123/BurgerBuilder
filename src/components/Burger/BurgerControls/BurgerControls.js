import React from 'react'
import './BurgerControls.css'
import BurgerControl from './BuildControl/BuildControl'
const controls = [
{label: 'Salad', type: 'salad'},
{label: 'Bacon', type: 'bacon'},
{label: 'Cheese', type: 'cheese'},
{label: 'meat', type: 'meat'}
]
const burgerControls  = (props) => 
  (<div className ='BurgerControls'>

         <p className ="Price">
           Current price:{props.price.toFixed(2)}$
        </p> 
        {controls.map(ctrl => {
           return <BurgerControl
            key = {ctrl.label}
            label ={ctrl.label}
            addedIngredients={()=>props.added(ctrl.type)}
            removeIngredients={() =>props.removed(ctrl.type)}
            disabled ={props.disabled[ctrl.type]}
            />
        })}

      <button className="OrderButton " disabled={!props.purchasable} onClick = {props.ordered}>ORDER NOW</button>

    </div>)

    
export default burgerControls
import React from 'react'
import './Order.css'
const order = (props) => {
    console.log('ize',props)
    const ingredients = []
        for(let ingredientName in props.ingredients) {
            ingredients.push (
                {
                    name:ingredientName,
                    amount: props.ingredients[ingredientName]
                }
            )

        }
   const ingredientsOutput = ingredients.map(ig => {
       return <span className="ig"
               
        key={ig.name}> {ig.name}( {ig.amount})</span>
   })
return(
    <div className="Order"> 
        <p>Ingredients: {ingredientsOutput}</p>
        <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        {/* <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p> */}
    </div>
)
}
export default order
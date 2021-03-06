import React, {Component} from'react'
import Button from '../../UI/Button/Button'
 
import Aux from '../../../hoc/Auxi/Auxilliary'
class OrderSumary extends Component{
  //This could be functional component ,it doesn't have to be class component
  componentDidUpdate(){
    console.log('[OrderSumary.js] DidUpdate')
  }
  render() {
    console.log('izere',this.props.ingredients)
    const ingredientSumary =Object.keys(this.props.ingredients)
    .map(igKey => {
      return <li key={igKey}><span style ={{textTransform:'capitalize '}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
    })
    return (
      <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with</p>
        { ingredientSumary }
       <p><strong>Price: {this.props.price.toFixed(2)}$</strong></p>
       <p>Continue to Checkout</p>
       <Button btnType='Danger' clicked ={this.props.cancel }>CANCEL</Button>
       <Button btnType='Success' clicked ={this.props.continue }>CONTINUE</Button>
  

         
   </Aux>)
    
  }
}

export default OrderSumary
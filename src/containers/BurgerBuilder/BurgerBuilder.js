import React,{ Component } from "react";
import Aux from '../../hoc/Auxi/Auxilliary'
import Burger from '../../components/Burger/Burger'
import BulgerControls from '../../components/Burger/BurgerControls/BurgerControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSumary from "../../components/Burger/OrderSumary/OrderSumary";

const INGREDIENT_PRICES ={
    salad:0.5,
    cheese: 0.4,
    meat:1.3,
    bacon:0.7
}
class BuggerBuilder extends Component{
    // constructor (props) {
    //     super(props)
    //     this.state ={...}
    // }
    state = {
        ingredients: {
             salad: 0,
             bacon: 0,
             cheese: 0,
             meat:0
        },
        totalPrice: 4,
        purchasable:false,
        purchasing:false
    }
    updatePurcharseState(ingredients){
     
      const sum =Object.keys(ingredients)
      .map( igKey =>{
      
        return ingredients[igKey]
        }).reduce((sum, el)=>{
            console.log(sum)
            return sum + el
        },0)
        this.setState({purchasable:sum>0})

 }
    addIngridientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount =oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice =oldPrice+priceAddition
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurcharseState( updatedIngredients)
    }

    removeIngridientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
            const updatedCount =oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            }
            updatedIngredients[type] = updatedCount
            const priceRemoved = INGREDIENT_PRICES[type]
            const oldPrice = this.state.totalPrice
            const newPrice =oldPrice-priceRemoved
            this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
            this.updatePurcharseState( updatedIngredients)
    }
    purchaseHandler = () => {
        this.setState({purchasing:true})
    } 
    purchaseCancelHandler = () =>{
        this.setState({purchasing:false})
    }
    render(){
  
        const disabledInfo ={
            ...this.state.ingredients
        }
       
        for(let key in disabledInfo){
     
            disabledInfo[key]= disabledInfo[key] <=0
          
        }
       
        return (
            <Aux>
               
                <Modal 
                    show ={this.state.purchasing} 
                    modalClosed ={this.purchaseCancelHandler}>
                    <OrderSumary 
                    ingredients={this.state.ingredients} 
                    price={this.state.totalPrice}
                    modalClosed ={this.purchaseCancelHandler}/>
                    </Modal>
               <Burger ingredients={this.state.ingredients} />
              <BulgerControls
              added={this.addIngridientHandler} 
              removed={this.removeIngridientHandler} 
              disabled={disabledInfo}
              price={this.state.totalPrice}
              ordered={this.purchaseHandler}
              purchasable={this.state.purchasable}
             />
            </Aux>
        )
    }
}
export default BuggerBuilder
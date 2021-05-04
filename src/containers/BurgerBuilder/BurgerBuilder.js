import React,{ Component } from "react";
import Aux from '../../hoc/Auxi/Auxilliary'
import Burger from '../../components/Burger/Burger'
import BulgerControls from '../../components/Burger/BurgerControls/BurgerControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSumary from "../../components/Burger/OrderSumary/OrderSumary";
import axios from '../../axios'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHAndler/withErrorHandler'
const INGREDIENT_PRICES ={
    salad:0.5,
    cheese: 0.4,
    meat:1.3,
    bacon:0.7
}
class BuggerBuilder extends Component{
  
    state = {
        ingredients: {
             salad: 0,
             bacon: 0,
             cheese: 0,
             meat:0
        },
        totalPrice: 4,
        purchasable:false,
        purchasing:false,
        loading: false
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

    purchaseContinuingHandler = () =>{

       this.setState({loading: true})
        const order ={
            ingredients:this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                address:{
                    street:'Teststreet 1',
                    zipCode:'41351',
                    country:'Germany'
                },
                email: 'test@test.com'
    
            },
            deliveryMethod:'fastest'
         
        }
        axios.post('/orders.json',order)
        .then( response => {
            this.setState({loading:false,purchasing:false})
        
        })
        .catch( err =>this.setState({loading:false,purchasing:false}))
    }
    render(){
  
        const disabledInfo ={
            ...this.state.ingredients
        }
       
        for(let key in disabledInfo){
     
            disabledInfo[key]= disabledInfo[key] <=0
          
        }
        let orderSummary =  <OrderSumary 
        ingredients={this.state.ingredients} 
        price={this.state.totalPrice}
        cancel ={this.purchaseCancelHandler}
        continue ={this.purchaseContinuingHandler}
        />
        if(this.state.loading){
            orderSummary = <Spinner />

        }
       
        return (
            <Aux>
               
                <Modal 
                    show ={this.state.purchasing} 
                    modalClosed ={this.purchaseCancelHandler}>
                    {orderSummary}
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
export default withErrorHandler(BuggerBuilder,axios)
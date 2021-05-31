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
        ingredients:null,
        totalPrice: 4,
        purchasable:false,
        purchasing:false,
        loading: false
    }
    componentDidMount(){
   
        axios.get('https://react-burger-app-c147e-default-rtdb.firebaseio.com/ingredients.json')
        .then( response => {
      
            this.setState({ingredients:response.data})})
         
            .catch(err =>err)

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
    addIngredientHandler = (type) => {
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

    removeIngredientHandler = (type) => {
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
    
        const queryParams= []
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' +this.state.totalPrice)
        const queryString =queryParams.join ( '&' )
        
        this.props.history.push(
           { pathname: '/checkout',
           search:'?'+  queryString
        }
        )
    }
    render(){
           console.log(this.state.ingredients)
        const disabledInfo ={
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key] <=0 
        }
        let orderSummary =null
        
       
        let burger =<Spinner />
        console.log(this.state.ingredients)
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BulgerControls
                    added={this.addIngredientHandler} 
                    removed={this.removeIngredientHandler} 
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable}
                />
                </Aux>
          )

          orderSummary =  <OrderSumary 
        ingredients={this.state.ingredients} 
        price={this.state.totalPrice}
        cancel ={this.purchaseCancelHandler}
        continue ={this.purchaseContinuingHandler}
        />
        }
        if(this.state.loading){
            console.log('there! i am')
            orderSummary = <Spinner />
        }
       
        return (
            <Aux>
               
                <Modal 
                    show ={this.state.purchasing} 
                    modalClosed ={this.purchaseCancelHandler}>
                    {orderSummary}
                 </Modal>
                 {burger}
              
            </Aux>
        )
    }
}
export default withErrorHandler(BuggerBuilder,axios)
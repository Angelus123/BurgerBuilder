import React, {Component} from 'react'
import './ContactData.css'
import axios from '../../../axios'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
// import { Redirect } from 'react-router'
class ContactData extends Component{
    state ={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false,
        ok:false
    }
 
    orderHandler =(event) =>{
        this.setState({loading:true})
        event.preventDefault()
       console.log('continuing',this.props.price)
       this.setState({loading:true})
         const order ={
            ingredients: this.props.ingredients,
            price: this.props.price,
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
            
            this.setState({loading:false})
            this.props.history.push('/orders')
             
    
        })
        .catch( err =>this.setState({loading:false}))
    }
    
       
    render(){
        let form =(
         
                <form>
                    <input className="Input" type="text" name="name" placeholder="Your Name" />
                    <input className="Input" type="email" name ="email" placeholder="Your Email" />
                    <input className="Input" type="text" name ="street" placeholder="Street" />
                    <input className="Input" type="text" name ="postal" placeholder="Postal Code" />
                    <Button btnType ="Success" clicked={this.orderHandler}>ORDER</Button>

                </form>
          
        )
           if(this.state.loading){
            console.log('there! i am')
            form = <Spinner />
        }
        // let redirect =null;
        // if(this.state.ok)
        //     redirect=<Redirect to ="/home"  />
        return(
                <div className="ContactData">

                {/* {redirect} */}
            
                <h4> Enter your Contact Data</h4>
            {form}
              </div>
        )
    }
}
export default ContactData
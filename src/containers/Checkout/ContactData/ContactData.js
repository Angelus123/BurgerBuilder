import React, {Component} from 'react'
import './ContactData.css'
import axios from '../../../axios'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
class ContactData extends Component{
    state ={
        orderForm: {
                name:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value: "",
                    validation:{
                        required:true,
                        minLength:3,
                        maxLength:20
                    },
                    valid:false,
                    touched:false

                },
                street:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Street'
                    },
                    value: "",
                    validation:{
                        required:true,
                        minLength:3,
                        maxLength:20
                    },
                    valid:false
                    ,
                    touched:false
                },
                zipCode:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'ZIP Code',
                        
                    },
                    value: "",
                    validation:{
                        required:true,
                        minLength:3,
                        maxLength:20
                    },
                    valid: false,
                    touched:false
                   
                },

                  phone:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Phone number'
                    },
                    value: "",
                    validation:{
                        required:true,
                        minLength:5,
                        maxLength:10,
                        isNumeric:true
                    },
                    valid: false,
                    touched:false
                   
                },
                country:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Country'
                    },
                    value: "",
                    validation:{
                        required:true,
                        minLength:3,
                        maxLength:20
                    },
                    valid: false,
                    touched:false
                },
                email: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your E-mail',
                        minLength:3,
                        maxLength:20,
                       

                    },
                    value: "",
                    validation:{
                        required:true,
                        isEmail:true
                    },
                    valid:false,
                    touched:false
                },
                deliveryMethod:{
                    elementType:'select',
                    elementConfig:{
                    options:[    { value:'fastest', displayValue:'fastest'},
                                { value:'cheapest', displayValue:'cheapest'},
                    ]
                    },
                    value: "fastest",
                    validation:{},
                     valid:true,
                    
                   
                },
    
            },
            formIsValid:false,
            loading:false

        }
    orderHandler =(event) =>{
        this.setState({loading:true})
        const formData ={};
        for (let formElementIdenifier in this.state.orderForm){
            formData[formElementIdenifier] = this.state.orderForm[formElementIdenifier].value
        }
        event.preventDefault()
       this.setState({loading:true})
         const order ={
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData:formData
        }
        
        axios.post('/orders.json',order)
        .then( response => {
            
            this.setState({loading:false})
            this.props.history.push('/orders')
        })
        .catch( err =>this.setState({loading:false}))
    }
    
    checkValidity =(value, rules) =>{
        let isValid = true
        if(rules.required){
            isValid =value.trim() !== '' && isValid

        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        if(rules.maxLength){
            isValid =value.length<= rules.maxLength && isValid
        }
        
         if(rules.minLength){
            isValid =value.length>= rules.minLength && isValid
        }
        return isValid

    }
       inputChangedHandler = (event, inputIdentifier) => {
        const updateOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement ={
            ...updateOrderForm[inputIdentifier]
        } 
        updatedFormElement.value =event.target.value
        updatedFormElement.valid =this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched=true
        updateOrderForm[inputIdentifier]=updatedFormElement 
       let formIsValid = true
        for(let inputIdentifiers in  updateOrderForm){
            formIsValid = updateOrderForm[inputIdentifiers].valid && formIsValid 

        }
        this.setState({orderForm: updateOrderForm, formIsValid:formIsValid})

       } 
    render(){
        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config: this.state.orderForm[key]
            })
        }
      
        let form =(
         
                <form onSubmit= {this.orderHandler}>
                   
                    {formElementArray.map(formElement =>(
                        <Input 
                            key = {formElement.id}
                            elementType ={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value = {formElement.config.value }
                            invalid = {!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed ={ (event) => this.inputChangedHandler(event, formElement.id) }
                            />
                    ))}
                    
                    <Button btnType ="Success" disabled={!this.state.formIsValid }>ORDER</Button>
                </form>        
        )
           if(this.state.loading){
 
            form = <Spinner />
        }
     
        return(
            <div className="ContactData">
                <h4> Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}
export default ContactData
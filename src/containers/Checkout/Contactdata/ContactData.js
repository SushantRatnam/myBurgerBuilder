import React, { Component } from 'react';
import classes from "./ContactData.module.css";
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from "react-redux";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index'


class ContactData extends Component {
    state = { 
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },            
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your city'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 6,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                   options: [
                       {value: 'fastest', displayValue: 'Fastest'},
                       {value: 'cheapest', displayValue: 'Cheapest'}

                       
                   ]
                },
                value: 'fastest',
                validation:{},
                valid: true,
            }
        },
        // loading: false  ,
        formIsValid: false     
     }

    orderClicked = (event) => {
        event.preventDefault()
         this.setState({
             loading: true
         })
        const orderData = {}   
        for (let inputIdentifier in this.state.orderForm){
            orderData[inputIdentifier] = this.state.orderForm[inputIdentifier].value
        }


         const order = {
             ingredients: this.props.ings,
             price: this.props.price,
             orderData,
             userId: this.props.userId
         }
        this.props.onBurgerOrder(order, this.props.token)

        //  axios.post('/orders.json',order)
        //     .then(response => {
        //         this.setState({
        //             loading: false,
        //         });
        //         this.props.history.push('/')
        //     })
        //     .catch(error => {
        //         this.setState({
        //             loading: false,
        //         })
        //     })


    }

    checkValidity(rules, value){
        let isValid = true
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid ;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid

    }

    inputChangedHandler = (event,inputIdentifier) => {
        const updatedForm = {...this.state.orderForm}
        const updatedFormElement = {...this.state.orderForm[inputIdentifier]}
        updatedFormElement.value = event.target.value
        updatedFormElement.touched = true
        updatedFormElement.valid = this.checkValidity(updatedFormElement.validation,updatedFormElement.value)
        updatedForm[inputIdentifier] = updatedFormElement
        let formIsValid = true
        for (let inputIdentifier in updatedForm){
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid
        }
        this.setState({
            orderForm: updatedForm,
            formIsValid
        })
        
    }

    render() { 
        let inputArray = []
        for(let key in this.state.orderForm){
            inputArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = ( <form onSubmit={this.orderClicked}>
            {
                inputArray.map(element => {
                        return   <Input elementType={element.config.elementType} 
                                  elementConfig={element.config.elementConfig}
                                  value={element.config.value}
                                  invalid={!element.config.valid}
                                  shouldValidate={element.config.validation}
                                  touched={element.config.touched}
                                  changed={(event)=>this.inputChangedHandler(event,element.id)}
                                  key={element.id}/>
                })
            }
            
            <Button btnType='Success' disabled={!this.state.formIsValid} >ORDER</Button>

        </form>)
        if(this.props.loading){
           form =  <Spinner/>
        }
        return ( 
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
         );
    }
}
 
const mapStateToProps = state => {
    return{
        ings: state.burger.ingredients,
        price: state.burger.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return{

        onBurgerOrder: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
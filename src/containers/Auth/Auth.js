import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from "react-router-dom";

class Auth extends Component {
    state = { 
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            }, 
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }, 
        },
        isSignUp: true
     }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath()
        }
    }
    
     
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedControls = {
            ...this.state.controls,
            [inputIdentifier] : {
                ...this.state.controls[inputIdentifier],
                value: event.target.value,
                valid: this.checkValidity(event.target.value,this.state.controls[inputIdentifier].validation),
                touched: true
            }
        }
        this.setState({
            controls: updatedControls
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuthenticate(this.state.controls.email.value,this.state.controls.password.value, this.state.isSignUp)
    }

    switchAuthType = () => {
            this.setState(prevState => {
               return{
                isSignUp: !prevState.isSignUp
               } 
            })
    }
    


    render() { 

        let inputArray = []
        for(let key in this.state.controls){
            inputArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = inputArray.map(element => {
                        return   <Input elementType={element.config.elementType} 
                                  elementConfig={element.config.elementConfig}
                                  value={element.config.value}
                                  invalid={!element.config.valid}
                                  shouldValidate={element.config.validation}
                                  touched={element.config.touched}
                                  changed={(event)=>this.inputChangedHandler(event,element.id)}
                                  key={element.id}/>
                })
        if(this.props.loading){
            form = <Spinner/>
        }

        let error = null
        if(this.props.error){
            error = <p>{this.props.error}</p>
        }

        let authRedirect = null
        if(this.props.isAuth){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        return ( 
            
            <div className={classes.Auth}> 
                {authRedirect}
                {error}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
                    <Button 
                    clicked={this.switchAuthType}
                    btnType='Danger'>SWITCH TO {this.state.isSignUp ? 'SIGN IN': 'SIGN UP'}</Button>
            </div>
         );
    }
    
}

const mapStateToProps = state => {
    return{
        error: state.auth.error,
        loading: state.auth.loading,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burger.building,
        authRedirectPath: state.auth.authRedirect
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuthenticate: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Auth);
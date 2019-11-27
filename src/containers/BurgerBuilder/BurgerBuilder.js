import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";



class BurgerBuilder extends Component {
    state = { 
        purchased: false,
     }

    //  componentDidMount() {
    //      axios.get('https://react-burger-builder-77d34.firebaseio.com/ingredients.json')
    //         .then(response => {
    //             this.setState({
    //                 ingredients: response.data
    //             })
    //         })
    //         .catch(error => {
    //             this.setState({
    //                 error: true
    //             })
    //         })
    //  }
    componentDidMount(){
        this.props.onInitIngredients()
    }

     changePurchasableHandler = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum,el) => {
                return sum + el
            },0 )
         return sum>0
            
     }

     

     purchasedHandler = () => {
         if(this.props.isAuth){
            this.setState({purchased: true})
         }
         else{
             this.props.onSetAuthRedirectPath('/checkout')
             this.props.history.push('/auth')
         }
     }

     handlePurchasedCancel = () => {
         this.setState({
             purchased: false
         })
     }

     handlePurchasedSuccess = () => {
        
        // const queryParams = []
        // for (let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price=' + this.state.totalPrice.toFixed(2))
        // const queryString = queryParams.join('&')

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: queryString
        // })
        this.props.onInitPurchased()
        this.props.history.push('./checkout')
     }

    render() { 
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        let orderSummary = null
       
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/> 
        if(this.props.ings){

            burger = (
                <Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                    addIngredients = {this.props.onIngredientsAdded}
                    removeIngredients = {this.props.onIngredientsRemoved}
                    disabledInfo = {disabledInfo}
                    totalPrice = {this.props.price}
                    purchasable = {this.changePurchasableHandler(this.props.ings)}
                    ordered = {this.purchasedHandler}
                    isAuth = {this.props.isAuth}
                    />
                </Aux>    
            )
            orderSummary = <OrderSummary 
                                ingredients={this.props.ings}
                                purchaseCancel = {this.handlePurchasedCancel}
                                purchaseSuccess = {this.handlePurchasedSuccess}
                                price = {this.props.price}
                                />
        
        }
        return ( 
            <Aux>
                <Modal show = {this.state.purchased} backdropClicked={this.handlePurchasedCancel}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
         );
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burger.ingredients,
        price : state.burger.totalPrice,
        error: state.burger.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientsAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientsRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchased: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
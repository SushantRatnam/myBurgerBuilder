import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'



class Orders extends Component {
    // state = { 
    //     order: [],
    //     loading: true
    //  }

    componentDidMount(){
        this.props.onFetchOrders(this.props.token, this.props.userId)
        // axios.get('/orders.json')
        //     .then(res => {
        //         const fetchedData = []
        //         for(let key in res.data){
        //             fetchedData.push({
        //                 ...res.data[key],
        //                 id: key
        //             })
        //         }
        //         fetchedData.push()
        //         this.setState({
        //             loading: false,
        //             order: fetchedData
        //         })
        //     })
        //     .catch(error => {
        //         this.setState({
        //             loading: false,
        //         })
        //     })
    }

    render() { 
        let orders = <Spinner/>
        if(!this.props.loading){
            orders = this.props.order.map(order => {
                return  <Order 
                            key={order.id}
                            ingredients = {order.ingredients}    
                            price = {order.price}
                            />
                })}   
        return (
            <div>
                {orders}
            </div>    

        )  
} 

            
        
    
}

const mapStateToProps = state=> {
    return {
        order: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios)) ;
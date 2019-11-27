import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
    state = { sideDrawerShow: false }

    sideDrawerClosedhandler = () => {
        this.setState({
            sideDrawerShow: false
        })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerShow: !prevState.sideDrawerShow}
        })
    }

    render() { 
        return ( 
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuth}
                    Toggle={this.sideDrawerToggleHandler}/>
                <SideDrawer isAuth={this.props.isAuth} open={this.state.sideDrawerShow} closed={this.sideDrawerClosedhandler}/>
                <main className={classes.Content}> 
                    {this.props.children}
                </main>
             </Aux>
         );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);


import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

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
                <Toolbar Toggle={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.sideDrawerShow} closed={this.sideDrawerClosedhandler}/>
                <main className={classes.Content}> 
                    {this.props.children}
                </main>
             </Aux>
         );
    }
}
 
export default Layout;


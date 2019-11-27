import React from 'react';
import classes from './SideDrawer.module.css'
import Logo from '../../Burger/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Auxillary';
import BackDrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close]
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return ( 
        <Aux>
            <BackDrop show = {props.open} clicked={props.closed}  />
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                   <div className={classes.Logo}>
                       <Logo/>
                  </div>
                    <NavigationItems isAuth={props.isAuth}/>
            </div>
            
        </Aux>
     );
}
 
export default SideDrawer;
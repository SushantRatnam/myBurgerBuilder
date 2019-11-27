import React from 'react';

import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},


]

const BuildControls = (props) => {
    return ( 
        <div className={classes.BuildControls}>
            <p>
                Current Price: <strong>{props.totalPrice.toFixed(2)}</strong>
            </p>
            {controls.map(ctrl => (
                <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                added={()=>props.addIngredients(ctrl.type)}
                remove = {() => props.removeIngredients(ctrl.type)}
                disabled = {props.disabledInfo[ctrl.type]}
                />
            ))}
            <button 
            className={classes.OrderButton} 
            disabled={!props.purchasable}
            onClick={props.ordered}
            >
                {props.isAuth ? 'ORDER NOW' : 'SIGNUP TO ORDER'}
            </button>
        </div>
     );
}
 
export default BuildControls;
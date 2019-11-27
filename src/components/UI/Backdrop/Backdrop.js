import React from 'react';

import { Backdrop } from "./Backdrop.module.css";

const BackDrop = (props) => (
    props.show ? <div 
    className={Backdrop}
    onClick = {props.clicked}
    ></div> : null
);
 
export default BackDrop; 
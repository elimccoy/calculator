import React from 'react'
import { propTypes } from 'react-bootstrap/esm/Image';
import Style from '../Styles/CustomButton.module.css'

const CustomButton = (props) => 
{
  return (
    <div className={Style.buttonStyle} onClick={props.onClick}>
      <div className={Style.buttonText}>{props.value}</div>
    </div>
  );
}

export default CustomButton
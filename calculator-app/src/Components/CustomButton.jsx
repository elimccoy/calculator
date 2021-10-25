import React from 'react'
import Style from '../Styles/CustomButton.module.css'

const CustomButton = (props) => 
{

  if(props.value.length > 3)
  {
    return (
      <div className={Style.buttonStyle} onClick={props.onClick}>
        <div className={Style.buttonTextLong}>{props.value}</div>
      </div>
    );
  }
  else
  {
    return (
      <div className={Style.buttonStyle} onClick={props.onClick}>
        <div className={Style.buttonText}>{props.value}</div>
      </div>
    );
  }
}

export default CustomButton
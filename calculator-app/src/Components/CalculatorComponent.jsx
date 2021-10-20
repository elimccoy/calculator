import React, { useState } from 'react'
import Style from '../Styles/CalculatorComponent.module.css'
import CustomButton from './CustomButton';

const CalculatorComponent = () => 
{
  //State Varaibles:
  const [inputString, setInputString] = useState('');
  
  //buttonClick
  //Input: buttonVal (Any)
  //Desc: Adds the passed button value to the input string.
  const buttonClick = (buttonVal) =>
  {
    setInputString(inputString + buttonVal);
  } 

  return (
    <div className={Style.CalculatorBody}>
      <div className={Style.CalculatorDisplay}>
        <div className={Style.CalculatorDisplayText}>
          {inputString}
        </div>
      </div>
      <div className={Style.ButtonsSection}>
        <div className={Style.CalculatorButtonContainer}>
          <CustomButton value = {1} onClick={()=>{ buttonClick(1) }}/>
          <CustomButton value = {2} onClick={()=>{ buttonClick(2) }}/>
          <CustomButton value = {3} onClick={()=>{ buttonClick(3) }}/>
          <CustomButton value = {4} onClick={()=>{ buttonClick(4) }}/>
          <CustomButton value = {5} onClick={()=>{ buttonClick(5) }}/>
          <CustomButton value = {6} onClick={()=>{ buttonClick(6) }}/>
          <CustomButton value = {7} onClick={()=>{ buttonClick(7) }}/>
          <CustomButton value = {8} onClick={()=>{ buttonClick(8) }}/>
          <CustomButton value = {9} onClick={()=>{ buttonClick(9) }}/>
          <CustomButton value = {0} onClick={()=>{ buttonClick(0) }}/>
          <CustomButton value = {'C'} onClick={()=>{ setInputString('') }}/>
        </div>
        <div className={Style.CalculatorOperatorContainer}>
          <CustomButton value = {'-'} onClick={()=>{ buttonClick('-') }}/>
          <CustomButton value = {'+'} onClick={()=>{ buttonClick('+') }}/>
          <CustomButton value = {'X'} onClick={()=>{ buttonClick('*') }}/>
          <CustomButton value = {'/'} onClick={()=>{ buttonClick('/') }}/>
          <CustomButton value = {'='} onClick={()=>{ buttonClick('=') }}/>
        </div>
      </div>
    </div>
  );
}

export default CalculatorComponent;

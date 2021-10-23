import React from 'react'
import Style from './Styles/Main.module.css'
import CalculatorComponent from './Components/CalculatorComponent';

function Main() {
  return (
    <div className={Style.MainContainer}>
      <CalculatorComponent/>
    </div>
  );
}

export default Main;

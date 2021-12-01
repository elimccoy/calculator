import React from 'react'
import Style from './Styles/Main.module.css'
//import CalculatorComponent from './Components/CalculatorComponent';
import TestCasesComponent from './Components/TestCasesComponent'

function Main() {
  return (
    <div className={Style.MainContainer}>
      <TestCasesComponent/>
    </div>
  );
}

export default Main;

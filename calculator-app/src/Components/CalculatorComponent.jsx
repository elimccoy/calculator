import React, { useState } from 'react'
import Style from '../Styles/CalculatorComponent.module.css'
import CustomButton from './CustomButton';
import shuntingYardAlgorithm from '../Methods/ShuntingYard';

const CalculatorComponent = () => 
{
  //State Varaibles:
  const [input, setInput] = useState([]);
  const [visibleString, setVisibleString] = useState('');

  //buttonClick
  //Input: buttonVal (Any)
  //Desc: Adds the passed button value to the input string.
  const buttonClick = (buttonVal) =>
  {
    let s = input;
    s.push(buttonVal);
    setInput(s);

    if(buttonVal !== 'Neg')
    {
      setVisibleString(visibleString + buttonVal);
    }
    else
    {
      setVisibleString(visibleString + '-');
    }

    console.log('Array: ' + input.toString());
    console.log('Visible String: ' + visibleString);
  } 

  //postfixEvaluation
  //Desc: Takes an input of a postfix expression and returns the result.
  const postfixEvaluation = (postfixExpression) =>
  {
    console.log('Postfix Eval...');
    let stack = []

    //Iterate over expression and use stack to evaluate.
    for(let i = 0; i < postfixExpression.length; i++)
    {
      let curData = postfixExpression.at(i);
      console.log('curData = ' + curData);

      if(curData !== '/' && curData !== '*' && curData !== '+' && curData !== '-' && curData !== '^' 
        && curData !== 'Sin(' && curData !== 'Cos(')
      {
        console.log('stack push: ' + curData);
        stack.push(curData);
        console.log('stack: ' + stack.toString());
      }
      else
      {

        //If trig func:
        if(curData === 'Sin(' || curData === 'Cos(')
        {
          let firstVal = stack.pop();
          let operator = curData;
          let result = null;

          switch (operator) {
            case 'Sin(':
              result = Math.sin(firstVal);
              break;
            case 'Cos(':
              result = Math.cos(firstVal);
              break;
          }

          stack.push(result);
        }
        else
        {
          //Get the values that need to be evaluated.
          let firstVal = stack.pop();
          let secondVal = stack.pop();
          let operator = curData;
          let result = null;

          switch (operator) {
            case '/':
              result = secondVal / firstVal;
              break;
            case '*':
              result = secondVal * firstVal;
              break;
            case '+':
              result = secondVal + firstVal;
              break;
            case '-':
              result = secondVal - firstVal;
              break;
            case '^':
              result = secondVal;
              for (let j = 1; j < firstVal; j++) {
                result = result * secondVal;
              }
              break;
            case 'Sin(':
              result = Math.sin(secondVal);
              break;
          }

          stack.push(result);
        }
      }
    }

    return(stack.pop());
  }

  //evaluate
  //Desc: Takes the input string and evaluates it. If the string does not
  // have correct synatax, the result will be an error.
  const evaluate = () =>
  {
    let result = shuntingYardAlgorithm(input);
    console.log('post shunting yard: ' + result);
    result = postfixEvaluation(result);
    
    //Clear input and show result.
    setInput([]);
    setVisibleString(result);
  }

  return (
    <div className={Style.CalculatorBody}>
      <div className={Style.CalculatorDisplay}>
        <div className={Style.CalculatorDisplayText}>
          {visibleString}
        </div>
      </div>
      <div className={Style.ButtonsSection}>
        <div className={Style.CalculatorButtonContainer}>
          <CustomButton value = {'Sin'} onClick={()=>{ buttonClick('Sin(') }}/>
          <CustomButton value = {'Cos'} onClick={()=>{ buttonClick('Cos(') }}/>
          <CustomButton value = {1} onClick={()=>{ buttonClick(1) }}/>
          <CustomButton value = {2} onClick={()=>{ buttonClick(2) }}/>
          <CustomButton value = {3} onClick={()=>{ buttonClick(3) }}/>
          <CustomButton value = {'C'} onClick={()=>{ setVisibleString(''); setInput([]); }}/>
          <CustomButton value = {4} onClick={()=>{ buttonClick(4) }}/>
          <CustomButton value = {5} onClick={()=>{ buttonClick(5) }}/>
          <CustomButton value = {6} onClick={()=>{ buttonClick(6) }}/>
          <CustomButton value = {'('} onClick={()=>{ buttonClick('(') }}/>
          <CustomButton value = {7} onClick={()=>{ buttonClick(7) }}/>
          <CustomButton value = {8} onClick={()=>{ buttonClick(8) }}/>
          <CustomButton value = {9} onClick={()=>{ buttonClick(9) }}/>
          <CustomButton value = {')'} onClick={()=>{ buttonClick(')') }}/>
          <CustomButton value = {0} onClick={()=>{ buttonClick(0) }}/>
          <CustomButton value = {'.'} onClick={()=>{ buttonClick('.') }}/>
          <CustomButton value = {'{'} onClick={()=>{ buttonClick('{') }}/>
          <CustomButton value = {'}'} onClick={()=>{ buttonClick('}') }}/>
          <CustomButton value = {'['} onClick={()=>{ buttonClick('[') }}/>
          <CustomButton value = {']'} onClick={()=>{ buttonClick(']') }}/>
          <CustomButton value = {'(-)'} onClick={()=>{ buttonClick('Neg') }}/>
        </div>
        <div className={Style.CalculatorOperatorContainer}>
          <CustomButton value = {'-'} onClick={()=>{ buttonClick('-') }}/>
          <CustomButton value = {'+'} onClick={()=>{ buttonClick('+') }}/>
          <CustomButton value = {'X'} onClick={()=>{ buttonClick('*') }}/>
          <CustomButton value = {'/'} onClick={()=>{ buttonClick('/') }}/>
          <CustomButton value = {'^'} onClick={()=>{ buttonClick('^') }}/>
          <CustomButton value = {'='} onClick={()=>{ evaluate() }}/>
        </div>
      </div>
    </div>
  );
}

export default CalculatorComponent;
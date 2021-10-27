import React, { useState } from 'react'
import Style from '../Styles/CalculatorComponent.module.css'
import CustomButton from './CustomButton';
import shuntingYardAlgorithm from '../Methods/ShuntingYard';
import postfixEvaluation from '../Methods/PostfixEvaluation';

const CalculatorComponent = () => 
{
  //State Varaibles:
  const [input, setInput] = useState([]);
  const [visibleString, setVisibleString] = useState('');
  const [answerOnDisplay, setAnswerOnDisplay] = useState(false);
  
  //buttonClick
  //Input: buttonVal (Any)
  //Desc: Adds the passed button value to the input string.
  const buttonClick = (buttonVal) =>
  {
    //Handle negation and deleting.
    if(buttonVal === 'Neg')
    {
      if(answerOnDisplay === true)
      {
        setVisibleString('-');
        let s = [];
        s.push(buttonVal);
        setInput(s);
        setAnswerOnDisplay(false);
      }
      else
      {
        setVisibleString(visibleString + '-');
        let s = input;
        s.push(buttonVal);
        setInput(s);
      }
    }
    else if(buttonVal === 'Del')
    {
      if(answerOnDisplay === true)
      {
        let s = [];
        setInput(s);
        setVisibleString('');
        setAnswerOnDisplay(false);
      }
      else
      {
        let s = input;
        let valueToDelete = s[s.length - 1];
        setInput(s.slice(0, s.length - 1));
        setVisibleString(visibleString.slice(0, visibleString.length - valueToDelete.length ));
      }
    }
    else
    {
      if(answerOnDisplay === true)
      {
        let s = [];
        s.push(buttonVal);
        setInput(s);
        setVisibleString('' + buttonVal);
        setAnswerOnDisplay(false);
      }
      else
      {
        let s = input;
        s.push(buttonVal);
        setVisibleString(visibleString + buttonVal);
        console.log("Input: " + s.toString());
      }
    }
  } 

  //evaluate
  //Desc: Takes the input string and evaluates it. If the string does not
  // have correct synatax, the result will be an error.
  const evaluate = () =>
  {
    //Convert to postfix and evaluate.
    let result = shuntingYardAlgorithm(input);
    console.log('post shunting yard: ' + result);
    
    //Check to see if result was valid.
    if(result === 'Invalid Input.' || result === undefined)
    {
      setVisibleString(result);
      setAnswerOnDisplay(true);
    }
    else
    {
      result = postfixEvaluation(result);

      //If the result is not a number.
      if(isNaN(result))
      {
        result = 'Invalid Input.'
      }

      //Clear input and show result.
      setInput([]);
      setVisibleString('Ans = ' + result);
      setAnswerOnDisplay(true);
    }
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
          <CustomButton value = {'Tan'} onClick={()=>{ buttonClick('Tan(') }}/>
          <CustomButton value = {'Cot'} onClick={()=>{ buttonClick('Cot(') }}/>
          <CustomButton value = {'Asin'} onClick={()=>{ buttonClick('Arcsin(') }}/>
          <CustomButton value = {'Acos'} onClick={()=>{ buttonClick('Arccos(') }}/>
          <CustomButton value = {'Atan'} onClick={()=>{ buttonClick('Arctan(') }}/>
          <CustomButton value = {'Arcctg'} onClick={()=>{ buttonClick('Arcctg(') }}/>
          <CustomButton value = {'ln'} onClick={()=>{ buttonClick('ln(') }}/>
          <CustomButton value = {'log'} onClick={()=>{ buttonClick('log(') }}/>
          <CustomButton value = {'Del'} onClick={()=>{ buttonClick('Del') }}/>
          <CustomButton value = {'C'} onClick={()=>{ setVisibleString(''); setInput([]); }}/>
          <CustomButton value = {1} onClick={()=>{ buttonClick(1) }}/>
          <CustomButton value = {2} onClick={()=>{ buttonClick(2) }}/>
          <CustomButton value = {3} onClick={()=>{ buttonClick(3) }}/>
          <CustomButton value = {'('} onClick={()=>{ buttonClick('(') }}/>
          <CustomButton value = {4} onClick={()=>{ buttonClick(4) }}/>
          <CustomButton value = {5} onClick={()=>{ buttonClick(5) }}/>
          <CustomButton value = {6} onClick={()=>{ buttonClick(6) }}/>
          <CustomButton value = {')'} onClick={()=>{ buttonClick(')') }}/>
          <CustomButton value = {7} onClick={()=>{ buttonClick(7) }}/>
          <CustomButton value = {8} onClick={()=>{ buttonClick(8) }}/>
          <CustomButton value = {9} onClick={()=>{ buttonClick(9) }}/>
          <CustomButton value = {'.'} onClick={()=>{ buttonClick('.') }}/>
          <CustomButton value = {0} onClick={()=>{ buttonClick(0) }}/>
          <CustomButton value = {'{'} onClick={()=>{ buttonClick('{') }}/>
          <CustomButton value = {'}'} onClick={()=>{ buttonClick('}') }}/>
          <CustomButton value = {'(-)'} onClick={()=>{ buttonClick('Neg') }}/>
          <CustomButton value = {'['} onClick={()=>{ buttonClick('[') }}/>
          <CustomButton value = {']'} onClick={()=>{ buttonClick(']') }}/>
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
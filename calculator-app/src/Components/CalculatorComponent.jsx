import React, { useState } from 'react'
import Style from '../Styles/CalculatorComponent.module.css'
import CustomButton from './CustomButton';

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

    setVisibleString(visibleString + buttonVal);

    console.log('Array: ' + input.toString());
    console.log('Visible String: ' + visibleString);
  } 

  const shuntingYardAlgorithm = () => 
  {
    let stack = [];
    let queue = [];

    //Iterate over input and record in stack and queue.
    for(let i = 0; i < input.length; i++)
    {
      let curData = input[i];
      console.log('CurData = ' + curData);

      //If this is an operator:
      if(curData === '/' || curData === '*' || curData === '+' || curData === '-' || curData === '(' || curData === ')')
      {
        //Create a precedence table:
        //let precedenceTable = [['^'], ['*', '/'], ['+', '-'], []]

        console.log('stack push: ' + curData);
        stack.push(curData);
        console.log('Stack: ' + stack.toString());

        //Check for order of operations by peeking the stack.
        let topOfStack = stack.pop();
        stack.push(topOfStack);
        console.log('outofstackif');
      }

      //If this is a number:
      if(curData === 1 || curData === 2 || curData === 3 || curData === 4 || curData === 5 || curData === 6
        || curData === 7 || curData === 8 ||curData === 9 || curData === 0)
      {

        let fullNumber = curData;
        console.log(fullNumber);
        let temp = i;
        
        let numAdded = 0;
        while (temp !== input.length - 1) {
          
          let next = input[temp + 1];
          console.log('Next: ' + next );
          if (next === '/' || next === '*' || next === '+' || next === '-') {
            break;
          }
          else {
            numAdded++;
            for(let j = 0; j < numAdded; j++)
            {
              fullNumber = fullNumber * 10;
            }
            fullNumber += next;
          }

          temp++;
        }

        //Reposition pointer.
        i = temp;
        
        console.log('enqueue: ' + fullNumber);
        queue.push(fullNumber);
        console.log('queue: ' + queue.toString());
      }
    }

    //Pop the rest of the data off the stack and enqueue
    while(stack.length !== 0)
    {
      queue.push(stack.pop());
    }

    return queue;
  }

  const postfixEvaluation = (postfixExpression) =>
  {
    let stack = []

    //Iterate over expression and use stack to evaluate.
    for(let i = 0; i < postfixExpression.length; i++)
    {
      let curData = postfixExpression.at(i);
      if(curData !== '/' && curData !== '*' && curData !== '+' && curData !== '-')
      {
        stack.push(postfixExpression.at(i));
      }
      else
      {
        //Get the values that need to be evaluated.
        let firstVal = stack.pop();
        let secondVal = stack.pop();
        let operator = postfixExpression.at(i);
        let result = eval(secondVal + operator + firstVal);

        stack.push(result);
      }
    }

    return(stack.pop());
  }

  //evaluate
  //Desc: Takes the input string and evaluates it. If the string does not
  // have correct synatax, the result will be an error.
  const evaluate = () =>
  {
    let result = shuntingYardAlgorithm();
    console.log('post shunting yard: ' + result);
    result = postfixEvaluation(result);
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
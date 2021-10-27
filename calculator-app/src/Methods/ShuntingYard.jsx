//shuntingYardAlgorithm
//Desc: Takes an input of an infix expression and returns a postfix expression.
const shuntingYardAlgorithm = (input) => {
  let stack = [];
  let queue = [];

  //Iterate over input and record in stack and queue.
  for (let i = 0; i < input.length; i++) {
    
    let curData = input[i];
    console.log('cur data: ' + curData);

    //If this is an operator:
    if (!isNumber(curData)) {
      
      //Handle Parenthasies and trig funcs:
      if (curData === ')' || curData === '}' || curData === ']') {

        //enqueue until other side apears.
        var otherSideFound = false;
        while (stack.length !== 0) {
          
          let temp = stack.pop();
          if ( (temp === '(' && curData === ')') || (temp === '{' && curData === '}') || (temp === '[' && curData === ']'))
          {
            otherSideFound = true;
            break;
          } 
          //Check for trig functions:
          else if ((temp === 'Cos(' && curData === ')') || (temp === 'Sin(' && curData === ')') || (temp === 'Tan(' && curData === ')')
           || (temp === 'Cot(' && curData === ')') || (temp === 'Arcsin(' && curData === ')') || (temp === 'Arccos(' && curData === ')')
           || (temp === 'Arctan(' && curData === ')') || (temp === 'Arcctg(' && curData === ')') || (temp === 'ln(' && curData === ')')
           || (temp === 'log(' && curData === ')'))
          {
            console.log('enqueue: ' + temp);
            queue.push(temp);
            console.log('queue: ' + queue.toString());
            otherSideFound = true;
            break;
          }
          console.log('enqueue: ' + temp);
          queue.push(temp);
          console.log('queue: ' + queue.toString());
        }

        if(otherSideFound === false)
        {
          return('Invalid Input.')
        }
        continue;
      }
      else if (curData === '(' || curData === '{' || curData === '[' || curData === 'Sin(' || curData === 'Cos(' || curData === 'Tan('
        || curData === 'Cot(' || curData === 'Arcsin(' || curData === 'Arccos(' || curData === 'Arctan(' || curData === 'Arcctg('
        || curData === 'ln(' || curData === 'log(' || curData === 'Neg')
      {
        stack.push(curData);
        console.log('stack push: ' + curData);
        console.log('stack: ' + stack.toString());
      }
      else {
        
        //Determine precedence of current operator:
        let precedenceVal = determinePrecedence(curData);

        //Iterate over the stack and determine if there are any operators of lower precedence.
        if (stack.length !== 0) {

          while (stack.length !== 0) {
            let topOfStack = stack.pop();
            let precedenceOfTop = determinePrecedence(topOfStack);

            if (precedenceVal < precedenceOfTop) {
              stack.push(topOfStack);
              stack.push(curData);
              console.log('stack push: ' + curData);
              console.log('stack: ' + stack.toString());
              break;
            }
            else if (precedenceVal === precedenceOfTop)
            {
              console.log('enqueue: ' + topOfStack);
              queue.push(topOfStack);
              console.log('queue: ' + queue.toString());
              stack.push(curData);
              console.log('stack push: ' + curData);
              console.log('stack: ' + stack.toString());
              break;
            }
            else {
              console.log('enqueue: ' + topOfStack);
              queue.push(topOfStack);
              console.log('queue: ' + queue.toString());
            }
          }

          //If we cleared the stack, add current data.
          if (stack.length === 0) {
            console.log('stack push: ' + curData);
            stack.push(curData);
            console.log('stack: ' + stack.toString());
          }

        }
        else {
          console.log('stack push: ' + curData);
          stack.push(curData);
          console.log('stack: ' + stack.toString());
        }
      }
    }

    //If this is a number:
    if (curData === 1 || curData === 2 || curData === 3 || curData === 4 || curData === 5 || curData === 6
      || curData === 7 || curData === 8 || curData === 9 || curData === 0 || curData === '.') {


      //Check to see if input is decimal with no whole num.
      let fullNumber;
      let temp = i;
      let numPastDecimal = 0;
      let pastDecimalPlace = false;
      let negativeNum = false;
      let numAfterDeci = false;

      if(curData === '.')
      {
        fullNumber = 0;
        pastDecimalPlace = true;
      }
      else
      {
        fullNumber = curData;
      }
      
      console.log("Full number: " + fullNumber );
      
      while (temp !== input.length - 1) {

        console.log("Full number: " + fullNumber );

        let next = input[temp + 1];

        if (next === '/' || next === '*' || next === '+' || next === '-' || next === '^' || next === '(' || next === ')'
        || next === '{' || next === '}' || next === '[' || next === ']') {
          
          //Check to see if there was anything recorded after the decimal.
          if(numAfterDeci === false && pastDecimalPlace === true)
          {
            return NaN;
          }
          break;
        }
        else if(next === '.') //Check to see if we have a decimal.
        {
          pastDecimalPlace = true;
        }
        else 
        {
          
          if(pastDecimalPlace) //Handle past decimal.
          {
            //Record that there was a number after the decimal.
            numAfterDeci = true;
            let denom = 10;
            for(let k = 0; k < numPastDecimal; k++)
            {
              denom = denom * 10;
            }

            if(negativeNum)
            {
              fullNumber -= (next / denom);
            }
            else
            {
              fullNumber += (next / denom);
            }
            numPastDecimal++;
          }
          else //Handle before decimal.
          {
            fullNumber = fullNumber * 10;
            if(negativeNum)
            {
              fullNumber -= next;
            }
            else
            {
              fullNumber += next;
            }
          }
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
  console.log('clear stack...');
  while (stack.length !== 0) {
    queue.push(stack.pop());
    console.log('queue: ' + queue.toString());
  }

  if(queue.length === 0)
  {
    return('Invalid Input.');
  }
  else
  {
    return queue;
  }
}

//determinePrecedence
//Desc: returns an integer corresponding to the precedence of each operator and function.
const determinePrecedence = (operator) =>
{
  //Create a precedence table:
  let precedenceTable = [['^', 'Neg'],  ['*', '/'], ['+', '-'], ['(', '{', '[', 'Sin(', 'Cos(', 'Tan(', 'Cot(', 
    'Arcsin(', 'Arccos(', 'Arctan(', 'Arcctg(', 'ln(', 'log(']]; //parentheses at end as marker.

  //Determine precedence of current operator:
  let precedenceVal = -1;
  for (let j = 0; j < precedenceTable.length; j++) {
    let curGroup = precedenceTable[j];

    for (let k = 0; k < curGroup.length; k++) {
      if (operator === curGroup[k]) {
        precedenceVal = j;
      }
    }
  }

  return precedenceVal;
}

//isNumber
//Desc: returns if a data is a number or not (t/f).
const isNumber = (curData) =>
{
  if (curData === '/' || curData === '*' || curData === '+' || curData === '-' || curData === '^' || curData === '(' 
      || curData === ')' || curData === '{' || curData === '}' || curData === '[' || curData === ']' 
      || curData === 'Sin(' || curData === 'Cos(' || curData === 'Tan(' || curData === 'Cot(' || curData === 'Arcsin('
      || curData === 'Arccos(' || curData === 'Arctan(' || curData === 'Arcctg(' || curData === 'ln(' || curData === 'log('
      || curData === 'Neg')
  {
    return false;
  }
  else
  {
    return true;
  }
}

export default shuntingYardAlgorithm;
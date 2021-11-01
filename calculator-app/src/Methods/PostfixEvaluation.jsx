//postfixEvaluation
//Desc: Takes an input of a postfix expression and returns the result.
const postfixEvaluation = (postfixExpression) => 
{
  console.log('Postfix Eval...');
  let stack = []

  //Check expression to make sure it does not have invalid data.
  for(let i = 0; i < postfixExpression.length; i++)
  {
    if(postfixExpression.at(i) === '(' || postfixExpression.at(i) === '{' || postfixExpression.at(i) === '[')
    {
      return "Invalid Input.";
    }
  }

  //Iterate over expression and use stack to evaluate.
  for (let i = 0; i < postfixExpression.length; i++) 
  {
    let curData = postfixExpression.at(i);
    console.log('curData = ' + curData);

    //Check if the current data is a number:
    if (curData !== '/' && curData !== '*' && curData !== '+' && curData !== '-' && curData !== '^'
      && curData !== 'Sin(' && curData !== 'Cos(' && curData !== 'Tan(' && curData !== 'Cot(' && curData !== 'Arcsin('
      && curData !== 'Arccos(' && curData !== 'Arctan(' && curData !== 'Arcctg(' && curData !== 'ln(' && curData !== 'log('
      && curData !== 'Neg') 
    {
      console.log('stack push: ' + curData);
      stack.push(curData);
      console.log('stack: ' + stack.toString());
    }
    else 
    {
      //If single value func:
      if (curData === 'Sin(' || curData === 'Cos(' || curData === 'Tan(' || curData === 'Cot(' || curData === 'Arcsin('
        || curData === 'Arccos(' || curData === 'Arctan(' || curData === 'Arcctg(' || curData === 'ln(' || curData === 'log('
        || curData === 'Neg')
      {
        let firstVal = stack.pop();
        let operator = curData;
        let result = null;

        console.log('Single Val Func.');
        console.log('Val = ' + firstVal);
        console.log('Operator = ' + operator);

        switch (operator) {
          case 'Sin(':
            result = Math.sin(firstVal);
            break;
          case 'Cos(':
            result = Math.cos(firstVal);
            break;
          case 'Tan(':
            result = Math.tan(firstVal);
            break;
          case 'Cot(':
            result = (1 / Math.tan(firstVal));
            break;
          case 'Arcsin(':
            result = Math.asin(firstVal);
            break;
          case 'Arccos(':
            result = Math.acos(firstVal);
            break;
          case 'Arctan(':
            result = Math.atan(firstVal);
            break;
          case 'Arcctg(':
            result = Math.PI / 2 - Math.atan(firstVal);
            break;
          case 'ln(':
            result = Math.log(firstVal);
            break;
          case 'log(':
            result = Math.log10(firstVal);
            break;
          case 'Neg':
            result = firstVal * -1;
            break;
          default:
            break;
        }

        console.log('stack push: ' + result);
        stack.push(result);
        console.log('stack: ' + stack.toString());
      }
      else 
      {
        //Get the values that need to be evaluated.
        let firstVal = stack.pop();
        let secondVal = stack.pop();
        let operator = curData;
        let result = null;

        console.log('Double Val Func.');
        console.log('Val 1 = ' + firstVal);
        console.log('Val 2 = ' + secondVal);
        console.log('Operator = ' + operator);

        switch (operator) {
          case '/':
            result = secondVal / firstVal;
            if(!isFinite(result))
            {
              return NaN;
            }
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
            result = Math.pow(secondVal, firstVal);
            break;
          default:
            break;
        }

        console.log('stack push: ' + result);
        stack.push(result);
        console.log('stack: ' + stack.toString());
      }
    }
  }

  //Check to see if the stack is valid.
  if(stack.length !== 1)
  {
    return NaN;
  }
  else
  {
    return (stack.pop());
  }
}

export default postfixEvaluation;
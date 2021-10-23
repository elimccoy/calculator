//postfixEvaluation
//Desc: Takes an input of a postfix expression and returns the result.
const postfixEvaluation = (postfixExpression) => 
{
  console.log('Postfix Eval...');
  let stack = []

  //Iterate over expression and use stack to evaluate.
  for (let i = 0; i < postfixExpression.length; i++) 
  {
    let curData = postfixExpression.at(i);
    console.log('curData = ' + curData);

    //Check if the current data is a number:
    if (curData !== '/' && curData !== '*' && curData !== '+' && curData !== '-' && curData !== '^'
      && curData !== 'Sin(' && curData !== 'Cos(' && curData !== 'Tan(' && curData !== 'Cot(' && curData !== 'Arcsin('
      && curData !== 'Arccos(' && curData !== 'Arctan(' && curData !== 'Arcctg(' && curData !== 'ln(' && curData !== 'log(') 
    {
      console.log('stack push: ' + curData);
      stack.push(curData);
      console.log('stack: ' + stack.toString());
    }
    else 
    {

      //If trig func:
      if (curData === 'Sin(' || curData === 'Cos(' || curData === 'Tan(' || curData === 'Cot(' || curData === 'Arcsin('
        || curData === 'Arccos(' || curData === 'Arctan(' || curData === 'Arcctg(' || curData === 'ln(' || curData === 'log(') {
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
          default:
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
          default:
            break;
        }

        stack.push(result);
      }
    }
  }

  return (stack.pop());
}

export default postfixEvaluation;
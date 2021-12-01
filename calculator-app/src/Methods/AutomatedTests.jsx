import { create, all } from 'mathjs'
import shuntingYardAlgorithm from './ShuntingYard';
import postfixEvaluation from './PostfixEvaluation';

//Desc: The automated tests function creates random correct and incorrect expressions by using a finite state machine.
// This finite state machine is used to determine what values can come after a previous value. All expressions start
// from a starting value as given in the starting values list. Once a starting expressions is chosen, a value can be
// selected depending on the boolean result of the finite state machine.

//List of all elements:
const elementIndex = ['+', '-', '*', '/', '^', 'sin(', 'cos(', 'tan(', 'cot(', 'arcsin(', 'arccos(', 'arctan(', 'arcctg(', 'ln(', 'log(', 
                        '(', '{', '[', ')', '}', ']', 'num'];

//Finite State Machine for Mathmatical elements (created using index of above list of elements):
const FSM = [[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
             [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
             [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
             [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
             [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
             [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
             [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
             [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
             [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
             [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
             [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
             [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
             [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
             [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
             [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
             [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
             [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
             [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
             [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0]];

//List of starting elements:
const startingElements = ['-', 'sin(', 'cos(', 'tan(', 'cot(', 'arcsin(', 'arccos(', 'arctan(', 'arcctg(', 'ln(', 'log(', '(', '{', '[', 'num'];

//runCorrectTests:
//Desc: runs one correct test and returns obj of results for display.
export function runCorrectTest (maxExpressionSize) {
    
    const math = create(all);
    var expressionCreated = false;
    var toReturn = [];

    while(!expressionCreated)
    {
        var expressionSize = getRandomWhole(maxExpressionSize);
        //Generate correct expression.
        var candidateExpression = generateCorrectExpression(expressionSize);
    
        //Make a copy of candidate expression.
        var symbolExpression = [];
        for (var pos = 0; pos < candidateExpression.length; pos++) {
            symbolExpression.push(candidateExpression.at(pos));
        }
    
        //Input numbers into expression.
        console.log('Expression before reals: ' + candidateExpression);
        var realsExpression = replaceWithReals(candidateExpression);
        var toShowUser = formatForUser(realsExpression);
        console.log('Expression after reals: ' + realsExpression);
    
        //Format for math.js.
        var mathJSExpression = formatMathJS(realsExpression);
        console.log('Expression after Math.js format: ' + mathJSExpression);
    
        //Calculate result for math.js.
        var mathJSResult = getMathJSResult(mathJSExpression, math);
        console.log(mathJSResult);
        if(mathJSResult === 'Error') continue;
        console.log(mathJSResult.length);
        if(mathJSIncorrect(mathJSResult) !== true)
        {
          mathJSResult = mathJSResult.toFixed(3);
        }
        else
        {
            continue;
        }
        
        //Format for my eval.
        var myExpression = formatMyEval(realsExpression, symbolExpression);
        console.log('Expression after my format: ' + myExpression);
    
        //Calculate result for my eval.
        var myResult = getMyResult(myExpression);
        if (myResult !== undefined) {
            myResult = myResult.toFixed(3);
        }
        else
        {
            myResult = 'Error';
        }
    
        console.log('Math.js Expression: ' + mathJSExpression);
        console.log('My Expression: ' + myExpression);
        console.log('Math.js result: ' + mathJSResult);
        console.log('My Result: ' + myResult);
    
        //bundle results for return.
        toReturn.push('Expression = ' + toShowUser);
        toReturn.push('Math.JS Result = ' + mathJSResult);
        toReturn.push('My Result = ' + myResult);   
        toReturn.push('Passed = ' + (mathJSResult === myResult));
        toReturn.push((mathJSResult === myResult));
        expressionCreated = true; 
    } 

    return toReturn;
}

//runInorrectTests:
//Desc: runs one incorrect test and returns obj of results for display.
export function runIncorrectTest (maxExpressionSize) {
   
    const math = create(all);
    var expressionCreated = false;
    var toReturn = [];

    while(!expressionCreated)
    {   
        //Generate incorrect expression.
        var expressionSize = getRandomWhole(maxExpressionSize);
        var candidateExpression = generateIncorrectExpression(expressionSize);

        //Make a copy of candidate expression.
        var symbolExpression = [];
        for (var pos = 0; pos < candidateExpression.length; pos++) {
            symbolExpression.push(candidateExpression.at(pos));
        }

        //Input numbers into expression.
        console.log('Expression before reals: ' + candidateExpression);
        var realsExpression = replaceWithReals(candidateExpression);
        var toShowUser = formatForUser(realsExpression);
        console.log('Expression after reals: ' + realsExpression);
    
        //Format for math.js.
        var mathJSExpression = formatMathJS(realsExpression);
        console.log('Expression after Math.js format: ' + mathJSExpression);

        //Calculate result for math.js.
        var mathJSResult = '';
        try{
            mathJSResult = getMathJSResult(mathJSExpression, math);
            toReturn(mathJSResult);
        } catch(e)
        {
            mathJSResult = 'Error'
        }

        //Continue until incorrect expression created.
        if(mathJSResult !== 'Error')
        {
            continue;
        }

        //Format for my eval.
        var myExpression = formatMyEval(realsExpression, symbolExpression);
        console.log('Expression after my format: ' + myExpression);

        //Calculate result for my eval.
        var myResult = getMyResult(myExpression);
        if (myResult === undefined || isNaN(myResult) || myResult === 'Invalid Input.') {
            myResult = 'Error';
        }

        console.log('Math.js Expression: ' + mathJSExpression);
        console.log('My Expression: ' + myExpression);
        console.log('Math.js result: ' + mathJSResult);
        console.log('My Result: ' + myResult);

        //bundle results for return.
        if(toShowUser === 'undefined')
        {
            toShowUser = 'Empy Expression.';
        }

        toReturn.push('Expression = ' + toShowUser);
        toReturn.push('Math.JS Result = ' + mathJSResult);
        toReturn.push('My Result = ' + myResult);   
        toReturn.push('Passed = ' + (mathJSResult === myResult));
        toReturn.push((mathJSResult === myResult));
        expressionCreated = true;
    }

    return toReturn;
}

//generateCorrectExpressions:
//Desc: Generates and returns a correct expression.
const generateCorrectExpression = (expressionLength) => {

    //Continue until correct expression.
    while (true) {

        //Element list of the current expression.
        var curExpressionEleList = [];

        //Boolean to make sure expression is valid.
        var isValid = true;

        //Stack of opening and closing parinthesis elements to ensure correct expressions.
        var parinthesisStack = [];

        //Determine starting element in expression.
        var curStartingElement;
        if(expressionLength === 1)
        {
            curStartingElement = 'num';
        }
        else
        {
            curStartingElement = startingElements.at(getRandomWhole(startingElements.length));
        }
        curExpressionEleList.push(curStartingElement);
        console.log('Element ' + curStartingElement + ' added.');
        console.log('Current Expression Length: ' + curExpressionEleList.length);

        //Add starting element to parinthisis stack if needed
        if (containsParinthesis(curStartingElement) === true) {
            parinthesisStack.push(curStartingElement);
        }

        //While the current expression is not at the required length, continue adding elements.
        while (curExpressionEleList.length < expressionLength) {
            
            //Determine what to choose, random or number.
            var randomChoice = getRandomWhole(2);
            var prevElement = curExpressionEleList.pop();
            curExpressionEleList.push(prevElement);//Replace.

            //Operator/Function.
            if (randomChoice === 0 || numCanBeAdded(curExpressionEleList) === false) {

                //Randomly select new element to add to expression.
                var randomElementToAdd = selectCorrectNext(curExpressionEleList);
                console.log('Element to be added NEW: ' + randomElementToAdd);

                //If correct, add to element list and continue.
                curExpressionEleList.push(randomElementToAdd);
                console.log('Element ' + randomElementToAdd + ' added.');
                console.log('Current Expression Length: ' + curExpressionEleList.length);

                //Add to parithesis stack or check to see if it has an opening element.
                if (containsParinthesis(randomElementToAdd) === true) {
                    //If this is a closing parinthesis, the opening parinthesis must match.
                    if (isClosingParinthesis(randomElementToAdd) === true) {
                        //Check to see if there are any parinthesis elements in the stack.
                        if (parinthesisStack.length === 0) {
                            isValid = false;
                            break;
                        }
                        else //There is a parinthesis element to compare to.
                        {
                            //Get most recent parinthesis element.
                            var recentParinthesisEle = parinthesisStack.pop();

                            //If it is a closing element, invalid expression.
                            if (isClosingParinthesis(recentParinthesisEle) === true) {
                                isValid = false;
                                break;
                            }
                            else {

                                //If it is an opening element that doesnt match, invalid expression.
                                if (doesMatch(recentParinthesisEle, randomElementToAdd) !== true) {
                                    isValid = false;
                                    break;
                                }
                                //If it is an opening element that does match, remove the top of stack and procede as normal.
                            }
                        }
                    }
                    else { //Parinthesis is an opening parnithesis.
                        parinthesisStack.push(randomElementToAdd);
                    }
                }
            }
            else{ //Number.
                
                //Add a number and close parinthesis.
                curExpressionEleList.push('num');
                var res = fixParinthesis(curExpressionEleList, parinthesisStack);
                
                //Replace cur expression and parinthesis stack:
                curExpressionEleList = res[0];
                parinthesisStack = res[1];
            }

        }//End of while cur expression length.

        //Determine if expression is truly correct.
        if (confirmExpressionIsCorrect(curExpressionEleList, parinthesisStack) === true && isValid === true) {
            return (curExpressionEleList);
        }
    }
}

//generateIncorrectExpressions:
//Desc: Generates and returns a number of incorrect expressions.
const generateIncorrectExpression = (expressionLength) => 
{
    //Continue until incorrect expression.
    while (true) {

        //Element list of the current expression.
        var curExpressionEleList = [];

        //Stack of opening and closing parinthesis elements to ensure correct expressions.
        var parinthesisStack = [];

        //While the current expression is not at the required length, continue adding elements.
        while (curExpressionEleList.length < expressionLength) {
            
            //Determine what to choose, random or number.
            var randomChoice = getRandomWhole(2);

            if (randomChoice === 0) {
                //Randomly select new element to add to expression.
                var randomElementToAdd = elementIndex.at(getRandomWhole(elementIndex.length));
                curExpressionEleList.push(randomElementToAdd);
                console.log('Element ' + randomElementToAdd + ' added.');
                console.log('Current Expression Length: ' + curExpressionEleList.length);

                //Add to parithesis stack or check to see if it has an opening element.
                if (containsParinthesis(randomElementToAdd) === true) {

                    //If this is a closing parinthesis, the opening parinthesis must match.
                    if (isClosingParinthesis(randomElementToAdd) === true) {
                        //Check to see if there are any parinthesis elements in the stack.
                        if (parinthesisStack.length === 0) {
                            break;
                        }
                        else //There is a parinthesis element to compare to.
                        {
                            //Get most recent parinthesis element.
                            var recentParinthesisEle = parinthesisStack.pop();

                            //If it is a closing element, invalid expression.
                            if (isClosingParinthesis(recentParinthesisEle) === true) {
                                break;
                            }
                            else {

                                //If it is an opening element that doesnt match, invalid expression.
                                if (doesMatch(recentParinthesisEle, randomElementToAdd) !== true) {
                                    break;
                                }
                                //If it is an opening element that does match, remove the top of stack and procede as normal.
                            }
                        }
                    }
                    else { //Parinthesis is an opening parnithesis.
                        parinthesisStack.push(randomElementToAdd);
                    }
                }
            
            }else
            {
                //Add a number and close parinthesis.
                curExpressionEleList.push('num');
            }

        }//End of while cur expression length.

        //Determine if expression is invalid:
        if (confirmExpressionIsCorrect(curExpressionEleList, parinthesisStack) === false) {
            return (curExpressionEleList);
        }
    }
}

//confirmExpressionIsCorrect:
//Desc: Check if the element list is correct, then checks with math.js object if answer is returned.
const confirmExpressionIsCorrect = (expressionEleList, parinthesisStack) => 
{
    //Check to see if there are open or closing parinthesis.
    if(parinthesisStack.length !== 0)
    {
        return false;
    }   
   
    //Check to see if there is a correct ending element.
    var lastElement = expressionEleList.pop(); //Get last.
    expressionEleList.push(lastElement); //Replace last.

    if(lastElement !== 'num' && lastElement !== ']' && lastElement !== '}' && lastElement !== ')')
    {
        return false;
    }

    return true;

    //Equate.

}

//numCanBeNext:
//Desc: Check to see if a number can be added next.
const numCanBeAdded = (curExpression) => {

    //Get top of express.
    var top = curExpression.pop();
    curExpression.push(top);//Replace

    //Determine element index.
    var topIndex = -1;
    for(var index = 0; index < FSM.at(21).length; index++)
    {
        if(elementIndex.at(index) === top)
        {
            topIndex = index;
            break;   
        }
    }

    if(FSM.at(topIndex).at(21) === 1)
    {
        return true;
    }
    else{
        return false;
    }

}

//selectCorrectNext
//Desc: selects correct next expression:
const selectCorrectNext = (curExpression) => 
{
    //Get most recent element.
    var mre =  curExpression.pop();
    curExpression.push(mre);
    
    //Determine index in FSM:
    var recEleIndex = -1;
    for(var index = 0; index < elementIndex.length; index++)
    {
        if(elementIndex.at(index) === mre)
        {
            recEleIndex = index;
            break;
        }
    }

    //Record all values that are acceptable for this most recent:
    var rowIndexes = [];
    for(var i = 0; i < FSM.at(recEleIndex).length; i++)
    {
        if(FSM.at(recEleIndex).at(i) === 1)
        {
            rowIndexes.push(i);
        }
    }

    console.log(rowIndexes);

    //Select random acceptable next.
    var toReturn = elementIndex.at(rowIndexes.at(getRandomWhole(rowIndexes.length)));

    return toReturn;

}

//containsParinthesis:
//Returns true or false depending on if it is an opening or closing parinthesis.
const containsParinthesis = (element) => {
    
    if (element === 'sin(' || element === 'cos(' || element === 'tan(' || element === 'cot(' || element === 'arcsin(' ||
        element === 'arccos(' || element === 'arctan(' || element === 'arcctg(' || element === 'ln(' || element === 'log(' || 
        element === '(' || element === '{' || element === '[' || element === ')' ||element === '}' || element === ']') {
        return true;
    }
    else{
        return false;
    }
}

//isColsingParinthesis:
//Returns true if there is a closing parinthisis. False if not.
const isClosingParinthesis = (element) => {
    if (element === ')' || element === '}' || element === ']'){
        return true;
    }
    else{
        return false;
    }
}

//fixParinthesis
//Desc: adds all closing parinthesis to ensure good runtime.
const fixParinthesis = (curExpression, parinthesisStack) => {

    while(parinthesisStack.length !== 0)
    {
        var top = parinthesisStack.pop();
        if(top === '{')
        {
            curExpression.push('}');
        }
        else if(top === '[')
        {
            curExpression.push(']');
        }
        else
        {
            curExpression.push(')');
        }
    }

    var toReturn = [];
    toReturn.push(curExpression);
    toReturn.push(parinthesisStack);
    return toReturn;
}

//doesMatch:
//Desc: returns true or false if parinthesis match.
const doesMatch = (opening, closing) => 
{
    //Add matching parnithesis.
    if(opening === '(' && closing !== ')')
    {
        return false;
    }
    else if (opening === '{' && closing !== '}')
    {
        return false;
    }
    else if (opening === '[' && closing !== ']')
    {
        return false;
    }
    else if (opening === 'sin(' || opening === 'cos(' || opening === 'tan(' || opening === 'cot(' ||
             opening === 'arcsin(' || opening === 'arccos(' || opening === 'arctan(' || opening === 'arcctg(' ||
             opening === 'ln(' || opening === 'log(')//other trig functions. 
    {
        if(closing !== ')')
        {
            return false;
        }
    }
    
    return true;
}

//replaceWithReals:
// Takes 'num' elements and repalces with real numbers.
const replaceWithReals = (candidateExpression) => {
    
    for(var ele = 0; ele < candidateExpression.length; ele++)
    {
        if(candidateExpression.at(ele) === 'num')
        {
            var rand = getRandomWhole(2);

            //Decimal Number.
            if(rand === 0)
            {
                var beforeDeci = getRandomWhole(1000);
                var afterDeci = Math.random();
                var newNum = beforeDeci + afterDeci;
    
                //Round to random decimal places.
                newNum = newNum.toFixed(getRandomWhole(3) + 1);
    
                // if(getRandomWhole(2) === 1)
                // {
                //     newNum = newNum * -1;
                // }

                candidateExpression[ele] = newNum;
            }
            else //Whole number.
            {
                var newNumWhole = getRandomWhole(1000);
                if(getRandomWhole(2) === 1)
                {
                    newNumWhole = newNumWhole * -1;
                }
                candidateExpression[ele] = newNumWhole;
            }
        }
    }

    return(candidateExpression);
}

//getMathJSResult:
// Desc: equates list of elements to the math.js result.
const getMathJSResult = (expressionEleList, math) => {

    //Iterate over expression element list and add concat.
    var stringElementList = '';
    for (var ele = 0; ele < expressionEleList.length; ele++) {
        stringElementList += expressionEleList.at(ele);
    }

    var answer;
    //Calc result with math.js:
    try{
        answer = math.evaluate(stringElementList);
    } catch(e) {
        answer ='Error';
    }
    
    return (answer);
} 

//getMyResult:
// Desc: Takes the list of elements correctly formated and returns result.
const getMyResult = (expressionList) => {
    
    var myResult = shuntingYardAlgorithm(expressionList);
    console.log(myResult);
    if(myResult !== 'Invalid Input.' && myResult !== undefined)
    {
        myResult = postfixEvaluation(myResult);
        if(isNaN(myResult))
        {
            myResult = undefined;
        }
    }
    else
    {
        myResult = undefined;
    }

    return (myResult);
}

//formatMathJS:
//Desc: formats the passed expression element list array into values that can be
// interpreted by the math.js evaluate method.
const formatMathJS = (expressionEleList) => {

    //Stack to record the natural log opens and closes for formatting.
    var openingParithesisStack = [];

    for (var ele = 0; ele < expressionEleList.length; ele++) {
        
        if (expressionEleList.at(ele) === 'ln('){
            expressionEleList[ele] = 'log(';
            openingParithesisStack.push('ln(');
        }
        else if (expressionEleList.at(ele) === 'arcsin(')
        {
            expressionEleList[ele] = 'asin(';
            openingParithesisStack.push('asin(');
        }
        else if (expressionEleList.at(ele) === 'arccos(')
        {
            expressionEleList[ele] = 'acos(';
            openingParithesisStack.push('acos(');
        } 
        else if (expressionEleList.at(ele) === 'arctan(')
        {
            expressionEleList[ele] = 'atan(';
            openingParithesisStack.push('atan(');
        }
        else if (expressionEleList.at(ele) === 'arcctg(')
        {
            expressionEleList[ele] = 'acot(';
            openingParithesisStack.push('acot(');
        }
        else if(expressionEleList.at(ele) === '{')
        {
            expressionEleList[ele] = '(';
            openingParithesisStack.push('{');
        }
        else if(expressionEleList.at(ele) === '[')
        {
            expressionEleList[ele] = '(';
            openingParithesisStack.push('[');
        }
        else if(expressionEleList.at(ele) === '}')
        {
            expressionEleList[ele] = ')';
        }
        else if(expressionEleList.at(ele) === ']')
        {
            expressionEleList[ele] = ')';
        }
        //Catch all other opening parithesis to make sure we can check closing parithesis syntax.
        else if (expressionEleList.at(ele) === '(' || expressionEleList.at(ele) === '{' || 
            expressionEleList.at(ele) === '[' || expressionEleList.at(ele) === 'sin(' ||
            expressionEleList.at(ele) === 'cos(' || expressionEleList.at(ele) === 'tan(' ||
            expressionEleList.at(ele) === 'log(')
        {
            openingParithesisStack.push(expressionEleList.at(ele));
        }
        else if (expressionEleList.at(ele) === ')')
        {
            var lastOnStack = openingParithesisStack.pop();
            if(lastOnStack === 'ln(')
            {
                expressionEleList[ele] = ',e)';
            }
            else if(lastOnStack === 'log(')
            {
                expressionEleList[ele] = ',10)';
            }
            else
            {
                expressionEleList[ele] = ')';
            }
        }
    }

    return(expressionEleList);
}

//formatMyEval:
//Desc: formats the passed expression element list array into values that can be
// interpreted by my evaluation methods (shunting yard / postfix eval).
const formatMyEval = (expressionEleList, originalExpressSymbols) => {

    console.log(originalExpressSymbols);
    var builtExpression = [];

    for (var ele = 0; ele < expressionEleList.length; ele++) {

        if (originalExpressSymbols.at(ele) === 'arcsin(')
        {
            builtExpression.push('Arcsin(');
        }
        else if (originalExpressSymbols.at(ele) === 'arccos(')
        {
            builtExpression.push('Arccos(');
        } 
        else if (originalExpressSymbols.at(ele) === 'arctan(')
        {
            builtExpression.push('Arctan(');
        }
        else if (originalExpressSymbols.at(ele) === 'arcctg(')
        {
            builtExpression.push('Arcctg(');
        }
        else if (originalExpressSymbols.at(ele) === 'sin(')
        {
            builtExpression.push('Sin(');
        }
        else if (originalExpressSymbols.at(ele) === 'cos(')
        {
            builtExpression.push('Cos(');
        }
        else if (originalExpressSymbols.at(ele) === 'tan(')
        {
            builtExpression.push('Tan(');
        }
        else if (originalExpressSymbols.at(ele) === 'cot(')
        {
            builtExpression.push('Cot(');
        }
        else if (originalExpressSymbols.at(ele) === 'num')
        {
            //Get the number (implicit cast to string).
            var number = '' + expressionEleList.at(ele);
            
            //Iterate over and break into seperate parts.
            for(var pos = 0; pos < number.length; pos++)
            {
                if(number.at(pos) === '.')
                {
                    builtExpression.push('.');
                }
                else if(number.at(pos) === '-')
                {
                    builtExpression.push('Neg');
                }
                else
                {
                   builtExpression.push(parseInt(''+number.at(pos))); 
                }
                
            }
        }
        else //Catch the rest.
        {
            builtExpression.push(originalExpressSymbols.at(ele));
        }
    }

    return(builtExpression);
}

//getRandomWhole:
//Returns random whole number from 0 inclusicve to maxValue exclusive.
const getRandomWhole = (maxValue) => {
    return Math.floor(Math.random() * maxValue);
}

//mathJSIncorrect:
//Desc: A method to determine if the result from math.js contains an imaginary number 
// or some incorrect value.
const mathJSIncorrect = (res) => {

    if(res['re'] !== undefined)
    {
        return true;
    }

    for(var pos = 0; pos < res.length; pos++)
    {
        console.log(res.at(pos));
        if(res.at(pos) === 'i')
        {
            return true;
        }
    }

    return false;
}

//formatForUser
//Desc: Takes comma seperated expression and makes it readable for the user.
const formatForUser = (expressionEleList) =>
{
    var toReturn = ''
    for(var ele = 0; ele < expressionEleList.length; ele++)
    {
        //check for negitive:
        var curEle = '' + expressionEleList.at(ele);
        if(curEle.at(0) === '-' && curEle.length > 1)
        {
            var toAdd = '(-Neg)';
            for(var iter = 1; iter < curEle.length; iter++)
            {
                toAdd+= curEle.at(iter);
            }
            toReturn += toAdd;
        }
        else{
            toReturn +=  ''+expressionEleList.at(ele);
        }
    }

    return toReturn;
}

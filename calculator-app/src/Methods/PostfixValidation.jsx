//check to see if shunting yard output is valid.
function postfixValidation(expression)
{
  var stack = [];
  var queue = [];

  //Check to see if any values are contained that should not be.
  for(var i = 0; i < expression.length; i++)
  {
    var curData = expression[0];
    
    if(curData === "(" || curData === ")" || curData === "[" || curData === "]" 
      || curData === "{" || curData === "}")
    {
      return false;
    }
  }
}
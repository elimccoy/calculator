import React, { useState } from 'react'
import { runCorrectTest, runIncorrectTest } from '../Methods/AutomatedTests';
import Style from '../Styles/TestCasesComponent.module.css'

const CalculatorComponent = () => {
  const [visibleString, setVisibleString] = useState('');
  const [resultString, setResultString] = useState('');
  const [numTestsToRun, setNumTestsToRun] = useState(0);

  //runTests:
  //Desc: function to run tests and display to user.
  function runTests(maxExpressionSize, testCount) {

    if(testCount <= 0 || testCount % 2 !== 0)
    {
      alert ("Invalid input for number of tests. Make sure the number is even!");
      return;
    }

    var allTests = '';
    var allStats = '';
    
    //Run correct tests.
    var correctRes = correctTestLoop((maxExpressionSize), testCount/2);
    var correctResStats = correctRes.at(1);
    var correctResTests = correctRes.at(0);

    //Run incorrect tests.
    var incorrectRes = incorrectTestLoop((maxExpressionSize), testCount/2, testCount/2 + 1);
    var incorrectResStats = incorrectRes.at(1);
    var incorrectResTests = incorrectRes.at(0);
    console.log(incorrectRes);
    console.log(correctRes);

    //Display final results.
    allTests += correctResTests;
    allTests += incorrectResTests;
    allStats += correctResStats;
    allStats += incorrectResStats;
    setVisibleString(allTests);
    setResultString(allStats);
  }

  //IncorrectTestLoop:
  //Desc: Loops through the incorrect tests and tests number of test counts.
  function incorrectTestLoop(maxExpressionSize, testCount, startingTestCount) {
    //======Incorrect tests======//

    var finalResults = '';
    var passedIncorrect = 0;
    var notPassedIncorrect = 0;
    var totalIncorrect = 0;
    var failedTests = [];
    var toReturn = [];

    //Create var for final display.
    var toSetVis = '';
    for (var numTests = startingTestCount; numTests <= testCount + startingTestCount - 1; numTests++) {

      //Label test.
      toSetVis += 'Test Number ' + numTests + ':\n';
      toSetVis += 'Test type = Incorrect.\n';

      //Run test.
      var incorrectResult = runIncorrectTest(maxExpressionSize);

      //Format results.
      for (var ele = 0; ele < incorrectResult.length - 1; ele++) {
        toSetVis += incorrectResult.at(ele) + '\n'
      }
      toSetVis += '\n';

      //Record stats.
      if (incorrectResult.at(4) === true) {
        passedIncorrect++;
      }
      else {
        failedTests.push(numTests);
        notPassedIncorrect++;
      }
      totalIncorrect++;
    }

    //Display results
    finalResults += 'Number of incorrect tests passed = ' + passedIncorrect + '\n';
    finalResults += 'Number of incorrect tests failed = ' + notPassedIncorrect + '\n';
    finalResults += 'Total number of incorrect tests = ' + totalIncorrect + '\n';
    finalResults += 'Failed Test IDs  (incorrect tests) = ' + failedTests + '\n';
    //=========================//

    toReturn.push(toSetVis)
    toReturn.push(finalResults);

    return (toReturn);
  }

  //correctTestLoop:
  //Desc: Loops through the correct tests and tests number of test counts.
  function correctTestLoop(maxExpressionSize, testCount) {
    
    var finalResults = '';
    var passedCorrect = 0;
    var notPassedCorrect = 0;
    var totalCorrect = 0;
    var failedTests = [];
    var toReturn = [];

    //Create var for final display.
    var toSetVis = '';
    for (var numTests = 1; numTests <= testCount; numTests++) {

      //Label test.
      toSetVis += 'Test Number ' + numTests + ':\n';
      toSetVis += 'Test type = Correct.\n';

      //Run test.
      var correctResult = runCorrectTest(maxExpressionSize);

      //Format results.
      for (var ele = 0; ele < correctResult.length - 1; ele++) {
        toSetVis += correctResult.at(ele) + '\n'
      }
      toSetVis += '\n';

      //Record stats.
      if (correctResult.at(4) === true) {
        passedCorrect++;
      }
      else {
        failedTests.push(numTests);
        notPassedCorrect++;
      }
      totalCorrect++;
    }

    //Display results
    finalResults += 'Number of Correct tests passed = ' + passedCorrect + '\n';
    finalResults += 'Number of Correct tests failed = ' + notPassedCorrect + '\n';
    finalResults += 'Total number of Correct tests = ' + totalCorrect + '\n';
    finalResults += 'Failed Test IDs (correct tests) = ' + failedTests + '\n';
    
    toReturn.push(toSetVis)
    toReturn.push(finalResults);

    return (toReturn);
  }

  //Method of rendering.
  return (
    <div>
      <div className={Style.noteWindow}>
        <p>Important notes: <br/>1.) (-Neg) means the negitive button whereas '-' is just minus.
          <br/>2.) If the number of tests is too large, the webpage will ask if you would like to wait. Press yes.</p>
      </div>
      <div className={Style.ResultsWindow}>{visibleString}</div>
      <div className={Style.StatsWindow}>{resultString}</div>
      <div className={Style.InputWindow}>
        <form>
          <label>
            Number of cases to run |  
            <input type="text" name="InputTestNumber" onChange={(e) => {setNumTestsToRun(e.target.value)}} />
          </label>
        </form>
      </div>
      <div className={Style.buttonWindow}>
        <button className={Style.buttonStyle} onClick={() => { runTests(20, numTestsToRun) }}>Click to run tests</button>
      </div>
    </div>
  );
}

export default CalculatorComponent;
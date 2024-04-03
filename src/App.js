import React, { useState } from 'react';
import './App.css'; // Import CSS file for styling

const App = () => {
  const [responses, setResponses] = useState(Array(9).fill(null));
  const [totalScore, setTotalScore] = useState(null);
  const [severity, setSeverity] = useState(null);
  const [submitted, setSubmitted] = useState(false); // State to track if quiz has been submitted

  const questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
    "Trouble concentrating on things, such as reading the newspaper or watching television",
    "Moving or speaking so slowly that other people could have noticed. Or the opposite being so fidgety or restless that you have been moving around a lot more than usual",
    "Thoughts that you would be better off dead, or of hurting yourself"
  ];

  const handleResponseChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = parseInt(value);
    setResponses(newResponses);
  };

  const evaluateScore = () => {
    const total = responses.reduce((acc, curr) => acc + curr, 0);
    setTotalScore(total);

    if (total >= 5 && responses[0] >= 1 && responses[1] >= 1) {
      if (total >= 20) {
        setSeverity("Severe depression");
      } else if (total >= 15) {
        setSeverity("Moderately severe depression");
      } else if (total >= 10) {
        setSeverity("Moderate depression");
      } else if (total >= 5) {
        setSeverity("Mild depression");
      }
    } else {
      setSeverity("No significant depression detected");
    }

    setSubmitted(true); // Set submitted state to true after evaluation
  };

  return (
    <div className="phq9-container">
      <h1>PHQ-9 Quiz</h1>
      <p className="instruction">Please indicate how often you have been bothered by each of the following problems over the last 2 weeks:</p>
      {(!submitted) ? (
        // Render questions only if quiz has not been submitted
        questions.map((question, index) => (
          <div key={index} className="question-container">
            <p>{question}</p>
            <select value={responses[index]} onChange={(e) => handleResponseChange(index, e.target.value)} className="response-select">
              <option value={0}>Not at all</option>
              <option value={1}>Several days</option>
              <option value={2}>More than half the days</option>
              <option value={3}>Nearly every day</option>
            </select>
          </div>
        ))
      ) : null}
      {!submitted ? (
        <button onClick={evaluateScore} className="evaluate-button">Evaluate Score</button>
      ) : (
        <div className="result-container">
          <p>Total Score: {totalScore}</p>
          <p>Depression Severity: {severity}</p>
        </div>
      )}
    </div>
  );
};

export default App;

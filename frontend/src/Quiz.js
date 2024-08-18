import React, { useState } from "react";
import axios from "axios";

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const fetchQuestions = async () => {
    const response = await axios.get("http://localhost:5050/api/quiz/all");

    if (response.status === 200) {
      setQuizzes(response.data.data);
    } else {
      alert("some error occured while fetching questions");
    }
  };

  const handleAnswerChange = (index, optionIndex) => {
    const newAnswers = {...answers};
    newAnswers[index] = optionIndex;
    setAnswers(newAnswers);
  };

  // const handleSubmit = async () => {
  //   const response = await axios.post("http://localhost:5050/api/quiz/submit", {
  //     answers,
  //   });
  //   setScore(response.data);
  // };

  const handleSubmit = () =>{
    const allAnswersStrngs = quizzes.map((question)=>{return question.correctOption});
    const allAnswers = allAnswersStrngs.map((answer)=>{return [ answer.split(' ')[1]?answer.split(' ')[1]:"A)", answer.split(' ')[0]];});
    const allCorreectChoise = []
    for(let array in allAnswers){
      if(allAnswers[array][0].includes(")") && "ABCD".includes(allAnswers[array][0][0])){
        allCorreectChoise.push(allAnswers[array][0][0]);
      }
      if(allAnswers[array][1].includes(")") && "ABCD".includes(allAnswers[array][1][0])){
        allCorreectChoise.push(allAnswers[array][1][0]);
      }
    }
    let total = 0
    for(let i=0;i<allCorreectChoise.length;i++){
      if(allCorreectChoise[i] == "ABCD"[answers[i]]){
        total++;
      }
    }
    setScore({score:total,total:allCorreectChoise.length});
  }
  return (
    <div>
      <h1>Quiz</h1>

      {quizzes.map((quiz, index) => {
        return (
          <div key={index}>
            <h3>{quiz.question}</h3>
            {quiz.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={optionIndex}
                    onChange={() => handleAnswerChange(index, optionIndex)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        );
      })}
      <button onClick={fetchQuestions}>Quiz</button>
      <button onClick={handleSubmit}>Submit</button>

      {score !== null && (
        <div>
          <h2>
            Your Score: {score.score}/{score.total}
          </h2>
        </div>
      )}
    </div>
  );
};

export default Quiz;

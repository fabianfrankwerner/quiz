import he from "he";
import { useState, useEffect } from "react";

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((response) => response.json())
      .then((data) => {
        const questionsWithShuffledAnswers = data.results.map((question) => {
          return {
            ...question,
            question: he.decode(question.question),
            correct_answer: he.decode(question.correct_answer),
            incorrect_answers: question.incorrect_answers.map((answer) =>
              he.decode(answer)
            ),
            answers: shuffleArray([
              ...question.incorrect_answers.map((answer) => he.decode(answer)),
              he.decode(question.correct_answer),
            ]),
          };
        });

        setQuestions(questionsWithShuffledAnswers);
      });
  }, []);

  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  return (
    <div className="quiz">
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="question-container">
          <h2>{question.question}</h2>
          <div className="answers">
            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex} className="answer">
                <input
                  type="radio"
                  id={`q${questionIndex}-a${answerIndex}`}
                  name={`question-${questionIndex}`}
                  value={answer}
                />
                <label htmlFor={`q${questionIndex}-a${answerIndex}`}>
                  {answer}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

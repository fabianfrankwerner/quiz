import he from "he";
import { useState, useEffect } from "react";

export default function QuizPage({ setQuizPage }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
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
        setAnswers({});
        setSubmitted(false);
        setScore(0);
      });
  };

  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setSubmitted(true);
  };

  const playAgain = () => {
    fetchQuestions();
  };

  return (
    <div className={`quiz ${submitted ? "submitted" : ""}`}>
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
                  onChange={() => handleAnswerChange(questionIndex, answer)}
                  disabled={submitted}
                  checked={answers[questionIndex] === answer}
                />
                <label
                  htmlFor={`q${questionIndex}-a${answerIndex}`}
                  className={
                    submitted
                      ? answer === question.correct_answer
                        ? "correct"
                        : answers[questionIndex] === answer
                        ? "incorrect"
                        : ""
                      : ""
                  }
                >
                  {answer}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button className="check-answers" onClick={handleSubmit}>
          Check answers
        </button>
      ) : (
        <div className="score-container">
          <p className="score-text">
            You scored {score}/{questions.length} correct answers
          </p>
          <button onClick={playAgain}>Play again</button>
        </div>
      )}
    </div>
  );
}

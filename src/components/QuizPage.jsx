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

  const returnToHome = () => {
    setQuizPage(false);
  };

  return (
    <div className="quiz space-y-6">
      {questions.map((question, questionIndex) => (
        <div
          key={questionIndex}
          className="question-container bg-white p-4 rounded-lg shadow"
        >
          <h2 className="text-lg font-semibold mb-3">{question.question}</h2>
          <div className="answers space-y-2">
            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex} className="answer flex items-center">
                <input
                  type="radio"
                  id={`q${questionIndex}-a${answerIndex}`}
                  name={`question-${questionIndex}`}
                  value={answer}
                  onChange={() => handleAnswerChange(questionIndex, answer)}
                  disabled={submitted}
                  checked={answers[questionIndex] === answer}
                  className="mr-2"
                />
                <label
                  htmlFor={`q${questionIndex}-a${answerIndex}`}
                  className={`${
                    submitted && answer === question.correct_answer
                      ? "text-green-600 font-semibold"
                      : submitted &&
                        answers[questionIndex] === answer &&
                        answer !== question.correct_answer
                      ? "text-red-600"
                      : ""
                  }`}
                >
                  {answer}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      {!submitted && questions.length > 0 && (
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Answers
        </button>
      )}

      {submitted && (
        <div className="results bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">
            You got {score} out of {questions.length} questions correct!
          </h2>
          <div className="flex space-x-4">
            <button
              onClick={playAgain}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Play Again
            </button>
            <button
              onClick={returnToHome}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Return to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import he from "he";
// questionsWithShuffledAnswers

export default function QuizPage() {
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

      console.log(questionsWithShuffledAnswers);
      return questionsWithShuffledAnswers;
    });

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
      <p>I am the quiz page</p>
    </div>
  );
}

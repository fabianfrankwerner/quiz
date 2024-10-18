import he from "he";
//he.decode(html)

// questionsWithShuffledAnswers

export default function QuizPage() {
  fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then((response) => response.json())
    .then((data) => {
      const questionsWithShuffledAnswers = data.results.map((question) => {
        return {
          ...question,
          answers: shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
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

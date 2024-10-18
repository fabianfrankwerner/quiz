fetch("https://opentdb.com/api.php?amount=5&type=multiple")
  .then((response) => response.json())
  .then((data) => console.log(data));

export default function QuizPage() {
  return (
    <div className="quiz">
      <p>I am the quiz page</p>
    </div>
  );
}

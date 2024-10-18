/*

fetch("https://opentdb.com/api.php?amount=5&type=multiple")
  .then((response) => response.json())
  .then((data) => console.log(data));

*/
import he from "he";

console.log(he.decode("foo &copy; bar &ne; baz &#x1D306; qux"));

export default function QuizPage() {
  return (
    <div className="quiz">
      <p>I am the quiz page</p>
    </div>
  );
}

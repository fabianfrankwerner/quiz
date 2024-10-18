export default function LandingPage({ startQuiz }) {
  return (
    <div className="landing">
      <h1>Quiz</h1>
      <p>Quiz your knowledge.</p>
      <button onClick={startQuiz}>Start Quiz</button>
    </div>
  );
}

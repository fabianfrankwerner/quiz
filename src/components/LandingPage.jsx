export default function LandingPage({ startQuiz }) {
  return (
    <>
      <h1>Quiz</h1>
      <p>Test your knowledge.</p>
      <button onClick={startQuiz}>Start quiz</button>
    </>
  );
}

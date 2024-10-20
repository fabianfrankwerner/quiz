import { useState } from "react";
import LandingPage from "./components/LandingPage";
import QuizPage from "./components/QuizPage";

export default function App() {
  const [quizPage, setQuizPage] = useState(false);

  const startQuiz = () => {
    setQuizPage(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {!quizPage && <LandingPage startQuiz={startQuiz} />}
      {quizPage && <QuizPage setQuizPage={setQuizPage} />}
    </div>
  );
}

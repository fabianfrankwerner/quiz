import { useState } from "react";
import LandingPage from "./components/LandingPage";
import QuizPage from "./components/QuizPage";

export default function App() {
  const [quizPage, setQuizPage] = useState(false);

  const startQuiz = () => {
    setQuizPage(true);
  };

  return (
    <>
      {!quizPage && <LandingPage startQuiz={startQuiz} />}
      {quizPage && <QuizPage setQuizPage={setQuizPage} />}
    </>
  );
}

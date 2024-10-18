import { useState } from "react";
import LandingPage from "./components/LandingPage";
import QuizPage from "./components/QuizPage";

export default function App() {
  const [quizPage, setQuizPage] = useState(false);
  return (
    <>
      {quizPage === false && <LandingPage />}
      {quizPage === true && <QuizPage />}
    </>
  );
}

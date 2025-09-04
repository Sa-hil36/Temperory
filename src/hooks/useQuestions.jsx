
import QuizSetup from "../components/QuizSetup";
import { useState, useEffect } from "react";

const TOPIC_MAP = {
  math: 19,      
  science: 17,   
  history: 23,    
  // add more topics as needed
};
// const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";

export default function useQuestions(config) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuestions = async () => {
    if(!config) return // dont fetch if config is not set

    setLoading(true);
    setError(null);

    try {
      const category = TOPIC_MAP[config.topic] || "";
      const amount = config.numQuestions || 10;
      const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&type=multiple`
);
      const data = await res.json();

      if (data.response_code === 0) {
        const formattedQuestions = data.results.map((q) => ({
          question: q.question,
          options: [...q.incorrect_answers, q.correct_answer].sort(
            () => Math.random() - 0.5
          ),
          answer: q.correct_answer,
        }));
        setQuestions(formattedQuestions);
      } else {
        throw new Error("Failed to fetch questions");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
     }finally {
       setLoading(false);
     }
  };

  // Fetch questions when hook is used
  useEffect(() => {
    fetchQuestions();
  }, [config]);

  // Provide a method to reload questions (for restart)
  const reloadQuestions = () => {
    fetchQuestions();
  };

  return { questions,loading, error, reloadQuestions };
}

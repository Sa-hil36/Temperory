

import { useState, useEffect } from "react";

const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";

export default function useQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
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
  }, []);

  // Provide a method to reload questions (for restart)
  const reloadQuestions = () => {
    fetchQuestions();
  };

  return { questions,loading, error, reloadQuestions };
}

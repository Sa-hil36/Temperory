import { useState } from "react";

function QuizSetup({ startQuiz }) {
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);

  const handleStart = () => {
    if (!topic) {
      alert("Please select a topic!");
      return;
    }
    startQuiz({ topic, numQuestions });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold text-purple-600 mb-6">Start Quiz</h1>

      <div className="mb-4 w-full max-w-sm">
        <label className="block mb-2">Select Topic:</label>
        <select
          className="w-full p-2 rounded-lg text-black"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        >
          <option value="">--Choose a topic--</option>
          <option value="math">Math</option>
          <option value="science">Science</option>
          <option value="history">History</option>
          {/* Add more topics as needed */}
        </select>
      </div>

      <div className="mb-6 w-full max-w-sm">
        <label className="block mb-2">Number of Questions:</label>
        <input
          type="number"
          min="1"
          max="50"
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value))}
          className="w-full p-2 rounded-lg text-black"
        />
      </div>

      <button
        onClick={handleStart}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 py-3 px-6 rounded-lg font-medium shadow-lg cursor-pointer"
      >
        Start Quiz
      </button>
    </div>
  );
}

export default QuizSetup;

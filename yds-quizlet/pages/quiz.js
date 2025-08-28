"use client";
import { useState, useEffect } from "react";

export default function QuizPage() {
  const [words, setWords] = useState([]);
  const [quizOrder, setQuizOrder] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [current, setCurrent] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [finished, setFinished] = useState(false);

  // ✅ sayaçlar
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [showWrong, setShowWrong] = useState(false);

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("words")) || [];
    setWords(stored);

    if (stored.length > 0) {
      const order = shuffleArray(stored.map((_, idx) => idx));
      setQuizOrder(order);
      setCurrentIndex(0);
      generateQuestion(stored, order[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateQuestion = (list, idx) => {
    const randomWord = list[idx];
    setCurrent(randomWord);

    let wrongOptions = list
      .filter((w) => w.meaning !== randomWord.meaning)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((w) => w.meaning);

    const opts = shuffleArray([randomWord.meaning, ...wrongOptions]);
    setOptions(opts);
    setFeedback("");
  };

  const checkAnswer = (choice) => {
    if (choice === current.meaning) {
      setFeedback("✅ Doğru!");
      setCorrectCount((prev) => prev + 1);
    } else {
      setFeedback(`❌ Yanlış! Doğru cevap: ${current.meaning}`);
      setWrongCount((prev) => prev + 1);
      setWrongAnswers((prev) => [
        ...prev,
        { word: current.word, correct: current.meaning, chosen: choice },
      ]);
    }

    setTimeout(() => {
      const nextIndex = currentIndex + 1;
      if (nextIndex < quizOrder.length) {
        setCurrentIndex(nextIndex);
        generateQuestion(words, quizOrder[nextIndex]);
      } else {
        setFinished(true);
      }
    }, 1500);
  };

  if (words.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
          <p className="text-lg text-gray-700">Kelime eklemeden quiz yapamazsın 🚀</p>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-purple-700">🎉 Quiz Bitti!</h1>
          <p className="mt-4 text-lg text-black">Tüm kelimeleri tamamladın 👏</p>
  
          <p className="mt-4 text-green-600 font-semibold">✅ Doğru: {correctCount}</p>
  
          <button
            onClick={() => setShowWrong(!showWrong)}
            className="mt-2 text-red-600 font-semibold underline hover:text-red-800"
          >
            ❌ Yanlış: {wrongCount}
          </button>
  
          {showWrong && wrongAnswers.length > 0 && (
            <div className="mt-6 text-left bg-gray-50 p-4 rounded-lg shadow-inner max-h-60 overflow-y-auto">
              <h2 className="font-bold text-red-600 mb-2">Yanlış Yaptıkların:</h2>
              <ul className="space-y-2">
                {wrongAnswers.map((item, i) => (
                  <li key={i} className="text-sm">
                    <b className="text-indigo-600">{item.word}</b> → 
                    <span className="text-green-600 ml-1">Doğru: {item.correct}</span>, 
                    <span className="text-red-600 ml-1">Senin cevabın: {item.chosen}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
  
          {/* ✅ Anasayfa butonu */}
          <BackButton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-extrabold text-purple-700 mb-6">
          🎯 Quiz Zamanı
        </h1>
        <p className="text-lg mb-6 text-black">
          <span className="font-semibold text-indigo-600">&quot;{current.word}&quot;</span>{" "}
          kelimesinin anlamı nedir?
        </p>

        <div className="flex flex-col gap-3">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => checkAnswer(opt)}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition"
            >
              {opt}
            </button>
          ))}
        </div>

        {feedback && (
          <p className="mt-6 text-lg font-medium text-gray-800">{feedback}</p>
        )}
      </div>
    </div>
  );
}
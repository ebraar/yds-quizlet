"use client";
import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";

export default function AddWordPage() {
  const [words, setWords] = useState([]);
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("words")) || [];
    setWords(stored);
  }, []);

  const addWord = () => {
    if (!word || !meaning) return;
    const newWords = [...words, { word, meaning }];
    setWords(newWords);
    localStorage.setItem("words", JSON.stringify(newWords));
    setWord("");
    setMeaning("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        {/* 🔙 Geri butonu */}
        <BackButton />
        <h1 className="text-2xl font-bold text-green-600 mb-6">➕ Kelime Ekle</h1>
        <div className="flex flex-col gap-3">
          <input
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Kelime"
            className="border border-gray-300 p-3 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder:text-gray-300 text-black"
          />
          <input
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            placeholder="Anlamı"
            className="border border-gray-300 p-3 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder:text-gray-300 text-black"
          />
          <button
            onClick={addWord}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition"
          >
            Ekle
          </button>
        </div>
      </div>
    </div>
  );
}
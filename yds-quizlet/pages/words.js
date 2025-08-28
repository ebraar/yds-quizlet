"use client";
import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";

export default function WordsPage() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("words")) || [];
    setWords(stored);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        {/* 🔙 Geri butonu */}
        <BackButton />
        <h1 className="text-2xl font-bold text-indigo-600 mb-6">📖 Kelime Listesi</h1>
        {words.length === 0 ? (
          <p className="text-gray-600">Henüz hiç kelime eklenmedi.</p>
        ) : (
          <ul className="text-left space-y-2 max-h-64 overflow-y-auto">
            {words.map((w, i) => (
              <li key={i} className="border-b pb-2">
                <b className="text-indigo-600">{w.word}</b> -{" "}
                <span className="text-black">{w.meaning}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 text-center">
      
      {/* Başlık */}
      <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-10">
        📘 YDS Quizlet
      </h1>

      {/* Section Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-6">
        
        <Link
          href="/words"
          className="bg-white shadow-xl rounded-2xl p-8 hover:scale-105 transform transition"
        >
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">📖 Kelime Listesi</h2>
          <p className="text-gray-600">Eklediğin tüm kelimeleri gör.</p>
        </Link>

        <Link
          href="/add-word"
          className="bg-white shadow-xl rounded-2xl p-8 hover:scale-105 transform transition"
        >
          <h2 className="text-2xl font-bold text-green-600 mb-4">➕ Kelime Ekle</h2>
          <p className="text-gray-600">Yeni kelimeler ekle.</p>
        </Link>

        <Link
          href="/quiz"
          className="bg-white shadow-xl rounded-2xl p-8 hover:scale-105 transform transition"
        >
          <h2 className="text-2xl font-bold text-pink-600 mb-4">🎯 Quiz</h2>
          <p className="text-gray-600">Eklenen kelimelerden quiz yap.</p>
        </Link>

      </div>
    </div>
  );
}